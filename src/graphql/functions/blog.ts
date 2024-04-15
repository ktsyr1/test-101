import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let where = (i: any) => {
    return { where: { id: Number(i) } }
}
export async function blogs(parent: any, args: any) {
    let data = await prisma.blog.findMany()
    console.log(data);
    
    return data
}

export async function blog(parent: any, args: any) {

    let data: any = await prisma.blog.findUnique(where(args.id))
    return data
}

export async function BlogCreate(parent: any, args: any) {
    let data = await prisma.blog.create({ data: args });
    return data
}

export async function BlogUpdate(parent: any, args: any) {
    const { id, ...body } = args
    let query = { ...where(args.id), data: body }
    let data: any = await prisma.blog.update(query)
    return data
}

export async function BlogDelete(parent: any, args: any) {
    let data = await prisma.blog.delete(where(args.id))
    return true
}