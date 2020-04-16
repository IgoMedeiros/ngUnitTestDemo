import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { Hero } from "../hero";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroesService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];

    mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroesService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      const heroes = HEROES.filter(h => h.id !== 2) as Hero[];

      component.delete(HEROES[1]);

      expect(component.heroes).toEqual(heroes);
    });

    it('should call deleteHero with Hero param', () => {
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);

      expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    })
  });
});
