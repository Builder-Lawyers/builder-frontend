const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  if (contentType && contentType.includes("application/pdf")) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return `${baseUrl}${contextUrl}`;
};

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
  };
};

export const customInstance = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);
  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
    credentials: "include",
  };

  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data } as T;
};
