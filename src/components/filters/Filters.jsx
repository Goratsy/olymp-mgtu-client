import React from "react";
import { Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@emotion/react";


function Filters() {
    const theme = useTheme();

    const filterStyle = {
        display: 'flex',
        flexDirection: {xs:'column', md: 'row'},
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        my: '30px'
    };
    
    return (
        <Box sx={filterStyle}>
            <FormControl sx={{minWidth: 140}} size="small">
                <InputLabel id="difficult-label" >Сложность</InputLabel>
                <Select
                    labelId="difficult-select-label"
                    id="difficult-select"
                    label="difficult"
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
            size="small"
            >
                <ToggleButton value="math" sx={{textTransform: 'capitalize', color: 'black'}}>Математика</ToggleButton>
                <ToggleButton value="programming" sx={{textTransform: 'capitalize', color: 'black'}}>Программирование</ToggleButton>
                <ToggleButton value="physics" sx={{textTransform: 'capitalize', color: 'black'}}>Физика</ToggleButton>
            </ToggleButtonGroup>
            
            <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel id="year-select-label">Год</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    label="year"
                    sx={{borderRadius: '12px', }}
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