import React, { useEffect, useState } from "react";
import { listRecords, createRecord } from "./api";

export default function App() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({});

  // Load all requests on mount
  useEffect(() => {
    async function loadRequests() {
      const data = await listRecords("skin_check_requests");
      setRequests(data);
    }
    loadRequests();
  }, []);

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    await createRecord("skin_check_requests", form);
    // Reload the list
    const updated = await listRecords("skin_check_requests");
    setRequests(updated);
  }

  return (
    <div>
      <h2>Skin Check Requests</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="requestid"
          placeholder="Request ID"
          onChange={e => setForm(f => ({ ...f, requestid: e.target.value }))}
        />
        <input
          name="employeename"
          placeholder="Employee Name"
          onChange={e => setForm(f => ({ ...f, employeename: e.target.value }))}
        />
        {/* Add more input fields here for department, email, etc. */}
        <button type="submit">Create Request</button>
      </form>
      <ul>
        {requests.map(r => (
          <li key={r.id}>
            {r.requestid} — {r.employeename}
          </li>
        ))}
      </ul>
    </div>
  );
}
