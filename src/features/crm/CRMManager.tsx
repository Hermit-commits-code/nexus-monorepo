import { useState } from "react";
import { Heading } from "../../components/ui/Heading";
import type { Client } from "../../types";

const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "contact@acme.com",
    status: "active",
    lastContact: "2026-02-20",
  },
  {
    id: "2",
    name: "Stark Industries",
    email: "tony@stark.com",
    status: "lead",
    lastContact: "2026-02-25",
  },
];

export const CRMManager = () => {
  const [clients] = useState<Client[]>(MOCK_CLIENTS);
  return (
    <section className="crm-module">
      <header className="module-header">
        <div className="header-main">
          <Heading level={2}>Client Relations</Heading>
        </div>
      </header>

      <table className="nexus-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Contact</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <strong>{client.name}</strong>
              </td>
              <td>{client.email}</td>
              <td>
                <span className={`badge badge-${client.status}`}>
                  {client.status}
                </span>
              </td>
              <td>{client.lastContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
