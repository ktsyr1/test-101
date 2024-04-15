import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function InvitCreate(parent: any, args: any) {
    console.log(args);
    let data: any = { email: args.email , }
    console.log(data);

    let create = await prisma.user.create({ data });
    console.log(create);
    return true
}

export async function InvitDelete(parent: any, args: any) {
    let id = Number(args.id)
    let data: any = await prisma.survey.delete({ where: { id }, })
    return true
}