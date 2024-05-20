import { NextApiRequest, NextApiResponse } from "next";
// import { BetaAnalyticsDataClient } from "@google-analytics/data"; 

// 👇 Setting PropertyId
// const propertyId = process.env.GA_PROPERTY_ID;

// const analyticsDataClient = new BetaAnalyticsDataClient({
//     credentials: {
//         client_email: process.env.GA_CLIENT_EMAIL,
//         private_key: process.env.GA_PRIVATE_KEY?.replace(/\n/gm, "\n"), // replacing is necessary
//     },
// });
// export async function GET(req: Request, res: NextApiResponse) { 
export const GET = async (req: Request, res: NextApiResponse) => {
    // 👇 Running a simple report
    // const [response] = await analyticsDataClient.runReport({
    //     property: `properties/${propertyId}`,
    //     dateRanges: [
    //         {
    //             startDate: `7daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
    //             endDate: "today",
    //         },
    //     ],
    //     dimensions: [
    //         {
    //             name: "year", // data will be year wise
    //         },
    //     ],
    //     metrics: [
    //         {
    //             name: "activeUsers", // it returs the active users
    //         },
    //     ],
    // });
    return Response.json({ response: "" })
}