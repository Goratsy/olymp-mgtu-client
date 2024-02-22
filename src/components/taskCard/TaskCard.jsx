import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';

function TaskCard({task, index, current, onClickTask}) {
    const theme = useTheme();

    let cardStyle = {
        backgroundColor: (current ? theme.palette.violet.light_dark : theme.palette.violet.light),
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

    if (localStorage.getItem(`${task._id}Stage`) !== null) {
        task.executionStage = localStorage.getItem(`${task._id}Stage`)
    }

    return(
        <Box sx={cardStyle} onClick={onClickTask}>
            <Box>
                {task.executionStage === '' ? <RemoveIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.grey.main}}></RemoveIcon> : ''}
                {task.executionStage === 'done' ? <CheckIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.violet.main}}></CheckIcon> : ''}
            </Box>
            <Box>
                <Typography  sx={labelMainStyle}>{task.difficult} • {task.year}</Typography>
                <Typography sx={bodyLargeStyle}>Задача {task._id.slice(0, 5)}</Typography>
                <Typography sx={descriptionStyle}>{task.description.slice(0, 130)+'...'}</Typography>    
            </Box>
            <Box>
                <ArrowRightIcon sx={{fontSize: '24px'}}></ArrowRightIcon>
            </Box>
        </Box>
    );
}

export default TaskCard;