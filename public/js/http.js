/////////////////////////////////////////
////
class HTTP {
  /////////////////////////////////////////
  ////
  constructor(baseURL = '', timeout = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.interceptors = {
      request: [],
      response: [],
    };
  };
  
  /////////////////////////////////////////
  ////
  async request(
    url,
    options = {},
    onSuccess,
    onError,
  ) {
    let config = { ...options };

    for (let interceptor of this.interceptors.request) {
      config = await interceptor(config);
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(
        this.baseURL + url,
        {
          ...config,
          signal: controller.signal
        },
      );

      clearTimeout(timeoutId);

      console.log(response);
      let data = null;
      try {
        data = await response.json();
      } catch(e) {
        console.error("Invalid JSON format:", e);
        data = {
          status: response.status,
          message: response.statusText + " (" + response.status + ")",
        };
      };
      console.log(data);
      
      if (!response.ok) {
        onError(data);
        return;
      };
      
      let result = {
        headers: response.headers,
        status: response.status,
        data: data
      };
      
      for (let interceptor of this.interceptors.response) {
        result = await interceptor(result);
      };
      
      onSuccess(result.data);
    }
    
    catch (error) {
      if (error.name === 'AbortError') {
        onError('Request timeout');
        return;
      };
      
      onError(error);
    };
  };
  
  /////////////////////////////////////////
  // Interceptor support
  addRequestInterceptor(fn) { 
    this.interceptors.request.push(fn); 
  };
  
  addResponseInterceptor(fn) { 
    this.interceptors.response.push(fn); 
  };

  /////////////////////////////////////////
  // Convenience methods
  get(
    url,
    onSuccess,
    onError,
    options,
  ) {
    return this.request(
      url,
      {
        ...options,
        method: 'GET'
      },
      onSuccess,
      onError,
    );
  };

  ///////
  post(
    url,
    data,
    onSuccess,
    onError,
    options,
  ) {
    const isFormData = Object.prototype.toString.call(data) === '[object FormData]';
    return this.request(
      url,
      {
        ...options, 
        method: 'POST', 
        headers: isFormData ? {
          ...options?.headers,
        } : {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: isFormData ? data : JSON.stringify(data),
      },
      onSuccess,
      onError,
    );
  };
  
  ///////
  put(
    url,
    data,
    onSuccess,
    onError,
    options,
  ) {
    const isFormData = Object.prototype.toString.call(data) === '[object FormData]';
    return this.request(
      url,
      {
        ...options, 
        method: 'PUT', 
        headers: isFormData ? {
          ...options?.headers,
        } : {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        body: isFormData ? data : JSON.stringify(data),
      },
      onSuccess,
      onError,
    ); 
  };
  
  ///////
  delete(
    url,
    onSuccess,
    onError,
    options,
  ) { 
    return this.request(
      url,
      {
        ...options,
        method: 'DELETE'
      },
      onSuccess,
      onError,
    );
  };
};

/////////////////////////////////////////
////
const http = new HTTP();