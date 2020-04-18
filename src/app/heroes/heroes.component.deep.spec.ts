import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HEROES } from "../mock-heroes";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ]
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

  it(`should call heroService.deleteHero
      when the Hero Component's
      delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        // heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should add a new hero to the hero list
      when the add button is clicked`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const name = 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(of({id: 4, name, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = name;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
    .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
