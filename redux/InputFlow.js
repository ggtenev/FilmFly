export const ADD_TO_VIDEOS = 'ADD_TO_VIDEOS '
export const REMOVE_FROM_VIDEOS  = 'REMOVE_FROM_VIDEOS '
export const SET_PROJECT_TITLE  = 'SET_PROJECT_TITLE '
export const SET_VIDEO_LENGTH  = 'SET_VIDEO_LENGTH '
export const SET_VIDEO_ORIENTATION  = 'SET_PROJECT_ORIENTATION '
export const SET_VIDEO_TEXT  = 'SET_VIDEO_TEXT '
export const SET_ABOUT_VIDEO  = 'SET_ABOUT_VIDEO'
export const SET_AGREED_TO_TERMS  = 'SET_AGREED_TO_TERMS'
export const SET_CARDHOLDER_NAME  = 'SET_CARDHOLDER_NAME'
export const SET_CREDIT_CARD_NUMBER  = 'SET_CREDIT_CARD_NUMBER'
export const SET_EXPIRY_DATE  = 'SET_EXPIRY_DATE'
export const SET_CVV  = 'SET_CVV'
export const SET_BILLING_ZIP_CODE  = 'SET_BILLING_ZIP_CODE'
export const SET_LOGGED_IN  = 'SET_LOGGED_IN'
export const RESET_PROJECT_DETAILS = 'RESET_PROJECT_DETAILS'

var initialState = {
    isLoggedIn:false,
    projectTitle: "",
    videos: [],
    videoLength: 0,
    videoOrientation: "VERTICAL",
    videoText: "",
    aboutVideo: "",
    agreedToTerms: false,
    cardholderName: "",
    creditCardNumber: "",
    expiryDate: "",
    cvv: "",
    billingZipCode: "",
}

const inputFlowReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_VIDEOS:
      return  {
          ...state,
          videos:[...state.videos, action.payload]
        }
    case REMOVE_FROM_VIDEOS:
        return  {
            ...state,
            videos: state.videos.filter(video => video.id !== action.payload.id)
          }
      
    case SET_PROJECT_TITLE:
        return {
            ...state,
            projectTitle: action.payload
          }
    case SET_VIDEO_LENGTH :
        return {
            ...state,
            videoLength: action.payload
          }
    case  SET_VIDEO_ORIENTATION:
        return {
            ...state,
            videoOrientation: action.payload
          }
    case  SET_VIDEO_TEXT :
        return {
            ...state,
            videoText: action.payload
          }
    case  SET_ABOUT_VIDEO :
        return {
            ...state,
            aboutVideo: action.payload
          }
    case  SET_AGREED_TO_TERMS:
        return {
            ...state,
            agreedToTerms: action.payload
          }
    case  SET_CARDHOLDER_NAME :
        return {
            ...state,
            cardholderName: action.payload
          }
    case  SET_CREDIT_CARD_NUMBER :
        return {
            ...state,
            creditCardNumber: action.payload
          }
    case  SET_EXPIRY_DATE:
        return {
            ...state,
            expiryDate: action.payload
          }
    case  SET_CVV :
        return {
            ...state,
            cvv: action.payload
          }
    case  SET_BILLING_ZIP_CODE:
        return {
            ...state,
            billingZipCode: action.payload
          }
    case SET_LOGGED_IN:
        return {
            ...state,
            isLoggedIn:action.payload
        }
    case RESET_PROJECT_DETAILS:
        return{
            ...state,
            videos: [],
            videoLength: 0,
            videoOrientation: "VERTICAL",
            videoText: "",
            aboutVideo: "",
            agreedToTerms: false,
            cardholderName: "",
            creditCardNumber: "",
            expiryDate: "",
            cvv: "",
            billingZipCode: "",
        }
  }
  return state
}

export default inputFlowReducer