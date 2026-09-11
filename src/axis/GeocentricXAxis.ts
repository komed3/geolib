import { Range } from '../range/Range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class GeocentricXAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Geocentric X', abbr: 'X', orientation: 'x', unit, range, behavior: 'none' } );
  }
}
