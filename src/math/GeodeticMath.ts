export class GeodeticMath {
  public static readonly EARTH_RADIUS_METERS = 6371000;
  public static readonly WEB_MERCATOR_RADIUS = 6378137;
  public static readonly METERS_PER_DEGREE_LAT = 111_320;

  public static degToRad ( deg: number ) : number {
    return ( deg * Math.PI ) / 180;
  }

  public static radToDeg ( rad: number ) : number {
    return ( rad * 180 ) / Math.PI;
  }
}
