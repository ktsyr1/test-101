// "use client"
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/component/theme/nav"
import localFont from 'next/font/local'
import Footer from "@/component/theme/footer";
import FAQ from "@/component/theme/FAQ";
import Landing from "@/component/loading";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloWrapper } from "./ApolloWrapper";
import Head from "next/head";

const inter =// localFont({ src: './fonts/ArbFONTS-LamaSans-BoldCondensed.ttf', display: 'swap' }) 
    localFont({
        src: [
            { path: './fonts/ArbFONTS-LamaSans-Black.ttf', weight: '900', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-Bold.ttf', weight: '700', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-ExtraBold.ttf', weight: '800', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-ExtraLight.ttf', weight: '200', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-Light.ttf', weight: '300', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-Medium.ttf', weight: '500', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-Regular.ttf', weight: '400', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-SemiBold.ttf', weight: '600', style: 'normal', },
            { path: './fonts/ArbFONTS-LamaSans-Thin.ttf', weight: '100', style: 'normal', },
        ],
    })
export const metadata: Metadata = {
    title: "inspectex",
    description: "Generated inspectex",
};
type Children = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Children) {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: process.env.NEXT_PUBLIC_GraphQL,
    });

    return (
        <html lang="ar">
            <body className={inter.className} >
                <Landing />
                <Nav />
                <main className={"max-[697px]:mt-[128px] mt-[78px]  *:text-slate-900 "} >
                    <ApolloWrapper>{children}</ApolloWrapper>

                    {/* {children} */}
                </main>
                <FAQ />
                <Footer />
            </body>
        </html>
    );
}
