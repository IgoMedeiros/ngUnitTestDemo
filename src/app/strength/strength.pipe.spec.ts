import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(5);

    expect(val).toEqual('5 (weak)');
  });

  it('should display strond if strength is 10', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(10);

    expect(val).toEqual('10 (strong)');
  });

  it('should display unbelievable if strength is greater than 19', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(20);

    expect(val).toEqual('20 (unbelievable)');
  });
});
