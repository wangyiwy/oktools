package contoller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"oktools/src/model"
	"time"
)

const (
	second = 1
	minute = 60 * second
	hour   = 60 * minute
	day    = 24 * hour
)

var begin = time.Now()

func Uptime(c *gin.Context) {
	diff := time.Now().Unix() - begin.Unix()
	days := diff / day
	hours := (diff - days*day) / hour
	minutes := (diff - days*day - hours*hour) / minute
	seconds := (diff - minutes*minute - days*day - hours*hour) / second

	c.String(http.StatusOK,
		fmt.Sprintf("The system launched in %s. already running for %d days, %d hours, %d minues, %d seconds.",
			begin.Format("2006-01-02 15:04:05"), days, hours, minutes, seconds),
	)
}

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"msg": "pong"})
}

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"tools": model.GetTools(),
	})
}

func Color(c *gin.Context) {
	c.HTML(http.StatusOK, "color.html", nil)
}

func Base64(c *gin.Context) {
	c.HTML(http.StatusOK, "base64.html", nil)
}

func Image2Base64(c *gin.Context) {
	c.HTML(http.StatusOK, "image2base64.html", nil)
}

func TinyImage(c *gin.Context) {
	c.HTML(http.StatusOK, "tinyimg.html", nil)
}

func Hash(c *gin.Context) {
	c.HTML(http.StatusOK, "hash.html", nil)
}

func FileHash(c *gin.Context) {
	c.HTML(http.StatusOK, "file_hash.html", nil)
}

func IPInfo(c *gin.Context) {
	c.HTML(http.StatusOK, "ip.html", gin.H{
		"IP": c.ClientIP(),
	})
}

func JSONView(c *gin.Context) {
	c.HTML(http.StatusOK, "json.html", nil)
}

func Number(c *gin.Context) {
	c.HTML(http.StatusOK, "number.html", nil)
}

func Placeholder(c *gin.Context) {
	c.HTML(http.StatusOK, "placeholder.html", nil)
}

func QRCode(c *gin.Context) {
	c.HTML(http.StatusOK, "qrcode.html", nil)
}

func Regex(c *gin.Context) {
	c.HTML(http.StatusOK, "regex.html", nil)
}

func Timestamp(c *gin.Context) {
	c.HTML(http.StatusOK, "timestamp.html", nil)
}

func WebSocket(c *gin.Context) {
	c.HTML(http.StatusOK, "websocket.html", nil)
}

func AES(c *gin.Context) {
	c.HTML(http.StatusOK, "aes.html", nil)
}

func DES(c *gin.Context) {
	c.HTML(http.StatusOK, "des.html", nil)
}

func RSA(c *gin.Context) {
	c.HTML(http.StatusOK, "rsa.html", nil)
}

func Morse(c *gin.Context) {
	c.HTML(http.StatusOK, "morse.html", nil)
}

func URL(c *gin.Context) {
	c.HTML(http.StatusOK, "url.html", nil)
}

func Unicode(c *gin.Context) {
	c.HTML(http.StatusOK, "unicode.html", nil)
}

func JSON2GO(c *gin.Context) {
	c.HTML(http.StatusOK, "json2go.html", nil)
}

func JSON2XML(c *gin.Context) {
	c.HTML(http.StatusOK, "json2xml.html", nil)
}

func JSON2YAML(c *gin.Context) {
	c.HTML(http.StatusOK, "json2yaml.html", nil)
}

func PDF2IMG(c *gin.Context) {
	c.HTML(http.StatusOK, "pdf2img.html", nil)
}

func Clocks(c *gin.Context) {
	c.HTML(http.StatusOK, "clocks.html", nil)
}
