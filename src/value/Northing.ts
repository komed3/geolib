import { NorthingAxis } from '../axis/NorthingAxis';
import { Value } from './Value';


export class Northing extends Value {
  public constructor ( value: number, axis: NorthingAxis = new NorthingAxis() ) {
    super( value, axis );
  }
}
