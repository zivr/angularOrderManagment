class User {
    get isAdmin() {
        return this.customer.type === 0;
    }
    get username() {
        return this.customer.name;
    }
    get id() {
        return this.customer._id;
    }
    constructor(customerDB) {
        this.customer = customerDB;
    }
};

module.exports = User;