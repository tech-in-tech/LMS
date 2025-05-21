import { Button } from "@/components/ui/button"
import Login from "./pages/Login"
import Navbar from "./components/ui/Navbar"
import HeroSection from "./pages/student/HeroSection"
import MainLayout from "./Layout/MainLayout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Courses from "./pages/student/Courses"
import MyLearning from "./pages/student/MyLearning"
import Profile from "./pages/student/Profile"
import Sidebar from "./pages/admin/Sidebar.jsx"
import  Dashboard  from "./pages/admin/Dashboard.jsx"
import CourseTable from "./pages/admin/course/CourseTable.jsx"
import { AddCourse } from "./pages/admin/course/AddCourse.jsx"
import EditCourse from "./pages/admin/course/EditCourse.jsx"
import CreateLecture from "./pages/admin/lacture/CreateLecture.jsx"
import EditLecture from "./pages/admin/lacture/EditLecture.jsx"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          <>
            <HeroSection />
            <Courses />
          </>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },
      // admin routes start here
      {
        path: "admin",
        element: <Sidebar />,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
        ]

      }
    ],

  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
