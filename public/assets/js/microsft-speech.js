// // Note: Replace the URL with a valid endpoint to retrieve
//         //       authorization tokens for your subscription.
//         // An authorization token is a more secure method to authenticate for a browser deployment as
//         // it allows the subscription keys to be kept secure on a server and a 10 minute use token to be
//         // handed out to clients from an endpoint that can be protected from unauthorized access.
//         <button id="speechsdkStartContinuousRecognition">startContinuousRecognitionAsync()</button>
//         <button id="speechsdkStopContinuousRecognition" disabled="disabled">STOP stopContinuousRecognitionAsync()</button>

// var authorizationEndpoint = "token.php";
// function RequestAuthorizationToken() {
//     if (authorizationEndpoint) {
//         var a = new XMLHttpRequest();
//         a.open("GET", authorizationEndpoint);
//         a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         a.send("");
//         a.onload = function () {
//             var token = JSON.parse(atob(this.responseText.split(".")[1]));
//             regionOptions.value = token.region;
//             authorizationToken = this.responseText;
//             key.disabled = true;
//             key.value = "using authorization token (hit F5 to refresh)";
//             console.log("Got an authorization token: " + token);
//         }
//     }
// }

//      // On document load resolve the Speech SDK dependency
//      function Initialize(onComplete) {
//         if (!!window.SpeechSDK) {
//             document.getElementById('content').style.display = 'block';
//             document.getElementById('warning').style.display = 'none';
//             onComplete(window.SpeechSDK);
//         }
//     }

//     var phraseDiv, statusDiv;
//           var SpeechSDK;
//         var recognizer;
//         var reco;
//         var sdkStartContinousRecognitionBtn, sdkStopContinousRecognitionBtn;
//         var sdkStartContinousTranslationBtn, sdkStopContinousTranslationBtn;
//         var inputsource ="Mic"
//         var regionOptions ="southeastasia"
//         var languageOptions = "en-IN"
//         var languageTargetOptions = "en-IN"
//         var audioFile, audioFileValid;
//         var filepicker ="filepicker"
//         var soundContext = undefined;
//         try {
//             soundContext = new AudioContext();
//         }
//         catch (e) {
//             window.console.log("no sound context found, no audio output. " + e);
//         }
//         document.addEventListener("DOMContentLoaded", function () {
//             sdkStartContinousRecognitionBtn = document.getElementById("speechsdkStartContinuousRecognition");
//             sdkStopContinousRecognitionBtn = document.getElementById("speechsdkStopContinuousRecognition");
            
//             filePicker = document.getElementById('filePicker');
//             // Starts continuous speech recognition.
//             sdkStartContinousRecognitionBtn.addEventListener("click", function () {
//                 phraseDiv.innerHTML = "";
//                 statusDiv.innerHTML = "";
//                 var lastRecognized = "";
//                 // If an audio file was specified, use it. Else use the microphone.
//                 // Depending on browser security settings, the user may be prompted to allow microphone use. Using continuous recognition allows multiple
//                 // phrases to be recognized from a single use authorization.
//                 var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
//                 var speechConfig;
//                 if (authorizationToken) {
//                     speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, regionOptions.value);
//                 } else {
//                     if (key.value === "" || key.value === "YOUR_SPEECH_API_KEY") {
//                         alert("Please enter your Cognitive Services Speech subscription key!");
//                         return;
//                     }
//                     speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key.value, regionOptions.value);
//                 }
//                 // speechConfig.speechRecognitionLanguage = languageOptions.value;
//                 reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
//                 // Before beginning speech recognition, setup the callbacks to be invoked when an event occurs.
//                 // The event recognizing signals that an intermediate recognition result is received.
//                 // You will receive one or more recognizing events as a speech phrase is recognized, with each containing
//                 // more recognized speech. The event will contain the text for the recognition since the last phrase was recognized.
//                 reco.recognizing = function (s, e) {
//                     console.log(e);
//                     var status = "(recognizing) Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + "\r\n";
//                     console.log(status)
//                     var phrase = lastRecognized + e.result.text;
//                     console.log(phrase)
//                 };
//                 // The event recognized signals that a final recognition result is received.
//                 // This is the final event that a phrase has been recognized.
//                 // For continuous recognition, you will get one recognized event for each phrase recognized.
//                 reco.recognized = function (s, e) {
//                     var statusDiv1
//                     console.log(e);
//                     // Indicates that recognizable speech was not detected, and that recognition is done.
//                     if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
                        
