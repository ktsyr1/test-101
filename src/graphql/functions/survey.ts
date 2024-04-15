import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function surveys(parent: any, args: any) {
    let data = await prisma.survey.findMany()
    return data
}

export async function survey(parent: any, args: any) {

    let data: any = await prisma.survey.findFirst({
        where: { id: Number(args.id) }
    })
    return data
}

export async function SurveyCreate(parent: any, args: any) {
    const { id, ...body } = args.input
    console.log(body);

    let data = await prisma.survey.create({ data: body });

    return data
}

export async function SurveyDelete(parent: any, args: any) {
    let id = Number(args.id)
    let data: any = await prisma.survey.delete({ where: { id }, })
    return true
}