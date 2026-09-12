import type { AxisSet } from '../axis';


export interface SystemOptions {
  name: string;
  axes: AxisSet;
}


export class System {
  public readonly name: string;
  public readonly axes: AxisSet;

  public constructor ( { name, axes }: SystemOptions ) {
    this.name = name, this.axes = axes;
  }
}
