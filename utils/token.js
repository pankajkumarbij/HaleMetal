import cookie from "js-cookie";

var t = "no token";
if(cookie.get('token')){
    t = cookie.get('token');
}

export const token = t;