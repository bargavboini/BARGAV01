import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    quantity: Number,
    image_url: String
}, {
    timestamps: true
});
export default model('products', ProductSchema);


