if ((typeof File !== 'undefined') && !File.prototype.slice) {
    if (File.prototype.webkitSlice) {
        File.prototype.slice = File.prototype.webkitSlice;
    }

    if (File.prototype.mozSlice) {
        File.prototype.slice = File.prototype.mozSlice;
    }
}

let web_crypto = window.crypto && window.crypto.subtle && window.crypto.subtle.digest;
if (web_crypto) {
    document.getElementById('tips').innerHTML +=
        '<li>SHA-1、SHA-256、SHA-384 和 SHA-512算法使用速度更快的(<a target="_blank" ' +
        'href="http://www.w3.org/TR/WebCryptoAPI/" title="Web Cryptography API">WebCryptoAPI</a>)，' +
        '需要使用更多的内存。Microsoft Edge浏览器不支持SHA-1算法。</li>';
}

function isEdge() {
    return navigator.userAgent.indexOf("Edge") > -1
}

function onFileSelected(e) {
    e.stopPropagation();
    e.preventDefault();

    let table = [], max_crypto_file_size = 500 * 1024 * 1024;
    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i], crypto_algos = [], workers = [];

        table.push(`<tr><th>${file.name}</th><th>(${file.type || 'n/a'}) - ${file.size}bytes</th></tr>`);
        let pb = '<progress class="progress" value="0" max="100"></progress></td></tr>';

        if (document.getElementById('cb_md5').checked) {
            let id = 'md5_' + i;
            table.push(`<tr><td>MD5</td><td id="${id}">`, pb);

            let worker = new Worker('/static/js/file_hash.worker.js');
            worker.addEventListener('message', onWorkerEvent(id));
            worker.postMessage({type: 'algo', name: 'MD5'});
            workers.push(worker)
        }

        if (document.getElementById('cb_sha1').checked) {
            let id = 'sha1_' + i;
            table.push(`<tr><td>SHA1</td><td id="${id}">`, pb);

            if (!isEdge() && web_crypto && file.size < max_crypto_file_size) {
                crypto_algos.push({id: id, name: 'SHA-1'});
            } else {
                let worker = new Worker('/static/js/file_hash.worker.js');
                worker.addEventListener('message', onWorkerEvent(id));
                worker.postMessage({type: 'algo', name: 'SHA-1'});
                workers.push(worker)
            }
        }

        if (document.getElementById('cb_sha224').checked) {
            let id = 'sha224_' + i;
            table.push(`<tr><td>SHA224</td><td id="${id}">`, pb);

            let worker = new Worker('/static/js/file_hash.worker.js');
            worker.addEventListener('message', onWorkerEvent(id));
            worker.postMessage({type: 'algo', name: 'SHA-224'});
            workers.push(worker)
        }

        if (document.getElementById('cb_sha256').checked) {
            let id = 'sha256_' + i;
            table.push(`<tr><td>SHA256</td><td id="${id}">`, pb);

            if (web_crypto && file.size < max_crypto_file_size) {
                crypto_algos.push({id: id, name: 'SHA-256'});
            } else {
                let worker = new Worker('/static/js/file_hash.worker.js');
                worker.addEventListener('message', onWorkerEvent(id));
                worker.postMessage({type: 'algo', name: 'SHA-256'});
                workers.push(worker)
            }
        }

        if (document.getElementById('cb_sha384').checked) {
            let id = 'sha384_' + i;
            table.push(`<tr><td>SHA384</td><td id="${id}">`, pb);

            if (web_crypto && file.size < max_crypto_file_size) {
                crypto_algos.push({id: id, name: 'SHA-384'});
            } else {
                let worker = new Worker('/static/js/file_hash.worker.js');
                worker.addEventListener('message', onWorkerEvent(id));
                worker.postMessage({type: 'algo', name: 'SHA-384'});
                workers.push(worker)
            }
        }

        if (document.getElementById('cb_sha512').checked) {
            let id = 'sha512_' + i;
            table.push(`<tr><td>SHA512</td><td id="${id}">`, pb);

            if (web_crypto && file.size < max_crypto_file_size) {
                crypto_algos.push({id: id, name: 'SHA-512'});
            } else {
                let worker = new Worker('/static/js/file_hash.worker.js');
                worker.addEventListener('message', onWorkerEvent(id));
                worker.postMessage({type: 'algo', name: 'SHA-512'});
                workers.push(worker)
            }
        }

        if (crypto_algos.length > 0) {
            calcByWebCrypto(file, crypto_algos)
        }
        if (workers.length > 0) {
            calcByCryptoJS(file, workers)
        }
    }

    document.getElementById('tbody_hash').innerHTML = table.join('')
}

function updateProgress(eid, progress) {
    let pb = document.querySelector('#' + eid + ' .progress');
    pb.setAttribute('value', progress);
}

function calcByWebCrypto(file, algos) {
    let reader = new FileReader();
    reader.onprogress = function (e) {
        for (let i = 0; i < algos.length; i++) {
            updateProgress(algos[i].id, e.loaded * 100 / e.total);
        }
    };
    reader.onload = function (e) {
        for (let i = 0; i < algos.length; i++) {
            let algo = algos[i];
            window.crypto.subtle.digest({name: algo.name}, e.target.result)
                .then(function (hash) {
                    let hexString = '', hashResult = new Uint8Array(hash);
                    for (let i = 0; i < hashResult.length; i++) {
                        hexString += ("00" + hashResult[i].toString(16)).slice(-2);
                    }
                    document.getElementById(algo.id).innerText = hexString
                }).catch(e => console.error(e));
        }
    };
    reader.readAsArrayBuffer(file);
}

function readChunked(file, chunkCallback, endCallback) {
    let fileSize = file.size;
    let chunkSize = 4 * 1024 * 1024;
    let offset = 0;

    let reader = new FileReader();
    reader.onload = function () {
        if (reader.error) {
            endCallback(reader.error || {});
            return;
        }
        offset += reader.result.length;
        chunkCallback(reader.result, offset, fileSize);
        if (offset >= fileSize) {
            endCallback(null);
            return;
        }
        readNext();
    };

    reader.onerror = function (err) {
        endCallback(err || {});
    };

    function readNext() {
        let slice = file.slice(offset, offset + chunkSize);
        reader.readAsBinaryString(slice);
    }

    readNext();
}

function onWorkerEvent(id) {
    return function (e) {
        if (e.data.type === 'progress') {
            updateProgress(id, e.data.value);
        } else if (e.data.type === 'result') {
            document.getElementById(id).innerText = e.data.value;
        }
    }
}

function calcByCryptoJS(file, workers) {
    readChunked(file, (chunk, offs, total) => {
        for (let i = 0; i < workers.length; i++) {
            workers[i].postMessage({type: 'chunk', chunk: chunk, offs: offs, total: total});
        }
    }, err => {
        if (err) {
            alert(err)
        } else {
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage({type: 'done'});
            }
        }
    });
}

document.getElementById('input_file').addEventListener('change', onFileSelected, false);
document.getElementById('drop_zone').addEventListener('drop', onFileSelected, false);
document.getElementById('drop_zone').addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
}, false);
