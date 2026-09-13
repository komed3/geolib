import { Projected2DCoordinate } from '../coord';
import { Projected2DSystem } from '../system';
import { BBox } from './BBox';


export class Projected2DBBox extends BBox< Projected2DCoordinate > {
  protected static override readonly factory = Projected2DCoordinate.fromTuple.bind( Projected2DCoordinate );

  public static override fromTuple ( tuple: [ [ number, number ], [ number, number ] ] ) : Projected2DBBox {
    return super.fromTuple( tuple, new Projected2DSystem() ) as Projected2DBBox;
  }
}
