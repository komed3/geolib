import { Geographic2DCoordinate } from '../coord';
import { Geographic2DSystem } from '../system';
import { BBox } from './BBox';


export class Geographic2DBBox extends BBox< Geographic2DCoordinate > {
  protected static override readonly factory = Geographic2DCoordinate.fromTuple.bind( Geographic2DCoordinate );

  public static override fromTuple ( tuple: [ number[], number[] ] ) : Geographic2DBBox {
    return super.fromTuple( tuple, new Geographic2DSystem() ) as Geographic2DBBox;
  }
}
