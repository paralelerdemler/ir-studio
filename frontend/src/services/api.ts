const API_URL = "http://127.0.0.1:8000";

export async function discover() {
  const response = await fetch(`${API_URL}/discover`);

  if (!response.ok) {
    throw new Error("Failed to discover devices");
  }

  return response.json();
}

export async function getCommands() {
  const response = await fetch(`${API_URL}/commands`);

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
  const response = await fetch(
    `${API_URL}/commands/send/${commandId}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Send failed");
  }

  return data;
}

export async function verifyCommand(
  commandId: string,
  verified: boolean
) {
  const response = await fetch(
    `${API_URL}/commands/${commandId}/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verified,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Verify failed");
  }

  return data;
}

export async function deleteCommand(commandId: string) {
  const response = await fetch(
    `${API_URL}/commands/${commandId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Delete failed");
  }

  return data;
}