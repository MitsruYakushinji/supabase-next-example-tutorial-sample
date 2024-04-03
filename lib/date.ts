/**
 * 現在の日付の0時0分0秒をISO形式で取得する
 */
export function getDate(): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

/**
 * 現在の日付の翌日の0時0分0秒をISO形式で取得する
 */
export function getNextDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

/**
 * 日付のformatを行う(yyyy/mm/dd HH:mm:ss)
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = formatNumber(d.getMonth() + 1);
  const day = formatNumber(d.getDate());
  const hours = formatNumber(d.getHours());
  const minutes = formatNumber(d.getMinutes());
  const seconds = formatNumber(d.getSeconds());
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 2桁の数字であればそのまま、1桁の場合は先頭に0を付与する
 */
function formatNumber(num: number): string {
  return ('0' + num).slice(-2);
}
