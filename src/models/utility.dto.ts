import { ApiProperty } from "@nestjs/swagger"

export class response_message{
    statusCode:number
    message:string
}
export class response_file{
    @ApiProperty()
    statusCode:number
    @ApiProperty()
    url:string
    @ApiProperty()
    message:string
}
export class response_data{
    @ApiProperty()
    statusCode:number
    @ApiProperty()
    data:any
    @ApiProperty()
    message:string
}
export class response_data_list{
    @ApiProperty()
    statusCode:number
    @ApiProperty()
    data:any
    @ApiProperty()
    count:number
    @ApiProperty()
    page:number
    @ApiProperty()
    size:number
    @ApiProperty()
    message:string
}
export class access_token{
    @ApiProperty()
    code: string
    @ApiProperty()
    email: string 
    @ApiProperty()
    first_name: string
    @ApiProperty() 
    last_name: string
    @ApiProperty() 
    role_id: number
    @ApiProperty()
    role_code:string
    @ApiProperty()
    role_name:string
}

export class reset_password{
    @ApiProperty()
    email:string
}