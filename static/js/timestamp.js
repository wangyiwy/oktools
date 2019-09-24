const dateFormat = 'yyyy-MM-dd hh:mm:ss';

Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "s": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

let date = new Date();
let time_now = document.getElementById('time_now');
time_now.value = Math.round(date / 1000).toString();
document.getElementById('input_time').value = Math.round(date / 1000);
document.getElementById('input_date').value = date.format(dateFormat);

function updateTime() {
    let unit = document.getElementById('select_now_unit').value;
    if (unit === 's') {
        time_now.value = Math.round(new Date() / 1000).toString();
    } else if (unit === 'ms') {
        time_now.value = new Date().getTime().toString();
    }
}

let handle = setInterval(updateTime, 1000);

function startUpdate(e) {
    window.clearInterval(handle);
    handle = setInterval(updateTime, 1000);
    e.classList.add('primary')
}

function stopUpdate(e) {
    window.clearInterval(handle);
    e.parentElement.firstElementChild.classList.remove('primary')
}

function timeToDate() {
    let input = document.getElementById('input_time').value;
    let unit = document.getElementById('select_input_unit').value;
    let output_date = document.getElementById('output_date');
    if (unit === 's') {
        output_date.value = new Date(input * 1000).format(dateFormat);
    } else if (unit === 'ms') {
        output_date.value = new Date(parseInt(input)).format(dateFormat);
    }
}

function dateToTime() {
    let input = document.getElementById('input_date').value.replace(/-/g, "/");
    let unit = document.getElementById('select_output_unit').value;
    let output_time = document.getElementById('output_time');
    if (unit === 's') {
        output_time.value = new Date(input).getTime() / 1000;
    } else if (unit === 'ms') {
        output_time.value = new Date(input).getTime();
    }
}