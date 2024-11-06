app.post('/api/signature', (req, res) => {
    const { signature } = req.body;
    
    // بررسی اینکه داده امضا دریافت شده است
    if (!signature) {
        return res.status(400).json({ success: false, message: 'امضا دریافت نشد' });
    }

    // اینجا می‌توانید امضا را در دیتابیس ذخیره کنید یا به فایل تبدیل کنید
    console.log('داده امضا دریافت شد:', signature);
    
    // پاسخ به کلاینت
    res.json({ success: true, message: 'امضا با موفقیت ذخیره شد' });
});
