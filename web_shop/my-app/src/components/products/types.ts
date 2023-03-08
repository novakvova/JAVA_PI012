export interface IPorductCreate {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>
}