import { Value } from '../../core/Value';
import { HeightAxis } from '../axis/HeightAxis';


export class Height extends Value {
  public constructor ( value: number, axis: HeightAxis = new HeightAxis() ) {
    super( value, axis );
  }
}
