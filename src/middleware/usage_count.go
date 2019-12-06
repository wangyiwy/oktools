package middleware

import (
	"github.com/gin-gonic/gin"
	"oktools/src/model"
	"time"
)

var channel = make(chan string)

const flushInterval = 5 * time.Minute

func init() {
	timer := time.NewTicker(flushInterval)

	go func() {
		for {
			select {
			case path := <-channel:
				// 使用次数 +1
				model.ToolMap[path].UsageCount++
			case <-timer.C:
				// 使用次数写入数据库
				model.UpdateUsageCount()
			}
		}
	}()
}

func UsageCount(c *gin.Context) {
	channel <- c.Request.URL.Path
}
