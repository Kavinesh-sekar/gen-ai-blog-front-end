import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogId,updateBlogId } from "../api/blogApi";

function EditBlog({ updateBlog }) {


    // console.log("updateBlog function in EditBlog:", updateBlog);

  let { blog_id } = useParams();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });

  useEffect(() => {
    async function fetchBlogData() {
      const response = await fetchBlogId(blog_id);
      if (response) {
        setFormData({
          title: response.data.title,
          content: response.data.content,
          image: response.data.image,
          tags: response.data.tags.join(", "),
        });
      }
    }
    fetchBlogData();
  }, [blog_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), 
    };

    const response = await updateBlogId(blog_id, updatedData);
    console.log('resss edit',response);
    
    if (response) {
        console.log("Calling updateBlog in App.js");
        updateBlog({ id: blog_id, ...updatedData }); // <- This should call updateBlog in App.js
        navigate(`/blog/${blog_id}`);
      }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 4 }}>
        Edit Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={20}
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tags (comma separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Update Blog
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditBlog;
