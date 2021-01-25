/**
 * @swagger
 * tags:
 *   - name: Account
 *   - name: Sound
 *   - name: Like
 */
/**
 * @swagger
 *  paths:
 *    /api/create/account:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "회원 가입 API, 사용자 아이디(E-mail), Password, 닉네임 3개를 입력해야 합니다."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "data"
 *          description: ""
 *          required: true
 *          schema:
 *            $ref: "#/models/User"
 *        properties:
 *          
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/login:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
/**
 * @swagger
 *  paths:
 *    /api/update/profile:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
/**
 * @swagger
 *  paths:
 *    /api/token/test:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/profile/info:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
/**
 * @swagger
 *  paths:
 *    /api/confirm/account:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
/**
 * @swagger
 *  paths:
 *    /api/upload/file:
 *      post:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]업로드가 성공 되었습니다"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/soundList:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "result"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/my/soundList:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "result"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/remove/my/sound:
 *      post:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: ""
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]삭제 완료 되었습니다"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/search/sound:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[검색성공]"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/my/like/sounds:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: ""
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[검색성공]"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */
/**
 * @swagger
 *  paths:
 *    /api/set/like:
 *      post:
 *        tags:
 *        - "Like"
 *        summary: ""
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: ""
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "[완료]업로드가 성공 되었습니다"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 */