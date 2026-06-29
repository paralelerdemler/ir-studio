type Project = {
  id: string;
  name: string;
};

type Props = {
  projects: Project[];
  selectedProjectId: string | null;
  onChange: (projectId: string) => void;
};

function ProjectSelector({
  projects,
  selectedProjectId,
  onChange,
}: Props) {
  return (
    <div className="project-switcher">
      <div>
        <span className="subtitle">Current Project</span>

        <strong>
          {projects.find((p) => p.id === selectedProjectId)?.name ??
            "No project selected"}
        </strong>
      </div>

      <select
        value={selectedProjectId ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectSelector;