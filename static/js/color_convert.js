const colors = [{"gray": [["gainsboro", "#dcdcdc", "220, 220, 220", "0, 0%, 86%"], ["lightgray", "#d3d3d3", "211, 211, 211", "0, 0%, 83%"], ["silver", "#c0c0c0", "192, 192, 192", "0, 0%, 75%"], ["darkgray", "#a9a9a9", "169, 169, 169", "0, 0%, 66%"], ["gray", "#808080", "128, 128, 128", "0, 0%, 50%"], ["dimgray", "#696969", "105, 105, 105", "0, 0%, 41%"], ["lightslategray", "#778899", "119, 136, 153", "210, 14%, 53%"], ["slategray", "#708090", "112, 128, 144", "210, 13%, 50%"], ["darkslategray", "#2f4f4f", "47, 79, 79", "180, 25%, 25%"], ["black", "#000000", "0, 0, 0", "0, 0%, 0%"]]}, {"red": [["indianred", "#cd5c5c", "205, 92, 92", "0, 53%, 58%"], ["lightcoral", "#f08080", "240, 128, 128", "0, 79%, 72%"], ["salmon", "#fa8072", "250, 128, 114", "6, 93%, 71%"], ["darksalmon", "#e9967a", "233, 150, 122", "15, 72%, 70%"], ["lightsalmon", "#ffa07a", "255, 160, 122", "17, 100%, 74%"], ["crimson", "#dc143c", "220, 20, 60", "348, 83%, 47%"], ["red", "#ff0000", "255, 0, 0", "0, 100%, 50%"], ["firebrick", "#b22222", "178, 34, 34", "0, 68%, 42%"], ["darkred", "#8b0000", "139, 0, 0", "0, 100%, 27%"]]}, {"orange": [["lightsalmon", "#ffa07a", "255, 160, 122", "17, 100%, 74%"], ["coral", "#ff7f50", "255, 127, 80", "16, 100%, 66%"], ["tomato", "#ff6347", "255, 99, 71", "9, 100%, 64%"], ["orangered", "#ff4500", "255, 69, 0", "16, 100%, 50%"], ["darkorange", "#ff8c00", "255, 140, 0", "33, 100%, 50%"], ["orange", "#ffa500", "255, 165, 0", "39, 100%, 50%"]]}, {"brown": [["cornsilk", "#fff8dc", "255, 248, 220", "48, 100%, 93%"], ["blanchedalmond", "#ffebcd", "255, 235, 205", "36, 100%, 90%"], ["bisque", "#ffe4c4", "255, 228, 196", "33, 100%, 88%"], ["navajowhite", "#ffdead", "255, 222, 173", "36, 100%, 84%"], ["wheat", "#f5deb3", "245, 222, 179", "39, 77%, 83%"], ["burlywood", "#deb887", "222, 184, 135", "34, 57%, 70%"], ["tan", "#d2b48c", "210, 180, 140", "34, 44%, 69%"], ["rosybrown", "#bc8f8f", "188, 143, 143", "0, 25%, 65%"], ["sandybrown", "#f4a460", "244, 164, 96", "28, 87%, 67%"], ["goldenrod", "#daa520", "218, 165, 32", "43, 74%, 49%"], ["darkgoldenrod", "#b8860b", "184, 134, 11", "43, 89%, 38%"], ["peru", "#cd853f", "205, 133, 63", "30, 59%, 53%"], ["chocolate", "#d2691e", "210, 105, 30", "25, 75%, 47%"], ["saddlebrown", "#8b4513", "139, 69, 19", "25, 76%, 31%"], ["sienna", "#a0522d", "160, 82, 45", "19, 56%, 40%"], ["brown", "#a52a2a", "165, 42, 42", "0, 59%, 41%"], ["maroon", "#800000", "128, 0, 0", "0, 100%, 25%"]]}, {
    "blue": [["aqua", "#00ffff", "0, 255, 255", "180, 100%, 50%"], ["cyan", "#00ffff", "0, 255, 255", "180, 100%, 50%"], ["lightcyan", "#e0ffff", "224, 255, 255", "180, 100%, 94%"], ["paleturquoise", "#afeeee", "175, 238, 238", "180, 65%, 81%"], ["aquamarine", "#7fffd4", "127, 255, 212", "160, 100%, 75%"], ["turquoise", "#40e0d0", "64, 224, 208", "174, 72%, 56%"], ["mediumturquoise", "#48d1cc", "72, 209, 204", "178, 60%, 55%"], ["darkturquoise", "#00ced1", "0, 206, 209", "181, 100%, 41%"], ["cadetblue", "#5f9ea0", "95, 158, 160", "182, 25%, 50%"], ["steelblue", "#4682b4", "70, 130, 180", "207, 44%, 49%"], ["lightsteelblue", "#b0c4de", "176, 196, 222", "214, 41%, 78%"], ["powderblue", "#b0e0e6", "176, 224, 230", "187, 52%, 80%"], ["lightblue", "#add8e6", "173, 216, 230", "195, 53%, 79%"], ["skyblue", "#87ceeb", "135, 206, 235", "197, 71%, 73%"], ["lightskyblue", "#87cefa", "135, 206, 250", "203, 92%, 75%"], ["deepskyblue", "#00bfff", "0, 191, 255", "195, 100%, 50%"], ["dodgerblue", "#1e90ff", "30, 144, 255", "210, 100%, 56%"], ["cornflowerblue", "#6495ed", "100, 149, 237", "219, 79%, 66%"], ["mediumslateblue", "#7b68ee", "123, 104, 238", "249, 80%, 67%"], ["royalblue", "#4169e1", "65, 105, 225", "225, 73%, 57%"], ["blue", "#0000ff", "0, 0, 255", "240, 100%, 50%"], ["mediumblue", "#0000cd", "0, 0, 205", "240, 100%, 40%"], ["darkblue", "#00008b", "0, 0, 139", "240, 100%, 27%"], ["navy", "#000080", "0, 0, 128", "240, 100%, 25%"], ["midnightblue", "#191970", "25, 25, 112", "240, 64%, 27%"]]
}, {
    "green": [["greenyellow", "#adff2f", "173, 255, 47", "84, 100%, 59%"], ["chartreuse", "#7fff00", "127, 255, 0", "90, 100%, 50%"], ["lawngreen", "#7cfc00", "124, 252, 0", "90, 100%, 49%"], ["lime", "#00ff00", "0, 255, 0", "120, 100%, 50%"], ["limegreen", "#32cd32", "50, 205, 50", "120, 61%, 50%"], ["palegreen", "#98fb98", "152, 251, 152", "120, 93%, 79%"], ["lightgreen", "#90ee90", "144, 238, 144", "120, 73%, 75%"], ["mediumspringgreen", "#00fa9a", "0, 250, 154", "157, 100%, 49%"], ["springgreen", "#00ff7f", "0, 255, 127", "150, 100%, 50%"], ["mediumseagreen", "#3cb371", "60, 179, 113", "147, 50%, 47%"], ["seagreen", "#2e8b57", "46, 139, 87", "146, 50%, 36%"], ["forestgreen", "#228b22", "34, 139, 34", "120, 61%, 34%"], ["green", "#008000", "0, 128, 0", "120, 100%, 25%"], ["darkgreen", "#006400", "0, 100, 0", "120, 100%, 20%"], ["yellowgreen", "#9acd32", "154, 205, 50", "80, 61%, 50%"], ["olivedrab", "#6b8e23", "107, 142, 35", "80, 60%, 35%"], ["olive", "#808000", "128, 128, 0", "60, 100%, 25%"], ["darkolivegreen", "#556b2f", "85, 107, 47", "82, 39%, 30%"], ["mediumaquamarine", "#66cdaa", "102, 205, 170", "160, 51%, 60%"], ["darkseagreen", "#8fbc8b", "143, 188, 139", "115, 27%, 64%"], ["lightseagreen", "#20b2aa", "32, 178, 170", "177, 70%, 41%"], ["darkcyan", "#008b8b", "0, 139, 139", "180, 100%, 27%"], ["teal", "#008080", "0, 128, 128", "180, 100%, 25%"]]
}, {"pink": [["pink", "#ffc0cb", "255, 192, 203", "350, 100%, 88%"], ["lightpink", "#ffb6c1", "255, 182, 193", "351, 100%, 86%"], ["hotpink", "#ff69b4", "255, 105, 180", "330, 100%, 71%"], ["deeppink", "#ff1493", "255, 20, 147", "328, 100%, 54%"], ["mediumvioletred", "#c71585", "199, 21, 133", "322, 81%, 43%"], ["palevioletred", "#db7093", "219, 112, 147", "340, 60%, 65%"]]}, {
    "purple": [["lavender", "#e6e6fa", "230, 230, 250", "240, 67%, 94%"], ["thistle", "#d8bfd8", "216, 191, 216", "300, 24%, 80%"], ["plum", "#dda0dd", "221, 160, 221", "300, 47%, 75%"], ["violet", "#ee82ee", "238, 130, 238", "300, 76%, 72%"], ["orchid", "#da70d6", "218, 112, 214", "302, 59%, 65%"], ["fuchsia", "#ff00ff", "255, 0, 255", "300, 100%, 50%"], ["magenta", "#ff00ff", "255, 0, 255", "300, 100%, 50%"], ["mediumorchid", "#ba55d3", "186, 85, 211", "288, 59%, 58%"], ["mediumpurple", "#9370db", "147, 112, 219", "260, 60%, 65%"], ["rebeccapurple", "#663399", "102, 51, 153", "270, 50%, 40%"], ["blueviolet", "#8a2be2", "138, 43, 226", "271, 76%, 53%"], ["darkviolet", "#9400d3", "148, 0, 211", "282, 100%, 41%"], ["darkorchid", "#9932cc", "153, 50, 204", "280, 61%, 50%"], ["darkmagenta", "#8b008b", "139, 0, 139", "300, 100%, 27%"], ["purple", "#800080", "128, 0, 128", "300, 100%, 25%"], ["indigo", "#4b0082", "75, 0, 130", "275, 100%, 25%"], ["slateblue", "#6a5acd", "106, 90, 205", "248, 53%, 58%"], ["darkslateblue", "#483d8b", "72, 61, 139", "248, 39%, 39%"], ["mediumslateblue", "#7b68ee", "123, 104, 238", "249, 80%, 67%"]]
}, {
    "white": [["white", "#ffffff", "255, 255, 255", "0, 0%, 100%"], ["snow", "#fffafa", "255, 250, 250", "0, 100%, 99%"], ["honeydew", "#f0fff0", "240, 255, 240", "120, 100%, 97%"], ["mintcream", "#f5fffa", "245, 255, 250", "150, 100%, 98%"], ["azure", "#f0ffff", "240, 255, 255", "180, 100%, 97%"], ["aliceblue", "#f0f8ff", "240, 248, 255", "208, 100%, 97%"], ["ghostwhite", "#f8f8ff", "248, 248, 255", "240, 100%, 99%"], ["whitesmoke", "#f5f5f5", "245, 245, 245", "0, 0%, 96%"], ["seashell", "#fff5ee", "255, 245, 238", "25, 100%, 97%"], ["beige", "#f5f5dc", "245, 245, 220", "60, 56%, 91%"], ["oldlace", "#fdf5e6", "253, 245, 230", "39, 85%, 95%"], ["floralwhite", "#fffaf0", "255, 250, 240", "40, 100%, 97%"], ["ivory", "#fffff0", "255, 255, 240", "60, 100%, 97%"], ["antiquewhite", "#faebd7", "250, 235, 215", "34, 78%, 91%"], ["linen", "#faf0e6", "250, 240, 230", "30, 67%, 94%"], ["lavenderblush", "#fff0f5", "255, 240, 245", "340, 100%, 97%"], ["mistyrose", "#ffe4e1", "255, 228, 225", "6, 100%, 94%"]]
}, {"yellow": [["gold", "#ffd700", "255, 215, 0", "51, 100%, 50%"], ["yellow", "#ffff00", "255, 255, 0", "60, 100%, 50%"], ["lightyellow", "#ffffe0", "255, 255, 224", "60, 100%, 94%"], ["lemonchiffon", "#fffacd", "255, 250, 205", "54, 100%, 90%"], ["lightgoldenrodyellow", "#fafad2", "250, 250, 210", "60, 80%, 90%"], ["papayawhip", "#ffefd5", "255, 239, 213", "37, 100%, 92%"], ["moccasin", "#ffe4b5", "255, 228, 181", "38, 100%, 85%"], ["peachpuff", "#ffdab9", "255, 218, 185", "28, 100%, 86%"], ["palegoldenrod", "#eee8aa", "238, 232, 170", "55, 67%, 80%"], ["khaki", "#f0e68c", "240, 230, 140", "54, 77%, 75%"], ["darkkhaki", "#bdb76b", "189, 183, 107", "56, 38%, 58%"]]}];

