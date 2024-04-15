

export default function SizeBox({ children, className }: any) {
    return (
        <div className={` flex items-center w-full max-w-[1360px]  max-[1000px]:m-4 m-auto ${className}`}>
            {children}
        </div>
    )
}
