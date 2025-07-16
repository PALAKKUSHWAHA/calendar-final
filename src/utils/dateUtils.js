import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, subDays } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

export const formatDateDisplay = (date) => {
  return format(date, 'MMM dd, yyyy');
};

export const formatTimeDisplay = (time) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return format(date, 'h:mm a');
};

export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  // Get first day of the calendar grid (previous month if needed)
  const startDate = subDays(monthStart, monthStart.getDay());
  
  // Get last day of the calendar grid (next month if needed)
  const endDate = addDays(monthEnd, 6 - monthEnd.getDay());
  
  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const isSameMonthAsDate = (date, month) => {
  return isSameMonth(date, month);
};