"use client"

import { SnackbarProvider } from 'notistack';
import React, { createContext, useEffect, useState } from 'react';
import { Loader } from '@/components/Loading';

export const context = createContext<React.Dispatch<
    React.SetStateAction<boolean>>>(() => {});

export default function Body({children}: Readonly<{children: React.ReactNode}>) {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loading? 
        document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    }, [loading]);

    return (
        <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{vertical:"top", horizontal:"center"}}>
            {loading && <Loader />}
            <context.Provider value={setLoading}>
                {children}
            </context.Provider>
        </SnackbarProvider>
    );
}