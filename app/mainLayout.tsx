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
  }: Readonly<{
    children: React.ReactNode;
  }>){

    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      // if (!loading && !user) {
      //   router.push('/login'); // Wykonaj przekierowanie dopiero po pierwszym renderze
      // }
    }, [user, loading, router]);

    if (loading) {
      return <div className="h-screen flex justify-center items-center">Ładowanie...</div>;
    }

    return (
        <div className="min-h-screen text-text-light flex flex-col items-center font-inter">
          <ToastContainer position="bottom-center" theme="dark" />
          <Header/>
          <main className="p-10 flex flex-col items-center gap-8 w-full max-w-6xl flex-grow">
            <section className="w-full flex flex-col items-center flex-grow">
              <div className="flex items-start w-full">
                {children}
              </div>
            </section>
          </main>
          <Footer />
        </div>
    );
}
