export interface Photo {
    id: string;
    urls: {
      regular: string;
    };
    likes: number;
    downloads: number;
    views: number;
  }