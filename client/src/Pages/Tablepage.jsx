import React, { useEffect, useState } from "react";
import "../Styles/Tablepage.css";  
import { FaCog, FaTimes } from "react-icons/fa";
import { Backend_api } from "../constant";
import axios from "axios";

const Tablepage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${Backend_api}/allUsers`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
                setData(response.data.users);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSettings = (id) => {
        alert(`Settings clicked for user ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete clicked for user ID: ${id}`);
    };

    const handleStatusChange = async (id, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `${Backend_api}/updateStatus`,
                { userId: id, status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
            setData((prevData) =>
                prevData.map((user) =>
                    user.id === id ? { ...user, status: newStatus } : user
                )
            );
        } catch (err) {
            console.error('Error changing user status:', err.message);
        }
    };

    if (loading) {
        return <div className="table-container">Loading...</div>;
    }

    return (
        <div className="table-container">
            <h1>User Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td className="user_name">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>
                                {/* Status dropdown */}
                                <select
                                    value={user.status || "Unknown"}
                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="icon-button"
                                    onClick={() => handleSettings(user.id)}
                                    title="Settings"
                                >
                                    <FaCog />
                                </button>
                                <button
                                    className="icon-button delete"
                                    onClick={() => handleDelete(user.id)}
                                    title="Delete"
                                >
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tablepage;
