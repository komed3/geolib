import { Unit } from '../Unit';


export class Centimetre extends Unit {
  public constructor () {
    super( { name: 'Centimetre', unit: 'cm', quantity: 'length', factor: 0.01 } );
  }
}
