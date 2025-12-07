import './note-item.js';

export class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 20px auto;
        }
      </style>
      <div class="container" id="notes-list"></div>
    `;
  }

  async fetchNotes() {
    const notesList = this.shadowRoot.getElementById('notes-list');
    notesList.innerHTML = ''; // Kosongkan daftar sebelum mengisi ulang

    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const data = await response.json();

      if (data.status === 'success') {
        data.data.forEach(note => {
          const noteElement = document.createElement('note-item');
          noteElement.setAttribute('title', note.title);
          noteElement.setAttribute('body', note.body);
          noteElement.setAttribute('created-at', note.createdAt);
          noteElement.setAttribute('archived', note.archived ? 'Yes' : 'No');
          noteElement.setAttribute('id', note.id);
          notesList.appendChild(noteElement);
        });
      } else {
        throw new Error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
}

customElements.define('notes-list', NotesList);