function hex(num) {
    if (num > 255) {
        throw "'" + num + "'' is greater than 255(0xff);";
    }
    let str = Number(num).toString(16);
    return ("0" + str).slice(-2);
}

class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a ? a : 1;
    }

    valid() {
        return (this.r !== undefined) && (this.g !== undefined) && (this.b !== undefined);
    }

    toHex() {
        return '#' + hex(this.r) + hex(this.g) + hex(this.b);
    }

    toRGB() {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')'
    }

    toRGBA() {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a.toFixed(3) + ')'
    }

    toARGB() {
        return '#' + hex(Math.round(this.a * 256 - 1)) + hex(this.r) + hex(this.g) + hex(this.b);
    }

    toHSL() {
        let r = this.r / 255, g = this.g / 255, b = this.b / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return 'hsl(' + Math.round(h * 360) + ',' + Math.round(s * 100) + "%" + ',' + Math.round(l * 100) + "%" + ')';
    }
}

function parseHEX(val) {
    let color = new Color();
    try {
        let rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        let hex = val.replace(rgx, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        color.r = parseInt(rgb[1], 16);
        color.g = parseInt(rgb[2], 16);
        color.b = parseInt(rgb[3], 16);
    } catch (e) {
        console.log(e)
    }
    return color;
}

function parseRGBA(val) {
    let color = new Color();
    try {
        let rgba = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.exec(val);
        color.r = parseInt(rgba[1]);
        color.g = parseInt(rgba[2]);
        color.b = parseInt(rgba[3]);
        color.a = parseFloat(rgba[4] || 1);
    } catch (e) {
        console.log(e)
    }
    return color;
}

function parseARGB(val) {
    let color = new Color();
    try {
        let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
        color.r = parseInt(argb[2], 16);
        color.g = parseInt(argb[3], 16);
        color.b = parseInt(argb[4], 16);
        color.a = parseInt(argb[1], 16) / 255;
    } catch (e) {
        console.log(e)
    }
    return color;
}

function parseHSL(hslValue) {
    let color = new Color();
    try {
        let hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue);
        let h = parseInt(hsl[1]) / 360, s = parseInt(hsl[2]) / 100, l = parseInt(hsl[3]) / 100, r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            let hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        color.r = Math.round(r * 255);
        color.g = Math.round(g * 255);
        color.b = Math.round(b * 255);
    } catch (e) {
        console.log(e)
    }
    return color;
}

