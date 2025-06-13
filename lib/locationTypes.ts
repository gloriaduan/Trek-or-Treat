export interface PostLocationInput {
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  images: { url: string }[];
}

export interface UpdateLocationInput {
  description: string;
}

export interface SubmitRatingInput {
  locationId: string;
  rating: number;
}
