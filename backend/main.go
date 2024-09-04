package main

import (
	"backend/utils"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var (
	cachedPaths     [][]string      // キャッシュされたファイルパスのスライス
	cacheExpiration time.Time       // キャッシュの有効期限
	cacheMutex      sync.Mutex      // キャッシュの読み書きのためのミューテックス
	cacheDuration   = time.Hour * 2 // キャッシュ時間（1時間）
)

func main() {
	port := utils.GetENV("PORT")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3004",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World")
	})
	app.Get("/page/:page", getPage)
	app.Get("/cover/:path", getCover)
	app.Get("/author/:path", getAuthor)
	app.Get("/book/:path", getBook)
	app.Get("/image/:path", getImage)
	app.Get("/total-page", getTotalPage)

	// TSLの残骸
	// cert := utils.GetTLS()
	// app.ListenTLSWithCertificate(port, cert)
	app.Listen(port)
}

func getPage(c *fiber.Ctx) error {
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

	files, err := utils.CollectFiles(utils.GetENV("BOX_DIR"), utils.GetENV("SEARCH_FILE"))
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	chunks := utils.ShuffleAndChunks(files)

	// キャッシュを更新
	cachedPaths = chunks
	cacheExpiration = time.Now().Add(cacheDuration)

	return c.JSON(chunks[page-1])
}

func getCover(c *fiber.Ctx) error {
	filePath, err := utils.BuildFilePath(c.Params("path"), utils.GetENV("BOX_DIR"), utils.GetENV("SEARCH_FILE"))
	if err != nil {
		return c.Status(400).SendString("pathが不正です：" + err.Error())
	}

	return sendFile(c, filePath)
}

func getAuthor(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("BOX_DIR"))
	files, err := utils.CollectFiles(normalizedPath, utils.GetENV("SEARCH_FILE"))
	if err != nil {
		return c.Status(500).SendString("エラー：" + err.Error())
	}

	return c.JSON(files)
}

func getBook(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("BOX_DIR"))

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

func getImage(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("BOX_DIR"))
	return sendFile(c, normalizedPath)
}

func sendFile(c *fiber.Ctx, path string) error {
	image, err := os.Open(path)
	if err != nil {
		return c.Status(500).SendString("画像データを開けませんでした：" + err.Error())
	}
	defer image.Close()

	c.Type("avif")

	_, err = io.Copy(c.Response().BodyWriter(), image)
	if err != nil {
		return c.Status(500).SendString("ファイル送信中にエラーが発生しました：" + err.Error())
	}

	return nil
}

func getTotalPage(c *fiber.Ctx) error {
	// キャッシュが有効か確認
	if time.Now().Before(cacheExpiration) && cachedPaths != nil {
		// キャッシュが有効ならそのまま返却
		len := strconv.Itoa(len(cachedPaths))
		return c.SendString(len)
	}

	files, err := utils.CollectFiles(utils.GetENV("BOX_DIR"), utils.GetENV("SEARCH_FILE"))
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
