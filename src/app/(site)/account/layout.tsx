import AccountLayoutComponent from "@/components/pages/accounts/layout";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AccountLayoutComponent>{children}</AccountLayoutComponent>;
}
