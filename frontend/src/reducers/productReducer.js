import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        allProducts: action.payload.allProducts,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const deleteOrUpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
        updatedProduct: action.payload.product,
      };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case PRODUCT_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
