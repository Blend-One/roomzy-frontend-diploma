export default function injectToken(headers: Headers): Headers {
  const token = localStorage.getItem("refreshToken");
  if (!token) return headers;
  headers.set("Authorization", `Bearer ${token}`);
  return headers;
}
