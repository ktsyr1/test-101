import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { FieldType } from '../types';
import { NextPage, SubmitButton2 } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import axios from 'axios';


const FormProfile = () => {


    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let { select, setSelect } = useContext(FormContext)
    const [form] = Form.useForm();

    let [cities, setCities] = useState<any>([])

    useEffect(() => {
        setDD({ ...defaultData })

        async function Cities() {
            let url = process.env.NEXT_PUBLIC_API
            url += `/Lookup/Cities`
            try { 
                // axios.get(`${process.env.NEXT_PUBLIC_API}/Lookup/Cities`)
                //     .then(({ data }) => setCities(data?.data))
                //     .catch(error => console.error(error))
            } catch (error) {
                console.log(error); 
            }
            return
        }
        Cities()
    }, [data])

    const onFinish = (values: any) => {
        let firstname = values.firstname
        if (firstname.length > 6) {
            setData({ ...data, ...values })
            let slug = NextPage(select)
            setSelect(slug)
        };
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='flex flex-col' defaultValue={defaultData}
        >
            <div className="flex flex-col w-full tap:mt-20 mt-10">
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">الإسم الاول</p>
                        <Form.Item<FieldType> name="firstname" className='w-full' rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData.firstname} />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">الإسم الثاني</p>
                        <Form.Item<FieldType> name="middleName" className='w-full' rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData.middleName} />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">الإسم العائلة</p>
                        <Form.Item<FieldType> name="lastName" className='w-full' rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData.lastName} />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">إسم المدينة</p>
                        <Form.Item<FieldType> name="cityId" rules={[{ required: true, message: 'Please input your username!' }]} >
                            <Select placeholder="إختر المدينة" allowClear size='large' defaultValue={defaultData.cityId} >
                                {cities?.map((cityId: any) => <Select.Option key={cityId} value={cityId?.value}>{cityId?.text}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div>
            <SubmitButton2 form={form}>التالي</SubmitButton2>
        </Form>
    );
}
export default FormProfile
