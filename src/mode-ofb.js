
CryptoJS.mode.OFB = (function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = OFB.Encryptor = OFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;

            if (iv) {
                keystream = this._keystream = iv.slice(0);

                this._iv = undefined;
            }
            cipher.encryptBlock(keystream, 0);

            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    OFB.Decryptor = Encryptor;

    return OFB;
}());
