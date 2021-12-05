export const BASE_URL = process.env.BASE_URL;
export const ACCOMMONDATION_PATH = "/accommodation/";
export const ACCOMMONDATION_STATE_PATH = "?_publicationState=preview"; // security risk: strapi backend default setting must be altered. Unauthorized visitors shouldn't be able to view drafted state.
export const ACCOMMONDATION_FEATURED_PATH = "?featured=true";
export const TOKEN_PATH = "/auth/local";
export const CONTACT_PATH = "/visitor-messages/";
export const CONTACT_STATE_PATH = "/visitor-messages?_publicationState=preview";
export const ENQUIRIES_PATH = "/enquiries/";
export const ENQUIRIES_STATE_PATH = "/enquiries?_publicationState=preview";
