import {userModel} from './user.model.js';
import bcrypt  from 'bcryptjs';
import * as uuid from 'uuid';
import mailService from '../tools/mail.service.js';
import tokenService from '../auth/token.service.js';
import {UserDto} from './user.dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async registration(email, password, city, name) {
        const candidate = await userModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exist`);
        }
        const passwordHash = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await userModel.create({
            email,
            password: passwordHash,
            activationLink,
            city,
            name
        });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink});
        if (!user) {
            throw new ApiError.BadRequest('Incorrect activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`User with ${email} not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Password is incorrect');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }
}

export default new UserService();
