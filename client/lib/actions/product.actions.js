'use server';

import { encrypt, decrypt, generateIV, ENCRYPTION_KEY } from '../crypto';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:3001';

// Helper function to make encrypted API calls
async function makeEncryptedRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': method === 'POST' ? 'text/plain' : 'application/json',
            },
        };

        // Encrypt request body for POST requests
        if (body && method === 'POST') {
            const iv = generateIV();
            const encryptedBody = encrypt(JSON.stringify(body), ENCRYPTION_KEY, iv);

            options.body = encryptedBody;
            options.headers = {
                ...options.headers,
                'IV': iv.toString('hex'),
            };
        }

        const response = await fetch(`${EXPRESS_API_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ivHeader = response.headers.get('IV');
        const encryptedData = await response.text();

        // Decrypt response if IV header is present
        if (ivHeader && encryptedData) {
            const iv = Buffer.from(ivHeader, 'hex');
            const decryptedData = decrypt(encryptedData, ENCRYPTION_KEY, iv);

            return {
                success: true,
                data: JSON.parse(decryptedData)
            };
        }

        return {
            success: true,
            data: encryptedData
        };
    } catch (error) {
        console.error('API call failed:', error);
        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    }
}

// Health check action
export async function checkHealth() {
    return makeEncryptedRequest('/health');
}

// Echo test action
export async function testEcho(message) {
    return makeEncryptedRequest('/echo', 'POST', {
        message,
        time: new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }),
    });
}

// Get all products action
export async function getProducts() {
    return makeEncryptedRequest('/api/products');
}

// Get product by ID action
export async function getProductById(id) {
    return makeEncryptedRequest(`/api/products/${id}`);
}

// Create product action
export async function createProduct(productData) {
    const { name, price } = productData;

    if (!name || !price) {
        return {
            success: false,
            error: 'Product name and price are required'
        };
    }

    return makeEncryptedRequest('/api/products', 'POST', {
        name,
        price: parseFloat(price.toString())
    });
}