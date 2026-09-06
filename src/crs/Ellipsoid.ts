export class Ellipsoid {
  public readonly semiMajorAxis: number;
  public readonly inverseFlattening: number;

  public constructor ( semiMajorAxis: number, inverseFlattening: number ) {
    if ( ! Number.isFinite( semiMajorAxis ) || semiMajorAxis <= 0 )
      throw new RangeError( 'Semi-major axis must be a positive finite number' );

    if ( ! Number.isFinite( inverseFlattening ) || inverseFlattening <= 0 )
      throw new RangeError( 'Inverse flattening must be a positive finite number' );

    this.semiMajorAxis = semiMajorAxis;
    this.inverseFlattening = inverseFlattening;
  }
}
