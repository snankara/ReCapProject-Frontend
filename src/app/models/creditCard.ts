export interface CreditCard{
    cardId?:number;
    cardNumber:string;
    cardCvv:string;
    cardExpirationDate:string;
    nameOnTheCard:string;
    moneyInTheCard?:number;
}