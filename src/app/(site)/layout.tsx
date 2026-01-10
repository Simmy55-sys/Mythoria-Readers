import "../globals.css";
import ApplicationFooter from "@/components/footer";
import Navigation from "@/components/navigation";
import { AuthProvider } from "@/contexts/auth-context";
import BannerComponent from "@/components/banner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <BannerComponent />
      <Navigation />
      {children}
      <ApplicationFooter />
    </AuthProvider>
  );
}
