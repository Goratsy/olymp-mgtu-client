import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";


function ButtonContained(props) {
    const theme = useTheme();
    const bgColorButton = theme.palette.violet.main;
    const bgColorHoverButton = theme.palette.violet.dark_light;
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColorButton,
        color: theme.palette.white.main,
        // py: '10px',
        // px: '24px',
        py: {md: '10px', xs: '7px'},
        px: {md: '24px', xs: '20px'},
        borderRadius: '100px',
        textTransform: 'none',
        ':hover': {
            backgroundColor: bgColorHoverButton,
        }
    }
    
    return (
        <Button {...props} sx={buttonStyle} >
            {props.children}
        </Button>
    );
}

export default ButtonContained;