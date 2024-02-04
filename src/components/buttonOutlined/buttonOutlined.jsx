import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";


function ButtonOutlined(props) {
    const theme = useTheme();
    const bgColorButton = theme.palette.violet.main;
    const bgColorHoverButton = theme.palette.violet.light;

    const buttonStyle = {
        borderColor: bgColorButton,
        color: bgColorButton,
        py: '10px',
        px: '24px',
        borderRadius: '100px',
        textTransform: 'none',
        ':hover': {
            borderColor: bgColorHoverButton,
            color: bgColorHoverButton,
        }
    }
    return (
        <Button variant="outlined" {...props} sx={buttonStyle}>
            {props.children}
        </Button>
    );
}

export default ButtonOutlined;