// src/api.js
const API_URL = import.meta.env.VITE_API_URL;

// List all records in a sheet
export async function listRecords(sheet) {
  const url = `${API_URL}?sheet=${sheet}&action=list`;
  const res = await fetch(url);
  return res.json();
}

// Get a single record by id
export async function getRecord(sheet, id) {
  const url = `${API_URL}?sheet=${sheet}&action=get&id=${id}`;
  const res = await fetch(url);
  return res.json();
}

// Create a new record
export async function createRecord(sheet, data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      sheet,
      action: "create",
      ...data,
    }),
  });
  return res.json();
}
