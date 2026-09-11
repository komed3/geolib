import { HeightAxis } from '../axis/HeightAxis';
import { Value } from './Value';


export class Height extends Value {
  public constructor ( value: number, axis: HeightAxis = new HeightAxis() ) {
    super( value, axis );
  }
}
