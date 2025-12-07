const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

async function createNote(title, body) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

async function deleteNote(noteId) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting note with ID ${noteId}:`, error);
    throw error;
  }
}

export { getNotes, createNote, deleteNote };
