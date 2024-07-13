"use client"
import { useEffect, useRef, useState } from "react"
import SetupForms from "../setupForm";
import { LayoutType, SubmitButtonProps, TypeReadmap } from "../types";
import FormProfile from "./form-Profile";
import { FormContext, FormDataContext } from "../contextApi";
import FormContact from "./form-contact";
import FormEducation from "./form-education";
import FormSkills from "./form-skills";
import { Button, Form } from "antd";
import { defaultPage } from "../config";
import JsCookies from 'js-cookie';
import GetFormEng from "./actions";
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
    let [def, setDef] = useState({})
    useEffect(() => {
        GetFormEng().then(data => setDef({ ...data }))
    }, [])
    const Layout = ({ children, slug }: LayoutType) => (<>{select === slug ? children : ""}</>)

    return (
        <FormContext.Provider value={{ select, setSelect, list: readmap }}>
            <FormDataContext.Provider value={{ data, setData, def, setDef }}>
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


export function Input({ text, name, type = "test", className, register, err, ...props }: any) {
    return (
        <div className={`flex flex-col my-4 w-full ${className}`}>
            <p className=" lap:text-xl tap:text-sm text-xs font-bold text-prussian-800 my-2 ">{text}</p>
            <input type={type} {...register(name)} className='p-2 rounded-md' {...props} />
            {err?.text && <p className='p-4 text-red-600'>{err.text}</p>}
        </div>
    )
}


export function Select({ list = [], title, name, set, className, err }: any) {
    let m: any = useRef(null)

    return (
        <div className={`  ${className}`}>
            <button onClick={(e: any) => m.current?.classList.toggle("hidden")} className={`flex-shrink-0 z-10 inline-flex items-center lap:py-[5px] tap:py-[9px] p-3 lap:text-xl tap:text-sm text-xs font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-100 w-full rounded-lg`} type="button">
                {title}
            </button>
            {err?.text && <p className='p-4 text-red-600'>{err.text}</p>}

            <ul ref={m} className=" max-h-[250px] overflow-y-scroll py-2 hidden text-sm text-gray-700 dark:text-gray-200 absolute bg-white   rounded-lg z-40 w-full max-w-[500px]">
                {list?.map((a: any) => (
                    <li key={a}>
                        <button type="button" onClick={(() => {
                            set(a);
                            m.current?.classList.toggle("hidden")
                        })} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a.text} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}