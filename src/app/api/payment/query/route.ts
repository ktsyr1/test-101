
import axios from 'axios';

export async function GET(req: any, res: any) {
    console.log("------------------------ start test ------------------------");

    let Params = new URL(req?.url)
    let search = new URLSearchParams(Params.search)
    const ParamsJson = Object.fromEntries(search.entries());

    let url = `${process.env.NEXT_PUBLIC_API}/Client/PaymentQueryTransaction`
    url += `?ProjectId=${ParamsJson.id}&Trans_ref=${ParamsJson?.tran_ref}&PromoCode=${ParamsJson?.PromoCode || ""}`

    let { data } = await axios.get(url, { headers: { Authorization: `Bearer ${ParamsJson?.userToken}` } })
    console.log(data);


    return Response.json(data)

} 