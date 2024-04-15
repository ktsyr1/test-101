import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function users(parent: any, args: any, contextValue: any) {
    console.log(Object.keys(contextValue,  ))

    let data = await prisma.user.findMany({
        select: {
            id: true,
            fullname: true,
            email: true,
            bio: true,
            image: true,
            create_at: true,
            verify_User: true
        }
    });
    return data
}

export async function user(parent: any, args: any) {

    let data: any = await prisma.user.findUnique({
        where: { id: Number(args.id) },
        select: {
            id: true,
            fullname: true,
            email: true,
            bio: true,
            image: true,
            create_at: true,
            verify_User: true
        }
    })
    return data
}

export async function UserUpdate(parent: any, args: any) {
    let { id, ...body } = args

    let data: any = await prisma.user.update({
        where: { id: Number(id) },
        data: body,
        select: {
            id: true,
            fullname: true,
            email: true,
            bio: true,
            image: false,
            create_at: false,
            verify_User: true
        }
    })
    return data
}

export async function UserDelete(parent: any, args: any) {
    let id = Number(args.id)
    console.log({ args, id })
    let data: any = await prisma.user.delete({
        where: { id },
    })
    return data
}