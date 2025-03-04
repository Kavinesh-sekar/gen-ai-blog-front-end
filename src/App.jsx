import './App.css'
import Header from './components/Header'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogView from './components/BlogView'
import AddBlog from './components/AddBlog'
import { useEffect, useState } from 'react'
import { fetchBlog } from './api/blogApi'
import EditBlog from './components/EditBlog'

function App() {
  const [blogData, setBlogData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchBlog();
      console.log("Fetched Data:", response); 

      if (response?.data) {
        setBlogData(response.data);
        setFilterData(response.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Search:", search);

    if (search.trim() === "") {
      setFilterData(blogData);
    } else {
      let filter = blogData.filter((blogs) => 
        blogs.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filter);
    }
  }, [search, blogData]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const addBlog = (newBlog)=>{
    setBlogData((prevData) => [...prevData, newBlog]);
    setFilterData((prevData) => [...prevData, newBlog]); 
  }

const DeleteBlog = (id)=>{
  setBlogData((prev)=>prev.filter((blog)=>blog.id !== id));
}
const updateBlog = (updatedBlog) => {
  setBlogData((prevData) =>
    prevData.map((blog) => {
      if (blog.id === updatedBlog.id) {
        console.log("Updating blog:", updatedBlog); // ✅ Debugging log
      }
      return blog.id === updatedBlog.id ? updatedBlog : blog;
    })
  );

  setFilterData((prevData) =>
    prevData.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
  );
};



  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<BlogList  key={filterData.length} blogData={filterData} />} />
        <Route path="/blog/:blog_id" element={<BlogView  onDelete = {DeleteBlog}/>} />
        <Route path="/blog_add" element={<AddBlog addBlog={addBlog} />} />
        <Route path="/edit/:blog_id" element={<EditBlog updateBlog={updateBlog} />} />
      </Routes>
    </Router>
  );
}

export default App;
