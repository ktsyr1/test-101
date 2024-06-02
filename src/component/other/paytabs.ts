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
/**
 * This function sets configuration values for a merchant, server key, region, and agent.
 * @param {string} merchantId - The `merchantId` parameter is a string that represents the unique
 * identifier of a merchant or seller. It is typically used in payment processing systems to identify
 * the merchant associated with a transaction.
 * @param {string} serverKey - A server key is a unique identifier used to authenticate requests made
 * to a server. It is typically a long string of characters that is kept confidential and used to
 * verify the identity of the client making the request.
 * @param {string} region - Region is a parameter that specifies the geographical region where the
 * merchant operates or where the server is located. It could be a country, continent, or any other
 * geographical division.
 * @param {string} agent - [paytap,clickpay] The `agent` parameter in the `setConfig` function is typically used to
 * specify the user agent string that will be sent in HTTP requests. This can be useful for identifying
 * the client making the request, such as a browser or a custom application.
 */

export function setConfig(merchantId: string, serverKey: string, region: string, agent?: string) {
    config.merchantId = merchantId;
    config.serverKey = serverKey;
    config.region = Region[region as keyof typeof Region];
    if (agent === "paytap") {
        const regions_urls = {
            ARE: 'https://secure.paytabs.com/',
            SAU: 'https://secure.paytabs.sa/',
            // SAU: 'https://merchant.paytabs.sa/',
            OMN: 'https://secure-oman.paytabs.com/', JOR: 'https://secure-jordan.paytabs.com/',
            EGY: 'https://secure-egypt.paytabs.com/', GLOBAL: 'https://secure-global.paytabs.com/'
        };
        config.endPoint = regions_urls[region as keyof typeof regions_urls];
    } else if (agent == "clickpay") {
        const regions_urls = {
            ARE: 'https://secure.clickpay.com.sa/',
            SAU: 'https://secure.clickpay.com.sa/'
        }
        config.endPoint = regions_urls[region as keyof typeof regions_urls];
    } else throw new Error(`Unknown agent`)

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
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            let result: any = error.response ? error.response.data.message : error.errno
            return { response_code: 400, result: result }
        });
} 
