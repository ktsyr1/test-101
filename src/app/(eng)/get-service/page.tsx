'use server' // 
import AuthGetServise from '@/component/froms/service/auth'
import CheckCountService from '@/app/(eng)/get-service/actions'
export default async function GetService() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="h-[100px] w-full bg-slate-100" />
            <div className=" flex w-full max-w-[1200px]   flex-col items-center p-4 tap:max-w-[90%] ">
                <div className="mx-auto  mt-4 flex w-full flex-col items-center justify-center bg-white">
                    <div className=" flex w-full max-w-[1360px] flex-col     items-center">
                        <div className="m-auto my-20 flex w-[90%] flex-col items-center ">
                            <div className="mb-8 flex w-full flex-col items-center justify-between tap:flex-row">
                                <h2 className="my-4 mr-10 w-full text-start text-3xl font-bold text-safety-700 tap:text-4xl lap:text-5xl">
                                    طلب الخدمة{' '}
                                </h2>
                                <CheckCountService />
                            </div>
                            {/* <p className="text-slate-700 m-4 w-full">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p> */}
                        </div>
                    </div>
                    <AuthGetServise />
                    <br />
                </div>
            </div>
        </div>
    )
}
