import React, { useContext, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FieldType } from '../types';
import { NextPage, SubmitButton2 } from './form';
import { FormContext, FormDataContext } from '../contextApi';


const FormContact = () => {

    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        let phoneNumber = values.phoneNumber.toString()
        if (phoneNumber.length > 6) {
            setData({ ...data, ...values })
            let slug = NextPage(select)
            setSelect(slug)
        };
    }

    const onFinishFailed = (errorInfo: any) => { console.log('Failed:', errorInfo); };


    return (

        <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}
            autoComplete="off" className='flex flex-col' defaultValue={defaultData}
            onChange={() => console.clear()}
        >
            <div className="flex flex-col w-full mt-20">
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2"> رقم الجوال</p>
                        <Form.Item<FieldType> name="phoneNumber" className='w-full' rules={[{ required: true, message: 'Please input your phoneNumber!' }]} >
                            <Input size='large' minLength={7} className='w-full' placeholder='أدخل رقم الجوال' defaultValue={defaultData.phoneNumber} />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">البريد الإلكتروني</p>
                        <Form.Item<FieldType> name="Email" className='w-full' rules={[{ required: true, message: 'Please input your Email!' }]} >
                            <Input type='email' size='large' minLength={6} placeholder='أدخل البريد الإلكتروني' defaultValue={defaultData.Email} />
                        </Form.Item>
                    </div>
                </div>

            </div>
            {/* <div className="flex flex-col  w-full">
                <p className="text-xl  font-bold text-prussian-800 my-2">رقم IBAN</p>
                <Form.Item<FieldType> name="BankDetails" className='w-full' rules={[{ required: true, message: 'Please input your BankDetails!' }]} >
                    <Input type='text' size='large' minLength={6} placeholder='أدخل الرقم البنكي' defaultValue={defaultData.BankDetails} />
                </Form.Item>
            </div> */}
            <div className='*:mt-4 m-auto w-full flex'>
                <SubmitButton2 form={form}>التالي</SubmitButton2>
            </div>
        </Form>
    );
}

export default FormContact;



