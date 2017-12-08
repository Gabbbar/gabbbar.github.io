(function($,_){
  window.aoc = window.aoc || [];

  var input = `61697637962276641366442297247367117738114719863473648131982449728688116728695866572989524473392982963976411147683588415878214189996163533584547175794158118148724298832798898333399786561459152644144669959887341481968319172987357989785791366732849932788343772112176614723858474959919713855398876956427631354172668133549845585632211935573662181331613137869866693259374322169811683635325321597242889358147123358117774914653787371368574784376721652181792371635288376729784967526824915192526744935187989571347746222113625577963476141923187534658445615596987614385911513939292257263723518774888174635963254624769684533531443745729344341973746469326838186248448483587477563285867499956446218775232374383433921835993136463383628861115573142854358943291148766299653633195582135934544964657663198387794442443531964615169655243652696782443394639169687847463721585527947839992182415393199964893658322757634675274422993237955354185194868638454891442893935694454324235968155913963282642649968153284626154111478389914316765783434365458352785868895582488312334931317935669453447478936938533669921165437373741448378477391812779971528975478298688754939216421429251727555596481943322266289527996672856387648674166997731342558986575258793261986817177487197512282162964167151259485744835854547513341322647732662443512251886771887651614177679229984271191292374755915457372775856178539965131319568278252326242615151412772254257847413799811417287481321745372879513766235745347872632946776538173667371228977212143996391617974367923439923774388523845589769341351167311398787797583543434725374343611724379399566197432154146881344528319826434554239373666962546271299717743591225567564655511353255197516515213963862383762258959957474789718564758843367325794589886852413314713698911855183778978722558742329429867239261464773646389484318446574375323674136638452173815176732385468675215264736786242866295648997365412637499692817747937982628518926381939279935993712418938567488289246779458432179335139731952167527521377546376518126276`;

  var solveFn1 = function(input) { /* FN1 START */
    let output = 0;

    input = input.split('');
    input.push(input[0]);

    for(let i=0; i<input.length-1; i++) {
      let current = input[i];
      let next = input[i+1];
      if(current === next) {
        output += parseInt(current);
      }
    }

    return output;
  /* FN1 END */ }

  var solveFn2 = function(input) { /* FN2 START */
    let output = 0;

    input = input.split('');

    for(let i=0; i<input.length; i++) {
      let currentIndex = i;
      let currentValue = parseInt(input[i]);
      let pairIndex = (i + input.length/2) % input.length;
      let pairValue = parseInt(input[pairIndex])

      //console.log("Current", currentIndex, currentValue, "Pair", pairIndex, pairValue);

      if(currentValue === pairValue) {
        output += currentValue;
      }
    }

    return output;
  /* FN2 END */ }

  window.aoc[1] = [input, solveFn1, solveFn2];
}($,_))