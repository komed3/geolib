import { Range } from '../range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class GeocentricYAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Geocentric Y', abbr: 'Y', orientation: 'y', unit, range, behavior: 'none' } );
  }
}
