const addNoteForm = document.createElement('form');
addNoteForm.id = 'add-note-form';
addNoteForm.innerHTML = `
  <input type="text" id="note-title" placeholder="Title" required>
  <textarea id="note-body" placeholder="Body" required></textarea>
  <button type="submit" id="add-note-btn">Add Note</button>
  <div id="loading-message" style="display: none;">Loading...</div>
`;

addNoteForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const title = this.querySelector('#note-title').value.trim();
  const body = this.querySelector('#note-body').value.trim();
  const loadingMessage = this.querySelector('#loading-message');

  if (title && body) {
    const addButton = this.querySelector('#add-note-btn');
    addButton.setAttribute('disabled', 'disabled'); // Menonaktifkan tombol

    try {
      loadingMessage.style.display = 'block'; // Tampilkan pesan loading

      const newNote = {
        title,
        body
      };

      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

      if (!response.ok) {
        throw new Error('Failed to create note.');
      }

      const responseData = await response.json();
      alert(responseData.message);

      // Melemparkan event custom "note-added" setelah catatan ditambahkan
      const event = new CustomEvent('note-added');
      document.dispatchEvent(event);

      this.reset(); // Reset formulir setelah berhasil menambahkan catatan
    } catch (error) {
      alert('An error occurred while creating the note.');
      console.error(error);
    } finally {
      loadingMessage.style.display = 'none'; // Sembunyikan pesan loading
      addButton.removeAttribute('disabled'); // Aktifkan kembali tombol
    }
  } else {
    alert('Please enter both title and body of the note.');
  }
});

export { addNoteForm };
