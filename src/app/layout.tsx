import "./../styles/globals.scss";
import classNames from "classnames";
import type { Metadata } from "next";
import { poppins } from "@/shared/fonts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RootProvider from "@/contexts/RootProvider";
import LayoutCommonComponents from "@/layouts/layoutCommonComponents/LayoutCommonComponents";

export const metadata: Metadata = {
  title: "Dentist Email List",
  description: "Top notch dentist list with email, phone number and address.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(poppins.variable)}>
        <RootProvider>
          <LayoutCommonComponents>
            {children}
          </LayoutCommonComponents>
        </RootProvider>
      </body>
    </html>
  );
}
