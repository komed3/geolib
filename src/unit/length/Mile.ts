import { Unit } from '../Unit';


export class Mile extends Unit {
  public constructor () {
    super( { name: 'mile', unit: 'mi', quantity: 'length', factor: 1609.344 } );
  }
}
