import { METRE, type TUnit } from '../lib/units';
import { Range } from '../range/Range';
import { Axis } from './Axis';


export class EastingAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Easting', direction: 'east', unit, range, behavior: 'none' } );
  }
}
