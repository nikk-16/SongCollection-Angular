import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './add-song/add-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddSongComponent,
    DeleteSongComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
