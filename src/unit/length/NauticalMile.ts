import { Unit } from '../Unit';


export class NauticalMile extends Unit {
  public constructor () {
    super( { name: 'nautical mile', unit: 'NM', quantity: 'length', factor: 1852 } );
  }
}
