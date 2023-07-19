import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3333/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
