const upInput = document.querySelector(".up");
const downInput = document.querySelector(".down");
const btn = document.querySelector(".btn");
const h4 = document.body.querySelector("h4");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

let mouse = {
  x: undefined,
  y: undefined,
  right: false,
  down: false,
  sin: undefined,
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  const sin =
    (mouse.x - canvas.width / 2) /
    Math.sqrt(
      Math.pow(mouse.x - canvas.width / 2, 2) +
        Math.pow(mouse.y - canvas.height / 2, 2)
    );
  mouse.sin = Math.abs(sin);

  if (mouse.x - canvas.width / 2 > 0) {
    mouse.right = true;
  } else {
    mouse.right = false;
  }
  if (mouse.y - canvas.height / 2 > 0) {
    mouse.down = true;
  } else {
    mouse.down = false;
  }
});

let n1;
let n2;
btn.addEventListener("click", () => {
  n1 = upInput.value;
  n2 = downInput.value;
  animate();
});

function animate() {
  myAnimation = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;

  ctx.fillStyle = "rgba(0,0,255, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.fillStyle = "rgba(0,0,255, 0.2)";
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  ctx.beginPath();
  ctx.setLineDash([5, 3]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.moveTo(mouse.x, mouse.y);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,97, 0.5)";
  ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
  ctx.fill();

  let nn1 = n1;
  let nn2 = n2;
  if (mouse.down) {
    nn1 = n2;
    nn2 = n1;
  }
  const newX = mouse.right
    ? -Math.abs(mouse.x - canvas.width / 2)
    : Math.abs(mouse.x - canvas.width / 2);
  const sin2 = mouse.sin / (nn2 / nn1);
  const side = (1 / sin2) * newX;
  const newY = Math.sqrt(Math.pow(side, 2) - Math.pow(newX, 2));

  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  if (mouse.down) {
    ctx.lineTo(canvas.width / 2 + newX * 5, canvas.height / 2 - newY * 5);
  } else {
    ctx.lineTo(canvas.width / 2 + newX * 5, canvas.height / 2 + newY * 5);
  }
  ctx.stroke();

  if (n1 && n2 && !newY) {
    h4.innerHTML = "전반사 중";
  } else if (n1 && n2 && newY) {
    h4.innerHTML = "굴절 중";
  } else {
    h4.innerHTML = "값을 입력하세요";
  }
}

animate();
