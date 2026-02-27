import type { ModuleId } from "../../types";

interface SidebarProps {
  activeId: ModuleId;
  onModuleChange: (id: ModuleId) => void;
}

const MODULES: { id: ModuleId; name: string }[] = [
  { id: "dash", name: "Dashboard" },
  { id: "crm", name: "Client Manger" },
  { id: "inv", name: "Inventory" },
  { id: "fin", name: "Financials" },
];

export const Sidebar = ({ activeId, onModuleChange }: SidebarProps) => {
  return (
    <aside className="nexus-sidebar">
      <div className="sidebar-header">
        <span className="badge">Active Modules</span>
      </div>
      <ul className="module-list" role="list">
        {MODULES.map((mod) => (
          <li key={mod.id} className="module-item">
            <button
              className={`module-btn ${activeId === mod.id ? "is-active" : ""}`}
              onClick={() => onModuleChange(mod.id)}
            >
              {mod.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
