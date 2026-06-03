import { MovieSynopsisPipe } from './movie-synopsis-pipe';

describe('MovieSynopsisPipe', () => {
  let pipe: MovieSynopsisPipe;

  beforeEach(() => {
    pipe = new MovieSynopsisPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return the same text if it is shorter than the limit', () => {
    const text = 'Filme ótimo!';
    expect(pipe.transform(text)).toBe(text);
  });

  it('should truncate text and add ellipsis with default limit (150 chars)', () => {
    const text = 'A'.repeat(200);
    const result = pipe.transform(text);
    expect(result).toBe('A'.repeat(150) + '...');
    expect(result.length).toBe(153);
  });

  it('should respect custom limit', () => {
    const text = 'B'.repeat(100);
    const result = pipe.transform(text, 50);
    expect(result).toBe('B'.repeat(50) + '...');
    expect(result.length).toBe(53);
  });

  it('should work with real movie synopsis text', () => {
    const synopsis = 'Esta é uma sinopse de um filme que pode ser muito longa e precisamos limitar o tamanho para não ocupar muito espaço na tela.';
    const result = pipe.transform(synopsis, 50);
    expect(result).toBe(synopsis.substring(0, 50) + '...');
  });
});
