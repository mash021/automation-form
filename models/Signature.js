const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Signature', signatureSchema);
