
'use client'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function CheckCountCookeies() {
    let count: any = Cookies.get("Counts")
    let MR = Math.floor(Math.random() * 10)
    let [init, setInit] = useState<any>(null)
    // setTimeout(() => setCount(count > 2 ? count - 1 : 2), 1000 * 60 * 5)
    useEffect(() => {

        let SetCount = () => {
            const data = { date: new Date().getTime(), value: MR > 0 ? MR : 1 };

            Cookies.set('Counts', JSON.stringify(data))
            return data
        }

        if (count) {
            console.log(typeof count);

            count = typeof count == "string" ? JSON.parse(count) : count

        } else {

            let endDay = new Date().getTime() - 24 * 60 * 60 * 1000
            if (endDay > 0) count = SetCount()

            // let end = 9 - count[5]
            console.log({ endDay });


        }
        setInit(count)
    }, [])
    return init
} 