import { ApiProperty } from "@nestjs/swagger";
import { user } from "src/entities/user.entity";

export class user_sign_up {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    profile_img: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    tel:string;
    @ApiProperty()
    birthday:string;
    @ApiProperty()
    role_id:number
    @ApiProperty()
    role_code:string
    @ApiProperty()
    introduction:string
}
export class user_sign_in{
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
}
export class user_session{
    @ApiProperty()
    id:number
    @ApiProperty()
    code:string
    @ApiProperty()
    email:string
    @ApiProperty()
    profile_img:string
    @ApiProperty()
    first_name:string
    @ApiProperty()
    last_name:string
    @ApiProperty()
    role_id:number
    @ApiProperty()
    role_code:string
    @ApiProperty()
    role_name:string
    @ApiProperty()
    access_token:string
}
export interface user_data{
    id: number;
    code: string;
    profile_img:string
    email: string;
    first_name: string;
    last_name: string;
    role_id: number;
    role_code: string;
    role_name:string
    tel: string;
    birthday:Date
    introduction:string
}