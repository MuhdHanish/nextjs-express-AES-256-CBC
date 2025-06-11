const crypto = require("crypto");
const config = require("../config");

exports.cryptoMiddleware = (req, res, next) => {
    const { encryptionKey, ivLength } = config;

    if (req.body && req.headers.iv) {
        try {
            const iv = Buffer.from(req.headers.iv, "hex");
            const decryptedData = decrypt(req.body, encryptionKey, iv);
            req.body = JSON.parse(decryptedData);
        } catch (error) {
            return res.status(400).json({ error: "Failed to decrypt request data" });
        }
    }

    const originalSend = res.send;
    res.send = function (data) {
        try {
            const iv = crypto.randomBytes(ivLength);

            let dataToEncrypt;
            if (typeof data === 'string') {
                dataToEncrypt = data;
            } else {
                dataToEncrypt = JSON.stringify(data);
            }

            const encryptedData = encrypt(dataToEncrypt, encryptionKey, iv);

            res.setHeader("IV", iv.toString("hex"));
            res.setHeader("Content-Type", "text/plain"); 

            originalSend.call(this, encryptedData);
        } catch (error) {
            console.error("Encryption error:", error);
            originalSend.call(this, { error: "Failed to encrypt response data" });
        }
    };

    next();
};

function encrypt(text, key, iv) {
    try {
        const keyBuffer = Buffer.from(key, 'hex'); 
        let cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
        let encrypted = cipher.update(text, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
}

function decrypt(text, key, iv) {
    try {
        const keyBuffer = Buffer.from(key, 'hex'); 
        let encryptedText = Buffer.from(text, "hex");
        let decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}