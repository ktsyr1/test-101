
# API docx

### 1- Register and get a consultation ✅
سجل واحصل على استشارة
```js
type = "POST" 
bodyData ={ email: "me@mail.com"} 
```


### 2- Jobs Apply 
التقديم على الوضائف 
```js
type = "POST" 
bodyData ={ email: "me@mail.com" , Fullname:"", PhoneNumber:"" ,cv: File } 
```
  
### 3- Jobs view all ✅
  عرض الوضائف المتاحة
```js
type = "GET" 
res = [
    {
        job_title: "مدير العلاقات",
        location: "الدمام",
        department: "الخدمات المصرفية للأفراد",
        description: "كمدير علاقات في Inspectex، ستكون مسؤولاً عن تطوير العلاقات مع عملائنا الكرام والحفاظ عليها. ستحدد احتياجاتهم المالية بشكل استباقي وتقدم حلولًا مخصصة لمساعدتهم على تحقيق أهدافهم. نحن نبحث عن أفراد يتمتعون بمهارات اتصال ممتازة وفطنة مبيعات قوية وشغف لتقديم خدمة عملاء استثنائية.",
        qualifications: [
            "درجة البكالوريوس في الأعمال أو المالية أو مجال ذي صلة",
            "خبرة لا تقل عن 3 سنوات في مجال المبيعات أو إدارة العلاقات في القطاع المصرفي",
            "سجل حافل بتحقيق أهداف المبيعات وتجاوزها",
            "مهارات ممتازة في التعامل مع الآخرين والتفاوض",
            "معرفة قوية بالمنتجات والخدمات المصرفية",
        ]
    }
]
``` 

### 4- count visit ✅
عرض عدد الزيارات 
تحديث الرقم في backend 
مثلا على كل طلب يزداد واحد على عدد الزيارات
```js
type = "GET" 
res = { count : 200 }
```

### 5- counter reports  ✅
عدد التقارير و العملاء
```js
type = "GET" 
res = {...?}
```

### 6- FAQ 
عدد التقارير و العملاء
```js
type = "GET" 
pram = "?required=true" // لاجل اضهار نتائج الي ضرورية تطلع في الفوتر
res = [
     {
        "title": "المدة المستغرقة التي يتطلبها الفحص؟  ",
        "type": "strategy", // strategy || client || eng
        "required": true, // لكي تضهر في الفوتر 
        "value": [ // فيك تخليها نص عادي انا بعدل على التصميم
            "تعتمد مدة الفحص على مساحة المبنى بحيث لا تقل مدة الفحص عن 3 ساعات."
        ]
    }
]
```

### 7- FAQ  ✅

تقديم طلب السيرفاي

https://inspectex.sa/surveies رابط تصميم للاقتباس
```js
type = "POST" 
res = {
    "fullName": "Qotayba Mohammad",
    "age": 25,
    "occupation": "text",
    "city": "zahle",
    "gender": "male",
    "typeUser": "زائر",
    "accessChannels": "فيسبوك",
    "generalLayout": "جيد, كان كل شيء واضح",
    "informationFound": "سهل جدا",
    "problem": "كانت متطلبات طلب الخدمة واضحة ومباشرة",
    "suggest": "ewrewrwer"
}
```