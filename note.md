# Task verify phone
```ts
// |  login
// |--|  true (ok) 
// |--|  false 
// |--|--|  error 
// |--|--|  isEmailVerified (OTPEmail)
// |--|--|  isPhoneVerified (OTPPhone)
// |  signup
// |--|  true (OTPEmail)
// |--|  false 
// |--|--|  error  
|  OTPEmail
|--|  true (OTPPhone)
// |--|  false 
// |--|--|  error  
// |--|  resendOTP  
|  OTPPhone
|--|  true (ok)
|--|  false 
|--|--|  error  
|--|  resendOTP  
|# Ok verify 
```
- enable userToken 
- valid code 

## test 
```ts
|  login
// |--|  error
// |--|  to email
// |--|  to phone
// |--|  ok
// |  signup
// |--|  error
// |--|  ok email
// |--|  ok phone
```