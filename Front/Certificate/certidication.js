// Instead of plain text, encode a link
const qrLink = `http://127.0.0.1:3000/certification.html?id=${userData.certificate_id}`;
new QRCode(document.getElementById("qrcode"), {
  text: qrLink,
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});
