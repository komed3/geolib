import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE } from '../../lib/Units';


export class EastingAxis extends Axis {
  public constructor () {
    super( {
      name: 'Easting',
      direction: 'east',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
