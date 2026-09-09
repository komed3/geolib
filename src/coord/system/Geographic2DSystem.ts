import { AxisSet } from '../../base/AxisSet';
import { System } from '../../base/System';
import { LatitudeAxis } from '../axis/LatitudeAxis';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Geographic2DSystem extends System {
  public constructor ( name: string = 'Geographic 2D', axes: AxisSet = new AxisSet( [
    new LongitudeAxis(), new LatitudeAxis()
  ] ) ) {
    super( name, axes );
  }
}
