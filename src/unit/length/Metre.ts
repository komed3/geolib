import { Unit } from '../Unit';


export class Metre extends Unit {
  public constructor () {
    super( { name: 'metre', unit: 'm', quantity: 'length' } );
  }
}
