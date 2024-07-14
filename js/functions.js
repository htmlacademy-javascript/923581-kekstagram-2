
// Функция №1
const stringLength = (string, length) => {
  if (string.replaceAll(' ', '').length <= length) {
    return true;
  } else {
    return false;
  }
}

console.log(stringLength('но мы не можем его изменить', 30));

// Функция №2
const isPalindrome = (string) => {
  let normalizedString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString.at(i);
  }
  return newString === normalizedString;
}

console.log(isPalindrome('Лёша на полке клопа нашёл'));
console.log(isPalindrome('ДовОд'));



