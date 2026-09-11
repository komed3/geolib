import { AxisSet } from '../axis/AxisSet';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';
import { System } from './System';


export class Geographic2DSystem extends System {
  public constructor ( name: string = 'Geographic 2D', axes: AxisSet = new AxisSet( [
    new LongitudeAxis(), new LatitudeAxis()
  ] ) ) {
    super( name, axes );
  }

  public get longitude () : LongitudeAxis {
    return this.axes.get( 0 );
  }

  public get latitude () : LatitudeAxis {
    return this.axes.get( 1 );
  }
}
