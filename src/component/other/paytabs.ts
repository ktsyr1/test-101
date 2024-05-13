/**
 * @description Paytabs rest api integration for nodejs
 * @author Qotayba Mohammad <ktsyr1@gmail.com>
 */
//Used for http requests
const axios = require('axios');

//Use it to stringify formdata 
// start types 
export enum Region {
    ARE = "ARE",
    OMN = "OMN",
    EGY = "EGY",
    SAU = "SAU",
    JOR = "JOR",
    GLOBAL = "GLOBAL",
}

const config = { merchantId: '', serverKey: '', region: '', endPoint: "" }

export function setConfig(merchantId: string, serverKey: string, region: string) {
    config.merchantId = merchantId;
    config.serverKey = serverKey;
    config.region = Region[region as keyof typeof Region];

    // const regions_urls = {ARE:'https://secure.clickpay.com.sa/',SAU:'https://secure.clickpay.com.sa'};
    const regions_urls = {
        ARE: 'https://secure.paytabs.com/',
        SAU: 'https://secure.paytabs.sa/',
        // SAU: 'https://merchant.paytabs.sa/',
        OMN: 'https://secure-oman.paytabs.com/', JOR: 'https://secure-jordan.paytabs.com/',
        EGY: 'https://secure-egypt.paytabs.com/', GLOBAL: 'https://secure-global.paytabs.com/'
    };

    config.endPoint = regions_urls[region as keyof typeof regions_urls];
}

/**
 * @description Create the payment page
 * Please pass all required information based on Paytabs documentation and your requirements
 */
export async function createPaymentPage(payment_methods: any, transaction: any, cart: any, customer: any, shipping: any, urls: any, paypage_lang: any, callbackFunction: any, framed = false) {

    let data = {
        profile_id: config.merchantId,
        payment_methods,
        tran_type: transaction[0],
        tran_class: transaction[1],
        cart_id: cart[0],
        cart_currency: cart[1],
        cart_amount: cart[2],
        cart_description: cart[3],
        paypage_lang,
        customer_details: {
            name: customer[0], email: customer[1], phone: customer[2],
            street1: customer[3], city: customer[4], state: customer[5], country: customer[6],
            zip: customer[7], ip: customer[8]
        },
        shipping_details: {
            name: shipping[0], email: shipping[1], phone: shipping[2],
            street1: shipping[3], city: shipping[4], state: shipping[5], country: shipping[6],
            zip: shipping[7], ip: shipping[8]
        },
        callback: urls[0],
        return: urls[1],
        framed,
        user_defined: { package: "node.js PT2 V2.0.0" }
    }
    let url = `${config.endPoint}payment/request`
    return await sendPost(url, data, callbackFunction);
}

export function validatePayment(tranRef: any, callback: Function) {
    let data = {
        profile_id: config.merchantId,
        tran_ref: tranRef
    }
    let url = `${config.endPoint}payment/query`
    sendPost(url, data, callback);
}
export function queryTransaction(transaction: any, cart: any, callback: Function) {
    transaction = {
        tran_ref: transaction[0], tran_type: transaction[1], tran_class: transaction[2]
    };
    cart = {
        cart_id: cart[0], cart_currency: cart[1], cart_amount: parseFloat(cart[2]), cart_description: cart[3]
    };
    let data = {
        profile_id: config.merchantId,
        tran_ref: transaction['tran_ref'],
        tran_type: transaction['tran_type'],
        tran_class: transaction['tran_class'],
        cart_id: cart['cart_id'],
        cart_currency: cart['cart_currency'],
        cart_amount: cart['cart_amount'],
        cart_description: cart['cart_description'],
    }
    let url = `${config.endPoint}payment/request`
    sendPost(url, data, callback);
}

function sendPost(url: any, objData: any, callback: any) {

    var sendData = {
        method: 'post',
        url: url,
        headers: { authorization: config.serverKey },
        data: objData
    };
    return axios(sendData)
        // .then((res: any) => callback(res.data))
        .then((res: any) => {
            console.log(res);

            return res.data
        })
        .catch((error: any) => {
            let result: any = error.response ? error.response.data.message : error.errno

            // callback({ response_code: 400, result: result });
            return { response_code: 400, result: result }
        });
} 
