import { useEffect, useState } from "react";
import { getAuditLogs } from "../services/api";

function AuditLogs() {
    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {
        getAuditLogs()
            .then((data) => {
                setAuditLogs(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h2>Audit Logs</h2>
                    <p>Track system activities and asset operations</p>
                </div>
            </div>

            <div className="data-card">
                <h3>Activity History</h3>

                {auditLogs.length === 0 ? (
                    <p>No audit logs found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Action</th>
                                <th>Details</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>

                        <tbody>
                            {auditLogs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.id}</td>
                                    <td>{log.action}</td>
                                    <td>{log.details}</td>
                                    <td>{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AuditLogs;