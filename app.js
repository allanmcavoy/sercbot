/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello, I'm the South Eastern Regional College Logistical Expert but you can just call me Sercle for short.\n \n What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been at SERC?"); 
    },
    // function (session, results) {
    //     session.userData.years = results.response;
    //     builder.Prompts.choice(session, "How many years have you been at SERC?", ["1-5", "6-10", "10+"]);
    // },
    function (session, results) {
        session.userData.years = results.response;
         builder.Prompts.text(session, "Thanks " + session.userData.name + 
         ". So you have been at SERC for " + session.userData.years + " Years ?"); 
    },
    
    function (session, results) {
        
        builder.Prompts.text(session, "Thats great " + session.userData.name + ". If you want to view our courses just type *Show Courses*." + "\n Would you like a copy of our prospectus?"); 
    },
    
        function (session, results) {
        
        builder.Prompts.text(session, "Here you go " + session.userData.name + "."); 
    var msg = new builder.Message(session)
    .addAttachment({
        contentUrl: 'https://www.serc.ac.uk/FileBrowser/File?fileName=Policies%2FICT%20Systems%20and%20Services%20SOP.pdf',
        contentType: 'application/pdf',
        name: 'serc-full-time-prosecestus.pdf'
    });

session.send(msg);
    }
    
    

    
    
    
]);


bot.dialog('/courses', [
    function (session) {
        builder.Prompts.text(session, "Do you want to see full time or Part time courses?");
    }  
    
]);


 
 

// Add dialog to return full time & part time courses
bot.dialog('showCourses', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("Full-Time Courses")
            .subtitle("We strive to make your time with us count")
            .text("By studying at SERC you will have the opportunity to develop your entrepreneurial skills by setting up a SERC Student Company, where you will be given support and expert advice on starting up and running your own business.")
            .images([builder.CardImage.create(session, 'https://www.serc.ac.uk/Content/SiteImages/student-photos/9.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, 'https://www.serc.ac.uk/courses/full-time', 'View Courses')
            ]),
        new builder.HeroCard(session)
            .title("Part-Time Courses")
            .subtitle("We strive to make your time with us count")
            .text("By studying at SERC you will have the opportunity to develop your entrepreneurial skills by setting up a SERC Student Company, where you will be given support and expert advice on starting up and running your own business.")
            .images([builder.CardImage.create(session, 'https://www.serc.ac.uk/Content/SiteImages/student-photos/9.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, 'https://www.serc.ac.uk/courses/part-time', 'View Courses')
            ])
    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: /^(show|list)/i });


// Add dialog to return full time & part time courses
bot.dialog('showGif', function (session, title, subtitle, text) {
        builder.Prompts.text(session, "Thats not very nice!"); 
    var msg = new builder.Message(session)
    .addAttachment({
        contentUrl: 'https://media.giphy.com/media/PW24kUmUv3vlm/giphy.gif',
        contentType: 'image/gif',
        name: 'sad.gif'
    });

session.send(msg);

   
}).triggerAction({ matches: /^(gay|fuck|twat|dick|knob|sucks|shit|crap)/i });

