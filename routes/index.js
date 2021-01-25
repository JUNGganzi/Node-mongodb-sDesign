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
 *            properties:
 *                accountEmail:
 *                    type: string
 *                accountPw:
 *                    type: string
 *                accountName:
 *                    type: string
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
 *        description: "로그인 API 사용자의 Email 아이디와 암호를 입력해야 합니다."
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
 *            properties:
 *                accountEmail:
 *                    type: string
 *                accountPw:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[완료]로그인이 완료되었습니다"
 *          409:
 *            description: "[에러]비밀번호가 맞지 않아 로그인에 실패하였습니다"
 *          500:
 *            description: "[에러]서버에 문제가 있어 로그인하지 못했습니다"
 */
/**
 * @swagger
 *  paths:
 *    /api/update/profile:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "프로필 수정 api 프로필 이미지, 닉네임 수정 기능"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "formData"
 *          name: userImg
 *          schema:
 *            type: file
 *        - in: "formData"
 *          name: accountName
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[완료]업로드가 성공 되었습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/token/test:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "토큰 디코드 테스트 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원 가입에 실패하였습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/get/profile/info:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "토큰 기반 프로필 데이터 조회"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원 가입에 실패하였습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/confirm/account:
 *      get:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "이메일 인증 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "query"
 *          name: "hashValue"
 *          description: "계정 고유 id + 1"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[완료]이메일 인증이 완료되었습니다"
 */
/**
 * @swagger
 *  paths:
 *    /api/upload/file:
 *      post:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "파일 업로드시 사용되는 api 입니다."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "formData"
 *          name: "userFile"
 *          required: true
 *          schema:
 *            type: file
 *        - in: "formData"
 *          name: "soundName"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "formData"
 *          name: category
 *          schema:
 *            type: string
 *        - in: "formData"
 *          name: "tags"
 *          required: true
 *          schema:
 *            type: array
 *            items: 
 *              type: string
 *            maxItems: 5
 *        responses:
 *          200:
 *            description: "[완료]업로드가 성공 되었습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/get/soundList:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "업로드된 Sound 전체 목록 조회, 페이징 적용 Ver"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token 있어도 되고 없어도 되고"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "next"
 *          description: "next code"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "previous code"
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "result"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/my/soundList:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "내가 업로드한 Sound 목록 조회, 페이징 적용 Ver"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "next"
 *          description: "next code"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "previous code"
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "result"
 */
/**
 * @swagger
 *  paths:
 *    /api/remove/my/sound:
 *      post:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "내 Sound 삭제 하기 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "body"
 *          name: "data"
 *          required: true
 *          schema:
 *            properties:
 *              soundId:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[완료] 업로드가 성공 되었습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/search/sound:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "사운드 검색 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token 있어도 되고 없어도 되고"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "keyword"
 *          description: "검색어"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "next"
 *          description: "다음 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "이전 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[검색 성공]"
 */
/**
 * @swagger
 *  paths:
 *    /api/get/my/like/sounds:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: ""
 *        description: "좋아요한 사운드 리스트 조회 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "next"
 *          description: "다음 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "이전 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[검색 성공]"
 */
/**
 * @swagger
 *  paths:
 *    /api/set/like:
 *      post:
 *        tags:
 *        - "Like"
 *        summary: ""
 *        description: "Sound 좋아요 설정/해제 api"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "body"
 *          name: "data"
 *          required: true
 *          schema:
 *            properties:
 *              soundId:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[완료] 업로드가 성공 되었습니다."
 */