export class Product {
    prod_id: number;
    prod_name: string;
    prod_desc: string;
    prod_measure: string;
    price: number;
    currency_id: number;
    cat_id: number;
    quant_id: number;
    measure_id: number;
    image_url: string;
};
export class ProdQuant {
    prod_id: number;
    price: number;
    currency_id: number;
    quant_id: number;
    measure_id: number;
}