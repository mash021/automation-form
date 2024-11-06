const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // Helmet را فقط یک بار اضافه کنید
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const Signature = require('./models/Signature'); // اضافه کردن مدل امضا

// اتصال به دیتابیس
mongoose.connect('mongodb://localhost:27017/office-automation')
    .then(() => console.log('اتصال به دیتابیس برقرار شد'))
    .catch(err => console.error('خطا در اتصال به دیتابیس', err));

const app = express();

// استفاده از helmet برای امنیت
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            scriptSrcAttr: ["'unsafe-inline'"]
        }
    }
}));

app.use(cors());
app.use(bodyParser.json());

// مسیرهای مختلف
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);

// مسیر استاتیک برای فایل‌های عمومی
app.use(express.static('public'));

// مسیر جدید برای ذخیره‌سازی امضا
app.post('/api/signature', async (req, res) => {
    const { signature } = req.body;
    
    try {
        const newSignature = new Signature({ data: signature });
        await newSignature.save();
        res.json({ success: true, message: 'امضا با موفقیت ذخیره شد' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'خطا در ذخیره امضا' });
    }
});

// مسیر برای واکشی امضاها
app.get('/api/signatures', async (req, res) => {
    try {
        const signatures = await Signature.find().sort({ createdAt: -1 });
        res.json(signatures); // داده‌ها را به صورت JSON ارسال کنید
    } catch (error) {
        res.status(500).json({ message: 'خطا در واکشی امضاها' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`سرور در پورت ${PORT} اجرا شد`));
