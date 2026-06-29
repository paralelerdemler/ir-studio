import json
from pathlib import Path


class ProjectRepository:
    def __init__(self, data_file="../data/projects.json"):
        self.data_file = Path(data_file)

    def get_all(self):
        if not self.data_file.exists():
            return []

        return json.loads(self.data_file.read_text())

    def save_all(self, projects):
        self.data_file.parent.mkdir(exist_ok=True)
        self.data_file.write_text(json.dumps(projects, indent=2))

    def add(self, project):
        projects = self.get_all()
        projects.append(project)
        self.save_all(projects)

        return project

    def get_by_id(self, project_id):
        projects = self.get_all()

        for project in projects:
            if project.get("id") == project_id:
                return project

        return None