function parseColor(val) {
    val = val.trim().toLowerCase();
    let color = parseHEX(val);
    if (color.valid()) {
        return color;
    }

    color = parseRGBA(val);
    if (color.valid()) {
        return color;
    }

    color = parseARGB(val);
    if (color.valid()) {
        return color;
    }

    color = parseHSL(val);
    if (color.valid()) {
        return color;
    }

    for (let i = 0; i < colors.length; i++) {
        let category = colors[i];
        for (let key in category) {
            let children = category[key];
            for (let j = 0; j < children.length; j++) {
                let obj = children[j];
                if (obj[0] === val) {
                    return parseHEX(obj[1])
                }
            }
        }
    }
}

let html = '';
for (let i = 0; i < colors.length; i++) {
    let category = colors[i];
    for (let key in category) {
        html += `<h3 class="mt-2">${key}</h3><table class="table fullwidth divide mt1"><thead><tr><th>颜色名</th><th>预览</th><th>HEX</th><th>RGB</th><th>HSL</th></tr></thead><tbody>`;
        let children = category[key];
        for (let j = 0; j < children.length; j++) {
            let obj = children[j];
            html += `<tr><td>${obj[0]}</td><td style="background-color: ${obj[0]}"></td><td>${obj[1]}</td><td>${obj[2]}</td><td>${obj[3]}</td></tr>`
        }
        html += '</tbody></table>'
    }
}
document.getElementById('table_list').innerHTML = html;

function convert(val) {
    val = val || document.getElementById('input_color').value;
    let color = parseColor(val);
    if (!color) {
        alert('错误的格式');
        return
    }

    let hex = color.toHex();
    let rgba = color.toRGBA();
    document.getElementById('table_preview').innerHTML =
        `<tr><td style="background-color:${hex}"></td><td>HEX</td><td>${hex}</td></tr>`
        + `<tr><td style="background-color:${hex}"></td><td>RGB</td><td>${color.toRGB()}</td></tr>`
        + `<tr><td style="background-color:${rgba}"></td><td>RGBA</td><td>${rgba}</td></tr>`
        + `<tr><td style="background-color:${rgba}"></td><td>ARGB</td><td>${color.toARGB()}</td></tr>`
        + `<tr><td style="background-color:${hex}"></td><td>HSL</td><td>${color.toHSL()}</td></tr>`;
}

convert('#6c928c');

function inputExample(e) {
    document.getElementById('input_color').value = e.innerText;
    convert()
}

document.getElementById('input_color').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        convert()
    }
});