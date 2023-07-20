import { api } from "features/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "tasks",
        method: "GET",
      }),
    }),
  }),
});

export const { useIndexQuery } = authApi;
