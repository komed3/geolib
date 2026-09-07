import type { Coordinate } from '../coordinate/Coordinate';
import { Ellipsoid } from '../crs/Ellipsoid';
import { WGS84 } from '../registry/ellipsoids';
import { deg2Rad, rad2Deg } from '../utils/math';


export interface GeodesicResult {
  readonly distance: number;
  readonly initialBearing: number;
  readonly finalBearing: number;
}


const MAX_ITERATIONS = 200;
const CONVERGENCE = 1e-13;


export function normalizeBearing ( bearing: number ) : number {
  return ( bearing % 360 + 360 ) % 360;
}


function sphericalInverse ( a: Coordinate, b: Coordinate, radius: number ) : GeodesicResult {
  const lat1 = deg2Rad( a.latitude.value ), lat2 = deg2Rad( b.latitude.value );
  const deltaLon = deg2Rad( b.longitude.value - a.longitude.value );

  const sinLat1 = Math.sin( lat1 );
  const cosLat1 = Math.cos( lat1 );
  const sinLat2 = Math.sin( lat2 );
  const cosLat2 = Math.cos( lat2 );

  const centralAngle = Math.atan2( Math.hypot(
    cosLat2 * Math.sin( deltaLon ), cosLat1 * sinLat2 - sinLat1 * cosLat2 * Math.cos( deltaLon )
  ), sinLat1 * sinLat2 + cosLat1 * cosLat2 * Math.cos( deltaLon ) );

  if ( centralAngle === 0 ) return { distance: 0, initialBearing: 0, finalBearing: 0 };

  const initialBearing = normalizeBearing( rad2Deg( Math.atan2(
    Math.sin( deltaLon ) * cosLat2, cosLat1 * sinLat2 - sinLat1 * cosLat2 * Math.cos( deltaLon )
  ) ) );

  const finalBearing = normalizeBearing( rad2Deg( Math.atan2(
    Math.sin( deltaLon ) * cosLat1, -sinLat1 * cosLat2 + cosLat1 * sinLat2 * Math.cos( deltaLon )
  ) ) + 180 );

  return { distance: radius * centralAngle, initialBearing, finalBearing };
}


export function geodesic ( a: Coordinate, b: Coordinate, ellipsoid: Ellipsoid = WGS84 ) : GeodesicResult {
  const lat1 = deg2Rad( a.latitude.value ), lat2 = deg2Rad( b.latitude.value );
  const lon1 = deg2Rad( a.longitude.value ), lon2 = deg2Rad( b.longitude.value );

  const semiMajorAxis = ellipsoid.semiMajorAxis;
  const flattening = ellipsoid.flattening;
  const semiMinorAxis = ellipsoid.semiMinorAxis;

  if ( a.equals( b ) ) return { distance: 0, initialBearing: 0, finalBearing: 0 };
  if ( ellipsoid.isSphere() ) return sphericalInverse( a, b, semiMajorAxis );

  const reducedLat1 = Math.atan( ( 1 - flattening ) * Math.tan( lat1 ) );
  const reducedLat2 = Math.atan( ( 1 - flattening ) * Math.tan( lat2 ) );

  const sinReducedLat1 = Math.sin( reducedLat1 );
  const cosReducedLat1 = Math.cos( reducedLat1 );
  const sinReducedLat2 = Math.sin( reducedLat2 );
  const cosReducedLat2 = Math.cos( reducedLat2 );
  const deltaLon = lon2 - lon1;

  let lambda = deltaLon, previousLambda = Infinity;
  let sinSigma = 0, cosSigma = 0, sigma = 0, sinAlpha = 0;
  let cosSquaredAlpha = 0, cosSquaredSigmaM = 0;
  let converged = false;

  for ( let i = 0; i < MAX_ITERATIONS; i++ ) {
    const sinLambda = Math.sin( lambda ), cosLambda = Math.cos( lambda );
    const x = cosReducedLat2 * sinLambda;
    const y = cosReducedLat1 * sinReducedLat2 - sinReducedLat1 * cosReducedLat2 * cosLambda;

    sinSigma = Math.hypot( x, y );

    if ( sinSigma === 0 ) return { distance: 0, initialBearing: 0, finalBearing: 0 };

    cosSigma = sinReducedLat1 * sinReducedLat2 + cosReducedLat1 * cosReducedLat2 * cosLambda;
    sigma = Math.atan2( sinSigma, cosSigma );
    sinAlpha = cosReducedLat1 * cosReducedLat2 * sinLambda / sinSigma;
    cosSquaredAlpha = 1 - sinAlpha ** 2;
    cosSquaredSigmaM = cosSquaredAlpha === 0 ? 0 : cosSigma - 2 * sinReducedLat1 * sinReducedLat2 / cosSquaredAlpha;

    const c = flattening / 16 * cosSquaredAlpha * ( 4 + flattening * ( 4 - 3 * cosSquaredAlpha ) );
    const nextLambda = deltaLon + ( 1 - c ) * flattening * sinAlpha * (
      sigma + c * sinSigma * ( cosSquaredSigmaM + c * cosSigma * ( -1 + 2 * cosSquaredSigmaM ** 2 ) )
    );

    if ( Math.abs( nextLambda - lambda ) < CONVERGENCE ) {
      lambda = nextLambda, converged = true;
      break;
    }

    if ( nextLambda === previousLambda ) break;

    previousLambda = lambda;
    lambda = nextLambda;
  }

  if ( ! converged ) return sphericalInverse( a, b, ( 2 * semiMajorAxis + semiMinorAxis ) / 3 );

  const uSquared = cosSquaredAlpha * ( semiMajorAxis ** 2 - semiMinorAxis ** 2 ) / semiMinorAxis ** 2;
  const A = 1 + uSquared / 16384 * ( 4096 + uSquared * ( -768 + uSquared * ( 320 - 175 * uSquared ) ) );
  const B = uSquared / 1024 * ( 256 + uSquared * ( -128 + uSquared * ( 74 - 47 * uSquared ) ) );

  const deltaSigma = B * sinSigma * ( cosSquaredSigmaM + B / 4 * (
    cosSigma * ( -1 + 2 * cosSquaredSigmaM ** 2 ) - B / 6 * cosSquaredSigmaM *
    ( -3 + 4 * sinSigma ** 2 ) * ( -3 + 4 * cosSquaredSigmaM ** 2 )
  ) );

  const distance = semiMinorAxis * A * ( sigma - deltaSigma );

  const initialBearing = normalizeBearing( rad2Deg( Math.atan2(
    cosReducedLat2 * Math.sin( lambda ),
    cosReducedLat1 * sinReducedLat2 - sinReducedLat1 * cosReducedLat2 * Math.cos( lambda )
  ) ) );

  const finalBearing = normalizeBearing( rad2Deg( Math.atan2(
    cosReducedLat1 * Math.sin( lambda ),
    -sinReducedLat1 * cosReducedLat2 + cosReducedLat1 * sinReducedLat2 * Math.cos( lambda )
  ) ) + 180 );

  return { distance, initialBearing, finalBearing };
}
