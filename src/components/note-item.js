class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .note {
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #f9f9f9;
        margin-bottom: 10px; 
      }
      
      .note h3 {
        margin-top: 0;
      }
      
      .note p {
        margin-bottom: 5px;
      }
      
      .delete-btn {
        background-color: #ff6347;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
      }
      
      .delete-btn:hover {
        background-color: #dc143c;
      }
    `;
    this.shadowRoot.appendChild(style);

    this.shadowRoot.innerHTML = `
      <div class="note">
        <h3></h3>
        <p></p>
        <p><strong>Created at:</strong> <span></span></p>
        <p><strong>Archived:</strong> <span></span></p>
        <p><strong>ID:</strong> <span></span></p>
        <button class="delete-btn">Delete</button>
      </div>
    `;
  }

  connectedCallback() {
    this.updateNote();
    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => this.deleteNote());
  }

  updateNote() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('created-at');
    const archived = this.getAttribute('archived');
    const id = this.getAttribute('id');

    this.shadowRoot.querySelector('h3').innerText = title;
    this.shadowRoot.querySelector('p:nth-child(2)').innerText = body;
    this.shadowRoot.querySelector('p:nth-child(3) span').innerText = createdAt;
    this.shadowRoot.querySelector('p:nth-child(4) span').innerText = archived;
    this.shadowRoot.querySelector('p:nth-child(5) span').innerText = id;
  }

  async deleteNote() {
    const noteId = this.getAttribute('id');

    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      const event = new CustomEvent('delete-note', { detail: { noteId } });
      this.dispatchEvent(event);
      this.remove();
    } catch (error) {
      console.error(`Error deleting note with ID ${noteId}:`, error);
      alert(`Error deleting note: ${error.message}`);
    }
  }
}

customElements.define('note-item', NoteItem);
