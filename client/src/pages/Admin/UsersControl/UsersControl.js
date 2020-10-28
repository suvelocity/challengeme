import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import network from "../../../services/network";

const UsersControl = () => {
    const [allUsers, setAllUsers] = useState([])

    async function getAllUsers() {
        const { data: allUsersFromServer } = await network.get('/api/v1/admin/allusers')
        setAllUsers(allUsersFromServer)
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div style={{ paddingTop: '200px' }} >
            <h1>This is Users Control page</h1>
            <Link to='/admin' >
                admin router
            </Link>
            {allUsers && allUsers.map(user => {
                return (<li key={user.userName} >
                    <div>Id: {user.id}</div>
                    <div>User Name: {user.userName}</div>
                    <div>Full Name: {user.firstName}{' '}{user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Github Account: {user.githubAccount}</div>
                    <div>Phone Number: {user.phoneNumber}</div>
                    <div>Country: {user.country}</div>
                    <div>City: {user.city}</div>
                    <div>Birth Date: {user.birthDate}</div>
                    <div>Permission: {user.permission}</div>
                    <div>Security Question: {user.securityQuestion}</div>
                    <div>Reason Of Registration:{user.reasonOfRegistration}</div>
                    <div>Created At:{user.createdAt}</div>
                    <div>Updated At: {user.updatedAt}</div>
                    <div>Deleted At: {user.deletedAt}</div>
                </li>)
            })}

        </div>
    );
};

export default UsersControl;