import { Observable, ReplaySubject } from 'rxjs';

import { ReadFile } from '../../interfaces/readFile';

export class ConcatService {

  private readonly readers: ReadFile[];

  constructor(readers: ReadFile[]) {
    this.readers = [...readers];
  }

  public concat(): Observable<string> {
    const subject = new ReplaySubject<string>();

    this.subscribeToFirst(subject);

    return subject.asObservable();
  }

  private subscribeToFirst(subject: ReplaySubject<string>): void {
    if (this.readers.length === 0) {
      subject.complete();
      return;
    }

    this.readers
      .shift()
      .read()
      .subscribe(...this.subscriptionCallbacks(subject));
  }

  private subscriptionCallbacks(
    subject: ReplaySubject<string>,
  ): Array<(data: string) => void> {
    return [
      (data: string) => subject.next(data),
      null,
      () => this.subscribeToFirst(subject),
    ];
  }

}
