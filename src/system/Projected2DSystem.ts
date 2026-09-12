import { AxisSet } from '../axis/AxisSet';
import { EastingAxis } from '../axis/EastingAxis';
import { NorthingAxis } from '../axis/NorthingAxis';
import { System } from './System';


export class Projected2DSystem extends System {
  public constructor () {
    super( { name: 'Projected 2D', axes: new AxisSet( { axes: [
      new EastingAxis(), new NorthingAxis()
    ] } ) } );
  }

  public get easting () : EastingAxis {
    return this.axes.get( 0 );
  }

  public get northing () : NorthingAxis {
    return this.axes.get( 1 );
  }
}
