import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataStorageService } from './../data-storage.service'

@Component({
    selector: 'app-student-edit',
    templateUrl: './student-edit.component.html',
    styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

    courses: string[];
    centers: string[];
    filteredOptions?: Observable<string[]>;
    registerForm: FormGroup;
    studentIndex: number | null;

    constructor(private _dataStorage: DataStorageService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute) {
        this.courses = ['Science', 'Arts', 'Commerce'];
        this.centers = ['Pune', 'Patna', 'Panaji', 'Panvel', 'Paris'];
        this.registerForm = new FormGroup({});
        this.studentIndex = null;
    }

    ngOnInit() {
        this.registerForm.addControl('name', new FormControl(null, [Validators.required]));
        this.registerForm.addControl('course', new FormControl(null, [Validators.required]));
        this.registerForm.addControl('center', new FormControl(null, [Validators.required]));
        this.registerForm.addControl('birthdate', new FormControl(null, [Validators.required]));
        this.registerForm.addControl('gender', new FormControl('Male'));
        this.registerForm.addControl('terms', new FormControl(false, [Validators.requiredTrue]));
        this.filteredOptions = this.registerForm.get('center')?.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this.studentIndex = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

        if (this.studentIndex) {
            const student = this._dataStorage.getByIndex(this.studentIndex - 1);
            student && this.registerForm.setValue({ ...student, terms: false });
        }

    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.centers.filter((center: string) => center.toLowerCase().indexOf(filterValue) === 0);
    }

    onSubmit() {
        this.registerForm.markAsTouched();

        if (this.registerForm.invalid) {
            return;
        }

        if (!this.studentIndex) {
            this._dataStorage.add(this.registerForm.value);
            this._snackBar.open('Record added successfully.', '', {
                duration: 2000,
            });
        } else {
            this._dataStorage.edit(this.registerForm.value, this.studentIndex - 1);
            this._snackBar.open('Record updated successfully', '', {
                duration: 2000,
            });
        }

        this.router.navigate(['/'], { relativeTo: this.route });

    }

}
