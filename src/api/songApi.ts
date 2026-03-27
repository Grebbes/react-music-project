const bestOverallSongs =
  "https://api.jamendo.com/v3.0/tracks/?client_id=470e7ef0&order=popularity_total&limit=3";
const bestMonthlySongs =
  "https://api.jamendo.com/v3.0/tracks/?client_id=470e7ef0&order=popularity_month&limit=3";
const bestWeeklySongs =
  "https://api.jamendo.com/v3.0/tracks/?client_id=470e7ef0&order=popularity_week&limit=3";

export interface Song {
  id: string;
  name: string;
  artist_name: string;
  album_image: string;
}

export async function getOverallPopularity() {
  const response = await fetch(bestOverallSongs);
  if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
  const data = await response.json();

  const overallSongs: Song[] = data.results;
  return overallSongs;
}

export async function getMonthlyPopularity() {
  const response = await fetch(bestMonthlySongs);
  if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
  const data = await response.json();
  const monthlySongs: Song[] = data.results;

  return monthlySongs;
}
export async function getWeeklyPopularity() {
  const response = await fetch(bestWeeklySongs);
  if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
  const data = await response.json();
  const weeklySongs: Song[] = data.results;

  return weeklySongs;
}
