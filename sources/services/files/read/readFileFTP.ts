import { get } from 'http';
import { Observable, ReplaySubject } from 'rxjs';

import { ReadFile } from '../../../interfaces/readFile';

export class ReadFileFTP implements ReadFile {

  constructor(
    public readonly source: string,
  ) { }

  public read(): Observable<string> {
    const subject = new ReplaySubject<string>();

    console.log(`\nBegin reciving and coping file from: ${this.source}`);
    get(this.source, response => {
      if (response.statusCode >= 400) {
        subject.error(response.statusMessage);
        console.error(`\nAn error happened while tring to get ${this.source}`);
        console.error(`${response.statusCode} ${response.statusMessage}`);
      }
      
      const complete = () => {
        subject.complete();
        console.log(`\nEnd copying ${this.source}`);
      };
      response.once('end', complete);
      response.once('close', complete);
      response.once('error', error => {
        subject.error(error);
        console.error(`\nAn error happened while reciving ${this.source}`);
        console.error(error);
      });

      response.on('data', data => subject.next(data));
    });

    return subject.asObservable();
  }

}