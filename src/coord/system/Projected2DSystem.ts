import { AxisSet } from '../../base/AxisSet';
import { System } from '../../base/System';
import { EastingAxis } from '../axis/EastingAxis';
import { NorthingAxis } from '../axis/NorthingAxis';


export class Projected2DSystem extends System {
  public constructor ( name: string = 'Projected 2D', axes: AxisSet = new AxisSet( [
    new EastingAxis(), new NorthingAxis()
  ] ) ) {
    super( name, axes );
  }
}
