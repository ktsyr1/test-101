يجب تحويل الردود القادمة لتكون متوافقة مع البنية التالية 

# السكيمة 
```ts
type FQA = {
    TitleAr: string
    TitleEn: string
    ValueAr: string
    ValueEn: string
    FAQType: number
    IsFooter: Boolean
}
``` 
# عينة من البيانات 

```json
{
    "TitleAr":"Title Ar 1"
    "ValueAr": [
        " ",
        "المساعدة في اتخاذ قرار الاستثمار (البيع والشراء والترميم). ",
        "المحافظة على ديمومة المباني وزيادة العمر الافتراضي لصلاحيته. ",
        "توفير الوقت والجهد والمال فيما يتعلق بأمور الصيانة الدورية."
    ]
    ...
}
```
- قم بكتابة النص بشكل حرفي بدون تعديل في TitleAr ,FAQType, IsFooter بدون تغيير 
- قم باضافة "," دائما في بعد  } كل كود
- هذه صيغة النتيجة 
```json 
{
    "TitleAr":"Title Ar 1"
    "TitleEn":"Title Ar to En 1" 
    "ValueAr": "ValueAr[0] |  ValueAr[1] | ValueAr[2] | ValueAr[3] ...",
    "ValueEn": "ValueArToEN[0] | ValueArToEN[1] | ValueArToEN[2] | ValueArToEN[3] ..."
    ...
},
```
انتظرني في الردود القادمة