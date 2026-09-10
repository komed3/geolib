import { Axis } from '../../core/Axis';
import { DEGREE } from '../../lib/units';
import { Longitude360Range } from '../range/Longitude360Range';


export class Longitude360Axis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude', direction: 'east', unit: DEGREE,
      range: new Longitude360Range(), behavior: 'wrap'
    } );
  }
}
