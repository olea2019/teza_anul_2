import { unlink } from 'fs';
import { Observable, ReplaySubject } from 'rxjs';
import { query } from 'windows-shortcuts';

import { Argument } from '../../../interfaces/arguments';
import { ReadFile } from '../../../interfaces/readFile';
import { ArgumentsService } from '../../arguments';
import { ReadFileFS } from './readFileFS';

export class ReadShortcut implements ReadFile {

  constructor(
    public readonly source: string,
  ) { }

  public read(): Observable<string> {
    const subject = new ReplaySubject<string>();

    subject.subscribe({
      complete: () => this.deleteFile(),
    });

    console.log(`\nSearch original file for: ${this.source}`);
    this.readShortcutTarget()
      .then(targetPath => new ReadFileFS(targetPath).read())
      .then(
        observable => observable.subscribe(
          data => subject.next(data),
          error => subject.error(error),
          () => subject.complete(),
        )
      )
      .catch(error => {
        subject.error(error);
        console.error(`\nAn error happened searching original file for: ${this.source}`);
        console.error(error);
      });

    return subject.asObservable();
  }

  private readShortcutTarget(): Promise<string> {
    return new Promise<string>((resolve, reject) => query(
      this.source,
      (error, { target }) => (console.log(target, error), error ? reject(error) : resolve(target))
    ));
  }

  private deleteFile(): this {
    const argumentsService = new ArgumentsService();

    if (!argumentsService.hasArgument(Argument.DELETE)) {
      return this;
    }

    unlink(
      this.source,
      (error) => error
        ? (console.error(`Can't delete ${this.source}, an error encoured`), console.error(error))
        : console.log(`${this.source} deleted succesful.`)
    );

    return this;
  }

}
