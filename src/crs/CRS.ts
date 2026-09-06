import { Datum } from './Datum';


export type CRSType = 'geographic' | 'projected';
export type CRSUnit = 'degree' | 'metre';
export type CRSCoordinateSystem = 'ellipsoidal' | 'cartesian';


export class CRS {
  public readonly coordinateSystem: CRSCoordinateSystem;

  public constructor (
    public readonly code: string,
    public readonly name: string,
    public readonly type: CRSType,
    public readonly datum: Datum,
    public readonly unit: CRSUnit
  ) {
    this.coordinateSystem = type === 'geographic' ? 'ellipsoidal' : 'cartesian';
  }

  public clone () : CRS {
    return new CRS( this.code, this.name, this.type, this.datum.clone(), this.unit );
  }

  public equals ( other: CRS ) : boolean {
    return this.code === other.code;
  }

  public isGeographic () : boolean {
    return this.type === 'geographic';
  }

  public isProjected () : boolean {
    return this.type === 'projected';
  }

  public isEllipsoidal () : boolean {
    return this.coordinateSystem === 'ellipsoidal';
  }

  public isCartesian () : boolean {
    return this.coordinateSystem === 'cartesian';
  }
}
