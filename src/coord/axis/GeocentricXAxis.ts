import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE } from '../../lib/Units';


export class GeocentricXAxis extends Axis {
  public constructor () {
    super( {
      name: 'Geocentric X',
      direction: 'geocentricX',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
