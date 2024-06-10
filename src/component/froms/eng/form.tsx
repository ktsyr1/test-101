"use client"

import { useEffect, useState } from "react"
import SetupForms from "../setupForm";
import { LayoutType, SubmitButtonProps, TypeReadmap } from "../types";
import FormProfile from "./form-Profile";
import { FormContext, FormDataContext } from "../contextApi";
import FormContact from "./form-contact";
import FormEducation from "./form-education";
import FormSkills from "./form-skills";
import { Button, Form } from "antd";
import { defaultPage } from "../config";
// end imported

let readmap: TypeReadmap[] = [
    { id: 1, title: "معلومات الشخصية", slug: "profile" },
    { id: 2, title: "معلومات الاتصال", slug: "contact" },
    { id: 3, title: "المؤهل الأكاديمي", slug: "education" },
    { id: 4, title: "المستندات و المؤهلات", slug: "skills" },
]
// end config setup
export default function Forms() {
    // let defaultPage = 2
    let [data, setData] = useState({})
    let [select, setSelect] = useState(readmap[defaultPage].slug)

    const Layout = ({ children, slug }: LayoutType) => (<>{select === slug ? children : ""}</>)

    return (
        <FormContext.Provider value={{ select, setSelect, list: readmap }}>
            <FormDataContext.Provider value={{ data, setData }}>
                <SetupForms>
                    <>
                        <Layout slug="profile">
                            <FormProfile />
                        </Layout>

                        <Layout slug="contact">
                            <FormContact />
                        </Layout>

                        <Layout slug="education">
                            <FormEducation />
                        </Layout>

                        <Layout slug="skills">
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

