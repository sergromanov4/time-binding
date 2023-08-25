function getDatesForTwoWeeks() {
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 13); // Добавляем 13 дней для получения двух недель

  const datesArray = [];

  while (currentDate <= endDate) {
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    datesArray.push(formattedDate);

    currentDate.setDate(currentDate.getDate() + 1); // Увеличиваем текущую дату на 1 день
  }

  return datesArray;
}

function formatDateToDayMonth(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0"); // Получаем день и добавляем ведущий ноль, если нужно
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Получаем месяц (нумерация начинается с 0) и добавляем ведущий ноль, если нужно

  return `${day}.${month}`;
}

function formatDateToNumberAndDayString(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  return `${day} ${month}`;
}

export {
  getDatesForTwoWeeks,
  formatDateToDayMonth,
  formatDateToNumberAndDayString,
};
