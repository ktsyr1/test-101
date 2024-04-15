
import GroupServices from "@/component/services/GroupServices";
import Partners from "@/component/services/Partners";
import ServiceRequestMechanism, { TitlePart } from "@/component/services/ServiceRequestMechanism";
import OurClientsTestimonials from "@/component/landing/OurClientsTestimonials";
import SizeBox from "@/component/size-box";
import { Suspense } from 'react'

// icons Partners
// يجب ان تكون ايقونت ال Partners في الاعلى 
export default function ServicesPade() {
    return (
        <Suspense>
            <div className=" min-h-[300px] py-10 w-full flex flex-col bg-[#F0F0F0]">
                <SizeBox >
                    <TitlePart title="خدمــــــــاتنا" />
                </SizeBox>
                <GroupServices type="page" />
                <ServiceRequestMechanism />
                <Partners />
                <OurClientsTestimonials />

            </div>
        </Suspense>
    )
} 