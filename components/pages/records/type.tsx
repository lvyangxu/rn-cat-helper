export interface Record {
    recordId: number
    petId: number
    day: string
    /** 1.猫三联，2.狂犬，3.内驱，4.外驱 */
    type: number[]
}