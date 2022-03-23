const remove = document.querySelectorAll('.remove')
const check = document.querySelectorAll('.check')
const buttonClose = document.querySelector('#close')
const modal = document.querySelector('.modal-wrapper')

function modalShow(element) {
  for(const el of element) {
    el.addEventListener('click', function() {
      modal.classList.add('show')
    })
  }
}

function modalClose() {
  modal.classList.remove('show')
}

buttonClose.addEventListener('click', modalClose)

modalShow(check)
modalShow(remove)
