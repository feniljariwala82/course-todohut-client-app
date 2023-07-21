import { api } from "features/apiSlice";
import { StoreTaskType, UpdateTaskType } from "types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // index
    index: builder.query({
      query: () => ({
        url: "tasks",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // store
    store: builder.mutation({
      query: (task: StoreTaskType) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    // show
    show: builder.query({
      query: (id?: string) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    // update
    update: builder.mutation({
      query: (task: UpdateTaskType) => ({
        url: `tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: (result, error, updatedTask) => [
        { type: "Task", id: updatedTask.id },
        { type: "Task", id: "LIST" }, // Invalidate the book list
      ],
    }),

    // destroy
    destroy: builder.mutation({
      query: (id: number) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" }, // Invalidate the book list
      ],
    }),
  }),
});

export const {
  useIndexQuery,
  useShowQuery,
  useStoreMutation,
  useUpdateMutation,
  useDestroyMutation,
} = authApi;
