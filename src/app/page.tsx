import Contact from "@/components/sections/home/Contact";
import Contact_Screen from "@/components/sections/home/Contact_Screen";
import ExtraServices from "@/components/sections/home/ExtraServices";
import FAQs from "@/components/sections/home/FAQs";
import Hero from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import Services from "@/components/sections/home/Services";

export default function Home() {
    return (
        <main className="font-nunito flex min-h-screen min-w-[320px] flex-col gap-32">
            <Hero />
            <SelectedWork />
            <Services />
            <ExtraServices />
            <Contact_Screen />
            <Contact />
            <FAQs />
        </main>
    );
}
