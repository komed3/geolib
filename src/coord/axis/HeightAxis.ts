import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE } from '../../lib/Units';


export class HeightAxis extends Axis {
  public constructor () {
    super( {
      name: 'Height',
      direction: 'up',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
