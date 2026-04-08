export interface IStatusCode {
  code : number,
  codeString : string,
  message : string,
  description : string,
};

export const statusCodes = {
  '1xx-Information': {      
    code: 1,
    codeString: '1xx',      
    message: 'Information', 
    description: '1xx codes are often interim responses for sharing connection status information. Not intended for final request or response action.'
  },
  '100-Continue': {
    code: 100,
    codeString: '100',      
    message: 'Continue',    
    description: 'The server has received the request headers, and the client should proceed to send the request body.'
  },
  '101-Switching-Protocols': {
    code: 101,
    codeString: '101',      
    message: 'Switching Protocols',
    description: 'The requester has asked the server to switch protocols.'
  },
  '102-Processing': {       
    code: 102,
    codeString: '102',      
    message: 'Processing',  
    description: 'This code indicates that the server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost.'
  },
  '103-Early-Hints': {      
    code: 103,
    codeString: '103',      
    message: 'Early Hints', 
    description: 'Used to return some response headers before final HTTP message.'  
  },
  

  '2xx-Successful': {       
    code: 2,
    codeString: '2xx',      
    message: 'Successful',  
    description: '2xx codes indicate successful responses usually this means the action requested by the client was received, understood and accepted successfully.'    
  },
  '200-OK': {
    code: 200,
    codeString: '200',      
    message: 'OK',
    description: 'The request is OK (this is the standard response for successful HTTP requests).'
  },
  '201-Created': {
    code: 201,
    codeString: '201',      
    message: 'Created',     
    description: 'The request has been fulfilled, and a new resource is created.'   
  },
  '202-Accepted': {
    code: 202,
    codeString: '202',      
    message: 'Accepted',    
    description: 'The request has been accepted for processing, but the processing has not been completed.'     
  },
  '203-Non-Authoritative-Information': {
    code: 203,
    codeString: '203',      
    message: 'Non-Authoritative Information',
    description: 'The request has been successfully processed, but is returning information that may be from another source.'
  },
  '204-No-Content': {       
    code: 204,
    codeString: '204',      
    message: 'No Content',  
    description: 'The request has been successfully processed, but is not returning any content.'
  },
  '205-Reset-Content': {    
    code: 205,
    codeString: '205',      
    message: 'Reset Content',
    description: 'The request has been successfully processed, but is not returning any content, and requires that the requester reset the document view.'
  },
  '206-Partial-Content': {  
    code: 206,
    codeString: '206',      
    message: 'Partial Content',
    description: 'The server is delivering only part of the resource due to a range header sent by the client.' 
  },
  '207-Multi-Status': {     
    code: 207,
    codeString: '207',      
    message: 'Multi-Status',
    description: 'The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.'
  },
  '208-Already-Reported': { 
    code: 208,
    codeString: '208',      
    message: 'Already Reported',
    description: 'The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.'       
  },
  '218-This-is-fine-Apache-Web-Server': {
    code: 218,
    codeString: '218',      
    message: 'This is fine (Apache Web Server)',        
    description: 'Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled.'
  },
  '226-IM-Used': {
    code: 226,
    codeString: '226',      
    message: 'IM Used',     
    description: 'The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.'   
  },
  '300-Multiple-Choices': { 
    code: 300,
    codeString: '300',      
    message: 'Multiple Choices',
    description: 'A link list. The user can select a link and go to that location. Maximum five addresses.'     
  },


  '3xx-Redirection': {      
    code: 3,
    codeString: '3xx',      
    message: 'Redirection', 
    description: '3xx codes are a class of responses that suggest the User-Agent must follow another course of action to obtain the complete requested resource.'       
  },
  '301-Moved-Permanently': {
    code: 301,
    codeString: '301',      
    message: 'Moved Permanently',
    description: 'The requested page has moved to a new URL.'
  },
  '302-Found': {
    code: 302,
    codeString: '302',      
    message: 'Found',       
    description: 'The requested page has moved temporarily to a new URL.'
  },
  '303-See-Other': {        
    code: 303,
    codeString: '303',      
    message: 'See Other',   
    description: 'The requested page can be found under a different URL.'
  },
  '304-Not-Modified': {     
    code: 304,
    codeString: '304',      
    message: 'Not Modified',
    description: 'Indicates the requested page has not been modified since last requested.'
  },
  '306-Switch-Proxy': {     
    code: 306,
    codeString: '306',      
    message: 'Switch Proxy',
    description: 'No longer used. Originally meant "Subsequent requests should use the specified proxy."'       
  },
  '307-Temporary-Redirect': {
    code: 307,
    codeString: '307',      
    message: 'Temporary Redirect',
    description: 'The requested page has moved temporarily to a new URL.'
  },
  '308-Resume-Incomplete': {
    code: 308,
    codeString: '308',      
    message: 'Resume Incomplete',
    description: 'Used in the resumable requests proposal to resume aborted PUT or POST requests.'
  },


  '4xx-Client-Error': {     
    code: 4,
    codeString: '4xx',      
    message: 'Client Error',
    description: '4xx codes generally are error responses specifying an issue at the client’s end. Potentially a network issue.'
  },
  '400-Bad-Request': {      
    code: 400,
    codeString: '400',      
    message: 'Bad Request', 
    description: 'The request cannot be fulfilled due to bad syntax.'
  },
  '401-Unauthorized': {     
    code: 401,
    codeString: '401',      
    message: 'Unauthorized',
    description: 'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided.'
  },
  '402-Payment-Required': { 
    code: 402,
    codeString: '402',      
    message: 'Payment Required',
    description: 'Not yet implemented by RFC standards, but reserved for future use.'
  },
  '403-Forbidden': {        
    code: 403,
    codeString: '403',      
    message: 'Forbidden',   
    description: 'The request was a legal request, but the server is refusing to respond to it.'
  },
  '404-Not-Found': {        
    code: 404,
    codeString: '404',      
    message: 'Not Found',   
    description: 'The requested page could not be found but may be available again in the future.'
  },
  '405-Method-Not-Allowed': {
    code: 405,
    codeString: '405',      
    message: 'Method Not Allowed',
    description: 'A request was made of a page using a request method not supported by that page.'
  },
  '406-Not-Acceptable': {   
    code: 406,
    codeString: '406',      
    message: 'Not Acceptable',
    description: 'The server can only generate a response that is not accepted by the client.'
  },
  '407-Proxy-Authentication-Required': {
    code: 407,
    codeString: '407',      
    message: 'Proxy Authentication Required',
    description: 'The client must first authenticate itself with the proxy.'        
  },
  '408-Request-Timeout': {  
    code: 408,
    codeString: '408',      
    message: 'Request Timeout',
    description: 'The server timed out waiting for the request.'
  },
  '409-Conflict': {
    code: 409,
    codeString: '409',      
    message: 'Conflict',    
    description: 'The request could not be completed because of a conflict in the request.'
  },
  '410-Gone': {
    code: 410,
    codeString: '410',      
    message: 'Gone',        
    description: 'The requested page is no longer available.'
  },
  '411-Length-Required': {  
    code: 411,
    codeString: '411',      
    message: 'Length Required',
    description: 'The "Content-Length" is not defined. The server will not accept the request without it.'      
  },
  '412-Precondition-Failed': {
    code: 412,
    codeString: '412',      
    message: 'Precondition Failed',
    description: 'The precondition given in the request evaluated to false by the server.'
  },
  '413-Request-Entity-Too-Large': {
    code: 413,
    codeString: '413',      
    message: 'Request Entity Too Large',
    description: 'The server will not accept the request, because the request entity is too large.'
  },
  '414-Request-URI-Too-Long': {
    code: 414,
    codeString: '414',      
    message: 'Request-URI Too Long',
    description: 'The server will not accept the request, because the URL is too long. Occurs when you convert a POST request to a GET request with a long query information.'
  },
  '415-Unsupported-Media-Type': {
    code: 415,
    codeString: '415',      
    message: 'Unsupported Media Type',
    description: 'The server will not accept the request, because the media type is not supported.'
  },
  '416-Requested-Range-Not-Satisfiable': {
    code: 416,
    codeString: '416',      
    message: 'Requested Range Not Satisfiable',
    description: 'The client has asked for a portion of the file, but the server cannot supply that portion.'   
  },
  '417-Expectation-Failed': {
    code: 417,
    codeString: '417',      
    message: 'Expectation Failed',
    description: 'The server cannot meet the requirements of the Expect request-header field.'
  },
  '418-Im-a-teapot': {      
    code: 418,
    codeString: '418',      
    message: "I'm a teapot",
    description: `Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.`       
  },
  '419-Page-Expired-Laravel-Framework': {
    code: 419,
    codeString: '419',      
    message: 'Page Expired (Laravel Framework)',        
    description: 'Used by the Laravel Framework when a CSRF Token is missing or expired.'
  },
  '420-Method-Failure-Spring-Framework': {
    code: 420,
    codeString: '420',      
    message: 'Method Failure (Spring Framework)',       
    description: 'A deprecated response used by the Spring Framework when a method has failed.'
  },
  '421-Misdirected-Request': {
    code: 421,
    codeString: '421',      
    message: 'Misdirected Request',
    description: 'The request was directed at a server that is not able to produce a response (for example because a connection reuse).'    
  },
  '422-Unprocessable-Entity': {
    code: 422,
    codeString: '422',      
    message: 'Unprocessable Entity',
    description: 'The request was well-formed but was unable to be followed due to semantic errors.'
  },
  '423-Locked': {
    code: 423,
    codeString: '423',      
    message: 'Locked',      
    description: 'The resource that is being accessed is locked.'
  },
  '424-Failed-Dependency': {
    code: 424,
    codeString: '424',      
    message: 'Failed Dependency',
    description: 'The request failed due to failure of a previous request (e.g., a PROPPATCH).'
  },
  '426-Upgrade-Required': { 
    code: 426,
    codeString: '426',      
    message: 'Upgrade Required',
    description: 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.'
  },
  '428-Precondition-Required': {
    code: 428,
    codeString: '428',      
    message: 'Precondition Required',
    description: 'The origin server requires the request to be conditional.'        
  },
  '429-Too-Many-Requests': {
    code: 429,
    codeString: '429',      
    message: 'Too Many Requests',
    description: 'The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes.'
  },
  '431-Request-Header-Fields-Too-Large': {
    code: 431,
    codeString: '431',      
    message: 'Request Header Fields Too Large',
    description: 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.'      
  },
  '440-Login-Time-out': {   
    code: 440,
    codeString: '440',      
    message: 'Login Time-out',
    description: "The client's session has expired and must log in again. (IIS)"    
  },
  '444-Connection-Closed-Without-Response': {
    code: 444,
    codeString: '444',      
    message: 'Connection Closed Without Response',      
    description: 'A non-standard status code used to instruct nginx to close the connection without sending a response to the client, most commonly used to deny malicious or malformed requests.'  
  },
  '449-Retry-With': {       
    code: 449,
    codeString: '449',      
    message: 'Retry With',  
    description: 'The server cannot honour the request because the user has not provided the required information. (IIS)'
  },
  '450-Blocked-by-Windows-Parental-Controls': {
    code: 450,
    codeString: '450',      
    message: 'Blocked by Windows Parental Controls',    
    description: 'The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.'
  },
  '451-Unavailable-For-Legal-Reasons': {
    code: 451,
    codeString: '451',      
    message: 'Unavailable For Legal Reasons',
    description: 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.'
  },
  '494-Request-Header-Too-Large': {
    code: 494,
    codeString: '494',      
    message: 'Request Header Too Large',
    description: 'Used by nginx to indicate the client sent too large of a request or header line that is too long.'
  },
  '495-SSL-Certificate-Error': {
    code: 495,
    codeString: '495',      
    message: 'SSL Certificate Error',
    description: 'An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.'      
  },
  '496-SSL-Certificate-Required': {
    code: 496,
    codeString: '496',      
    message: 'SSL Certificate Required',
    description: 'An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.'
  },
  '497-HTTP-Request-Sent-to-HTTPS-Port': {
    code: 497,
    codeString: '497',      
    message: 'HTTP Request Sent to HTTPS Port',
    description: 'An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.'
  },
  '498-Invalid-Token-Esri': {
    code: 498,
    codeString: '498',      
    message: 'Invalid Token (Esri)',
    description: 'Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.'     
  },
  '499-Client-Closed-Request': {
    code: 499,
    codeString: '499',      
    message: 'Client Closed Request',
    description: 'A non-standard status code introduced by nginx for the case when a client closes the connection while nginx is processing the request.'
  },


  '5xx-Server-Error': {     
    code: 5,
    codeString: '5xx',      
    message: 'Server Error',
    description: '5xx error codes indicate that an error or unresolvable request occurred on the server side, whether that is a proxy or the origin host.'
  },
  '500-Internal-Server-Error': {
    code: 500,
    codeString: '500',      
    message: 'Internal Server Error',
    description: 'An error has occurred in a server side script, a no more specific message is suitable.'       
  },
  '501-Not-Implemented': {  
    code: 501,
    codeString: '501',      
    message: 'Not Implemented',
    description: 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.'
  },
  '502-Bad-Gateway': {      
    code: 502,
    codeString: '502',      
    message: 'Bad Gateway', 
    description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
  },
  '503-Service-Unavailable': {
    code: 503,
    codeString: '503',      
    message: 'Service Unavailable',
    description: 'The server is currently unavailable (overloaded or down).'        
  },
  '504-Gateway-Timeout': {  
    code: 504,
    codeString: '504',      
    message: 'Gateway Timeout',
    description: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.'
  },
  '505-HTTP-Version-Not-Supported': {
    code: 505,
    codeString: '505',      
    message: 'HTTP Version Not Supported',
    description: 'The server does not support the HTTP protocol version used in the request.'
  },
  '506-Variant-Also-Negotiates': {
    code: 506,
    codeString: '506',      
    message: 'Variant Also Negotiates',
    description: 'Transparent content negotiation for the request results in a circular reference.'
  },
  '507-Insufficient-Storage': {
    code: 507,
    codeString: '507',      
    message: 'Insufficient Storage',
    description: 'The server is unable to store the representation needed to complete the request.'
  },
  '508-Loop-Detected': {    
    code: 508,
    codeString: '508',      
    message: 'Loop Detected',
    description: 'The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).'
  },
  '509-Bandwidth-Limit-Exceeded': {
    code: 509,
    codeString: '509',      
    message: 'Bandwidth Limit Exceeded',
    description: 'The server has exceeded the bandwidth specified by the server administrator; this is often used by shared hosting providers to limit the bandwidth of customers.'
  },
  '510-Not-Extended': {     
    code: 510,
    codeString: '510',      
    message: 'Not Extended',
    description: 'Further extensions to the request are required for the server to fulfil it.'
  },
  '511-Network-Authentication-Required': {
    code: 511,
    codeString: '511',      
    message: 'Network Authentication Required',
    description: 'The client needs to authenticate to gain network access.'
  },
  '520-Unknown-Error': {    
    code: 520,
    codeString: '520',      
    message: 'Unknown Error',
    description: 'The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.'        
  },
  '521-Web-Server-Is-Down': {
    code: 521,
    codeString: '521',      
    message: 'Web Server Is Down',
    description: 'The origin server has refused the connection from Cloudflare.'    
  },
  '522-Connection-Timed-Out': {
    code: 522,
    codeString: '522',      
    message: 'Connection Timed Out',
    description: 'Cloudflare could not negotiate a TCP handshake with the origin server.'
  },
  '523-Origin-Is-Unreachable': {
    code: 523,
    codeString: '523',      
    message: 'Origin Is Unreachable',
    description: 'Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.'       
  },
  '524-A-Timeout-Occurred': {
    code: 524,
    codeString: '524',      
    message: 'A Timeout Occurred',
    description: 'Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.'       
  },
  '525-SSL-Handshake-Failed': {
    code: 525,
    codeString: '525',      
    message: 'SSL Handshake Failed',
    description: 'Cloudflare could not negotiate a SSL/TLS handshake with the origin server.'
  },
  '526-Invalid-SSL-Certificate': {
    code: 526,
    codeString: '526',      
    message: 'Invalid SSL Certificate',
    description: "Used by Cloudflare and Cloud Foundry's gorouter to indicate failure to validate the SSL/TLS certificate that the origin server presented."
  },
  '527-Railgun-Listener-to-Origin-Error': {
    code: 527,
    codeString: '527',      
    message: 'Railgun Listener to Origin Error',        
    description: 'Error 527 indicates that the request timed out or failed after the WAN connection had been established.'
  },
  '530-Origin-DNS-Error': { 
    code: 530,
    codeString: '530',      
    message: 'Origin DNS Error',
    description: 'Error 530 indicates that the requested host name could not be resolved on the Cloudflare network to an origin server.'    
  },
  '598-Network-Read-Timeout-Error': {
    code: 598,
    codeString: '598',      
    message: 'Network Read Timeout Error',
    description: 'Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.'
  },
};