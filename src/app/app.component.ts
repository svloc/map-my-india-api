import { Component, OnInit } from '@angular/core';
import { MapServiceService } from './map-service.service';

declare var MapmyIndia: any;
declare var L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Map';
  public map : any;
  constructor(private mapService: MapServiceService) {
  }
  private token: string='397e77ca-d40e-4123-9a36-58c88e588e9f';

  ngOnInit(): void {
    this.map = new MapmyIndia.Map("map",{ center:[28.61, 77.23],zoomControl: true,hybrid:true });

    L.marker([28.61, 77.23]).addTo(this.map);

    this.mapService.getToken().then((data) => {
      this.token = data['access_token'];
      console.log(data['access token']);
      localStorage.setItem('Token',data['access_token'])
    });
  }

  auto() {
    this.mapService.autoSuggest(this.token).then((data) => {
      console.log(data);
    });
  }

  nearby() {
    this.mapService.nearby(this.token).then((data) => {
      console.log(data);
    });
  }

  geocode(){
    this.mapService.geocode(this.token).then((data) => {
      console.log(data);
    });
  }

  textsearch(){
    this.mapService.textsearch(this.token).then((data) => {
      console.log(data);
    });
  }

  distanceMatrix() {
    // tslint:disable-next-line: max-line-length
    this.mapService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/distance_matrix/driving/77.983936,28.255904;77.05993,28.487555;77.15993,28.587555;77.264997,28.554534?sources=0;1&destinations=2;3').then(function(data) {
        console.log(data);
    });
  }

  Rev_geocode() {
    // tslint:disable-next-line: max-line-length
    this.mapService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/rev_geocode?lng=77.22479939&lat=28.66289505').then(function(data) {
        console.log(data);
    });
  }

  route_adv() {
      // tslint:disable-next-line: max-line-length
    this.mapService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/route_adv/driving/77.227434,28.610981;77.212021,28.616679?alternatives=true&&geometries=polyline&overview=full&exclude=&steps=true&region=ind').then(function(data) {
        console.log(data);
    });
  }

  route_eta() {
      // tslint:disable-next-line: max-line-length
    this.mapService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/route_eta/driving/77.227434,28.610981;77.212021,28.616679?alternatives=true&&geometries=polyline&overview=full&exclude=&steps=true&region=ind').then(function(data) {
        console.log(data);
    });
  }

}
