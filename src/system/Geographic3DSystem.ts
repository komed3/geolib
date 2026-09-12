import { AxisSet } from '../axis/AxisSet';
import { HeightAxis } from '../axis/HeightAxis';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';
import { System } from './System';


export class Geographic3DSystem extends System {
  public constructor () {
    super( { name: 'Geographic 3D', axes: new AxisSet( { axes: [
      new LongitudeAxis(), new LatitudeAxis(), new HeightAxis()
    ] } ) } );
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
