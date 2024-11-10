export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center 
        items-center text-white authpages">
            <img className="w-[13%] mb-3" src="/logo.png" />
            <div className="bg-black px-10 py-5 rounded-3xl md:w-1/2
            form-container text-white text-center flex 
            flex-col items-center content-center backdrop-blur-md 
            bg-opacity-45">
                {children}
            </div>
        </div>
    );
}
