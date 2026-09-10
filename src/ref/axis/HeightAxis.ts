import { Axis } from '../../core/Axis';
import { Range } from '../../core/Range';
import { METRE, type TUnit } from '../../core/Units';


export class HeightAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Height', direction: 'up', unit, range, behavior: 'none' } );
  }
}
