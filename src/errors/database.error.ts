/**
 * Error raised when an error occurs with the database.
 *
 */
class DatabaseError extends Error {
  /**
   *
   * @param {string} message - Error message.
   */
  constructor(message = 'Database did not response.') {
    super(message);
    this.name = 'DatabaseError';
  }
}

export default DatabaseError;
