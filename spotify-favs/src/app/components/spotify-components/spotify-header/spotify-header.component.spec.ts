import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyHeaderComponent } from './spotify-header.component';

describe('SpotifyHeaderComponent', () => {
  let component: SpotifyHeaderComponent;
  let fixture: ComponentFixture<SpotifyHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyHeaderComponent]
    });
    fixture = TestBed.createComponent(SpotifyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
