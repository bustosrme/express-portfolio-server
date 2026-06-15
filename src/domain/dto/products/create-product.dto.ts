import { Validators } from "../../../utils";

export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly description: string,
        public readonly price: number,
        public readonly user: string,
        public readonly category: string,
        public readonly img?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, available = false, description, price, img, user, category } = object;
        let availableBoolean = available;

        if (!name) return ['name is required'];
        if (price && typeof price !== 'number') return ['price must be a number'];
        if (price && price < 0) return ['price must be greater than 0'];
        if (typeof available !== 'boolean') {
            availableBoolean = available === 'true';
        }
        if (!user) return ['user is required'];
        if (!Validators.isMongoID(user)) return ['user is invalid'];
        if (!category) return ['category is required'];
        if (!Validators.isMongoID(category)) return ['category is invalid'];

        return [undefined, new CreateProductDto(name, availableBoolean, description, price, user, category, img)];
    }
}