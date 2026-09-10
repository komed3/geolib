import { AxisSet } from '../../core/AxisSet';
import { System } from '../../core/System';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';


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
