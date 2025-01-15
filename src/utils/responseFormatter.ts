interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const formatResponse = <T>(data?: T, error?: string): ApiResponse<T> => {
  if (error) {
    return {
      success: false,
      error,
    };
  }
  return {
    success: true,
    data,
  };
}; 