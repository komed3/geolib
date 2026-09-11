import { Unit } from '../Unit';


export class Kilometre extends Unit {
  public constructor () {
    super( { name: 'kilometre', unit: 'km', quantity: 'length', factor: 1000 } );
  }
}
