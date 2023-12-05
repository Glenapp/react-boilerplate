import styled from '@emotion/styled';
import MuiTooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

const SmallWidthTooltip = styled(({ className, ...other }: TooltipProps) => <MuiTooltip {...other} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 200
    }
});

export default SmallWidthTooltip;
