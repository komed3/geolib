import { AxisSet } from '../../core/AxisSet';
import { System } from '../../core/System';
import { EastingAxis } from '../axis/EastingAxis';
import { NorthingAxis } from '../axis/NorthingAxis';


export class Projected2DSystem extends System {
  public constructor ( name: string = 'Projected 2D', axes: AxisSet = new AxisSet( [
    new EastingAxis(), new NorthingAxis()
  ] ) ) {
    super( name, axes );
  }

  public get easting () : EastingAxis {
    return this.axes.get( 0 );
  }

  public get northing () : NorthingAxis {
    return this.axes.get( 1 );
  }
}
