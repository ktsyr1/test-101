// "use client" 
import BlogAll from "@/component/blog/home";
import InspectionRequest from "@/component/landing/InspectionRequest";
import OurClientsTestimonials from "@/component/landing/OurClientsTestimonials";
import RequestMechanism from "@/component/landing/RequestMechanism";
import AllCounters from "@/component/landing/AllCounters";
import Consultation from "@/component/landing/consultation";
import JobsPart from "@/component/landing/jobs";
import Services from "@/component/landing/services";
import Sliders from "@/component/landing/slider";

export default function Home() {


    return (
        <div className="flex  flex-col items-center justify-between">
            {/* <Sliders />
            <AllCounters />
            <Services />
            <RequestMechanism />
            <InspectionRequest />
            <JobsPart />
            <BlogAll />
            <OurClientsTestimonials />
            <Consultation /> */}
        </div>
    );
}
