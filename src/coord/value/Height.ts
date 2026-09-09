import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { HeightAxis } from '../axis/HeightAxis';


export class Height extends Value {
  public constructor ( value: number, axis: Axis = new HeightAxis() ) {
    super( value, axis );
  }
}
