const API_URL = "http://127.0.0.1:8000";

export async function discover() {
  const response = await fetch(`${API_URL}/discover`);

  if (!response.ok) {
    throw new Error("Failed to discover devices");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to load projects");
  }

  return data.projects;
}

export async function createProject(project: unknown) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to create project");
  }

  return data.project;
}

export async function getCommands(projectId?: string | null) {
  const url = projectId
    ? `${API_URL}/commands?project_id=${projectId}`
    : `${API_URL}/commands`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load commands");
  }

  return response.json();
}

export async function learnCommand(command: unknown) {
  const response = await fetch(`${API_URL}/commands/learn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Learning failed");
  }

  return data;
}

export async function sendCommand(commandId: string) {
  const response = await fetch(`${API_URL}/commands/send/${commandId}`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Send failed");
  }

  return data;
}

export async function verifyCommand(commandId: string, verified: boolean) {
  const response = await fetch(`${API_URL}/commands/${commandId}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ verified }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Verify failed");
  }

  return data;
}

export async function deleteCommand(commandId: string) {
  const response = await fetch(`${API_URL}/commands/${commandId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Delete failed");
  }

  return data;
}

export async function sendLastCommand() {
  const response = await fetch(`${API_URL}/commands/send-last`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Test failed");
  }

  return data;
}