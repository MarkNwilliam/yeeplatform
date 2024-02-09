import React from 'react';
import { createBoard } from '@wixc3/react-board';
import AccountPage from '../../../pages/AccountPage';

export default createBoard({
    name: 'AccountPage',
    Board: () => <AccountPage />,
    isSnippet: true,
});
