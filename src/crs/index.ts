import { CRS } from './CRS';
import { CRSRegistry } from './CRSRegistry';
import { DATUMS } from './datums';


export const CRS_REGISTRY = new CRSRegistry();

CRS_REGISTRY.register( new CRS( 'EPSG:4326', 'WGS 84', 'geographic', DATUMS.WGS84 ) );
CRS_REGISTRY.register( new CRS( 'EPSG:3857', 'WGS 84 / Pseudo-Mercator', 'projected', DATUMS.WGS84 ) );
