import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

import RouteGuardProvider from "@/providers/RouteGuardProvider";
import Header from "@/components/Header";
import theme from "../theme";
import "./global.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { CssBaseline } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Roomzy",
  description: "Find your next room",
  icons: "favicon.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ReduxProvider>
        <RouteGuardProvider>
          <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Header />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
        </RouteGuardProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
