import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  
  const namespaces = ["common"]; 

  const messages: { [key: string]: string } = {};
  for (const ns of namespaces) {
    messages[ns] = (await import(`../public/locales/${locale}/${ns}.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
