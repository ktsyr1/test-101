import localFont from 'next/font/local'

const inter: any = localFont({ src: './DS_Digital.ttf', weight: '100', style: 'normal' })

export async function Counter({ name, conter, Default }: any) {
    return (
        <div className="md:mx-4 flex justify-center flex-col m-auto ">
            <img src={`/images/counter-${name}.png`} alt="counter img" className=" min-[1010px]:w-56 w-36 max-[450px]:w-36 " />
            <div className={inter.className + " w-auto"}>
                <div className={`m-auto min-[1010px]:mt-[-165px] tap:mt-[-105px] min-[450px]:mt-[-105px] mt-[-90px] w-max min-[1010px]:*:text-3xl *:text-xl `}>
                    <p className={' text-slate-700 w-full  '}>{Default}</p>
                    <p className={'  min-[1010px]:mt-[-35px] mt-[-28px] text-white w-full  '}>{conter}</p>
                </div>
            </div>
            {/* <p className="font-bold lap:text-4xl text-[#0043ce] text-center tap:text-xl text-sm my-8" >{name}</p> */}
        </div>
    )
}
