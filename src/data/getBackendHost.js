const getBackendHost = () => {
  return import.meta.env.VITE_BACKEND_HOST;
};

export default getBackendHost;
