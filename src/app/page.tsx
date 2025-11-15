import Hero from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import Services from "@/components/sections/home/Services";
import ExtraServices from "@/components/sections/home/ExtraServices";
import Contact from "@/components/sections/home/Contact";
import FAQs from "@/components/sections/home/FAQs";

export default function Home() {
    return (
        <main className="font-nunito flex min-h-screen min-w-[320px] flex-col gap-32 overflow-x-hidden">
            <Hero />
            <SelectedWork />
            <Services />
            <ExtraServices />
            <Contact />
            <FAQs />
        </main>
    );
}
