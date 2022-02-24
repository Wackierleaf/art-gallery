export class UserDto {
    email;
    name;
    city;
    id;
    isActivated;
    isAdmin;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.city = model.city;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.isAdmin = model.isAdmin;
    }
}
