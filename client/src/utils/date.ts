import { DateTime } from "luxon";

function getDatesForTwoWeeks() {
  const currentDate = DateTime.now();

  // Создаем массив для хранения дат на следующие две недели
  const dateList: string[] = [];

  // Добавляем текущую дату в массив
  dateList.push(currentDate.toFormat("dd.MM.yyyy"));

  // Создаем цикл для добавления следующих дат
  for (let i = 1; i < 14; i++) {
    // 14 дней в двух неделях
    const nextDate = currentDate.plus({ days: i });
    dateList.push(nextDate.toFormat("dd.MM.yyyy"));
  }

  return dateList;
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
