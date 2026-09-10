import { Axis } from '../../core/Axis';
import { DEGREE } from '../../lib/Units';
import { LatitudeRange } from '../range/LatitudeRange';


export class LatitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Latitude', direction: 'north', unit: DEGREE,
      range: new LatitudeRange(), behavior: 'clamp'
    } );
  }
}
