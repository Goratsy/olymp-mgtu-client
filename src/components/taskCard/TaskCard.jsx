import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';

function TaskCard({task, index}) {
    const theme = useTheme();

    let cardStyle = {
        backgroundColor: theme.palette.violet.light,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        gap: '16px',
        p: '16px',
    };
    const labelMainStyle = {
        ...theme.typography.label.main,
        color: theme.palette.grey.dark,
    };
    const bodyLargeStyle = {
        ...theme.typography.body.large,
        color: theme.palette.black.dark,
    };
    const descriptionStyle = {
        ...theme.typography.body.main,
        color: theme.palette.grey.dark,
        overflow: 'hidden', 
        textOverflow: 'ellipsis'
    };

    return(
    <Box sx={cardStyle}>
            <Box>
                <CheckIcon sx={{fontSize: '24px', display: 'block'}}></CheckIcon>
                {/* <CheckIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.violet.main}}></CheckIcon>
                <RemoveIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.grey.main}}></RemoveIcon> */}
            </Box>
            <Box>
                <Typography  sx={labelMainStyle}>{task.difficult} • {task.yearTask}</Typography>

                <Typography sx={bodyLargeStyle}>Задача {index}</Typography>
                <Typography sx={descriptionStyle}>{task.description.slice(0, 130)+'...'}</Typography>    
            </Box>
            <Box>
                <ArrowRightIcon sx={{fontSize: '24px'}}></ArrowRightIcon>
            </Box>
        </Box>
    );
}

export default TaskCard;