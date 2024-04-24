

## Backend folders

- /prisma/*
- /src/graphql/*
- /src/app/api/graphql

# bug 1 
```ts
URL_InspectorJoinRequest = "/Inspector/InspectorJoinRequest"
- Id    
- NationalId   
- BankDetails  
- PassingWorkShop  
- IsFullTime  
- HasRelatives  
- RelativeName  
- RelativePhone   

هذه المدخلات غير مطلوبة في اكسيل


URL_Qualifications = "/Lookup/Qualifications"
هل هذا الحقل صحيح لان URL_Qualifications لا يرجع اي id 
URL_InspectorJoinRequest.QualificationId = Qualifications.value
```

# bug 2
```ts
URL_ClientAssessment = "/Client/Assessment"

let aa = {
    projectTitle,
    projectImage, // not found in the form
    realEstateTypeId,
    workAreaId,
    realEstateMunicipal,
    realEstateNumber,
    realEstateStreet,
    longitude,
    latitude,
    projectDate,
    description,
    startTime,
    endTime,
    realEstateAgesId,
    buildingArea,
    additionalFieldsValue,
    projectObjectives
}  

firstname
middleName
lastName
email
phone

propertyType
approximateAge
landArea
builtUpArea
inspectionGoals
significantProblems
otherNotes
additionalComments

city
municipality
neighborhood
streetName
buildingNumber
googleMapsLocation



هذه المدخلات غير مطلوبة في اكسيل
```