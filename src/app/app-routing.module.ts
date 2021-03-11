import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/student',
        pathMatch: 'full'
    },
    {
        path: 'student',
        children: [
            {
                path: '',
                component: StudentListComponent
            },
            {
                path: 'edit',
                component: StudentEditComponent
            },
            {
                path: 'edit/:id',
                component: StudentEditComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
