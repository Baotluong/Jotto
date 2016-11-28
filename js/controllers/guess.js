(function(){

	angular
		.module("jotto")
		.controller("guessCtrl", guessCtrl);

	guessCtrl.$inject = ['fiveWords'];

	function guessCtrl(fiveWords){
		var vm = this;
		vm.alphabet = [];
		vm.alphabetClass = "btn-success";
		vm.changeAlphabetClass = changeAlphabetClass;
		vm.fiveWords = fiveWords;
		vm.playerGuess = [];
		vm.formGuess = "";
		vm.formGuessResponse = "";
		vm.formGuessSubmit = formGuessSubmit;
		vm.playerWin = false;

		console.log("Secret Word is "+vm.fiveWords.secretWord);

		function fillAlphabetArray(){
			for(var i = 0; i < 26; i++){
				var letter = String.fromCharCode('A'.charCodeAt() + i);
				vm.alphabet[i] = {"letter": letter, "status": "btn-success"};
			}
		}
		fillAlphabetArray();

		function changeAlphabetClass(index){
			var clear = "btn-success";
			var potential = "btn-warning";
			var eliminated = "btn-danger";

			if(vm.alphabet[index].status == clear){
				vm.alphabet[index].status = potential;
			}else if(vm.alphabet[index].status == potential){
				vm.alphabet[index].status = eliminated;
			}else if(vm.alphabet[index].status == eliminated){
				vm.alphabet[index].status = clear;
			}
		}

		function formGuessSubmit(){
			var guess = vm.formGuess.toLowerCase();
			var mustBeFive = "Your guess must be a 5 letter word.";
			var notUnique = "Your guess cannot have duplicate letters.";
			var lettersOnly = "Your guess can only contain letters.";
			var notWord = "Your guess is not a word.";
			var alreadyGuess = "You already guessed this word.";

			if(/[^a-z]/i.test(guess)){
				vm.formGuessResponse = lettersOnly;
			}else if(guess.length !== 5){
				vm.formGuessResponse = mustBeFive;
			}else if(fiveWords.checkForUnique(guess) == false){
				vm.formGuessResponse = notUnique;
			}else if(!fiveWords.uniqueWordsArray.includes(guess)){
				vm.formGuessResponse = notWord;
			}else if(alreadyGuessed(guess)){
				vm.formGuessResponse = alreadyGuess;
			}else{
				checkAgainstSecret(guess);
				vm.formGuessResponse = "";
				vm.formGuess = "";
			}

			function alreadyGuessed(guess){
				for(var i=0; i<vm.playerGuess.length; i++){
					if(vm.playerGuess[i].guess == guess){
						return true;
					}
				}

				return false;
			}
			
		}

		function checkAgainstSecret(guess){
			var secret = fiveWords.secretWord;
			var numCorrect = 0;

			for(var i=0; i<guess.length; i++){
				for(var j=0; j<secret.length; j++){
					if(guess[i] == secret[j]){
						numCorrect++;
					}
				}
			}
			vm.playerGuess.push({"guess": guess, "numCorrect":numCorrect});

			if(guess == secret){
				vm.playerWin = true;
			}
		}

	};

})();