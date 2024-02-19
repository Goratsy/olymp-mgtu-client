import { Box, Grid, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import Solution from "../solution/Soluton";
import { useArrayContext } from '../../App.js';
import Loading from '../../assets/loading1.svg';
import { useTheme } from "@emotion/react";

function Catalog() {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    const [indexSolution, setIndexSolution] = useState(0);
    const {contextArrayTasks, setContextArrayTasks} = useArrayContext();
    
    useEffect(() => {
        fetch('/allTasks')
            .then((data) => data.json())
            .then((res) => setContextArrayTasks(res))
            .catch(err => {console.log(err);});
        console.log(contextArrayTasks); 
    }, []);

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
                    {contextArrayTasks.length === 0 ? 
                    <>
                         {/* <img src={Loading} alt="Loading..." style={{mixBlendMode: 'multiply', width: '60px', height: '60px'}}/>  */}
                         <Typography>🤔 Нет таких задач! Упростите фильтры.</Typography>
                    </>
                    : contextArrayTasks.map((data, index) => {
                        return (<TaskCard task={data} index={index+1} current={(indexSolution === index)} key={data._id} onClickTask={() => {setIndexSolution(index)}}></TaskCard>)
                    })}
                </Box>
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