'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      // if (!loading && !user) {
      //   router.push('/login'); // Wykonaj przekierowanie dopiero po pierwszym renderze
      // }
    }, [user, loading, router]);

    if (loading) {
      return <div className="h-screen flex justify-center items-center text-white text-xl">Ładowanie...</div>;
    }

    return (
        <div className="min-h-screen text-text-light flex flex-col items-center font-inter">
          <ToastContainer position="bottom-center" theme="dark" />
          <Header />
          
          {/* 🔥 Zwiększona maksymalna szerokość i lepsze paddingi */}
          <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full max-w-full sm:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] flex-grow">
            <section className="w-full flex flex-col items-start flex-grow">
              {children}
            </section>
          </main>

          <Footer />
        </div>
    );
}
