import { CRS } from '../crs/CRS';
import { Registry } from './Registry';


export class CRSRegistry extends Registry< CRS > {
  public override register ( crs: CRS ) : void {
    super.register( { ...crs, code: crs.code.toUpperCase() } as CRS );
  }

  public override get ( code: string ) : CRS | undefined {
    return super.get( code.toUpperCase() );
  }

  public override has ( code: string ) : boolean {
    return super.has( code.toUpperCase() );
  }

  public override remove ( code: string ) : boolean {
    return super.remove( code.toUpperCase() );
  }
}
