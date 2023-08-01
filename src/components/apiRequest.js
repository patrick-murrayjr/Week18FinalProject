/* eslint-disable no-unsafe-finally */
/**
 * Api request function
 *
 * This function is used to make api request to the server.
 *  @param {string} url - The url to make the request to.
 *  @param {object} optionsObj - The options object to pass to the fetch request.
 *  @param {string} errMsg - The error message to return if the request fails.
 *  @returns {string} - The error message if the request fails.
 *  @returns {object} - The response object if the request is successful.
 *
 */

export const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
   try {
      const response = await fetch(url, optionsObj);
      if (!response.ok) {
         throw new Error('No result found, please reload app.');
      }
   } catch (err) {
      console.log(err);
      errMsg = err.message;
   } finally {
      return errMsg;
   }
};

export default apiRequest;
