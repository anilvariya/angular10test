import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdComponent } from './add-edit-ad.component';

describe('AddEditAdComponent', () => {
  let component: AddEditAdComponent;
  let fixture: ComponentFixture<AddEditAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
