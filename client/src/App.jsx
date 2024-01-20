import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useDispatch } from "react-redux"
import Layout from './layouts/Layout'
import AuthForm from './pages/AuthForm.page'
import Editor from './pages/Editor.page'
import axios from 'axios'
import { useEffect } from 'react'
import { lookInSession } from './services/session'
import { handleAuthUser } from "./redux/slices/userSlice"
import Dashboard from './pages/Dashboard.page'
import Profile from './pages/Profile.page'
import PrivatePage from './pages/PrivatePage.page'
import Settings from './pages/Settings.page'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout /> }>
      <Route index element={ <Dashboard /> } />
      <Route path="sign-in" element={<AuthForm />} />
      <Route path="sign-up" element={<AuthForm />} />
      <Route element={<PrivatePage />}>
        <Route path="profile/:user" element={<Profile />} />
        <Route path="editor" element={<Editor />} />
        <Route path="settings" element={<Settings />} />
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
      <RouterProvider router={ router } />
    </>
  )
}
