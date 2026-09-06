import { CoordinateSystem } from './CoordinateSystem';
import { Datum } from './Datum';
import { Projection } from './Projection';


export type CRSType = 'geographic' | 'projected';


export class CRS {
  public constructor (
    public readonly code: string,
    public readonly name: string,
    public readonly type: CRSType,
    public readonly datum: Datum,
    public readonly coordinateSystem: CoordinateSystem,
    public readonly projection?: Projection
  ) {
    if ( type === 'geographic' && projection !== undefined )
      throw new TypeError( 'Geographic CRS cannot have a projection' );

    if ( type === 'projected' && projection === undefined )
      throw new TypeError( 'Projected CRS must have a projection' );
  }

  public clone () : CRS {
    return new CRS(
      this.code, this.name, this.type, this.datum.clone(),
      this.coordinateSystem.clone(), this.projection?.clone()
    );
  }

  public equals( { code, name, type, datum, coordinateSystem, projection }: CRS ): boolean {
    return this.code === code && this.name === name && this.type === type &&
      this.datum.equals( datum ) && this.coordinateSystem.equals( coordinateSystem ) &&
      !! this.projection && !! projection && this.projection.equals( projection );
  }

  public isGeographic () : boolean {
    return this.type === 'geographic';
  }

  public isProjected () : boolean {
    return this.type === 'projected';
  }

  public hasProjection () : boolean {
    return this.projection !== undefined;
  }
}
