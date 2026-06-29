from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4
import time


class IRState(BaseModel):
    power: bool
    mode: str

    temperature: Optional[int] = None
    fan: Optional[int] = None

    vertical_swing: Optional[bool] = None
    horizontal_swing: Optional[bool] = None

    clean: Optional[bool] = None
    sleep: Optional[bool] = None
    eco: Optional[bool] = None

    display: Optional[bool] = None


class IRCommand(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    created_at: float = Field(default_factory=time.time)

    project_id: Optional[str] = None

    # Geçici (migration tamamlanınca kaldırılacak)
    brand: str
    model: str

    name: str

    state: IRState

    ir_code: str