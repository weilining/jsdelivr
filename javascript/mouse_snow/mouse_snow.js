"use strict";
(function () {
  function t(t) {
    (r = window.innerWidth), window.innerHeight;
  }
  function i(t) {
    if (0 < t.touches.length)
      for (var i = 0; i < t.touches.length; i++)
        n(
          t.touches[i].clientX,
          t.touches[i].clientY,
          a[Math.floor(Math.random() * a.length)]
        );
  }
  function e(t) {
    (h.x = t.clientX),
      (h.y = t.clientY),
      n(h.x, h.y, a[Math.floor(Math.random() * a.length)]);
  }
  function n(t, i, e) {
    var n = new l();
    n.init(t, i, e), s.push(n);
  }
  function o() {
    requestAnimationFrame(o),
      (function () {
        for (var t = 0; t < s.length; t++) s[t].update();
        for (t = s.length - 1; 0 <= t; t--)
          s[t].lifeSpan < 0 && (s[t].die(), s.splice(t, 1));
      })();
  }
  function l() {
    (this.character = "*"),
      (this.lifeSpan = 120),
      (this.initialStyles = {
        position: "fixed",
        top: "0",
        display: "block",
        pointerEvents: "none",
        "z-index": "10000000",
        fontSize: "20px",
        "will-change": "transform",
      }),
      (this.init = function (t, i, e) {
        (this.velocity = {
          x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1,
        }),
          (this.position = { x: t - 10, y: i - 20 }),
          (this.initialStyles.color = e),
          (this.element = document.createElement("span")),
          (this.element.innerHTML = this.character),
          (function (t, i) {
            for (var e in i) t.style[e] = i[e];
          })(this.element, this.initialStyles),
          this.update(),
          document.body.appendChild(this.element);
      }),
      (this.update = function () {
        (this.position.x += this.velocity.x),
          (this.position.y += this.velocity.y),
          this.lifeSpan--,
          (this.element.style.transform =
            "translate3d(" +
            this.position.x +
            "px," +
            this.position.y +
            "px,0) scale(" +
            this.lifeSpan / 120 +
            ")");
      }),
      (this.die = function () {
        this.element.parentNode.removeChild(this.element);
      });
  }
  var a = ["#D61C59", "#E7D84B", "#1B8798"],
    r = window.innerWidth,
    h = (window.innerHeight, { x: r / 2, y: r / 2 }),
    s = [];
  document.addEventListener("mousemove", e),
    document.addEventListener("touchmove", i),
    document.addEventListener("touchstart", i),
    window.addEventListener("resize", t),
    o();
})();
