import { Value } from '../../base/Value';
import { NorthingAxis } from '../axis/NorthingAxis';


export class Northing extends Value {
  public constructor ( value: number, axis: NorthingAxis = new NorthingAxis() ) {
    super( value, axis );
  }
}
