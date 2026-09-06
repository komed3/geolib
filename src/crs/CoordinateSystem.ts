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

  public equals ( other: CoordinateSystem ) : boolean {
    return this.type === other.type && this.axes.length === other.axes.length && this.axes.every(
      ( { name, direction, unit }, i ) => name === other.axes[ i ].name &&
        direction === other.axes[ i ].direction && unit === other.axes[ i ].unit
    );
  }

  public isEllipsoidal () : boolean {
    return this.type === 'ellipsoidal';
  }

  public isCartesian () : boolean {
    return this.type === 'cartesian';
  }
}
