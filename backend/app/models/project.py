from pydantic import BaseModel, Field
from typing import Literal, Optional
from uuid import uuid4
import time


DeviceType = Literal[
    "air_conditioner",
    "television",
    "fan",
    "audio",
    "custom",
]

ProtocolType = Literal[
    "broadlink",
]


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))

    name: str

    brand: str
    model: str

    device_type: DeviceType = "air_conditioner"
    protocol: ProtocolType = "broadlink"

    region: Optional[str] = None
    remote_type: Optional[str] = None
    notes: Optional[str] = None
    tags: list[str] = []

    created_at: float = Field(default_factory=time.time)
    updated_at: float = Field(default_factory=time.time)