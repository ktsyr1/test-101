"use client"

import { useContext, useState } from "react"
import { FormContext, FormDataContext } from "../contextApi";
import SetupFormsCustomer from "./setupForm";
import FormRef1 from "./formRef1";
import FormRef2 from "./formRef2";
import FormRef3 from "./formRef3";
import FormRef4 from "./formRef4";
import FormRef5 from "./formRef5";
import FormRef6 from "./formRef6";
import FormRef7 from "./formRef7";
import { defaultPage } from "../config";

// end imported

type LayoutType = {
    children: JSX.Element;
    slug: number;
}
export const Layout = ({ children, slug }: LayoutType) => {
    let { select, setSelect, } = useContext(FormContext)
    return <>{select === slug && children}</>
}
export default function FormsCustomer() {
    let [data, setData] = useState({})
    let [select, setSelect] = useState(defaultPage == 0 && 1)
    // let [select, setSelect] = useState(1)

    return (
        <FormContext.Provider value={{ select, setSelect }}>
            <FormDataContext.Provider value={{ data, setData }}>
                <SetupFormsCustomer >
                    <>
                        <FormRef1 />
                        <FormRef2 />
                        <FormRef3 />
                        <FormRef4 />
                        <FormRef5 />
                        <FormRef6 />
                        <FormRef7 />
                    </>
                </SetupFormsCustomer>
            </FormDataContext.Provider>
        </FormContext.Provider >
    )
}


export class FormElm {
    static Select = ({ value, one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{one} </div>

    static Title = ({ children }: any) => <h1 className="!w-full lap:text-3xl tap:text-xl text-base font-normal text-white bg-[#001F67] text-center lap:!p-8 tap:!p-6 p-4" >{children}</h1>

    static Send = ({ title }: any) => <input type="submit" value={title ? title : "التالي"} className={`!w-full bg-safety-700 text-white hover:shadow-lg`} />
} 