
import Header from "@/components/shared/header";
import MainNav from "./main-nav";


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell" >
      <Header/>
      <div className="wrapper py-4">
        <MainNav className="min-w-0 flex-wrap gap-y-3"/>
      </div>
        <main className="wrapper min-h-96" >{children}</main>
    </div>
   
  );
}
