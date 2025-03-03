import { AppBar, Box, Toolbar, Typography, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white', // Changed to white
  '&:hover': {
    backgroundColor: 'white',
  },
  marginLeft: theme.spacing(1),
  width: '300px', // Increased width
  border: `1px solid ${alpha(theme.palette.common.black, 0.2)}`, // Added border for visibility
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[700], // Darker color for better contrast
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black', // Changed text color to black
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 4), // Adjusted padding
  },
}));

function Header({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/')}
          >
            AI Blog Generator
          </Typography>
          <Search >
          
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleChange}
              inputRef={inputRef}
            />
         
          </Search>
          <Button color="secondary" variant="contained" onClick={() => navigate('/blog_add')}>
            Add Blog
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
