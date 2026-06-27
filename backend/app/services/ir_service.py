from app.drivers.broadlink_driver import BroadlinkDriver
from app.storage.command_repository import CommandRepository


class IRService:
    def __init__(
        self,
        broadlink_driver: BroadlinkDriver,
        command_repository: CommandRepository,
    ):
        self.broadlink_driver = broadlink_driver
        self.command_repository = command_repository

    def learn_command(
        self,
        brand: str,
        model: str,
        name: str,
        state: dict,
    ):
        result = self.broadlink_driver.learn()

        command = self.command_repository.add({
            "brand": brand,
            "model": model,
            "name": name,
            "state": state,
            "code": result["code"],
            "length": result["length"],
        })

        return command

    def send_last_command(self):
        command = self.command_repository.get_last()

        if not command:
            raise RuntimeError("No saved commands found")

        self.broadlink_driver.send(command["code"])

        return command

    def send_command(self, command_id: str):
        command = self.command_repository.get_by_id(command_id)

        if not command:
            raise RuntimeError("Command not found")

        self.broadlink_driver.send(command["code"])

        return command

    def delete_command(self, command_id: str):
        deleted = self.command_repository.delete(command_id)

        if not deleted:
            raise RuntimeError("Command not found")

        return True

    def verify_command(self, command_id: str, verified: bool):
        command = self.command_repository.update(
            command_id,
            {"verified": verified},
        )

        if not command:
            raise RuntimeError("Command not found")

        return command