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
