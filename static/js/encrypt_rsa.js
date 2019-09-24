function generateKey(btn) {
    if (btn) {
        btn.stopPropatation = true;
        btn.cancelBubble = true;
    }

    let keySize = parseInt(document.getElementById('select_key_size').value);
    let crypt = new JSEncrypt({default_key_size: keySize});
    if (btn) btn.innerText = '正在生成...';

    new Promise(function (resolve) {
        setTimeout(function () {
            resolve([crypt.getPrivateKey(), crypt.getPublicKey()]);
        }, 50);
    }).then(function (e) {
        document.getElementById('area_private_key').value = e[0];
        document.getElementById('area_public_key').value = e[1];
        if (btn) btn.innerText = '生成密钥';
    });
}

function getCrypt() {
    let private_key = document.getElementById('area_private_key').value;
    let public_key = document.getElementById('area_public_key').value;
    if (private_key && public_key) {
        let crypt = new JSEncrypt();
        crypt.setPrivateKey(private_key);
        return crypt
    }
}

function encrypt() {
    let cipher_text = '';
    let original_text = document.getElementById('area_original_text').value;
    if (original_text) {
        cipher_text = getCrypt().encrypt(original_text) || ''
    }
    document.getElementById('area_cipher_text').value = cipher_text
}

function decrypt() {
    let original_text = '';
    let cipher_text = document.getElementById('area_cipher_text').value;
    if (cipher_text) {
        original_text = getCrypt().decrypt(cipher_text) || ''
    }
    document.getElementById('area_original_text').value = original_text
}

generateKey();