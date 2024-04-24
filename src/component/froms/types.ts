import { FormInstance } from "antd"

export type TypeReadmap = {
    id: number
    title: string
    slug: string
}

export type TypeSetup = {
    // list: TypeReadmap[]
    children: JSX.Element
}

export type LayoutType = {
    children: JSX.Element
    slug: string
}
export type TypeBtn = {
    children: string
    onClick?: () => void
    className?: string
    title?: string
    active: boolean
}

export type FieldType = {
    cityId?: string;
    firstname?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber?: number;
    Email?: string;
    password?: string;
    bankDetails?: string;
    codeEng?: string | undefined
    yearsExperience?: number
    study?: string | undefined
};

export interface SubmitButtonProps {
    form: FormInstance
}