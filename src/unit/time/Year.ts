import { Unit } from '../Unit';


export class Year extends Unit {
  public constructor () {
    super( { name: 'year', unit: 'a', quantity: 'time', factor: 31558149.54 } );
  }
}
