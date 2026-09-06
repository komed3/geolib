export abstract class Registry< T > {
  private readonly entries = new Map< string, T >();
}
