import { Range } from '../range';
import { Metre, type Unit } from '../unit';
import { Axis } from './Axis';


export class GeocentricZAxis extends Axis {
  public constructor ( unit: Unit = new Metre(), range: Range = new Range() ) {
    super( { name: 'Geocentric Z', abbr: 'Z', orientation: 'z', unit, range, behavior: 'none' } );
  }
}
