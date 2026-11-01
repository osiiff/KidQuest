
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import MainNav from "./main-nav";
import UserButton from "@/components/shared/header/user-button";
import AdminSearch from "@/components/admin/search-form";


export default function AdminLayout({
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
                  <div>
                    <AdminSearch/>
                  </div>
                    <UserButton/>
                </div>
            </div>
            </div>
        <main className="wrapper min-h-96" >{children}</main>
    </div>
   
  );
}