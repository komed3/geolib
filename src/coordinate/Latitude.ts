export class Latitude {
  public readonly value: number;

  constructor ( value: number ) {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Latitude must be a finite number' );

    if ( value < -90 || value > 90 )
      throw new RangeError( 'Latitude must be between -90 and 90 degrees' );

    this.value = value;
  }

  public toRadians () : number {
    return this.value * Math.PI / 180;
  }

  public toString ( precision: number = -1 ) : string {
    return precision < 0 ? `${ this.value }` : this.value.toFixed( precision );
  }
}
