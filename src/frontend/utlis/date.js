export const getDaysToGo = (targetDateString) => {
  // Convert the target date string to a Date object
  const targetDate = new Date(targetDateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the target date and current date
  const timeDifferenceMs = targetDate.getTime() - currentDate.getTime();

  // Convert the time difference to days
  return Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));
};
