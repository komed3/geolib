import { Axis } from '../base/Axis';
import { DEGREE } from '../lib/Units';
import { LatitudeRange } from './LatitudeRange';


export class LatitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Latitude',
      direction: 'north',
      unit: DEGREE,
      range: new LatitudeRange(),
      behavior: 'clamp'
    } );
  }
}
