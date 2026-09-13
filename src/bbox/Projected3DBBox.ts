import { Projected3DCoordinate } from '../coord';
import { Projected3DSystem } from '../system';
import { BBox } from './BBox';


export class Projected3DBBox extends BBox< Projected3DCoordinate > {
  protected static override readonly factory = Projected3DCoordinate.fromTuple.bind( Projected3DCoordinate );

  public static override fromTuple ( tuple: [ [ number, number, number ], [ number, number, number ] ] ) : Projected3DBBox {
    return super.fromTuple( tuple, new Projected3DSystem() ) as Projected3DBBox;
  }
}
