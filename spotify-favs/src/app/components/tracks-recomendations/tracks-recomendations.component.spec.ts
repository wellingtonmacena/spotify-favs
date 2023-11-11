import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksRecomendationsComponent } from './tracks-recomendations.component';

describe('TracksRecomendationsComponent', () => {
  let component: TracksRecomendationsComponent;
  let fixture: ComponentFixture<TracksRecomendationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TracksRecomendationsComponent]
    });
    fixture = TestBed.createComponent(TracksRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
