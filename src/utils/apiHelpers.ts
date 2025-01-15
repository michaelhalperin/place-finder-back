import axios from 'axios';
import { config } from '../config/config';
import { PlaceDetails } from '../types';

export const googlePlacesApi = {
  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: config.googlePlacesApiKey,
            fields: 'name,formatted_address,formatted_phone_number,website,rating,reviews',
          },
        }
      );
      return response.data.result;
    } catch (error) {
      throw new Error('Failed to fetch place details');
    }
  },

  async searchNearbyPlaces(latitude: number, longitude: number, radius: number = 5000) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${latitude},${longitude}`,
            radius,
            key: config.googlePlacesApiKey,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Failed to fetch nearby places');
    }
  }
};
