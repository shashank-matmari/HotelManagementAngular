import { Amenities } from "./amenities";
import { Hotel } from "./hotel";
import { Roomtype } from "./roomtype";

export interface Room {
    room_id:number,
    room_number:number,
    is_available:boolean,
    amenities:Amenities[],
    img:string,
    room_type:Roomtype,
    hotel:Hotel
}
