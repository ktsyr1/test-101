
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const { email, password } = body;

    const user: any = await prisma.user.findUnique({
        where: { email }
    })

    if (user) {

        const news = await bcrypt.hash(password, 12)
        console.log(news);
        ;
        const validPassword = await bcrypt.compare(password, user?.password);

        if (!validPassword) return Response.json({ message: "Invalid credentials" }, { status: 401 });
        else {

            const secretKey = process.env.secretKey || "dev"
            const token = jwt.sign({ userId: user?.id },
                secretKey,
                { expiresIn: "7d" });


            return Response.json({ token })
        }
    } else return Response.json({ message: "Invalid credentials" }, { status: 401 });
    // const token = sign({ userId: user.id }, secretKey, { expiresIn: "1h" });



} 