const isWithinWorkingHours = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  // Функция для преобразования времени в минуты
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Преобразуем время начала и конца рабочего дня и начала встречи в минуты
  const workDayStartMinutes = timeToMinutes(workDayStart);
  const workDayEndMinutes = timeToMinutes(workDayEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  // Вычисляем время окончания встречи
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;
  // Проверяем, укладывается ли встреча в рабочий день
  return (
    meetingStartMinutes >= workDayStartMinutes &&
    meetingEndMinutes <= workDayEndMinutes
  );
}

// примеры использования функции:
console.log(isWithinWorkingHours('08:00', '17:30', '14:00', 90)); // true
console.log(isWithinWorkingHours('8:0', '10:0', '8:0', 120));     // true
console.log(isWithinWorkingHours('08:00', '14:30', '14:00', 90)); // false
console.log(isWithinWorkingHours('14:00', '17:30', '08:0', 90));  // false
console.log(isWithinWorkingHours('8:00', '17:30', '08:00', 900)); // false
