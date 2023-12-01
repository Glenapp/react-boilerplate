// third-party

// assets
import { IconKey, IconBug } from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconKey,
    IconBug
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
    id: 'pages',
    title: '',
    caption: '',
    icon: icons.IconKey,
    type: 'group',
    children: []
};

export default pages;
