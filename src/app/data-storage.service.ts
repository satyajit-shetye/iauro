import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private students: Student[];
    constructor() {
        this.students = [
            {
                name: 'Mark Zuckerberg',
                course: 'Arts',
                center: 'Panvel',
                gender: 'Male',
                birthdate: new Date('05/04/1979')
            },
            {
                name: 'Allicia Musk',
                course: 'Commerce',
                center: 'Panaji',
                gender: 'Female',
                birthdate: new Date('05/04/1986')
            },
            {
                name: 'Tim O\'Reilly',
                course: 'Science',
                center: 'Paris',
                gender: 'Male',
                birthdate: new Date('09/14/1980')
            },
            {
                name: 'Jane Winer',
                course: 'Arts',
                center: 'Patna',
                gender: 'Female',
                birthdate: new Date('12/22/1985')
            },
            {
                name: 'Diana Graham',
                course: 'Commerce',
                center: 'Pune',
                gender: 'Female',
                birthdate: new Date('05/04/1986')
            }
        ];
    }

    add(student: Student){
        this.students.push(student);
    }

    remove(index: number){
        this.students.splice(index,1);
    }

    edit(student: Student, index: number){
        this.students[index] = student;
    }

    get(){
        return [...this.students];
    }

    getByIndex(index: number){
        return this.students[index] ? { ...this.students[index]} : null;
    }
}
