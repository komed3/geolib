export type CoordinateSystemType = 'ellipsoidal' | 'cartesian';
export type AxisDirection = 'north' | 'south' | 'east' | 'west' | 'up' | 'down';
export type AxisUnit = 'degree' | 'metre';

export interface CoordinateAxis {
  readonly name: string;
  readonly direction: AxisDirection;
  readonly unit: AxisUnit;
}


export class CoordinateSystem {
  public constructor (
    public readonly type: CoordinateSystemType,
    public readonly axes: readonly CoordinateAxis[]
  ) {}

  public get dimension () : number {
    return this.axes.length;
  }
}
