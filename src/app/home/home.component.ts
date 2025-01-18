import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {PlacesService} from '../services/places.service';
import {DomSanitizer} from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import {chunk, flatten} from 'lodash';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  places: any = [];
  otherPlaces: any = [];
  restaurants: any;
  hotels: any;
  transports: any;
  airports:any;
  selectedPlace: string = '';
  selectedDays: number = 1;
  slideIndex: number = 1;
  favourites: Number[] = [];

  // selectedDate: string;
  constructor(private placesService: PlacesService,
              private cd: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: Document,
              private sanitizer : DomSanitizer ){}

  ngOnInit() {
    console.log('came home')
    setTimeout(() => {
      this.showSlides(this.slideIndex);

    })
  }

  onSubmit() {
    this.placesService.getPlaces(this.selectedPlace).subscribe((data: any) => {
      data.results.map((p: any, index: number) => {
        if (p.photos) {
          this.placesService.getPhotos(p.photos[0].photo_reference).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              p['mySrc'] = reader.result;
              p.isFavourite = JSON.parse(localStorage.getItem('favourites') || '[]').includes(p.place_id);
            }, false);
            if (data) {
              reader.readAsDataURL(data);
            }
          });
        } else {
          p['mySrc'] = 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
        }
      });
      const chunkArray = chunk(data.results, Math.ceil(data.results.length / this.selectedDays) > 6 ? 6 : Math.ceil(data.results.length / this.selectedDays));
      this.places = chunkArray.slice(0, this.selectedDays);
      this.otherPlaces = flatten(chunkArray.slice(this.selectedDays, chunkArray.length));
    });
    this.placesService.getRestaurants(this.selectedPlace).subscribe((data: any) => {
      this.restaurants = data.results.slice(0, 7);
      console.log(this.restaurants,'this.restaurants');
      this.restaurants.map((r: any) => {
        if (r.photos) {
          this.placesService.getPhotos(r.photos[0].photo_reference).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              r['mySrc'] = reader.result ?? 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
            }, false);
            if (data) {
              reader.readAsDataURL(data);
            }
          });
        } else {
          r['mySrc'] = 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
        }
      });
    });

    this.placesService.getTransits(this.selectedPlace).subscribe((data: any) => {
      this.transports = data.results.slice(0, 5);
      this.transports.map((r: any) => {
        if (r.photos) {
          this.placesService.getPhotos(r.photos[0].photo_reference).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              r['mySrc'] = reader.result ?? 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
            }, false);
            if (data) {
              reader.readAsDataURL(data);
            }
          });
        } else {
          r['mySrc'] = 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
        }
      });
    });

    this.placesService.getHotels(this.selectedPlace).subscribe((data: any) => {
      this.hotels = data.results.slice(0, 5);
      this.hotels.map((r: any) => {
        if (r.photos) {
          this.placesService.getPhotos(r.photos[0].photo_reference).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              r['mySrc'] = reader.result ?? 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
            }, false);
            if (data) {
              reader.readAsDataURL(data);
            }
          });
        } else {
          r['mySrc'] = 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
        }
      });
    });

    this.placesService.getAirports(this.selectedPlace).subscribe((data: any) => {
      this.airports = data.results.slice(0, 5);
      this.airports.map((r: any) => {
        if (r.photos) {
          this.placesService.getPhotos(r.photos[0].photo_reference).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              r['mySrc'] = reader.result ?? 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
            }, false);
            if (data) {
              reader.readAsDataURL(data);
            }
          });
        } else {
          r['mySrc'] = 'https://www.yatra.com/content/globalcdn/bongo-cdn/images/hotel/no-photo.png';
        }
      });
    });

  }
  destMapOpen(place: any) {
    this.placesService.getPlaceDetails(place.place_id).subscribe((p:any) => {
      window.open(p.result.url)
    })
  }


  addorRemoveToFav(place: any) {
    place.isFavourite = !place.isFavourite;
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]') ?? [];
    if(this.favourites.includes(place.place_id)) {
      this.favourites = this.favourites.filter(f => f !== place.place_id);
    } else {
      this.favourites.push(place.place_id);
    }
    localStorage.setItem('favourites', JSON.stringify(this.favourites));

  }


  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i;
    let slides = Array.from(this.document.getElementsByClassName("question-container") as HTMLCollectionOf<HTMLElement>);
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[this.slideIndex-1].style.display = "block";
  }

}
