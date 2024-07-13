"use client"
import Icon, { IconArrow } from "../icons"

import { useContext, useEffect, useState } from "react"
import { SubmitButtonProps, TypeSetup } from "./types";
import { FormContext } from "./contextApi";
import { Button, Form } from "antd";


export default function SetupForms({ children }: TypeSetup) {
    let { select, setSelect, list } = useContext(FormContext)
    let [data, setData] = useState({})
    return (
        <FormContext.Provider value={{ data, setData, select, setSelect, list }}>
            <div className=" flex items-center w-full max-w-[1360px]  flex-col   bg-[#DAE0E6DE] z-30 rounded-[32px] min-h-[100px] h-max lap:m-8 ">
                <Header />
                <div className="flex flex-col h-full w-[80%] p-4 ">
                    <NavigationNumber />
                    {children}
                </div>
            </div>
        </FormContext.Provider>
    )
}
// navigation btns
// navigation readmap
export function NavigationNumber() {
    let { select, setSelect, list } = useContext(FormContext)

    function NavBlock({ data: a }: any) {
        let SelectData = list.filter((a: any) => a.slug === select)[0]

        if (SelectData.id > a.id) return (
            <>
                <p className={` flex font-bold h-12 items-center justify-center rounded-[20px] w-12 bg-safety-700 `}  >
                    <Icon.ok color={"#fff "} />
                </p>
                <Line alt="ok" i={a.id} />
            </>
        )
        else if (SelectData.id === a.id) return (
            <>
                <p className={`text-2xl w-12 h-12 text-center flex items-center justify-center rounded-[20px] font-bold ${select === a.slug ? "border-2 border-[#0694A2] text-white bg-prussian-600 " : "text-[#6B7B8F] bg-white"}`}  >{a.id}</p>
                <Line alt="prosess" i={a.id} />
            </>
        )
        else return (
            <>
                <p className={`text-2xl w-12 h-12 text-center flex items-center justify-center rounded-[20px] font-bold ${select === a.slug ? "border-2 border-[#0694A2] text-white bg-prussian-600 " : "text-[#6B7B8F] bg-white"}`}  >{a.id}</p>
                <Line alt="all" i={a.id} />
            </>
        )
    }
    return (
        <div className="tap:flex justify-between items-center my-6  w-full hidden">
            {list.map((a: any) => <NavBlock data={a} key={a.id} />)}
        </div>
    )
}

export function Line({ alt, i }: any) {
    if (i != 4) {
        if (alt === "ok") return (
            <svg className="hidden lap:flex" width="240" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 14L5 9.2265V20.7735L15 16V14ZM225 16L235 20.7735V9.2265L225 14V16ZM14 16H226V14H14V16Z" fill="#FF5A1F" />
            </svg>

        )
        else if (alt === "prosess") return (
            <svg className="hidden lap:flex" width="240" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16V14ZM225 16L235 20.7735V9.2265L225 14V16ZM13.2143 16C13.7666 16 14.2143 15.5523 14.2143 15C14.2143 14.4477 13.7666 14 13.2143 14V16ZM29.6429 14C29.0906 14 28.6429 14.4477 28.6429 15C28.6429 15.5523 29.0906 16 29.6429 16V14ZM46.0714 16C46.6237 16 47.0714 15.5523 47.0714 15C47.0714 14.4477 46.6237 14 46.0714 14V16ZM62.5 14C61.9477 14 61.5 14.4477 61.5 15C61.5 15.5523 61.9477 16 62.5 16V14ZM78.9286 16C79.4809 16 79.9286 15.5523 79.9286 15C79.9286 14.4477 79.4809 14 78.9286 14V16ZM95.3571 14C94.8049 14 94.3571 14.4477 94.3571 15C94.3571 15.5523 94.8049 16 95.3571 16V14ZM111.786 16C112.338 16 112.786 15.5523 112.786 15C112.786 14.4477 112.338 14 111.786 14V16ZM128.214 14C127.662 14 127.214 14.4477 127.214 15C127.214 15.5523 127.662 16 128.214 16V14ZM144.643 16C145.195 16 145.643 15.5523 145.643 15C145.643 14.4477 145.195 14 144.643 14V16ZM161.071 14C160.519 14 160.071 14.4477 160.071 15C160.071 15.5523 160.519 16 161.071 16V14ZM177.5 16C178.052 16 178.5 15.5523 178.5 15C178.5 14.4477 178.052 14 177.5 14V16ZM193.929 14C193.376 14 192.929 14.4477 192.929 15C192.929 15.5523 193.376 16 193.929 16V14ZM210.357 16C210.909 16 211.357 15.5523 211.357 15C211.357 14.4477 210.909 14 210.357 14V16ZM226.786 14C226.233 14 225.786 14.4477 225.786 15C225.786 15.5523 226.233 16 226.786 16V14ZM5 16H13.2143V14H5V16ZM29.6429 16H46.0714V14H29.6429V16ZM62.5 16H78.9286V14H62.5V16ZM95.3571 16H111.786V14H95.3571V16ZM128.214 16H144.643V14H128.214V16ZM161.071 16H177.5V14H161.071V16ZM193.929 16H210.357V14H193.929V16Z" fill="#1C64F2" />
            </svg>
        )
        else return (
            <svg className="hidden lap:flex" width="240" height="2" viewBox="0 0 240 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1" x2="239" y2="1" stroke="#EBF5FF" strokeWidth="2" strokeLinecap="round" strokeDasharray="16 16" />
            </svg>
        )
    }
}
export function Header() {
    let { select, setSelect, list } = useContext(FormContext)

    let _id = list?.filter((a: any) => a.slug === select)[0]

    function Title({ data }: any) {
        let font = " text-[#FFFFFF6E] "
        if (_id.id > data.id) font = "text-teal-500  "
        else if (_id.id === data.id) font = " text-[#fff]  "
        return (
            <div className={`${_id.id === data.id && " !flex  "} tap:flex flex-row items-center hidden`}>
                <p className={`lap:text-xl tap:text-lg   ${font} ${_id.id >= data.id ? "  font-bold  " : " "}`}  >{data.title}</p>
                {data.id !== 4 ? <Icon.next className={'rotate-180 mx-4 hidden tap:flex'} size={10} color={_id.id >= data.id ? "#00A5A5 " : "#FFFFFF6E"} /> : <></>}
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-prussian-800 to-prussian-800
        text-white w-full rounded-t-[32px] ">
            <div className="flex flex-row justify-between  lap:text-2xl tap:text-lg text-base w-[80%] mt-10">
                {_id.id != 1 ? <div className="flex flex-row *:ml-4 items-center my-4" onClick={() => setSelect(list[_id.id - 2].slug)}>
                    <IconArrow className={'rotate-180'} color={"#fff"} />
                    <p>الرجوع</p>
                </div> : <div></div>}
                <div className="flex flex-row *:mr-4 items-center my-4">
                    {/* <p>الإغلاق</p>
                    <Icon.Close size={20} /> */}
                </div>
            </div>
            <div className="flex flex-row justify-between w-[80%] my-4 items-center mx-6">
                {list?.map((a: any) => <Title data={a} key={a.id} />)}
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