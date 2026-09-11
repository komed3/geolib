import { LatitudeRange } from '../range';
import { Degree } from '../unit';
import { Axis } from './Axis';


export class LatitudeAxis extends Axis {
  public constructor () {
    super( {
      name: 'Latitude', abbr: 'Lat', orientation: 'north', unit: new Degree(),
      range: new LatitudeRange(), behavior: 'clamp'
    } );
  }
}
