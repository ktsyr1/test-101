'use client'

// import { useRouter } from 'next/navigation'
// import { IconArrow } from "./icons";
import Link from 'next/link';

type Props = {
    title: string
    to?: string | undefined
    className?: string
    childSort?: IconSort | string
    children?: JSX.Element
    onClick?: () => void
    style?: any
    onMouseEnter?: () => void
    onMouseLeave?: () => void
} & Record<string, any>;

enum IconSort {
    start = "start",
    end = "end"
}

// event handlers

function Btn(props: Props) {
    let {
        to = "#", title, className, children, onClick, style,
        childSort = IconSort.start
    } = props
    const Layout = (props: any) =>
        typeof onClick === 'function' ? (
            <div onClick={onClick} className={`flex flex-row items-center justify-center shadow-lg m-3 p-3   ${className}`} style={style} {...props}>
                {props.children}
            </div>
        ) : (
            <Link href={to} className={`flex flex-row items-center justify-center shadow-lg m-3 lap:p-3 p-2   ${className}`} style={style}  {...props}>
                {props.children}
            </Link>
        )
    return (
        <Layout >
            {childSort === 'start' ? children : <></>}
            <b className="relative flex items-end justify-center shrink-0 px-4"> {title} </b>
            {childSort === 'end' ? children : <></>}
        </Layout >
    )
};

export default Btn;
