import React, { useState, useEffect, useCallback } from "react";
import network from '../../services/network';
import { DataGrid } from '@material-ui/data-grid';
import { columns } from '../../config/MultipleRowSelection';
import '../../styles/MultipleRowSelection.css';

export default function SingleRowSelectionGrid() {
    const [allUsers, setAllUsers] = useState([]);
    const getAllUsers = useCallback(async () => {
        const { data: allUsersFromServer } = await network.get('/api/v1/users/admin');
        setAllUsers(allUsersFromServer);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    const data = {
        columns: [ ...columns],
        rows: [...allUsers]
    }

    return (
        <div className='Multiple-Row-Selection-data-grid'>
            <DataGrid
                {...data}
                loading={data.rows.length === 0}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
           
        </div>
    );
}