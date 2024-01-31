import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function TaskCard({task, index}) {
    const theme = useTheme();
    const bgCard = theme.palette.primary.violet_bgCard;

    return(
    <Box sx={{
            backgroundColor: bgCard,
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'stretch',
            gap: '16px',
            py: '12px',
            pl: '16px',
            pr: '24px'
        }}>
            <Box>
                <CheckIcon sx={{fontSize: '24px'}}></CheckIcon>
            </Box>
            <Box>
                {/* использовать Grid */}
                <Typography  sx={{
                    fontSize: '12px', color: '#49454F', fontWeight: '500'
                }}>{task.difficult} • {task.yearTask}</Typography>

                <Typography sx={{color: 'black', fontSize: 'large'}}>Задача {index}</Typography>
                <Box sx={{color: '#49454F'}}>

                    <Typography  sx={{overflow: 'hidden', whiteSpace:'', textOverflow: 'ellipsis'}}>{task.description.slice(0, 130)+'...'}</Typography>    
                </Box>
            </Box>
            <Box>
                <ArrowRightIcon sx={{fontSize: '24px'}}></ArrowRightIcon>
            </Box>
        </Box>
    );
}

export default TaskCard;