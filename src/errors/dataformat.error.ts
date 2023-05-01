/**
 * Error raised when data provided could not be validated.
 *
 */
class DataFormatError extends Error {
  /**
   *
   * @param {string} message - Error message.
   */
  constructor(message = 'Data format is not valid.') {
    super(message);
    this.name = 'DataFormatError';
  }
}

export default DataFormatError;
