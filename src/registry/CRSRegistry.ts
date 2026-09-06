import { CRS } from '../crs/CRS';
import { Registry } from './Registry';


export class CRSRegistry extends Registry< CRS > {
  protected override normalize ( code: string ) : string {
    return code.toUpperCase();
  }
}
