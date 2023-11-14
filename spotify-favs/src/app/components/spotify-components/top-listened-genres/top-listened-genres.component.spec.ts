import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListenedGenresComponent } from './top-listened-genres.component';

describe('TopListenedGenresComponent', () => {
  let component: TopListenedGenresComponent;
  let fixture: ComponentFixture<TopListenedGenresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopListenedGenresComponent]
    });
    fixture = TestBed.createComponent(TopListenedGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
