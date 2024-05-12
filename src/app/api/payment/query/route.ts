import { createPaymentPage, setConfig, validatePayment } from '@/component/other/paytabs'
import paytabs from 'paytabs_pt2'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// import { NextApiRequest, NextApiResponse } from 'next';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

function GetIp(headersList: any) {

    const ip = headersList.get("x-forwarded-for");
    let ip_address = ip?.split(":") || [];
    return ip_address[ip_address.length - 1]
}
export async function GET(req: any, res: any) {
    console.log("------------------------ start test ------------------------");
    const headersList = headers();
    const cookieStore = cookies()
    const tran_ref = cookieStore.get('tran_ref')

    let data = {
        profile_id: process.env.profileID,
        tran_ref,
        ip_address: GetIp(headersList)
    }
    let result = await validatePayment(data, () => "")
    return Response.json({ result })

} 