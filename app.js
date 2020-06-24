const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public")); //this functionality of express is used inorder to load css and images for our website

app.use(bodyParser.urlencoded({extended : true})); //to fetch inputs from html.

app.get("/", function(req, res){

res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){  //using the dynamic inputs that entered in our website and retrieving.

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members : [
      {                                 //using the data from site : https://mailchimp.com/developer/reference/lists/#post_/lists/-list_id-
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,            //FNAME, LNAME got from site : https://us10.admin.mailchimp.com/lists/settings/merge-tags?id=385101
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/76f0392e67"; // took from the site and added /76********** at last

  const options = {
    method : "POST",
    auth : "Nikesh1 :8e109bf2e3b401f31a4b85f942844a51-us10"
  }
const request =   https.request(url,options, function(response){   // using node.js method: https://nodejs.org/dist/latest-v12.x/docs/api/https.html#https_https_get_url_options_callback

    if(response.statusCode==200){
      res.sendFile( __dirname + "/success.html");
    }else{
      res.sendFile( __dirname + "/failure.html");;
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
    })

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res){

  res.redirect("/")


})
app.listen(process.env.PORT || 3000, function(){
  console.log("Server Started at 3000!!");
})



//8e109bf2e3b401f31a4b85f942844a51-us10
//76f0392e67
