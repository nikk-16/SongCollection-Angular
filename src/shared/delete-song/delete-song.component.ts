import { Component } from '@angular/core';
import { SongInfoService } from 'src/shared/services/song-info.service';
import { Song } from 'src/shared/models/song.model';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent {
  songInfoService;
  selectedSongs: Song[];
  constructor(songInfoService: SongInfoService){
    this.songInfoService = songInfoService;
    this.selectedSongs = songInfoService.selectedSong;
  }

  deleteSongs(){
    if(this.selectedSongs.length > 0){
      this.songInfoService.deleteSelectedSongs();
      alert("Selected Songs Deleted");
    }
    else{
      alert("Nothing to Delete");
    }
  }
}
