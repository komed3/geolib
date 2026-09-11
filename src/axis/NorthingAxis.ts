import { Range } from '../range/Range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class NorthingAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Northing', orientation: 'north', unit, range, behavior: 'none' } );
  }
}
