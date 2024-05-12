import { createPaymentPage, setConfig, validatePayment } from '@/component/other/paytabs'
import paytabs from 'paytabs_pt2'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// import { NextApiRequest, NextApiResponse } from 'next';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import axios from 'axios';

export async function GET(req: any, res: any) {
    console.log("------------------------ start test ------------------------");

    let Params = new URL(req?.url)
    let search = new URLSearchParams(Params.search)
    const ParamsJson = Object.fromEntries(search.entries());

    let url = `${process.env.NEXT_PUBLIC_API}/Client/PaymentQueryTransaction`
    url += `?ProjectId=${ParamsJson.id}&Trans_ref=${ParamsJson?.tran_ref}&PromoCode=${ParamsJson?.PromoCode || ""}`

    let { data } = await axios.get(url, { headers: { Authorization: `Bearer ${ParamsJson?.userToken}` } })
    // .then(({ data }) => data)
    console.log(data);


    return Response.json(data)

} 