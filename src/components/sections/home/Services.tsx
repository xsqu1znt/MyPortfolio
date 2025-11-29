import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/layout/SectionHeader";
import ContactCTAButton from "@/components/ui/ContactCTAButton";
import { MarqueeItem, VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { AddonServices, MainServices } from "@/constants/services";
import { styles } from "@/constants/styles";

export default function Services() {
    return (
        <section id="services" className="section bg-background-secondary px-0 pb-16">
            {/* Header */}
            <div className={`mt-16 w-full ${styles.padding.section}`}>
                <SectionHeader title="SERVICES" description="Design clean. Build clever. Ship fast." />
            </div>

            {/* Wrapper/Services */}
            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer flex w-full flex-col divide-y overflow-hidden rounded-md">
                    {MainServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1} {...service} />
                    ))}
                </div>
            </div>

            {/* Marquee/Separator */}
            <VelocityMarquee
                baseVelocity={-2}
                className="text-background-primary bg-accent my-32 rotate-2 py-2 font-sans text-7xl font-semibold tracking-tighter uppercase"
            >
                <MarqueeItem text="Looking for a specific service?" />
            </VelocityMarquee>

            {/* Wrapper/Extra Services */}
            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer flex w-full flex-col divide-y overflow-hidden rounded-md">
                    {AddonServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1 + MainServices.length} {...service} />
                    ))}
                </div>
            </div>

            {/* CTA */}
            {/* <div className={`w-full ${styles.padding.section}`}>
                <ContactCTAButton label="Have a question or new idea?" />
            </div> */}
        </section>
    );
}
