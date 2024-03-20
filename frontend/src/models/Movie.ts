export default interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids?: number[];
  genres?: {
    id: number,
    name: string
  }[],
  runtime?: number;
}