from app.models.project import Project
from app.repositories.project_repository import ProjectRepository


class ProjectService:
    def __init__(self, repository: ProjectRepository):
        self.repository = repository

    def get_projects(self):
        return self.repository.get_all()

    def create_project(
        self,
        name: str,
        brand: str,
        model: str,
        device_type: str = "air_conditioner",
        protocol: str = "broadlink",
    ):
        project = Project(
            name=name,
            brand=brand,
            model=model,
            device_type=device_type,
            protocol=protocol,
        )

        return self.repository.add(project.model_dump())