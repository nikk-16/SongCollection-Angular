import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddSongComponent } from 'src/shared/add-song/add-song.component';
import { DeleteSongComponent } from 'src/shared/delete-song/delete-song.component';
import { Song } from 'src/shared/models/song.model';
import { SongInfoService } from 'src/shared/services/song-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SongCollection';
  songServices;

  displayedSongs: Song[] = []; // all the songs
  inDisplay: Song[] = []; // songs on which operations can be done and are just in display
  toDisplay: Song[] = []; // songs which are displayed on the screen(user view)

  pageIndex: number = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // theme palette for the filter on reactive forms
  blue: ThemePalette = 'primary';
  orange: ThemePalette = 'warn';

  // form group for filtering on both the form-controls
  searchForm: FormGroup;
  searchValue: string = '';
  
  // constructor to initialize songs to display and subscribe for any changes in forms
  constructor(songInfoService: SongInfoService, private dialog: MatDialog) {
    this.songServices = songInfoService;
    this.displayedSongs = songInfoService.songs;
    this.inDisplay = this.displayedSongs;
    this.searchForm = new FormGroup({
      songName: new FormControl(''),
      artistName: new FormControl(''),
    });
    this.searchForm.valueChanges.subscribe((e) => {
      this.inDisplay = this.songServices.filterOnSongs(e.songName as string, e.artistName as string);
      this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.inDisplay);
    });
  }

  // to display the songs in page number using pagination
  ngOnInit(): void {
    for (let i = this.pageIndex * this.pageSize; i < (this.pageIndex + 1) * this.pageSize; i++ )
      this.toDisplay.push(this.inDisplay[i]);
  }

  onChangePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.inDisplay);
  }

  // displaying the duration in minutes and seconds 
  displayInMinutes(songDuration: number): string{
    return this.songServices.calculateDuration(songDuration);
  }

  // sorting
  sortByAsc(sortBy: string){
    this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.songServices.sortByAsc(this.inDisplay, sortBy));
  }
  sortByDesc(sortBy: string){
    this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.songServices.sortByDesc(this.inDisplay, sortBy));
    console.log(this.inDisplay);
  }
  noSort(){
    console.log(this.inDisplay);
    this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.inDisplay);
  }

  // for selection of songs to be deleted 
  toggleSelection(event:Event, data: Song) {
    this.songServices.selectSongs(event, data);
  }

  // dialog for delete song
  openDialogForDeleteSongsComponent(){
    console.log('dialog opens')
    let dialogRef = this.dialog.open(DeleteSongComponent, {
      width:'60vw'
    });

    dialogRef.afterClosed().subscribe( () => {
      this.displayedSongs = this.songServices.songs;
      this.inDisplay = this.displayedSongs;
      this.toDisplay = this.songServices.displaySongs(this.pageIndex, this.pageSize, this.inDisplay);
    });
  }

  openDialogForAddSongsComponent(){
    this.dialog.open(AddSongComponent)
  }
}
