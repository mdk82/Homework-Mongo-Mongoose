
const mongoose = require("mongoose");

// Schema constructor //
// ================== //
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    
    name: String,
    body: String

});

// Create the mongoose model //
// ========================= //
let comment = mongoose.model("comment", commentSchema);

module.exports = comment;