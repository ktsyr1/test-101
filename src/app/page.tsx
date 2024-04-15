
import Forms from "@/component/froms/eng/form";
import OurClientsTestimonials from "@/component/landing/OurClientsTestimonials";
import RequestMechanism from "@/component/landing/RequestMechanism";
import BlogPart from "@/component/landing/blog";
import Consultation from "@/component/landing/consultation";
import JobsPart from "@/component/landing/jobs";
import Services from "@/component/landing/services";
import Sliders from "@/component/landing/slider";

export default function Home() {
    
    return (
        <div className="flex  flex-col items-center justify-between">
            <Sliders /> 
            <Services />
            <RequestMechanism />
            <JobsPart />
            <BlogPart />
            <OurClientsTestimonials />
            <Consultation />
        </div>
    );
}
