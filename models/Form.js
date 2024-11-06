const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    signedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // کاربرانی که فرم را امضا کرده‌اند
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);
