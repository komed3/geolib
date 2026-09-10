import { Axis } from '../../core/Axis';
import { DEGREE } from '../../lib/units';
import { LongitudeRange } from '../range/LongitudeRange';


export class LongitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude', direction: 'east', unit: DEGREE,
      range: new LongitudeRange(), behavior: 'wrap'
    } );
  }
}
