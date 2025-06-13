export interface RouteLocationInput {
  id: string;
}

export interface AddRouteInput {
  name: string;
  description: string;
  locations: RouteLocationInput[];
}

export interface UpdateRouteInput {
  name: string;
  description: string;
}
