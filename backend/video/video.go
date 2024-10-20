package video

import (
	"backend/utils"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Video(c *fiber.Ctx) error {
	normalizedPath := utils.BuildNormalizedPath(c.Params("path"), utils.GetENV("VIDEO_DIR"))
	file, err := os.Open(normalizedPath)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString("File not found.")
	}
	defer file.Close()

	fileStat, _ := file.Stat()
	fileSize := fileStat.Size()

	// `Range` ヘッダーを取得
	rangeHeader := c.Get("Range")
	if rangeHeader == "" {
		// 通常の全体ダウンロード
		c.Set("Content-Length", strconv.FormatInt(fileSize, 10))
		c.Set("Content-Type", "video/mp4")
		return c.SendStream(file)
	}

	// `Range` ヘッダーの解析
	rangeParts := strings.Split(rangeHeader, "=")
	if len(rangeParts) != 2 || rangeParts[0] != "bytes" {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid range request.")
	}

	byteRange := strings.Split(rangeParts[1], "-")
	start, err := strconv.ParseInt(byteRange[0], 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid range start.")
	}

	var end int64
	if byteRange[1] != "" {
		end, err = strconv.ParseInt(byteRange[1], 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid range end.")
		}
	} else {
		end = fileSize - 1
	}

	if start > end || end >= fileSize {
		return c.Status(fiber.StatusRequestedRangeNotSatisfiable).SendString("Range not satisfiable.")
	}

	// バイト範囲を設定
	length := end - start + 1
	c.Set("Content-Range", fmt.Sprintf("bytes %d-%d/%d", start, end, fileSize))
	c.Set("Content-Length", strconv.FormatInt(length, 10))
	c.Set("Content-Type", "video/mp4")
	c.Status(fiber.StatusPartialContent)

	// ファイルの指定範囲をレスポンスに書き込む
	file.Seek(start, io.SeekStart)
	return c.SendStream(io.LimitReader(file, length))
}
