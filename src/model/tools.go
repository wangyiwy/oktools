package model

import (
	"bytes"
	"log"
	"oktools/src/global"
	"strconv"
	"time"
)

// 内存缓存有效期
const toolsCacheAge = 24 * time.Hour

type Tool struct {
	Path       string  `json:"path"`
	Title      string  `json:"title"`
	Icon       *string `json:"icon"`
	Category   int     `json:"category,,omitempty"`
	UsageCount int     `json:"usage_count,omitempty"`
}

type Cache struct {
	Data  interface{}
	Expir time.Time
}

var ToolMap = make(map[string]*Tool)

// 全部工具内存缓存
var toolsCache *Cache

func GetTools() [] *Tool {
	now := time.Now()
	if toolsCache == nil || toolsCache.Expir.Before(now) {
		tools, err := loadTools()
		if err != nil {
			log.Println("Failed to load tools data :", err)
			return nil
		}

		toolsCache = &Cache{}
		toolsCache.Data = tools
		toolsCache.Expir = now.Add(toolsCacheAge)
		return tools
	}
	return toolsCache.Data.([] *Tool)
}

func loadTools() ([] *Tool, error) {
	rows, err := global.DB.Query(`SELECT path,title,icon,usage_count,category FROM tools ORDER  BY usage_count desc`)
	if err != nil {
		return nil, err
	}

	var tools []*Tool
	for rows.Next() {
		tool := &Tool{}
		err = rows.Scan(&tool.Path, &tool.Title, &tool.Icon, &tool.UsageCount, &tool.Category)
		if err != nil {
			return nil, err
		}
		tools = append(tools, tool)
		ToolMap[tool.Path] = tool
	}
	return tools, nil
}

func UpdateUsageCount() {
	if len(ToolMap) == 0 {
		log.Println("Tools map is empty , No need to update data!")
		return
	}

	var buf bytes.Buffer
	buf.WriteString("UPDATE tools SET usage_count = CASE path ")
	for k, v := range ToolMap {
		buf.WriteString(" WHEN '")
		buf.WriteString(k)
		buf.WriteString("' THEN ")
		buf.WriteString(strconv.Itoa(v.UsageCount))
	}
	buf.WriteString(" END WHERE path IN(")

	for k := range ToolMap {
		buf.WriteString("'")
		buf.WriteString(k)
		buf.WriteString("'")
		buf.WriteString(",")
	}
	buf.WriteString("'')")

	sql := buf.String()
	_, err := global.DB.Exec(sql)
	if err != nil {
		log.Println("Failed to update tools usage count data :", err)
	}

	log.Println(sql)
}

func init() {
	_, err := loadTools()
	if err != nil {
		log.Fatalln(err)
	}
}
