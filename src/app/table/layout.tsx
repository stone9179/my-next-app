import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "table-接口",
  description: "route interception",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
