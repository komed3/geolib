export class Longitude {
  public readonly value: number;

  public constructor ( value: number ) {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Longitude must be a finite number' );

    if ( value < -180 || value > 180 )
      throw new RangeError( 'Longitude must be between -180 and 180 degrees' );

    this.value = value;
  }

  public toRadians () : number {
    return this.value * Math.PI / 180
  }

  public toString ( precision: number = -1 ) : string {
    return ( precision < 0 ? `${ this.value }` : this.value.toFixed( precision ) ) + '°';
  }
}
