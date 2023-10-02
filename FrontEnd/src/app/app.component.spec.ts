import { TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { TranslatePipeMock } from './test/mocks/pipes/translate.pipe.mock';
import { TranslateServiceMock } from './test/mocks/services/translate.service.mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent,
        TranslatePipeMock,
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
