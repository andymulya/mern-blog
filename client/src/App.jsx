import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useDispatch } from "react-redux"
import Layout from './layouts/Layout'
import AuthForm from './pages/AuthForm.page'
import Write from './pages/Write.page'
import axios from 'axios'
import { useEffect } from 'react'
import { lookInSession } from './services/session'
import { handleAuthUser } from "./redux/slices/userSlice"
import Home from './pages/Home.page'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout /> }>
      <Route index element={ <Home /> } />
      <Route path="sign-in" element={<AuthForm />} />
      <Route path="sign-up" element={<AuthForm />} />
      <Route path="editor" element={<Write />} />
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
