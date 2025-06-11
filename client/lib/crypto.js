import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = Number(process.env.IV_LENGTH || 16); ;

export function encrypt(text, key, iv) {
    try {
        const keyBuffer = Buffer.from(key, 'hex');
        const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
        let encrypted = cipher.update(text, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    } catch (error) {
        throw new Error(`Encryption failed: ${error}`);
    }
}

export function decrypt(text, key, iv) {
    try {
        const keyBuffer = Buffer.from(key, 'hex');
        const encryptedText = Buffer.from(text, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        throw new Error(`Decryption failed: ${error}`);
    }
}

export function generateIV() {
    return crypto.randomBytes(IV_LENGTH);
}

export { ENCRYPTION_KEY, IV_LENGTH };