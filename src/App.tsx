import { useState } from "react";
import { Shell } from "./components/layout/Shell";
import { Heading } from "./components/ui/Heading";
import { InventoryManager } from "./features/inventory/InventoryManager";
import type { ModuleId } from "./types";

function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dash");
  return (
    <Shell activeModule={activeModule} onModuleChange={setActiveModule}>
      {/* The Router Logic: Show the right module based on state */}
      {activeModule === "dash" && (
        <>
          <Heading level={1}>System Overview</Heading>
          <p>Welcome to the Nexus nerve center.</p>
        </>
      )}
      {activeModule === "inv" && <InventoryManager />}
      {/* Fallback for modules we haven't built yet */}
      {(activeModule === "crm" || activeModule === "fin") && (
        <Heading level={1}>Module Coming Soon</Heading>
      )}
    </Shell>
  );
}

export default App;
