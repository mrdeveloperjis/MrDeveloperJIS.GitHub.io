! function (d) {
  function a() { }
  var e = "string" == typeof __pageclip_base ? __pageclip_base : "https://send.pageclip.co",
    m = {
      _base: e,
      _successTemplate: '<div class="pageclip-form__success__message"> Thank You! </div>',
      cssBase: "pageclip-form",
      form: function (n, r) {
        if (r = r || {}, null == n) throw new Error("form() must be passed an HTMLFormElement or String, not null");
        if ("string" == typeof n && (n = document.querySelector(n)), !((n = d.jQuery && n instanceof d.jQuery ? n[0] : n) instanceof d.HTMLFormElement)) throw new Error("form() must be passed an HTMLFormElement or String");
        var t = f(n.getAttribute("action")),
          o = {
            "X-REQMETHOD": "form-v1",
            "Content-Type": "application/json"
          },
          e = m.cssBase,
          i = m.cssBase + "--submitting",
          a = m.cssBase + "--error",
          c = m.cssBase + "--success",
          u = r.successTemplate || m._successTemplate,
          l = new p(n);
        n.classList.add(e), n.onsubmit = function (e) {
          e.preventDefault(), l.start();
          var e = JSON.stringify(m.formToJSON(n)),
            s = !1 !== (!r.onSubmit || r.onSubmit());
          s && (n.classList.add(i), m._showSubmitting(n), m._send(t.key, t.url, o, e, r, function (e, t) {
            s && m._hideSubmitting(n), n.classList.remove(i), n.classList.add(e ? a : c), !1 === (!r.onResponse || r.onResponse(e, t)) || e || m._showSuccess(n, u), e ? console.error(e.message || e) : n.reset(), setTimeout(function () {
              l.stop()
            }, 200)
          }))
        }
      },
      send: function (e, t, s, n) {
        t = m._base + "/" + e + "/" + (t || "");
        m._send(e, t, {
          "X-REQMETHOD": "send-v1",
          "Content-Type": "application/json"
        }, JSON.stringify(s), {}, n)
      },
      formToJSON: function (e) {
        for (var t = e.elements, s = {}, n = 0; n < t.length; n++) {
          var r = t[n];
          r.name.trim() && ("radio" !== r.type && "checkbox" !== r.type || r.checked) && (s[r.name] = r.value)
        }
        return s
      },
      _send: function (t, e, s, n, r, o) {
        try {
          m._xhrFetch(t, e, s, n, o)
        } catch (e) {
          m._sendError(t, e), o(e)
        }
      },
      _xhrFetch: function (s, e, t, n, r) {
        var o, i = m._xhr();
        for (o in t = function (e, t) {
          if (t)
            for (var s in t) e[s] = t[s];
          return e
        }({
          "X-REQTRANSPORT": "xhr",
          "X-HASFETCH": !!d.fetch
        }, t), r = r || a, i.onreadystatechange = function () {
          try {
            var e, t;
            4 === i.readyState && (e = i.response, t = 200 === i.status ? null : new Error("Error submitting data: " + (e ? e.error : "Unknown Error")), r(t, t ? null : e))
          } catch (t) {
            m._sendError(s, t), r(t)
          }
        }, i.open("POST", e), i.responseType = "json", t) i.setRequestHeader(o, t[o]);
        i.send(n)
      },
      _xhr: function () {
        return new (d.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0")
      },
      _sendError: function (e, t) {
        var s = '{"error": "' + (t.stack || t.message || t + "").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"}',
          t = m._xhr();
        t.open("POST", m._base + "/error/" + (e || "")), t.setRequestHeader("Content-Type", "application/json"), t.setRequestHeader("X-REQMETHOD", "send-v1"), t.send(s)
      },
      _showSubmitting: function (e) {
        t(e, !0)
      },
      _hideSubmitting: function (e) {
        t(e, !1)
      },
      _showSuccess: function (e, t) {
        var s = document.createElement("div");
        s.classList.add(m.cssBase + "__success"), s.innerHTML = t, s.onclick = function () {
          m._hideSuccess(e)
        }, e.appendChild(s)
      },
      _hideSuccess: function (e) {
        e = e.querySelector("." + m.cssBase + "__success");
        e && e.remove()
      }
    };

  function t(e, t) {
    for (var s = e.querySelectorAll("input"), n = 0; n < s.length; n++) s[n].disabled = t
  }
  var s = /^(.+)\/([\w\d]{32})(\/([^\/]*))?$/;

  function f(e) {
    var t = "Malformed action: " + e,
      e = s.exec(e);
    if (!e) throw new Error(t);
    e = {
      base: e[1],
      key: e[2],
      bucket: e[4] || ""
    };
    if (e.base !== m._base || !e.key.length) throw new Error(t);
    return e.url = e.base + "/" + e.key + "/" + e.bucket, e
  }

  function p(e) {
    this.el = e.querySelector("." + m.cssBase + "__submit")
  }
  var e = "__submit--",
    n = m.cssBase + e + "start-loading",
    r = m.cssBase + e + "loading",
    o = m.cssBase + e + "end-loading";

  function i(e, t, s) {
    var n = getComputedStyle(e, "::after"),
      e = n.animationName;
    e && "none" !== e ? function (e, t) {
      clearTimeout(c);
      e = 1e3 * parseFloat(e), c = setTimeout(t, e - 10)
    }(n.animationDuration, t) : s()
  }
  p.prototype.start = function () {
    var e;
    this.el && (this.el.disabled = !0, (e = this.el.classList).remove(o), e.remove(r), e.add(n), i(this.el, function () {
      e.remove(n), e.add(r)
    }, function () {
      e.add(r), e.remove(n)
    }))
  }, p.prototype.stop = function () {
    function e() {
      t.remove(o)
    }
    var t;
    this.el && (this.el.disabled = !1, (t = this.el.classList).remove(n), t.remove(r), t.add(o), i(this.el, e, e))
  };
  var c = null;
  "undefined" != typeof module && void 0 !== module.exports ? (module.exports = m, module.exports.normalizeAction = f) : (window.Pageclip = m, function () {
    for (var e = document.querySelectorAll("." + m.cssBase), t = 0; t < e.length; t++) m.form(e[t])
  }())
}(this || window || global);