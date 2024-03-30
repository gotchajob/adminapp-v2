//@ts-ignore
import numeral from "numeral";
import { format, formatDistanceToNow, getTime, parseISO } from "date-fns";

export const formatNumber = (number: number) => {
  if (number !== undefined) {
    return number.toLocaleString("en-US");
  }
};
export const formatDate = (date: string, pattern: string) => {
  return date ? format(parseISO(date), pattern) : "";
};

// ----------------------------------------------------------------------

export function fDate(date: string, newFormat: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: string, newFormat: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: string) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: string) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

// ----------------------------------------------------------------------

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fCurrency(number: number) {
  const format = number ? numeral(number).format("$0,0.00") : "0";

  return result(format, ".00");
}

export function fPercent(number: number) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "0";

  return result(format, ".0");
}

export function fShortenNumber(number: number) {
  const format = number ? numeral(number).format("0.00a") : "0";

  return result(format, ".00");
}

export function fData(number: number) {
  const format = number ? numeral(number).format("0.0 b") : "0";

  return result(format, ".0");
}

function result(format: any, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}

export function getAllDaysInMonth(month: number, year: number) {
  const days: string[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let day = 2; day <= daysInMonth; day++) {
    days.push(
      formatDate(new Date(year, month - 1, day).toISOString(), "MM/dd/yyyy")
    );
  }
  if (month === 12) {
    days.push(`01/01/${+year + 1}`);
  } else {
    days.push(`0${+month + 1}/01/${year}`);
  }
  return days;
}
