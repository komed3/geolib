export class Ellipsoid {
  public readonly code: string;
  public readonly semiMajorAxis: number;
  public readonly inverseFlattening: number;

  public constructor ( code: string, semiMajorAxis: number, inverseFlattening: number ) {
    if ( ! Number.isFinite( semiMajorAxis ) || semiMajorAxis <= 0 )
      throw new RangeError( 'Semi-major axis must be a positive finite number' );

    if ( ! Number.isFinite( inverseFlattening ) || inverseFlattening < 0 || ( inverseFlattening > 0 && inverseFlattening <= 1 ) )
      throw new RangeError( 'Inverse flattening must be 0 or greater than 1' );

    this.code = code;
    this.semiMajorAxis = semiMajorAxis;
    this.inverseFlattening = inverseFlattening;
  }

  public get flattening () : number {
    return this.inverseFlattening === 0 ? 0 : 1 / this.inverseFlattening;
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
    return this.inverseFlattening === 0;
  }

  public clone () : Ellipsoid {
    return new Ellipsoid( this.code, this.semiMajorAxis, this.inverseFlattening );
  }

  public equals ( { code, semiMajorAxis, inverseFlattening }: Ellipsoid ) : boolean {
    return this.code === code && this.semiMajorAxis === semiMajorAxis &&
      this.inverseFlattening === inverseFlattening;
  }
}
