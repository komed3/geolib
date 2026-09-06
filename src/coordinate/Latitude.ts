export class Latitude {
  public readonly value: number;

  constructor ( value: number ) {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Latitude must be a finite number' );

    this.value = value;
  }
}
