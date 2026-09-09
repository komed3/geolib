import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { NorthingAxis } from '../axis/NorthingAxis';


export class Northing extends Value {
  public constructor ( value: number, axis: Axis = new NorthingAxis() ) {
    super( value, axis );
  }
}
