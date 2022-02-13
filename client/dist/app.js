(()=>{"use strict";var e={2855:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JokeLoader=void 0;const o=n(3269);t.JokeLoader=class{constructor(){this.randomJokeEndpoint="http://localhost:3000/randomJoke"}getNextJoke(){o.Logger.info(`Request next joke from ${this.randomJokeEndpoint}`),this.joke=void 0,fetch(this.randomJokeEndpoint).then((e=>{e.ok?e.json().then((e=>{try{o.Logger.info("Got next joke:",JSON.stringify(e)),this.joke={id:e[0].id,type:e[0].type,setup:e[0].setup,punchline:e[0].punchline}}catch(e){this.getNextJokeError()}})).catch((e=>{this.getNextJokeError()})):this.getNextJokeError()})).catch((e=>{this.getNextJokeError()}))}getNextJokeError(){o.Logger.error("Couldn't get Joke from server, retrying in 5 seconds..."),setTimeout((()=>this.getNextJoke()),5e3)}}},3269:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Logger=void 0;t.Logger=class{static info(e,...t){console.log(this.msgParams(e,t))}static warn(e,...t){console.log("Warning!! - "+this.msgParams(e,t))}static error(e,...t){console.log("Error!! - "+this.msgParams(e,t))}static msgParams(e,t){return t.forEach((t=>{e+=" "+t})),e}}},8492:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateMachine=void 0;t.StateMachine=class{set(e){this.currentState&&this.currentState.end(),this.currentState=e,this.currentState.start()}}},5606:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;t.State=class{constructor(e,t){this.parent=e,this.callbackNotifier=t}start(){this.onStart()}end(){this.onEnd()}}},1560:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppEvents=void 0,function(e){e[e.SHOW_NEXT_JOKE=0]="SHOW_NEXT_JOKE",e[e.JOKE_SETUP_END=1]="JOKE_SETUP_END",e[e.JOKE_PUNCHLINE_END=2]="JOKE_PUNCHLINE_END"}(t.AppEvents||(t.AppEvents={}))},339:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateClickable=void 0;const o=n(5606);class i extends o.State{initClickable(){this.clickHandler=this.onClick.bind(this),this.clickTimer=setTimeout((()=>this.parent.elements.clickArea.addEventListener("click",this.clickHandler,!0)),1e3),this.showHandTimer=setTimeout((()=>{this.parent.elements.hand.style.opacity="1"}),3e3)}releaseClickable(){this.parent.elements.clickArea.removeEventListener("click",this.clickHandler,!0),this.parent.elements.hand.style.opacity="0",clearTimeout(this.clickTimer),clearTimeout(this.showHandTimer)}}t.StateClickable=i},424:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateJokeEnd=void 0;const o=n(5606),i=n(1560);class s extends o.State{onStart(){this.parent.elements.jokeSetup.style.opacity="0",this.parent.elements.jokePunchline.style.opacity="0",setTimeout((()=>{this.parent.elements.jokeSetupContainer.style.top=this.parent.elements.jokeSetupContainerInitialStyle.top,this.parent.elements.jokeSetup.style.fontSize=this.parent.elements.jokeSetupInitialStyle.fontSize,this.parent.elements.jokeSetup.innerText="",this.parent.elements.jokePunchline.innerText="",this.parent.elements.jokeSetup.style.opacity="1",this.parent.elements.jokePunchline.style.opacity="1","black"===this.parent.elements.uiContainer.style.backgroundColor?(this.parent.elements.uiContainer.style.backgroundColor="white",this.parent.elements.uiContainer.style.color="black",this.parent.elements.connectingIcon.style.backgroundImage="url('./assets/connecting-icon-black.svg')"):(this.parent.elements.uiContainer.style.backgroundColor="black",this.parent.elements.uiContainer.style.color="white",this.parent.elements.connectingIcon.style.backgroundImage="url('./assets/connecting-icon-white.svg')"),setTimeout((()=>this.callbackNotifier(i.AppEvents.SHOW_NEXT_JOKE)),1e3)}),1e3)}onEnd(){}}t.StateJokeEnd=s},2784:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateJokePunchline=void 0;const o=n(1560),i=n(339);class s extends i.StateClickable{onStart(){this.parent.elements.jokeSetupContainer.style.top="40%",this.parent.elements.jokeSetup.style.fontSize="40px",this.parent.elements.jokePunchline.innerText=this.parent.joke.punchline,this.parent.elements.jokePunchline.classList.add("fade-in-slide-up-800"),this.initClickable()}onEnd(){this.parent.elements.jokePunchline.classList.remove("fade-in-slide-up-800"),this.releaseClickable()}onClick(){this.callbackNotifier(o.AppEvents.JOKE_PUNCHLINE_END)}}t.StateJokePunchline=s},5833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateJokeSetup=void 0;const o=n(1560),i=n(339);class s extends i.StateClickable{onStart(){this.parent.elements.jokeSetup.innerText=this.parent.joke.setup,this.parent.elements.jokeSetup.classList.add("fade-in-slide-up-800"),this.initClickable()}onEnd(){this.parent.elements.jokeSetup.classList.remove("fade-in-slide-up-800"),this.releaseClickable()}onClick(){this.callbackNotifier(o.AppEvents.JOKE_SETUP_END)}}t.StateJokeSetup=s},3990:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateJokeboxIntro=void 0;const o=n(5606),i=n(1560);class s extends o.State{onStart(){this.parent.jokeboxTitleContainer.style.display="block",this.parent.jokeboxTitle.classList.add("fade-in-slide-left-800"),setTimeout((()=>this.parent.jokeboxTitle.classList.remove("fade-in-slide-left-800")),800),setTimeout((()=>{this.parent.jokeboxTitleContainer.style.top="13%",this.parent.jokeboxTitle.style.fontSize="50px"}),1e3),setTimeout((()=>{this.callbackNotifier(i.AppEvents.SHOW_NEXT_JOKE)}),1500)}onEnd(){}}t.StateJokeboxIntro=s}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}(()=>{const e=n(3269),t=n(8492),o=n(3990),i=n(1560),s=n(5833),a=n(2855),r=n(2784),l=n(424);class c{constructor(){this.data={},this.jokeLoader=new a.JokeLoader}start(){e.Logger.info("App started.");let n=document.getElementById("joke-setup-container"),i=document.getElementById("joke-setup");this.data.elements={uiContainer:document.getElementById("ui-container"),jokeboxTitleContainer:document.getElementById("jokebox-title-container"),jokeboxTitle:document.getElementById("jokebox-title"),connectingIcon:document.getElementById("connecting-icon"),jokeSetupContainer:n,jokeSetupContainerInitialStyle:Object.assign({},n.style),jokeSetup:i,jokeSetupInitialStyle:Object.assign({},i.style),jokePunchlineContainer:document.getElementById("joke-punchline-container"),jokePunchline:document.getElementById("joke-punchline"),clickArea:document.getElementById("click-area"),hand:document.getElementById("hand")},this.states=new t.StateMachine,this.jokeLoader.getNextJoke(),setTimeout((()=>this.states.set(new o.StateJokeboxIntro(this.data.elements,(e=>this.notify(e))))),300)}notify(e){switch(e){case i.AppEvents.SHOW_NEXT_JOKE:this.showNextJokeSetup();break;case i.AppEvents.JOKE_SETUP_END:this.states.set(new r.StateJokePunchline(this.data,(e=>this.notify(e))));break;case i.AppEvents.JOKE_PUNCHLINE_END:this.states.set(new l.StateJokeEnd(this.data,(e=>this.notify(e))))}}showNextJokeSetup(){e.Logger.info("Show next joke"),this.jokeLoader.joke?(this.data.joke=this.jokeLoader.joke,this.jokeLoader.getNextJoke(),this.hideConnecting(),this.states.set(new s.StateJokeSetup(this.data,(e=>this.notify(e))))):(this.showConnecting(),setTimeout((()=>this.showNextJokeSetup()),5e3))}showConnecting(){this.data.elements.connectingIcon.style.opacity="1"}hideConnecting(){this.data.elements.connectingIcon.style.opacity="0"}}(new c).start()})()})();