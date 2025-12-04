// =====================================
// INT16 Value Update (구버전 SCADA 호환형)
// =====================================
var int16Value = 0;
function nextInt16Value(v) {
    if (v < 32767) return v + 1;
    return -32768;
}

// =====================================
// Tag Array 구성
// =====================================
var serialTags = [];
var ethernetTags = [];

// -------- Serial INT16 --------
var i = 1;
while (i <= 1000) {
    serialTags.push("D_Serial.INT16." + i);
    i = i + 1;
}

i = 1;
while (i <= 1000) {
    serialTags.push("R_Serial.INT16." + i);
    i = i + 1;
}

// -------- Serial DIGIT --------
i = 1;
while (i <= 5000) {
    serialTags.push("D_Serial.DIGIT." + i);
    i = i + 1;
}

i = 1;
while (i <= 5000) {
    serialTags.push("R_Serial.DIGIT." + i);
    i = i + 1;
}

// -------- Ethernet INT16 --------
var start = 2624;
var end = 7999;

i = start;
while (i <= end) {
    ethernetTags.push("D_Ethernet.INT16." + i);
    i = i + 1;
}

i = 2624;
while (i <= 22623) {
    ethernetTags.push("R_Ethernet.INT16." + i);
    i = i + 1;
}

// =====================================
// Index (순환 포인터)
// =====================================
var serialIndex = 0;
var ethernetIndex = 0;
var digitState = 0;

// =====================================
// Main Loop
// =====================================
while (1) {

    int16Value = nextInt16Value(int16Value);
    digitState = digitState === 0 ? 1 : 0;

    // -------------------------------
    // 1) Serial 태그: 1개당 sleep(1ms)
    // -------------------------------
    var tagS = serialTags[serialIndex];

    if (tagS.indexOf("DIGIT") > -1) {
        func.setTagValue(tagS, digitState);
    } else {
        func.setTagValue(tagS, int16Value);
    }

    serialIndex = serialIndex + 1;
    if (serialIndex >= serialTags.length) serialIndex = 0;

    func.sleep(100);   // ★ 당신의 환경에서 검증된 안정값


    // -------------------------------
    // 2) Ethernet 태그: 버퍼 넉넉함 → sleep 없음 가능
    // -------------------------------
    var tagE = ethernetTags[ethernetIndex];
    func.setTagValue(tagE, int16Value);

    ethernetIndex = ethernetIndex + 1;
    if (ethernetIndex >= ethernetTags.length) ethernetIndex = 0;
}
