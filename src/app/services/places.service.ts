import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  public getPlaces(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=tourist_attraction&language=english&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }

  public getPlaceWithId(place_id: number) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`)
  }

  public getRestaurants(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=restaurant&language=english&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }

  public getTransits(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=transit_station&language=english&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }

  public getAirports(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedPlace}&type=airports&language=english&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }

  public getHotels(selectedPlace: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=Stay%Resorts%${selectedPlace}&type=lodging&language=english&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }

  public getPhotos(photo_ref: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxheight=300&photoreference=${photo_ref}&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        responseType: 'blob'});
  }

  public getPlaceDetails(place_id: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBJznufXo9JQcjNqnwITCZRfs_UyTJJYas`);
  }
}

