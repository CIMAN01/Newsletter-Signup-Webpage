// Sign-up App

// require express module
const express = require("express")
// require https
const https = require("https")
// create a listening port
const port = 3000
// create an express application
const app = express()

// To access data on the server side in Express, we need to use some middleware, 
// to parse the data into a format that we can easily access. 
// Once the data from the raw HTTP request is parsed, 
// it can then be accessed via the body property of the req object.

// parse the URL-encoded body of a POST request
app.use(express.urlencoded({extended: true})) 

// use static to access local files (css/images)
app.use(express.static("public")) // public is name of the static folder

// home route ("/") GET request
app.get("/", function(req, res) {
    // sends the signup page as the file to be rendered
    res.sendFile(__dirname + "/signup.html") 
})

// home route ("/") POST request
app.post("/", function(req, res) {
    // parse the fields
    const firstName = req.body.fName // parsing first name
    const lastName = req.body.lName // parsing last name
    const email = req.body.email // parsing email
    // data in the form of an array of objects
    const data = {
        // member objects
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    // Mailchimp API Key (not a valid key) 
    // a41cbc6b6d3enk7hcdc48bghh46m182-us4
    //
    // Mailchimp List Id (not a valid id)
    // 8adg5bcc43
    //
    // stringify data
    const jsonData = JSON.stringify(data)
    // mailchimp url (endpoint, parameters, region etc.)
    const url = "https://us4.api.mailchimp.com/3.0/lists/8adg5bcc43" // region: us4
    // options
    const options = {
        method: "POST",
        auth: "user1:a41cbc6b6d3enk7hcdc48bghh46m182-us4" // region (us4) must match with above url
    }
    // https request
    const request = https.request(url, options, function(response) {
        // let user know if signing up was successful or not
        if (response.statusCode === 200) { // 200 is the code for OK
            // if succcessful we direct user to the success page
            res.sendFile(__dirname + "/success.html")
        }
        else {
            // if uneccessful we redirect user to failure page
            res.sendFile(__dirname + "/failure.html")
        }
        // response != res
        response.on("data", function(data) {
            // parse the data before console logging it
            console.log(JSON.parse(data))
        })
    })
    // must include end() after write() to specify we are done with the request
    request.write(jsonData)
    request.end()
})

// POST request for failure route
app.post("/failure", function(req, res) {
    // redirect to home route
    res.redirect("/") // will trigger app.get("/", ...)
})

// (Heroku dynamic port || local static port)
app.listen(process.env.PORT || port, function() {
    console.log("Server is running on port 3000")
})


