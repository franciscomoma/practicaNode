const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tags = ['work', 'lifestyle', 'motor', 'mobile']

var itemSchema = new Schema({
    name:  {type: String, required: true},
    for_sale: {type: Boolean, required: false, default: 0},
    price: {type: Number, required: true},
    image_path: {type: String, required: false, default: ''},
    tags: [{type: String, enum: tags}]
});

module.exports = {
    Item: mongoose.model('Item', itemSchema),
    Tag: tags
}