import { AppBar, Box, Toolbar, Typography ,InputBase, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { styled ,alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Header() {

  const navigate = useNavigate();


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

      
      
  return (
    <Box sx={{ flexGrow: 1,  }}>
    <AppBar position="static">
      <Toolbar sx={{display:'flex'  , justifyContent:"space-between"}}>
       
        <Typography
          variant="h6"
          noWrap
        
          component="div"
          sx={{  display: { xs: 'none', 
            cursor:'pointer',
            sm: 'block' }
          
          }}
          onClick={()=>navigate('/')}
        >
         AI Blog Generator
        </Typography>
        <Search >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button color='secondary' variant='contained' onClick={()=>navigate('/blog_add')} >Add Blog</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header
