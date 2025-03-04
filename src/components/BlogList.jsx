import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grow, Grid2, Skeleton, Typography } from '@mui/material';

function BlogList({ blogData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRead = (id) => {
    navigate(`/blog/${id}`);
  };

  // const renderSkeleton = () => {
  //   return Array.from({ length: 9 }).map((_, index) => (
  //     <Grid2 xs={12} sm={6} md={4} lg={3} key={index}>
  //       <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
  //         <Skeleton variant="rectangular" height={200} animation="wave" />
  //         <CardContent>
  //           <Skeleton variant="text" height={30} width="80%" animation="wave" />
  //           <Skeleton variant="text" height={20} width="40%" animation="wave" />
  //           <Box sx={{ mt: 2 }}>
  //             <Skeleton variant="text" height={80} animation="wave" />
  //           </Box>
  //           <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
  //             <Skeleton variant="rectangular" height={32} width={80} animation="wave" />
  //             <Skeleton variant="rectangular" height={32} width={80} animation="wave" />
  //           </Box>
  //         </CardContent>
  //       </Card>
  //     </Grid2>
  //   ));
  // };


  const renderSkeleton = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <Grid2 xs={12} sm={6} md={4} lg={3} key={index}> {/* Corrected Grid2 config */}
        <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <CardContent>
            <Skeleton variant="text" height={30} width="80%" animation="wave" />
            <Skeleton variant="text" height={20} width="40%" animation="wave" />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" height={80} animation="wave" />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Skeleton variant="rectangular" height={32} width={80} animation="wave" />
              <Skeleton variant="rectangular" height={32} width={80} animation="wave" />
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    ));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Latest Blogs
        </Typography>
        <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
          {renderSkeleton()}
        </Grid2>
      </Container>
    );
  }

  return (
    <Box>
      <Typography variant="h5" mb={4} mt={4} sx={{ textAlign: 'center' }}>
        Latest Blog
      </Typography>
      <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
        {blogData.map((blog, index) => (
          <Grid2 xs={12} sm={6} md={4} lg={3} key={index}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 500 + index * 600 } : {})}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)', //Corrected scaling
                    boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.3)',
                  },
                  height: '100%',
                  minHeight: '60px',
                }}
              >
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
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '56px',
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {blog.content}
                  </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {blog.tags &&
                    blog.tags.map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: '',
                          color: 'success',
                          '&:hover': { backgroundColor: 'primary.main' },
                        }}
                      />
                    ))}
                </Box>
                <CardActions sx={{ justifyContent: 'center', pb: 2, pt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                    onClick={() => handleRead(blog.id)}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grow>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default BlogList;
