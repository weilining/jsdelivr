(() => {
  let e = {
    flakeCount: 100,
    minDist: 150,
    color: "255, 255, 255",
    size: 2,
    speed: 0.5,
    opacity: 0.2,
    stepsize: 0.5,
  };
  const t =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1e3 / 60);
    };
  window.requestAnimationFrame = t;
  const i = document.getElementById("snow"),
    n = i.getContext("2d"),
    o = e.flakeCount;
  let a = -100,
    s = -100,
    d = [];
  (i.width = window.innerWidth), (i.height = window.innerHeight);
  const h = () => {
      n.clearRect(0, 0, i.width, i.height);
      const r = e.minDist;
      for (let t = 0; t < o; t++) {
        let o = d[t];
        const h = a,
          m = s,
          w = o.x,
          c = o.y,
          p = Math.sqrt((h - w) * (h - w) + (m - c) * (m - c));
        if (p < r) {
          const e = (h - w) / p,
            t = (m - c) / p,
            i = r / (p * p) / 2;
          (o.velX -= i * e), (o.velY -= i * t);
        } else
          (o.velX *= 0.98),
            o.velY < o.speed &&
              o.speed - o.velY > 0.01 &&
              (o.velY += 0.01 * (o.speed - o.velY)),
            (o.velX += Math.cos((o.step += 0.05)) * o.stepSize);
        (n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")"),
          (o.y += o.velY),
          (o.x += o.velX),
          (o.y >= i.height || o.y <= 0) && l(o),
          (o.x >= i.width || o.x <= 0) && l(o),
          n.beginPath(),
          n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
          n.fill();
      }
      t(h);
    },
    l = (e) => {
      (e.x = Math.floor(Math.random() * i.width)),
        (e.y = 0),
        (e.size = 3 * Math.random() + 2),
        (e.speed = 1 * Math.random() + 0.5),
        (e.velY = e.speed),
        (e.velX = 0),
        (e.opacity = 0.5 * Math.random() + 0.3);
    };
  document.addEventListener("mousemove", (e) => {
    (a = e.clientX), (s = e.clientY);
  }),
    window.addEventListener("resize", () => {
      (i.width = window.innerWidth), (i.height = window.innerHeight);
    }),
    (() => {
      for (let t = 0; t < o; t++) {
        const t = Math.floor(Math.random() * i.width),
          n = Math.floor(Math.random() * i.height),
          o = 3 * Math.random() + e.size,
          a = 1 * Math.random() + e.speed,
          s = 0.5 * Math.random() + e.opacity;
        d.push({
          speed: a,
          velX: 0,
          velY: a,
          x: t,
          y: n,
          size: o,
          stepSize: (Math.random() / 30) * e.stepsize,
          step: 0,
          angle: 180,
          opacity: s,
        });
      }
      h();
    })();
})();
