import { Unit } from '../Unit';


export class Millimetre extends Unit {
  public constructor () {
    super( { name: 'Millimetre', unit: 'mm', quantity: 'length', factor: 0.001 } );
  }
}
