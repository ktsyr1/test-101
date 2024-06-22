import localFont from 'next/font/local'

const inter: any = localFont({ src: './DS_Digital.ttf', weight: '100', style: 'normal' })

export async function Counter({ names, conter, Default }: any) {
    return (

        <div className="md:mx-4 flex justify-center flex-col m-auto ">
            <div className="md:mx-4 flex justify-center flex-col m-auto ">
                <img src={`/images/counter.png`} alt="counter img" className=" min-[1010px]:w-56 min-[450px]:w-36 w-28 " />
                <div className={inter.className + " absolute flex items-center justify-center text-center m-auto min-[1010px]:w-48 w-28 min-[450px]:w-36 min-[1010px]:h-56 h-36 max-[450px]:h-36"}>
                    <div className={`m-auto w-max min-[1010px]:*:text-4xl min-[450px]:*:text-3xl  *:text-xl `}>
                        <p className={' text-slate-700 w-full '}>{Default.slice(0, conter.toString().length)}</p>
                        <p className={'  min-[1010px]:mt-[-40px] min-[450px]:mt-[-36px] mt-[-28px] text-white w-full '}>{conter}</p>
                    </div>
                </div>
            </div>
            <p className="font-bold lap:text-4xl tap:text-2xl text-lg text-[#0043ce] text-center  my-4" >{names}</p>
        </div>
    )
}
