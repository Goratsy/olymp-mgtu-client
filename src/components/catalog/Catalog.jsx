import { Box, Grid, Typography, Pagination} from "@mui/material";
import React, { useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import Solution from "../solution/Soluton";
import { useInfoSolutionContext, useArrayContext } from '../../App.js';
import { useTheme } from "@emotion/react";


function Catalog() {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    const [indexSolution, setIndexSolution] = useState(0);
    const {contextArrayTasks, numberOfPage, setPage} = useArrayContext();

    let {setAnswerValue, setIsHideAnswer} = useInfoSolutionContext();


    // useEffect(() => {
    //     fetch(`/allTasks/`)
    //         .then((data) => data.json())
    //         .then((res) => {setContextArrayTasks(data)})
    //         .catch(err => {console.log(err);});
    // }, []);

    let changePage = (event, value) => {setPage(value);}

    const catalogStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    return(
        <Grid container spacing={3} columns={{md: 4, xs: 2}} direction={{md: "row", xs: 'column-reverse'}} sx={{minHeight: {md: '400px', xs: '200px'}}}>
            <Grid item xs={2}>
                <Box sx={catalogStyle}>
                    {contextArrayTasks.length === 0 
                    ? <Typography>🤔 Нет таких задач! Упростите фильтры.</Typography>
                    : contextArrayTasks.map((data, index) => {
                        return (<TaskCard task={data} index={index+1} current={(indexSolution === index)} key={data._id} 
                        onClickTask={() => {
                            setIndexSolution(index);
                            setAnswerValue('');
                            setIsHideAnswer(true);
                        }}></TaskCard>)
                    })}
                </Box>
                {contextArrayTasks.length === 0 
                    ? ''
                    : 
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: '30px'}}>
                        <Pagination count={numberOfPage} variant="outlined" color="secondary" onChange={changePage}/>
                    </Box>
                    }
                
            </Grid>
            <Grid item xs={2}>
                {contextArrayTasks.length === 0 ? 
                <Box sx={taskStyle}>
                    <Typography variant="h5" align="center">Упростите фильтр, чтобы отобразить задачи!</Typography>
                </Box>
                : <Solution task={contextArrayTasks[indexSolution]} index={indexSolution+1} setIndexSolution={setIndexSolution} length={contextArrayTasks.length}></Solution>}
            </Grid>
        </Grid>
    );
}

export default Catalog;