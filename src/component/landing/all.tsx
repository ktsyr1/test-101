
export default function AllCounters() {
    return (
        <div className="flex flex-row w-full max-w-[1000px] justify-between my-20 select-none">
            <Counter name="عميل" conter="120" />
            <Counter name="تقرير" conter="20" />
            <Counter name="زائر" conter="200" />
        </div>
    )
}

export function Counter({ name, conter }: any) {
    return (
        <div  className="border-8 border-safety-700 rounded-full">
            <div className="flex flex-col rounded-full bg-gradient-to-r from-[#013035] to-[#0694A2] w-44 h-44 items-center justify-center text-center *:text-4xl text-white font-bold m-1" >
                <p className="">{conter}</p>
                <p className="">{name}</p>
            </div>
        </div>
    )
}