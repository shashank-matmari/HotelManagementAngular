import { Reservation } from "./reservation";


export interface Payment {
    payment_id:string;
    amount:DoubleRange;
    payment_date:Date;
    payment_status:String;
    payment_type:String;
    reservation:Reservation;
}
