<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원가입</title>
</head>
<body>
<form id="frm" action="join" method="post">
    <div>
        <input type="text" name="uid" placeholder="아이디">
        <input type="button" id="btnChkId" value="ID중복체크">
    </div>
    <div id="chkUidResult"></div>
    <div>
        <input type="password" name="upw" placeholder="비밀번호">
    </div>
    <div>
        <input type="password" id="chkUpw" placeholder="비밀번호 확인">
    </div>
    <div>
        성별 :
        <label>남<input type="radio" name="gender" value="0" checked></label>
        <label>여<input type="radio" name="gender" value="1"></label>
    </div>
    <div>
        <input type="text" name="unm" placeholder="이름">
    </div>
    <div>
        <input type="submit" value="회원가입">
        <input type="reset" value="초기화">
    </div>
</form>
</body>
</html>