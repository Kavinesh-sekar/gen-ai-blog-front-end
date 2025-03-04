import { Avatar, Box, Container, Typography,IconButton, Chip, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBlogId ,deleteBlogId} from '../api/blogApi';

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShareIcon from "@mui/icons-material/Share"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function BlogView({onDelete}) {

    let navigate =  useNavigate();

    const {blog_id} = useParams();

    const [blogDetails,setBlogDetails] = useState()

    console.log('fffff',blog_id);
    

    console.log('iddd',blog_id);

    useEffect(()=>{
      window.scrollTo(0, 0);
         async function fetchData() {
              
              const response = await fetchBlogId(blog_id);

              console.log('rrrrrrrrr',response);
              
        
              setBlogDetails(response.data);
        
        
        
        
            }
            fetchData();

    },[blog_id])

    console.log('ssspp',blogDetails);
    
    const handleGoBack = ()=>{
        navigate('/')
    }
    const handleDelete = async(id)=>{
      console.log('idd delelete',id);
      

      let data = await deleteBlogId(id) ;

      onDelete(id);

      navigate('/');

    }

  return (
  <Box>

    <Container maxWidth="md" sx={{ py: 8 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={handleGoBack}
            sx={{
              mr: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateX(-3px)",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="text.secondary">
            Back to blogs
          </Typography>
        </Box>

    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          {blogDetails?.title}
        </Typography>

    <Box sx={{display:'flex', flexDirection:'row',gap:2, mb:4}}>
    <Avatar />
    <Box sx={{display:'flex',flexDirection:'column' }}>
        <Typography variant='h5'>AI Writer</Typography>
        <Box  sx={{display:'flex',flexDirection:'row',gap:1.5}}>
        <Typography variant="body2" color="text.secondary">
                {new Date(blogDetails?.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
        <Typography variant='body2' color='text.secondary'>3 min read</Typography>
        </Box>


    </Box>
    

    <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <ShareIcon />
            </IconButton>

            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <DeleteIcon  onClick={()=>handleDelete(blogDetails?.id)}/>
            </IconButton>

            <IconButton size="small" sx={{ color: "text.secondary" }} onClick={() => navigate(`/edit/${blogDetails?.id}`)}>
  <EditIcon />
</IconButton>
          </Box>
        </Box>

 
    <Box 
    component='img'
    src={blogDetails?.image}
    alt={blogDetails?.title}
    sx={{
        width: "100%",
        // maxWidth:"100%",

        height: "500px",
        // mx:"auto",
        borderRadius: 2,
        mb: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        // objectFit: "contain",
    }}
    />

<Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
          {blogDetails?.tags &&
            blogDetails?.tags?.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: "primary.light",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
              />
            ))}
        </Box>

        <Divider sx={{mb:4}} />

        <Typography variant="body2" component="div" sx={{
            lineHeight:2,
            hiteSpace: "pre-line"
        }}>

{blogDetails?.content?.split("\n\n").map((paragraph, idx) => (
            <Typography key={idx} component="p" paragraph>
              {paragraph}
            </Typography>
          ))}
        </Typography>

        <Divider sx={{mb:4}} />

    
    </Container>
  </Box>
  )
}

export default BlogView
