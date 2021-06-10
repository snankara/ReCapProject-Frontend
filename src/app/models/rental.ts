export interface Rental{
    carId:number;
    customerId:number;
    carName:string;
    firstName?:string;
    lastName?:string;
    dailyPrice:number;
    rentDate:Date;
    returnDate:Date;
    imagePath?:string[];
}