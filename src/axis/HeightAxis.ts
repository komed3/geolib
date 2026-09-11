import { Range } from '../range/Range';
import { Metre, Unit } from '../unit';
import { Axis } from './Axis';


export class HeightAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Height', orientation: 'up', unit, range, behavior: 'none' } );
  }
}
