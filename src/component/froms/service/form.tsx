"use client"

import { useEffect, useState } from "react"
import SetupForms from "../setupForm";
import { LayoutType, SubmitButtonProps, TypeReadmap } from "../types";
import { FormContext, FormDataContext } from "../contextApi";
import FormPropertyData from "./FormPropertyData";
import FormSkills from "./form-skills";
import { Button, Form } from "antd";
import FormPart2 from "./FormPart2";
import FormPart3 from "./FormPart3";
// end imported

let readmap: TypeReadmap[] = [
    { id: 1, title: "معلومات الشخصية", slug: "profile" },
    { id: 2, title: "بيانات العقار", slug: "PropertyData" },
    { id: 3, title: "موقع العقار", slug: "pin" },
    { id: 4, title: "موعد الفحص", slug: "time" },
]
// end config setup

export default function Forms() {
    let [data, setData] = useState({})
    let [select, setSelect] = useState(readmap[1].slug)

    const Layout = ({ children, slug }: LayoutType) => (<>{select === slug ? children : ""}</>)

    return (
        <FormContext.Provider value={{ select, setSelect, list: readmap }}>
            <FormDataContext.Provider value={{ data, setData }}>
                <SetupForms>
                    <>
                        <Layout slug={readmap[0].slug}>
                            <FormPropertyData />
                        </Layout>

                        <Layout slug={readmap[1].slug}>
                            <FormPart2 />
                        </Layout>

                        <Layout slug={readmap[2].slug}>
                            <FormPart3 />
                        </Layout>

                        <Layout slug={readmap[3].slug}>
                            <FormSkills />
                        </Layout>
                    </>
                </SetupForms>
            </FormDataContext.Provider>
        </FormContext.Provider >
    )
}
export function NextPage(select: any) {
    let SelectData = readmap.filter((a: any) => a.slug === select)[0]
    return readmap[SelectData.id].slug
}


export const SubmitButton2: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" size='large' className={`max-w-[600px] m-auto w-full !text-white bg-safety-700 ${!submittable && "!bg-[#6B7B8F]"}`} disabled={!submittable}>
            {children}
        </Button>
    );
}; 