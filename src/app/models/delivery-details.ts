export class DeliveryDetails {
    sname: string;
    slname: string;
    contact: number;
    address: string;
    landmark: string;
    city: {
        city_name: string;
        city_id: number;
    };
    state: {
        state_name: string;
        state_id: number;
    };
    country: {
        country_name: string;
        country_id: number;
    };
    pincode: number;
}