package ero

import (
	"backend/utils"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

var (
	cachedPaths     [][]string      // キャッシュされたファイルパスのスライス
	cacheExpiration time.Time       // キャッシュの有効期限
	cacheMutex      sync.Mutex      // キャッシュの読み書きのためのミューテックス
	cacheDuration   = time.Hour * 2 // キャッシュ時間（1時間）
)

func Page(c *fiber.Ctx) error {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()

	page, err := strconv.Atoi(c.Params("page"))
	if err != nil {
		c.Status(400).SendString("pageのパスが数字ではありません：" + err.Error())
	}

	// キャッシュが有効か確認
	if time.Now().Before(cacheExpiration) && cachedPaths != nil {
		// キャッシュが有効ならそのまま返却
		return c.JSON(cachedPaths[page-1])
	}

	files, err := utils.CollectFiles(utils.GetENV("ERO_DIR"), utils.GetENV("ERO_SEARCH"))
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	chunks := utils.ShuffleAndChunks(files)

	// キャッシュを更新
	cachedPaths = chunks
	cacheExpiration = time.Now().Add(cacheDuration)

	return c.JSON(chunks[page-1])
}

func Cover(c *fiber.Ctx) error {
	filePath, err := utils.BuildFilePath(c.Params("path"), utils.GetENV("ERO_DIR"), utils.GetENV("ERO_SEARCH"))
	if err != nil {
		return c.Status(400).SendString("pathが不正です：" + err.Error())
	}
	c.Type("avif")
	return c.SendFile(filePath, false)
}

func Author(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("ERO_DIR"))
	files, err := utils.CollectFiles(normalizedPath, utils.GetENV("ERO_SEARCH"))
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	return c.JSON(files)
}

func Book(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("ERO_DIR"))

	var files []string

	err := filepath.WalkDir(normalizedPath, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && filepath.Ext(path) == ".avif" {
			normalizedPath := filepath.ToSlash(path)
			parts := strings.Split(normalizedPath, "/")
			authorAndTitle := parts[len(parts)-3] + "__" + parts[len(parts)-2] + "__" + filepath.Base(path)
			files = append(files, authorAndTitle)
		}
		return nil
	})
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	return c.JSON(files)
}

func TotalPage(c *fiber.Ctx) error {
	// キャッシュが有効か確認
	if time.Now().Before(cacheExpiration) && cachedPaths != nil {
		// キャッシュが有効ならそのまま返却
		len := strconv.Itoa(len(cachedPaths))
		return c.SendString(len)
	}

	files, err := utils.CollectFiles(utils.GetENV("ERO_DIR"), utils.GetENV("ERO_SEARCH"))
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	chunks := utils.ShuffleAndChunks(files)

	// キャッシュを更新
	cachedPaths = chunks
	cacheExpiration = time.Now().Add(cacheDuration)

	len := strconv.Itoa(len(chunks))

	return c.SendString(len)
}

func Image(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("ERO_DIR"))
	c.Type("avif")
	return c.SendFile(normalizedPath, false)
}
