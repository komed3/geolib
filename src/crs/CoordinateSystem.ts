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

  public clone () : CoordinateSystem {
    return new CoordinateSystem( this.type, this.axes.map( axis => ( { ...axis } ) ) );
  }

  public equals ( { type, axes }: CoordinateSystem ) : boolean {
    return this.type === type && this.axes.every(
      ( { name, direction, unit }, i ) => name === axes[ i ].name &&
        direction === axes[ i ].direction && unit === axes[ i ].unit
    );
  }

  public isEllipsoidal () : boolean {
    return this.type === 'ellipsoidal';
  }

  public isCartesian () : boolean {
    return this.type === 'cartesian';
  }
}
