
CryptoJS.mode.CFB = (function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();

    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });

    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            var thisBlock = words.slice(offset, offset + blockSize);

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            this._prevBlock = thisBlock;
        }
    });

    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        var keystream;

        var iv = this._iv;

        if (iv) {
            keystream = iv.slice(0);

            this._iv = undefined;
        } else {
            keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);

        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }

    return CFB;
}());
