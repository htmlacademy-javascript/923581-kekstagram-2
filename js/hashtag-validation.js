const MAX_HASHTAGS: number = 5; // Максимальное количество хэштегов
const MAX_SYMBOLS: number = 20; // Максимальная длина одного хэштега

let errorMessage: string = ''; // Сообщение об ошибке
const error = (): string => errorMessage; // Функция для получения сообщения об ошибке

const isHashtagsValid = (value: string): boolean => {
  errorMessage = ''; // Сброс сообщения об ошибке
  const inputText: string = value.toLowerCase().trim(); // Приведение текста к нижнему регистру и удаление пробелов

  // Проверка на пустой ввод
  if (!inputText) {
    return true;
  }

  const inputArray: string[] = inputText.split(/\s+/); // Разделение текста на массив хэштегов

  const rules: { check: boolean; error: string }[] = [
    {
      check: inputArray.some((item: string): boolean => item.length === 0), // Проверка на пустые хэштеги
      error: 'Не может быть пустых хэштегов',
    },
    {
      check: inputArray.some((item: string) => item.slice(1).includes('#')),
      error: 'Хэштеги не могут содержать символ \'#\' в середине',
    },
    {
      check: inputArray.some((item: string): boolean => item[0] !== '#'),
      error: 'Каждый хэштег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item: string, num: number, array: string[]) => array.includes(item, num + 1)),
      error: 'Хэштеги не могут повторяться',
    },
    {
      check: inputArray.some((item: string): boolean => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, пожалуйста, исправьте`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя использовать больше ${MAX_HASHTAGS} хэштегов`,
    },
    {
      check: inputArray.some((item: string) => !/^#[a-zA-Z0-9é]{1,19}$/i.test(item)), // Проверка формата хэштегов с помощью регулярного выражения
      error: 'Некорректный формат хэштега',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error; // Установка сообщения об ошибке
    }
    return !isInvalid; // Возвращаем true, если нет ошибок
  });
};

export { error, isHashtagsValid }; // Экспортируем функции
