import { Axis } from '../../core/Axis';
import { Range } from '../../core/Range';
import { METRE, type TUnit } from '../../core/Units';


export class GeocentricYAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Y', direction: 'y', unit, range, behavior: 'none' } );
  }
}
