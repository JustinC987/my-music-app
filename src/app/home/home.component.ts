import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { MusicService } from '../music.service';
import { SongSearch } from '../models/song-search';
import { ArtistSearch } from '../models/artist-search';
import { AlbumSearch } from '../models/album-search';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	public searchForm: FormGroup;
	public hasSubmit: boolean;
	public songSearch?: SongSearch[] = [];
	public artistSearch: ArtistSearch[];
	public albumSearch?: AlbumSearch[] = [];
	public musicTypes = [
		{ value: 'type1', viewValue: 'track' },
		{ value: 'type2', viewValue: 'artist' },
		{ value: 'type3', viewValue: 'album' }
	];

	constructor(private formBuilder: FormBuilder, public musicService: MusicService) {}

	ngOnInit() {
		this.createSearchForm();
	}

	createSearchForm() {
		this.searchForm = this.formBuilder.group({
			searchType: [ '', [ Validators.required ] ],
			searchContent: [ '', [ Validators.required ] ]
		});
	}

	getMusic() {
		this.musicService.getMusic({}).subscribe((result) => {
			if (this.searchForm.controls['searchType'].value === 'track') {
				this.songSearch = result;
				console.log('Song Search ', this.songSearch);
			} else if (this.searchForm.controls['searchType'].value === 'album') {
				this.albumSearch = result;
				console.log('Album Search ', this.albumSearch);
			} else if (this.searchForm.controls['searchType'].value === 'artist') {
				this.artistSearch = result;
				console.log('Artist Search ', this.artistSearch);
			}
		});
	}
	searchMusic() {
		const formData = this.searchForm.getRawValue();

		this.musicService.post(formData).subscribe((result) => {
			this.getMusic();
		});
	}

	validateField(fieldName: string) {
		const field = this.searchForm.get(fieldName);

		return this.hasSubmit && field && field.invalid && (field.dirty || field.touched);
	}

	check(fieldName: string, validator: string) {
		return this.searchForm.get(fieldName)['errors'][validator];
	}
}
