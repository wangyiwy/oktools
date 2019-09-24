function encrypt() {
    let text = document.getElementById('area_text').value;
    if (text) {
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('input_key').value);
        try {
            let encrypted = CryptoJS.DES.encrypt(text, key, buildConfig());
            let encode = document.getElementById('select_output_encode').value;
            let cipherText = encrypted.toString();
            if (encode === 'HEX') {
                cipherText = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(cipherText));
            }
            document.getElementById('area_cipher_text').value = cipherText;
        } catch (e) {
            alert(e)
        }
    }
}

function decrypt() {
    let text = document.getElementById('area_cipher_text').value;
    if (text) {
        let encode = document.getElementById('select_output_encode').value;
        let cipherText;
        if (encode === 'Base64') {
            cipherText = CryptoJS.enc.Base64.parse(text)
        } else if (encode === 'HEX') {
            cipherText = CryptoJS.enc.Hex.parse(text)
        }
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('input_key').value);
        try {
            let decrypted = CryptoJS.DES.decrypt({
                ciphertext: cipherText
            }, key, buildConfig());
            document.getElementById('area_text').value = decrypted.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            alert(e)
        }
    }
}

function buildConfig() {
    let mode = document.getElementById('select_mode').value;
    let pad = document.getElementById('select_pad').value;
    let conf = {};
    switch (mode) {
        case 'CBC':
            conf.mode = CryptoJS.mode.CBC;
            break;
        case 'CFB':
            conf.mode = CryptoJS.mode.CFB;
            break;
        case 'CTR':
            conf.mode = CryptoJS.mode.CTR;
            break;
        case 'OFB':
            conf.mode = CryptoJS.mode.OFB;
            break;
        case 'ECB':
            conf.mode = CryptoJS.mode.ECB;
            break;
    }
    switch (pad) {
        case 'Pkcs7':
            conf.padding = CryptoJS.pad.Pkcs7;
            break;
        case 'Iso97971':
            conf.padding = CryptoJS.pad.Iso97971;
            break;
        case 'AnsiX923':
            conf.padding = CryptoJS.pad.AnsiX923;
            break;
        case 'Iso10126':
            conf.padding = CryptoJS.pad.Iso10126;
            break;
        case 'ZeroPadding':
            conf.padding = CryptoJS.pad.ZeroPadding;
            break;
        case 'NoPadding':
            conf.padding = CryptoJS.pad.NoPadding;
            break;
    }
    conf.iv = CryptoJS.enc.Utf8.parse(document.getElementById('input_iv').value);
    return conf
}

function cleanup() {
    document.getElementById('area_text').value = '';
    document.getElementById('area_cipher_text').value = '';
    document.getElementById('input_key').value = '';
    document.getElementById('input_iv').value = '';
}