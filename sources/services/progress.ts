import { Bar, Presets } from 'cli-progress';
import { Observable } from 'rxjs';

const bar = new Bar({ etaBuffer: 1000 ** 2 }, Presets.shades_classic);

export class Progress {

  constructor(
    public readonly total: number,
    private readonly source: Observable<number>,
    public readonly initialValue?: number,
  ) { }

  public start(): this {
    bar.start(this.total, 0);

    const next = (data: number) => bar.update(data);
    const complete = () => bar.stop();
    this.source.subscribe({ next, complete });

    return this;
  }

  public stop(): this {
    bar.stop();

    return this;
  }

}
