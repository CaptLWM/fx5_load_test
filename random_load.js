//------------------------------------------------------
// 랜덤 발생 함수
//------------------------------------------------------
function getRandomInt16() {
    var r = Math.random();
    var v = Math.floor(r * 65536) - 32768;
    return v;
}

function getRandomDigit() {
    var r = Math.random();
    if (r < 0.5) {
        return 0;
    } else {
        return 1;
    }
}

//------------------------------------------------------
// 태그 범위
//------------------------------------------------------
// Ethernet INT16
var D_E_I_Start = 2624;
var D_E_I_End   = 7999;
var R_E_I_Start = 2624;
var R_E_I_End   = 22623;

// Serial INT16
var D_S_I_Start = 1;
var D_S_I_End   = 1000;
var R_S_I_Start = 1;
var R_S_I_End   = 1000;

// Serial DIGIT
var D_S_D_Start = 1;
var D_S_D_End   = 5000;
var R_S_D_Start = 1;
var R_S_D_End   = 5000;

//------------------------------------------------------
// 인덱스(각 그룹이 독립적으로 진행)
//------------------------------------------------------
var d_e_i = D_E_I_Start;
var r_e_i = R_E_I_Start;

var d_s_i = D_S_I_Start;
var r_s_i = R_S_I_Start;

var d_s_d = D_S_D_Start;
var r_s_d = R_S_D_Start;

//------------------------------------------------------
// Chunk 크기: 한 번에 처리할 태그 개수
//------------------------------------------------------
var chunk = 20;   // 상황 따라 10~50 사이로 조절 가능
var delay = 100;    // 버퍼 보호용

//------------------------------------------------------
// 메인 루프 – 병렬처럼 조금씩 교차 실행
//------------------------------------------------------
while (1) {

    //--------------------------------------------------
    // 1) Ethernet INT16 (D)
    //--------------------------------------------------
    var count = 0;
    while (d_e_i <= D_E_I_End && count < chunk) {
        var tagName = "D_Ethernet.INT16." + d_e_i;
        func.setTagValue(tagName, getRandomInt16());
        d_e_i = d_e_i + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (d_e_i > D_E_I_End) d_e_i = D_E_I_Start;

    //--------------------------------------------------
    // 2) Ethernet INT16 (R)
    //--------------------------------------------------
    count = 0;
    while (r_e_i <= R_E_I_End && count < chunk) {
        tagName = "R_Ethernet.INT16." + r_e_i;
        func.setTagValue(tagName, getRandomInt16());
        r_e_i = r_e_i + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (r_e_i > R_E_I_End) r_e_i = R_E_I_Start;

    //--------------------------------------------------
    // 3) Serial INT16 (D)
    //--------------------------------------------------
    count = 0;
    while (d_s_i <= D_S_I_End && count < chunk) {
        tagName = "D_Serial.INT16." + d_s_i;
        func.setTagValue(tagName, getRandomInt16());
        d_s_i = d_s_i + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (d_s_i > D_S_I_End) d_s_i = D_S_I_Start;

    //--------------------------------------------------
    // 4) Serial INT16 (R)
    //--------------------------------------------------
    count = 0;
    while (r_s_i <= R_S_I_End && count < chunk) {
        tagName = "R_Serial.INT16." + r_s_i;
        func.setTagValue(tagName, getRandomInt16());
        r_s_i = r_s_i + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (r_s_i > R_S_I_End) r_s_i = R_S_I_Start;

    //--------------------------------------------------
    // 5) Serial DIGIT (D)
    //--------------------------------------------------
    count = 0;
    while (d_s_d <= D_S_D_End && count < chunk) {
        tagName = "D_Serial.DIGIT." + d_s_d;
        func.setTagValue(tagName, getRandomDigit());
        d_s_d = d_s_d + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (d_s_d > D_S_D_End) d_s_d = D_S_D_Start;

    //--------------------------------------------------
    // 6) Serial DIGIT (R)
    //--------------------------------------------------
    count = 0;
    while (r_s_d <= R_S_D_End && count < chunk) {
        tagName = "R_Serial.DIGIT." + r_s_d;
        func.setTagValue(tagName, getRandomDigit());
        r_s_d = r_s_d + 1;
        count = count + 1;
        func.sleep(delay);
    }
    if (r_s_d > R_S_D_End) r_s_d = R_S_D_Start;

    //--------------------------------------------------
    // 사이클 사이 보호 (너무 빠르면 버퍼 터짐 예방)
    //--------------------------------------------------
    func.sleep(5);
}
