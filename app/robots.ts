import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/_next/", "/api/"],
            },
        ],
        sitemap: "https://vishnukantsahil.online/sitemap.xml",
        host: "https://vishnukantsahil.online",
    };
}
