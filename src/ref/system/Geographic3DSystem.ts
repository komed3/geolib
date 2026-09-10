import { AxisSet } from '../../core/AxisSet';
import { System } from '../../core/System';
import { HeightAxis } from '../axis/HeightAxis';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Geographic3DSystem extends System {
  public constructor ( name: string = 'Geographic 3D', axes: AxisSet = new AxisSet( [
    new LongitudeAxis(), new LatitudeAxis(), new HeightAxis()
  ] ) ) {
    super( name, axes );
  }

  public get longitude () : LongitudeAxis {
    return this.axes.get( 0 );
  }

  public get latitude () : LatitudeAxis {
    return this.axes.get( 1 );
  }

  public get height () : HeightAxis {
    return this.axes.get( 2 );
  }
}
