// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardText, IconBrandGoogleAnalytics, IconUsers, IconSettings, IconUserPlus } from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconClipboardText,
    IconBrandGoogleAnalytics,
    IconUsers,
    IconSettings,
    IconUserPlus
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'budgets',
            title: <FormattedMessage id="budgets" />,
            type: 'item',
            url: '/budgets',
            icon: icons.IconClipboardText,
            breadcrumbs: false
        },
        {
            id: 'reports',
            title: <FormattedMessage id="reports" />,
            type: 'collapse',
            icon: icons.IconBrandGoogleAnalytics,
            breadcrumbs: false,
            children: [
                {
                    id: 'summary',
                    title: <FormattedMessage id="summary" />,
                    type: 'item',
                    url: '/reports/summary',
                    breadcrumbs: false
                },
                {
                    id: 'graphical',
                    title: <FormattedMessage id="graphical" />,
                    type: 'item',
                    url: '/reports/graphical',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'item',
            url: '/users',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'roles',
            title: <FormattedMessage id="roles" />,
            type: 'item',
            url: '/roles',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        },
        {
            id: 'setttings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings
        }
    ]
};

export default other;
