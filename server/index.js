const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const controller = require('./controller');
const { cryptoMiddleware } = require('./middleware');

const app = express();

app.use(cors({
    origin: process.env.NEXT_CLIENT_URL,
}));
app.use(express.json());
app.use(express.text()); 

app.use(cryptoMiddleware);

app.post('/api/products', controller.createProduct);
app.get('/api/products', controller.getProducts);
app.get('/api/products/:id', controller.getProductById);

app.post('/echo', (req, res) => {
    res.json({
        received: req.body,
        type: typeof req.body
    });
});

app.get('/health', (req, res) => {
    res.json({
        message: 'Server is healthy',
        timestamp: Date.now(),
        status: 'success'
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SERVER STARTED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌍 Local: http://localhost:${PORT}`);
    console.log(`🔐 Security: Crypto middleware active`);
    console.log(`⚡ Status: All responses encrypted`);
    console.log('');
    console.log('📡 AVAILABLE ENDPOINTS:');
    console.log('─'.repeat(40));
    console.log('🧪 Testing Routes:');
    console.log(`   POST  http://localhost:${PORT}/echo`);
    console.log(`   GET   http://localhost:${PORT}/health`);
    console.log('');
    console.log('🛍️  Product Routes:');
    console.log(`   POST  http://localhost:${PORT}/api/products`);
    console.log(`   GET   http://localhost:${PORT}/api/products`);
    console.log(`   GET   http://localhost:${PORT}/api/products/:id`);
    console.log('');
    console.log('💡 Tips:');
    console.log('   • All responses are encrypted with AES-256-CBC');
    console.log('   • Check IV header in response for decryption');
    console.log('   • Send encrypted requests with IV header');
    console.log('='.repeat(60) + '\n');
});