var frmElem = document.querySelector('#frm');
var uidElem = frmElem.uid;
var upwElem = frmElem.upw;
var unmElem = frmElem.unm;
var chkUpwElem = frmElem.chkUpw;
var btnChkIdElem = frmElem.btnChkId;
var chkUidResultElem = frmElem.querySelector('#chkUidResult');
// 자바스크립트에서 이벤트 바인딩 하는 법.
// 첫번째는 이벤트 명, 두번쨰는 함수
btnChkIdElem.addEventListener('click',function() { // ID중복체크 버튼
    idChkAjax(uidElem.value);
});

function idChkAjax(uid){
    console.log(uid);
    //주소값 참조 후 "<tag>이 사이에 추가하는 기능</tag>" // innerText
    // fetch는 get방식 전송
    fetch('/user/idChk?uid='+uid)
        .then(function(res){
            return res.json();
        })
        .then(function(myJson){
            console.log(myJson);
            switch(myJson.result) {
                case 0:
                    chkUidResultElem.innerText = '이 아이디는 사용 할 수 있습니다.';
                    break;
                case 1:
                    chkUidResultElem.innerText = '이 아이디는 사용 할 수 없습니다.';
                    break;
            }
        });
}

// html id나 name이나 접근 가능
function frmChk() {
    var uidVal = uidElem.value;
    if(uidVal.length < 3){
        if(uidVal.length == 0){
            alert('아이디를 작성 해 주세요.');
        } else {
            alert('아이디는 2자 이상 작성 해 주세요.');
        } return false;
    }
    var upwVal = upwElem.value;
    var chkUpwVal = chkUpwElem.value;
    if(upwVal.length < 5){
        if(upwVal.length == 0){
            alert('비밀번호를 입력 해 주세요.');
        } else {
            alert('비밀번호는 4자 이상 입력 해 주세요.');
        } return false;
    } else if(upwVal != chkUpwVal){
        alert('비밀번호를 확인 해 주세요.');
        return false;
    }
    if(unmElem.value.length < 2){
        alert('이름은 2자 이상 입력 해 주세요.')
        return false;
    }
}