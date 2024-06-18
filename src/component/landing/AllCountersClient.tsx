import localFont from 'next/font/local'

const inter: any = localFont({ src: './DS_Digital.ttf', weight: '100', style: 'normal' })

export async function Counter({ name, conter, Default }: any) {
    return (
        <div className="mx-4 flex justify-center flex-col m-auto ">
            <img src="/images/counter.png" alt="counter img" className=" w-56  lap:h-56  " />
            <div className={inter.className + " w-auto"}>
                <div className={`m-auto mt-[-127px] w-max *:text-2xl `}>
                    <p className={'text-3xl text-slate-500 w-full  '}>{Default}</p>
                    <p className={'text-3xl mt-[-32px] text-white w-full  '}>{conter}</p>
                </div>
            </div>
            <p className="font-bold lap:text-4xl text-[#0043ce] text-center tap:text-xl text-sm my-8" >{name}</p>
        </div>
    )
}
