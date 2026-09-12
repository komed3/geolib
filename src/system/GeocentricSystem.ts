import { AxisSet } from '../axis/AxisSet';
import { GeocentricXAxis } from '../axis/GeocentricXAxis';
import { GeocentricYAxis } from '../axis/GeocentricYAxis';
import { GeocentricZAxis } from '../axis/GeocentricZAxis';
import { System } from './System';


export class GeocentricSystem extends System {
  public constructor () {
    super( { name: 'Geocentric', axes: new AxisSet( { axes: [
      new GeocentricXAxis(), new GeocentricYAxis(), new GeocentricZAxis()
    ] } ) } );
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
