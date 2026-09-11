import type { Latitude } from '../value/Latitude';


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

  private value ( value: number | Latitude ) : number {
    return typeof value === 'number' ? value : value.value;
  }

  public constructor ( { name, semiMajorAxis, inverseFlattening }: TEllipsoidOptions ) {
    if ( ! Number.isFinite( semiMajorAxis ) || semiMajorAxis <= 0 )
      throw new RangeError( 'Semi-major axis must be a positive finite number' );

    if ( inverseFlattening < 0 || Number.isNaN( inverseFlattening ) )
      throw new RangeError( 'Inverse flattening must be non-negative' );

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

  public get polarRadius () : number {
    return this.semiMinorAxis;
  }

   public get volumetricRadius () : number {
    return ( this.semiMajorAxis ** 2 * this.semiMinorAxis ) ** ( 1 / 3 );
  }

  public get authalicRadius () : number {
    if ( this.isSphere() ) return this.semiMajorAxis;

    const e = this.eccentricity;
    return this.semiMajorAxis * Math.sqrt( 0.5 * ( 1 + ( 1 - this.eccentricitySquared ) / e * Math.atanh( e ) ) );
  }

  public isSphere () : boolean {
    return this.flattening === 0;
  }

  public primeVerticalRadius ( latitude: number | Latitude ) : number {
    return this.semiMajorAxis / Math.sqrt( 1 - this.eccentricitySquared * Math.sin( this.value( latitude ) ) ** 2 );
  }

  public meridionalRadius ( latitude: number | Latitude ) : number {
    const denominator = 1 - this.eccentricitySquared * Math.sin( this.value( latitude ) ) ** 2;
    return this.semiMajorAxis * ( 1 - this.eccentricitySquared ) / denominator ** ( 3 / 2 );
  }

  public geocentricRadius ( latitude: number | Latitude ) : number {
    const M = this.semiMajorAxis, m = this.semiMinorAxis;
    const value = this.value( latitude );
    const cos = Math.cos( value ), sin = Math.sin( value );

    return Math.sqrt( ( M ** 2 * cos ) ** 2 + ( m ** 2 * sin ) ** 2 ) /
      Math.sqrt( ( M * cos ) ** 2 + ( m * sin ) ** 2 );
  }

  public surfaceArea () : number {
    if ( this.isSphere() ) return 4 * Math.PI * this.semiMajorAxis ** 2;

    const e = this.eccentricity;
    return 2 * Math.PI * this.semiMajorAxis ** 2 * ( 1 + ( 1 - this.eccentricitySquared ) / e * Math.atanh( e ) );
  }
}
