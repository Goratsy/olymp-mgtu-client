import React, { useEffect, useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useArrayContext, useInfoSolutionContext } from '../../App.js';
import { urlBase } from "../../config.js";

function Filters() {
    let {setContextArrayTasks, setNumberOfPage, page, setIndexSolution, setPage} = useArrayContext();
    let {setIsHideAnswer, setTextNotSuccessAnswer, setAnswerFromGPT} = useInfoSolutionContext();

    const filterStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        my: '30px',
        p: '5px',
        overflowX: {xs: 'scroll', md: 'visible'},        
    };

    let [dataForm, setDataForm] = useState({difficult: '', subject: 'math', year: ''});

    let controlForms = (e) => {
        setPage(1);

        try {
            if (e?.target.name === 'difficult') {
                setDataForm({difficult: e.target.value, subject: dataForm.subject, year: dataForm.year});
            } else if (e?.target.name === 'subject') {
                setDataForm({difficult: dataForm.difficult, subject: e.target.value, year: dataForm.year});
            } else if (e?.target.name === 'year') {
                setDataForm({difficult: dataForm.difficult, subject: dataForm.subject, year: e.target.value});
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsHideAnswer(true);
        setTextNotSuccessAnswer('');
        setAnswerFromGPT('');
        setIndexSolution(0); 


        fetch(`${urlBase}/taskByFilter/?difficult=${dataForm.difficult}&subject=${dataForm.subject}&year=${dataForm.year}&page=${page}`)
            .then(data => data.json())
            .then(res => {
                setContextArrayTasks(res.tasks); 
                setNumberOfPage(res.numberOfpage);
            })
            .catch(err => {console.log(err);});        
    }, [dataForm, page]);


    
    return (
        <Box sx={filterStyle}>
            <FormControl sx={{display: {md:'none'}, minWidth: 160, width: {md: 160, xs: '10vw'}}} size="small">
                <InputLabel id="subject-label">Предмет</InputLabel>
                <Select
                    labelId="subject-label"
                    id="subject-select"
                    label="Предмет"
                    sx={{borderRadius: '8px'}}
                    onChange={controlForms}
                    value={dataForm.subject}
                    name='subject'
                >
                    <MenuItem value='math'>Математика</MenuItem>
                    <MenuItem value='programming'>Программирование</MenuItem>
                    <MenuItem value='physics'>Физика</MenuItem>
                </Select>
            </FormControl>

            {/* <Box sx={{scrollbarWidth}}>

            </Box> */}
            <FormControl sx={{minWidth: 160, width: {md: 160, xs: '10vw'}}} size="small">
                <InputLabel id="difficult-label">Сложность</InputLabel>
                <Select
                    labelId="difficult-label"
                    id="difficult-select"
                    label="Сложность"
                    sx={{borderRadius: '8px'}}
                    onChange={controlForms}
                    value={dataForm.difficult}
                    name='difficult'
                >
                    <MenuItem value=''>Все</MenuItem>
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
                sx={{display: {md:'block', xs: 'none'}}}
            >
                <ToggleButton value="math" sx={{textTransform: 'capitalize', color: 'black', width: '10vw', minWidth: '145px', borderRadius: '8px', height: '35px'}} name='subject'>Математика</ToggleButton>
                <ToggleButton value="programming" sx={{textTransform: 'capitalize', color: 'black', width: '10vw', minWidth: '180px', height: '35px'}} name='subject'>Программирование</ToggleButton>
                <ToggleButton value="physics" sx={{textTransform: 'capitalize', color: 'black', width: '10vw', minWidth: '145px', borderRadius: '8px', height: '35px'}} name='subject'>Физика</ToggleButton>
            </ToggleButtonGroup>

            
            <FormControl sx={{minWidth: 160, width: {md: 160, xs: '10vw'}}} size="small">
                <InputLabel id="year-label">Год</InputLabel>
                <Select
                    labelId="year-label"
                    id="year-select"
                    label="Год"
                    sx={{borderRadius: '8px'}}
                    value={dataForm.year}
                    onChange={controlForms}
                    name='year'
                >
                    <MenuItem value=''>Все</MenuItem>
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