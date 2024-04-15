
export default function Hero({ children, className }: any) {
    return (
        <div className={`bg-blue-900 flex flex-col h-[300px] justify-center bg-center ${className}`}>
            <div className="bg-blue-900 flex flex-col bg-opacity-90 h-full justify-center text-center text-white ">
                {children}
            </div>
        </div>
    )
}
