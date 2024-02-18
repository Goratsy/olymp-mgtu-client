import { Box, Grid} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import Solution from "../solution/Soluton";
import { useArrayContext } from '../../App.js';

function Catalog() {
    const catalogStyle = {
        borderRadius: '12px',
        overflow: 'hidden'
    }

    const [indexSolution, setIndexSolution] = useState(0);
    const {contextArrayTasks, setContextArrayTasks} = useArrayContext();
    
    useEffect(() => {
        fetch('/allTasks')
            .then((data) => data.json())
            .then((res) => setContextArrayTasks(res))
            .catch(err => {console.log(err);});
        console.log(contextArrayTasks); 
    }, []);

    return(
        <Grid container spacing={3} columns={{md: 4, xs: 2}}  direction={{md: "row", xs: 'column-reverse'}}>
            <Grid item xs={2}>
                <Box sx={catalogStyle}>
                    {contextArrayTasks.length === 0 ? 'Loading...' : contextArrayTasks.map((data, index) => {
                        return (<TaskCard task={data} index={index+1} current={(indexSolution === index)} key={data._id} onClickTask={() => {setIndexSolution(index)}}></TaskCard>)
                    })}
                </Box>
            </Grid>
            <Grid item xs={2}>
        {contextArrayTasks.length === 0 ? 'Loading...' : <Solution task={contextArrayTasks[indexSolution]} index={indexSolution+1} setIndexSolution={setIndexSolution} length={contextArrayTasks.length}></Solution>}
            </Grid>
        </Grid>
    );
}

export default Catalog;