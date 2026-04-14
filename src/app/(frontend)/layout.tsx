import FrontendShell from "@/layouts/frontend/FrontendLayout";

export default function FrontendLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <FrontendShell>{children}</FrontendShell>;
}
