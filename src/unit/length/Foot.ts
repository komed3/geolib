import { Unit } from '../Unit';


export class Foot extends Unit {
  public constructor () {
    super( { name: 'foot', unit: 'ft', quantity: 'length', factor: 0.3048 } );
  }
}
