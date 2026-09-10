import { Axis } from '../../core/Axis';
import { Range } from '../../core/Range';
import { METRE, type TUnit } from '../../lib/units';


export class GeocentricZAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Z', direction: 'z', unit, range, behavior: 'none' } );
  }
}
