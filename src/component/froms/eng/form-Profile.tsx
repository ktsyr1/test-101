import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { FieldType } from '../types';
import { NextPage, SubmitButton2 } from './form';
import { FormContext, FormDataContext } from '../contextApi';

import Cookies from "js-cookie"
import GetFatch from '../get';
import Icon from '@/component/icons';
import axios from 'axios';
export default function FormProfile() {

    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let { select, setSelect } = useContext(FormContext)
    const [HasRelatives, setHasRelatives] = useState(null);

    const [form] = Form.useForm();

    let [cities, setCities] = useState<any>([])
    useEffect(() => {
        let token: any = Cookies.get("userToken")
        console.log(process.env.NEXT_PUBLIC_ENV)
        if (process.env.NEXT_PUBLIC_ENV == "development")
            GetFatch("/Lookup/Cities", token).then(data => setCities(data?.data))
        else if (process.env.NEXT_PUBLIC_ENV === "production")
            axios.get(`${process.env.NEXT_PUBLIC_API}/Lookup/Cities`)
                .then(({ data }) => setCities(data?.data))

    }, [data])
    const onFinish = (values: any) => {

        let firstname = values.firstname
        if (firstname.length > 3) {
            setData({ ...data, ...values, HasRelatives, })
            let slug = NextPage(select)
            setSelect(slug)
        };
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function BtnsBol({ a, v, set }: any) {
        return (
            <button type="button" className={`w-full rounded-md max-w-[300px] p-4 ml-10 bg-white flex flex-row justify-between ${v == a && "!bg-prussian-800 text-white"}`} onClick={() => set(a)} >
                <p>{a ? "نعم" : "لا"} </p>
                {v == a ? <Icon.okBorder /> : <Icon.c01 size={20} />}
            </button>
        )
    }

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
                        <Form.Item<FieldType> name="firstname" className='w-full' rules={[{ required: true, message: 'Please input your firstname!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData?.firstname} />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">الإسم الثاني</p>
                        <Form.Item<FieldType> name="middleName" className='w-full' rules={[{ required: true, message: 'Please input your middleName!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData.middleName} />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">الإسم العائلة</p>
                        <Form.Item<FieldType> name="lastName" className='w-full' rules={[{ required: true, message: 'Please input your lastName!' }]} >
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
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className="flex flex-col  w-full">
                        <p className="text-xl  font-bold text-prussian-800 my-2">المعرف الوطني</p>
                        <Form.Item<FieldType> name="NationalId" className='w-full' rules={[{ required: true, message: 'Please input your NationalId!' }]} >
                            <Input size='large' minLength={2} defaultValue={defaultData.NationalId} />
                        </Form.Item>
                    </div>

                </div>

                <p className="text-xl  font-bold text-prussian-800 my-2">    هل لديك اقارب</p>
                <div className=" flex flex-row my-6" >
                    {[true, false].map((a, i) => <BtnsBol a={a} key={i} v={HasRelatives} set={setHasRelatives} />)}
                </div>
                {HasRelatives &&
                    <div className="flex tap:flex-row flex-col  w-full">
                        <div className="flex flex-col  w-full">
                            <p className="text-xl  font-bold text-prussian-800 my-2">اسم شخص القريب  </p>
                            <Form.Item<FieldType> name="RelativeName" className='w-full' rules={[{ message: 'Please input your RelativeName!' }]} >
                                <Input size='large' minLength={2} defaultValue={defaultData?.RelativeName} />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col  w-full">
                            <p className="text-xl  font-bold text-prussian-800 my-2">الهاتف القريب</p>
                            <Form.Item<FieldType> name="RelativePhone" className='w-full' rules={[{ message: 'Please input your RelativePhone!' }]} >
                                <Input size='large' minLength={2} defaultValue={defaultData.RelativePhone} />
                            </Form.Item>
                        </div>
                    </div>}
            </div>
            <SubmitButton2 form={form}>التالي</SubmitButton2>
        </Form>
    );
}

