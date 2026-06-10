export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center min-h-screen w-full bg-[radial-gradient(circle_at_78%_35%,rgba(139,124,246,0.22),transparent_34%),radial-gradient(circle_at_88%_80%,rgba(255,142,209,0.14),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(85,214,202,0.12),transparent_30%),linear-gradient(110deg,#ffffff_0%,#f8fbff_48%,#f4efff_100%)]" >
        {children}
    </div>
  );
}