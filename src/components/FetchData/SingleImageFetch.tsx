import axios from 'axios';


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

const fetchSingleImage = async (imageId: string): Promise<PhotoWithDetails | null> => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
        params: {
          client_id: process.env.REACT_APP_API_KEY,
        },
      });
  
      if (response.data) {
        const photo = response.data;
        const additionalDetailsResponse = await axios.get(
          `https://api.unsplash.com/photos/${imageId}/statistics`,
          {
            params: {
              client_id: process.env.REACT_APP_API_KEY,
            },
          }
        );
  
        const additionalDetails = additionalDetailsResponse.data;
  
        return {
          id: photo.id,
          urls: photo.urls,
          likes: photo.likes,
          downloads: additionalDetails.downloads.total,
          views: photo.views,
        };
      } else {
        console.error('No image found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };
  
  export default fetchSingleImage;