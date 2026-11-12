
import Header from "@/components/shared/header";
import MainNav from "./main-nav";
import AdminSearch from "@/components/admin/search-form";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell" >
      <Header/>
      <div className="wrapper flex min-w-0 flex-wrap items-center justify-between gap-4 py-4">
        <MainNav className="min-w-0 flex-wrap gap-y-3"/>
        <div className="w-full min-w-0 sm:w-auto [&_input]:w-full sm:[&_input]:w-60">
          <AdminSearch/>
        </div>
      </div>
        <main className="wrapper min-h-96" >{children}</main>
    </div>
   
  );
}
