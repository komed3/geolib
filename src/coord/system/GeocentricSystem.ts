import { AxisSet } from '../../base/AxisSet';
import { System } from '../../base/System';
import { GeocentricXAxis } from '../axis/GeocentricXAxis';
import { GeocentricYAxis } from '../axis/GeocentricYAxis';
import { GeocentricZAxis } from '../axis/GeocentricZAxis';


export class GeocentricSystem extends System {
  public constructor ( name: string = 'Geocentric', axes: AxisSet = new AxisSet( [
    new GeocentricXAxis(), new GeocentricYAxis(), new GeocentricZAxis()
  ] ) ) {
    super( name, axes );
  }
}
