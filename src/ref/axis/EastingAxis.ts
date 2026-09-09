import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class EastingAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Easting', direction: 'east', unit, range, behavior: 'none' } );
  }
}
