import { Range } from '../range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class HeightAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Height', orientation: 'up', unit, range, behavior: 'none' } );
  }
}
