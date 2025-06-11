module.exports = {
    encryptionKey: process.env.ENCRYPTION_KEY,
    ivLength: Number(process.env.IV_LENGTH || 16),
};