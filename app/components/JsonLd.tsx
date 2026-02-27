export default function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vishnu",
        url: "https://www.justaditya.com",
        jobTitle: "Founder & Systems Builder",
        description:
            "Founder building scalable businesses in lead generation, automation, and AI systems. Operator, product builder, and systems architect.",
        knowsAbout: [
            "Lead Generation",
            "Cold Email Infrastructure",
            "SaaS Products",
            "Growth Consulting",
            "Automation Systems",
            "Product Development",
            "AI Systems",
            "Process Architecture",
        ],
        sameAs: [
            "https://linkedin.com/in/vishnu",
            "https://x.com/vishnu",
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Vishnu — Founder & Systems Builder",
        url: "https://www.justaditya.com",
        description:
            "Personal portfolio of Vishnu — founder, operator, and product builder creating scalable businesses in lead generation, automation, and AI.",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
