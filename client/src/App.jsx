import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthForm from './pages/AuthForm.page'
import Write from './pages/Write.page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout /> }>
      <Route path="sign-in" element={<AuthForm />} />
      <Route path="sign-out" element={<AuthForm />} />
      <Route path="editor" element={<Write />} />
    </Route>
  )
)

export default function App() {

  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}
