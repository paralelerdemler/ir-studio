import json
import uuid
import time
from pathlib import Path


class CommandRepository:
    def __init__(self, data_file="../data/commands.json"):
        self.data_file = Path(data_file)

    def get_all(self):
        if not self.data_file.exists():
            return []

        return json.loads(self.data_file.read_text())

    def save_all(self, commands):
        self.data_file.parent.mkdir(exist_ok=True)
        self.data_file.write_text(json.dumps(commands, indent=2))

    def add(self, command):
        commands = self.get_all()

        command["id"] = str(uuid.uuid4())
        command["created_at"] = time.time()

        commands.append(command)

        self.save_all(commands)

        return command

    def get_last(self):
        commands = self.get_all()

        if not commands:
            return None

        return commands[-1]

    def get_by_id(self, command_id):
        commands = self.get_all()

        for command in commands:
            if command.get("id") == command_id:
                return command

        return None
    
    def delete(self, command_id):
        commands = self.get_all()

        new_commands = [
            command
            for command in commands
            if command.get("id") != command_id
        ]

        if len(new_commands) == len(commands):
            return False

        self.save_all(new_commands)

        return True