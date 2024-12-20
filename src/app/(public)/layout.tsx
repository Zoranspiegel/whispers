export default function publicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
