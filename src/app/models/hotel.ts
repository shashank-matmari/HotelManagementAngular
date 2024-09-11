import { Amenities } from "./amenities";
import { Room } from "./room";

export interface Hotel {
    hotel_id:number,
    name:string,
    location:string,
    description:string,
    img:string,
    amenities:Amenities[],
    rooms:Room[]
}
