import { describe, expect, it } from 'vitest';
import { DMS, DIRECTION_MAP_DE, DIRECTION_MAP_EN } from '../../src/base/DMS';


const components = ( dms: DMS ) => ( { deg: dms.degrees, min: dms.minutes, sec: dms.seconds, dir: dms.direction } );
