import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "路由拦截",
  description: "route interception",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      {modal}
      {children}
    </AntdRegistry>
  );
}
