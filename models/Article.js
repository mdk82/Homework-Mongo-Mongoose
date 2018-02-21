
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create a new Schema object //
// ========================== //
let schema = new Schema({
    
    title: {
        type: String,
        required: true,
        unique: true,
    },
    
    link: {
        type: String,
        required: true,
        unique: true
    },
  
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
});

// Creates our model with mongoose //
// =============================== //
let article = mongoose.model("article", schema);

module.exports = article;