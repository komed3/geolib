import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class GeocentricXAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric X', direction: 'x', unit, range, behavior: 'none' } );
  }
}
