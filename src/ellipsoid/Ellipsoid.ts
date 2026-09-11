export interface TEllipsoidOptions {
  name: string;
  semiMajorAxis: number;
  inverseFlattening: number;
}

export interface TEllipsoidStringOptions {
  precision?: number;
}


export class Ellipsoid {
  public readonly name: string;
  public readonly semiMajorAxis: number;
  public readonly inverseFlattening: number;

  public constructor ( { name, semiMajorAxis, inverseFlattening }: TEllipsoidOptions ) {
    if ( ! Number.isFinite( semiMajorAxis ) || semiMajorAxis <= 0 )
      throw new RangeError( 'Semi-major axis must be a positive finite number' );

    if ( inverseFlattening < 0 || Number.isNaN( inverseFlattening ) )
      throw new RangeError( 'Inverse flattening must be non-negative' );

    this.name = name;
    this.semiMajorAxis = semiMajorAxis;
    this.inverseFlattening = inverseFlattening;
  }
}
