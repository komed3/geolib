import { AxisSet } from '../axis/AxisSet';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';
import { System } from './System';


export class Geographic2DSystem extends System {
  public constructor () {
    super( { name: 'Geographic 2D', axes: new AxisSet( { axes: [
      new LongitudeAxis(), new LatitudeAxis()
    ] } ) } );
  }

  public get longitude () : LongitudeAxis {
    return this.axes.get( 0 );
  }

  public get latitude () : LatitudeAxis {
    return this.axes.get( 1 );
  }
}
