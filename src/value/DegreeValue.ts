import type { Axis } from '../axis';
import { DMS } from '../dms';
import { deg2rad } from '../utils';
import { Value } from './Value';


export class DegreeValue extends Value {
  public constructor ( value: number, axis: Axis ) {
    if ( axis.unit.name !== 'degree' )
      throw new Error( `Axis unit must be degree, got ${ axis.unit.name }` );

    super( value, axis );
  }

  public override clone () : DegreeValue {
    return new DegreeValue( this.value, this.axis.clone() );
  }

  public toRadians () : number {
    return deg2rad( this.value );
  }

  public toDMS () : DMS {
    if ( this.axis.orientation === 'east' ) return DMS.fromLongitude( this.value );
    if ( this.axis.orientation === 'north' ) return DMS.fromLatitude( this.value );

    throw new TypeError( 'Cannot convert to DMS without a valid axis orientation' );
  }
}
