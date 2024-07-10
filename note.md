```js
let data = {
    req:{
        "projectTitle": "Testing End",
        "projectImage": "data:image/png;base64,iVBORw0KGgoAAAANSUh...",
        "realEstateTypeId": 1,
        "workAreaId": 2,
        "realEstateMunicipal": "qweqwe",
        "realEstateNumber": "123",
        "realEstateStreet": "123213",
        "longitude": "0",
        "latitude": "0",
        "projectDate": "2024-07-15",
        "startTime": "21:30:00.0000000",
        "endTime": "13:00:00.0000000",
        "description": "12312",
        "promoCode": "",
        "realEstateAgesId": 2,
        "numberOfFloors": 123,
        "buildingArea": 1231,
        "projectObjectives": [{ "assessmentObjectivesId": 2 }],
        "additionalFieldsValue": [
            { "id": "8d640e91-a215-41e7-b5e4-08dc61472637", "value": "12"}
        ]
    },
    req2:{
        "projectTitle": "Testing End",
        "projectImage": "data:image/png;base64,iVBORw0KGgoAAAANS...",
        "realEstateTypeId": 1,
        "workAreaId": 1,
        "realEstateMunicipal": "qweqwe",
        "realEstateNumber": "123",
        "realEstateStreet": "123213",
        "longitude": "0",
        "latitude": "0",
        "projectDate": "2024-07-15",
        "startTime": "21:30:00.0000000",
        "endTime": "13:00:00.0000000",
        "description": "12312",
        "promoCode": "",
        "realEstateAgesId": 3,
        "numberOfFloors": 123,
        "buildingArea": 1231,
        "projectObjectives": [
            {
                "assessmentObjectivesId": 2
            }
        ],
        "additionalFieldsValue": [
            {
                "id": "e9e7cc06-4a33-4ef0-6f77-08dc5cbdad73",
                "value": "ewr"
            },
            {
                "id": "3f376abd-b113-4311-19d7-08dc6d270f0d",
                "value": "ewr"
            }
        ]
    }
    res:{ 
        "status": true,
        "data": {
            "addAssessments": {
                "id": "00000000-0000-0000-0000-000000000000",
                "userId": "00000000-0000-0000-0000-000000000000",
                "projectTitle": "",
                "projectImageUrl": "",
                "realEstateTypeId": 0,
                "workAreaId": 0,
                "realEstateMunicipal": null,
                "realEstateNumber": null,
                "realEstateStreet": null,
                "longitude": null,
                "latitude": null,
                "projectDate": "0001-01-01",
                "startTime": "00:00:00",
                "endTime": "00:00:00",
                "description": null,
                "realEstateAgesId": 0,
                "numberOfFloors": 0,
                "buildingArea": 0,
                "promoCode": null,
                "additionalFieldsValue": null,
                "projectObjectives": null,
                "assessmentIssues": null
            },
            "assessmentPayment": {
                "assessmentId": "00000000-0000-0000-0000-000000000000",
                "promoCodeId": 0,
                "discountPercent": 0,
                "subtotal": null,
                "promoCodePrice": null,
                "discountPrice": null,
                "totalAmount": null,
                "serviceTax": null,
                "tax": null,
                "netTotal": null
            }
        },
        "messages": null,
        "code": 200
    },
    res2: {
        "status": true,
        "data": {
            "addAssessments": {
                "id": "a51c9904-1279-4a3f-af54-e8726e7a304d",
                "userId": "8d640e91-a215-41e7-b5e4-08dc61472637",
                "projectTitle": "Testing End",
                "projectImageUrl": "/Uploaded/Projects/72d5f3da-6f28-4040-851d-5d7d043cc884.png",
                "realEstateTypeId": 1,
                "workAreaId": 1,
                "realEstateMunicipal": "qweqwe",
                "realEstateNumber": "123",
                "realEstateStreet": "123213",
                "longitude": "0",
                "latitude": "0",
                "projectDate": "2024-07-15",
                "startTime": "21:30:00",
                "endTime": "13:00:00",
                "description": "12312",
                "realEstateAgesId": 3,
                "numberOfFloors": 123,
                "buildingArea": 1231,
                "promoCode": "",
                "additionalFieldsValue": [
                    {
                    "id": "e9e7cc06-4a33-4ef0-6f77-08dc5cbdad73",
                    "value": "ewr"
                    },
                    {
                    "id": "3f376abd-b113-4311-19d7-08dc6d270f0d",
                    "value": "ewr"
                    }
                ],
                "projectObjectives": [
                    {
                    "assessmentObjectivesId": 2
                    }
                ],
                "assessmentIssues": null
            },
            "assessmentPayment": {
                "assessmentId": "a51c9904-1279-4a3f-af54-e8726e7a304d",
                "promoCodeId": 1,
                "discountPercent": 0,
                "subtotal": 18344.5,
                "promoCodePrice": 0,
                "discountPrice": 0,
                "totalAmount": 18344.5,
                "serviceTax": 0,
                "tax": 2751.675,
                "netTotal": 21096.175
            }
        },
        "messages": null,
        "code": 200
    }
}
```