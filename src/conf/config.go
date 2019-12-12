package conf

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"os"
)

type Config struct {
	App struct {
		Mode    string `yaml:"mode"`
		LogFile string `yaml:"log-file"`
	} `yaml:"app"`
	Http struct {
		Port string `yaml:"port"`
		SSL  struct {
			Enable bool   `yaml:"enable"`
			Crt    string `yaml:"crt"`
			Key    string `yaml:"key"`
		} `yaml:"ssl"`
	} `yaml:"http"`
	DataBase struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		Username string `yaml:"username"`
		Password string `yaml:"password"`
		DbName   string `yaml:"dbname"`
	} `yaml:"database"`
	ThirdParty struct {
		Amap struct {
			Key string `yaml:"key"`
		} `yaml:"amap"`
		ServerChan struct {
			Key string `yaml:"key"`
		} `yaml:"serverchan"`
	} `yaml:"third-party"`
}

var Conf = &Config{}

func init() {
	var conf string
	if len(os.Args) == 2 {
		conf = os.Args[1]
	}
	if conf == "" {
		conf = "conf.yaml"
	}

	data, err := ioutil.ReadFile(conf)
	if err != nil {
		log.Fatalln(err)
	}

	err = yaml.UnmarshalStrict(data, &Conf)
	if err != nil {
		log.Fatalln(err)
	}
}
