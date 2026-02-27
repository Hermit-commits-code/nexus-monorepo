export type ModuleId = "crm" | "inv" | "fin" | "dash";

export interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
}
