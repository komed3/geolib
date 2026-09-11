import { Unit } from '../Unit';


export class Second extends Unit {
  public constructor () {
    super( { name: 'second', unit: 's', quantity: 'time' } );
  }
}
