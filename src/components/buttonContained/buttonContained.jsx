import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";


function ButtonContained(props) {
    const theme = useTheme();
    const bgColorButton = theme.palette.primary.violet_main;
    const bgColorHoverButton = theme.palette.primary.violet_light;

    return (
        <Button {...props} sx={{
            backgroundColor: bgColorButton,
            color: 'white',
            py: '10px',
            px: '24px',
            borderRadius: '100px',
            textTransform: 'capitalize',
            ':hover': {
                backgroundColor: bgColorHoverButton,
            }
        }}>
            {props.children}
        </Button>
    );
}

export default ButtonContained;