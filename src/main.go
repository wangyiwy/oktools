package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	_ "net/http/pprof"
	"oktools/src/conf"
	"oktools/src/contoller"
	"oktools/src/middleware"
	"os"
)

func main() {
	gin.SetMode(conf.Conf.App.Mode)

	if gin.Mode() == gin.ReleaseMode {
		// Release模式
		gin.DisableConsoleColor()

		logfile := conf.Conf.App.LogFile
		if logfile == "" {
			panic("Please set the log file path!")
		}

		f, err := os.OpenFile(logfile, os.O_RDWR|os.O_CREATE|os.O_APPEND, os.ModePerm)
		if err != nil {
			f, err = os.Create(logfile)
			if f == nil {
				panic(err)
			}
		}

		defer func() {
			err := f.Close()
			if err != nil {
				panic(err)
			}
		}()

		gin.DefaultWriter = f
		log.SetOutput(f)
	} else {
		// Debug模式
		go func() {
			err := http.ListenAndServe(":6060", nil)
			if err != nil {
				panic(err)
			}
		}()
	}

	r := initRouter()
	var err error
	if gin.Mode() == gin.ReleaseMode {
		runNoTLS()
		err = r.RunTLS(":"+conf.Conf.Http.Port, conf.Conf.Http.SSL.Crt, conf.Conf.Http.SSL.Key)
	} else {
		err = r.Run(":" + conf.Conf.Http.Port)
	}

	if err != nil {
		if gin.Mode() == gin.ReleaseMode {
			_, _ = http.Get("https://sc.ftqq.com/" + conf.Conf.ThirdParty.ServerChan.Key + ".send" +
				"?text=主人服务器又挂掉啦~&desp=" + err.Error())
		}
		panic(err)
	}
}

func runNoTLS() {
	go func() {
		e := gin.Default()
		e.LoadHTMLFiles("./tpl/websocket.html", "./tpl/aside.html")

		e.GET("/*path", func(c *gin.Context) {
			uri := c.Request.RequestURI
			if "/websocket" == uri {
				contoller.WebSocket(c)
				middleware.UsageCount(c)
			} else {
				c.Redirect(http.StatusMovedPermanently, "https://oktools.net"+uri)
			}
		})

		err := e.Run(":80")
		if err != nil {
			panic(err)
		}
	}()
}
