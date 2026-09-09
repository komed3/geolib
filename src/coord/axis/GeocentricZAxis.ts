import { Axis } from '../../base/Axis';
import { Range } from '../../base/Range';
import { METRE, type TUnit } from '../../lib/Units';


export class GeocentricZAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Z', direction: 'z', unit, range, behavior: 'none' } );
  }
}
