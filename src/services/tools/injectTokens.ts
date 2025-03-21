import i18n from "../../i18n";

export function injectAccessToken(headers: Headers): Headers {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  return headers;
}

export function injectRefreshToken(headers: Headers): Headers {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) headers.set("Refresh-Token", `Bearer ${refreshToken}`);
  return headers;
}

export function injectLanguage(headers: Headers): Headers {
  const lang = i18n.language;
  if (lang) headers.set("Accept-Language", lang);
  return headers;
}
