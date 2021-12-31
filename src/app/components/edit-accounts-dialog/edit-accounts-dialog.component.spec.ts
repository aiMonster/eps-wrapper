import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountsDialogComponent } from './edit-accounts-dialog.component';

describe('EditAccountsDialogComponent', () => {
  let component: EditAccountsDialogComponent;
  let fixture: ComponentFixture<EditAccountsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccountsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
