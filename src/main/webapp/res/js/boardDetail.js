var cmtFrmElem = document.querySelector('#cmtFrm');

var cmtListElem = document.querySelector('#cmtList');
var cmtUpdModalElem = document.querySelector('#modal');

function enterKey() {
    if (window.event.keyCode == 13) {
        regCmt();
    }
}

function regCmt() {
    var cmtVal = cmtFrmElem.cmt.value;
    console.log(cmtListElem.dataset.iboard);
    console.log(cmtVal);

    var param = {
        iboard: cmtListElem.dataset.iboard,
        cmt: cmtVal
    };
    regAjax(param);
}
// 서버가 등록해야할 자료를 전달하는 함수
function regAjax(param) {
    const init = {
        method: 'POST', // POST로 날림
        body: JSON.stringify(param), // 문자열로 바꿈
        headers:{ // JSON형태로 날리겠다
            'accept' : 'application/json',
            'content-type' : 'application/json;charset=UTF-8'
        }
    };

    fetch('cmtIns', init)
        // res는 브라우저에서 JSON형태로 문자열을 받는다, 받고 myJson에 보낸다.

        .then(function(res) {
            console.log('res  : ' + res);
            return res.json();
        })
        .then(function(myJson) {
            console.log('myJson : ' + myJson);
            switch (myJson.result) {
                case 0:
                    alert('등록 실패!');
                    break;
                case 1:
                    cmtFrmElem.cmt.value = '';
                    getListAjax();
                    break;
            }
        });
}
// 서버에게 댓글 리스트 자료를 요청하는 함수
function getListAjax() {
    var iboard = cmtListElem.dataset.iboard;
    fetch('cmtSel?iboard=' + iboard)
        .then(function(res) {
            return res.json();
        })
        .then(function(myJson) {
            console.log(myJson);

            makeCmtElemList(myJson); // myJson데이터를 보냄
        });
}
function makeCmtElemList(data) { // JSON형태의 배열이 data
    // html tag를 js단에서 처리하는 방식
    // 서버에서 데이터가 넘어온 이후의 상황일 때,
    // 동적으로 리스트에 뿌리기 위해서는 js로 tag를 처리해야한다.
    cmtListElem.innerHTML = ''; // 댓글 트리거 작동 후, 가지고 있던 값을 지워버리는 역할
    var tableElem = document.createElement('table'); // 메모리에 html table<tag>를 만듬
    var trElemTable = document.createElement('tr');
    var thElemCtnt = document.createElement('th');
    var thElemWriter = document.createElement('th');
    var thElemRegdate = document.createElement('th');
    var thElemRemarks = document.createElement('th'); // 비고

    thElemCtnt.innerText = '내용';
    thElemWriter.innerText = '작성자';
    thElemRegdate.innerText = '작성일';
    thElemRemarks.innerText = '비고';

    trElemTable.append(thElemCtnt);
    trElemTable.append(thElemWriter);
    trElemTable.append(thElemRegdate);
    trElemTable.append(thElemRemarks);

    tableElem.append(trElemTable);
    // 아직까지 메모리에만 존재하는 js <tag>.

    cmtListElem.append(tableElem);

    var loginUserPk = cmtListElem.dataset.login_user_pk;

    data.forEach(function(item) { // 배열의 객체를 인자값으로 받음.
        var trElemItem = document.createElement('tr');
        var tdElemCmt = document.createElement('td');
        var tdElemUnm = document.createElement('td');
        var tdElemRegdate = document.createElement('td');
        var tdElemBtn = document.createElement('td');

        tdElemCmt.append(item.cmt);
        tdElemUnm.append(item.writerNm);
        tdElemRegdate.append(item.regdate);

        if (parseInt(loginUserPk) === item.iuser) {
            var delBtn = document.createElement('button');
            var updBtn = document.createElement('button');

            delBtn.addEventListener('click', function() {
                if (confirm('삭제하시겠습니까?')) {
                    delAjax(item.icmt);
                }
            });

            // 댓글 수정버튼 모달창
            updBtn.addEventListener('click', function() {
                openUpdModal(item); // item의 주소값(객체)을 보냄
            });

            delBtn.innerText = '삭제'; // value ㄴㄴ
            updBtn.innerText = '수정';

            tdElemBtn.append(delBtn);
            tdElemBtn.append(updBtn);
        }

        trElemItem.append(tdElemCmt);
        trElemItem.append(tdElemUnm);
        trElemItem.append(tdElemRegdate);
        trElemItem.append(tdElemBtn);

        tableElem.append(trElemItem);
    });

}

function delAjax(icmt) {
    const del = {
        headers:{ // JSON형태로 날리겠다
            'accept' : 'application/json',
            'content-type' : 'application/json;charset=UTF-8'
        }
    };

    fetch('cmtDel?icmt=' + icmt,del)
        .then(function(res) {
            return res.json();
        })
        .then(function(myJson) { // 객체로 넘어오는 구간 // "{result : 0or1}"
            console.log(myJson)
            switch (myJson.result) {
                case 0:
                    alert('댓글 삭제에 실패하셨습니다.')
                    break;
                case 1:
                    getListAjax(); // 삭제가 되었다면, 리스트를 다시 뿌리는 함수
                    break;
            }
        });
}
function updAjax() {
    var cmtUpdFrmElem = document.querySelector('#cmtUpdFrm');
    var param = {
        icmt: cmtUpdFrmElem.icmt.value,
        cmt: cmtUpdFrmElem.cmt.value
    }
    const init = {
        method: 'POST', // POST로 날림
        body: JSON.stringify(param), // 문자열로 바꿈
        headers:{ // JSON형태로 날리겠다
            'accept' : 'application/json',
            'content-type' : 'application/json;charset=UTF-8'
        }
    };

    fetch('cmtUpd', init)
        .then(function(res) {
            console.log('res  : ' + res);
            return res.json();
        })
        .then(function(myJson) {
            console.log('myJsonUpd  : ' + myJson);
            closeUpdModal();
            switch (myJson.result) {
                case 0:
                    alert('수정 실패!');
                    break;
                case 1:
                    getListAjax();
                    break;
            }
        });
}

function openUpdModal({ icmt, cmt }) {
    cmtUpdModalElem.className = '';
    var cmtUpdFrmElem = document.querySelector('#cmtUpdFrm')

    cmtUpdFrmElem.icmt.value = icmt;
    cmtUpdFrmElem.cmt.value = cmt;
    console.log('icmt : ' + icmt);
    console.log('cmt : ' + cmt);
}

function closeUpdModal() {
    cmtUpdModalElem.className = 'displayNone';
}

getListAjax();// 이 파일이 임포트 되면 함수 1회 호출