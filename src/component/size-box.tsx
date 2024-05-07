

export default function SizeBox({ children, className }: any) {
    return (
        <div className={` flex items-center w-full max-w-[1000px]  m-auto ${className}`}>
            {children}
        </div>
    )
}
