import { Box, Typography, Pagination } from "@mui/material";
import React from "react";
import TaskCard from "../taskCard/TaskCard";
import Solution from "../solution/Soluton";
import { useInfoSolutionContext, useArrayContext } from '../../App.js';
import { useTheme } from "@emotion/react";


function Catalog() {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    const { contextArrayTasks, numberOfPage, setPage, indexSolution, setIndexSolution } = useArrayContext();
    let { setAnswerValue, setIsHideAnswer } = useInfoSolutionContext();
    let changePage = (event, value) => {
        setPage(value);
    }

    const catalogStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
    }
    const taskStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        borderRadius: '12px',
        mb: '12px',
        p: '16px',
        overflow: 'hidden'
    };
    return (
        <Box sx={{ display: 'flex', 
        flexDirection: { md: 'row', xs: 'column' }, 
        justifyContent: 'center', 
        alignItems: 'stretch', 
        gap: '24px', minHeight: { md: '400px', xs: '200px' }, 
        }}>
            {contextArrayTasks.length === 0
                ? '' :
                <Box sx={{width: {md:'50%', xs: '100%'}}}>
                    <Box sx={catalogStyle}>
                        {contextArrayTasks.map((data, index) => {
                            return (<TaskCard task={data} index={index + 1} current={(indexSolution === index)} key={data._id}
                                onClickTask={() => {
                                    setIndexSolution(index);
                                    setAnswerValue('');
                                    setIsHideAnswer(true);
                                }}></TaskCard>)
                        })}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px' }}>
                        <Pagination count={numberOfPage} variant="outlined" color="secondary" onChange={changePage} />
                    </Box>
                </Box>
            }
            <Box sx={{width: '50%'}}>
                {(contextArrayTasks.length !== 0 && contextArrayTasks.length > indexSolution) ?
                    <Solution task={contextArrayTasks[indexSolution]} index={indexSolution + 1}
                        setIndexSolution={setIndexSolution} length={contextArrayTasks.length}></Solution>
                    : ''}

                {contextArrayTasks.length <= indexSolution && contextArrayTasks.length !== 0 ?
                    <Box sx={taskStyle}>
                        <Typography variant="h5" align="center">Выберите задачу!</Typography>
                    </Box>
                    : ''}

                {contextArrayTasks.length === 0 ?
                    <Box sx={taskStyle}>
                        <Typography variant="h5" align="center">Упростите фильтр, чтобы отобразить задачи!</Typography>
                    </Box>
                    : ''}


            </Box>
        </Box>
    );
}

export default Catalog;