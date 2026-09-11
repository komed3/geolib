import { METRE, type TUnit } from '../lib/units';
import { Range } from '../range/Range';
import { Axis } from './Axis';


export class GeocentricYAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Geocentric Y', direction: 'y', unit, range, behavior: 'none' } );
  }
}
