# Restful Api

* POST /signup : User signup ( 유저 회원가입 )

> Params

    id : {type : String, unique: true}, // ID

    name : {type: String}, // 이름

    passwd : {type : String}, // Password

> Response

    HTTP 200 : {
      "token": "HtsVQIRpMEYjkbtm3L8tgPOoRFS6mx56YqqqRXH6",
      "id": "asdasd",
      "passwd": "1234",
      "name": "이름",
      "emailList": []
    }

    HTTP 409 : { message : "already exist"}

* POST /signin : User signin ( 유저 로그인 )

> Params

    id : {type: String, unique: true}, // ID

    passwd : {type : String},

> Response

    HTTP 200 : {
      "token": "HtsVQIRpMEYjkbtm3L8tgPOoRFS6mx56YqqqRXH6",
      "id": "asdasd",
      "passwd": "1234",
      "name": "이름",
      "emailList": []
    }

    HTTP 404 : { message : "Not found"}

* POST /push : Push Email in List ( 이메일 추가 )

> Params

    token : {type: String}, // 유저 토큰

    email : {type : String}, // 추가 할 이메일

> Response

    HTTP 200 : { message : "success!"} // 성공

    HTTP 404 : { message : "User Not Found!" } // 유저 미확인

    HTTP 409 : { message : "already exist!" } // 이메일 중복 ( 리스트에 이미 존재 시 )

    HTTP 500 : { message : "ERR!" } // 서버 에러

* POST /pull : Pull Emaill in List ( 이메일 제거 )

> Params

    token : {type: String}, // 유저 토큰

    email : {type : String}, // 추가 할 이메일

> Response

    HTTP 200 : { message : "success!"} // 성공

    HTTP 500 : { message : "ERR!" } // 서버 에러

* POST /list : Show Email List ( 이메일 리스트 보기 )

> Params

    token : {type: String} // 유저 토큰

> Response

    HTTP 200 : {
      "list": [
        {
          "email": "test@naver.com"
        }
      ]
    }

    HTTP 404 : {message : "User Not Found"} // 유저 미확인

* POST /check : Check "Is Email in List?" ( 이메일 확인 )

> Params

    token : {type: String} // 유저 토큰

> Response

    HTTP 200 : { message : "success!"} // 이메일이 리스트에 있을 시

    HTTP 204 : { message : "Email Not Found!" }

    HTTP 404 : { message : "User Not Found" } // 유저 미확인
