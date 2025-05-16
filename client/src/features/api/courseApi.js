import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ['Refetch_Creator_Course'],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include"
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category }
      }),
      invalidatesTags: ["Refetch_Creator_Course"]

    }),

    getCreaterCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",

      }),
      providesTags: ["Refetch_Creator_Course"]
    }),

    editCourse: builder.mutation({
      query: ({formData,courseId}) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData
      })
    })
  })
});

export const { useCreateCourseMutation, useGetCreaterCourseQuery,useEditCourseMutation } = courseApi;