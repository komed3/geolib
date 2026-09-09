import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE } from '../../lib/Units';


export class NorthingAxis extends Axis {
  public constructor () {
    super( {
      name: 'Northing',
      direction: 'north',
      unit: METRE,
      range: new Range(),
      behavior: 'none'
    } );
  }
}
