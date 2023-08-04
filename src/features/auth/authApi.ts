import { api } from "features/apiSlice";
import { LoginFormBody, SignupFormBody } from "types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginFormBody) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Task", id: "LIST" }],
    }),
    signup: builder.mutation({
      query: (data: SignupFormBody) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useSignupMutation,
} = authApi;
