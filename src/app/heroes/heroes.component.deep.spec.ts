import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HEROES } from "../mock-heroes";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDEs.length).toBe(3);
  });
});
