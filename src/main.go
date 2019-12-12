package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	_ "net/http/pprof"
	"net/url"
	"oktools/src/conf"
	"oktools/src/contoller"
	"oktools/src/middleware"
	"os"
	"time"
)

func main() {
	gin.SetMode(conf.Conf.App.Mode)

	if gin.Mode() == gin.ReleaseMode {
		// Release模式
		gin.DisableConsoleColor()

		logfile := conf.Conf.App.LogFile
		if logfile == "" {
			log.Fatalln("Please set the log file path!")
		}

		file, err := os.OpenFile(logfile, os.O_RDWR|os.O_CREATE|os.O_APPEND, os.ModePerm)
		if err != nil {
			file, err = os.Create(logfile)
			if file == nil {
				log.Fatalln(err)
			}
		}

		defer func() {
			err := file.Close()
			if err != nil {
				log.Fatalln(err)
			}
		}()

		gin.DefaultWriter = file
		log.SetOutput(file)
	} else {
		// Debug模式
		go func() {
			err := http.ListenAndServe(":6060", nil)
			if err != nil {
				log.Fatalln(err)
			}
		}()
	}

	r := initRouter()

	var err error
	if gin.Mode() == gin.ReleaseMode {
		serverChan("OkTools server started")

		runNoTLS()
		err = r.RunTLS(":"+conf.Conf.Http.Port, conf.Conf.Http.SSL.Crt, conf.Conf.Http.SSL.Key)
	} else {
		err = r.Run(":" + conf.Conf.Http.Port)
	}

	if err != nil {
		if gin.Mode() == gin.ReleaseMode {
			serverChan("OkTools server stopped")
		}
		log.Fatalln("Something terrible happened:", err)
	}
}

func serverChan(msg string) {
	key := conf.Conf.ThirdParty.ServerChan.Key
	msg += time.Now().Format(" - 2006-01-02 15:04:05")

	resp, err := http.Get(fmt.Sprintf("https://sc.ftqq.com/%s.send?text=%s", key, url.QueryEscape(msg)))
	if err == nil {
		bytes, _ := ioutil.ReadAll(resp.Body)
		log.Println("ServerChan resp:", string(bytes))
	} else {
		log.Println("ServerChan error:", err)
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
			log.Fatalln("Something terrible happened:", err)
		}
	}()
}
