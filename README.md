

## Backend folders

- /prisma/*
- /src/graphql/*
- /src/app/api/graphql
 
# res 
```css 
mobile
    max-[700px]:
fontH1
    max-[700px]:text-3xl 
fontH2
    max-[700px]:text-2xl 
fontP
    max-[700px]:text-lg 

  max-[700px]:text-3xl max-[700px]:text-2xl max-[700px]:text-lg 

```



# bug 1
```ts
URL_ClientAssessment = "/Client/Assessment"

let aa = {
  "projectTitle": "string", // input text
  "projectImage": "string", // input image
  "realEstateTypeId": 0, // input معرف نوع العقار
  "workAreaId": 0, // input معرف منطقة العمل
  "realEstateAgesId": 0,  // input معرف الأعمار العقارية 
  "realEstateMunicipal": "string", // input  البلدية العقارية
  "realEstateNumber": "string", // input رقم العقار
  "realEstateStreet": "string", // input شارع العقارات
  "longitude": "string", // Geo
  "latitude": "string", // Geo
  "projectDate": "string", // now Date()
  "description": "string", // input الوصف
  "startTime": URL("/Client/Project/AvailableTimeSlots?TargetDate=2024-4-25"), // input to api
  "endTime": "string", // بحسب الاختيار 
  "numberOfFloors": 0, // input عدد الطوابق
  "buildingArea": 0, // input مساحة البناء 
  "additionalFieldsValue": [
    // { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "value": "string" }
    URL("/Client/Project/Options")
  ],
  "projectObjectives": [
    {      "assessmentObjectivesId": URL("/Lookup/ProjectObjectives")    }
  ]
}
}  
```
# next pages
```tsx
let pages<any> = {

    // page
    // "🥇 realEstateTypeId": URL("/Lookup/RealEstatType"), // input معرف نوع العقار
    // "🥇 realEstateAgesId": URL("/Lookup/RealEstatAges"), // input معرف الأعمار العقارية 
    // "🥇 numberOfFloors": 0, // input عدد الطوابق
    // "🥇 buildingArea": 0, // input مساحة البناء 
    // page
    // "🥇 realEstateMunicipal": "string", // input  البلدية العقارية
    // "🥇 realEstateNumber": "string", // input رقم العقار
    // "🥇 realEstateStreet": "string", // input شارع العقارات
    // "🥇 workAreaId": URL("/Lookup/WorkAreas"), // input معرف منطقة العمل 
    // page --------------------------------------
    // "🥇 projectTitle": "string", // input text
    // "🥇 projectImage": "string", // input image
    // "projectDate": "string", // now Date()
    // "🥇 description": "string", // input الوصف
    // page
    // "startTime": URL("/Client/Project/AvailableTimeSlots?TargetDate=2024-4-25"), // input to api
    // "endTime": "string", // بحسب الاختيار 
    // "longitude": "string", // Geo
    // "latitude": "string", // Geo
    "additionalFieldsValue": [
      { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "value": "string" }
      URL("/Client/Project/Options")
    ],
    "projectObjectives": [
    {      "assessmentObjectivesId": URL("/Lookup/ProjectObjectives")    }
    ]
}
}  

```
```json
{
  "realEstateAgesId": "1",
  "realEstateTypeId": "3",
  "numberOfFloors": "234",
  "buildingArea": "23432",
  "workAreaId": "1",
  "realEstateMunicipal": "3424",
  "realEstateNumber": "234",
  "realEstateStreet": "erewr",
  "description": "fsfdsadsfasdf",
  "projectTitle": "يبليبلبيلبي",
  "projectDate": "2024-05-05",
  "startTime": "08:00:00.0000000",
  "endTime": "12:50:00.0000000",
  "projectImage": "data:image/jpeg;base64,/9j/4AAQ...",
  "projectObjectives": [
    { "assessmentObjectivesId": 1 }
  ]
} 
    // "longitude": "00.000", // Geo
    // "latitude": "string", // Geo
    "additionalFieldsValue": [
      { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "value": "string" }
      URL("/Client/Project/Options")
    ], 
}

{
  "projectTitle": "TstTitle",
  "projectImage": "data:image/jpeg;base64,/9j/4AAQ...",
  "realEstateTypeId": 2,
  "workAreaId": 1,
  "realEstateMunicipal": "ryadh",
  "realEstateNumber": "998A",
  "realEstateStreet": "al-Sarraj.st",
  "longitude": "123123",
  "latitude": "321321",
  "projectDate": "3-5-2024",
  "description": "abc",
  "startTime": "08:12:00.0000000",
  "endTime": "10:35:00.0000000",
  "realEstateAgesId": 1,
  "numberOfFloors": 3,
  "buildingArea": 2, 
  "promoCode": "mostafa",
  "additionalFieldsValue": [
    {
      "id": "6FE46970-F1B2-4831-7E79-08DC67F444F4",
      "value": "tstststst"
    }
  ],
  "projectObjectives": [
    {
      "assessmentObjectivesId": 1
    }
  ]
}
{
      "id": "e9e7cc06-4a33-4ef0-6f77-08dc5cbdad73",
      "isMandatory": false,
      "additionalFieldType": "1",
      "created_Date": "2024-04-14T13:16:50.8676392",
      "additionalField_TypeId": "9cdbf606-1bf0-4a0b-8140-84ce0a9074f3",
      "section": 1,
      "sectionName": "BuildingInfo",
      "realEstateTypeId": 1,
      "realEstateTypeName": "إستوديو",
      "name": "eee",
      "additionalField_MultiSelectValue": []
    },

{
  "ProjectObjectives": [    {      "assessmentObjectivesId": "3"    }  ],
  "description": "add test",
  "projectTitle": "asdasd",
  "projectImage": "data:image/jpeg;base64,plYDzAYeWUPhKIYi59RGBDZLuDibTV..",
  "realEstateTypeId": "1", // to int
  "realEstateAgesId": "1",// to int
  "numberOfFloors": "11", // to int
  "buildingArea": "12321", // to int
  "workAreaId": "1", // to int
  "realEstateMunicipal": "aaaaa",
  "realEstateNumber": "12",
  "realEstateStreet": "test",
  "projectDate": "2024-05-05", 
  "startTime": "08:00:00.0000000",
  "endTime": "12:50:00.0000000"
}
```

```tsx
curl -X 'POST' \
  'http://app.inspectex.sa/Inspector/InspectorJoinRequest' \
  -H 'accept: text/plain' \
  -H 'Content-Type: multipart/form-data' \
  // -F 'MiddleName=asdsad' \
  // -F 'LastName=Mohammad' \
  // -F 'RelativePhone=' \
  // -F 'CityId=1' \
  // -F 'BankDetails=1' \
  // -F 'IsFullTime=true' \
  // -F 'QualificationId=1' \
  // -F 'PassingCourse=true' \
  // -F 'HasRelatives=true' \
  // -F 'NationalId=1' \
  // -F 'MemberShip=1' \
  // -F 'YearsOfExperience=1' \
  -F 'PhoneNumber=70723177' \
  -F 'Files=@1711036508903.jpeg;type=image/jpeg' \
  // -F 'RelativeName=' \
  // -F 'PassingWorkShop=true' \
  // -F 'Firstname=Qotayba' \
  -F 'Id=8d640e91-a215-41e7-b5e4-08dc61472637' \
  // -F 'Email=ktsyr12qwe@gmail.com' \
  -F 'Picture=undefined'

معلومات واجب حذفها 
  -F 'BankDetails=1' \ تفاصيل البنك 
  -F 'Id=8d640e91-a215-41e7-b5e4-08dc61472uytr637' \ المعرف
1_Firstname: Qotayba
1_MiddleName: qwe
1_LastName: Mohammad
1_CityId: 5
1_QualificationId: 3
1_PassingCourse: true
1_PassingWorkShop: false
1_IsFullTime: false
1_MemberShip: 222
1_YearsOfExperience: 1
1_PhoneNumber: undefined
1_Email: ktsyr1@gmail.com
1_HasRelatives: false
1_RelativeName: undefined
1_RelativePhone: undefined
1_NationalId: 1231231
1_BankDetails: 13213131231
1_Picture: undefined
1_Files: (binary)
```

```text
single?client=gtx&sl=auto&tl=ar&dt=t&dt=bd&dj=1&q=21312	JoinUs	
2 / 4 requests
1.4 kB / 20.9 kB transferred
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="FirstName"

Qotayba
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="MiddleName"

asdsadasd
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="LastName"

Mohammad
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="Email"

ktsyr1@gmail.com
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="PhoneNumber"

70723177
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="CityId"

1
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="NationalId"

213213123
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="QualificationId"


------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="YearsOfExperience"

22
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="MemberShip"

123313
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="PassingCourse"

true
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="PassingWorkShop"

true
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="IsFullTime"

true
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="HasRelatives"

false
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="RelativeName"


------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="RelativePhone"


------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="BankDetails"

2432432432
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="__RequestVerificationToken"

CfDJ8Fggdmz7UixEjW2BDd7tm3wGjUqIl58c6JzeHFxMQ8twZccrdqefx2rwy8ayyQlAaUwHLGo_XOB7oGd7wWzRdG02xWFEwjQL28PWDLTLgznSUsKyUBN-aTcLAg9vxgFJqJK1WQBzEaU-JvtPaudyg9w
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="X-Requested-With"

XMLHttpRequest
------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="Picture"; filename="1711036508903.jpeg"
Content-Type: image/jpeg


------WebKitFormBoundaryB4qlgZyG33fAWNtK
Content-Disposition: form-data; name="Files"; filename="08e611b9f4f7f725a7d533fdabef8072.pdf"
Content-Type: application/pdf
```
```json
"additionalFieldsValue": [
    // { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "value": "string" }
  ],
{
  "status": true,
  "data": [
    {
      "id": "e9e7cc06-4a33-4ef0-6f77-08dc5cbdad73",
      // "isMandatory": false,
      // "additionalFieldType": "1",
      // "created_Date": "2024-04-14T13:16:50.8676392",
      "additionalField_TypeId": "9cdbf606-1bf0-4a0b-8140-84ce0a9074f3",
      // "section": 1,
      "sectionName": "Textbox",
      // "realEstateTypeId": 1,
      "realEstateTypeName": "إستوديو",
      "name": "eee",
      "additionalField_MultiSelectValue": []
    },
    {
      "id": "6fe46970-f1b2-4831-7e79-08dc67f444f4",
      // "isMandatory": false,
      // "additionalFieldType": "5",
      // "created_Date": "2024-04-28T19:30:00.6097874",
      "additionalField_TypeId": "60a1fdb3-1654-4cb2-8189-d7231977a4d8",
      // "section": 1,
      "sectionName": "Textbox",
      // "realEstateTypeId": 2,
      "realEstateTypeName": "بناء",
      "name": "122",
      "additionalField_MultiSelectValue": []
    },
    {
      "id": "3f376abd-b113-4311-19d7-08dc6d270f0d",
      "isMandatory": false,
      "additionalFieldType": "2",
      "created_Date": "2024-05-05T10:16:10.3135847",
      "additionalField_TypeId": "9cdc876f-897a-4921-85fd-a75432ad3575",
      "section": 1,
      "sectionName": "Textbox",
      "realEstateTypeId": 1,
      "realEstateTypeName": "إستوديو",
      "name": "test2",
      "additionalField_MultiSelectValue": [
        {
          "id": "2e6d3a88-cd4e-45d7-f903-08dc6d270f28",
          "text": "f1",
          "value": "3"
        }
      ]
    }
  ],
  "messages": null,
  "code": 200
}
```








