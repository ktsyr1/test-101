
'use server'
 
import { cookies } from 'next/headers' 

export default async function CheckCountService() {
    let cookiesStore= cookies()
    let count:any  = cookiesStore.get("Counts")
    if (count) {
        
        console.log(count);
        count  =JSON.parse( count?.value)
        console.log(count);
    }else{
        count = {value:2}
        // let MR = Math.floor(Math.random() * 10)
        // const data = { date: new Date().getTime(), value: MR > 0 ? MR : 1 };
        // console.log(data);
        // const oneDay = 6 * 60 * 60 * 1000
        // cookies().set( 'Counts', JSON.stringify(MR > 0 ? MR : 1) ,  { expires: Date.now() - oneDay }         )
        // count = data
    }  
    // let endDay = new Date().getTime() - count - 24 * 60 * 60 * 1000
    // if (endDay > 0) {
        // } 
        // let end = 9 - count[5]
        // console.log({end});

    console.log(count);

    // let [count, setCount] = useState<any | number>(async(a: any) => {
//         const Count: any =await JsCookies.get('Counts');
//         console.log({ Count });
//         if (Count) {
//             return Count.value
//         } else {

//             let MR = Math.floor(Math.random() * 10)
//             const data = { date: new Date().getTime(), value: MR > 0 ? MR : 1 };
// console.log({data});

//             JsCookies.set('Counts', JSON.stringify(data))
//             return data.value
//         }
//     })

    let counts = <strong className="text-safety-700 text-4xl" > {count ?.value} </strong>
    // ui ux content
    return (
        <div className="flex flex-row items-center border-2 border-safety-700 tap:px-6 px-4 rounded-lg">
            <p className="w-34 tap:text-sm text-sx px-2">الطلب مرتفع متبقي  لهذا الاسبوع</p>
            <div className="flex flex-col text-center pr-3 border-r-2 ">
                {counts}
                <p>طلبات</p>
            </div>
        </div>
    )
}
// export default function CheckCountService() {
   
//     // useEffect(() => {
//         // setTimeout(() => setCount(count > 2 ? count - 1 : 2), 1000 * 60 * 5)
//     // }, [count])

//     // function GinCount() {

//     //     let MR = Math.floor(Math.random() * 10)
//     //     const count: any = JsCookies.get('count');
//     //     let SetCount = () => {
//     //         const data = { date: new Date().getTime(), value: MR > 0 ? MR : 1 };

//     //         JsCookies.set('count', data.value.toString());
//     //         return data
//     //     }
//     //     if (!count) return SetCount().value
//     //     else {

//     //         let endDay = new Date().getTime() - count - 24 * 60 * 60 * 1000
//     //         if (endDay > 0) return SetCount().value
//     //         let end = 9 - count[5]
//     //         return end
//     //     }
//     // }
//     // let value = GinCount()

//     let counts = <strong className="text-safety-700 text-4xl" > {count} </strong>
//     // ui ux content
//     return (
//         <div className="flex flex-row items-center border-2 border-safety-700 tap:px-6 px-4 rounded-lg">
//             <p className="w-34 tap:text-sm text-sx px-2">الطلب مرتفع متبقي  لهذا الاسبوع</p>
//             <div className="flex flex-col text-center pr-3 border-r-2 ">
//                 {counts}
//                 <p>طلبات</p>
//             </div>
//         </div>
//     )
// }

/**
 * @algo
 * getCookis counts {date,value}
 * if counts
 * | verify date active max 6h // let endDay = new Date().getTime() - count - 24 * 60 * 60 * 1000
 * |---| to json and retern
 * | if active // counts in cookies 
 * | if end active // counts -1 
 * else ginCounts random l// et MR = Math.floor(Math.random() * 10) ; MR > 0 ? MR : 1
 * | setCookies  {date,value}  // const data = { date: new Date().getTime(), value: MR > 0 ? MR : 1 };
 */