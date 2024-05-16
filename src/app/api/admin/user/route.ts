
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "crypto";
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

        const validPassword = await compare(password, user?.password);

        // if (!validPassword) return Response.json({ message: "Invalid credentials" }, { status: 401 });
        console.log({ userId: user.id, email });

        const token = sign({ userId: user?.id },
            process.env.secretKey,
            { expiresIn: "1h" });
        console.log(token);

        return Response.json(user)
    } else return Response.json({ message: "Invalid credentials" }, { status: 401 });
    // const token = sign({ userId: user.id }, secretKey, { expiresIn: "1h" });



} 