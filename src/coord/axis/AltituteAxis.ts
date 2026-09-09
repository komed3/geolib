import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { FOOT } from '../../lib/Units';


export class AltituteAxis extends Axis {
  public constructor () {
    super( {
      name: 'Altitute',
      direction: 'up',
      unit: FOOT,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
