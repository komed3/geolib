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

  public get x () : GeocentricXAxis {
    return this.axes.get( 0 );
  }

  public get y () : GeocentricYAxis {
    return this.axes.get( 1 );
  }

  public get z () : GeocentricZAxis {
    return this.axes.get( 2 );
  }
}
