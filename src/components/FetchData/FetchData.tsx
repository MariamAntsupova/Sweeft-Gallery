import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const imagesNum = 20;

interface Photo {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  likes: number;
  downloads: number;
  views: number;
}

interface PhotoWithDetails extends Photo {
  likes: number;
  downloads: number;
  views: number;
}



const fetchData = async (searchValue: string): Promise<PhotoWithDetails[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: 1,
        per_page: imagesNum,
        query: searchValue,
        client_id: process.env.REACT_APP_API_KEY,
      },
    });
    return response.data.results.map((photo: any) => ({
      id: photo.id,
      urls: photo.urls,
      likes: photo.likes,
      downloads: photo.downloads,
      views: photo.views,
    }));
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default fetchData;