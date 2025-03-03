import './App.css'
import Header from './components/Header'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogView from './components/BlogView'
import AddBlog from './components/AddBlog'
import { useEffect, useState } from 'react'
import { fetchBlog } from './api/blogApi'

function App() {
  const [blogData, setBlogData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchBlog();
      console.log("Fetched Data:", response); // Debugging
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
    setFilterData((prevData) => [...prevData, newBlog]); // Update filtered data as well

  }

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<BlogList blogData={filterData} />} />
        <Route path="/blog/:blog_id" element={<BlogView />} />
        <Route path="/blog_add" element={<AddBlog addBlog={addBlog} />} />
      </Routes>
    </Router>
  );
}

export default App;
