import Footer from "@/components/footer";
import Header from "@/components/shared/header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell" >
        <Header/>
        <main className="wrapper" >{children}</main>
        <Footer/>
    </div>
  );
}