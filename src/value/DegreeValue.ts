import type { Axis } from '../axis/Axis';
import { DMS } from '../dms/DMS';
import { deg2rad } from '../lib/geodesy';
import { Value } from './Value';


export class DegreeValue extends Value {
  public constructor ( value: number, axis: Axis ) {
    super( value, axis );
  }

  public toRadians () : number {
    return deg2rad( this.value );
  }

  public toDMS () : DMS {
    if ( this.axis.direction === 'east' ) return DMS.fromLongitude( this.value );
    if ( this.axis.direction === 'north' ) return DMS.fromLatitude( this.value );

    throw new TypeError( 'Cannot convert to DMS without a valid axis direction' );
  }
}
