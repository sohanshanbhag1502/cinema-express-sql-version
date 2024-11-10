import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "@/app/globals.css";
import Body from "@/components/Body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons:"/logo.png",
    title: "Cinema Express",
    description: "Your Ticket to Seamless Cinema Experiences - Manage, Book, Enjoy!",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Body>
                    {children}
                </Body>
            </body>
            <GoogleAnalytics gaId={process.env.GAID!} />
        </html>
    );
}
