import { Unit } from './Unit';


export class Radian extends Unit {
  public constructor () {
    super( { name: 'radian', unit: 'rad', quantity: 'angle' } );
  }
}
