// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 대상 : ID 입력 input
// 이벤트 : 페이지(window)가 로드 되었을 때
// 핸들러 :Focus()

const $id = document.querySelector('#id');
window.addEventListener('load', () => {
    $id.focus();
});

// 2. 유효성 검사 로직
// 대상 : id, 비밀번호, 비밀번호 확인 input
// 이벤트 : input이 focus out되었을 때 (2) 가입하기 버튼을 눌렀을 때
// 헨들러 : (1) 해당 input의 유효성 검사 (2) 모든 필드의 유효성 검사

const $pw = document.querySelector('#pw');
const $pwCheck = document.querySelector('#pw-check');
const $submit = document.querySelector('#submit');
const $modal = document.querySelector('#modal');

// (공통) 모든 필드의 값은 빠짐 없이 입력해야 한다.
// id : 5~20자, 영문 소문자, 숫자, 특수기호(_-)
// pw : 영문 대/소문자, 8~16자, 숫자
// pwch : pw와 일치

// (공통) 빈 값일 경우: 필수 정보입니다.
// [ID] 유효하지 않은 값일 경우: “5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.”
// [비밀번호] 유효하지 않은 값일 경우: “8~16자 영문 대 소문자, 숫자를 사용하세요.”
// [비밀번호 확인] 유효하지 않은 값일 경우: “비밀번호가 일치하지 않습니다.”

const ErrorCheck = (whatInput, reg) => {
    let ValidCheck;
    const IdError = `${whatInput.id}`;
    const ErrorMsg = document.querySelector(`#${IdError}-msg`);
    const addErrorMsg = {
        id: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
        pw: '유효하지 않은 값일 경우: “8~16자 영문 대 소문자, 숫자를 사용하세요.',
    };
    if (whatInput.value === '') {
        // console.log(`${whatInput} blank`)
        ErrorMsg.innerText = '필수 정보입니다.';
        ValidCheck = false;
        allVelidCheck[IdError] = false;
    } else if (reg) {
        ValidCheck = reg.test(whatInput.value);
        if (!ValidCheck) {
            ErrorMsg.innerText = addErrorMsg[IdError];
            allVelidCheck[IdError] = false;
        }
    } else {
        ValidCheck = whatInput.value === $pw.value;
        if (!ValidCheck) {
            ErrorMsg.innerText = '비밀번호가 일치하지 않습니다.';
            allVelidCheck[IdError] = false;
        }
    }
    // console.log('v', ValidCheck);
    if (ValidCheck) {
        whatInput.classList.remove('border-red-600');
        ErrorMsg.innerText = '';
        allVelidCheck[IdError] = true;
    } else {
        whatInput.classList.add('border-red-600');
    }
    console.log(ValidCheck);
    return ValidCheck;
};

const idReg = new RegExp('^[a-z0-9-_]{5,20}$');
const pwReg = new RegExp('^[a-zA-Z0-9]{8,16}$');

const idValidation = (whatInput) => {
    return ErrorCheck(whatInput, idReg);
};
const pwValidation = (whatInput) => {
    return ErrorCheck(whatInput, pwReg);
};
const pwCheckValidation = (whatInput) => {
    return ErrorCheck(whatInput);
};
$id.addEventListener('focusout', () => idValidation($id));
$pw.addEventListener('focusout', () => pwValidation($pw));
$pwCheck.addEventListener('focusout', () => pwCheckValidation($pwCheck));

const allVelidCheck = {
    id: false,
    pw: false,
    'pw-check': false,
};

$submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (Object.values(allVelidCheck).indexOf(false) === -1) {
        const confirmId = document.querySelector('#confirm-id');
        const confirmPw = document.querySelector('#confirm-pw');
        confirmId.innerText = $id.value;
        confirmPw.innerText = $pw.value;
        // $modal.open = true
        $modal.showModal();
    }
});

const $cancelBtn = document.querySelector('#cancel-btn');
const $approveBtn = document.querySelector('#approve-btn');

$cancelBtn.addEventListener('click', () => {
    $modal.close();
});
$approveBtn.addEventListener('click', () => {
    alert('가입되었습니다.');
    $modal.close();
});

// 'increase-font-btn'
const $increaseFontBtn = document.querySelector('#increase-font-btn');
const $decreaseFontBtn = document.querySelector('#decrease-font-btn');
const $htmlEl = document.documentElement;
const $currentHtmlFontsize = () =>
    parseInt(window.getComputedStyle($htmlEl).fontSize);
const maxFontSize = 20;
const minFontSize = 12;

$increaseFontBtn.addEventListener('click', () => {
    fontControll('increase');
});

$decreaseFontBtn.addEventListener('click', () => {
    fontControll('decrease');
});

const fontControll = (flg) => {
  let currentFontsize = $currentHtmlFontsize()
  let nextFontSize = flg === 'increase' ? currentFontsize + 1 :currentFontsize - 1
  $increaseFontBtn.disabled = nextFontSize >= maxFontSize
  $decreaseFontBtn.disabled = nextFontSize <= minFontSize
  $htmlEl.style.fontSize = nextFontSize
    // if (flg === 'increase') {
    //     let nextFontSize = $currentHtmlFontsize() + 1;
    //     if (nextFontSize >= maxFontSize) {
    //         $increaseFontBtn.disabled = true;
    //     }
    //     if (nextFontSize > minFontSize) $decreaseFontBtn.disabled = false
    //     $htmlEl.style.fontSize = nextFontSize;
    // } else {
    //     let nextFontSize = $currentHtmlFontsize() - 1;
    //     if (nextFontSize <= minFontSize) {
    //         $decreaseFontBtn.disabled = true;
    //     }
    //     if (nextFontSize < maxFontSize) $increaseFontBtn.disabled = false
    //     $htmlEl.style.fontSize = nextFontSize;
        
    // }
};

// const checkIdValidation = (value) => {
//   const ID_REGEX = new RegExp('^[a-z|0-9|-|_]{5,20}$')
//   console.log(ID_REGEX.test(value))
// }
// const checkPwValidation = (value) => {
//   const PW_REGEX = new RegExp('^[a-z|0-9|A-Z]{8,16}$')
//   console.log(PW_REGEX.test(value))
// }
// const checkPwCheckValidation = (value) => {
//   if(value === '') console.log(false)
//   else console.log(value === $pw.value  )

// }

// $id.addEventListener('focusout', () => checkIdValidation($id.value))
// $pw.addEventListener('focusout', () =>checkPwValidation($pw.value))
// $pwCheck.addEventListener('focusout', () =>checkPwCheckValidation($pwCheck.value))
// $submit.addEventListener('click', (e) => {
//   e.preventDefault()
//   checkIdValidation($id.value)
//   checkPwCheckValidation($pw.value)
//   checkPwCheckValidation($pwCheck.value)
// })
