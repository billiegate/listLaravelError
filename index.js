import swal from "sweetalert";
import { isString } from "util";

const listObjectErrors = (err, showKey) => {
  let showing_key =
    typeof showKey == "undefined"
      ? true
      : isString(showKey)
      ? JSON.parse(showKey)
      : showKey;
  let content = document.createElement("ul");
  let list = document.createElement("li");

  for (var elem in err) {
    let error_list = list.appendChild(
      document.createTextNode(
        (showing_key ? elem + ": " : "") + err[elem] + "\n"
      )
    );
    content.appendChild(error_list);
  }

  swal({
    icon: "error",
    title: "the following error occured",
    content: content
  });
};

/**
* @param object err - laravel returned error object
* @param object options - empty options
* @param string title - supply to override the error title
* @param string message - supply to override the error message
* @returns null
* @desc returns btc address for payment to be made to amongst others
* for info check the Api's BitController/ getBTCAddress() method
* to be exported to the Bitcoin sell page(views/bitcoin/index.vue), 
*/
const listLaravelFormatedError = (err, options) => {
  let status = err.status ? err.status : 500;
  
  let message = typeof options != "undefined" && options.title ? options.title : err.message ? err.message : "Oops!";

  let errors =
    err.data && err.data.errors
      ? err.data.errors
      : ["please check your server"];

  let show_errors = true;

  switch (status) {
    case 422:
      // say i don't want to show errors, then set show_errors to false
      break;
    case 401:
      break;
  }

  let content = document.createElement("ul");
  let list = document.createElement("li");
  
  if( typeof options != "undefined" && options.message){
    let error_node = document.createTextNode(options.message + "\n");
    content.appendChild(error_node);
  }else{
    for (var x = 0; x < errors.length; x++) {
      let error_list = list.appendChild(
        document.createTextNode(errors[x] + "\n")
      );
      content.appendChild(error_list);
    }
  }
  

  if (show_errors) {
    swal({
      icon: "error",
      title: message,
      content: content
    });
  }
};

export { listObjectErrors, listLaravelFormatedError };
