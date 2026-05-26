/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  tag?: string;
  isFormData?: boolean;
  headers?: Record<string, string>;
}

export interface ResponsePayload<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
}

const isServer = typeof window === "undefined";
const baseUrl = (() => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    // Strip trailing slash to prevent double-slash URLs (e.g. //api/blog)
    const apiRoot = process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
    return `${apiRoot}/api`;
  }

  if (isServer) {
    return `http://localhost:${process.env.PORT ?? "3000"}/api`;
  }

  return "/api";
})();

export async function fetchWithTag<T>(
  url: string,
  {
    method = "GET",
    data,
    tag,
    isFormData = false,
    headers = {},
  }: FetchOptions = {}
): Promise<ResponsePayload<T>> {
  const fetchOptions: RequestInit & { next?: { tags?: string[] } } = {
    method,
    next: tag ? { tags: [tag] } : undefined,
    credentials: "include",
    headers: isFormData
      ? headers
      : {
          "Content-Type": "application/json",
          ...headers,
        },
  };

  if (method !== "GET" && data) {
    fetchOptions.body = isFormData ? data : JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${url}`, fetchOptions);

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message =
      json?.message ||
      json?.error ||
      `Failed request (${method}): ${res.status} ${res.statusText}`;
    console.error(`Fetch error at ${url}:`, message);
    throw new Error(message);
  }

  if (
    json &&
    typeof json === "object" &&
    "success" in json &&
    "message" in json
  ) {
    return json as ResponsePayload<T>;
  }

  return {
    statusCode: res.status,
    success: true,
    message: "Request completed successfully.",
    data: (json as T) ?? null,
  };
}
