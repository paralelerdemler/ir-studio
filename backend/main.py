from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.drivers.broadlink_driver import BroadlinkDriver
from app.models.ir_command import IRState
from app.repositories.project_repository import ProjectRepository
from app.services.ir_service import IRService
from app.services.project_service import ProjectService
from app.storage.command_repository import CommandRepository


class LearnCommandRequest(BaseModel):
    project_id: str | None = None

    brand: str
    model: str

    name: str

    state: IRState


class VerifyCommandRequest(BaseModel):
    verified: bool


class CreateProjectRequest(BaseModel):
    name: str
    brand: str
    model: str
    device_type: str = "air_conditioner"
    protocol: str = "broadlink"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

broadlink_driver = BroadlinkDriver()
command_repository = CommandRepository()
project_repository = ProjectRepository()

ir_service = IRService(broadlink_driver, command_repository)
project_service = ProjectService(project_repository)


@app.get("/")
def root():
    return {"message": "IR Studio API is running"}


@app.get("/discover")
def discover():
    return broadlink_driver.discover()


@app.get("/projects")
def get_projects():
    try:
        return {
            "ok": True,
            "projects": project_service.get_projects(),
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/projects")
def create_project(request: CreateProjectRequest):
    try:
        project = project_service.create_project(
            name=request.name,
            brand=request.brand,
            model=request.model,
            device_type=request.device_type,
            protocol=request.protocol,
        )

        return {
            "ok": True,
            "project": project,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.get("/commands")
def get_commands():
    return command_repository.get_all()


@app.post("/commands/learn")
def learn_command(request: LearnCommandRequest):
    try:
        command = ir_service.learn_command(
            project_id=request.project_id,
            brand=request.brand,
            model=request.model,
            name=request.name,
            state=request.state.model_dump(),
        )

        return {
            "ok": True,
            "command": command,
            "saved": True,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/commands/send/{command_id}")
def send_command(command_id: str):
    try:
        command = ir_service.send_command(command_id)

        return {
            "ok": True,
            "message": "Command sent",
            "command": command,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.delete("/commands/{command_id}")
def delete_command(command_id: str):
    try:
        ir_service.delete_command(command_id)

        return {
            "ok": True,
            "message": "Command deleted",
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/commands/{command_id}/verify")
def verify_command(command_id: str, request: VerifyCommandRequest):
    try:
        command = ir_service.verify_command(
            command_id,
            request.verified,
        )

        return {
            "ok": True,
            "command": command,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/commands/send-last")
def send_last():
    try:
        command = ir_service.send_last_command()

        return {
            "ok": True,
            "message": "Last saved IR sent",
            "command": command,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/clear-learning-buffer")
def clear_learning_buffer():
    try:
        result = broadlink_driver.clear_learning_buffer()

        return {
            "ok": True,
            "result": result,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}