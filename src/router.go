package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"oktools/src/contoller"
	"oktools/src/middleware"
	"oktools/src/service"
)

func initRouter() *gin.Engine {
	r := gin.Default()

	r.Static("/static", "./static")
	r.LoadHTMLGlob("./tpl/*")

	r.GET("/favicon.ico", func(c *gin.Context) {
		c.Header("Cache-Control", "max-age=3153600")
		c.File("./static/favicon.ico")
	})

	r.GET("/", contoller.Index)
	r.GET("/ping", contoller.Ping)
	r.GET("/uptime", contoller.Uptime)
	r.GET("/ph/:size", service.PlaceHolder)

	r.GET("/base64", contoller.Base64, middleware.UsageCount)
	r.GET("/image2base64", contoller.Image2Base64, middleware.UsageCount)
	r.GET("/tinyimg", contoller.TinyImage, middleware.UsageCount)
	r.GET("/hash", contoller.Hash, middleware.UsageCount)
	r.GET("/file-hash", contoller.FileHash, middleware.UsageCount)
	r.GET("/ip", contoller.IPInfo, middleware.UsageCount)
	r.GET("/json", contoller.JSONView, middleware.UsageCount)
	r.GET("/number", contoller.Number, middleware.UsageCount)
	r.GET("/placeholder", contoller.Placeholder, middleware.UsageCount)
	r.GET("/qrcode", contoller.QRCode, middleware.UsageCount)
	r.GET("/regex", contoller.Regex, middleware.UsageCount)
	r.GET("/timestamp", contoller.Timestamp, middleware.UsageCount)
	r.GET("/color", contoller.Color, middleware.UsageCount)
	r.GET("/aes", contoller.AES, middleware.UsageCount)
	r.GET("/des", contoller.DES, middleware.UsageCount)
	r.GET("/rsa", contoller.RSA, middleware.UsageCount)
	r.GET("/morse", contoller.Morse, middleware.UsageCount)
	r.GET("/url", contoller.URL, middleware.UsageCount)
	r.GET("/unicode", contoller.Unicode, middleware.UsageCount)
	r.GET("/json2go", contoller.JSON2GO, middleware.UsageCount)
	r.GET("/json2xml", contoller.JSON2XML, middleware.UsageCount)
	r.GET("/json2yaml", contoller.JSON2YAML, middleware.UsageCount)
	r.GET("/pdf2img", contoller.PDF2IMG, middleware.UsageCount)

	r.GET("/websocket", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "http://oktools.net/websocket")
	})

	api := r.Group("/api")
	{
		api.GET("/ip/:query", service.IPInfo)
	}
	return r
}
