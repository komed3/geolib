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

  public get flattening () : number {
    return 1 / this.inverseFlattening;
  }

  public get semiMinorAxis () : number {
    return this.semiMajorAxis * ( 1 - this.flattening );
  }

  public get firstEccentricitySquared () : number {
    return this.flattening * ( 2 - this.flattening );
  }

  public get firstEccentricity () : number {
    return Math.sqrt( this.firstEccentricitySquared );
  }

  public get secondEccentricitySquared () : number {
    return this.firstEccentricitySquared / ( 1 - this.firstEccentricitySquared );
  }

  public get secondEccentricity () : number {
    return Math.sqrt( this.secondEccentricitySquared );
  }

  public isSphere () : boolean {
    return this.firstEccentricitySquared === 0;
  }

  public clone () : Ellipsoid {
    return new Ellipsoid( this.semiMajorAxis, this.inverseFlattening );
  }

  public equals ( { semiMajorAxis, inverseFlattening }: Ellipsoid ) : boolean {
    return this.semiMajorAxis === semiMajorAxis && this.inverseFlattening === inverseFlattening;
  }
}
