// project import
import other from './other';
import pages from './pages';

// types
import { NavItemType } from 'types';
import admin from './admin';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [pages, admin]
};

export default menuItems;
