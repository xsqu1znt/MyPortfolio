import About from "@/components/sections/home/About";
import Contact from "@/components/sections/home/Contact";
import FAQs from "@/components/sections/home/FAQs";
import FeaturedWork from "@/components/sections/home/FeaturedWork";
import Hero from "@/components/sections/home/Hero";
import Services from "@/components/sections/home/Services";
import Testimonials from "@/components/sections/home/Testimonials";

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-[320px] flex-col">
            <Hero />
            <FeaturedWork />
            <Services />
            <Testimonials />
            <About />
            <FAQs />
            <Contact />
        </main>
    );
}
