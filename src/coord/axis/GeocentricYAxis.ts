import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class GeocentricYAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Y', direction: 'y', unit, range, behavior: 'none' } );
  }
}
