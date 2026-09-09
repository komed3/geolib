import { Axis } from '../base/Axis';
import { Range } from '../base/Range';
import { METRE } from '../lib/Units';


export class GeocentricZAxis extends Axis {
  public constructor () {
    super( {
      name: 'Geocentric Z',
      direction: 'geocentricZ',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
