import json from "./_page.json";
type MockResponse = {
  status: number;
  body: any;
};

const mockRoutes: Record<string, MockResponse> = {
  "/api/pages": {
    status: 200,
    body: json,
  },
};

export const mockFetch = async (url: string): Promise<Response> => {
  console.log("🚨 mockFetch called with:", url);

  if (mockRoutes[url]) {
    const mock = mockRoutes[url];

    return new Response(JSON.stringify(mock.body), {
      status: mock.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return Promise.reject(new Error(`❌ No mock response for ${url}`));
};
