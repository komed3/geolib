import { Registry } from '../abstract/Registry';
import { CRS } from './CRS';


export class CRSRegistry extends Registry< CRS > {
  public get ( code: string | number ) : CRS {
    const key = typeof code === 'number' ? `EPSG:${ code }` : code.toUpperCase();
    return super.get( key );
  }

  public has ( code: string | number ) : boolean {
    const key = typeof code === 'number' ? `EPSG:${ code }` : code.toUpperCase();
    return super.has( key );
  }

  public register ( crs: CRS ) : void {
    super.add( crs.code.toUpperCase(), crs );
  }
}
