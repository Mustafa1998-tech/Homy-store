# متجر هومي - Homey Store

متجر إلكتروني متخصص في المنتجات السودانية التقليدية والعصرية

## نبذة عن المشروع
متجر هومي هو منصة تجارة إلكترونية متخصصة في بيع المنتجات السودانية الأصيلة، بما في ذلك العطور والبخور التقليدية، الأزياء السودانية، والمفروشات المنزلية. يهدف المتجر إلى تقديم تجربة تسوق سهلة وممتعة للعملاء الباحثين عن منتجات سودانية عالية الجودة.

## المميزات الرئيسية
- واجهة مستخدم عربية سهلة الاستخدام
- تصنيفات متعددة للمنتجات
- نظام بحث متقدم
- عرض تفاصيل المنتجات بشكل احترافي
- دعم للصور عالية الجودة
- أسعار بالجنيه المصري

## الفئات الرئيسية
1. 🌺 البخور والعطور السودانية
   - عطور تقليدية
   - بخور فاخر
   - خلطات عطرية
   - مستلزمات التبخير

2. 👗 الأزياء السودانية
   - ثياب تقليدية
   - جلابيات
   - عبايات
   - ملابس العروس

3. 🛏️ المفروشات السودانية
   - أطقم سرير
   - مفارش تقليدية
   - مفروشات العروس
   - أطقم قطنية

## التقنيات المستخدمة
- Next.js 13
- TypeScript
- Tailwind CSS
- React
- Node.js

## متطلبات التشغيل
- Node.js v18 أو أحدث
- npm v9 أو أحدث

## إعداد البيئة وحماية API 🔒
1. قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع
2. انسخ المتغيرات التالية وأضف القيم الخاصة بك:
```env
# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url_here
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# External Services (إذا كنت تستخدم خدمات الدفع)
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email Service
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

⚠️ ملاحظات أمنية هامة:
- لا تقم أبداً برفع ملف `.env.local` إلى GitHub
- تأكد من إضافة `.env*` إلى ملف `.gitignore`
- استخدم قيم مختلفة للمتغيرات البيئية في بيئات التطوير والإنتاج
- قم بتغيير كلمات المرور وقيم JWT_SECRET بشكل دوري

## تثبيت المشروع
1. استنساخ المشروع
```bash
git clone https://github.com/Mustafa1998-tech/Homy-store.git
cd homy-store
```

2. تثبيت الاعتماديات
```bash
npm install
```

3. إعداد المتغيرات البيئية
```bash
cp .env.example .env.local
```
ثم قم بتعديل القيم في ملف `.env.local`

4. تشغيل المشروع محلياً
```bash
npm run dev
```

## هيكل المشروع
```
homy-store/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── public/
│   ├── images/
│   │   ├── perfumes/
│   │   ├── fashion/
│   │   └── bedding/
└── package.json
```

## المساهمة
نرحب بمساهماتكم في تطوير المشروع. يرجى اتباع الخطوات التالية:
1. عمل Fork للمشروع
2. إنشاء فرع جديد للميزة المراد إضافتها
3. تقديم Pull Request مع وصف تفصيلي للتغييرات

## الترخيص
هذا المشروع مرخص تحت [MIT License](LICENSE)

## التواصل
للاستفسارات والدعم الفني، يرجى التواصل عبر:
- البريد الإلكتروني: mustafaanwar1998@gmail.com

