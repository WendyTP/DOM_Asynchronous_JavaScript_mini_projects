
/*
Approach: mark-up a single modal element that is shown when any team member list item is clicked,
  and then dynamically set the content for the modal depending on which team member was clicked.
- how to create markup modal + overlay element ? (include cross image for closing)
- how to position overlay with css?
- set click event on ul
- retrieve right member name and image
- insert right member name and image, and content to markup modal (section ?)
- how to create markup modal + overlay element ? (include cross image for closing)
- how to position overlay with css?

*/


document.addEventListener('DOMContentLoaded', event => {
  let teamLinks = document.querySelectorAll('#team li > a');
  let modalOverlay = document.getElementById('modal-overlay');
  let modal = document.getElementById('modal');
  let modalTitle = modal.querySelector('h3');
  let modalImg = modal.querySelector('img');
  let modalText = modal.querySelector('p');

  function showModal(link) {
    modalTitle.textContent = link.dataset.name;
    modalImg.src = link.dataset.image;
    modalImg.alt = link.dataset.name;
    modalText.textContent = link.dataset.content;
    modalOverlay.classList.replace('hide','show');
    modal.classList.replace('hide', 'show');
  }

  function hideModal() {
    event.preventDefault();
    modalTitle.textContent = '';
    modalImg.src = '';
    modalImg.alt = '';
    modalText.textContent = '';
    modalOverlay.classList.replace('show', 'hide');
    modal.classList.replace('show', 'hide');
  }

  
  teamLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showModal(link);
    });
  });
  modalOverlay.addEventListener('click', event => {
    event.preventDefault();
    hideModal();
  });
  document.querySelector('#modal a.close').addEventListener('click', event => {
    event.preventDefault();
    hideModal();
  });
});