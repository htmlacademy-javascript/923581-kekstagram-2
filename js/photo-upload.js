const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const radioPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const imageUrl = URL.createObjectURL(file);
  if (matches) {
    preview.src = imageUrl;
  }

  radioPreviews.forEach((item) => {
    item.style.backgroundImage = `url(${imageUrl})`;
  });
});
