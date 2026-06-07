export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell flex-center min-h-screen w-full" >
        {children}
    </div>
  );
}