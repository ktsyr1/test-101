import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function InvitCreate(parent: any, args: any) {
    let data: any = { email: args.email , }
    

    let create = await prisma.user.create({ data });
    return true
}

export async function InvitDelete(parent: any, args: any) {
    let id = Number(args.id)
    let data: any = await prisma.survey.delete({ where: { id }, })
    return true
}