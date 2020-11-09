import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import green from '@material-ui/core/colors/green';
import GazillaApiContext from './GazillaApiContext';
import { getMinDate } from '../utils';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({ 
  anchor: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(12),
  },
  popup: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
  },
  icon: {
    color: green[500],
    fontSize: theme.spacing(5),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },  
  checkBoxLabel: {
    fontSize: theme.spacing(1.4),
  },
  checkBoxError: { color: '#f44336' },
  checkBoxErrorText: {
    position: 'absolute',
    bottom: theme.spacing(1.5),
    left: 0,
    color: '#f44336',
  },
  mb12: {
    marginBottom: theme.spacing(3),
  },
}));

const FeedbackForm = () => {
  const classes = useStyles();
  const anchor = useRef();
  const telInput = useRef();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const gazillaApi = useContext(GazillaApiContext);
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    const autoOpen = () =>
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    autoOpen();
    return () => {
      clearTimeout(autoOpen);
    };
  }, []);

  const onSubmit = (data) => {
    gazillaApi.postRequest(data)
    .then(res => {           
      setAlertOpen(res)
      setOpen(false);      
    }) 
    .catch(err => {      
      setAlertOpen(err)
    })     
  }; 
  
  const handleInput = ({ target: { value } }) => {
    const currentValue = value.replace(/[^\d+]/g, '');    
    const cvLength = currentValue.length;
    if (cvLength < 3) {
      telInput.current.value = '+7';
      return
    };
    if (cvLength < 6) {
      telInput.current.value = currentValue;
      return
    };
    if (cvLength < 9) {
      telInput.current.value = 
      `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
      return
    }
    telInput.current.value = 
    `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8,12)}`;
    }

  return (
    <>
      <IconButton ref={anchor} className={classes.anchor} onClick={() => setOpen(true)}>
        <PermPhoneMsgIcon className={classes.icon} />
      </IconButton>
      <Popover
        classes={{
          paper: classes.popup,
        }}
        open={open}
        anchorEl={anchor.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography align='center' variant='h6'>
          Обратный звонок
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            inputRef={register({
              required: 'Это обязательное поле',
              minLength: {
                value: 17,
                message: 'Неверный формат номера',
              },              
            })}
            
            InputProps={{ inputProps: { ref: telInput } }}
            placeholder='+7 (xxx) xxx-xxxx'
            name='phone'
            margin='normal'            
            label='Ваш номер телефона'
            defaultValue={'+7'}            
            autoComplete='off'
            onChange={handleInput}
            required
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : null}
          />
          <TextField
            InputProps={{ inputProps: { min: getMinDate() } }}
            inputRef={register({
              required: 'Это обязательное поле',
              min: {
                value: getMinDate(),
                message: 'Выберите дату и время',
              },              
            })}
            name='date'
            margin='normal'
            id='datetime-local'
            label='Когда позвонить?'
            type='datetime-local'
            min={getMinDate()}
            defaultValue={getMinDate('09')}
            className={`${classes.datetime} ${classes.mb12}`}
            InputLabelProps={{
              shrink: true,
            }}
            required
            error={!!errors.date}
            helperText={errors.date ? errors.date.message : null}
          />
          <TextField
            inputRef={register({
              maxLength: {
                value: 200,
                message: 'Не более 200 символов',
              },
            })}
            multiline
            rowsMax={7}
            name='comment'
            label='Комментарий'
            autoComplete='off'
            error={!!errors.comment}
            helperText={errors.comment ? errors.comment.message : null}
          />
          <div style={{ position: 'relative' }}>
            <FormControlLabel
              classes={{
                label: classes.checkBoxLabel,
              }}
              className={classes.mb12}
              control={
                <Checkbox
                  inputRef={register({
                    required: 'Необходимо ваше согласие',
                  })}
                  name='checkBox'
                  color='primary'
                  classes={
                    !!errors.checkBox
                      ? {
                          root: classes.checkBoxError,
                        }
                      : null
                  }
                />
              }
              label='Согласен с предоставлением услуги'
            />
            {!!errors.checkBox && (
              <FormHelperText className={classes.checkBoxErrorText}>
                {errors.checkBox?.message}
              </FormHelperText>
            )}
          </div>
          <Button
            className={classes.submitButton}
            variant='contained'
            color='primary'
            startIcon={<PermPhoneMsgIcon />}
            size='medium'
            type='submit'
            disableElevation
          >
            Позвоните мне
          </Button>
        </form>
      </Popover>
      <Snackbar open={!!alertOpen} autoHideDuration={3000} onClose={()=>setAlertOpen(null)}>
        <Alert onClose={()=>setAlertOpen(null)} severity={alertOpen?.data ? 'success' : 'error'}>
          {alertOpen?.data ? 'Мы Вам перезвоним!' : 'Упс! Попробуйте ещё раз.'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
