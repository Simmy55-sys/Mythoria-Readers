import "../globals.css";
import ApplicationFooter from "@/components/footer";
import Navigation from "@/components/navigation";
import { AuthProvider } from "@/contexts/auth-context";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Navigation />
      {children}
      <ApplicationFooter />
    </AuthProvider>
  );
}
