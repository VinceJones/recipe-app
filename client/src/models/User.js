/**
 * User model.
 *
 * @public
 */
export default class User {
    /**
     * User constructor.
     *
     * @param {Object} User
     * @public
     */
    constructor(user = {}) {
      this.accessToken = user.accessToken ? user.accessToken : '';
      this.clientId = user.clientId ? user.clientId : '';
      this.isUserAdmin = user.isUserAdmin ? user.isUserAdmin : false;
    }
  }
  