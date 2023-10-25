import { Injectable } from '@angular/core';
import { Song } from 'src/shared/models/song.model';
import { allSongs } from './songs';


@Injectable({
  providedIn: 'root',
})
export class SongInfoService {
  songs: Song[];
  
  selectedItems: number = 0;
  selectedSong: Song[] = [];


  constructor() {
    this.songs = allSongs;
  }

  // calculate duration in minutes and seconds to show
  calculateDuration(duration: number): string {
    let minutes: number = Math.floor(duration / 60);
    let seconds: number = duration - minutes * 60;
    let result: string = (minutes < 10 ? '0' + minutes : minutes) + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
    return result;
  }

  //filter on songs with song name and artist name
  filterOnSongs(songName:string, artistName:string): Song[]{
    const returnArray = this.songs.filter((song) =>
      song.artistName?.trim().toLowerCase().includes(artistName?.trim().toLowerCase()) && song.songName?.trim().toLowerCase().includes(songName?.trim().toLowerCase())
    );
    // console.log(returnArray);
    return returnArray;
  }

  // display the songs with the page number
  displaySongs(pageIndex:number, pageSize: number, inDisplay:Song[]) {
    let toDisplay = [];
    for (let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize && i < inDisplay.length; i++)
      toDisplay.push(inDisplay[i]);
    return toDisplay;
  }

  // sort by ascending order
  sortByAsc(inDisplay: Song[], sortBy:string ): Song[]{
    const toSort = inDisplay;
    let sorted: Song[] = [];
    if(sortBy === 'songName')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.songName > second.songName ? -1 : 1),);
    else if(sortBy === 'releaseYear')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.releaseYear > second.releaseYear ? -1 : 1),);
    else if(sortBy === 'artistName')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.artistName > second.artistName ? -1 : 1),);
    else if(sortBy === 'numberOfStreams')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.numberOfStreams > second.numberOfStreams ? -1 : 1),);
    else if(sortBy === 'durationInSeconds')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.durationInSeconds > second.durationInSeconds ? -1 : 1),);
    return sorted;
  }
  // sort by desc order 
  sortByDesc(inDisplay: Song[], sortBy: string ): Song[]{
    const toSort = inDisplay;
    let sorted: Song[] = [];
    if(sortBy === 'songName')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.songName < second.songName ? -1 : 1),);
    else if(sortBy === 'releaseYear')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.releaseYear < second.releaseYear ? -1 : 1),);
    else if(sortBy === 'artistName')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.artistName < second.artistName ? -1 : 1),);
    else if(sortBy === 'numberOfStreams')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.numberOfStreams < second.numberOfStreams ? -1 : 1),);
    else if(sortBy === 'durationInSeconds')
      sorted = toSort.sort((first: Song, second: Song) => 0 - (first.durationInSeconds < second.durationInSeconds ? -1 : 1),);
    return sorted;
  }

  // select max-5 songs that can be deleted 
  selectSongs(event:Event, data: Song) {
    let checked = (event.target as HTMLInputElement).checked;
    if (this.selectedItems < 5 && checked) {
      this.selectedItems++;
      this.selectedSong.push(data);
    }
    else if (this.selectedItems <= 5 && !checked) {
      this.selectedItems--;
      this.selectedSong = this.selectedSong.filter((item: Song) => item.id !== data.id);
    }
    else {
      alert("You can select only 5 songs");
      (event.target as HTMLInputElement).checked = false;
    }
  }
  // delete the selected songs
  deleteSelectedSongs(){
    for(let i = 0; i < this.selectedSong.length; i++){
      this.songs = this.songs.filter((item: Song) => item.id !== this.selectedSong[i].id);
    }
    this.selectedSong = [];
    this.selectedItems = 0;
    console.log(this.songs);
    console.log(this.selectedSong);
  }

  // add song to the directory
  addSong(song: Song){
    this.songs.push(song);
  }
}
