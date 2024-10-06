import { Body, Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { UserDTO } from './userDTO';
import { UserService } from './user.service';
import { UserListDTO } from './userListDTO';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UserService) {}
    @Get()  
    async getAllUsers(@Req() req: any): Promise<UserListDTO> {        
        const userList = await this.userService.getAllUsers();        

        return { userList }; 
    }

    @Get(":id")  
    async getUserByID(@Param("id") id: number): Promise<UserDTO> {   
        return await this.userService.getUser(id);  
    }

    @Put(":id")
    async updateUserByID(@Param("id") id: number, @Body() userDTO: UserDTO): Promise<UserDTO> 
    { 
    return await this.userService.updateUser(id, userDTO);  
    }
    
    @Delete(":id")  
    async deleteUserByID(@Param("id") id: number): Promise<UserDTO> 
    {  
    return await this.userService.deleteUser(id);  
    }
}
