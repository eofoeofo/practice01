<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>글수정</title>
</head>
<body>
<h1>글 수정^ㅡ^</h1>
<div>
    <form action="update" method="post">
        <input type="hidden" name="iboard" value="${param.iboard}">
        <div>
            <input type="text" name="title" value="${data.title}">
        </div>
        <div>
            <textarea name="ctnt" >${data.ctnt}</textarea>
        </div>
        <div>
            <input type="submit" value="글쓰기">
            <input type="reset" value="초기화">
        </div>
    </form>
</div>
</body>
</html>