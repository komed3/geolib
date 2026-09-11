import { METRE, type TUnit } from '../lib/units';
import { Range } from '../range/Range';
import { Axis } from './Axis';


export class GeocentricZAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Z', direction: 'z', unit, range, behavior: 'none' } );
  }
}
