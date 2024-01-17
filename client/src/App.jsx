import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthForm from './pages/AuthForm.page'
import Write from './pages/Write.page'
import axios from 'axios'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout /> }>
      <Route path="sign-in" element={<AuthForm />} />
      <Route path="sign-up" element={<AuthForm />} />
      <Route path="editor" element={<Write />} />
    </Route>
  )
)

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export default function App() {

  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}
