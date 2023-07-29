/* eslint-disable no-unsafe-finally */

// Function to make API request and return error message if any
// url: API url
// optionsObj: options object for fetch
// errMsg: error message to be returned

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
