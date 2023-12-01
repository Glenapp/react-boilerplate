import React from 'react';
import UsersList from './usersList';
import AddUser from './AddUser';
import UserService from 'services/user.service';

const Users = () => {
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState<any>([]);
    const getAllMembers = () => {
        UserService.getUsersAsync().then((res: any) => {
            if (res?.length) {
                const updatedResult = res?.map((item: any) => {
                    item.username = item.firstName + ' ' + item.lastName;
                    return item;
                });
                setUsers(updatedResult);
            }
        });
    };
    React.useEffect(() => {
        getAllMembers();
    }, []);
    return (
        <React.Fragment>
            <UsersList setOpen={setOpen} users={users} />
            <AddUser open={open} setOpen={setOpen} getAllMembers={getAllMembers} />
        </React.Fragment>
    );
};

export default Users;
