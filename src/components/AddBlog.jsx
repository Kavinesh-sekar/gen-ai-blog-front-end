import { Alert, Box, Button, Chip, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import { Postdata } from '../assets/PostData';
import { CreateBlog } from '../api/blogApi';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
    const [topic, setTopic] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");
    const [load, setLoad] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); 

    const contentRef = useRef(null);
    const navigate = useNavigate();

    // Handle tag input
    const handleTagChange = (e) => {
        setCurrentTag(e.target.value);
    };

    const handleAddTag = (e) => {
        if (e.key === "Enter" && currentTag.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
                setCurrentTag("");
            }
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // Save Blog
    const saveblog = async () => {
        let newBlog = {
            id: 12,
            title: topic,
            tags: tags,
            data: "2025-02-23",
            content: Postdata,
            image: "https://www.optimalvirtualemployee.com/wp-content/uploads/2022/12/Web-Developer-skill.jpg"
        };

        const data = await CreateBlog(newBlog);
        console.log('postedBlog', data);

        setAlertMessage("Blog saved successfully!"); 

        // Redirect after 2 seconds
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    // Generate Blog
    const generateBlog = async () => {
        setShowContent(true);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            setContentVisible(true);

     
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 3000);
    };

    return (
        <Box>
            <Container maxWidth='md' sx={{ py: 4 }}>
                <Paper elevation={3}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ pt: 4, mb: 4 }}>
                            AI Blog Generator
                        </Typography>
                        <Typography variant='h5' sx={{ maxWidth: '600px', mx: "auto" }}>
                            Enter a topic and let our AI create an engaging blog post for you in seconds
                        </Typography>
                    </Box>

                    <Box component='form' sx={{ p: 4 }}>
                        <TextField
                            label="Blog topic"
                            required
                            autoFocus
                            fullWidth
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="E.g., The Future of Artificial Intelligence"
                        />

                        <TextField
                            label="Add Tags (Press Enter to add)"
                            required
                            fullWidth
                            value={currentTag}
                            onChange={handleTagChange}
                            placeholder="E.g., Technology, AI, Future"
                            sx={{ mt: 3 }}
                            onKeyDown={handleAddTag}
                        />

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => handleDeleteTag(tag)}
                                    color="primary"
                                    variant="outlined"
                                    deleteIcon={<CloseIcon />}
                                />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button onClick={generateBlog} variant="contained" disabled={load}>Generate</Button>
                        </Box>

                    
                        {alertMessage && (
                            <Alert variant="filled" severity="success" sx={{ mt: 2 }}>
                                {alertMessage}
                            </Alert>
                        )}
                    </Box>
                </Paper>
            </Container>

            {/* 🔥 Scrolls to this container when generated */}
            {showContent && (
                <Container maxWidth='lg' ref={contentRef}>
                    <Paper elevation={3}>
                        <Box sx={{ mt: 4, p: 4 }}>
                            {load ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: 20, animation: 'blinking 1s infinite' }}>
                                        Generating...
                                    </Typography>
                                </Box>
                            ) : (
                                contentVisible &&
                                Postdata?.split("\n\n").map((paragraph, idx) => (
                                    <Typography key={idx} component="p" paragraph>
                                        {paragraph}
                                    </Typography>
                                ))
                            )}
                        </Box>

                        {contentVisible && (
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pb: 2 }}>
                                <Button variant='contained' color='primary' onClick={saveblog}>Save</Button>
                            </Box>
                        )}
                    </Paper>
                </Container>
            )}
        </Box>
    );
}

export default AddBlog;
