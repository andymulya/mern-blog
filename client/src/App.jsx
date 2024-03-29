import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { Toaster } from 'react-hot-toast'
import { Layout } from './layouts/Layout'
import AuthForm from './pages/AuthForm.page'
import Editor from './pages/Editor.page'
import { lookInSession } from './services/session'
import { handleAuthUser } from "./redux/slices/userSlice"
import Home from './pages/Home.page'
import Profile from './pages/Profile.page'
import PrivatePage from './pages/PrivatePage.page'
import Settings from './pages/Settings.page'
import SearchPage from './pages/SearchPage.page'
import PageNotFound from './pages/PageNotFound.page'
import BlogPage from './pages/BlogPage.page'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="sign-in" element={<AuthForm />} />
        <Route path="sign-up" element={<AuthForm />} />
        <Route path="search/:query" element={<SearchPage />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="blog/:slug" element={<BlogPage />} />
        <Route element={<PrivatePage />}>
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path='*' element={<PageNotFound />}/>
      </Route>
      <Route element={<PrivatePage />}>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:slug" element={<Editor />} />
      </Route>
    </Route>
  )
)

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userInSession = lookInSession("data")
    if(userInSession) dispatch(handleAuthUser(JSON.parse(userInSession)))
  }, [dispatch])


  return (
    <>
      {/* Config notify */}
      <Toaster toastOptions={{
          success: {
              className: "bg-green-100 border border-green-500 font-bold",
              position: "bottom-right"
          },
          error: {
              className: "bg-red-100 border border-red-500 font-bold",
              position: "bottom-right"
          }
      }} />
      <RouterProvider router={ router } />
    </>
  )
}
