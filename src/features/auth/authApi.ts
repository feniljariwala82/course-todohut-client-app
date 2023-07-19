import { api } from "features/apiSlice";
import { LoginFormBody } from "types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginFormBody) => ({
        url: "login",
        method: "post",
        body: data,
        prepareHeaders: (headers: any) => {
          headers.set("User-Agent", "TodoHutWebApp/1.0");
          return headers;
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
