import './App.css'
import { Button } from '@mui/material'
import Header from './components/Header'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogView from './components/BlogView'
import AddBlog from './components/AddBlog'



function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
<Router>
  <Header />
  <Routes>
    <Route path = '/' element={<BlogList />} />
    <Route path = '/blog/:blog_id' element={<BlogView />} />
    <Route path = '/blog_add' element={<AddBlog />} />


  </Routes>
</Router>
  </>
  )
}

export default App
