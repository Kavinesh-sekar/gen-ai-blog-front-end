import React, { useEffect, useState } from 'react';
import {fetchBlog} from '../api/blogApi'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Fade, Grid, Grid2, Grow, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BlogList({blogData}) {

  const navigate =  useNavigate();

  console.log('blblbllb', );
  

  // const [blogData,setBlogData] = useState([])


  // useEffect(()=>{
  //   async function fetchData() {
      
  //     const response = await fetchBlog();

  //     setBlogData(response.data);




  //   }
  //   fetchData();
  // },[])

  // console.log('gg',blogData[3]?.image);
  // console.log('gg',blogData);

  const handleRead = (id)=>{
    navigate(`/blog/${id}`)
  }

  
  return (
   
    // <Paper elevation={2}>
    // <Fade in = {true} timeout={1000}>

    <Box >
      {/* <Container > */}


    <Typography variant='h5' mb={4} mt={4} sx={{textAlign:'center'}}>

      Latest Blog
    </Typography>
   
    <Grid2 container spacing={3} sx={{ justifyContent: "center" }}> 
    
      {blogData.map((blog,index)=>(

       <Grid2 xs={12} sm={6} md={4} lg={3} key={index}> 
               
    <Grow
    in={true}
    style={{ transformOrigin: '0 0 0' }}
    {...(true ? { timeout: 500+ index * 800 } : {})}
    >
    

    <Card sx={{ 
      
      maxWidth: 345,
      borderRadius:3,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(2.05)",
        boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.3)",
      },
      height: "100%",
      minHeight: "60px",
      
      
      }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={blog.image}
        sx={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" sx={{
          fontWeight: 600, 
          mb: 1,   
           display: "-webkit-box",
           WebkitLineClamp: 2, // Limits title to 2 lines
           WebkitBoxOrient: "vertical",
           overflow: "hidden",
           minHeight: "56px",  
          
          
          }} >
          { blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
        <Typography variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
        {blog.content}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent:'center' }}>
                      {blog.tags &&
                        blog.tags.map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: "",
                              color: "success",
                              "&:hover": { backgroundColor: "primary.main" },
                            }}
                          />
                        ))}
                    </Box>
      <CardActions sx={{justifyContent:'center', pb: 2,pt:2 }} >
        <Button variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: 2,
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      
                      }} onClick={() =>handleRead(blog.id)}>Read More</Button>
      </CardActions>
    </Card>

    </Grow>
    </Grid2>

))}


    </Grid2>


      {/* </Container> */}
    </Box>
          
    // </Fade>
    // </Paper>
  )
}

export default BlogList
