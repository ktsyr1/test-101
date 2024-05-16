
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(req: any, res: any) {
    // find all  

    let all = await prisma.emailNews.findMany()
    console.log(all);

    return Response.json({ emailNews: all })

}

export async function POST(req: any, res: any) {
    // create a new data in emailnews
    const body = await req.json()
    await prisma.emailNews.create({ data: body })

    return Response.json({ message: "لقد تم تسجيل الاشتراك" })

} 