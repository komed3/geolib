import { AxisSet } from '../axis/AxisSet';
import { EastingAxis } from '../axis/EastingAxis';
import { HeightAxis } from '../axis/HeightAxis';
import { NorthingAxis } from '../axis/NorthingAxis';
import { System } from './System';


export class Projected3DSystem extends System {
  public constructor ( name: string = 'Projected 3D', axes: AxisSet = new AxisSet( [
    new EastingAxis(), new NorthingAxis(), new HeightAxis()
  ] ) ) {
    super( name, axes );
  }

  public get easting () : EastingAxis {
    return this.axes.get( 0 );
  }

  public get northing () : NorthingAxis {
    return this.axes.get( 1 );
  }

  public get height () : HeightAxis {
    return this.axes.get( 2 );
  }
}
