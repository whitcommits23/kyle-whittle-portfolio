// Contact form: characters left in the message box
const messageField = document.getElementById('message');
const charLeft = document.getElementById('characterLeft');

if (messageField && charLeft) {
  const max = messageField.maxLength;
  messageField.addEventListener('input', () => {
    const left = max - messageField.value.length;
    charLeft.textContent = left === 1 ? '1 character left' : `${left} characters left`;
  });
}

// Portfolio: step through screenshots in a gallery figure
document.querySelectorAll('.gallery').forEach((gallery) => {
  const images = gallery.dataset.images.split(',');
  const img = gallery.querySelector('img');
  const counter = gallery.querySelector('.gallery-counter');
  let i = 0;

  const show = (next) => {
    i = (next + images.length) % images.length;
    img.src = images[i];
    counter.textContent = `${i + 1} of ${images.length}`;
  };

  gallery.querySelector('.gallery-prev').addEventListener('click', () => show(i - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => show(i + 1));
});
