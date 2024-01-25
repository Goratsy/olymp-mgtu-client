import { Button } from "@mui/material";
import React from "react";

function ButtonContained(props) {


    return (
        <Button {...props} sx={{
            backgroundColor: '#6750A4',
            color: 'white',
            py: '10px',
            px: '24px',
            borderRadius: '100px',
            ':hover': {
                backgroundColor: '#8561c5',
            }
        }}>
            {props.children}
        </Button>
    );
}

export default ButtonContained;