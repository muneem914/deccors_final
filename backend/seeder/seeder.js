import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js";

const seedProducts = async (req, res) => {
    try {
        // await mongoose.connect("mongodb+srv://muneem:muneem914@cluster0.oty0vlf.mongodb.net/shopit-v2?retryWrites=true&w=majority&appName=Cluster0");
        await mongoose.connect("mongodb://127.0.0.1:27017/deccor-v1");

        await Product.deleteMany();
        console.log("All Products are deleted");

        await Product.insertMany(products);
        console.log("Added new products");

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();