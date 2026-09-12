import { deg2rad } from '../utils';
import { Value } from './Value';


export class DegreeValue extends Value {
  public toRadians () : number {
    return deg2rad( this.value );
  }
}
