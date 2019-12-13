package main

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/css"
	"github.com/tdewolff/minify/html"
	"github.com/tdewolff/minify/js"
	"io"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
)

const buildDir = "./build"
const tempDir = buildDir + "/oktools"

const srcTplDir = "./tpl"
const dstTplDir = tempDir + "/tpl/"

const srcCSSDir = "./static/css"
const dstCSSDir = tempDir + "/static/css/"

const srcJSDir = "./static/js"
const dstJSDir = tempDir + "/static/js/"

func main() {
	clean()
	buildGo()
	minifyStatic()
	copyFiles()
	packAll()
}

func clean() {
	err := os.RemoveAll(buildDir)
	if err != nil {
		fmt.Println(err)
	}
}

func buildGo() {
	err := os.Setenv("GOOS", "linux")
	err = os.Setenv("GOARCH", "amd64")
	checkError(err)

	cmd := exec.Command("go", "build", "-o", tempDir+"/oktools", "-i", "./src")
	cmd.Stderr = os.Stderr
	out, err := cmd.Output()
	checkError(err)
	fmt.Println(string(out))
}

func minifyStatic() {
	m := minify.New()
	m.AddFunc("text/css", css.Minify)
	m.AddFunc("text/html", html.Minify)
	m.AddFuncRegexp(regexp.MustCompile("^(application|text)/(x-)?(java|ecma)script$"), js.Minify)

	minifyFiles(m, "text/html", srcTplDir, dstTplDir)
	minifyFiles(m, "text/css", srcCSSDir, dstCSSDir)
	minifyFiles(m, "application/javascript", srcJSDir, dstJSDir)
}

func copyFiles() {
	copyDir("./sql", tempDir+"/sql")
	copyFile("./static/favicon.ico", tempDir+"/static/favicon.ico")
	copyFile("./conf.yaml", tempDir+"/conf.yaml")
}

func minifyFiles(m *minify.M, mimeType, src, dst string) {
	err := os.MkdirAll(dst, os.ModePerm)
	checkError(err)

	err = filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}

		file, err := os.Open(path)
		if err != nil {
			return err
		}

		dest, err := os.Create(dst + info.Name())
		if err != nil {
			return err
		}
		defer dest.Close()

		if strings.HasSuffix(info.Name(), "min.css") || strings.HasSuffix(info.Name(), "min.js") {
			_, err = io.Copy(dest, file)
			return err
		}

		return m.Minify(mimeType, dest, file)
	})
	checkError(err)
}

func copyDir(src string, dst string) {
	err := os.MkdirAll(dst, os.ModePerm)
	checkError(err)

	dir, _ := os.Open(src)
	defer dir.Close()
	objects, err := dir.Readdir(-1)

	for _, obj := range objects {
		srcFile := src + "/" + obj.Name()
		dstFile := dst + "/" + obj.Name()

		if obj.IsDir() {
			copyDir(srcFile, dstFile)
		} else {
			copyFile(srcFile, dstFile)
		}
	}
}

func copyFile(src string, dst string) {
	srcFile, err := os.Open(src)
	defer srcFile.Close()
	checkError(err)

	destFile, err := os.Create(dst)
	defer destFile.Close()
	checkError(err)

	_, err = io.Copy(destFile, srcFile)
	checkError(err)

	err = os.Chmod(dst, os.ModePerm)
	checkError(err)
}

func packAll() {
	dir, err := os.Open(tempDir)
	defer dir.Close()
	checkError(err)

	info, err := dir.Stat()
	checkError(err)

	d, err := os.Create(buildDir + "/" + info.Name() + ".tar.gz")
	defer d.Close()
	checkError(err)

	gw := gzip.NewWriter(d)
	defer gw.Close()

	tw := tar.NewWriter(gw)
	defer tw.Close()

	compress(dir, "", tw)
}

func compress(file *os.File, prefix string, tw *tar.Writer) {
	info, err := file.Stat()
	checkError(err)

	if info.IsDir() {
		prefix = prefix + "/" + info.Name()
		fileInfos, err := file.Readdir(-1)
		checkError(err)

		for _, fi := range fileInfos {
			f, err := os.Open(file.Name() + "/" + fi.Name())
			checkError(err)

			compress(f, prefix, tw)
			f.Close()
		}
	} else {
		h, err := tar.FileInfoHeader(info, "")
		checkError(err)

		h.Name = prefix + "/" + h.Name
		h.Mode = int64(info.Mode().Perm())
		err = tw.WriteHeader(h)
		checkError(err)

		_, err = io.Copy(tw, file)
		err = file.Close()
		checkError(err)
	}
}

func checkError(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
