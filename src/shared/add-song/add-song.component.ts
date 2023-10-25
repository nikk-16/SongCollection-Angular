import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from 'src/shared/models/song.model';
import { SongInfoService } from '../services/song-info.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent {

  blue: ThemePalette = 'primary';

  songValues: FormGroup;
  songInfoService;

  songToBeAdded: Song = {
    id: '',
    songName: '',
    artistName: '',
    releaseYear: 0,
    numberOfStreams: 0,
    durationInSeconds: 0
  };

  constructor(private songInfoServices: SongInfoService) {
    this.songInfoService = songInfoServices;
    this.songValues = new FormGroup({
      songName: new FormControl('', Validators.required),
      artistName: new FormControl('', Validators.required),
      releaseYear: new FormControl<number | undefined>(undefined, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(4)]),
      numberOfStreams: new FormControl<number | undefined>(undefined, [Validators.required, Validators.pattern("^[0-9]*$")]),
      durationInSeconds: new FormControl<number | undefined>(undefined, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
    this.songValues.valueChanges.subscribe((e) => {
      this.songToBeAdded.id = this.songInfoService.songs[this.songInfoService.songs.length - 1].id + "" + (String)(Math.random());
      this.songToBeAdded.songName = e.songName;
      this.songToBeAdded.artistName = e.artistName;
      this.songToBeAdded.releaseYear = e.releaseYear;
      this.songToBeAdded.numberOfStreams = e.numberOfStreams;
      this.songToBeAdded.durationInSeconds = e.durationInSeconds;
    });
  }

  addToDirectory() {
    console.log(this.songToBeAdded)
    if (this.songToBeAdded.songName !== undefined && this.songToBeAdded.artistName !== undefined && this.songToBeAdded.releaseYear !== undefined && this.songToBeAdded.numberOfStreams !== undefined && this.songToBeAdded.durationInSeconds !== undefined) {
      this.songInfoService.addSong(this.songToBeAdded);
      alert("Song Added to Directory");
    }
    else {
      alert("Please fill all the details correctly")
    }
  }
}
