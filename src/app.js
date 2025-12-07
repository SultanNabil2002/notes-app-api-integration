import { addNoteForm } from './components/add-note-form.js';
import { NotesList } from './components/note-list.js';
import { createNote, deleteNote } from './services/api.js';
import './components/footer-bar';
import './components/header-bar';

const mainElement = document.querySelector('main');

const container = document.createElement('div');
container.classList.add('container');
mainElement.appendChild(container);

container.appendChild(addNoteForm);

const loadingMessage = document.createElement('div');
loadingMessage.textContent = 'Loading...';
loadingMessage.style.display = 'none';
loadingMessage.id = 'loading-message';
container.appendChild(loadingMessage);

const notesList = new NotesList();
container.appendChild(notesList);

async function renderNotes() {
  const loadingMessage = document.getElementById('loading-message');
  loadingMessage.style.display = 'block';

  try {
    await notesList.fetchNotes();
  } catch (error) {
    console.error('Error rendering notes:', error);
  } finally {
    loadingMessage.style.display = 'none';
  }
}

// Menangani event "note-added" untuk memuat ulang daftar catatan
document.addEventListener('note-added', renderNotes);

renderNotes(); // Memanggil renderNotes saat aplikasi dimuat pertama kali

// Event listener untuk menghapus catatan
notesList.addEventListener('delete-note', async function (event) {
  const { noteId } = event.detail;
  try {
    await deleteNote(noteId);
    await renderNotes(); // Memanggil renderNotes setelah menghapus catatan
  } catch (error) {
    console.error(`Error deleting note with ID ${noteId}:`, error);
  }
});
