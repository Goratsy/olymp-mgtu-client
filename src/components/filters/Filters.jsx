import { Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";

function Filters() {
    const [view, setView] = React.useState('list');
    const handleChange = (event, nextView) => {
        setView(nextView);
    };
// спросить, надо ли переделывать как в макете. 
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: {xs:'column', md: 'row'},
            justifyContent: 'space-between',
            alignItems: 'center',
            my: '30px'
        }}>
            <FormControl sx={{width: {md: '12%', xs: '100%'}, borderRadius: '8px'}}>
                <InputLabel id="difficulty-select">Сложность</InputLabel>
                <Select
                    labelId="difficulty-select"
                    id=""
                    label="difficulty"
                    sx={{borderRadius: '8px'}}
                >
                    <MenuItem value={"all"}>Любой</MenuItem>
                    <MenuItem value={"easy"}>Легкая</MenuItem>
                    <MenuItem value={"normal"}>Средняя</MenuItem>
                    <MenuItem value={"hard"}>Тяжелая</MenuItem>
                </Select>
            </FormControl>  

            <ToggleButtonGroup
            color="primary"
            aria-label="subjects"
            exclusive
            value={view}
            onChange={handleChange}
            sx={{borderRadius: '100px', p: '10px'}}
            >
                <ToggleButton value="math" sx={{textTransform: 'capitalize', color: 'black'}}>Математика</ToggleButton>
                <ToggleButton value="programming" sx={{textTransform: 'capitalize', color: 'black'}}>Программирование</ToggleButton>
                <ToggleButton value="physics" sx={{textTransform: 'capitalize', color: 'black'}}>Физика</ToggleButton>
            </ToggleButtonGroup>

            <FormControl sx={{width: {md: '12%', xs: '100%'}}}>
                <InputLabel id="date-of-task">Год</InputLabel>
                <Select
                    labelId="date-of-task"
                    id=""
                    label="date"
                    sx={{borderRadius: '8px'}}
                >
                    <MenuItem value={"all"} selected>Любой</MenuItem>
                    <MenuItem value={'2019'}>2019</MenuItem>
                    {/* Сделать цикл со значениями */}
                </Select>
            </FormControl> 
        </Box>
    );
}

export default Filters;