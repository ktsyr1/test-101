import Btn from "@/component/btns";
import { IconArrow } from "@/component/icons";
import JobsPart from "@/component/landing/jobs";
import SizeBox from "@/component/size-box";
import Logo from "@/component/theme/logo1";
import list from "@/data/jobs_staps.json"

export default function Jobs() {
    return (
        <div className="">
            <Hero />
            <SizeBox>
                <div className={`flex flex-row items-center m-auto w-full my-10 mt-[103px]`} >
                    <Logo type="semple" />
                    <div className="">
                        <h1 className="w-full text-start text-5xl font-bold text-safety-700 mr-10  ">آلية الإنضمام إلى إنسبكتكس</h1>
                        <p className="text-2xl font-medium text-prussian-600 mr-10 my-4">    انسبكتكس تفتح المجال دائما امام المهندسين الساعين لاستلام مشاريع  و زيادة دخلهم بفرصة الإنضمام اليها</p>
                    </div>
                </div>
            </SizeBox>
            <div className="flex flex-col" >
                {list.map(item => <Box data={item} key={item.title} />)}
            </div>
            <JobsPart className="bg-none bg-white  " title='تقدم بالطلب' to={"/join-eng"} />
        </div>
    )
}

function Hero() {
    return (
        <div className={`bg-blue-900 flex flex-col h-[514px] justify-center bg-center bg-[url(/images/Apply-For-a-Job.jpeg)]`}>
            <div className="bg-blue-900 flex flex-col bg-opacity-90 h-full justify-center text-center text-white ">
                <h1 className="text-white text-6xl font-extrabold mt-[100px]">تقديم لفرصة عمل</h1>
                <SizeBox>
                    <p className="w-full m-auto text-2xl font-normal my-0 p-4 min-h-[176px]"> قامت إنسبكتكس بتنفيذ نموذج تشغيلي فريد من نوعه يُمكنها من تلبية احتياجات العملاء بطريقة فعّالة و مرنة مع الحفاظ على تقديم اعلى معايير الجودة. أحد أهم مزايا شركة ` انسبكتكس` هي توفير المهندسين المؤهلين والمحترفين والذين يتمتعون بأوقات متاحة حيث يقوم النظام باختيار المهندس الأنسب وفقًا لاختصاصاتهم, أوقاتهم المتاحة و مواقعهم الجغرافية. بعد إنهاء عملية الفحص, يحصل كل مهندس عمل على المشروع على النسبة المادية المتفق عليها</p>
                </SizeBox>
                <Btn title={"تقدم بطلب الإنضمام لإنسبكتكس"} to="/join-eng" className="bg-white text-xl font-bold m-auto !justify-between max-w-[640px] pr-6 w-full  text-prussian-800 rounded-full" childSort="end" >
                    <IconArrow className={'fill-prussian-800'} />
                </Btn>
            </div>
        </div>
    )
}

type BoxType = {
    title: string
    content: string
    image: string
    rtl: boolean
}
function Box({ data }: { data: BoxType }) {
    return (
        <SizeBox className={`flex ${data?.rtl ? "flex-row" : "flex-row-reverse bg-green-50"} rounded-[100px] px-[20px] hover:shadow-lg  justify-center max-[900px]:!mx-10 my-4 border border-green-300 h-[300px] `} >
            <div className="flex flex-col max-w-[500px] w-full" >
                <h2 className="text-3xl font-semibold text-prussian-500 mb-4" >{data.title}</h2>
                <p className="text-xl font-medium" dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <img src={data.image} alt=" gallery image" className={`w-60   ${!data?.rtl ? " ml-10 " : " mr-10 "}`} loading="lazy" />
        </SizeBox>
    )
}

