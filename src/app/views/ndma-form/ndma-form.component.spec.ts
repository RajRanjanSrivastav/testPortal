import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdmaFormComponent } from './ndma-form.component';

describe('NdmaFormComponent', () => {
  let component: NdmaFormComponent;
  let fixture: ComponentFixture<NdmaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdmaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
