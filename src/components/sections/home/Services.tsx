import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/layout/SectionHeader";
import { MainServices } from "@/constants/services";

export default function Services() {
    return (
        <section id="services" className="section">
            <SectionHeader title="// SERVICES" description="Design clean. Build clever. Ship fast." />

            {/* Service/Container */}
            <div className="bg-foreground-dimmer divide-foreground-dimmer flex flex-col divide-y overflow-hidden rounded-md">
                {MainServices.map((service, i) => (
                    <ServiceCard key={i} index={i + 1} {...service} />
                ))}
            </div>
        </section>
    );
}
