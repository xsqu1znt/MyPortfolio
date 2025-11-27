import SectionHeader from "@/components/layout/SectionHeader";

export default function Testimonials() {
    return (
        <section id="testimonials" className="section">
            <div className="border-foreground-dimmer w-full border-b py-6">
                <SectionHeader title="What my clients say." />
            </div>

            {/* Card */}
            <div className="bg-foreground-dimmer flex w-fit flex-col gap-12 rounded-md p-6">
                {/* Client */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <img
                        src="/images/clients/williamskahan.webp"
                        className="size-12 rounded-full border-2 border-white/25"
                    />

                    {/* Info */}
                    <div className="flex flex-col">
                        <span className="font-sans font-semibold">William</span>
                        <span className="text-foreground-dim text-sm tracking-wide">@williamskahan</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {/* Rating */}
                    <div className="flex items-end gap-2">
                        <span>⭐⭐⭐⭐⭐</span>
                        <span className="text-foreground-dim text-sm">5.0</span>
                    </div>

                    {/* Review */}
                    <p className="text-foreground-dim max-w-96 text-sm leading-relaxed tracking-wide">
                        "Amazing work! Very glad on how the product came out, he was able to take my ideas and bring them to
                        life. Highly recommend working with him."
                    </p>
                </div>
            </div>
        </section>
    );
}
