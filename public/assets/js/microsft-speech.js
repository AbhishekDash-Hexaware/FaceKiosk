

// var reco;
// var speechConfig;
// var inputsource = "Mic"
// var regionOptions = "southeastasia"
// var key = "dffe370190ab42d3ab8fd78a4a7f8e58"
// var languageOptions = "en-IN"
// var languageTargetOptions = "en-IN"

// speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, regionOptions);
// speechConfig.speechRecognitionLanguage = languageOptions;
// var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();


// reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
// reco.recognizing = function (s, e) {
//     console.log(e);
//     var status = "(recognizing) Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + "\r\n";
//     console.log(status)
//     var phrase = lastRecognized + e.result.text;
//     console.log(phrase)
// };
// reco.recognized = function (s, e) {
//     var statusDiv1
//     console.log(e);
//     // Indicates that recognizable speech was not detected, and that recognition is done.
//     if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
//         var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
//         statusDiv1 = "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " NoMatchReason: " + SpeechSDK.NoMatchReason[noMatchDetail.reason] + "\r\n";
//         console.log(statusDiv1)
//     } else {
//         statusDiv1 += "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + "\r\n";
//         console.log(statusDiv1)
//     }
//     lastRecognized += e.result.text + "\r\n";
//     var phraseDiv1 = lastRecognized;
//     console.log(statusDiv1)
//     console.log(phraseDiv1)
//     var transcript =  e.result.text;
// transcript = transcript.trim();
// console.log(transcript);
// jQuery.ajax({
//     type: "POST",
//     dataType: "JSON",
//     url: "https://api.dialogflow.com/v1/query",
//     qs: { v: '20150910' },
//     headers: {
//         'cache-control': 'no-cache',
//         authorization: 'Bearer ' + '2f1667eb74634f249ebf236c6992e593',
//         'content-type': 'application/json'
//     },
//     data: JSON.stringify({
//         lang: 'en',
//         query: transcript,
//         sessionId: 12345
//     }),

//     error: function (error) {
//         console.log(error)
//         console.log("Internal Server Error");
//     },
//     success: function (result) {
//         console.log(result)
//         if (result.result.action == "input.welcome") {
//             console.log("welcome intent")
//             console.log("song playing");
//             playAudio(yodelBuffer)
//         }
//         if (result.result.action == "breakfast") {
//             console.log("breakfast  intent")
//             console.log("song playing");
//             playAudio(BreakfastIntentBuffer)
//         }
//         if (result.result.action == "Lunch") {
//             console.log("lunch intent")
//             console.log("song playing");
//             playAudio(LunchIntentbuffer)
//         }
//         //  console.log(result.result.speech)
//         // $("#div").html(result.queryResult.fulfillmentText);
//         console.log("sucess")
//     },
//     dataType: "JSON",
// })
// }
//     reco.canceled = function (s, e) {
//         console.log(e);
//         var statusDiv2;
//         statusDiv2 = "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason];
//         console.log(statusDiv2)
//         if (e.reason === SpeechSDK.CancellationReason.Error) {
//             statusDiv2 = e.errorDetails;
//             console.log(statusDiv2)
//         }
//         console.log("\r\n")

//     };
//     // Signals that a new session has started with the speech service
//     reco.sessionStarted = function (s, e) {
//         console.log(e);
//         var statusDiv3
//         statusDiv3 += "(sessionStarted) SessionId: " + e.sessionId + "\r\n";
//         console.log(statusDiv3)
//     };
//     // Signals the end of a session with the speech service.
//     reco.sessionStopped = function (s, e) {
//         console.log(e);
//         var statusDiv4
//         statusDiv4 = "(sessionStopped) SessionId: " + e.sessionId + "\r\n";
//         console.log(statusDiv4)
//         sdkStartContinousRecognitionBtn.disabled = false;
//         sdkStopContinousRecognitionBtn.disabled = true;
//     };
//     // Signals that the speech service has started to detect speech.
//     reco.speechStartDetected = function (s, e) {
//         console.log(e);
//         var statusDiv5
//         statusDiv5 = "(speechStartDetected) SessionId: " + e.sessionId + "\r\n";
//         console.log(statusDiv5)
//     };
//     // Signals that the speech service has detected that speech has stopped.
//     reco.speechEndDetected = function (s, e) {
//         console.log(e);
//         var statusDiv6;
//         statusDiv6 += "(speechEndDetected) SessionId: " + e.sessionId + "\r\n";
//         console.log(statusDiv6)
//     };






