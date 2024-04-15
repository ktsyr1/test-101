import Link from "next/link";
import { IconLogo } from "../icons";

export default function Logo() {
    return (
        <Link href={'/'} className="inline-flex items-center gap-[10px] relative h-[70px] mx-3  max-[697px]:h-[50px] mr-[80px] ">
            <div className="relative w-[43.18px] "  >
                <IconLogo className={'w-[43.18px]  max-[697px]:w-[35px] '} />
            </div>
            <p className="relative w-[200px] [font-family:'Araboto-Medium-Regular',Helvetica] font-normal text-transparent text-[24px] tracking-[0] leading-[28.8px] [direction:rtl]">
                <span className="text-[#001f67]">إنسبكـ</span>
                <span className="text-[#f25b06]">ـتكس</span>
            </p>
        </Link>
    );
};
