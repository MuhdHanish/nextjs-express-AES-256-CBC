'use client';

import React, { useState, useTransition } from 'react';
import {
  checkHealth,
  testEcho,
  getProducts,
  getProductById,
  createProduct
} from '../lib/actions/product.actions';

export default function ServerActionsClient() {
  const [response, setResponse] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAction = async (actionFn) => {
    startTransition(async () => {
      try {
        const result = await actionFn();

        if (result.success) {
          setResponse(JSON.stringify(result.data, null, 2));
        } else {
          setResponse(`Error: ${result.error}`);
        }
      } catch (error) {
        setResponse(`Client Error: ${error.message || 'Unknown error'}`);
      }
    });
  };

  const handleHealthCheck = () => {
    handleAction(() => checkHealth());
  };

  const handleEchoTest = () => {
    handleAction(() => testEcho('Hello from Next.js Server Actions!'));
  };

  const handleGetProducts = () => {
    handleAction(() => getProducts());
  };

  const handleGetProductById = () => {
    if (!productId.trim()) {
      setResponse('Please enter a product ID');
      return;
    }
    handleAction(() => getProductById(productId));
  };

  const handleCreateProduct = () => {
    if (!productName.trim() || !productPrice) {
      setResponse('Please enter both product name and price');
      return;
    }
    handleAction(() => createProduct({
      name: productName,
      price: parseFloat(productPrice)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚀 Next.js Server Actions Crypto Client</h1>
        <p className="text-gray-600">Clean server actions with encrypted Express API calls</p>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Architecture:</strong> Server Actions → Crypto Utils → Express API
          </p>
          <p className="text-xs text-green-600 mt-1">
            ✅ JavaScript • Server-side encryption • Clean separation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Testing Routes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">🧪 Testing Routes</h2>
          <div className="space-y-3">
            <button
              onClick={handleHealthCheck}
              disabled={isPending}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '⏳ Loading...' : 'Test Health Check'}
            </button>
            <button
              onClick={handleEchoTest}
              disabled={isPending}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '⏳ Loading...' : 'Test Echo (POST)'}
            </button>
          </div>
        </div>

        {/* Product Routes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">🛍️ Product Routes</h2>
          <div className="space-y-3">
            <button
              onClick={handleGetProducts}
              disabled={isPending}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '⏳ Loading...' : 'Get All Products'}
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={isPending}
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
              <button
                onClick={handleGetProductById}
                disabled={isPending || !productId.trim()}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Product Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">➕ Create Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={isPending}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            disabled={isPending}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
          />
          <button
            onClick={handleCreateProduct}
            disabled={isPending || !productName.trim() || !productPrice}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '⏳ Creating...' : 'Create Product'}
          </button>
        </div>
      </div>

      {/* Response Display */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">📤 Response:</h3>
        <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-96">
          {isPending ? '⏳ Processing...' : response || 'No response yet. Click a button to test!'}
        </pre>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">🏗️ Clean Architecture:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Client Component:</strong> UI and user interactions</li>
          <li>• <strong>Server Actions:</strong> Business logic and API calls</li>
          <li>• <strong>Crypto Utils:</strong> Encryption/decryption functions</li>
          <li>• <strong>Express API:</strong> Your existing encrypted backend</li>
          <li>• <strong>JavaScript:</strong> Simple and straightforward</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">📂 File Structure:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <code>lib/crypto.js</code> - Encryption utilities</li>
          <li>• <code>lib/actions/product.actions.js</code> - Server actions</li>
          <li>• <code>.env.local</code> - Environment variables</li>
          <li>• <code>app/page.js</code> - This page</li>
        </ul>
      </div>
    </div>
  );
};
