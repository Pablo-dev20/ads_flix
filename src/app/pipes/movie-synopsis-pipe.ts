import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieSynopsis',
  standalone: true
})
export class MovieSynopsisPipe implements PipeTransform {

  transform(value: string | null | undefined, limit: number = 150): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit) + '...';
  }

}
