import { Value } from './Value';


export class Latitude extends Value {
  public constructor ( value: number ) {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Latitude must be a finite number' );

    if ( value < -90 || value > 90 )
      throw new RangeError( 'Latitude must be between -90 and 90 degrees' );

    super( value );
  }
}
