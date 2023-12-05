// assets
import {
    IconClipboardText,
    IconBrandGoogleAnalytics,
    IconUsers,
    IconSettings,
    IconUserPlus,
    IconStretching,
    IconLocation,
    IconQuestionMark
} from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconClipboardText,
    IconBrandGoogleAnalytics,
    IconUsers,
    IconSettings,
    IconUserPlus,
    IconStretching,
    IconLocation,
    IconQuestionMark
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const admin: NavItemType = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'subadmin',
            title: 'Sub-Admin',
            type: 'item',
            url: '/admin/create-subadmin',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/admin/roles',
            icon: icons.IconBrandGoogleAnalytics,
            breadcrumbs: false
        },
        {
            id: 'Sites',
            title: 'Sites',
            type: 'item',
            url: '/admin/sites',
            icon: icons.IconLocation,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/admin/add-users',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        },
        {
            id: 'Qa',
            title: 'Q & a',
            type: 'item',
            url: '/admin/qa-categories',
            icon: icons.IconQuestionMark,
            breadcrumbs: false
        },
        {
            id: 'training',
            title: 'Training',
            type: 'item',
            url: '/admin/trainings-roles',
            icon: icons.IconStretching
        }
    ]
};

export default admin;
