package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"oktools/src/conf"
	"oktools/src/util"
)

func IPInfo(c *gin.Context) {
	param := c.Param("query")
	if param == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var addrs [] string
	if util.CheckIPV4(param) {
		// 是IPV4
		addrs = append(addrs, param)
	} else {
		// 根据域名查询
		var err error
		addrs, err = net.LookupHost(param)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			log.Println(err)
			return
		}
	}

	buf, err := getByAmap(addrs)
	if err != nil {
		buf = getByTaobao(addrs)
	}

	c.Data(http.StatusOK, "application/json; charset=utf-8", buf.Bytes())
}

func getByAmap(addrs [] string) (*bytes.Buffer, error) {
	var buf bytes.Buffer
	buf.WriteString("[")
	for k, v := range addrs {
		resp, err := http.Get("https://restapi.amap.com/v3/ip?key=" + conf.Conf.ThirdParty.Amap.Key + "&ip=" + v)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		if http.StatusOK != resp.StatusCode {
			return nil, errors.New("Failed to get ip data from amap , StatusCode : " + resp.Status)
		}

		data := gin.H{}
		err = json.NewDecoder(resp.Body).Decode(&data)
		if err != nil {
			log.Println(err)
			return nil, err
		}

		if data["status"] != "1" {
			err = errors.New("Failed to get ip data from amap , info : " + data["info"].(string))
			log.Println(err)
			return nil, err
		}

		data["ip"] = v
		data["status"] = nil
		data["info"] = nil
		data["infocode"] = nil

		b, err := json.Marshal(data)
		if err != nil {
			log.Println(err)
			return nil, err
		}

		if k > 0 {
			buf.WriteString(",")
		}
		buf.Write(b)
	}
	buf.WriteString("]")
	return &buf, nil
}

func getByTaobao(addrs [] string) *bytes.Buffer {
	var buf bytes.Buffer
	buf.WriteString("[")
	for k, v := range addrs {
		resp, err := http.Get("http://ip.taobao.com/service/getIpInfo.php?ip=" + v)
		if err != nil {
			log.Println(err)
			continue
		}

		if http.StatusOK != resp.StatusCode {
			log.Println("Failed to get ip data from taobao :", resp.Status)
			continue
		}

		data, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Println(err)
			continue
		}

		if k > 0 {
			buf.WriteString(",")
		}
		buf.Write(data)
	}
	buf.WriteString("]")
	return &buf
}
