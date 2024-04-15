import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { FieldType, TypeBtn } from '../types';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Icon from '../../icons';

export default function FormSkills() {

    let { select, setSelect, list } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    const [form] = Form.useForm();

    const [value, setValue] = useState(null as any);
    const [nextPart, setNextPart] = useState(false);

    const onFinish = (values: any) => { 
        let body ={ ...data, ...values, study: value }
        console.log(body);
        
        setData(body)
        let slug = NextPage(select)
        setSelect(slug)
    }

    function BtnsBol({ a }: any) {
        return (
            <button type="button" className={`w-full rounded-md max-w-[300px] p-4 ml-10 bg-white flex flex-row justify-between ${value == a && "!bg-prussian-800 text-white"}`} onClick={() => setValue(a)} >
                <p>{a ? "نعم" : "لا"} </p>
                {value == a ? <Icon.okBorder /> : <Icon.c01 size={20} />}
            </button>
        )
    }
    function Uploads() {
        return (
            <></>
        )
    }
    return (

        <div className='max-w-[700px] m-auto w-full flex flex-col'>
            <p className="text-xl  font-bold text-prussian-800 my-2"> هل تمتلك دورة فحص المباني الجاهزة؟</p>
            <div className=" flex flex-row my-6" >
                {[true, false].map((a, i) => <BtnsBol a={a} key={i} />)}
            </div>
            {value === false && <p className='text-red-600 font-bold mb-8'> تعتبر شهادة فحص المباني الجاهزة شرط اساسي للتقديم و لا تقبل طلبات المهندسين الغير حاصلين عليها.</p>}
            {nextPart && <App />}

            {!nextPart && <SubmitButton active={value === true} onClick={() => setNextPart(true)}  >التالي</SubmitButton>}
            {nextPart && <SubmitButton active={value === true} onClick={() => onFinish} >إنهاء تقديم الطلب</SubmitButton>}
        </div >
    );
}
export function SubmitButton({ children, onClick, className, active }: TypeBtn) {
    if (active) return <button type="button" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F]  ${className} ${active == true ? "!bg-safety-700" : ""}`} onClick={onClick}>{children}</button>
    return <button type="button" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F]  ${className}`} disabled={true} >{children}</button>
}

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const App: React.FC = () => (
    <Dragger {...props} className='flex flex-col justify-center items-center my-6' maxCount={1}>
        <p className="ant-upload-drag-icon w-full m-auto justify-center flex">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6452 1.00001C11.982 0.999953 12.2782 0.999902 12.5465 1.0056V6.07906L12.5465 6.11304C12.5465 6.7093 12.5465 7.20699 12.5797 7.61358C12.6143 8.03764 12.6893 8.43576 12.8811 8.81224C13.1754 9.38986 13.645 9.85947 14.2226 10.1538C14.5991 10.3456 14.9972 10.4205 15.4213 10.4552C15.8279 10.4884 16.3255 10.4884 16.9218 10.4884H16.9218H16.9558H22.0191C22.035 10.8171 22.0349 11.1887 22.0349 11.6426V11.6427L22.0349 11.7358V17.0186V17.0555C22.0349 18.2746 22.0349 19.2407 21.9713 20.0195C21.9062 20.8158 21.7704 21.4896 21.4569 22.1049C20.9486 23.1026 20.1374 23.9137 19.1397 24.4221C18.5245 24.7356 17.8507 24.8713 17.0543 24.9364C16.2756 25 15.3095 25 14.0903 25H14.0535H10.4814H10.4445C9.2254 25 8.25927 25 7.48054 24.9364C6.6842 24.8713 6.01038 24.7356 5.39512 24.4221C4.39742 23.9137 3.58627 23.1026 3.07792 22.1049C2.76443 21.4896 2.62868 20.8158 2.56361 20.0195C2.49999 19.2407 2.49999 18.2746 2.5 17.0555V17.0555V17.0186V8.98141V8.94457V8.94456C2.49999 7.72543 2.49999 6.7593 2.56361 5.98056C2.62868 5.18422 2.76443 4.5104 3.07792 3.89514C3.58627 2.89745 4.39742 2.08629 5.39512 1.57794C6.01038 1.26445 6.6842 1.1287 7.48054 1.06364C8.25927 1.00001 9.22541 1.00002 10.4445 1.00002L10.4814 1.00002H11.5408L11.6452 1.00001ZM21.3958 8.22118C21.4997 8.41316 21.5915 8.61114 21.6708 8.81395H16.9558C16.3168 8.81395 15.8879 8.81329 15.5576 8.78631C15.2371 8.76012 15.0839 8.71337 14.9828 8.66186C14.7202 8.52809 14.5068 8.31462 14.373 8.05207C14.3215 7.95098 14.2747 7.79774 14.2486 7.47723C14.2216 7.14694 14.2209 6.71805 14.2209 6.07906V1.23793C14.6415 1.36836 15.0447 1.55081 15.4209 1.78137C15.9571 2.10994 16.4092 2.56217 17.1107 3.26389L17.1845 3.33772L18.4408 4.59407C18.456 4.60922 18.4705 4.62495 18.4845 4.64122L20.1134 6.54162L20.174 6.61233L20.174 6.61234L20.174 6.61236C20.7529 7.28746 21.126 7.72264 21.3958 8.22118ZM12.2674 12.1628C12.7298 12.1628 13.1046 12.5376 13.1046 13V15.5116H15.6163C16.0786 15.5116 16.4535 15.8864 16.4535 16.3488C16.4535 16.8112 16.0786 17.186 15.6163 17.186H13.1046V19.6977C13.1046 20.16 12.7298 20.5349 12.2674 20.5349C11.8051 20.5349 11.4302 20.16 11.4302 19.6977V17.186H8.9186C8.45622 17.186 8.08139 16.8112 8.08139 16.3488C8.08139 15.8864 8.45622 15.5116 8.9186 15.5116H11.4302V13C11.4302 12.5376 11.8051 12.1628 12.2674 12.1628Z" fill="#FF5A1F" />
            </svg>

        </p>
        <div className=" text-lg w-full m-auto justify-center flex">
            <p className="ant-upload-text">قم بسحب وإسقاط الملف أو</p>
            <p className="ant-upload-hint font-bold !text-safety-700 mx-2"> تصفح جهاز الكمبيوتر </p>
        </div>
    </Dragger>
); 