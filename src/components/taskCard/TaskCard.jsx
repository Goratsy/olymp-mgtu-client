import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';
import { useInfoSolutionContext } from "../../App";
import MarkdownMath from "../markdownmath/MarkdownMath";

function TaskCard({task, index, current, onClickTask}) {
    const theme = useTheme();
    let {setIsOpenDialog} = useInfoSolutionContext();


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
    };

    if (localStorage.getItem(`${task._id}Stage`) !== null) {
        task.executionStage = localStorage.getItem(`${task._id}Stage`)
    }

    return(
        <Box onClick={() => {
            onClickTask();
            setIsOpenDialog(true);
        }}>
            <Box sx={cardStyle} >
                <Box sx={{width: '5%', ml: '10px'}}>
                    {task.executionStage === '' ? <RemoveIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.grey.main}}></RemoveIcon> : ''}
                    {task.executionStage === 'done' ? <CheckIcon sx={{fontSize: '24px', display: 'block', color: theme.palette.violet.main}}></CheckIcon> : ''}
                </Box>
                <Box sx={{width: '90%', overflow: 'hidden'}}>
                    <Typography  sx={labelMainStyle}>{task.difficult} • {task.year}</Typography>
                    {/* <Typography sx={bodyLargeStyle}>Задача {task._id.slice(0, 4) + task._id.slice((task._id.length)-5, (task._id.length))}</Typography> */}
                    <Typography sx={bodyLargeStyle}>Задача {task.idTask}</Typography>
                    <MarkdownMath sx={descriptionStyle}>{task.description.split(' ').slice(0, 15).join(' ')+'...'}</MarkdownMath> 
                </Box>
                <Box sx={{width: '5%'}}>
                    <ArrowRightIcon sx={{fontSize: '24px'}}></ArrowRightIcon>
                </Box>
            </Box>
        </Box>
    );
}

export default TaskCard;