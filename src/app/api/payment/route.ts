import paytabs from 'paytabs_pt2'
import { NextResponse } from "next/server";
import requestIp from "request-ip";
import { headers } from 'next/headers';

export async function GET(req: Request) {
    // const { ua: any } = requestIp.getClientIp(req as unknown as requestIp.Request); 
    const headersList = headers();
    const data = {
        ok: true,
        ip_address: GetIp(headersList)
    };
    return new NextResponse(JSON.stringify(data, null, 2));
}
export async function POST(request: Request) {

    let profileID = process.env.profileID
    let serverKey = process.env.serverKey
    let region = "SAU"
    console.log({ profileID, serverKey });
    const headersList = headers();
    let data = {
        id: "100001",
        currency: "SAU", // default
        amount: "550",
        description: "dummy description",
        name: "Qotayba Mohammad",
        email: "ktsyr1@gmail.com",
        phone: "+96170723177",
        street: "dummy street, dummy building, dummy apt",
        city: "zahla",
        state: "boqaa",
        country: "SA", // default
        zip: "52121",
        IP: GetIp(headersList) // Provide a default IP if null
    }

    let url = {
        callback: "http://localhost:3000/api/payment/callback",
        response: "http://localhost:3000/api/payment/order/" + data.id
    }

    paytabs.setConfig(profileID, serverKey, region);
    let DATA = collectionData(paytabs, { ...data, ...url, region })
    return new Response(JSON.stringify({ data: DATA }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },

    })
}
function GetIp(headersList: any) {

    const ip = headersList.get("x-forwarded-for");
    let ip_address = ip?.split(":") || [];
    return ip_address[ip_address.length - 1]
}
// init config & add to env

type TypeCollectionData = {
    id: string;
    amount: string;
    description: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    IP: string;
    callback: string;
    response: string;
    region: string
}
function collectionData(paytabs: any, data: TypeCollectionData) {
    console.log({ data, paytabs });


    let paymentMethods = ["all"];

    let transaction = {
        type: "sale",
        class: "ecom"
    };

    let transaction_details = [transaction?.type, transaction?.class];

    let cart = {
        id: data.id,
        currency: data.region,
        amount: data.amount,
        description: data.description
    };

    let cart_details = [cart.id, cart.currency, cart.amount, cart.description];

    let customer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
        IP: data.IP,
    }

    let customer_details = [customer.name, customer.email, customer.phone, customer.street, customer.city, customer.state, customer.country, customer.zip, customer.IP];

    let shipping_address = customer_details;

    let url = {
        callback: "https://elrayesdev.com/api/callback",
        response: "https://elrayesdev.com/response/order/" + cart.id
    }

    let response_URLs = [url.response, url.callback];

    let lang = "ar";
    let paymentPageCreated = function (results: any) {
        console.log({ results });
    }

    let frameMode = true;

    let logs = paytabs.createPaymentPage(
        paymentMethods,
        transaction_details,
        cart_details,
        customer_details,
        shipping_address,
        response_URLs,
        lang,
        paymentPageCreated,
        frameMode
    );
    return logs

}
