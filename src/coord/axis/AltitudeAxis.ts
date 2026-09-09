import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { FOOT } from '../../lib/Units';


export class AltitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Altitude',
      direction: 'up',
      unit: FOOT,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
