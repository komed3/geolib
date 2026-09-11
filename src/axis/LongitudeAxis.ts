import { LongitudeRange } from '../range';
import { Degree } from '../unit';
import { Axis } from './Axis';


export class LongitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Longitude', abbr: 'Lon', orientation: 'east', unit: new Degree(),
      range: new LongitudeRange(), behavior: 'wrap'
    } );
  }
}
