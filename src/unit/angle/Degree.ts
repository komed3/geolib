import { Unit } from '../Unit';


export class Degree extends Unit {
  public constructor () {
    super( { name: 'degree', unit: '°', quantity: 'angle', factor: Math.PI / 180 } );
  }
}
