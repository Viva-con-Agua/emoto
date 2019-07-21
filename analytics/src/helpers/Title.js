import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


function  classes() { 
  return makeStyles(theme => ({
    title: {
      paddingLeft: '20px',
    }
  }));
} 

export default function Title(props) {
  return (
    <Typography component="h1" variant="h6" color="primary" gutterBottom className={classes().title}>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};