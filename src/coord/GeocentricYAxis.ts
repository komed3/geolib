import { Axis } from '../base/Axis';
import { Range } from '../base/Range';
import { METRE } from '../lib/Units';


export class GeocentricYAxis extends Axis {
  public constructor () {
    super( {
      name: 'Geocentric Y',
      direction: 'geocentricY',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
