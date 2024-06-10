import React, { useContext, useRef, useState } from 'react';
import { TypeBtn } from '../types';
import { FormDataContext } from '../contextApi';
import { message } from 'antd';
import Icon from '../../icons';
import GetFatch, { createFatch, createInvester } from '../get';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from "js-cookie"

export default function FormSkills() {

    let { data, setData } = useContext(FormDataContext)

    const [PassingCourse, setValue] = useState(null)
    const [IsFullTime, setIsFullTime] = useState(null)
    const [nextPart, setNextPart] = useState(false)
    const [dane, setDane] = useState(false)
    const [valid, setValid] = useState(false)
    let [Files, setFile] = useState(true)
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: data })
    const onSubmit = (res: any) => {
        if (!Files && typeof IsFullTime === "boolean" && PassingCourse && typeof Picture !== "undefined") {
            const formData = new FormData();
            formData.append('Firstname', data.firstname || data.Firstname);  // Firstname
            formData.append('MiddleName', data.middleName || data.MiddleName);  // MiddleName
            formData.append('LastName', data.lastName || data.LastName);  // LastName
            formData.append('Email', data.Email || data.Email);  // Email
            formData.append('PhoneNumber', data.PhoneNumber || data.PhoneNumber);  // PhoneNumber
            formData.append('CityId', data.cityId || data.CityId);  // CityId
            formData.append('QualificationId', data.QualificationId || data.QualificationId);  // QualificationId
            // formData.append('NationalId', data.NationalId || data.NationalId);  // NationalId
            formData.append('MemberShip', data.MemberShip || data.MemberShip)  // MemberShip
            formData.append('YearsOfExperience', data.YearsOfExperience || data.YearsOfExperience);  // YearsOfExperience
            formData.append('BankDetails', "0");      // BankDetails
            formData.append('PassingCourse', PassingCourse);     // PassingCourse
            formData.append('IsFullTime', IsFullTime)   // IsFullTime
            formData.append('HasRelatives', data.HasRelatives || data.HasRelatives);  // HasRelatives
            formData.append('RelativeName', data.RelativeName || data.RelativeName);  // RelativeName
            formData.append('RelativePhone', data.RelativePhone || data.RelativePhone);  // RelativePhone
            formData.append('Files', new Blob([res?.Files], { type: 'application/pdf' }), `CV${new Date().getTime()}.pdf`);    // Files
            formData.append('Picture', new Blob([res.Picture], { type: 'image/*' }), `Picture-${new Date().getTime()}.jpeg`);       // Picture 
            let token: any = Cookies.get("userToken")

            if (process.env.NEXT_PUBLIC_ENV == "development")
                createInvester({ data: { formData } })
                    .then(RES => {
                        setDane(true)
                        message.success("تم ارسال الطلب بنجاح")
                    })
                    .catch(error => console.error(error))
            else if (process.env.NEXT_PUBLIC_ENV == "production")
                axios.post(`${process.env.NEXT_PUBLIC_API}/Inspector/InspectorJoinRequest`, formData)
                    .then(({ data }) => {
                        setDane(true)
                        message.success("تم ارسال الطلب بنجاح")
                    })

        }
    }

    function BtnsBol({ a, v, set, list }: any) {
        function Title() {
            if (list) return <p>{list[a == false ? 0 : 1]}</p>
            else return <p>{a ? "نعم" : "لا"} </p>
        }
        return (
            <button type="button" className={`w-full rounded-md max-w-[300px] p-4 ml-10 bg-white flex flex-row justify-between ${v == a && "!bg-prussian-800 text-white"}`} onClick={() => set(a)} >
                <Title />
                {v == a ? <Icon.okBorder /> : <Icon.c01 size={20} />}
            </button>
        )
    }

    function Uploads(event: React.ChangeEvent<HTMLInputElement>) {
        message.info("جاري رفع الملف بنجاح")

        const file: any = event.target.files && event.target.files[0]
        if (file) {
            setFile(false)
            message.success("تم رفع الملف بنجاح");
        }
    }
    let cvRef = useRef<any>()

    const App: React.FC = () => (
        <div className='flex flex-col justify-center items-center my-6 bg-slate-100 p-4 pb-8 rounded-md text-center cursor-pointer' onClick={() => cvRef.current.click()}   >
            <p className="ant-upload-drag-icon w-full m-auto justify-center flex my-4">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.6452 1.00001C11.982 0.999953 12.2782 0.999902 12.5465 1.0056V6.07906L12.5465 6.11304C12.5465 6.7093 12.5465 7.20699 12.5797 7.61358C12.6143 8.03764 12.6893 8.43576 12.8811 8.81224C13.1754 9.38986 13.645 9.85947 14.2226 10.1538C14.5991 10.3456 14.9972 10.4205 15.4213 10.4552C15.8279 10.4884 16.3255 10.4884 16.9218 10.4884H16.9218H16.9558H22.0191C22.035 10.8171 22.0349 11.1887 22.0349 11.6426V11.6427L22.0349 11.7358V17.0186V17.0555C22.0349 18.2746 22.0349 19.2407 21.9713 20.0195C21.9062 20.8158 21.7704 21.4896 21.4569 22.1049C20.9486 23.1026 20.1374 23.9137 19.1397 24.4221C18.5245 24.7356 17.8507 24.8713 17.0543 24.9364C16.2756 25 15.3095 25 14.0903 25H14.0535H10.4814H10.4445C9.2254 25 8.25927 25 7.48054 24.9364C6.6842 24.8713 6.01038 24.7356 5.39512 24.4221C4.39742 23.9137 3.58627 23.1026 3.07792 22.1049C2.76443 21.4896 2.62868 20.8158 2.56361 20.0195C2.49999 19.2407 2.49999 18.2746 2.5 17.0555V17.0555V17.0186V8.98141V8.94457V8.94456C2.49999 7.72543 2.49999 6.7593 2.56361 5.98056C2.62868 5.18422 2.76443 4.5104 3.07792 3.89514C3.58627 2.89745 4.39742 2.08629 5.39512 1.57794C6.01038 1.26445 6.6842 1.1287 7.48054 1.06364C8.25927 1.00001 9.22541 1.00002 10.4445 1.00002L10.4814 1.00002H11.5408L11.6452 1.00001ZM21.3958 8.22118C21.4997 8.41316 21.5915 8.61114 21.6708 8.81395H16.9558C16.3168 8.81395 15.8879 8.81329 15.5576 8.78631C15.2371 8.76012 15.0839 8.71337 14.9828 8.66186C14.7202 8.52809 14.5068 8.31462 14.373 8.05207C14.3215 7.95098 14.2747 7.79774 14.2486 7.47723C14.2216 7.14694 14.2209 6.71805 14.2209 6.07906V1.23793C14.6415 1.36836 15.0447 1.55081 15.4209 1.78137C15.9571 2.10994 16.4092 2.56217 17.1107 3.26389L17.1845 3.33772L18.4408 4.59407C18.456 4.60922 18.4705 4.62495 18.4845 4.64122L20.1134 6.54162L20.174 6.61233L20.174 6.61234L20.174 6.61236C20.7529 7.28746 21.126 7.72264 21.3958 8.22118ZM12.2674 12.1628C12.7298 12.1628 13.1046 12.5376 13.1046 13V15.5116H15.6163C16.0786 15.5116 16.4535 15.8864 16.4535 16.3488C16.4535 16.8112 16.0786 17.186 15.6163 17.186H13.1046V19.6977C13.1046 20.16 12.7298 20.5349 12.2674 20.5349C11.8051 20.5349 11.4302 20.16 11.4302 19.6977V17.186H8.9186C8.45622 17.186 8.08139 16.8112 8.08139 16.3488C8.08139 15.8864 8.45622 15.5116 8.9186 15.5116H11.4302V13C11.4302 12.5376 11.8051 12.1628 12.2674 12.1628Z" fill="#FF5A1F" />
                </svg>

            </p>
            {/* ref */}

            {/* <input type='file'  {...register('Files', { required: "السيرة الذاتية  مطلوبة " })}  aria-invalid={errors.Files ? "true" : "false"}  className='hidden' accept='application/pdf' ref={cvRef} onChange={Uploads} /> */}
            <input type='file'  {...register('Files')} className='hidden' accept='application/pdf' ref={cvRef} onChange={Uploads} />

            {Files ?
                <>
                    <div className=" text-lg w-full m-auto justify-center flex tap:flex-row flex-col" >
                        <p className="ant-upload-text">قم بسحب وإسقاط الملف أو
                            <p className="ant-upload-hint font-bold !text-safety-700 mx-2"> تصفح جهاز الكمبيوتر </p></p>
                    </div>
                    <p className='p-4 text-red-600'>{errors?.Files?.message?.toString() || ""}</p>
                </>
                : <p>تم رفع الملف</p>}
        </div>
    )

    function Valid() {
        setTimeout(() => {
            let Picture = watch("Picture")
            let Files = watch("Files")
            if (!Files && typeof IsFullTime === "boolean" && PassingCourse && typeof Picture !== "undefined") setValid(true)
            else setValid(false)
        }, 200);
    }

    let Picture = watch("Picture")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onClick={Valid}   >
            {dane ? <Dane /> :
                <>
                    <p className="text-xl  font-bold text-prussian-800 my-2"> هل تمتلك دورة فحص المباني الجاهزة؟</p>
                    <div className=" flex flex-row my-6  py-6" >
                        {[true, false].map((a, i) => <BtnsBol a={a} key={i} v={PassingCourse} set={setValue} />)}
                    </div>

                    <p className="text-xl  font-bold text-prussian-800 my-2">    هل الدوام الكامل</p>
                    <div className=" flex flex-row my-6  py-6" >
                        {[false, true].map((a, i) => <BtnsBol a={a} key={i} v={IsFullTime} set={setIsFullTime} list={["دوام جزئي", "دوام كامل"]} />)}
                    </div>
                    {/* pdf to base64   */}
                    {PassingCourse === false && <p className='text-red-600 font-bold mb-8'> تعتبر شهادة فحص المباني الجاهزة شرط اساسي للتقديم و لا تقبل طلبات المهندسين الغير حاصلين عليها.</p>}
                    {nextPart &&
                        <>
                            <div className="flex flex-col  w-full">
                                <p className="text-xl  font-bold text-prussian-800 my-2">الصورة الشخصية</p>
                                <input type='file' accept="image/*" {...register('Picture', { required: "الصورة مطلوبة ", })} aria-invalid={errors.Picture ? "true" : "false"} className='bg-white p-3 rounded-lg cursor-pointer' />
                                <p className='p-4 text-red-600'>{errors?.Picture?.message?.toString() || ""}</p>
                            </div>
                            <p className="text-xl  font-bold text-prussian-800 my-2">   السيرة الذاتية  </p>
                            <App />
                        </>
                    }


                    <div className='flex justify-center'>
                        {nextPart
                            ? <input type='submit' className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 ${valid ? "!bg-safety-700 " : "bg-[#6B7B8F] "}`} value={"إنهاء تقديم الطلب"} disabled={!valid} />
                            : <SubmitButton active={PassingCourse === true && typeof IsFullTime === "boolean"} onClick={() => setNextPart(true)}  >التالي</SubmitButton>
                        }
                    </div>

                </>
            }
        </form >
    );
}
export function SubmitButton({ children, onClick, className, active }: TypeBtn) {
    if (active) return <button type="button" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F]  ${className} ${active == true ? "!bg-safety-700" : ""}`} onClick={onClick}>{children}</button>
    return <button type="button" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F]  ${className}`} disabled={true} >{children}</button>
}

function Dane() {
    return (
        <div className='font-semibold h-full tap:min-h-[300px] min-h-[200px]  mt-32 text-center text-prussian-800 text-xl'>
            <p>نشكرك على تقديم سيرتك الذاتية، وسنتصل بك قريبًا لتحديد موعد للمقابلة.</p>
        </div>
    )
}