import { Unit } from '../Unit';


export class Yard extends Unit {
  public constructor () {
    super( { name: 'year', unit: 'yd', quantity: 'length', factor: 0.9144 } );
  }
}
