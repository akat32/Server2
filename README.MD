# Restful Api

* POST /signup : User signup ( 유저 회원가입 )

> Params

    id : {type : String, unique: true}, // ID

    name : {type: String}, // 이름

    passwd : {type : String}, // Password

> Response

    HTTP 200 : { message : "success!" }

    HTTP 409 : { message : "already exist" }

* POST /signin : User signin ( 유저 로그인 )

> Params

    id : {type: String, unique: true}, // ID

    passwd : {type : String},

> Response

    HTTP 200 : {
    "SocialEmailList": [
        {
            "email": "aaa@aaa.com",
            "passwd": "aaaaa"
        }
      ]
    }

    HTTP 404 : { message : "Not found"}

* POST /addAccount : Push New Email Account ( 쓰루 유저에 이메일 계정 추가 )

> Params

    email : {type: String, unique: true}, // 쓰루에 추가할 Email

    token : {type: String} // 쓰루 유저의 토큰

> Response

    HTTP 200 : {
      email : "입력한 이메일",
      token : "유저 토큰"
    }

    HTTP 409 : { message : "already exist" }

    HTTP 500 : { message : "ERR!"}

* POST /addAccount : Push New Email Account ( 쓰루 유저에 이메일 계정 추가 )

> Params

    email : {type: String, unique: true}, // 쓰루에서 삭제할 Email

    passwd : {type: String}, // Email의 passwd

    token : {type: String} // 쓰루 유저의 토큰

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!"}

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
