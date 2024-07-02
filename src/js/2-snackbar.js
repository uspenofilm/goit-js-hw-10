import iziToast from 'izitoast';
import '../../node_modules/izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delay = form.querySelector('input');
const submit = form.querySelector('button');

submit.addEventListener('click', event => {
  const promise = new Promise((resolve, reject) => {
    event.preventDefault();
    const delayMs = +form.elements.delay.value;
    setTimeout(() => {
      if (form.elements.state.value === 'fulfilled') {
        resolve(`Fulfilled promise in ${delayMs}ms`);
      } else {
        reject(`Rejected promise in ${delayMs}ms`);
      }
    }, delayMs);
  });
  promise
    .then(value =>
      iziToast.show({
        message: value,
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '24px',
      })
    )
    .catch(error =>
      iziToast.show({
        message: error,
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '24px',
      })
    );
  form.reset();
});
