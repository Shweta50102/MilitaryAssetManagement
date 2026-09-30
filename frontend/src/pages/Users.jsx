import { useEffect, useState } from "react";
import { getUsers } from "../services/api";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h2>Users</h2>
                    <p>Manage system users and assigned roles</p>
                </div>
            </div>

            <div className="data-card">
                <h3>User Information</h3>

                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Base ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.baseId || "Not Assigned"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Users;