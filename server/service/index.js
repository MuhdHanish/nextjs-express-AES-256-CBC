let products = [
    {
        id: "1",
        name: "Product 1",
        price: 100
    },
    {
        id: "2",
        name: "Product 2",
        price: 200
    },
];

exports.getProducts = async () => {
    return products
};

exports.getProductById = async (id) => {
    const product = products.find(product => product.id === id);
    if (!product) throw new Error("Product not found");
    return product;
};

exports.createProduct = async (name, price) => {
    const product = { id: (products.length + 1).toString(), name, price };
    products.push(product);
    return product;
};