export class Product {
    ppq_id: number;
    prod_id: number;
    prod_name: string;
    prod_desc: string;
    prod_measure: string;
    prod_price: number;
    currency_id: number;
    cat_id: number;
    quant_id: number;
    measure_id: number;
    image_url: string;
    quantity: number;
    basket: boolean;
    featuredproduct: boolean;
}
export class ProdQuant {
    prod_id: number;
    price: number;
    currency_id: number;
    quant_id: number;
    measure_id: number;
}
