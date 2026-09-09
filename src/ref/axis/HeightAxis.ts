import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class HeightAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Height', direction: 'up', unit, range, behavior: 'none' } );
  }
}
