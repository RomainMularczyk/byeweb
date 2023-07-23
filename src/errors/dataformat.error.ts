/**
 * Error raised when data provided could not be validated.
 *
 * @property {string} name - Error name.
 */
class DataFormatError extends Error {
  name: string;
  /**
   *
   * @param {string} message - Error message.
   */
  constructor(message: string = 'Data format is not valid.') {
    super(message);
    this.name = 'DataFormatError';
  }
}

export default DataFormatError;
