import type { Axis } from '../axis';
import { deg2rad } from '../utils';
import { Value } from './Value';


export class DegreeValue extends Value {
  public constructor ( value: number, axis: Axis ) {
    if ( axis.unit.name !== 'degree' )
      throw new Error( `Axis unit must be degree, got ${ axis.unit.name }` );

    super( value, axis );
  }

  public toRadians () : number {
    return deg2rad( this.value );
  }
}
