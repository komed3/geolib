import { Value } from './Value';


export class Longitude extends Value {
  public constructor ( value: number ) {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Longitude must be a finite number' );

    if ( value < -180 || value > 180 )
      throw new RangeError( 'Longitude must be between -180 and 180 degrees' );

    super( value );
  }
}
