import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {PlacesService} from '../services/places.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: false,

  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit{
  favouriteIds: number[]= [];
  favourites: any = [];
  constructor(private placesService: PlacesService,
              private cd: ChangeDetectorRef,
              @Inject(DOCUMENT) private _doc: Document){}

  ngOnInit() {
    this.favouriteIds = JSON.parse(this._doc.defaultView?.localStorage?.getItem('favourites') ?? '[]');
    if(this.favouriteIds.length > 0) {
      this.favouriteIds.map((id: number) => {
        this.placesService.getPlaceWithId(id).subscribe((res: any) => {
          const place = res.result;
          if(place.photos) {
            this.placesService.getPhotos(place.photos[0].photo_reference).subscribe(data => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                place['mySrc'] = reader.result;
                this.favourites.push(place)
              }, false);
              if (data) {
                reader.readAsDataURL(data);
              }
            });
          }
        })
      });
    }
  }

  destMapOpen(place: any) {
    console.log(place, 'open');
    this.placesService.getPlaceDetails(place.place_id).subscribe((p:any) => {
      window.open(p.result.url)
    });
  }

  removeFromFavs(placeid: number) {
    this.favourites = this.favourites.filter((f: any) => f.place_id !== placeid);
    this.favouriteIds = JSON.parse(localStorage.getItem('favourites') || '[]') ?? [];
    if(this.favouriteIds.includes(placeid)) {
      this.favouriteIds = this.favouriteIds.filter((f:number) => f !== placeid);
    } else {
      this.favouriteIds.push(placeid);
    }
    localStorage.setItem('favourites', JSON.stringify(this.favouriteIds));

  }

}
