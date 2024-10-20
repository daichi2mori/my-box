package main

import (
	"backend/ero"
	"backend/manga"
	"backend/utils"
	"backend/video"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	port := utils.GetENV("PORT")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3004, http://192.168.11.9:3004, https://my-box.daichi2mori.com",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World")
	})

	app.Get("/ero/page/:page", ero.Page)
	app.Get("/ero/cover/:path", ero.Cover)
	app.Get("/ero/author/:path", ero.Author)
	app.Get("/ero/book/:path", ero.Book)
	app.Get("/ero/total-page", ero.TotalPage)
	app.Get("/ero/image/:path", ero.Image)

	app.Get("/manga/page/:page", manga.Page)
	app.Get("/manga/cover/:path", manga.Cover)
	app.Get("/manga/author/:path", manga.Author)
	app.Get("/manga/book/:path", manga.Book)
	app.Get("/manga/total-page", manga.TotalPage)
	app.Get("/manga/image/:path", manga.Image)

	app.Get("/video/:path", video.Video)

	// TSLの残骸
	// cert := utils.GetTLS()
	// app.ListenTLSWithCertificate(port, cert)
	app.Listen(port)
}
