var cookies;
/**
 * Anonymous function that obtains the parameters passed in the url.
 * The returned value is stored in the variable QueryString.
 * To obtain a parameter "name1", we have to call "QueryString.name1"
 */
var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

/**
 * Returns the value of the cookie name.
 * @param {string} name
 * @returns {string}
 */
function readCookie(name,c,C,i){
    if(cookies){ return cookies[name]; }

    c = document.cookie.split('; ');
    cookies = {};

    for(i=c.length-1; i>=0; i--){
       C = c[i].split('=');
       cookies[C[0]] = C[1];
    }

    return cookies[name];
}

/**
 * Checks if the cookie
 * @param {string} url
 * @returns {string}
 */
function checkAge(url){
    var laChCookie = readCookie('nameOfCookie');
    if(!laChCookie){
        /**
         * If a subdomain of the initial domain is being used for age validation,
         * then the next line should be something like:
         * window.location.href='http://subdomain.mydomain.com.md/age.html?url='+encodeURIComponent(url);
         */
        window.location.href='age.html?url='+encodeURIComponent(url);
    }
    return laChCookie;
}

/**
 * Sets the cookie cname with value cvallue for expiring in exdays
 * and redirects to url.
 * @param {string} cname
 * @param {string} cvalue
 * @param {string} exdays
 * @param {string} url
 * @returns {}
 */
function setCookie(cname,cvalue,exdays,url){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    /**
     * If cookie goes around subdomains, the next line should be something like this:
     * document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain=mydomain.com.md";
     */
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    if(!url){
        /**
         * CHANGE THIS VALUE
         */
        url = "http://default-url.mydomain.com.md";
    }
    window.location.href=decodeURIComponent(url);
}