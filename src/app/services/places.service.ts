import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
const ApiKey= 'AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas';
export class PlacesService {

  constructor(private http: HttpClient) { }

  public getPlaces(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=tourist_attraction&language=english&key=${ApiKey}`);
  }

  public getPlaceWithId(place_id: number) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${ApiKey}`);
  }

  public getRestaurants(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=restaurant&language=english&key=${ApiKey}`);
  }

  public getTransits(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=transit_station&language=english&key=${ApiKey}`);
  }

  public getAirports(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=airports&language=english&key=${ApiKey}`);
  }

  public getHotels(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Stay%Resorts%${selectedPlace}&type=lodging&language=english&key=${ApiKey}`);
  }

  public getPhotos(photo_ref: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=${photo_ref}&key=${ApiKey}`,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        responseType: 'blob'});
  }

  public getPlaceDetails(place_id: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${ApiKey}`);
  }
}

