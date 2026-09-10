import { Axis } from '../../core/Axis';
import { Range } from '../../core/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class AltitudeAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Altitude', direction: 'up', unit, range, behavior: 'none' } );
  }
}
