import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { Student } from '../student.model';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

    students : Student[];
    displayedColumns: string[];
    dataSource;

    constructor(private router:Router, private route:ActivatedRoute,
        private _dataStorage: DataStorageService,
        private _snackBar: MatSnackBar) {
        this.students = [];
        this.dataSource = new MatTableDataSource<Student>([]);
        this.displayedColumns = ['name', 'course', 'center', 'birthdate', 'gender', 'actions']
        }

    ngOnInit(): void {
        const students = this._dataStorage.get();
        this.dataSource.data = students;
    }

    onClickAdd() {
        this.router.navigate(['edit'], { relativeTo: this. route });
    }

    onClickDelete(index:number){
        this._dataStorage.remove(index);
        const students = this._dataStorage.get();
        this.dataSource.data = students;
        this._snackBar.open('Record deleted successfully', '', {
            duration: 2000,
        });
    }

    onClickEdit(index: number) {
        this.router.navigate(['edit', index + 1], { relativeTo: this.route });
    }

}
