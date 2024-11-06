app.get('/api/signatures', async (req, res) => {
    try {
        const signatures = await Signature.find().sort({ createdAt: -1 });
        res.json(signatures); // ارسال داده‌ها به صورت JSON
    } catch (error) {
        res.status(500).json({ message: 'خطا در واکشی امضاها' });
    }
});
