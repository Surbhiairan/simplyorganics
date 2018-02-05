export class DeliveryOption {
  public id: Number;
  public name: string;
  public description: string;
  public price: Number;

  public updateFrom(src: DeliveryOption): void {
      this.id = src.id;
      this.name = src.name;
      this.description = src.description;
      this.price = src.price;
  }
}
