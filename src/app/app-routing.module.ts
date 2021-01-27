import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddEditAdComponent } from './add-edit-ad/add-edit-ad.component';

const routes: Routes = [
  {path: 'index',  component: IndexComponent},
  {path: 'editad/:id', component: AddEditAdComponent},
  {path: 'createad', component: AddEditAdComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
