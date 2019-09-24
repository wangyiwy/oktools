importScripts('https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js');

let algo;

function createAlgo(name) {
    switch (name) {
        case 'MD5':
            algo = CryptoJS.algo.MD5.create();
            break;
        case 'SHA-1':
            algo = CryptoJS.algo.SHA1.create();
            break;
        case 'SHA-224':
            algo = CryptoJS.algo.SHA224.create();
            break;
        case 'SHA-256':
            algo = CryptoJS.algo.SHA256.create();
            break;
        case 'SHA-384':
            algo = CryptoJS.algo.SHA384.create();
            break;
        case 'SHA-512':
            algo = CryptoJS.algo.SHA512.create();
            break;
    }
}

addEventListener('message', function (e) {
    switch (e.data.type) {
        case 'algo':
            createAlgo(e.data.name);
            break;
        case 'chunk':
            algo.update(CryptoJS.enc.Latin1.parse(e.data.chunk));
            postMessage({type: 'progress', value: e.data.offs * 100 / e.data.total});
            break;
        case 'done':
            let hash = algo.finalize();
            postMessage({type: 'result', value: hash.toString(CryptoJS.enc.Hex)});
            self.close();
            break;
    }
}, false);

