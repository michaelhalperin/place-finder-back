import { Request, Response } from 'express';
import axios from 'axios';
import { Place } from '../models/Place';
import { config } from '../config/config';
import { formatResponse } from '../utils/responseFormatter';
import { Activity } from '../types';

export const placeController = {
  async getNearbyPlaces(req: Request, res: Response) {
    try {
      const { latitude, longitude, radius = 5000 } = req.query;
      
      const places = await Place.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)]
            },
            $maxDistance: Number(radius)
          }
        }
      }).lean();

      res.json(formatResponse<Activity[]>(places));
    } catch (error) {
      res.status(500).json(formatResponse(undefined, 'Error fetching nearby places'));
    }
  },

  async getPlaceDetails(req: Request, res: Response) {
    try {
      const { placeId } = req.params;
      
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: config.googlePlacesApiKey,
          },
        }
      );

      res.json(response.data.result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching place details' });
    }
  },

  async getRecommendedPlaces(req: Request, res: Response) {
    try {
      const { userSettings } = req.query;
      
      // Implement your recommendation logic here
      const places = await Place.find({
        tags: { $in: Object.values(userSettings as object) },
      });

      res.json(places);
    } catch (error) {
      res.status(500).json({ message: 'Error getting recommendations' });
    }
  }
};
