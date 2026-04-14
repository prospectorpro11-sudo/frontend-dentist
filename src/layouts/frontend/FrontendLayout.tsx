import PublicFooterMenu from "@/menus/publicFooterMenu/PublicFooterMenu";
import PublicHeaderMenu from "@/menus/publicHeaderMenu/PublicHeaderMenu";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeaderMenu />
      <main>{children}</main>
      <PublicFooterMenu />
    </>
  );
}