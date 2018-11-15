import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceProviderService, BreadcrumbService, ApplicationModelService } from './@ir';
import { SubscriptionsService } from '../shared/services/subscriptions.service';
import { UsageService } from '../shared/services/usage.service';
import { UsageDetailComponent } from './usage-detail.component';

describe('UsageDetailComponent', () => {
  let fixture: ComponentFixture<UsageDetailComponent>;
  let component: UsageDetailComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsageDetailComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        ServiceProviderService,
        SubscriptionsService,
        UsageService,
        BreadcrumbService,
        ApplicationModelService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
