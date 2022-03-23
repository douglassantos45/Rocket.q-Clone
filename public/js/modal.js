export default class Modal {
  open() {
    document.querySelector('.modal-wrapper').classList.add('show');
  }

  close() {
    document.querySelector('.modal-wrapper').classList.remove('show');
  }
}
