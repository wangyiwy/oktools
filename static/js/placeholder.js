const host = 'https://oktools.net';

function preview(url) {
    document.getElementById('preview').setAttribute('href', url);
    document.getElementById('img_preview').setAttribute('src', url);
    document.getElementById('input_url').value = url;
}

function generate() {
    let path = host + '/ph/';
    let width = parseInt(document.getElementById('input_width').value);
    if (width <= 0) {
        alert('宽必须大于0');
        return
    }
    path += width;

    let height = parseInt(document.getElementById('input_height').value);
    if (height > 0) {
        path += 'x' + height;
    }

    let hasParam = false;
    let text = document.getElementById('input_text').value;
    if (text) {
        path += '?t=' + text;
        hasParam = true
    }

    let bgColor = document.getElementById('input_bg_color').value;
    if (bgColor) {
        if (!checkHexColor(bgColor)) {
            alert('背景颜色取值错误');
            return;
        }
        path += hasParam ? '&bg=' + bgColor : '?bg=' + bgColor;
        hasParam = true
    }

    let fgColor = document.getElementById('input_fg_color').value;
    if (fgColor) {
        if (!checkHexColor(fgColor)) {
            alert('前景颜色取值错误');
            return;
        }
        path += hasParam ? '&fg=' + fgColor : '?fg=' + fgColor
    }

    preview(path)
}

function checkHexColor(s) {
    let hexStr = s.toLowerCase();
    let reg = /^([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    return hexStr && reg.test(hexStr)
}

function copyUrl() {
    let input_url = document.getElementById('input_url');
    let url = input_url.value;
    if (url) {
        input_url.select();
        document.execCommand("copy");
        alert("复制成功");
    }
}

preview(host + '/ph/800x200');