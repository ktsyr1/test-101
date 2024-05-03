

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
  // "projectTitle": "TstTitle",
  // "projectImage": "data:image/jpeg;base64,/9j/4AAQ...",
  // "realEstateTypeId": 2,
  // "workAreaId": 1,
  // "realEstateMunicipal": "ryadh",
  // "realEstateNumber": "998A",
  // "realEstateStreet": "al-Sarraj.st",
  "longitude": "123123",
  "latitude": "321321",
  // "projectDate": "3-5-2024",
  // "description": "abc",
  // "startTime": "08:12:00.0000000",
  // "endTime": "10:35:00.0000000",
  // "realEstateAgesId": 1,
  // "numberOfFloors": 3,
  // "buildingArea": 2,
  "additionalFieldsValue": [
    {
      "id": "6FE46970-F1B2-4831-7E79-08DC67F444F4",
      "value": "tstststst"
    }
  ],
  // "projectObjectives": [
  //   {
  //     "assessmentObjectivesId": 1
  //   }
  // ]
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