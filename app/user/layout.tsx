
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import { APP_NAME } from "@/lib/constants";


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell" >
      <div className="header">
        <div className="flex items-center px-4">
                <Link href='/' className="w-22">
                <Image src='/logo.png' height={48} width={48} alt={APP_NAME} className="logo-icon"></Image>
                </Link>
                <MainNav className="mx-6"/>
                <div className="ml-auto items-center flex space-x-4">
                    <Menu/>
                </div>
            </div>
            </div>
        <main className="wrapper" >{children}</main>
    </div>
   
  );
}