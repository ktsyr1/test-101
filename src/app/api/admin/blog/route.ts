
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(req: any, res: any) {
    let all = await prisma.blog.findMany()

    return Response.json(all)

}

export async function POST(req: any, res: any) {
    // create a new data in emailnews
    const body = await req.json()
    await prisma.blog.create({ data: body })

    return Response.json({ message: "لقد تم تسجيل الاشتراك" })

} 