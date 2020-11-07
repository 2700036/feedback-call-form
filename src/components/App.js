import '../vendor/normalize.css';
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FeedbackForm from './FeedbackForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative'
  },
}));

const App = () => {
  const classes = useStyles();
  
  

  return (
    <FeedbackForm  />
  );
};



export default App;
