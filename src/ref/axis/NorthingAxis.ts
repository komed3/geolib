import { Axis } from '../../core/Axis';
import { Range } from '../../core/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class NorthingAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Northing', direction: 'north', unit, range, behavior: 'none' } );
  }
}
