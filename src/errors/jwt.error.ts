/**
* Error raised when an error occurs with JWT decoding.
* 
* @property {string} name - Error name.
*/
class JWTError extends Error {
  name: string;
  /**
  * 
  * @param {string} message - Error message.
  */
  constructor(message: string = 'JWT could not be verified.') {
    super(message);
    this.name = 'JWTError';
  }
}

export default JWTError;
