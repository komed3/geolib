import { DEGREE } from '../lib/units';
import { LatitudeRange } from '../range/LatitudeRange';
import { Axis } from './Axis';


export class LatitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Latitude', direction: 'north', unit: DEGREE,
      range: new LatitudeRange(), behavior: 'clamp'
    } );
  }
}
