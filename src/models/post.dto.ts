import { ApiProperty } from "@nestjs/swagger";

export class post_form_action {
    @ApiProperty()
    id:number
    @ApiProperty()
    content: string
    @ApiProperty()
    images: string[]
}

export class post_get_all{
    @ApiProperty()
    page:number|string
    @ApiProperty()
    size:number|string
}

export class post_like{
    @ApiProperty()
    post_id:number
    @ApiProperty()
    post_likes:string[]
}