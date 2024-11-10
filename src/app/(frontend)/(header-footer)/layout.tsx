import { NavBar } from "@/components/NavBar";
import { FootBar } from "@/components/FootBar";
import { Suspense } from "react";
import { Loader } from "@/components/Loading";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="w-full flex flex-col">
            <NavBar />
            <Suspense fallback={<Loader />}>
                {children}
            </Suspense>
            <FootBar />
        </div>
    );
}
