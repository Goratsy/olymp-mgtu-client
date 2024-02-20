import React, { useEffect, useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useArrayContext } from '../../App.js';

function Filters() {
    let {contextArrayTasks, setContextArrayTasks} = useArrayContext();

    const filterStyle = {
        display: 'flex',
        flexDirection: {xs:'column', md: 'row'},
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        my: '30px'
    };

    let [dataForm, setDataForm] = useState({difficult: '', subject: '', year: ''});

    let controlForms = (e) => {
        if (e.target.name == 'difficult') {
            setDataForm({difficult: e.target.value, subject: dataForm.subject, year: dataForm.year});
        } else if (e.target.name == 'subject') {
            setDataForm({difficult: dataForm.difficult, subject: e.target.value, year: dataForm.year});
        } else if (e.target.name == 'year') {
            setDataForm({difficult: dataForm.difficult, subject: dataForm.subject, year: e.target.value});
        }
    }

    useEffect(() => {
        fetch(`/taskByFilter/?difficult=${dataForm.difficult}&subject=${dataForm.subject}&year=${dataForm.year}`)
            .then(data => data.json())
            .then(data => {setContextArrayTasks(data);})
            .catch(err => {console.log(err);});
      }, [dataForm]);
    
    return (
        <Box sx={filterStyle}>
            <FormControl sx={{minWidth: 140}} size="small">
                <InputLabel id="difficult-label" >Сложность</InputLabel>
                <Select
                    labelId="difficult-label"
                    id="difficult-select"
                    label="Сложность"
                    sx={{borderRadius: '12px'}}
                    onChange={controlForms}
                    value={dataForm.difficult}
                    name='difficult'
                >
                    <MenuItem value=''>
                        <em>Все</em>
                    </MenuItem>
                    <MenuItem value='Легкая'>Легкая</MenuItem>
                    <MenuItem value='Средняя'>Средняя</MenuItem>
                    <MenuItem value='Тяжелая'>Тяжелая</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup
                color="primary"
                aria-label="subjects"
                exclusive
                size="small"
                value={dataForm.subject}
                onChange={controlForms}
            >
                <ToggleButton value="" sx={{textTransform: 'capitalize', color: 'black'}} name='subject'>Все</ToggleButton>
                <ToggleButton value="math" sx={{textTransform: 'capitalize', color: 'black'}} name='subject'>Математика</ToggleButton>
                <ToggleButton value="programming" sx={{textTransform: 'capitalize', color: 'black'}} name='subject'>Программирование</ToggleButton>
                <ToggleButton value="physics" sx={{textTransform: 'capitalize', color: 'black'}} name='subject'>Физика</ToggleButton>
            </ToggleButtonGroup>
            
            <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel id="year-label">Год</InputLabel>
                <Select
                    labelId="year-label"
                    id="year-select"
                    label="Год"
                    sx={{borderRadius: '12px'}}
                    value={dataForm.year}
                    onChange={controlForms}
                    name='year'
                >
                    <MenuItem value=''>
                        <em>Все</em>
                    </MenuItem>
                    <MenuItem value='2023'>2023</MenuItem>
                    <MenuItem value='2022'>2022</MenuItem>
                    <MenuItem value='2021'>2021</MenuItem>
                    <MenuItem value='2021'>2020</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Filters;