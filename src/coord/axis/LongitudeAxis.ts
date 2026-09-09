import { Axis } from '../../base/Axis';
import { DEGREE } from '../../lib/Units';
import { LongitudeRange } from '../range/LongitudeRange';


export class LongitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude',
      direction: 'east',
      unit: DEGREE,
      range: new LongitudeRange(),
      behavior: 'wrap'
    } );
  }
}
