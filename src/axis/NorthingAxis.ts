import { METRE, type TUnit } from '../lib/units';
import { Range } from '../range/Range';
import { Axis } from './Axis';


export class NorthingAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Northing', direction: 'north', unit, range, behavior: 'none' } );
  }
}
