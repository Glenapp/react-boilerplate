import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';

interface CustomCardProps {
    sx?: any;
    title?: string; // Add a title prop
    children?: ReactNode;
    ref?: any;
}

const CustomCard: React.FC<CustomCardProps> = (props) => {
    const { sx, children, ref } = props;

    return (
        <Card
            ref={ref}
            id="titlecard"
            {...props}
            sx={{
                ...sx,
                border: '1.084px solid',
                borderColor: 'grey.200',
                boxShadow: '0px 3px 20px 0px rgba(0, 0, 0, 0.02);',
                borderRadius: '20px !important',
                overflowX: { xs: 'auto', sm: 'auto', md: 'hidden' }
            }}
        >
            {children}
        </Card>
    );
};

export default CustomCard;
