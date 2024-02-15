import { Box, Grid} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import Solution from "../solution/Soluton";

function Catalog() {
    const catalogStyle = {
        borderRadius: '12px',
        overflow: 'hidden'
    }

    const [indexSolution, setIndexSolution] = useState(0);
    const [ArrayTasks, setArrayTasks] = useState([]);
    
    useEffect(() => {
        fetch('/allTasks')
            .then((data) => data.json())
            .then((res) => setArrayTasks(res))
            .catch(err => {console.log(err);});
        console.log(ArrayTasks); 
    }, []);

    return(
        <Grid container spacing={3} columns={4}>
            <Grid item xs={2}>
                <Box sx={catalogStyle}>
                    {ArrayTasks.length === 0 ? 'Loading...' : ArrayTasks.map((a, b) => {
                        console.log(a, b);
                        return (<TaskCard task={a} index={b+1} key={a._id}></TaskCard>)
                    })}
                </Box>
            </Grid>
            <Grid item xs={2}>
                {ArrayTasks.length === 0 ? 'Loading...' : <Solution task={ArrayTasks[indexSolution]} index={indexSolution+1}></Solution>}
                
            </Grid>
        </Grid>
    );
}

export default Catalog;