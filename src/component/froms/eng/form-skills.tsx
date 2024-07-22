import React, { useContext, useRef, useState } from 'react';
import { TypeBtn } from '../types';
import { FormDataContext } from '../contextApi';
import Icon from '../../icons';
import { createInvester } from '../get';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function FormSkills() {

    let { data, setData } = useContext(FormDataContext)

    const [PassingCourse, setValue] = useState(null)
    const [IsFullTime, setIsFullTime] = useState(null)
    const [nextPart, setNextPart] = useState(false) // to false 
    const [dane, setDane] = useState(false)
    const [valid, setValid] = useState(false)
    let [Files, setFile] = useState(true)
    let [SendBtn, setSendBtn] = useState(" تقديم الطلب")
    let [Err, setErr] = useState<any>(null)
    let [P, setP] = useState<any>(null)

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
            setSendBtn("جاري تقديم الطلب")
            if (process.env.NEXT_PUBLIC_ENV == "development")
                createInvester({ data: { formData } })
                    .then(RES => {
                        if (RES.code == 200) {
                            window.scrollTo({ top: 380, behavior: 'smooth' })
                            setDane(true)
                        }
                        else setErr("هناك حقل مفقود")
                    })
                    .catch(error => console.error(error))
            else if (process.env.NEXT_PUBLIC_ENV == "production")
                axios.post(`${process.env.NEXT_PUBLIC_API}/Inspector/InspectorJoinRequest`, formData)
                    .then(({ data }) => {
                        window.scrollTo({ top: 380, behavior: 'smooth' })
                        setDane(true)
                    })
            setSendBtn(" تقديم الطلب")

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

        const file: any = event.target.files && event.target.files[0]
        if (file) setTimeout(() => setFile(false), 1000)
        else setFile(true)
    }
    let cvRef = useRef<any>()

    const App: React.FC = () => (
        <div className='flex flex-col justify-center items-center my-6 bg-slate-100 p-4 pb-8 rounded-md text-center cursor-pointer' onClick={() => cvRef.current.click()}   >
            <p className="ant-upload-drag-icon w-full m-auto justify-center flex my-4">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.6452 1.00001C11.982 0.999953 12.2782 0.999902 12.5465 1.0056V6.07906L12.5465 6.11304C12.5465 6.7093 12.5465 7.20699 12.5797 7.61358C12.6143 8.03764 12.6893 8.43576 12.8811 8.81224C13.1754 9.38986 13.645 9.85947 14.2226 10.1538C14.5991 10.3456 14.9972 10.4205 15.4213 10.4552C15.8279 10.4884 16.3255 10.4884 16.9218 10.4884H16.9218H16.9558H22.0191C22.035 10.8171 22.0349 11.1887 22.0349 11.6426V11.6427L22.0349 11.7358V17.0186V17.0555C22.0349 18.2746 22.0349 19.2407 21.9713 20.0195C21.9062 20.8158 21.7704 21.4896 21.4569 22.1049C20.9486 23.1026 20.1374 23.9137 19.1397 24.4221C18.5245 24.7356 17.8507 24.8713 17.0543 24.9364C16.2756 25 15.3095 25 14.0903 25H14.0535H10.4814H10.4445C9.2254 25 8.25927 25 7.48054 24.9364C6.6842 24.8713 6.01038 24.7356 5.39512 24.4221C4.39742 23.9137 3.58627 23.1026 3.07792 22.1049C2.76443 21.4896 2.62868 20.8158 2.56361 20.0195C2.49999 19.2407 2.49999 18.2746 2.5 17.0555V17.0555V17.0186V8.98141V8.94457V8.94456C2.49999 7.72543 2.49999 6.7593 2.56361 5.98056C2.62868 5.18422 2.76443 4.5104 3.07792 3.89514C3.58627 2.89745 4.39742 2.08629 5.39512 1.57794C6.01038 1.26445 6.6842 1.1287 7.48054 1.06364C8.25927 1.00001 9.22541 1.00002 10.4445 1.00002L10.4814 1.00002H11.5408L11.6452 1.00001ZM21.3958 8.22118C21.4997 8.41316 21.5915 8.61114 21.6708 8.81395H16.9558C16.3168 8.81395 15.8879 8.81329 15.5576 8.78631C15.2371 8.76012 15.0839 8.71337 14.9828 8.66186C14.7202 8.52809 14.5068 8.31462 14.373 8.05207C14.3215 7.95098 14.2747 7.79774 14.2486 7.47723C14.2216 7.14694 14.2209 6.71805 14.2209 6.07906V1.23793C14.6415 1.36836 15.0447 1.55081 15.4209 1.78137C15.9571 2.10994 16.4092 2.56217 17.1107 3.26389L17.1845 3.33772L18.4408 4.59407C18.456 4.60922 18.4705 4.62495 18.4845 4.64122L20.1134 6.54162L20.174 6.61233L20.174 6.61234L20.174 6.61236C20.7529 7.28746 21.126 7.72264 21.3958 8.22118ZM12.2674 12.1628C12.7298 12.1628 13.1046 12.5376 13.1046 13V15.5116H15.6163C16.0786 15.5116 16.4535 15.8864 16.4535 16.3488C16.4535 16.8112 16.0786 17.186 15.6163 17.186H13.1046V19.6977C13.1046 20.16 12.7298 20.5349 12.2674 20.5349C11.8051 20.5349 11.4302 20.16 11.4302 19.6977V17.186H8.9186C8.45622 17.186 8.08139 16.8112 8.08139 16.3488C8.08139 15.8864 8.45622 15.5116 8.9186 15.5116H11.4302V13C11.4302 12.5376 11.8051 12.1628 12.2674 12.1628Z" fill={!Files ? "#FF5A1F" : "#5b5b5b"} />
                </svg>

            </p>
            {/* ref */}

            <input type='file'  {...register('Files')} className='hidden' accept='application/pdf' ref={cvRef} onChange={Uploads} />

            {Files ?
                <>
                    <div className=" text-lg w-full m-auto justify-center flex tap:flex-row flex-col" >
                        <p className="ant-upload-text">قم بسحب وإسقاط الملف أو
                            <p className="ant-upload-hint font-bold !text-safety-700 mx-2"> تصفح جهاز الكمبيوتر </p></p>
                    </div>
                    <p className='p-4 text-red-600'>{errors?.Files?.message?.toString() || ""}</p>
                </>
                : <p className='py-4'>تم رفع الملف</p>}
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

    let setProjectImage = (e: any) => {

        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setP(e.target?.result as any)
        if (file) reader.readAsDataURL(file);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={Valid}   >
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
                                {/* <input type='file' accept="image/*" {...register('Picture', { required: "الصورة مطلوبة ", })} aria-invalid={errors.Picture ? "true" : "false"} className='bg-white p-3 rounded-lg cursor-pointer' onChange={setProjectImage} /> */}
                                {errors?.Picture && <p className='p-4 text-red-600'>{errors?.Picture?.message?.toString() || ""}</p>}
                            </div>

                            <div className="flex items-center justify-center w-full">

                                <label htmlFor="projectImage" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 ">
                                    {P ? <img src={P} alt='image' className='max-h-[250px] p-4' />
                                        : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">انقر للتحميل</span> أو اسحب وافلات</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    }
                                    <input id='projectImage' type='file' accept="image/*" {...register('Picture', { required: "الصورة مطلوبة ", })} aria-invalid={errors.Picture ? "true" : "false"} className='bg-white p-3 rounded-lg cursor-pointer hidden' onChange={setProjectImage} />
                                </label>
                                {/* {state?.err?.projectImage && <p className='p-4 text-red-600'>{state?.err?.projectImage.text}</p>} */}
                            </div>

                            <p className="text-xl  font-bold text-prussian-800 my-2">   السيرة الذاتية  </p>
                            <App />
                        </>
                    }
                    {Err && <p className='text-red-600 font-bold mb-8'> {Err} </p>}

                    <div className='flex justify-center'>
                        {nextPart
                            ? <input type='submit' className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 ${valid ? "!bg-safety-700 " : "bg-[#6B7B8F] "}`} value={SendBtn} disabled={!valid} />
                            : <input type='submit' className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 ${PassingCourse === true && typeof IsFullTime === "boolean" ? "!bg-safety-700 " : "bg-[#6B7B8F] "}`} onClick={() => setNextPart(true)} value={"التالي"} />
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

            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className='m-auto my-4' xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_112_15605)">
                    <path d="M32.5427 62.3406C48.8469 62.3406 62.064 49.1235 62.064 32.8193C62.064 16.5152 48.8469 3.2981 32.5427 3.2981C16.2386 3.2981 3.02148 16.5152 3.02148 32.8193C3.02148 49.1235 16.2386 62.3406 32.5427 62.3406Z" fill="#4FC262" />
                    <path d="M32.5427 64.8193C14.8993 64.8193 0.542725 50.4652 0.542725 32.8193C0.542725 15.176 14.8993 0.819336 32.5427 0.819336C50.1886 0.819336 64.5427 15.176 64.5427 32.8193C64.5427 50.4652 50.1886 64.8193 32.5427 64.8193ZM32.5427 5.77671C17.6308 5.77671 5.5001 17.9075 5.5001 32.8193C5.5001 47.7312 17.6308 59.862 32.5427 59.862C47.4546 59.862 59.5854 47.7287 59.5854 32.8193C59.5854 17.9075 47.4546 5.77671 32.5427 5.77671Z" fill="#4FC262" />
                    <path d="M28.6759 44.5931C28.0117 44.5931 27.3771 44.3279 26.9086 43.852L17.7622 34.5569C16.8029 33.5802 16.8153 32.0137 17.7919 31.052C18.7686 30.0952 20.3376 30.1051 21.2968 31.0817L28.6041 38.5079L43.7217 21.8585C44.6462 20.8447 46.2128 20.7729 47.2216 21.69C48.2353 22.6096 48.3097 24.1761 47.3901 25.1924L30.5102 43.7825C30.0517 44.2881 29.4072 44.5806 28.7256 44.5955C28.7082 44.5931 28.6933 44.5931 28.6759 44.5931Z" fill="#F5F6F8" />
                </g>
                <defs>
                    <clipPath id="clip0_112_15605">
                        <rect width="64" height="64" fill="white" transform="translate(0.542725 0.819336)" />
                    </clipPath>
                </defs>
            </svg>
            <b className='text-3xl text-green-600 py-8' >تهانينا!</b>

            <p className='my-6'>شكرا لتقديم طلبكم، سنتواصل معكم في أقرب وقت. </p>
        </div>
    )
}