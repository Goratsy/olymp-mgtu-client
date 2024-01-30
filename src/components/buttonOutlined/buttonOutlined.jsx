import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";


function ButtonOutlined(props) {
    const theme = useTheme();
    const bgColorButton = theme.palette.primary.violet_main;
    const bgColorHoverButton = theme.palette.primary.violet_light;

    return (
        <Button variant="outlined" {...props} sx={{
            borderColor: bgColorButton,
            color: bgColorButton,
            py: '10px',
            px: '24px',
            borderRadius: '100px',
            textTransform: 'capitalize',
            ':hover': {
                borderColor: bgColorHoverButton,
                color: bgColorHoverButton,
            }
        }}>
            {props.children}
        </Button>
    );
}

export default ButtonOutlined;