import {userModel} from './user.model.js';
import bcrypt  from 'bcryptjs';
import * as uuid from 'uuid';
import mailService from '../tools/mail.service.js';
import tokenService from '../auth/token.service.js';
import {UserDto} from './user.dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exist`);
        }
        const passwordHash = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await userModel.create({email, password: passwordHash, activationLink});
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
}

export default new UserService();
