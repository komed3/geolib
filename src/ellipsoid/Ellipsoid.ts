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

  public get flattening () : number {
    return this.inverseFlattening === Infinity ? 0 : 1 / this.inverseFlattening;
  }

  public get semiMinorAxis () : number {
    return this.semiMajorAxis * ( 1 - this.flattening );
  }

  public get linearEccentricity () : number {
    return Math.sqrt( this.semiMajorAxis ** 2 - this.semiMinorAxis ** 2 );
  }

  public get eccentricitySquared () : number {
    return this.flattening * ( 2 - this.flattening );
  }

  public get eccentricity () : number {
    return Math.sqrt( this.eccentricitySquared );
  }

  public get secondEccentricitySquared () : number {
    return this.eccentricitySquared / ( 1 - this.eccentricitySquared );
  }

  public get secondEccentricity () : number {
    return Math.sqrt( this.secondEccentricitySquared );
  }

  public get thirdFlattening () : number {
    return this.flattening / ( 2 - this.flattening );
  }

   public get volumetricRadius () : number {
    return ( this.semiMajorAxis ** 2 * this.semiMinorAxis ) ** ( 1 / 3 );
  }

  public get isSphere () : boolean {
    return this.flattening === 0;
  }
}
