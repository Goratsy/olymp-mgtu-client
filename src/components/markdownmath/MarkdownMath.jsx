import React from "react";
import Tex2SVG from "react-hook-mathjax";
import {Box, Typography} from "@mui/material";
import { useTheme } from "@emotion/react";

function MarkdownMath(props) {
    const theme = useTheme();

    const markdown = props.children;
    const descriptionStyle = {
        ...theme.typography.body.main,
        color: theme.palette.grey.dark,
    }
    return (
        <Box>
            {markdown.split('$$').map((elArr, index) => {
                if (elArr[0] === '$') {
                    return (
                        <Tex2SVG display="inline" latex={elArr.slice(1)} key={index}/>
                    )
                } else {
                    return(
                        <Typography component={'span'} key={index} sx={descriptionStyle}>{elArr}</Typography>
                    )
                }

            })}

        </Box>
    );
}

export default MarkdownMath;