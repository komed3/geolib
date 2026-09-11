import { METRE, type TUnit } from '../lib/units';
import { Range } from '../range/Range';
import { Axis } from './Axis';


export class HeightAxis extends Axis {
  public constructor ( unit: TUnit = METRE, range: Range = new Range() ) {
    super( { name: 'Height', direction: 'up', unit, range, behavior: 'none' } );
  }
}
