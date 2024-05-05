'use server'
 
import { cookies } from 'next/headers'
 
export default async function CheckCountService() {
    let MR = Math.floor(Math.random() * 10)

    function GinCount() {

        const cookieStore = cookies()
        const count: any = cookieStore.get('count');
        let SetCount = () => {
            const data = {
                date: new Date().getTime(),
                value: MR > 0 ? MR : 1
            };

            // cookies().set('count', JSON.stringify(data));
            return data.value
        }
        if (!count) return SetCount()
        else {

            let CookiesCountValue = JSON.parse(count.value) 
            let endDay = new Date().getTime() - CookiesCountValue.date -  24 * 60 * 60 * 1000

            if (endDay > 0) return SetCount()
            return CookiesCountValue.value
        }
    }
    let value = GinCount()

    let counts = <strong className="text-safety-700 text-4xl" > {value} </strong>
    //  logic view data
    // ui ux content
    return (
        <div className="flex flex-row items-center border-2 border-safety-700 px-6 rounded-lg">
            <p className="w-34 tap:text-sm text-sx">الطلب مرتفع متبقي  لهذا الاسبوع</p>
            <div className="flex flex-col text-center pr-3 border-r-2 ">
                {counts}
                <p>طلبات</p>
            </div>
        </div>
    )
}