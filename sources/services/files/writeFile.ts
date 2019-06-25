import { createWriteStream, WriteStream } from 'fs';
import { Observable, Subject } from 'rxjs';

export class WriteFile {

  constructor(
    private readonly source: Observable<string>,
    private readonly destination: string,
  ) { }

  public write(): Observable<string> {
    const subject = new Subject<string>();

    const stream = this.openStream();
    this.source.subscribe(
      async data => {
        await this.waitStream(stream);
        const errorCallback =
          (error: Error) => { if (error) { console.error(error); process.exit(); } };
        stream.write(data, errorCallback);
      },
      null,
      () => stream.end(),
    );

    stream.once('end', () => subject.complete());
    stream.once('close', () => subject.complete());

    return subject.asObservable();
  }

  private openStream(): WriteStream {
    return createWriteStream(this.destination, {
      autoClose: true,
    });
  }

  private waitStream(stream: WriteStream): Promise<void> {
    if (stream.writable) {
      return Promise.resolve();
    }

    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (stream.writable) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

}
