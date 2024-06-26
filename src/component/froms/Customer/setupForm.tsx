"use client"

import { useContext, useEffect, useState } from "react"
import { Button, Form } from "antd";
import { SubmitButtonProps, TypeSetup } from "../types";
import { FormContext } from "../contextApi";
import SizeBox from "@/component/size-box";
import Icon, { IconArrow } from "@/component/icons";


export default function SetupFormsCustomer({ children }: TypeSetup) {
    let { select, setSelect, list } = useContext(FormContext)
    let [data, setData] = useState({})
    return (
        <FormContext.Provider value={{ data, setData, select, setSelect, list }}>
            <SizeBox className=" flex-col items-center bg-[#DAE0E6DE] z-30 rounded-[32px] min-h-[200px] my-8 m-8 ">
                <Header />
                <div className="flex flex-col h-full w-[80%] p-4">
                    {children}
                </div>
            </SizeBox>
        </FormContext.Provider>
    )
}

export function Line({ alt, i }: any) {
    if (i != 4) {
        if (alt === "ok") return (
            <svg width="240" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 14L5 9.2265V20.7735L15 16V14ZM225 16L235 20.7735V9.2265L225 14V16ZM14 16H226V14H14V16Z" fill="#FF5A1F" />
            </svg>

        )
        else if (alt === "prosess") return (
            <svg width="240" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16V14ZM225 16L235 20.7735V9.2265L225 14V16ZM13.2143 16C13.7666 16 14.2143 15.5523 14.2143 15C14.2143 14.4477 13.7666 14 13.2143 14V16ZM29.6429 14C29.0906 14 28.6429 14.4477 28.6429 15C28.6429 15.5523 29.0906 16 29.6429 16V14ZM46.0714 16C46.6237 16 47.0714 15.5523 47.0714 15C47.0714 14.4477 46.6237 14 46.0714 14V16ZM62.5 14C61.9477 14 61.5 14.4477 61.5 15C61.5 15.5523 61.9477 16 62.5 16V14ZM78.9286 16C79.4809 16 79.9286 15.5523 79.9286 15C79.9286 14.4477 79.4809 14 78.9286 14V16ZM95.3571 14C94.8049 14 94.3571 14.4477 94.3571 15C94.3571 15.5523 94.8049 16 95.3571 16V14ZM111.786 16C112.338 16 112.786 15.5523 112.786 15C112.786 14.4477 112.338 14 111.786 14V16ZM128.214 14C127.662 14 127.214 14.4477 127.214 15C127.214 15.5523 127.662 16 128.214 16V14ZM144.643 16C145.195 16 145.643 15.5523 145.643 15C145.643 14.4477 145.195 14 144.643 14V16ZM161.071 14C160.519 14 160.071 14.4477 160.071 15C160.071 15.5523 160.519 16 161.071 16V14ZM177.5 16C178.052 16 178.5 15.5523 178.5 15C178.5 14.4477 178.052 14 177.5 14V16ZM193.929 14C193.376 14 192.929 14.4477 192.929 15C192.929 15.5523 193.376 16 193.929 16V14ZM210.357 16C210.909 16 211.357 15.5523 211.357 15C211.357 14.4477 210.909 14 210.357 14V16ZM226.786 14C226.233 14 225.786 14.4477 225.786 15C225.786 15.5523 226.233 16 226.786 16V14ZM5 16H13.2143V14H5V16ZM29.6429 16H46.0714V14H29.6429V16ZM62.5 16H78.9286V14H62.5V16ZM95.3571 16H111.786V14H95.3571V16ZM128.214 16H144.643V14H128.214V16ZM161.071 16H177.5V14H161.071V16ZM193.929 16H210.357V14H193.929V16Z" fill="#1C64F2" />
            </svg>
        )
        else return (
            <svg width="240" height="2" viewBox="0 0 240 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1" x2="239" y2="1" stroke="#EBF5FF" strokeWidth="2" strokeLinecap="round" strokeDasharray="16 16" />
            </svg>
        )
    }
}
export function Header() {
    let { select, setSelect, list } = useContext(FormContext)

    return (
        <div className="flex flex-col items-center justify-center bg-[#001F67]
        text-white w-full rounded-t-[32px] ">
            <div className="flex flex-row justify-between  text-2xl w-[80%] my-8">
                {select > 1 ? <div className="flex flex-row *:ml-4 items-center my-4" onClick={() => setSelect(select - 1)}>
                    <IconArrow className={'rotate-180'} color={"#fff"} />
                    <p>الرجوع</p>
                </div> : <div></div>}
                {/* <div className="flex flex-row *:mr-4 items-center my-4">
                    <p>الإغلاق</p>
                    <Icon.Close size={20} />
                </div> */}
            </div>
        </div>
    )
}



export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
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
        <Button type="primary" htmlType="submit" size='large' className={`max-w-[600px] m-auto w-full !text-white bg-safety-700 mt-28 ${!submittable && "!bg-[#6B7B8F]"}`} disabled={!submittable}>
            {children}
        </Button>
    );
};