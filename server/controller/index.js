const service = require("../service");

exports.getProducts = async (req, res) => {
    try {
        const products = await service.getProducts();
        return res.status(200).json({ message: "success", data: products });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await service.getProductById(req.params.id);
        return res.status(200).json({ message: "success", data: product });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await service.createProduct(name, price);
        return res.status(200).json({ message: "success", data: product });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};