//                         var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
//                         statusDiv1= "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " NoMatchReason: " + SpeechSDK.NoMatchReason[noMatchDetail.reason] + "\r\n";
//                         console.log(statusDiv1)
//                     } else {
//                         statusDiv1 += "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + "\r\n";
//                         console.log(statusDiv1)
//                     }
//                     lastRecognized += e.result.text + "\r\n";
//                     var phraseDiv1 = lastRecognized;
//                     console.log(statusDiv1)
//                     console.log(phraseDiv1)
//                 };
//                 // The event signals that the service has stopped processing speech.
//                 // https://docs.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognitioncanceledeventargs?view=azure-node-latest
//                 // This can happen for two broad classes of reasons.
//                 // 1. An error is encountered.
//                 //    In this case the .errorDetails property will contain a textual representation of the error.
//                 // 2. No additional audio is available.
//                 //    Caused by the input stream being closed or reaching the end of an audio file.
//                 reco.canceled = function (s, e) {
//                     console.log(e);
//                     var statusDiv2;
//                     statusDiv2= "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason];
//                     console.log(statusDiv2)
//                     if (e.reason === SpeechSDK.CancellationReason.Error) {
//                         statusDiv2= e.errorDetails;
//                         console.log(statusDiv2)
//                     }
//                     console.log( "\r\n")
                    
//                 };
//                 // Signals that a new session has started with the speech service
//                 reco.sessionStarted = function (s, e) {
//                     console.log(e);
//                     var statusDiv3
//                     statusDiv3 += "(sessionStarted) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv3)
//                 };
//                 // Signals the end of a session with the speech service.
//                 reco.sessionStopped = function (s, e) {
//                     console.log(e);
//                     var statusDiv4
//                     statusDiv4= "(sessionStopped) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv4)
//                     sdkStartContinousRecognitionBtn.disabled = false;
//                     sdkStopContinousRecognitionBtn.disabled = true;
//                 };
//                 // Signals that the speech service has started to detect speech.
//                 reco.speechStartDetected = function (s, e) {
//                     console.log(e);
//                     var statusDiv5
//                     statusDiv5= "(speechStartDetected) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv5)
//                 };
//                 // Signals that the speech service has detected that speech has stopped.
//                 reco.speechEndDetected = function (s, e) {
//                     console.log(e);
//                     var statusDiv5;
//                     statusDiv5 += "(speechEndDetected) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv5)
//                 };
//                 // Starts recognition
//                 reco.startContinuousRecognitionAsync();
//                 sdkStartContinousRecognitionBtn.disabled = true;
//                 sdkStopContinousRecognitionBtn.disabled = false;
//             });
//             // Stops recognition and disposes of resources.
//             sdkStopContinousRecognitionBtn.addEventListener("click", function () {
//                 reco.stopContinuousRecognitionAsync(
//                     function () {
//                         reco.close();
//                         reco = undefined;
//                     },
//                     function (err) {
//                         reco.close();
//                         reco = undefined;
//                     });
//                 sdkStartContinousRecognitionBtn.disabled = false;
//                 sdkStopContinousRecognitionBtn.disabled = true;
//             });
//             // Starts continuous speech translation.
//             sdkStartContinousTranslationBtn.addEventListener("click", function () {
//                 var lastRecognized2
//               var   phraseDiv3
//                var statusDiv6
//                 // If an audio file was specified, use it. Else use the microphone.
//                 // Depending on browser security settings, the user may be prompted to allow microphone use. Using continuous recognition allows multiple
//                 // phrases to be recognized from a single use authorization.
//                 var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
//                 var speechConfig;
//                 if (authorizationToken) {
//                     speechConfig = SpeechSDK.SpeechTranslationConfig.fromAuthorizationToken(authorizationToken, regionOptions.value);
//                 } else {
//                     if (key.value === "" || key.value === "YOUR_SPEECH_API_KEY") {
//                         alert("Please enter your Cognitive Services Speech subscription key!");
//                         return;
//                     }
//                     speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(key.value, regionOptions.value);
//                 }
//                 // Set the source language.
//                 speechConfig.speechRecognitionLanguage = languageOptions;
//                 // Defines the language(s) that speech should be translated to.
//                 // Multiple languages can be specified for text translation and will be returned in a map.
//                 speechConfig.addTargetLanguage(languageTargetOptions);
//                 // If voice output is requested, set the target voice.
//                 // If multiple text translations were requested, only the first one added will have audio synthesised for it.
//                 if (voiceOutput.checked) {
//                     speechConfig.setProperty(SpeechSDK.PropertyId.SpeechServiceConnection_TranslationVoice, languageTargetOptions);
//                 }
//                 reco = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
//                 // Before beginning speech recognition, setup the callbacks to be invoked when an event occurs.
//                 // The event recognizing signals that an intermediate recognition result is received.
//                 // You will receive one or more recognizing events as a speech phrase is recognized, with each containing
//                 // more recognized speech. The event will contain the text for the recognition since the last phrase was recognized.
//                 // Both the source language text and the translation text(s) are available.
//                 reco.recognizing = function (s, e) {
//                    console.log(e);
//                    var language = languageTargetOptions;
//                     statusDiv6= "(recognizing) Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + " Translations:" + " [" + language + "] " + e.result.translations.get(language);
//                     console.log(statusDiv6)
                    
