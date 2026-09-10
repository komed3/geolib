import { Axis } from '../../core/Axis';
import { DEGREE } from '../../lib/Units';
import { Longitude360Range } from '../range/Longitude360Range';


export class Longitude360Axis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude', direction: 'east', unit: DEGREE,
      range: new Longitude360Range(), behavior: 'wrap'
    } );
  }
}
