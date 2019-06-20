import { createReadStream, ReadStream, stat, unlink } from 'fs';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { Argument } from '../../../interfaces/arguments';
import { ReadFile } from '../../../interfaces/readFile';
import { ArgumentsService } from '../../arguments';
import { Progress } from '../../progress';

export class ReadFileFS implements ReadFile {

  constructor(
    public readonly source: string,
  ) { }

  public read(): Observable<string> {
    console.log(`\nBegin copying file: ${this.source} from file system`);

    const subject = new ReplaySubject<string>(100 * (1024 ** 2));

    subject.subscribe({ complete: () => this.deleteFile() });

    this.getFileSize()
      .then(size => {
        const stream = this.openStream(size);
        this.initProgressBar(size, stream);
        return stream;
      })
      .then(stream => {
        stream.on('data', data => subject.next(data));
        stream.on('error', error => {
          subject.error(error);
          console.error(`\nAn error encoured while coping file: ${this.source}`);
          console.error(error);
        });
        stream.once('close', () => {
          subject.complete();
          setTimeout(
            () => console.log(`\nEnd copy of: ${this.source} from file system`)
          );
        });
      });

    return subject.asObservable();
  }

  private initProgressBar(size: number, stream: ReadStream): void {
    const subject = new BehaviorSubject<number>(0);
    stream.on('data', () => subject.next(stream.bytesRead));
    stream.once('error', error => subject.error(error));
    stream.once('close', () => subject.complete());

    console.log(`file size: ${size} bytes (${this.getData(size)})`);
    const progress = new Progress(size, subject.asObservable(), subject.value);
    progress.start();
  }

  private getData(value: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const index = Math.log(value) / Math.log(1024) | 0;
    const size = (value / (1024 ** index)).toString();
    const response = size.includes('.') ? size.slice(0, size.indexOf('.') + 3) : size;
    return `${response} ${units[index]}`
  }

  private openStream(size: number): ReadStream {
    const limit = Math.min(Math.sqrt(size) | 0, 16 * (1024 ** 2));
    return createReadStream(this.source, {
      autoClose: true,
      highWaterMark: limit,
    });
  }

  private getFileSize(): Promise<number> {
    return new Promise<number>((resolve, reject) =>
      stat(this.source, (error, data) => error ? reject(error) : resolve(data.size))
    );
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
