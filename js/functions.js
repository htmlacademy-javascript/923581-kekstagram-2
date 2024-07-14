
// Функция №1
console.log('Функция №1');
const stringLength = (string, length) => {
  let normalizedStr = string.replaceAll(' ', '');
  if (normalizedStr.length < length) {
    console.log('Строка короче ' + length + ' символов');
    return true;
  } else if (normalizedStr.length === length) {
    console.log('Длина строки ровно ' + length + ' символов');
    return true;
  } else if (normalizedStr.length > length) {
    console.log('Строка длиннее ' + length + ' символов');
    return false;
  }
}

console.log(stringLength('но мы не можем его изменить', 22));



// Функция №2
console.log('Функция №2');
const isPalindrome = (string) => {
  let normalizedString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString.at(i);
  }
  return newString === normalizedString;

}

console.log('Первый вариант -', isPalindrome('Лёша на полке клопа нашёл'));
console.log('Второй вариант -', isPalindrome('ДовОд'));
console.log('Третий вариант -', isPalindrome('АбраКадАбра'));



