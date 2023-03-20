export interface IPorductCreate {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>
}

export interface IPorductEdit {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>,
    removeFiles: string[]
}

export interface IProductItem {
    id: number|string|undefined,
    name: string,
    price: number,
    category_id: string,
    category: string,
    files: string[],
    description: string
}