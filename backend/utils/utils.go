package utils

import (
	"crypto/tls"
	"io"
	"log"
	"math/rand"
	"net/url"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func GetTLS() tls.Certificate {
	certFile := "certs/cert.pem"
	keyFile := "certs/key.pem"

	// ファイルが存在するか確認する（オプション）
	if _, err := os.Stat(certFile); os.IsNotExist(err) {
		log.Fatalf("Certificate file not found: %s", certFile)
	}
	if _, err := os.Stat(keyFile); os.IsNotExist(err) {
		log.Fatalf("Key file not found: %s", keyFile)
	}

	cert, err := tls.LoadX509KeyPair(certFile, keyFile)
	if err != nil {
		log.Fatal(err)
	}

	return cert
}

func GetENV(name string) string {
	// .envファイルを読み込む
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// 環境変数を取得
	env := os.Getenv(name)
	return env
}

func ShuffleAndChunks(files []string) [][]string {
	var chunks = make([][]string, 0, len(files)/20+1)

	rand.Shuffle(len(files), func(i, j int) {
		files[i], files[j] = files[j], files[i]
	})

	for chunk := range slices.Chunk(files, 20) {
		chunks = append(chunks, chunk)
	}

	return chunks
}

func MakeChunks(files []string) [][]string {
	var chunks = make([][]string, 0, len(files)/20+1)

	for chunk := range slices.Chunk(files, 20) {
		chunks = append(chunks, chunk)
	}

	return chunks
}

func BuildFilePath(path, root, searchName string) (string, error) {
	decodedPath, err := url.QueryUnescape(path)
	if err != nil {
		return "", err
	}
	return filepath.ToSlash(filepath.Join(root, strings.ReplaceAll(decodedPath, "__", "/"), searchName)), nil
}

func BuildNormalizedPath(path, root string) string {
	decodedPath, _ := url.QueryUnescape(path)
	return filepath.ToSlash(filepath.Join(root, strings.ReplaceAll(decodedPath, "__", "/")))
}

func buildAuthorAndTitle(path string) string {
	normalizedPath := filepath.ToSlash(path)
	parts := strings.Split(normalizedPath, "/")
	return parts[len(parts)-3] + "__" + parts[len(parts)-2]
}

func CollectFiles(root, searchName string) ([]string, error) {
	var files []string
	err := filepath.WalkDir(root, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && filepath.Base(path) == searchName {
			files = append(files, buildAuthorAndTitle(path))
		}
		return nil
	})
	return files, err
}

func SendFile(c *fiber.Ctx, path string) error {
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
