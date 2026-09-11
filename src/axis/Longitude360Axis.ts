import { Longitude360Range } from '../range';
import { Degree } from '../unit';
import { Axis } from './Axis';


export class Longitude360Axis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude 360°', orientation: 'east', unit: new Degree(),
      range: new Longitude360Range(), behavior: 'wrap'
    } );
  }
}
