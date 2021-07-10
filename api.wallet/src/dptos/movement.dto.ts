import { MovementType } from "../common/enums/movement.type";

interface MovementCreateDto {
    type: MovementType | number;
    user_id: number;
    amount: number;
}

export {
    MovementCreateDto
}