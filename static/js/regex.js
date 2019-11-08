const patterns = [
    {
        category: '一、数字',
        list: {
            '数字': '^[0-9]*$',
            'n位的数字': '^\\d{n}$',
            '至少n位的数字': '^\\d{n,}$',
            'm-n位的数字': '^\\d{m,n}$',
            '零和非零开头的数字': '^(0|[1-9][0-9]*)$',
            '非零开头的最多带两位小数的数字': '^([1-9][0-9]*)+(\\.[0-9]{1,2})?$',
            '带1-2位小数的正数或负数': '^(\\-)?\\d+(\\.\\d{1,2})$',
            '正数、负数、和小数': '^(\\-|\\+)?\\d+(\\.\\d+)?$',
            '有两位小数的正实数': '^[0-9]+(\\.[0-9]{2})?$',
            '非负整数': '^\\d+$ 或 ^[1-9]\\d*|0$',
            '非正整数': '^-[1-9]\\d*|0$',
            '浮点数': '^(-?\\d+)(\\.\\d+)?$',
            '正浮点数': '^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$',
            '负浮点数': '^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$',
        }
    }, {
        category: '二、字符',
        list: {
            '汉字': '^[\\u4e00-\\u9fa5]{0,}$',
            '大写英文': '^[A-Z]+$',
            '小写英文': '^[a-z]+$',
            '英文和数字': '^[A-Za-z0-9]+$',
            '英文、数字和下划线': '^\\w+$',
            '中文、英文、数字': '^[\\u4E00-\\u9FA5A-Za-z0-9]+$',
            '中文、英文、数字和下划线': '^[\\u4E00-\\u9FA5A-Za-z0-9_]+$',
            '双字节字符(包括汉字在内)': '[^\\x00-\\xff]',
        }
    }, {
        category: '三、特殊需求表达式',
        list: {
            'Email': '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
            '身份证号码': '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
            '手机号码': '^1(3|4|5|6|7|8|9)\\d{9}$',
            '固定电话(XXX-XXXXXXX XXXX-XXXXXXXX)': '(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{8}',
            '域名': '^((http:\\/\\/)|(https:\\/\\/))?([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}(\\/)',
            'IPv4': '((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))',
            'HTML标签': '<(\\S*?)[^>]*>.*?</\\1>|<.*? />',
            '日期': '^\\d{4}-\\d{1,2}-\\d{1,2}',
            '密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)': '^[a-zA-Z]\\w{5,17}$',
            '密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)': '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$',
            '密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)': '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$',
        }
    }
];

let tables = '';
for (let key in patterns) {
    let item = patterns[key];
    tables += `<h3 class="title is-4 mt-2">${item.category}</h3><table class="table fullwidth striped mt1"><tbody>`;
    for (let name in item.list) {
        tables += `<tr><td>${name}</td><td><strong>${item.list[name]}</strong></td></tr>`;
    }
    tables += '</tbody></table>'
}
document.getElementById('tables').innerHTML = tables;

function buildRegex() {
    let pattern = document.getElementById('input_pattern').value;
    if (!pattern) {
        return;
    }

    let op = '';
    if (document.getElementById("cb_global_search").checked) {
        op = 'g';
    }
    if (document.getElementById("cb_ignore_case").checked) {
        op += 'i';
    }
    return new RegExp(pattern, op);
}

function match() {
    let text = document.getElementById('area_text').value;
    if (!text) {
        return
    }

    let regex = buildRegex();
    if (!regex) {
        return;
    }

    let match = text.match(regex);
    if (match) {
        document.getElementById('area_matched').value = match.length + '处匹配:\n' + match.join('  ');
    } else {
        document.getElementById('area_matched').value = '没有匹配';
    }
}

function replace() {
    let text = document.getElementById('area_text').value;
    if (!text) {
        return
    }

    let regex = buildRegex();
    if (!regex) {
        return;
    }

    let value = document.getElementById('input_replace').value;
    document.getElementById('area_replacement').value = text.replace(regex, value)
}