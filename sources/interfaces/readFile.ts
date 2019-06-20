import { Observable } from 'rxjs';

export interface ReadFile {
  source: string;
  read(): Observable<string>;
}
