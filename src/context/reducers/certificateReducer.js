import {
  ADD_CERTIFICATE_FAIL,
  ADD_CERTIFICATE_START,
  ADD_CERTIFICATE_SUCCESS,
  DELETE_CERTIFICATE_FAIL,
  DELETE_CERTIFICATE_START,
  DELETE_CERTIFICATE_SUCCESS,
  GET_CERTIFICATES_FAIL,
  GET_CERTIFICATES_START,
  GET_CERTIFICATES_SUCCESS,
  GET_ONE_CERTIFICATE_FAIL,
  GET_ONE_CERTIFICATE_START,
  GET_ONE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_START,
  UPDATE_CERTIFICATE_SUCCESS,
} from "../types/certificate_types";

export const certificateInitialState = {
  certificates: [],
  getCertificatesLoading: true,
  getOneCertificateLoading: true,
  addCertificateLoading: false,
  deleteCertificateLoading: false,
  updateCertificateLoading: false,
  certificate: null,
};

export const certificateReducer = (state = certificateInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CERTIFICATES_START:
      return {
        ...state,
        getCertificatesLoading: true,
      };
    case GET_CERTIFICATES_FAIL:
      return {
        ...state,
        getCertificatesLoading: false,
      };
    case GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: payload,
        getCertificatesLoading: false,
      };
    case GET_ONE_CERTIFICATE_START:
      return {
        ...state,
        getOneCertificateLoading: true,
      };
    case GET_ONE_CERTIFICATE_FAIL:
      return {
        ...state,
        getOneCertificateLoading: false,
      };
    case GET_ONE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        certificate: payload,
        getOneCertificateLoading: false,
      };
    case ADD_CERTIFICATE_START:
      return {
        ...state,
        addCertificateLoading: true,
      };
    case ADD_CERTIFICATE_FAIL:
      return {
        ...state,
        addCertificateLoading: false,
      };
    case ADD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        certificates: [...state.certificates, payload],

        addCertificateLoading: false,
      };
    case DELETE_CERTIFICATE_START:
      return {
        ...state,
        deleteCertificateLoading: true,
      };
    case DELETE_CERTIFICATE_FAIL:
      return {
        ...state,
        deleteCertificateLoading: false,
      };
    case DELETE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        certificates: state.certificates.filter((val) => val._id !== payload),
        deleteCertificateLoading: false,
      };
    case UPDATE_CERTIFICATE_START:
      return {
        ...state,
        updateCertificateLoading: true,
      };
    case UPDATE_CERTIFICATE_FAIL:
      return {
        ...state,
        updateCertificateLoading: false,
      };
    case UPDATE_CERTIFICATE_SUCCESS:
      var data = state.certificates;
      var index = data.findIndex((val) => val._id === payload._id);
      if (index !== -1) data[index] = payload;
      return {
        ...state,
        certificates: data,
        updateCertificateLoading: false,
      };

    default:
      return state;
  }
};
