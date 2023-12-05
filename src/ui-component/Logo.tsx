// material-ui
import logo from 'assets/images/icons/unilever.svg';
import backgroundImg from 'assets/images/icons/effect-left.png';
import { Box } from '@mui/system';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
{
    /* <img src={logo} alt="Berry" height="32" width="150" />; */
}

const Logo = () => {
    return (
        <Box>
            {/* <img src={backgroundImg} alt="backhead" style={{ left: 0, position: 'absolute', top: 0 }} height={85} /> */}
            <img src={logo} alt="unilever" height={50} style={{ zIndex: 2, position: 'relative' }} />
        </Box>
    );
};

export default Logo;
