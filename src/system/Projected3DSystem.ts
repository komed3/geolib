import { AxisSet } from '../axis/AxisSet';
import { EastingAxis } from '../axis/EastingAxis';
import { HeightAxis } from '../axis/HeightAxis';
import { NorthingAxis } from '../axis/NorthingAxis';
import { System } from './System';


export class Projected3DSystem extends System {
  public constructor () {
    super( { name: 'Projected 3D', axes: new AxisSet( { axes: [
      new EastingAxis(), new NorthingAxis(), new HeightAxis()
    ] } ) } );
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
