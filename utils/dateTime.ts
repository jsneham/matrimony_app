import { format, parse } from "date-fns";

export const parseTimeToDate = (value?: string): Date => {
  if (!value) return new Date();
  const match = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return new Date();
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
};

export const formatTime = (date: Date): string => format(date, "h:mm a");

export const formatNotificationDate = (value?: string): string => {
  if (!value) return "";

  const parsedDate = parse(value, "yyyy-MM-dd HH:mm:ss", new Date());
  if (Number.isNaN(parsedDate.getTime())) return value;

  return format(parsedDate, "MMM dd h:mma").replace(/(AM|PM)$/, (meridiem) =>
    meridiem.toLowerCase(),
  );
};
