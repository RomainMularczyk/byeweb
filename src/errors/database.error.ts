/**
 * Error raised when an error occurs with the database.
 *
 * @property {string} name - Error name.
 */
class DatabaseError extends Error {
  name: string;
  /**
   *
   * @param {string} message - Error message.
   */
  constructor(message: string = 'Database did not response.') {
    super(message);
    this.name = 'DatabaseError';
  }
}

export default DatabaseError;
