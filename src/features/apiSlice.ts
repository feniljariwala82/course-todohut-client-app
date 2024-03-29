import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:3333/api/",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    headers.set("App-User-Agent", "TodoHutWebApp/1.0");
    return headers;
  },
  credentials: "include", // This allows server to set cookies
});

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery,
  /**
   * api level definition of tag types
   */
  tagTypes: ["User", "Task"],
  endpoints: (builder) => ({}),
});
