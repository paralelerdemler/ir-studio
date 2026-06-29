import { NavLink, Route, Routes } from "react-router-dom";

import ProjectSelector from "../components/ProjectSelector";
import { useProjects } from "../hooks/useProjects";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Commands from "../pages/Commands";
import Learn from "../pages/Learn";

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
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
  } = useProjects();

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-title">IR Studio</div>

        <ProjectSelector
          projects={projects}
          selectedProjectId={selectedProjectId}
          onChange={setSelectedProjectId}
        />

        <nav className="sidebar-nav">
          <NavLink to="/">🏠 Dashboard</NavLink>
          <NavLink to="/projects">📁 Projects</NavLink>
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/analyzer" element={<PlaceholderPage title="Analyzer" />} />
          <Route path="/export" element={<PlaceholderPage title="Export" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppRouter;