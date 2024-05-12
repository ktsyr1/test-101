"use server"
import GroupServices from "@/component/services/GroupServices";
import Partners from "@/component/services/Partners";
import ServiceRequestMechanism, { TitlePart } from "@/component/services/ServiceRequestMechanism";
import OurClientsTestimonials from "@/component/landing/OurClientsTestimonials";
import SizeBox from "@/component/size-box";
// import { Suspense } from 'react'

export default async function ServicesPade() {
    return (
        // <Suspense>
            <div className=" min-h-[300px] tap:py-10 w-full flex flex-col bg-[#F0F0F0]">
                <SizeBox className="max-[1000px]:!m-0 " >
                    <TitlePart title="خدمــــــــاتنا" />
                </SizeBox>
                <GroupServices type="page" />
                <ServiceRequestMechanism />
                <Partners />
                <OurClientsTestimonials />

            </div>
        // </Suspense>
    )
} 