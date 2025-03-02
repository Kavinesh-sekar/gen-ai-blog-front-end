import React from "react";
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette:{
        primary:{
            main: '#3353ff'
        },
        secondary:{
            main:'#f50057',
        },
        background: {
            default: "#f5f5f7",
            paper: "#ffffff",
          },

    }
})


export default theme;