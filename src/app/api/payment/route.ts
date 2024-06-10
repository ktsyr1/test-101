import { createPaymentPage, setConfig } from "clickpay_ts" 
import { headers } from 'next/headers'; 

export async function POST(req: any, res: any) {
    let Params = new URL(req?.url)
    let search = new URLSearchParams(Params.search)

    const model = Object.fromEntries(search.entries());
    let profileID = process.env.profileID || ""
    let NEXT_PUBLIC_serverKey = process.env.NEXT_PUBLIC_serverKey || ""
    let region = process.env.region || ""
    const headersList = headers();
    let data = {
        id: model.id,
        currency: "SAR", // default
        amount: model.amount,
        description: model.description,
        name: model.name,
        email: model.email,
        phone: model.phone,
        street: model.street,
        city: model.city,
        state: "",
        country: "SA", // default
        zip: "",
        IP: GetIp(headersList) // Provide a default IP if null
    }

    let url = {
        callback: `${process.env.NEXT_PUBLIC_apis?.replace("/api","")}/get-service/payment?id=${data.id}`,
        response: `${process.env.NEXT_PUBLIC_apis}/payment/order/${data.id}`
    }

    setConfig(profileID, NEXT_PUBLIC_serverKey, region, "clickpay");

    let paymentMethods = ["all"];
    let transaction = { type: "sale", class: "ecom" };
    let transaction_details = [transaction?.type, transaction?.class];
    let cart = { id: data.id, currency: data.currency, amount: data.amount, description: data.description };
    let cart_details = [cart.id, cart.currency, cart.amount, cart.description];
    let customer = { name: data.name, email: data.email, phone: data.phone, street: data.street, city: data.city, state: data.state, country: data.country, zip: data.zip, IP: data.IP, }
    let customer_details = [customer.name, customer.email, customer.phone, customer.street, customer.city, customer.state, customer.country, customer.zip, customer.IP];
    let shipping_address = customer_details;
    let response_URLs = [url.response, url.callback];
    let lang = "ar";

    let Result = {}

    let frameMode = true;

    let test = await
        createPaymentPage(
            paymentMethods,
            transaction_details,
            cart_details,
            customer_details,
            shipping_address,
            response_URLs,
            lang,
            function (results: any) {
                Result = results
            },
            frameMode
        );
    return Response.json(test)

}
function GetIp(headersList: any) {

    const ip = headersList.get("x-forwarded-for");
    let ip_address = ip?.split(":") || [];
    return ip_address[ip_address.length - 1]
} 