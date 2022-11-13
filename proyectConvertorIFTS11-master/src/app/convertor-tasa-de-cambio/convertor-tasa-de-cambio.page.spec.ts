import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConvertorTasaDeCambioPage } from './convertor-tasa-de-cambio.page';

describe('ConvertorTasaDeCambioPage', () => {
  let component: ConvertorTasaDeCambioPage;
  let fixture: ComponentFixture<ConvertorTasaDeCambioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertorTasaDeCambioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertorTasaDeCambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
