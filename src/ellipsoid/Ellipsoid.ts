export interface EllipsoidOptions {
  name: string;
  semiMajorAxis: number;
  inverseFlattening?: number;
}


export class Ellipsoid {
  public readonly name: string;
  public readonly semiMajorAxis: number;
  public readonly inverseFlattening: number;

  public constructor ( { name, semiMajorAxis, inverseFlattening = Infinity }: EllipsoidOptions ) {
    if ( ! Number.isFinite( semiMajorAxis ) || semiMajorAxis <= 0 )
      throw new RangeError( 'Semi-major axis must be a positive finite number' );

    if ( Number.isNaN( inverseFlattening ) || ( inverseFlattening <= 0 && inverseFlattening !== Infinity ) )
      throw new RangeError( 'Inverse flattening must be positive or infinite' );

    this.name = name;
    this.semiMajorAxis = semiMajorAxis;
    this.inverseFlattening = inverseFlattening;
  }
}
