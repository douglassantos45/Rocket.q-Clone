/* const remove = document.querySelectorAll('.remove');
const check = document.querySelectorAll('.check');
const buttonClose = document.querySelector('#close');
const modal = document.querySelector('.modal-wrapper');
const buttonSubmit = document.querySelector('form button');

buttonSubmit.addEventListener('click', function (el) {
  el.preventDefault();
  modalClose();
});

function modalShow(element) {
  for (const el of element) {
    el.addEventListener('click', function () {
      modal.classList.add('show');
    });
  }
}

function modalClose() {
  modal.classList.remove('show');
}

buttonClose.addEventListener('click', modalClose);

modalShow(check);
modalShow(remove);
 */

import Modal from './modal.js';

const checkButtons = document.querySelectorAll('.actions a.check');
const deleteButton = document.querySelectorAll('.actions a.remove');
const closeButton = document.querySelector('#close');

const roomId = document.querySelector('#room-id');
const form = document.querySelector('.modal form');

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButtonText = document.querySelector('.modal button');

function modalEvent(element, action, modal) {
  for (const el of element) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      const slug = !modal.buttonClass ? 'check' : 'delete';

      form.setAttribute(
        'action',
        `/room/${roomId.dataset.id}/${e.target.dataset.id}/${slug}`,
      );

      modalTitle.innerHTML = modal.title;
      modalDescription.innerHTML = modal.description;
      modalButtonText.innerHTML = modal.buttonText;

      modal.buttonClass
        ? modalButtonText.classList.add('red')
        : modalButtonText.classList.remove('red');

      action();
    });
  }
}

const modal = new Modal();

modalEvent(checkButtons, modal.open, {
  title: 'Marcar como lido',
  description: 'Tem certeza que você deseja marcar esta pergunta como lida?',
  buttonText: 'Sim, Marcar',
});
modalEvent(deleteButton, modal.open, {
  title: 'Excluir Pergunta',
  description: 'Tem certeza que você deseja excluir esta pergunta?',
  buttonText: 'Excluir',
  buttonClass: true,
});

closeButton.addEventListener('click', modal.close);

const createPass = document.querySelector('#create-pass');
