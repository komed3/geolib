import { Range } from '../range/Range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class EastingAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Easting', orientation: 'east', unit, range, behavior: 'none' } );
  }
}
