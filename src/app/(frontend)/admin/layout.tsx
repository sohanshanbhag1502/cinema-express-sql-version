import { AdminNavBar } from "@/components/NavBar";
import { FootBar } from "@/components/FootBar";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="w-full flex flex-col">
            <AdminNavBar />
            {children}
            <FootBar />
        </div>
    );
}
