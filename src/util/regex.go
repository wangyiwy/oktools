package util

import (
	"regexp"
)

// 校验是否是IPV4
func CheckIPV4(ip string) bool {
	pattern := `(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}`
	reg := regexp.MustCompile(pattern)
	return reg.MatchString(ip)
}
