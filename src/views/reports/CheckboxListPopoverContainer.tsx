import { Box, SxProps } from '@mui/material';

const CheckboxListPopupContainer = ({ sx, children }: { sx?: SxProps; children: any }) => (
    <Box
        sx={{
            p: 0,
            width: {
                md: '280px'
            },
            '& ul': {
                paddingTop: 0,
                overflowX: 'hidden',
                overflowY: 'auto',
                li: {
                    paddingRight: 0,
                    label: {
                        width: '100%',
                        margin: 0,
                        '& span:nth-of-type(1)': {
                            marginLeft: '-11px'
                        },
                        '& span:nth-of-type(2)': {
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }
                    }
                },
                p: {
                    paddingLeft: '10px'
                }
            },
            ...(sx || {})
        }}
    >
        {children}
    </Box>
);

export default CheckboxListPopupContainer;
