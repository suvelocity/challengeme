import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '25%',
    height: '400px',
    backgroundColor: '#47687C',
  },
  picture: {
    maxWidth: '10px !important',
    width: '10px',
    maxHeight: '200px'
  }
});

export default function SimpleCard({ head, content, picture }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">{head}</Typography>
        <Typography variant="body2" component="p">{content}</Typography>
        <div className={classes.picture} >{picture}</div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}