const input_img = document.querySelector('#img_input img');
const output_img = document.querySelector('#img_output img');
const output_width = document.getElementById('output_width');
const output_height = document.getElementById('output_height');
const select_quality = document.getElementById('select_quality');
const output_quality = document.getElementById('output_quality');
const output_info = document.getElementById('output_info');
let file;
let blob;

const options = '<option value="1">100</option><option value="0.95">95</option><option value="0.90">90</option><option value="0.85">85</option><option value="0.80" selected>80</option><option value="0.75">75</option><option value="0.7">70</option><option value="0.65">65</option><option value="0.6">60</option><option value="0.5">50</option><option value="0.4">40</option><option value="0.3">30</option><option value="0.2">20</option><option value="0.1">10</option>';
select_quality.innerHTML = options;

function formatSize(size, len, units) {
    let unit;
    units = units || ['B', 'K', 'M', 'G', 'TB'];
    while ((unit = units.shift()) && size > 1024) {
        size = size / 1024;
    }
    return (unit === 'B' ? size : size.toFixed(len === undefined ? 2 : len)) + unit;
}

function preview(f) {
    if (!f) return;

    let reader = new FileReader();
    reader.onload = function () {
        document.getElementById('file_name').innerHTML = f.name;
        input_img.src = this.result
    };
    reader.readAsDataURL(f);
    file = f;
    output_info.innerText = '';

    input_img.onload = () => {
        output_width.value = input_img.naturalWidth;
        output_height.value = input_img.naturalHeight;
        document.getElementById('file_name').innerHTML = f.name + `&nbsp;&nbsp;<a>[${formatSize(f.size)} - ${input_img.naturalWidth}x${input_img.naturalHeight}]</a>`;
    }
}

function onChangeWidth() {
    let ratio = input_img.width / input_img.height;
    output_height.value = Math.round(output_width.value / ratio);
}

function onChangeHeight() {
    let ratio = input_img.width / input_img.height;
    output_width.value = Math.round(output_height.value * ratio);
}

function onInputQuality() {
    let quality = output_quality.value;
    if (quality) {
        quality = parseInt(quality);
        if (quality <= 0 || quality > 100) {
            alert('压缩质量在0-100之间');
            return
        }
        select_quality.innerHTML = ''
    } else {
        select_quality.innerHTML = options
    }
}

function compress(btn) {
    btn.innerText = '压缩中...';
    new Promise(function (resolve) {
        setTimeout(function () {
            resolve(_compress())
        }, 50);
    }).then(function (e) {
        output_img.src = e[0];
        blob = e[1];
        output_info.innerText = formatSize(blob.size);
        btn.innerText = '压缩';
    });
}

function _compress() {
    let w = parseInt(output_width.value);
    let h = parseInt(output_height.value);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);

    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(input_img, 0, 0, w, h);

    let quality = output_quality.value;
    if (quality) {
        quality = parseInt(quality) / 100;
    } else {
        quality = parseFloat(select_quality.value)
    }

    const base64 = canvas.toDataURL('image/jpeg', quality);
    const bytes = window.atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: 'image/jpeg'});
    return [base64, blob]
}

function save() {
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.download = file.name.split('.')[0] + '_' + Math.round(new Date() / 1000) + '.jpg';
    a.href = URL.createObjectURL(blob);
    a.dispatchEvent(event)
}