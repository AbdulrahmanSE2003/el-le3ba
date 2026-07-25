export function formatDate(dateInput: number | string = Date.now()) {
  const date = new Date(dateInput);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
