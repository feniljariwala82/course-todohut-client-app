import { api } from "features/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "tasks",
        method: "GET",
      }),
    }),
    show: builder.query({
      query: (id?: string) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useIndexQuery, useShowQuery } = authApi;
