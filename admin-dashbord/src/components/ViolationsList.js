import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const ViolationsList = () => {
    const [violations, setViolations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/violations");

                setViolations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Person</th>
                        <th scope="col">Type</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {violations.map(({ firstname, lastname, violations }) =>
                        violations.map(({ _id, type, time }) => (
                            <tr key={_id}>
                                <td>{`${firstname} ${lastname}`}</td>
                                <td>{type}</td>
                                <td>
                                    {moment(time).format("YYYY-MM-DD, h:mm")}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViolationsList;
