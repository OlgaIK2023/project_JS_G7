import {
  isBookAlreadyExist,
  deleteFromLS,
  saveToLS,
  loadFromLS,
} from './local-storage';

import amazonIcon from '../img/amazon.png';
import appleIcon from '../img/apple.png';
import sprite from '../img/icons.svg';

export const showBoockDetails = book => {
  renderModalwindow(book);

  const modal = document.querySelector('.backdrop');
  const closeModalWindow = document.querySelector('.close-modal');

  closeModalWindow.addEventListener('click', closeModal);
  modal.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', keydownHandler);
};

async function renderModalwindow(book) {
  const markup = `<div class="backdrop">
  <div class="modal">
    <button class="close-modal">
      <svg class="modal-svg-close" width="24" height="24">
        <use href="${sprite}#icon-x-close"></use>
      </svg>
    </button>

    <div class="desctop">
      <img src="${book.book_image}" alt="${book.title}" class="img-modal" />
      <div class="lauch">
        <div class="tittle-books">
          <h2 class="boock-name">${book.title}</h2>
          <p class="author">${book.author}</p>
        </div>

        <p class="about-book">
         ${book.description}
        </p>

        <ul class="sale-place">
          <li>
            <a href="${book.amazon_product_url}" target="_blank"
              ><img
                class="sale-place-links"
                src="${amazonIcon}"
                alt="amazon"
                width="62"
                height="19"
            /></a>
          </li>
          <li>
            <a href="${book.book_uri}" target="_blank"
              ><img
                class="sale-place-links"
                src="${appleIcon}"
                alt="amazon"
                width="33"
                height="32"
            /></a>
          </li>
        </ul>
      </div>
    </div>

    <button class="add-lokalstorage" type="button"></button>
    <p class="congrat"></p>
  </div>
</div>
`;
  const main = document.querySelector('main');
  main.insertAdjacentHTML('beforeend', markup);

  const addDelBtn = document.querySelector('.add-lokalstorage');
  const paragraphCongrat = document.querySelector('.congrat');

  function updateButtonAndText() {
    const isBookAlreadyAdded = isBookAlreadyExist(book._id);

    const buttonText = isBookAlreadyAdded
      ? 'REMOVE FROM THE SHOPPING LIST'
      : 'ADD TO SHOPPING LIST';
    const paragraphCongratText = isBookAlreadyAdded
      ? `Congratulations! You have added the book to the shopping list. To delete,
      press the button "Remove from the shopping list".`
      : '';

    addDelBtn.textContent = buttonText;
    paragraphCongrat.textContent = paragraphCongratText;
  }
  updateButtonAndText();

  addDelBtn.addEventListener('click', e => {
    e.preventDefault();
    const isBookAlreadyAdded = isBookAlreadyExist(book._id);

    console.log(isBookAlreadyAdded);

    if (isBookAlreadyAdded) {
      deleteFromLS(book._id);
    } else {
      saveToLS(book);
    }
    updateButtonAndText();
  });
}

function closeModal() {
  removeEventListeners();
  const modal = document.querySelector('.backdrop');
  modal.remove();
}

function removeEventListeners() {
  const modal = document.querySelector('.backdrop');
  const closeModalWindow = document.querySelector('.close-modal');
  closeModalWindow.removeEventListener('click', closeModal);
  modal.removeEventListener('click', modalClickHandler);
  document.removeEventListener('keydown', keydownHandler);
}

function modalClickHandler(event) {
  const modal = document.querySelector('.backdrop');
  if (event.target === modal) {
    closeModal();
  }
}

function keydownHandler(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
