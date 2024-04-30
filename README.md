

## Backend folders

- /prisma/*
- /src/graphql/*
- /src/app/api/graphql
 
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
```tsx
let pages<any> = {

    // page
    "🥇realEstateTypeId": URL("/Lookup/RealEstatType"), // input معرف نوع العقار
    "🥇realEstateAgesId": URL("/Lookup/RealEstatAges"), // input معرف الأعمار العقارية 
    "🥇numberOfFloors": 0, // input عدد الطوابق
    "🥇buildingArea": 0, // input مساحة البناء 
    // page
    "🥇realEstateMunicipal": "string", // input  البلدية العقارية
    "🥇realEstateNumber": "string", // input رقم العقار
    "🥇realEstateStreet": "string", // input شارع العقارات
    "🥇workAreaId": URL("/Lookup/WorkAreas"), // input معرف منطقة العمل 
    // page
    "projectTitle": "string", // input text
    "projectImage": "string", // input image
    "projectDate": "string", // now Date()
    "description": "string", // input الوصف
    // page
    "startTime": URL("/Client/Project/AvailableTimeSlots?TargetDate=2024-4-25"), // input to api
    "endTime": "string", // بحسب الاختيار 
    "longitude": "string", // Geo
    "latitude": "string", // Geo
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
