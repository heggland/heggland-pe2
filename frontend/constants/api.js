export const BASE_URL = process.env.BASE_URL;
export const HOTELS_PATH = "/hotels";
export const HOTEL_PATH = "/hotels/"; // /hotels/:id
export const HOTEL_STATE_PATH = "?_publicationState=preview"; // security risk: strapi backend default setting must be altered. Unauthorized visitors shouldn't be able to view drafted state.
export const TOKEN_PATH = "/auth/local";
export const CONTACT_PATH = "/visitor-messages/";
export const ENQUIRIES_PATH = "/enquiries/";
