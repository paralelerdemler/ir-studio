import { NavLink, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="app">
      <div className="card">
        <h1>{title}</h1>
        <p className="subtitle">This page will be built soon.</p>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-title">IR Studio</div>

        <nav className="sidebar-nav">
          <NavLink to="/">🏠 Dashboard</NavLink>
          <NavLink to="/commands">📚 Commands</NavLink>
          <NavLink to="/learn">🎓 Learn</NavLink>
          <NavLink to="/analyzer">📊 Analyzer</NavLink>
          <NavLink to="/export">📤 Export</NavLink>
          <NavLink to="/settings">⚙️ Settings</NavLink>
        </nav>
      </aside>

      <main className="shell-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/commands" element={<PlaceholderPage title="Command Library" />} />
          <Route path="/learn" element={<PlaceholderPage title="Learn Wizard" />} />
          <Route path="/analyzer" element={<PlaceholderPage title="Analyzer" />} />
          <Route path="/export" element={<PlaceholderPage title="Export" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppRouter;