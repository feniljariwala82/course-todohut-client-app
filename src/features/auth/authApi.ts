import { api } from "features/apiSlice";
import { LoginFormBody } from "types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginFormBody) => ({
        url: "login",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
