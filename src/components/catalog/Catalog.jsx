import { Box,Grid,Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import { useTheme } from "@emotion/react";
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ButtonOutlined from "../buttonOutlined/buttonOutlined";
import ButtonContained from "../buttonContained/buttonContained";
import Alert from '@mui/material/Alert';

import imageTaskTest from '../../assets/tasks/1.png';
import answerImageAnswerTest from '../../assets/tasks/answerImage/answer1.png';

function Catalog() {
    const theme = useTheme();
    const bgCard = theme.palette.primary.violet_bgCard;
    const violet_icon = theme.palette.primary.violet_subtitle1;
    const stylesTask = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        borderRadius: '16px',
        mb: '12px',
        px: '16px',
        py: '12px',
    };
    
    const arrtask = [{
        difficult: 'Легкая',
        yearTask: 2022,
        description: 'Два груза массами m1 и m2 связаны невесомой нерастяжимой нитью и находятся на горизонтальной поверхности. Коэффициенты трения между каждым грузом и поверхностью одинаковы. Если к грузу массой m1 приложить горизонтально направленную силу F1 (см. первый рисунок), то нить разорвется, когда F1 >= 10 Н. Если же горизонтально направленную силу F2 приложить к грузу массой m2 (см. второй рисунок), то нить разорвется, когда F2 >= 2,5 Н. Чему равно отношение масс грузов m1/m2? Ответ округлите до десятых',
        image: imageTaskTest,
        answer: 4.0,
    }];

 
    let [showAlert, setShowAlert] = useState('none');
    let [isShowAnswer, setIsShowAnswer] = useState(false)

    return(
        <Grid container spacing={3} columns={4}>
            <Grid item xs={2}>
                <Box sx={{
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    {/* Сделать map когда добавятся карты */}
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box sx={stylesTask}>
                    <Box>
                        <Typography sx={{color: 'black', fontSize: 'large', fontWeight: '500', mb: '4px'}}>Задача {'1'}</Typography>
                        <Typography sx={{ color: 'black', fontSize: '14px'}}>{arrtask[0].difficult} • {arrtask[0].yearTask}</Typography>
                    </Box>
                    
                    <img src={arrtask[0].image} alt='задача'/>
                    <Typography sx={{color: '#49454F'}}>{arrtask[0].description}</Typography>

                    <Box sx={{mt: '12px',  width: '100%', display: (isShowAnswer ? 'block' : 'none')}}>
                        <TextField id="" label="Ответ" variant="outlined"  sx={{width: '100%'}}/>
                        
                        <Typography fontSize='small' sx={{color:'#B3261E', display: showAlert}}>😔  Неверный ответ. Проверьте решение</Typography>
                        {/* <Alert icon={false} severity="warning" onClose={() => {console.log('closed');}}>😔  Неверный ответ. Проверьте решение</Alert> */}
                        {/* <Alert icon={false} severity="success" onClose={() => {console.log('closed');}}>🥳  Правильный ответ</Alert> */}
                            
                        <Box sx={{display: 'flex', gap: '8px', justifyContent: 'flex-end', mt: '32px'}}>
                            <ButtonOutlined>Показать решение</ButtonOutlined>
                            <ButtonContained>Проверить ответ</ButtonContained>
                        </Box>
                    </Box>

                    <Box sx={{mt: '12px',  width: '100%', display: (isShowAnswer ? 'none' : 'block')}}>
                        <Alert icon={false} severity="success" sx={{borderRadius: '12px'}} onClose={() => {console.log('closed');}}>🥳  Правильный ответ</Alert>
                        <Box sx={{my: '16px'}}>
                            <Typography sx={{color: 'black', fontSize: 'large', fontWeight: '500'}}>Решение</Typography>
                            <Typography sx={{color: 'black', fontSize: '14px', color: '#49454F'}}>Ответ {arrtask[0].answer}</Typography>
                        </Box>

                        <Box sx={{color: '#49454F', fontSize: '14px', fontFamily: 'Roboto, sans-serif', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                            {/* Здесь распологается решение присланное из сервера */}
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '50%'}}/> 
                            </div>
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '50%'}}/> 
                            </div>
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '50%'}}/> 
                            </div>
                            
                        </Box>

                        <Box sx={{display: 'flex', gap: '8px', justifyContent: 'flex-end', mt: '32px'}}>
                            <ButtonOutlined>Скрыть решение</ButtonOutlined>
                        </Box>
                    </Box>

                </Box>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'row',  gap: '12px',}}>
                        <Box sx={{
                        backgroundColor: bgCard,
                        borderRadius: '16px',
                        p: '20px',
                        flexGrow: 1,
                        }}>
                            <Box sx={{color: violet_icon, display:'flex', alignItems:'center', gap: '4px'}}>
                                <SkipPreviousOutlinedIcon sx={{fontSize:'24px',}}></SkipPreviousOutlinedIcon>
                                <Typography variant="subtitle1"sx={{fontWeight: 'medium'}}>Предыдущая</Typography>
                            </Box>
                            <Typography sx={{fontSize: '28px', fontWeight: 'medium'}}>Задача 1</Typography>
                        </Box>
                        <Box sx={{
                        backgroundColor: bgCard,
                        borderRadius: '16px',
                        p: '20px',
                        flexGrow: 1,
                        }}>    
                            <Box sx={{color: violet_icon, display:'flex', alignItems:'center', gap: '4px'}}>
                                <Typography variant="subtitle1"sx={{fontWeight: 'medium'}}>Следующая</Typography>
                                <SkipNextOutlinedIcon sx={{fontSize:'24px'}}></SkipNextOutlinedIcon>
                            </Box>
                            <Typography sx={{fontSize: '28px', fontWeight: 'medium'}}>Задача 3</Typography>
                        </Box>
                        {/* Доработать ссылки */}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Catalog;