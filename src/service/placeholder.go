package service

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"math"
	"net/http"
	"strconv"
	"strings"
)

const (
	defaultBackground = "CCC"
	defaultForeground = "FFF"
)

func PlaceHolder(c *gin.Context) {
	var err error
	// 图片参数
	var bg string
	var fg string
	var text string
	var width int
	var height int
	var fontSize int

	// 确定尺寸
	size := c.Param("size")
	if size == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	sizeArr := strings.Split(size, "x")
	l := len(sizeArr)
	if l == 1 {
		// 方形
		width, err = strconv.Atoi(sizeArr[0])
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		height = width
	} else if l == 2 {
		// 确定宽度
		width, err = strconv.Atoi(sizeArr[0])
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		// 确定高度
		height, err = strconv.Atoi(sizeArr[1])
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
	} else {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// 文字
	text = c.DefaultQuery("t", strconv.Itoa(width)+"x"+strconv.Itoa(height))
	// 背景颜色
	bg = c.DefaultQuery("bg", defaultBackground)
	// 前景颜色
	fg = c.DefaultQuery("fg", defaultForeground)
	// 字体大小
	fontSize = int(math.Min(float64(width)/float64(len(text)), float64(height)))

	c.Header("Cache-Control", "max-age=3153600")
	c.Header("Content-Type", "image/svg+xml")

	// 生成SVG文本
	_, err = fmt.Fprintf(c.Writer, `<svg xmlns='http://www.w3.org/2000/svg' width='%d' height='%d'><rect x='0' y='0' width='%d' height='%d' fill='#%s'/><text x='50%%' y='50%%' style='dominant-baseline:middle;text-anchor:middle;font-size:%dpx' fill='#%s'>%s</text></svg>`,
		width, height, width, height, bg, fontSize, fg, text)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	}
}
