import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function SimpleCard({ icon, name, rule, content }) {
    return (
        <Card className='Landing-page-Project-Leaders-Root'>
            <CardContent>
                <Typography className='Landing-page-Project-Leaders-Icon' variant="h5" component="img" src={icon} />
                <Typography className='Landing-page-Project-Leaders-Name' variant="h5" component="h2">{name}</Typography>
                <Typography className='Landing-page-Project-Leaders-Rule' variant="body2" component="p">{rule}</Typography>
                <Typography className='Landing-page-Project-Leaders-Content' variant="body2" component="p">{content}</Typography>
            </CardContent>
        </Card>
    );
}