//                     phraseDiv3 = lastRecognized + e.result.translations.get(language);
//                     console.log(phraseDiv3)
//                 };
//                 // The event recognized signals that a final recognition result is received.
//                 // This is the final event that a phrase has been recognized.
//                 // For continuous recognition, you will get one recognized event for each phrase recognized.
//                 // Both the source language text and the translation text(s) are available.
//                 reco.recognized = function (s, e) {
//                     window.console.log(e);
//                     var statusDiv7
//                     var phraseDiv4
//                     var language = languageTargetOptions;
//                     var lastRecognized4
//                     statusDiv7= "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " Text: " + e.result.text + " Translations:"+" [" + language + "] " + e.result.translations.get(language);
//                    console.log(statusDiv7)
//                     lastRecognized4 = e.result.translations.get(language) + "\r\n";
//                     phraseDiv4 = lastRecognized4;
//                     console.log(phraseDiv4)
//                 };
//                 // The event signals that the service has stopped processing speech.
//                 // https://docs.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/translationrecognitioncanceledeventargs?view=azure-node-latest
//                 // This can happen for two broad classes of reasons.
//                 // 1. An error is encountered.
//                 //    In this case the .errorDetails property will contain a textual representation of the error.
//                 // 2. No additional audio is available.
//                 //    Caused by the input stream being closed or reaching the end of an audio file.
//                 reco.canceled = function (s, e) {
//                     console.log(e);
//                     var statusDiv7
//                     statusDiv7= "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason] + "\r\n";
//                     console.log(statusDiv7)
//                 };
//                 // Signals an audio payload of synthesized speech is ready for playback.
//                 // If the event result contains valid audio, it's reason will be ResultReason.SynthesizingAudio
//                 // Once a complete phrase has been synthesized, the event will be called with ResultReason.SynthesizingAudioComplete and a 0 byte audio payload.
//                 reco.synthesizing = function (s, e) {
//                     console.log(e);
//                     var statusDiv8
//                     var audioSize = e.result.audio === undefined ? 0 : e.result.audio.byteLength;
//                     statusDiv8= "(synthesizing) Reason: " + SpeechSDK.ResultReason[e.result.reason] + " " + audioSize + " bytes\r\n";
//                     console.log(statusDiv8)
//                     if (e.result.audio && soundContext) {
//                         var source = soundContext.createBufferSource();
//                         soundContext.decodeAudioData(e.result.audio, function (newBuffer) {
//                             source.buffer = newBuffer;
//                             source.connect(soundContext.destination);
//                             source.start(0);
//                         });
//                     }
//                 };
//                 // Signals that a new session has started with the speech service
//                 reco.sessionStarted = function (s, e) {
//                     console.log(e);
//                     var statusDiv9
//                     statusDiv9 += "(sessionStarted) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv9)
//                 };
//                 // Signals the end of a session with the speech service.
//                 reco.sessionStopped = function (s, e) {
//                     // languageTargetOptions.disabled = false;
//                     sdkStartContinousTranslationBtn.disabled = false;
//                     sdkStopContinousTranslationBtn.disabled = true;
//                     console.log(e);
//                     var statusDiv9
//                     statusDiv9= "(sessionStopped) SessionId: " + e.sessionId + "\r\n";
//                     console.log(statusDiv9)
//                     sdkStartContinousRecognitionBtn.disabled = false;
//                     sdkStopContinousRecognitionBtn.disabled = true;
//                 };
//                 // Signals that the speech service has started to detect speech.
//                 reco.speechStartDetected = function (s, e) {
//                     console.log(e);
//                    var statusDiv10= "(speechStartDetected) SessionId: " + e.sessionId + "\r\n";
//                    console.log(statusDiv10)
//                 };
//                 // Signals that the speech service has detected that speech has stopped.
//                 reco.speechEndDetected = function (s, e) {
//                     console.log(e);
//                     var statusDiv11= "(speechEndDetected) SessionId: " + e.sessionId + "\r\n";
//                     // console.log(statusDiv11)
//                 };
//                 reco.startContinuousRecognitionAsync();
//                 // languageTargetOptions.disabled = true;
//                 sdkStartContinousTranslationBtn.disabled = true;
//                 sdkStopContinousTranslationBtn.disabled = false;
//             });
//             sdkStopContinousTranslationBtn.addEventListener("click", function () {
//                 // languageTargetOptions.disabled = false;
//                 sdkStartContinousTranslationBtn.disabled = false;
//                 sdkStopContinousTranslationBtn.disabled = true;
//                 reco.stopContinuousRecognitionAsync(
//                     function () {
//                         reco.close();
//                         reco = undefined;
//                     },
//                     function (err) {
//                         reco.close();
//                         reco = undefined;
//                     });
//             });
         
          
//             Initialize(function (speechSdk) {
//                 SpeechSDK = speechSdk;
//                 sdkStartContinousRecognitionBtn.disabled = false;
//                 sdkStartRecognizeOnceAsyncBtn.disabled = false;
//                 // in case we have a function for getting an authorization token, call it.
//                 if (typeof RequestAuthorizationToken === "function") {
//                     RequestAuthorizationToken();
//                 }
//             });
//         });