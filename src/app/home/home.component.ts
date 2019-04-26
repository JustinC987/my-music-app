import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MusicService } from '../music.service';
import { SongSearch } from '../models/song-search';
import { ArtistSearch } from '../models/artist-search';
import { AlbumSearch } from '../models/album-search';
import { DomSanitizer } from '@angular/platform-browser';

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
	public dataSource;
	public isSong = false;
	public isLoading = true;

	public musicTypes = [
		{ value: 'type1', viewValue: 'track' },
		{ value: 'type2', viewValue: 'artist' },
		{ value: 'type3', viewValue: 'album' }
	];
	displayedColumns: string[] = [ 'select', 'artist', 'song', 'album', 'preview' ];
	selection = new SelectionModel<SongSearch>(true, []);

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private formBuilder: FormBuilder, public musicService: MusicService, private dom: DomSanitizer) {}

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
				result.forEach((element) => {
					element.preview = this.dom.bypassSecurityTrustResourceUrl(element.preview);
				});

				this.songSearch = result;
				this.isSong = true;
				this.dataSource = new MatTableDataSource(result);
				// this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.isLoading = false;
			} else if (this.searchForm.controls['searchType'].value === 'album') {
				this.albumSearch = result;
				this.isSong = false;
				console.log('Album Search ', this.albumSearch);
			} else if (this.searchForm.controls['searchType'].value === 'artist') {
				this.artistSearch = result;
				this.isSong = false;
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

	/*
	* Mat-Table
	*/

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		if (this.dataSource) {
			const numSelected = this.selection.selected.length;
			const numRows = this.dataSource.data.length;
			return numSelected === numRows;
		}
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.dataSource) {
			this.isAllSelected()
				? this.selection.clear()
				: this.dataSource.data.forEach((row) => this.selection.select(row));
		}
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: SongSearch): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
	}
}
