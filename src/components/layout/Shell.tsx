import React from "react";
import type { ModuleId } from "../../types";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface ShellProps {
  children: React.ReactNode;
  activeModule: ModuleId;
  onModuleChange: (id: ModuleId) => void;
}

export const Shell = ({
  children,
  activeModule,
  onModuleChange,
}: ShellProps) => {
  return (
    <div className="nexus-shell">
      <Navbar />
      <Sidebar activeId={activeModule} onModuleChange={onModuleChange} />
      <main className="nexus-content">{children}</main>
      <footer className="nexus-footer">
        <p>&copy; 2026 Nexus OS. Built for Scale</p>
      </footer>
    </div>
  );
};
