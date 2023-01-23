export type ApiConfig = Record<"url", string>;

const apiConfig: ApiConfig = {
  url: process.env.NEXT_PUBLIC_API_URL as string,
};

export default apiConfig;
