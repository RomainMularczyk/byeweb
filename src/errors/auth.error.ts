/**
 * Error raised when an error occurs with a user authentication.
 *
 * @property {string} name - Error name.
 */
class AuthError extends Error {
  name: string;
  /**
   *
   * @param {string} message - Error message.
   */
  constructor(message: string = 'User could not be authenticated.') {
    super(message);
    this.name = 'Authentication error.';
  }
}

export default AuthError;
