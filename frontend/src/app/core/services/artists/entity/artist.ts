export interface Artist {
  id: string;
  name: string;
  slug: string;
  _count?: {
    songs: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
