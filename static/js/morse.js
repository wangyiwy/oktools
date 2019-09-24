const standard = {
    'A': '01',
    'B': '1000',
    'C': '1010',
    'D': '100',
    'E': '0',
    'F': '0010',
    'G': '110',
    'H': '0000',
    'I': '00',
    'J': '0111',
    'K': '101',
    'L': '0100',
    'M': '11',
    'N': '10',
    'O': '111',
    'P': '0110',
    'Q': '1101',
    'R': '010',
    'S': '000',
    'T': '1',
    'U': '001',
    'V': '0001',
    'W': '011',
    'X': '1001',
    'Y': '1011',
    'Z': '1100',
    '0': '11111',
    '1': '01111',
    '2': '00111',
    '3': '00011',
    '4': '00001',
    '5': '00000',
    '6': '10000',
    '7': '11000',
    '8': '11100',
    '9': '11110',
    '.': '010101',
    ',': '110011',
    '?': '001100',
    '\'': '011110',
    '!': '101011',
    '/': '10010',
    '(': '10110',
    ')': '101101',
    '&': '01000',
    ':': '111000',
    ';': '101010',
    '=': '10001',
    '+': '01010',
    '-': '100001',
    '_': '001101',
    '"': '010010',
    '$': '0001001',
    '@': '011010',
};
const option = ['/', '.', '-'];
let standardReverse = {};
for (let key in standard) {
    standardReverse[standard[key]] = key;
}

function unicodeHexMorse(ch) {
    let r = [];
    for (let i = 0; i < ch.length; i++)
        r[i] = ('00' + ch.charCodeAt(i).toString(16)).slice(-4);
    r = r.join('');
    r = parseInt(r, 16).toString(2);
    return r;
}

function _encode(msg) {
    let morse = [];
    msg = msg.replace(/\s+/g, '').toLocaleUpperCase().split('');
    let ch, r;
    for (let i = 0, l = msg.length; i < l; i++) {
        ch = msg[i];
        r = standard[ch];
        if (!r) r = unicodeHexMorse(ch);
        morse.push(r.replace(/0/g, option[1]).replace(/1/g, option[2]));
    }
    return morse.join(option[0]);
}

function morseHexUnicode(mor) {
    mor = parseInt(mor, 2);
    if (isNaN(mor)) return '';
    return unescape('%u' + mor.toString(16));
}

function _decode(morse) {
    let msg = [];
    morse = morse.split(option[0]);
    let mor, r;
    for (let i = 0, l = morse.length; i < l; i++) {
        mor = morse[i].replace(/\s+/g, '')
            .replace(new RegExp('\\' + option[1], 'g'), '0')
            .replace(new RegExp('\\' + option[2], 'g'), '1');
        r = standardReverse[mor];
        if (!r) r = morseHexUnicode(mor);
        msg.push(r);
    }
    return msg.join('');
}

let area_input = document.getElementById('area_input');
let area_output = document.getElementById('area_output');

function encode() {
    area_output.value = _encode(area_input.value)
}

function decode() {
    area_input.value = _decode(area_output.value)
}

function cleanup() {
    area_input.value = '';
    area_output.value = '';
}