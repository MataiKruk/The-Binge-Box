export interface ShortMovie {
  title: string,
  poster_path: string,
  id: number,
  overview: string
}

export default interface Movie extends ShortMovie {
  original_title: string;
  release_date: string;
  genre_ids?: number[];
  genres?: {
    id: number,
    name: string
  }[],
  runtime?: number;
}