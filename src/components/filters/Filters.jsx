import { useTheme } from "@emotion/react";
import { Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";


function Filters() {
    const theme = useTheme();

    const filterStyle = {
        display: 'flex',
        flexDirection: {xs:'column', md: 'row'},
        justifyContent: 'space-between',
        alignItems: 'center',
        my: '30px',
    };
    const formControlStyle = {
        width: {md: '12%', xs: '100%'}, 
        // borderRadius: '0px',
        // color: theme.palette.grey.dark,
    }
    const selectStyle = {
        // p: '10px',
        // borderRadius: '2px solid #ccc'
    }
    const [view, setView] = React.useState('');
    const handleChange1 = (event, nextView) => {
        setView(nextView);
    };

    const [diff, setDiff] = React.useState('');

    const handleChange2 = (event) => {
        setDiff(event.target.value);
    };
    console.log(diff);
    

// спросить, надо ли переделывать как в макете. 
    return (
        <Box sx={filterStyle}>
            <FormControl sx={{ m: 1, minWidth: 140,  }} size="small">
                <InputLabel id="difficult-label">Сложность</InputLabel>
                <Select
                    labelId="difficult-select-label"
                    id="difficult-select"
                    value={diff}
                    label="difficult"
                    onChange={handleChange2}
                    sx={{borderRadius: '12px'}}
                >
                    <MenuItem value='none'>
                        <em>Выбрать</em>
                    </MenuItem>
                    <MenuItem value='easy'>Легкий</MenuItem>
                    <MenuItem value='normal'>Средний</MenuItem>
                    <MenuItem value='hard'>Тяжелый</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup
            color="primary"
            aria-label="subjects"
            exclusive
            value={view}
            onChange={handleChange1}
            size="small"
            >
                <ToggleButton value="math" sx={{textTransform: 'capitalize', color: 'black'}}>Математика</ToggleButton>
                <ToggleButton value="programming" sx={{textTransform: 'capitalize', color: 'black'}}>Программирование</ToggleButton>
                <ToggleButton value="physics" sx={{textTransform: 'capitalize', color: 'black'}}>Физика</ToggleButton>
            </ToggleButtonGroup>
            
            <FormControl sx={{ m: 1, minWidth: 140,  }} size="small">
                <InputLabel id="year-select-label">Год</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={diff}
                    label="year"
                    onChange={handleChange2}
                    sx={{borderRadius: '12px'}}
                >
                    <MenuItem value='none'>
                        <em>Выбрать</em>
                    </MenuItem>
                    <MenuItem value='2022'>2022</MenuItem>
                    {/* Не забыть про года */}
                </Select>
            </FormControl>
            
        </Box>
    );
}

export default Filters;