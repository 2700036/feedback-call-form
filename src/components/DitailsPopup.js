import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  makeStyles,
  Box,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { editContact } from '../actions';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  fullInput: {
    marginBottom: theme.spacing(2),
  },
  halfInput: {
    marginBottom: theme.spacing(2),
    width: '47%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  box: {
    justifyContent: 'Space-between',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  mb64: {
    marginBottom: theme.spacing(6),
  },
}));

const DitailsPopup = ({ contacts, editContact, match, history }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const open = match.params.action == 'details';
  const contactId = match.params.id;
  const contact = contacts.find(({ id }) => id == contactId);

  const handleClose = () => history.push('/contacts/');

  const isReadOnly = () => {
    return !isEdit ? { readOnly: true } : { readOnly: false };
  };
  const onSubmit = (data) => {
    editContact({id: contactId, ...data})
    handleClose();
  };

  const { name, email, phone, website, company, street, suite, city, zipcode } = contact;
  return (
    <>
      <Dialog fullWidth={true} maxWidth={'sm'} 
      open={!!open} 
      onClose={handleClose}
      scroll='body'
      >
        <form onSubmit={isEdit ? handleSubmit(onSubmit) : null} noValidate>
          <DialogContent className={classes.dialogContent}>
            <TextField
              inputRef={register({
                required: 'Это обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов',
                },
              })}
              name='name'
              margin='normal'
              className={`${classes.halfInput} ${classes.mb64}`}
              label='Имя'
              defaultValue={name}
              InputProps={isReadOnly()}
              required
              autoComplete='off'
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
            />
            <Box className={classes.box}>
              <TextField autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Неверный формат почты',
                  },
                })}
                name='email'
                className={classes.halfInput}
                label='email'
                type='email'
                defaultValue={email}
                InputProps={isReadOnly()}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
              />
              <TextField autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 6,
                    message: 'Не менее 6 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='phone'
                className={classes.halfInput}
                label='телефон'
                type='tel'
                defaultValue={phone}
                InputProps={isReadOnly()}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : null}
              />
            </Box>
            <Box className={`${classes.box} ${classes.mb64}`}>
              <TextField autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[\S]+\.[\S]{2,7}$/,
                    message: 'Неверный формат сайта',
                  },
                  minLength: {
                    value: 5,
                    message: 'Не менее 5 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='website'
                className={classes.halfInput}
                label='Сайт'
                type='text'
                defaultValue={website}
                InputProps={isReadOnly()}
                error={!!errors.website}
                helperText={errors.website ? errors.website.message : null}
              />
              <TextField autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 2,
                    message: 'Не менее 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='company'
                className={classes.halfInput}
                label='Компания'
                type='text'
                defaultValue={company}
                InputProps={isReadOnly()}
                error={!!errors.company}
                helperText={errors.company ? errors.company.message : null}
              />
            </Box>
            <Typography paragraph>Адрес:</Typography>
            <Box className={`${classes.box}`}>
              <TextField autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 2,
                    message: 'Не менее 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='city'
                className={classes.halfInput}
                label='Город'
                type='text'
                defaultValue={city}
                InputProps={isReadOnly()}
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : null}
              />
              <TextField autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[\d-]+$/,
                    message: 'Неверный формат индекса',
                  },
                  minLength: {
                    value: 5,
                    message: 'Не менее 5 символов',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Не более 15 символов',
                  },
                })}
                name='zipcode'
                className={classes.halfInput}
                label='Индекс'
                type='text'
                defaultValue={zipcode}
                InputProps={isReadOnly()}
                error={!!errors.zipcode}
                helperText={errors.zipcode ? errors.zipcode.message : null}
              />
            </Box>
            <TextField autoComplete='off'
              inputRef={register({
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Не более 40 символов',
                },
              })}
              name='street'
              className={classes.fullInput}
              label='Улица, дом, корп.'
              type='text'
              defaultValue={street}
              InputProps={isReadOnly()}
              error={!!errors.street}
              helperText={errors.street ? errors.street.message : null}
            />
            <TextField autoComplete='off'
              inputRef={register({
                maxLength: {
                  value: 15,
                  message: 'Не более 15 символов',
                },
              })}
              name='suite'
              className={classes.halfInput}
              label='Офис, помещение'
              type='text'
              defaultValue={suite}
              InputProps={isReadOnly()}
              error={!!errors.suite}
              helperText={errors.suite ? errors.suite.message : null}
            />
            <Box className={`${classes.box}`}></Box>
          </DialogContent>
          <DialogActions>
            {!isEdit && (
              <Button
                color='secondary'
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Изменить
              </Button>
            )}
            <Button color='primary' type='submit' autoFocus onClick={isEdit ? null : handleClose}>
              {isEdit ? 'Сохранить' : 'Закрыть'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({contacts}) => ({
  contacts
})

const mapDispatchToProps = {
  editContact
}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DitailsPopup));
