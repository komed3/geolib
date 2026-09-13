import { Geographic3DCoordinate } from '../coord';
import { Geographic3DSystem } from '../system';
import { BBox } from './BBox';


export class Geographic3DBBox extends BBox< Geographic3DCoordinate > {
  protected static override readonly factory = Geographic3DCoordinate.fromTuple.bind( Geographic3DCoordinate );

  public static override fromTuple ( tuple: [ [ number, number, number ], [ number, number, number ] ] ) : Geographic3DBBox {
    return super.fromTuple( tuple, new Geographic3DSystem() ) as Geographic3DBBox;
  }
}
