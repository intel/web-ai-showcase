var ortWasmThreaded = (() => {
  var _scriptName = import.meta.url;

  return async function (moduleArg = {}) {
    var moduleRtn;

    function e() {
      m.buffer != q.buffer && u();
      return q;
    }
    function w() {
      m.buffer != q.buffer && u();
      return ba;
    }
    function ca() {
      m.buffer != q.buffer && u();
      return da;
    }
    function ea() {
      m.buffer != q.buffer && u();
      return fa;
    }
    function z() {
      m.buffer != q.buffer && u();
      return ha;
    }
    function A() {
      m.buffer != q.buffer && u();
      return ia;
    }
    function ja() {
      m.buffer != q.buffer && u();
      return ka;
    }
    function la() {
      m.buffer != q.buffer && u();
      return ma;
    }
    var B = Object.assign({}, moduleArg),
      na,
      oa,
      pa = new Promise((a, b) => {
        na = a;
        oa = b;
      }),
      qa = "object" == typeof window,
      C = "function" == typeof importScripts,
      D =
        "object" == typeof process &&
        "object" == typeof process.versions &&
        "string" == typeof process.versions.node,
      E = C && "em-pthread" == self.name;
    if (D) {
      const { createRequire: a } = await import("module");
      var require = a(import.meta.url),
        ra = require("worker_threads");
      global.Worker = ra.Worker;
      E = (C = !ra.dc) && "em-pthread" == ra.workerData;
    }
    ("use strict");
    B.mountExternalData = (a, b) => {
      (B.Ab || (B.Ab = new Map())).set(a, b);
    };
    B.unmountExternalData = () => {
      delete B.Ab;
    };
    var SharedArrayBuffer =
      globalThis.SharedArrayBuffer ??
      new WebAssembly.Memory({ initial: 0, maximum: 0, shared: !0 }).buffer
        .constructor;
    ("use strict");
    let ta = () => {
      const a =
          (c, d, f) =>
          (...g) => {
            const k = F,
              l = d?.();
            g = c(...g);
            const p = d?.();
            l !== p && ((c = p), f(l), (d = f = null));
            return F != k ? sa() : g;
          },
        b =
          (c) =>
          async (...d) => {
            try {
              if (B.zb) throw Error("Session already started");
              const f = (B.zb = { Vb: d[0], errors: [] }),
                g = await c(...d);
              if (B.zb !== f) throw Error("Session mismatch");
              B.Hb?.flush();
              const k = f.errors;
              if (0 < k.length) {
                let l = await Promise.all(k);
                l = l.filter((p) => p);
                if (0 < l.length) throw Error(l.join("\n"));
              }
              return g;
            } finally {
              B.zb = null;
            }
          };
      B._OrtCreateSession = a(
        B._OrtCreateSession,
        () => B._OrtCreateSession,
        (c) => (B._OrtCreateSession = c)
      );
      B._OrtRun = b(
        a(
          B._OrtRun,
          () => B._OrtRun,
          (c) => (B._OrtRun = c)
        )
      );
      B._OrtRunWithBinding = b(
        a(
          B._OrtRunWithBinding,
          () => B._OrtRunWithBinding,
          (c) => (B._OrtRunWithBinding = c)
        )
      );
      B._OrtBindInput = a(
        B._OrtBindInput,
        () => B._OrtBindInput,
        (c) => (B._OrtBindInput = c)
      );
      ta = void 0;
    };
    B.jsepInit = (a, b) => {
      ta?.();
      if ("webgpu" === a) {
        [B.Hb, B.Nb, B.Rb, B.Ib, B.Qb, B.ob, B.Sb, B.Ub, B.Ob, B.Pb, B.Tb] = b;
        const c = B.Hb;
        B.jsepRegisterBuffer = (d, f, g, k) => c.registerBuffer(d, f, g, k);
        B.jsepGetBuffer = (d) => c.getBuffer(d);
        B.jsepCreateDownloader = (d, f, g) => c.createDownloader(d, f, g);
        B.jsepOnReleaseSession = (d) => {
          c.onReleaseSession(d);
        };
        B.jsepOnRunStart = (d) => c.onRunStart(d);
      }
    };
    var ua = Object.assign({}, B),
      va = "./this.program",
      wa = (a, b) => {
        throw b;
      },
      G = "",
      xa,
      ya,
      za;
    if (D) {
      var fs = require("fs"),
        Aa = require("path");
      G = require("url").fileURLToPath(new URL("./", import.meta.url));
      xa = (a, b) => {
        a = Ba(a) ? new URL(a) : Aa.normalize(a);
        return fs.readFileSync(a, b ? void 0 : "utf8");
      };
      za = (a) => {
        a = xa(a, !0);
        a.buffer || (a = new Uint8Array(a));
        return a;
      };
      ya = (a, b, c, d = !0) => {
        a = Ba(a) ? new URL(a) : Aa.normalize(a);
        fs.readFile(a, d ? void 0 : "utf8", (f, g) => {
          f ? c(f) : b(d ? g.buffer : g);
        });
      };
      !B.thisProgram &&
        1 < process.argv.length &&
        (va = process.argv[1].replace(/\\/g, "/"));
      process.argv.slice(2);
      wa = (a, b) => {
        process.exitCode = a;
        throw b;
      };
    } else if (qa || C)
      C
        ? (G = self.location.href)
        : "undefined" != typeof document &&
          document.currentScript &&
          (G = document.currentScript.src),
        _scriptName && (G = _scriptName),
        G.startsWith("blob:")
          ? (G = "")
          : (G = G.substr(0, G.replace(/[?#].*/, "").lastIndexOf("/") + 1)),
        D ||
          ((xa = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, !1);
            b.send(null);
            return b.responseText;
          }),
          C &&
            (za = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, !1);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response);
            }),
          (ya = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, !0);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || (0 == d.status && d.response)
                ? b(d.response)
                : c();
            };
            d.onerror = c;
            d.send(null);
          }));
    D &&
      "undefined" == typeof performance &&
      (global.performance = require("perf_hooks").performance);
    var Ca = console.log.bind(console),
      Da = console.error.bind(console);
    D &&
      ((Ca = (...a) => fs.writeSync(1, a.join(" ") + "\n")),
      (Da = (...a) => fs.writeSync(2, a.join(" ") + "\n")));
    var Ea = Ca,
      H = Da;
    Object.assign(B, ua);
    ua = null;
    if (E) {
      var Fa;
      if (D) {
        var Ga = ra.parentPort;
        Ga.on("message", (b) => onmessage({ data: b }));
        Object.assign(globalThis, {
          self: global,
          importScripts: () => {},
          postMessage: (b) => Ga.postMessage(b),
          performance: global.performance || { now: Date.now },
        });
      }
      var Ha = !1;
      H = function (...b) {
        b = b.join(" ");
        D ? fs.writeSync(2, b + "\n") : console.error(b);
      };
      self.alert = function (...b) {
        postMessage({ Gb: "alert", text: b.join(" "), ec: Ia() });
      };
      B.instantiateWasm = (b, c) =>
        new Promise((d) => {
          Fa = (f) => {
            f = new WebAssembly.Instance(f, Ja());
            c(f);
            d();
          };
        });
      self.onunhandledrejection = (b) => {
        throw b.reason || b;
      };
      function a(b) {
        try {
          var c = b.data,
            d = c.cmd;
          if ("load" === d) {
            let f = [];
            self.onmessage = (g) => f.push(g);
            self.startWorker = () => {
              postMessage({ cmd: "loaded" });
              for (let g of f) a(g);
              self.onmessage = a;
            };
            for (const g of c.handlers)
              if (!B[g] || B[g].proxy)
                (B[g] = (...k) => {
                  postMessage({ Gb: "callHandler", cc: g, args: k });
                }),
                  "print" == g && (Ea = B[g]),
                  "printErr" == g && (H = B[g]);
            m = c.wasmMemory;
            u();
            Fa(c.wasmModule);
          } else if ("run" === d) {
            Ka(c.pthread_ptr, 0, 0, 1, 0, 0);
            La(c.pthread_ptr);
            Ma();
            Na();
            Ha || (Oa(), (Ha = !0));
            try {
              Pa(c.start_routine, c.arg);
            } catch (f) {
              if ("unwind" != f) throw f;
            }
          } else
            "cancel" === d
              ? Ia() && Qa(-1)
              : "setimmediate" !== c.target &&
                ("checkMailbox" === d
                  ? Ha && Ra()
                  : d && (H(`worker: received unknown command ${d}`), H(c)));
        } catch (f) {
          throw (Sa(), f);
        }
      }
      self.onmessage = a;
    }
    var m,
      Ta,
      I = !1,
      Ua,
      q,
      ba,
      da,
      fa,
      ha,
      ia,
      ka,
      J,
      Va,
      ma;
    function u() {
      var a = m.buffer;
      B.HEAP8 = q = new Int8Array(a);
      B.HEAP16 = da = new Int16Array(a);
      B.HEAPU8 = ba = new Uint8Array(a);
      B.HEAPU16 = fa = new Uint16Array(a);
      B.HEAP32 = ha = new Int32Array(a);
      B.HEAPU32 = ia = new Uint32Array(a);
      B.HEAPF32 = ka = new Float32Array(a);
      B.HEAPF64 = ma = new Float64Array(a);
      B.HEAP64 = J = new BigInt64Array(a);
      B.HEAPU64 = Va = new BigUint64Array(a);
    }
    if (!E) {
      if (B.wasmMemory) m = B.wasmMemory;
      else if (
        ((m = new WebAssembly.Memory({
          initial: 256,
          maximum: 65536,
          shared: !0,
        })),
        !(m.buffer instanceof SharedArrayBuffer))
      )
        throw (
          (H(
            "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"
          ),
          D &&
            H(
              "(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"
            ),
          Error("bad memory"))
        );
      u();
    }
    var Wa = [],
      Xa = [],
      Ya = [],
      Za = 0,
      $a = null,
      ab = null;
    function bb() {
      Za--;
      if (0 == Za && (null !== $a && (clearInterval($a), ($a = null)), ab)) {
        var a = ab;
        ab = null;
        a();
      }
    }
    function cb(a) {
      a = "Aborted(" + a + ")";
      H(a);
      I = !0;
      Ua = 1;
      a = new WebAssembly.RuntimeError(
        a + ". Build with -sASSERTIONS for more info."
      );
      oa(a);
      throw a;
    }
    var db = (a) => a.startsWith("data:application/octet-stream;base64,"),
      Ba = (a) => a.startsWith("file://"),
      eb;
    function fb(a) {
      if (za) return za(a);
      throw "both async and sync fetching of the wasm failed";
    }
    function gb(a) {
      if (qa || C) {
        if ("function" == typeof fetch && !Ba(a))
          return fetch(a, { credentials: "same-origin" })
            .then((b) => {
              if (!b.ok) throw `failed to load wasm binary file at '${a}'`;
              return b.arrayBuffer();
            })
            .catch(() => fb(a));
        if (ya)
          return new Promise((b, c) => {
            ya(a, (d) => b(new Uint8Array(d)), c);
          });
      }
      return Promise.resolve().then(() => fb(a));
    }
    function hb(a, b, c) {
      return gb(a)
        .then((d) => WebAssembly.instantiate(d, b))
        .then(c, (d) => {
          H(`failed to asynchronously prepare wasm: ${d}`);
          cb(d);
        });
    }
    function ib(a, b) {
      var c = eb;
      return "function" != typeof WebAssembly.instantiateStreaming ||
        db(c) ||
        Ba(c) ||
        D ||
        "function" != typeof fetch
        ? hb(c, a, b)
        : fetch(c, { credentials: "same-origin" }).then((d) =>
            WebAssembly.instantiateStreaming(d, a).then(b, function (f) {
              H(`wasm streaming compile failed: ${f}`);
              H("falling back to ArrayBuffer instantiation");
              return hb(c, a, b);
            })
          );
    }
    function Ja() {
      jb = {
        ta: kb,
        b: lb,
        Y: mb,
        z: nb,
        ma: ob,
        U: pb,
        W: qb,
        na: rb,
        ka: sb,
        da: tb,
        ja: ub,
        I: vb,
        V: wb,
        S: xb,
        la: yb,
        T: zb,
        sa: Ab,
        C: Bb,
        M: Cb,
        L: Db,
        B: Eb,
        s: Fb,
        p: Gb,
        D: Hb,
        y: Ib,
        N: Jb,
        ra: Kb,
        ga: Lb,
        Q: Mb,
        Z: Nb,
        E: Ob,
        fa: La,
        qa: Pb,
        v: Qb,
        x: Rb,
        o: Sb,
        k: Tb,
        c: Ub,
        ua: Vb,
        n: Wb,
        j: Xb,
        r: Yb,
        d: Zb,
        u: $b,
        m: ac,
        g: bc,
        l: cc,
        i: dc,
        h: ec,
        f: fc,
        aa: gc,
        ba: hc,
        ca: ic,
        _: jc,
        $: kc,
        P: lc,
        e: mc,
        K: nc,
        F: oc,
        J: pc,
        pa: qc,
        R: rc,
        t: sc,
        w: tc,
        O: uc,
        ha: vc,
        ia: wc,
        X: xc,
        A: yc,
        H: zc,
        ea: Ac,
        G: Bc,
        a: m,
        oa: Cc,
        q: Dc,
      };
      return { a: jb };
    }
    var Ec = {
      827124: (a, b, c, d) => {
        if ("undefined" == typeof B || !B.Ab) return 1;
        a = K(a >>> 0);
        a.startsWith("./") && (a = a.substring(2));
        a = B.Ab.get(a);
        if (!a) return 2;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        if (b + c > a.byteLength) return 3;
        try {
          return w().set(a.subarray(b, b + c), d >>> 0), 0;
        } catch {
          return 4;
        }
      },
      827625: () => {
        B.Ob();
      },
      827656: () => {
        B.Pb();
      },
      827685: () => {
        B.Tb();
      },
      827710: (a) => B.Nb(a),
      827743: (a) => B.Rb(a),
      827775: (a, b, c) => {
        B.Ib(a, b, c, !0);
      },
      827814: (a, b, c) => {
        B.Ib(a, b, c);
      },
      827847: (a) => {
        B.ob("Abs", a, void 0);
      },
      827898: (a) => {
        B.ob("Neg", a, void 0);
      },
      827949: (a) => {
        B.ob("Floor", a, void 0);
      },
      828002: (a) => {
        B.ob("Ceil", a, void 0);
      },
      828054: (a) => {
        B.ob("Reciprocal", a, void 0);
      },
      828112: (a) => {
        B.ob("Sqrt", a, void 0);
      },
      828164: (a) => {
        B.ob("Exp", a, void 0);
      },
      828215: (a) => {
        B.ob("Erf", a, void 0);
      },
      828266: (a) => {
        B.ob("Sigmoid", a, void 0);
      },
      828321: (a, b, c) => {
        B.ob("HardSigmoid", a, { alpha: b, beta: c });
      },
      828400: (a) => {
        B.ob("Log", a, void 0);
      },
      828451: (a) => {
        B.ob("Sin", a, void 0);
      },
      828502: (a) => {
        B.ob("Cos", a, void 0);
      },
      828553: (a) => {
        B.ob("Tan", a, void 0);
      },
      828604: (a) => {
        B.ob("Asin", a, void 0);
      },
      828656: (a) => {
        B.ob("Acos", a, void 0);
      },
      828708: (a) => {
        B.ob("Atan", a, void 0);
      },
      828760: (a) => {
        B.ob("Sinh", a, void 0);
      },
      828812: (a) => {
        B.ob("Cosh", a, void 0);
      },
      828864: (a) => {
        B.ob("Asinh", a, void 0);
      },
      828917: (a) => {
        B.ob("Acosh", a, void 0);
      },
      828970: (a) => {
        B.ob("Atanh", a, void 0);
      },
      829023: (a) => {
        B.ob("Tanh", a, void 0);
      },
      829075: (a) => {
        B.ob("Not", a, void 0);
      },
      829126: (a, b, c) => {
        B.ob("Clip", a, { min: b, max: c });
      },
      829195: (a) => {
        B.ob("Clip", a, void 0);
      },
      829247: (a, b) => {
        B.ob("Elu", a, { alpha: b });
      },
      829305: (a) => {
        B.ob("Relu", a, void 0);
      },
      829357: (a, b) => {
        B.ob("LeakyRelu", a, { alpha: b });
      },
      829421: (a, b) => {
        B.ob("ThresholdedRelu", a, { alpha: b });
      },
      829491: (a, b) => {
        B.ob("Cast", a, { to: b });
      },
      829549: (a) => {
        B.ob("Add", a, void 0);
      },
      829600: (a) => {
        B.ob("Sub", a, void 0);
      },
      829651: (a) => {
        B.ob("Mul", a, void 0);
      },
      829702: (a) => {
        B.ob("Div", a, void 0);
      },
      829753: (a) => {
        B.ob("Pow", a, void 0);
      },
      829804: (a) => {
        B.ob("Equal", a, void 0);
      },
      829857: (a) => {
        B.ob("Greater", a, void 0);
      },
      829912: (a) => {
        B.ob("GreaterOrEqual", a, void 0);
      },
      829974: (a) => {
        B.ob("Less", a, void 0);
      },
      830026: (a) => {
        B.ob("LessOrEqual", a, void 0);
      },
      830085: (a, b, c, d, f) => {
        B.ob("ReduceMean", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      830244: (a, b, c, d, f) => {
        B.ob("ReduceMax", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      830402: (a, b, c, d, f) => {
        B.ob("ReduceMin", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      830560: (a, b, c, d, f) => {
        B.ob("ReduceProd", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      830719: (a, b, c, d, f) => {
        B.ob("ReduceSum", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      830877: (a, b, c, d, f) => {
        B.ob("ReduceL1", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      831034: (a, b, c, d, f) => {
        B.ob("ReduceL2", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      831191: (a, b, c, d, f) => {
        B.ob("ReduceLogSum", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      831352: (a, b, c, d, f) => {
        B.ob("ReduceSumSquare", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      831516: (a, b, c, d, f) => {
        B.ob("ReduceLogSumExp", a, {
          keepDims: !!b,
          noopWithEmptyAxes: !!c,
          axes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      831680: (a) => {
        B.ob("Where", a, void 0);
      },
      831733: (a, b, c) => {
        B.ob("Transpose", a, {
          perm: b ? Array.from(z().subarray(b >>> 0, c >>> 0)) : [],
        });
      },
      831841: (a, b, c, d) => {
        B.ob("DepthToSpace", a, {
          blocksize: b,
          mode: K(c),
          format: d ? "NHWC" : "NCHW",
        });
      },
      831974: (a, b, c, d) => {
        B.ob("DepthToSpace", a, {
          blocksize: b,
          mode: K(c),
          format: d ? "NHWC" : "NCHW",
        });
      },
      832107: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t) => {
        B.ob("ConvTranspose", a, {
          format: p ? "NHWC" : "NCHW",
          autoPad: b,
          dilations: [c],
          group: d,
          kernelShape: [f],
          pads: [g, k],
          strides: [l],
          wIsConst: () => !!e()[n >>> 0],
          outputPadding: r ? Array.from(z().subarray(r >>> 0, x >>> 0)) : [],
          outputShape: y ? Array.from(z().subarray(y >>> 0, h >>> 0)) : [],
          activation: K(t),
        });
      },
      832508: (a, b, c, d, f, g, k, l, p, n, r, x, y, h) => {
        B.ob("ConvTranspose", a, {
          format: l ? "NHWC" : "NCHW",
          autoPad: b,
          dilations: Array.from(z().subarray(c >>> 0, ((c >>> 0) + 2) >>> 0)),
          group: d,
          kernelShape: Array.from(z().subarray(f >>> 0, ((f >>> 0) + 2) >>> 0)),
          pads: Array.from(z().subarray(g >>> 0, ((g >>> 0) + 4) >>> 0)),
          strides: Array.from(z().subarray(k >>> 0, ((k >>> 0) + 2) >>> 0)),
          wIsConst: () => !!e()[p >>> 0],
          outputPadding: n ? Array.from(z().subarray(n >>> 0, r >>> 0)) : [],
          outputShape: x ? Array.from(z().subarray(x >>> 0, y >>> 0)) : [],
          activation: K(h),
        });
      },
      833073: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t) => {
        B.ob("ConvTranspose", a, {
          format: p ? "NHWC" : "NCHW",
          autoPad: b,
          dilations: [c],
          group: d,
          kernelShape: [f],
          pads: [g, k],
          strides: [l],
          wIsConst: () => !!e()[n >>> 0],
          outputPadding: r ? Array.from(z().subarray(r >>> 0, x >>> 0)) : [],
          outputShape: y ? Array.from(z().subarray(y >>> 0, h >>> 0)) : [],
          activation: K(t),
        });
      },
      833474: (a, b, c, d, f, g, k, l, p, n, r, x, y, h) => {
        B.ob("ConvTranspose", a, {
          format: l ? "NHWC" : "NCHW",
          autoPad: b,
          dilations: Array.from(z().subarray(c >>> 0, ((c >>> 0) + 2) >>> 0)),
          group: d,
          kernelShape: Array.from(z().subarray(f >>> 0, ((f >>> 0) + 2) >>> 0)),
          pads: Array.from(z().subarray(g >>> 0, ((g >>> 0) + 4) >>> 0)),
          strides: Array.from(z().subarray(k >>> 0, ((k >>> 0) + 2) >>> 0)),
          wIsConst: () => !!e()[p >>> 0],
          outputPadding: n ? Array.from(z().subarray(n >>> 0, r >>> 0)) : [],
          outputShape: x ? Array.from(z().subarray(x >>> 0, y >>> 0)) : [],
          activation: K(h),
        });
      },
      834039: (a, b) => {
        B.ob("GlobalAveragePool", a, { format: b ? "NHWC" : "NCHW" });
      },
      834130: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t, v) => {
        B.ob("AveragePool", a, {
          format: v ? "NHWC" : "NCHW",
          auto_pad: b,
          ceil_mode: c,
          count_include_pad: d,
          storage_order: f,
          dilations: [g, k],
          kernel_shape: [l, p],
          pads: [n, r, x, y],
          strides: [h, t],
        });
      },
      834414: (a, b) => {
        B.ob("GlobalAveragePool", a, { format: b ? "NHWC" : "NCHW" });
      },
      834505: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t, v) => {
        B.ob("AveragePool", a, {
          format: v ? "NHWC" : "NCHW",
          auto_pad: b,
          ceil_mode: c,
          count_include_pad: d,
          storage_order: f,
          dilations: [g, k],
          kernel_shape: [l, p],
          pads: [n, r, x, y],
          strides: [h, t],
        });
      },
      834789: (a, b) => {
        B.ob("GlobalMaxPool", a, { format: b ? "NHWC" : "NCHW" });
      },
      834876: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t, v) => {
        B.ob("MaxPool", a, {
          format: v ? "NHWC" : "NCHW",
          auto_pad: b,
          ceil_mode: c,
          count_include_pad: d,
          storage_order: f,
          dilations: [g, k],
          kernel_shape: [l, p],
          pads: [n, r, x, y],
          strides: [h, t],
        });
      },
      835156: (a, b) => {
        B.ob("GlobalMaxPool", a, { format: b ? "NHWC" : "NCHW" });
      },
      835243: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t, v) => {
        B.ob("MaxPool", a, {
          format: v ? "NHWC" : "NCHW",
          auto_pad: b,
          ceil_mode: c,
          count_include_pad: d,
          storage_order: f,
          dilations: [g, k],
          kernel_shape: [l, p],
          pads: [n, r, x, y],
          strides: [h, t],
        });
      },
      835523: (a, b, c, d, f) => {
        B.ob("Gemm", a, { alpha: b, beta: c, transA: d, transB: f });
      },
      835627: (a) => {
        B.ob("MatMul", a, void 0);
      },
      835681: (a, b, c, d) => {
        B.ob("ArgMax", a, { keepDims: !!b, selectLastIndex: !!c, axis: d });
      },
      835789: (a, b, c, d) => {
        B.ob("ArgMin", a, { keepDims: !!b, selectLastIndex: !!c, axis: d });
      },
      835897: (a, b) => {
        B.ob("Softmax", a, { axis: b });
      },
      835960: (a, b) => {
        B.ob("Concat", a, { axis: b });
      },
      836020: (a, b, c, d, f) => {
        B.ob("Split", a, {
          axis: b,
          numOutputs: c,
          splitSizes: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      836160: (a) => {
        B.ob("Expand", a, void 0);
      },
      836214: (a, b) => {
        B.ob("Gather", a, { axis: Number(b) });
      },
      836285: (a, b) => {
        B.ob("GatherElements", a, { axis: Number(b) });
      },
      836364: (a, b, c, d, f, g, k, l, p, n, r) => {
        B.ob("Resize", a, {
          antialias: b,
          axes: c ? Array.from(z().subarray(c >>> 0, d >>> 0)) : [],
          coordinateTransformMode: K(f),
          cubicCoeffA: g,
          excludeOutside: k,
          extrapolationValue: l,
          keepAspectRatioPolicy: K(p),
          mode: K(n),
          nearestMode: K(r),
        });
      },
      836710: (a, b, c, d, f, g, k) => {
        B.ob("Slice", a, {
          starts: b ? Array.from(z().subarray(b >>> 0, c >>> 0)) : [],
          ends: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
          axes: g ? Array.from(z().subarray(g >>> 0, k >>> 0)) : [],
        });
      },
      836926: (a) => {
        B.ob("Tile", a, void 0);
      },
      836978: (a, b, c, d) => {
        B.ob("LayerNormalization", a, { axis: b, epsilon: c, simplified: !!d });
      },
      837089: (a, b, c) => {
        B.ob("InstanceNormalization", a, {
          epsilon: b,
          format: c ? "NHWC" : "NCHW",
        });
      },
      837203: (a, b, c) => {
        B.ob("InstanceNormalization", a, {
          epsilon: b,
          format: c ? "NHWC" : "NCHW",
        });
      },
      837317: (a) => {
        B.ob("Range", a, void 0);
      },
      837370: (a, b) => {
        B.ob("Einsum", a, { equation: K(b) });
      },
      837451: (a, b, c, d, f) => {
        B.ob("Pad", a, {
          mode: b,
          value: c,
          pads: d ? Array.from(z().subarray(d >>> 0, f >>> 0)) : [],
        });
      },
      837578: (a, b, c, d, f, g) => {
        B.ob("BatchNormalization", a, {
          epsilon: b,
          momentum: c,
          spatial: !!f,
          trainingMode: !!d,
          format: g ? "NHWC" : "NCHW",
        });
      },
      837747: (a, b, c, d, f, g) => {
        B.ob("BatchNormalization", a, {
          epsilon: b,
          momentum: c,
          spatial: !!f,
          trainingMode: !!d,
          format: g ? "NHWC" : "NCHW",
        });
      },
      837916: (a, b, c) => {
        B.ob("CumSum", a, { exclusive: Number(b), reverse: Number(c) });
      },
      838013: (a, b, c, d, f, g, k, l, p) => {
        B.ob("Attention", a, {
          numHeads: b,
          isUnidirectional: c,
          maskFilterValue: d,
          scale: f,
          doRotary: g,
          qkvHiddenSizes: k
            ? Array.from(z().subarray(Number(l) >>> 0, (Number(l) + k) >>> 0))
            : [],
          pastPresentShareBuffer: !!p,
        });
      },
      838285: (a) => {
        B.ob("BiasAdd", a, void 0);
      },
      838340: (a) => {
        B.ob("BiasSplitGelu", a, void 0);
      },
      838401: (a) => {
        B.ob("FastGelu", a, void 0);
      },
      838457: (a, b, c, d, f, g, k, l, p, n, r, x, y, h, t, v) => {
        B.ob("Conv", a, {
          format: x ? "NHWC" : "NCHW",
          auto_pad: b,
          dilations: c ? Array.from(z().subarray(c >>> 0, d >>> 0)) : [],
          group: f,
          kernel_shape: g ? Array.from(z().subarray(g >>> 0, k >>> 0)) : [],
          pads: l ? Array.from(z().subarray(l >>> 0, p >>> 0)) : [],
          strides: n ? Array.from(z().subarray(n >>> 0, r >>> 0)) : [],
          w_is_const: () => !!e()[y >>> 0],
          activation: K(h),
          activation_params: t
            ? Array.from(ja().subarray(t >>> 0, v >>> 0))
            : [],
        });
      },
      838953: (a) => {
        B.ob("Gelu", a, void 0);
      },
      839005: (a, b, c, d) => {
        B.ob("GroupQueryAttention", a, {
          numHeads: b,
          kvNumHeads: c,
          scale: d,
        });
      },
      839118: (a, b, c, d, f, g) => {
        B.ob("MatMulNBits", a, {
          k: b,
          n: c,
          accuracyLevel: d,
          bits: f,
          blockSize: g,
        });
      },
      839245: (a, b, c, d, f, g) => {
        B.ob("MultiHeadAttention", a, {
          numHeads: b,
          isUnidirectional: c,
          maskFilterValue: d,
          scale: f,
          doRotary: g,
        });
      },
      839404: (a, b, c, d, f) => {
        B.ob("RotaryEmbedding", a, {
          interleaved: !!b,
          numHeads: c,
          rotaryEmbeddingDim: d,
          scale: f,
        });
      },
      839543: (a, b, c) => {
        B.ob("SkipLayerNormalization", a, { epsilon: b, simplified: !!c });
      },
      839645: (a, b, c) => {
        B.ob("SkipLayerNormalization", a, { epsilon: b, simplified: !!c });
      },
      839747: (a, b, c, d) => {
        B.ob("LayerNormalization", a, { axis: b, epsilon: c, simplified: !!d });
      },
      839858: (a) => {
        B.Sb(a);
      },
      839892: (a, b) => B.Ub(a, b, B.zb.Vb, B.zb.errors),
    };
    function kb(a, b, c) {
      return Fc(async () => {
        await B.Qb(a, b, c);
      });
    }
    function Gc(a) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
    var Hc = (a) => {
        a.terminate();
        a.onmessage = () => {};
      },
      Kc = (a) => {
        0 == L.length && (Ic(), Jc(L[0]));
        var b = L.pop();
        if (!b) return 6;
        M.push(b);
        N[a.vb] = b;
        b.vb = a.vb;
        var c = {
          cmd: "run",
          start_routine: a.Wb,
          arg: a.Jb,
          pthread_ptr: a.vb,
        };
        D && b.unref();
        b.postMessage(c, a.ac);
        return 0;
      },
      O = 0,
      P = (a, b, ...c) => {
        for (
          var d = 2 * c.length, f = Lc(), g = Mc(8 * d), k = g >>> 3, l = 0;
          l < c.length;
          l++
        ) {
          var p = c[l];
          "bigint" == typeof p
            ? ((J[k + 2 * l] = 1n), (J[k + 2 * l + 1] = p))
            : ((J[k + 2 * l] = 0n), (la()[(k + 2 * l + 1) >>> 0] = p));
        }
        a = Nc(a, 0, d, g, b);
        Oc(f);
        return a;
      };
    function Pc(a) {
      if (E) return P(0, 1, a);
      Ua = a;
      if (!(0 < O)) {
        for (var b of M) Hc(b);
        for (b of L) Hc(b);
        L = [];
        M = [];
        N = [];
        B.onExit?.(a);
        I = !0;
      }
      wa(a, new Gc(a));
    }
    function Rc(a) {
      if (E) return P(1, 0, a);
      xc(a);
    }
    var xc = (a) => {
        Ua = a;
        if (E) throw (Rc(a), "unwind");
        Pc(a);
      },
      L = [],
      M = [],
      Sc = [],
      N = {};
    function Tc() {
      for (var a = B.numThreads - 1; a--; ) Ic();
      Wa.unshift(() => {
        Za++;
        Uc(() => bb());
      });
    }
    var Wc = (a) => {
      var b = a.vb;
      delete N[b];
      L.push(a);
      M.splice(M.indexOf(a), 1);
      a.vb = 0;
      Vc(b);
    };
    function Na() {
      Sc.forEach((a) => a());
    }
    var Jc = (a) =>
      new Promise((b) => {
        a.onmessage = (g) => {
          g = g.data;
          var k = g.cmd;
          if (g.targetThread && g.targetThread != Ia()) {
            var l = N[g.targetThread];
            l
              ? l.postMessage(g, g.transferList)
              : H(
                  `Internal error! Worker sent a message "${k}" to target pthread ${g.targetThread}, but that thread no longer exists!`
                );
          } else if ("checkMailbox" === k) Ra();
          else if ("spawnThread" === k) Kc(g);
          else if ("cleanupThread" === k) Wc(N[g.thread]);
          else if ("killThread" === k)
            (g = g.thread),
              (k = N[g]),
              delete N[g],
              Hc(k),
              Vc(g),
              M.splice(M.indexOf(k), 1),
              (k.vb = 0);
          else if ("cancelThread" === k)
            N[g.thread].postMessage({ cmd: "cancel" });
          else if ("loaded" === k)
            (a.loaded = !0), D && !a.vb && a.unref(), b(a);
          else if ("alert" === k) alert(`Thread ${g.threadId}: ${g.text}`);
          else if ("setimmediate" === g.target) a.postMessage(g);
          else if ("callHandler" === k) B[g.handler](...g.args);
          else k && H(`worker sent an unknown command ${k}`);
        };
        a.onerror = (g) => {
          H(
            `${"worker sent an error!"} ${g.filename}:${g.lineno}: ${g.message}`
          );
          throw g;
        };
        D &&
          (a.on("message", (g) => a.onmessage({ data: g })),
          a.on("error", (g) => a.onerror(g)));
        var c = [],
          d = ["onExit"],
          f;
        for (f of d) B.hasOwnProperty(f) && c.push(f);
        a.postMessage({
          cmd: "load",
          handlers: c,
          wasmMemory: m,
          wasmModule: Ta,
        });
      });
    function Uc(a) {
      E ? a() : Promise.all(L.map(Jc)).then(a);
    }
    function Ic() {
      var a = new Worker(new URL(import.meta.url), {
        type: "module",
        workerData: "em-pthread",
        name: "em-pthread",
      });
      L.push(a);
    }
    var Xc = (a) => {
        for (; 0 < a.length; ) a.shift()(B);
      },
      Ma = () => {
        var a = Ia(),
          b = A()[((a + 52) >>> 2) >>> 0];
        a = A()[((a + 56) >>> 2) >>> 0];
        Yc(b, b - a);
        Oc(b);
      },
      Pa = (a, b) => {
        O = 0;
        a = Zc(a, b);
        0 < O ? (Ua = a) : Qa(a);
      };
    class $c {
      constructor(a) {
        this.Eb = a - 24;
      }
    }
    var ad = 0,
      bd = 0;
    function lb(a, b, c) {
      a >>>= 0;
      var d = new $c(a);
      b >>>= 0;
      c >>>= 0;
      A()[((d.Eb + 16) >>> 2) >>> 0] = 0;
      A()[((d.Eb + 4) >>> 2) >>> 0] = b;
      A()[((d.Eb + 8) >>> 2) >>> 0] = c;
      ad = a;
      bd++;
      throw ad;
    }
    function cd(a, b, c, d) {
      return E ? P(2, 1, a, b, c, d) : mb(a, b, c, d);
    }
    function mb(a, b, c, d) {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      if ("undefined" == typeof SharedArrayBuffer)
        return (
          H(
            "Current environment does not support SharedArrayBuffer, pthreads are not available!"
          ),
          6
        );
      var f = [];
      if (E && 0 === f.length) return cd(a, b, c, d);
      a = { Wb: c, vb: a, Jb: d, ac: f };
      return E ? ((a.Gb = "spawnThread"), postMessage(a, f), 0) : Kc(a);
    }
    var dd =
        "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      ed = (a, b, c) => {
        b >>>= 0;
        var d = b + c;
        for (c = b; a[c] && !(c >= d); ) ++c;
        if (16 < c - b && a.buffer && dd)
          return dd.decode(
            a.buffer instanceof SharedArrayBuffer
              ? a.slice(b, c)
              : a.subarray(b, c)
          );
        for (d = ""; b < c; ) {
          var f = a[b++];
          if (f & 128) {
            var g = a[b++] & 63;
            if (192 == (f & 224)) d += String.fromCharCode(((f & 31) << 6) | g);
            else {
              var k = a[b++] & 63;
              f =
                224 == (f & 240)
                  ? ((f & 15) << 12) | (g << 6) | k
                  : ((f & 7) << 18) | (g << 12) | (k << 6) | (a[b++] & 63);
              65536 > f
                ? (d += String.fromCharCode(f))
                : ((f -= 65536),
                  (d += String.fromCharCode(
                    55296 | (f >> 10),
                    56320 | (f & 1023)
                  )));
            }
          } else d += String.fromCharCode(f);
        }
        return d;
      },
      K = (a, b) => ((a >>>= 0) ? ed(w(), a, b) : "");
    function nb(a, b, c) {
      return E ? P(3, 1, a, b, c) : 0;
    }
    function ob(a, b) {
      if (E) return P(4, 1, a, b);
    }
    var fd = (a) => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          127 >= d
            ? b++
            : 2047 >= d
            ? (b += 2)
            : 55296 <= d && 57343 >= d
            ? ((b += 4), ++c)
            : (b += 3);
        }
        return b;
      },
      gd = (a, b, c, d) => {
        c >>>= 0;
        if (!(0 < d)) return 0;
        var f = c;
        d = c + d - 1;
        for (var g = 0; g < a.length; ++g) {
          var k = a.charCodeAt(g);
          if (55296 <= k && 57343 >= k) {
            var l = a.charCodeAt(++g);
            k = (65536 + ((k & 1023) << 10)) | (l & 1023);
          }
          if (127 >= k) {
            if (c >= d) break;
            b[c++ >>> 0] = k;
          } else {
            if (2047 >= k) {
              if (c + 1 >= d) break;
              b[c++ >>> 0] = 192 | (k >> 6);
            } else {
              if (65535 >= k) {
                if (c + 2 >= d) break;
                b[c++ >>> 0] = 224 | (k >> 12);
              } else {
                if (c + 3 >= d) break;
                b[c++ >>> 0] = 240 | (k >> 18);
                b[c++ >>> 0] = 128 | ((k >> 12) & 63);
              }
              b[c++ >>> 0] = 128 | ((k >> 6) & 63);
            }
            b[c++ >>> 0] = 128 | (k & 63);
          }
        }
        b[c >>> 0] = 0;
        return c - f;
      },
      hd = (a, b, c) => gd(a, w(), b, c);
    function pb(a, b) {
      if (E) return P(5, 1, a, b);
    }
    function qb(a, b, c) {
      if (E) return P(6, 1, a, b, c);
    }
    function rb(a, b, c) {
      return E ? P(7, 1, a, b, c) : 0;
    }
    function sb(a, b) {
      if (E) return P(8, 1, a, b);
    }
    function tb(a, b, c) {
      if (E) return P(9, 1, a, b, c);
    }
    function ub(a, b, c, d) {
      if (E) return P(10, 1, a, b, c, d);
    }
    function vb(a, b, c, d) {
      if (E) return P(11, 1, a, b, c, d);
    }
    function wb(a, b, c, d) {
      if (E) return P(12, 1, a, b, c, d);
    }
    function xb(a) {
      if (E) return P(13, 1, a);
    }
    function yb(a, b) {
      if (E) return P(14, 1, a, b);
    }
    function zb(a, b, c) {
      if (E) return P(15, 1, a, b, c);
    }
    var Ab = () => {
        cb("");
      },
      jd,
      Q = (a) => {
        for (var b = ""; w()[a >>> 0]; ) b += jd[w()[a++ >>> 0]];
        return b;
      },
      kd = {},
      ld = {},
      md = {},
      R;
    function nd(a, b, c = {}) {
      var d = b.name;
      if (!a)
        throw new R(`type "${d}" must have a positive integer typeid pointer`);
      if (ld.hasOwnProperty(a)) {
        if (c.Lb) return;
        throw new R(`Cannot register type '${d}' twice`);
      }
      ld[a] = b;
      delete md[a];
      kd.hasOwnProperty(a) &&
        ((b = kd[a]), delete kd[a], b.forEach((f) => f()));
    }
    function S(a, b, c = {}) {
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      return nd(a, b, c);
    }
    var od = (a, b, c) => {
      switch (b) {
        case 1:
          return c ? (d) => e()[d >>> 0] : (d) => w()[d >>> 0];
        case 2:
          return c
            ? (d) => ca()[(d >>> 1) >>> 0]
            : (d) => ea()[(d >>> 1) >>> 0];
        case 4:
          return c ? (d) => z()[(d >>> 2) >>> 0] : (d) => A()[(d >>> 2) >>> 0];
        case 8:
          return c ? (d) => J[d >>> 3] : (d) => Va[d >>> 3];
        default:
          throw new TypeError(`invalid integer width (${b}): ${a}`);
      }
    };
    function Bb(a, b, c) {
      a >>>= 0;
      c >>>= 0;
      b = Q(b >>> 0);
      S(a, {
        name: b,
        fromWireType: (d) => d,
        toWireType: function (d, f) {
          if ("bigint" != typeof f && "number" != typeof f)
            throw (
              (null === f
                ? (f = "null")
                : ((d = typeof f),
                  (f =
                    "object" === d || "array" === d || "function" === d
                      ? f.toString()
                      : "" + f)),
              new TypeError(`Cannot convert "${f}" to ${this.name}`))
            );
          "number" == typeof f && (f = BigInt(f));
          return f;
        },
        argPackAdvance: T,
        readValueFromPointer: od(b, c, -1 == b.indexOf("u")),
        yb: null,
      });
    }
    var T = 8;
    function Cb(a, b, c, d) {
      a >>>= 0;
      b = Q(b >>> 0);
      S(a, {
        name: b,
        fromWireType: function (f) {
          return !!f;
        },
        toWireType: function (f, g) {
          return g ? c : d;
        },
        argPackAdvance: T,
        readValueFromPointer: function (f) {
          return this.fromWireType(w()[f >>> 0]);
        },
        yb: null,
      });
    }
    var pd = [],
      U = [];
    function Ub(a) {
      a >>>= 0;
      9 < a && 0 === --U[a + 1] && ((U[a] = void 0), pd.push(a));
    }
    var V = (a) => {
        if (!a) throw new R("Cannot use deleted val. handle = " + a);
        return U[a];
      },
      W = (a) => {
        switch (a) {
          case void 0:
            return 2;
          case null:
            return 4;
          case !0:
            return 6;
          case !1:
            return 8;
          default:
            const b = pd.pop() || U.length;
            U[b] = a;
            U[b + 1] = 1;
            return b;
        }
      };
    function qd(a) {
      return this.fromWireType(A()[(a >>> 2) >>> 0]);
    }
    var rd = {
      name: "emscripten::val",
      fromWireType: (a) => {
        var b = V(a);
        Ub(a);
        return b;
      },
      toWireType: (a, b) => W(b),
      argPackAdvance: T,
      readValueFromPointer: qd,
      yb: null,
    };
    function Db(a) {
      return S(a >>> 0, rd);
    }
    var sd = (a, b) => {
      switch (b) {
        case 4:
          return function (c) {
            return this.fromWireType(ja()[(c >>> 2) >>> 0]);
          };
        case 8:
          return function (c) {
            return this.fromWireType(la()[(c >>> 3) >>> 0]);
          };
        default:
          throw new TypeError(`invalid float width (${b}): ${a}`);
      }
    };
    function Eb(a, b, c) {
      a >>>= 0;
      c >>>= 0;
      b = Q(b >>> 0);
      S(a, {
        name: b,
        fromWireType: (d) => d,
        toWireType: (d, f) => f,
        argPackAdvance: T,
        readValueFromPointer: sd(b, c),
        yb: null,
      });
    }
    function Fb(a, b, c, d, f) {
      a >>>= 0;
      c >>>= 0;
      b = Q(b >>> 0);
      -1 === f && (f = 4294967295);
      f = (l) => l;
      if (0 === d) {
        var g = 32 - 8 * c;
        f = (l) => (l << g) >>> g;
      }
      var k = b.includes("unsigned")
        ? function (l, p) {
            return p >>> 0;
          }
        : function (l, p) {
            return p;
          };
      S(a, {
        name: b,
        fromWireType: f,
        toWireType: k,
        argPackAdvance: T,
        readValueFromPointer: od(b, c, 0 !== d),
        yb: null,
      });
    }
    function Gb(a, b, c) {
      function d(g) {
        var k = A()[(g >>> 2) >>> 0];
        g = A()[((g + 4) >>> 2) >>> 0];
        return new f(e().buffer, g, k);
      }
      a >>>= 0;
      var f = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        BigInt64Array,
        BigUint64Array,
      ][b];
      c = Q(c >>> 0);
      S(
        a,
        {
          name: c,
          fromWireType: d,
          argPackAdvance: T,
          readValueFromPointer: d,
        },
        { Lb: !0 }
      );
    }
    function Hb(a, b) {
      a >>>= 0;
      b = Q(b >>> 0);
      var c = "std::string" === b;
      S(a, {
        name: b,
        fromWireType: function (d) {
          var f = A()[(d >>> 2) >>> 0],
            g = d + 4;
          if (c)
            for (var k = g, l = 0; l <= f; ++l) {
              var p = g + l;
              if (l == f || 0 == w()[p >>> 0]) {
                k = K(k, p - k);
                if (void 0 === n) var n = k;
                else (n += String.fromCharCode(0)), (n += k);
                k = p + 1;
              }
            }
          else {
            n = Array(f);
            for (l = 0; l < f; ++l)
              n[l] = String.fromCharCode(w()[(g + l) >>> 0]);
            n = n.join("");
          }
          X(d);
          return n;
        },
        toWireType: function (d, f) {
          f instanceof ArrayBuffer && (f = new Uint8Array(f));
          var g = "string" == typeof f;
          if (
            !(
              g ||
              f instanceof Uint8Array ||
              f instanceof Uint8ClampedArray ||
              f instanceof Int8Array
            )
          )
            throw new R("Cannot pass non-string to std::string");
          var k = c && g ? fd(f) : f.length;
          var l = td(4 + k + 1),
            p = l + 4;
          A()[(l >>> 2) >>> 0] = k;
          if (c && g) hd(f, p, k + 1);
          else if (g)
            for (g = 0; g < k; ++g) {
              var n = f.charCodeAt(g);
              if (255 < n)
                throw (
                  (X(p),
                  new R(
                    "String has UTF-16 code units that do not fit in 8 bits"
                  ))
                );
              w()[(p + g) >>> 0] = n;
            }
          else for (g = 0; g < k; ++g) w()[(p + g) >>> 0] = f[g];
          null !== d && d.push(X, l);
          return l;
        },
        argPackAdvance: T,
        readValueFromPointer: qd,
        yb(d) {
          X(d);
        },
      });
    }
    var ud =
        "undefined" != typeof TextDecoder
          ? new TextDecoder("utf-16le")
          : void 0,
      vd = (a, b) => {
        var c = a >> 1;
        for (var d = c + b / 2; !(c >= d) && ea()[c >>> 0]; ) ++c;
        c <<= 1;
        if (32 < c - a && ud) return ud.decode(w().slice(a, c));
        c = "";
        for (d = 0; !(d >= b / 2); ++d) {
          var f = ca()[((a + 2 * d) >>> 1) >>> 0];
          if (0 == f) break;
          c += String.fromCharCode(f);
        }
        return c;
      },
      wd = (a, b, c) => {
        c ??= 2147483647;
        if (2 > c) return 0;
        c -= 2;
        var d = b;
        c = c < 2 * a.length ? c / 2 : a.length;
        for (var f = 0; f < c; ++f) {
          var g = a.charCodeAt(f);
          ca()[(b >>> 1) >>> 0] = g;
          b += 2;
        }
        ca()[(b >>> 1) >>> 0] = 0;
        return b - d;
      },
      xd = (a) => 2 * a.length,
      yd = (a, b) => {
        for (var c = 0, d = ""; !(c >= b / 4); ) {
          var f = z()[((a + 4 * c) >>> 2) >>> 0];
          if (0 == f) break;
          ++c;
          65536 <= f
            ? ((f -= 65536),
              (d += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
            : (d += String.fromCharCode(f));
        }
        return d;
      },
      zd = (a, b, c) => {
        b >>>= 0;
        c ??= 2147483647;
        if (4 > c) return 0;
        var d = b;
        c = d + c - 4;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var k = a.charCodeAt(++f);
            g = (65536 + ((g & 1023) << 10)) | (k & 1023);
          }
          z()[(b >>> 2) >>> 0] = g;
          b += 4;
          if (b + 4 > c) break;
        }
        z()[(b >>> 2) >>> 0] = 0;
        return b - d;
      },
      Ad = (a) => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          55296 <= d && 57343 >= d && ++c;
          b += 4;
        }
        return b;
      };
    function Ib(a, b, c) {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      c = Q(c);
      if (2 === b) {
        var d = vd;
        var f = wd;
        var g = xd;
        var k = (l) => ea()[(l >>> 1) >>> 0];
      } else
        4 === b &&
          ((d = yd), (f = zd), (g = Ad), (k = (l) => A()[(l >>> 2) >>> 0]));
      S(a, {
        name: c,
        fromWireType: (l) => {
          for (var p = A()[(l >>> 2) >>> 0], n, r = l + 4, x = 0; x <= p; ++x) {
            var y = l + 4 + x * b;
            if (x == p || 0 == k(y))
              (r = d(r, y - r)),
                void 0 === n
                  ? (n = r)
                  : ((n += String.fromCharCode(0)), (n += r)),
                (r = y + b);
          }
          X(l);
          return n;
        },
        toWireType: (l, p) => {
          if ("string" != typeof p)
            throw new R(`Cannot pass non-string to C++ string type ${c}`);
          var n = g(p),
            r = td(4 + n + b);
          A()[(r >>> 2) >>> 0] = n / b;
          f(p, r + 4, n + b);
          null !== l && l.push(X, r);
          return r;
        },
        argPackAdvance: T,
        readValueFromPointer: qd,
        yb(l) {
          X(l);
        },
      });
    }
    function Jb(a, b) {
      a >>>= 0;
      b = Q(b >>> 0);
      S(a, {
        Mb: !0,
        name: b,
        argPackAdvance: 0,
        fromWireType: () => {},
        toWireType: () => {},
      });
    }
    var Kb = () => 1;
    function Lb(a) {
      Ka(a >>> 0, !C, 1, !qa, 131072, !1);
      Na();
    }
    var Bd = (a) => {
      if (!I)
        try {
          if ((a(), !(0 < O)))
            try {
              E ? Qa(Ua) : xc(Ua);
            } catch (b) {
              b instanceof Gc || "unwind" == b || wa(1, b);
            }
        } catch (b) {
          b instanceof Gc || "unwind" == b || wa(1, b);
        }
    };
    function La(a) {
      a >>>= 0;
      "function" === typeof Atomics.bc &&
        (Atomics.bc(z(), a >>> 2, a).value.then(Ra),
        (a += 128),
        Atomics.store(z(), a >>> 2, 1));
    }
    var Ra = () => {
      var a = Ia();
      a && (La(a), Bd(Cd));
    };
    function Mb(a, b) {
      a >>>= 0;
      a == b >>> 0
        ? setTimeout(Ra)
        : E
        ? postMessage({ targetThread: a, cmd: "checkMailbox" })
        : (a = N[a]) && a.postMessage({ cmd: "checkMailbox" });
    }
    var Dd = [];
    function Nb(a, b, c, d, f) {
      b >>>= 0;
      d /= 2;
      Dd.length = d;
      c = (f >>> 0) >>> 3;
      for (f = 0; f < d; f++)
        Dd[f] = J[c + 2 * f] ? J[c + 2 * f + 1] : la()[(c + 2 * f + 1) >>> 0];
      return (b ? Ec[b] : Ed[a])(...Dd);
    }
    function Ob(a) {
      a >>>= 0;
      E ? postMessage({ cmd: "cleanupThread", thread: a }) : Wc(N[a]);
    }
    function Pb(a) {
      D && N[a >>> 0].ref();
    }
    var Gd = (a, b) => {
        var c = ld[a];
        if (void 0 === c)
          throw (
            ((a = Fd(a)), (c = Q(a)), X(a), new R(`${b} has unknown type ${c}`))
          );
        return c;
      },
      Hd = (a, b, c) => {
        var d = [];
        a = a.toWireType(d, c);
        d.length && (A()[(b >>> 2) >>> 0] = W(d));
        return a;
      };
    function Qb(a, b, c) {
      b >>>= 0;
      c >>>= 0;
      a = V(a >>> 0);
      b = Gd(b, "emval::as");
      return Hd(b, c, a);
    }
    var Id = (a) => {
      try {
        a();
      } catch (b) {
        cb(b);
      }
    };
    function Jd() {
      var a = Y,
        b = {};
      for (let [c, d] of Object.entries(a))
        b[c] =
          "function" == typeof d
            ? (...f) => {
                Kd.push(c);
                try {
                  return d(...f);
                } finally {
                  I ||
                    (Kd.pop(),
                    F &&
                      1 === Z &&
                      0 === Kd.length &&
                      ((Z = 0),
                      (O += 1),
                      Id(Ld),
                      "undefined" != typeof Fibers && Fibers.hc()));
                }
              }
            : d;
      return b;
    }
    var Z = 0,
      F = null,
      Md = 0,
      Kd = [],
      Nd = {},
      Od = {},
      Pd = 0,
      Qd = null,
      Rd = [];
    function sa() {
      return new Promise((a, b) => {
        Qd = { resolve: a, reject: b };
      });
    }
    function Sd() {
      var a = td(65548),
        b = a + 12;
      A()[(a >>> 2) >>> 0] = b;
      A()[((a + 4) >>> 2) >>> 0] = b + 65536;
      b = Kd[0];
      var c = Nd[b];
      void 0 === c && ((c = Pd++), (Nd[b] = c), (Od[c] = b));
      b = c;
      z()[((a + 8) >>> 2) >>> 0] = b;
      return a;
    }
    function Td() {
      var a = z()[((F + 8) >>> 2) >>> 0];
      a = Y[Od[a]];
      --O;
      return a();
    }
    function Ud(a) {
      if (!I) {
        if (0 === Z) {
          var b = !1,
            c = !1;
          a((d = 0) => {
            if (!I && ((Md = d), (b = !0), c)) {
              Z = 2;
              Id(() => Vd(F));
              "undefined" != typeof Browser &&
                Browser.Db.Kb &&
                Browser.Db.resume();
              d = !1;
              try {
                var f = Td();
              } catch (l) {
                (f = l), (d = !0);
              }
              var g = !1;
              if (!F) {
                var k = Qd;
                k && ((Qd = null), (d ? k.reject : k.resolve)(f), (g = !0));
              }
              if (d && !g) throw f;
            }
          });
          c = !0;
          b ||
            ((Z = 1),
            (F = Sd()),
            "undefined" != typeof Browser &&
              Browser.Db.Kb &&
              Browser.Db.pause(),
            Id(() => Wd(F)));
        } else
          2 === Z
            ? ((Z = 0), Id(Xd), X(F), (F = null), Rd.forEach(Bd))
            : cb(`invalid state: ${Z}`);
        return Md;
      }
    }
    function Fc(a) {
      return Ud((b) => {
        a().then(b);
      });
    }
    function Rb(a) {
      a >>>= 0;
      return Fc(() => {
        a = V(a);
        return a.then(W);
      });
    }
    var Yd = [];
    function Sb(a, b, c, d) {
      c >>>= 0;
      d >>>= 0;
      a = Yd[a >>> 0];
      b = V(b >>> 0);
      return a(null, b, c, d);
    }
    var Zd = {},
      $d = (a) => {
        var b = Zd[a];
        return void 0 === b ? Q(a) : b;
      };
    function Tb(a, b, c, d, f) {
      c >>>= 0;
      d >>>= 0;
      f >>>= 0;
      a = Yd[a >>> 0];
      b = V(b >>> 0);
      c = $d(c);
      return a(b, b[c], d, f);
    }
    function Vb(a, b) {
      b >>>= 0;
      a = V(a >>> 0);
      b = V(b);
      return a == b;
    }
    var ae = () =>
      "object" == typeof globalThis ? globalThis : Function("return this")();
    function Wb(a) {
      a >>>= 0;
      if (0 === a) return W(ae());
      a = $d(a);
      return W(ae()[a]);
    }
    var be = (a) => {
        var b = Yd.length;
        Yd.push(a);
        return b;
      },
      ce = (a, b) => {
        for (var c = Array(a), d = 0; d < a; ++d)
          c[d] = Gd(A()[((b + 4 * d) >>> 2) >>> 0], "parameter " + d);
        return c;
      },
      de = (a, b) => Object.defineProperty(b, "name", { value: a });
    function ee(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          `new_ called with constructor type ${typeof b} which is not a function`
        );
      var c = de(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function Xb(a, b, c) {
      b = ce(a, b >>> 0);
      var d = b.shift();
      a--;
      var f = "return function (obj, func, destructorsRef, args) {\n",
        g = 0,
        k = [];
      0 === c && k.push("obj");
      for (var l = ["retType"], p = [d], n = 0; n < a; ++n)
        k.push("arg" + n),
          l.push("argType" + n),
          p.push(b[n]),
          (f += `  var arg${n} = argType${n}.readValueFromPointer(args${
            g ? "+" + g : ""
          });\n`),
          (g += b[n].argPackAdvance);
      f += `  var rv = ${1 === c ? "new func" : "func.call"}(${k.join(
        ", "
      )});\n`;
      d.Mb ||
        (l.push("emval_returnValue"),
        p.push(Hd),
        (f += "  return emval_returnValue(retType, destructorsRef, rv);\n"));
      l.push(f + "};\n");
      a = ee(l)(...p);
      c = `methodCaller<(${b.map((r) => r.name).join(", ")}) => ${d.name}>`;
      return be(de(c, a));
    }
    function Yb(a, b) {
      b >>>= 0;
      a = V(a >>> 0);
      b = V(b);
      return W(a[b]);
    }
    function Zb(a) {
      a >>>= 0;
      9 < a && (U[a + 1] += 1);
    }
    function $b() {
      return W([]);
    }
    function ac(a) {
      a = V(a >>> 0);
      for (var b = Array(a.length), c = 0; c < a.length; c++) b[c] = a[c];
      return W(b);
    }
    function bc(a) {
      return W($d(a >>> 0));
    }
    function cc() {
      return W({});
    }
    function dc(a) {
      a >>>= 0;
      for (var b = V(a); b.length; ) {
        var c = b.pop();
        b.pop()(c);
      }
      Ub(a);
    }
    function ec(a, b, c) {
      b >>>= 0;
      c >>>= 0;
      a = V(a >>> 0);
      b = V(b);
      c = V(c);
      a[b] = c;
    }
    function fc(a, b) {
      b >>>= 0;
      a = Gd(a >>> 0, "_emval_take_value");
      a = a.readValueFromPointer(b);
      return W(a);
    }
    function gc(a, b) {
      a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
      b >>>= 0;
      a = new Date(1e3 * a);
      z()[(b >>> 2) >>> 0] = a.getUTCSeconds();
      z()[((b + 4) >>> 2) >>> 0] = a.getUTCMinutes();
      z()[((b + 8) >>> 2) >>> 0] = a.getUTCHours();
      z()[((b + 12) >>> 2) >>> 0] = a.getUTCDate();
      z()[((b + 16) >>> 2) >>> 0] = a.getUTCMonth();
      z()[((b + 20) >>> 2) >>> 0] = a.getUTCFullYear() - 1900;
      z()[((b + 24) >>> 2) >>> 0] = a.getUTCDay();
      a =
        ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
          864e5) |
        0;
      z()[((b + 28) >>> 2) >>> 0] = a;
    }
    var fe = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
      ge = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
      he = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function hc(a, b) {
      a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
      b >>>= 0;
      a = new Date(1e3 * a);
      z()[(b >>> 2) >>> 0] = a.getSeconds();
      z()[((b + 4) >>> 2) >>> 0] = a.getMinutes();
      z()[((b + 8) >>> 2) >>> 0] = a.getHours();
      z()[((b + 12) >>> 2) >>> 0] = a.getDate();
      z()[((b + 16) >>> 2) >>> 0] = a.getMonth();
      z()[((b + 20) >>> 2) >>> 0] = a.getFullYear() - 1900;
      z()[((b + 24) >>> 2) >>> 0] = a.getDay();
      var c =
        ((fe(a.getFullYear()) ? ge : he)[a.getMonth()] + a.getDate() - 1) | 0;
      z()[((b + 28) >>> 2) >>> 0] = c;
      z()[((b + 36) >>> 2) >>> 0] = -(60 * a.getTimezoneOffset());
      c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
      var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
      a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
      z()[((b + 32) >>> 2) >>> 0] = a;
    }
    function ic(a) {
      a >>>= 0;
      var b = new Date(
          z()[((a + 20) >>> 2) >>> 0] + 1900,
          z()[((a + 16) >>> 2) >>> 0],
          z()[((a + 12) >>> 2) >>> 0],
          z()[((a + 8) >>> 2) >>> 0],
          z()[((a + 4) >>> 2) >>> 0],
          z()[(a >>> 2) >>> 0],
          0
        ),
        c = z()[((a + 32) >>> 2) >>> 0],
        d = b.getTimezoneOffset(),
        f = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(),
        g = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(),
        k = Math.min(g, f);
      0 > c
        ? (z()[((a + 32) >>> 2) >>> 0] = Number(f != g && k == d))
        : 0 < c != (k == d) &&
          ((f = Math.max(g, f)),
          b.setTime(b.getTime() + 6e4 * ((0 < c ? k : f) - d)));
      z()[((a + 24) >>> 2) >>> 0] = b.getDay();
      c = ((fe(b.getFullYear()) ? ge : he)[b.getMonth()] + b.getDate() - 1) | 0;
      z()[((a + 28) >>> 2) >>> 0] = c;
      z()[(a >>> 2) >>> 0] = b.getSeconds();
      z()[((a + 4) >>> 2) >>> 0] = b.getMinutes();
      z()[((a + 8) >>> 2) >>> 0] = b.getHours();
      z()[((a + 12) >>> 2) >>> 0] = b.getDate();
      z()[((a + 16) >>> 2) >>> 0] = b.getMonth();
      z()[((a + 20) >>> 2) >>> 0] = b.getYear();
      a = b.getTime();
      return BigInt(isNaN(a) ? -1 : a / 1e3);
    }
    function jc(a, b, c, d, f, g, k) {
      return E ? P(16, 1, a, b, c, d, f, g, k) : -52;
    }
    function kc(a, b, c, d, f, g) {
      if (E) return P(17, 1, a, b, c, d, f, g);
    }
    function lc(a, b, c, d) {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var f = new Date().getFullYear(),
        g = new Date(f, 0, 1),
        k = new Date(f, 6, 1);
      f = g.getTimezoneOffset();
      var l = k.getTimezoneOffset(),
        p = Math.max(f, l);
      A()[(a >>> 2) >>> 0] = 60 * p;
      z()[(b >>> 2) >>> 0] = Number(f != l);
      a = (n) =>
        n
          .toLocaleTimeString(void 0, { hour12: !1, timeZoneName: "short" })
          .split(" ")[1];
      g = a(g);
      k = a(k);
      l < f ? (hd(g, c, 17), hd(k, d, 17)) : (hd(g, d, 17), hd(k, c, 17));
    }
    var ie = [],
      je = (a, b) => {
        ie.length = 0;
        for (var c; (c = w()[a++ >>> 0]); ) {
          var d = 105 != c;
          d &= 112 != c;
          b += d && b % 8 ? 4 : 0;
          ie.push(
            112 == c
              ? A()[(b >>> 2) >>> 0]
              : 106 == c
              ? J[b >>> 3]
              : 105 == c
              ? z()[(b >>> 2) >>> 0]
              : la()[(b >>> 3) >>> 0]
          );
          b += d ? 8 : 4;
        }
        return ie;
      };
    function mc(a, b, c) {
      a >>>= 0;
      b = je(b >>> 0, c >>> 0);
      return Ec[a](...b);
    }
    function nc(a, b, c) {
      a >>>= 0;
      b = je(b >>> 0, c >>> 0);
      return Ec[a](...b);
    }
    var oc = () => {},
      pc = () => Date.now(),
      qc = () => {
        O += 1;
        throw "unwind";
      };
    function rc() {
      return 4294901760;
    }
    var sc;
    sc = () => performance.timeOrigin + performance.now();
    var tc = () =>
      D ? require("os").cpus().length : navigator.hardwareConcurrency;
    function uc(a) {
      a >>>= 0;
      var b = w().length;
      if (a <= b || 4294901760 < a) return !1;
      for (var c = 1; 4 >= c; c *= 2) {
        var d = b * (1 + 0.2 / c);
        d = Math.min(d, a + 100663296);
        var f = Math;
        d = Math.max(a, d);
        a: {
          f =
            (f.min.call(f, 4294901760, d + ((65536 - (d % 65536)) % 65536)) -
              m.buffer.byteLength +
              65535) /
            65536;
          try {
            m.grow(f);
            u();
            var g = 1;
            break a;
          } catch (k) {}
          g = void 0;
        }
        if (g) return !0;
      }
      return !1;
    }
    var ke = {},
      me = () => {
        if (!le) {
          var a = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (
                  ("object" == typeof navigator &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  "C"
                ).replace("-", "_") + ".UTF-8",
              _: va || "./this.program",
            },
            b;
          for (b in ke) void 0 === ke[b] ? delete a[b] : (a[b] = ke[b]);
          var c = [];
          for (b in a) c.push(`${b}=${a[b]}`);
          le = c;
        }
        return le;
      },
      le;
    function vc(a, b) {
      if (E) return P(18, 1, a, b);
      a >>>= 0;
      b >>>= 0;
      var c = 0;
      me().forEach((d, f) => {
        var g = b + c;
        f = A()[((a + 4 * f) >>> 2) >>> 0] = g;
        for (g = 0; g < d.length; ++g) e()[f++ >>> 0] = d.charCodeAt(g);
        e()[f >>> 0] = 0;
        c += d.length + 1;
      });
      return 0;
    }
    function wc(a, b) {
      if (E) return P(19, 1, a, b);
      a >>>= 0;
      b >>>= 0;
      var c = me();
      A()[(a >>> 2) >>> 0] = c.length;
      var d = 0;
      c.forEach((f) => (d += f.length + 1));
      A()[(b >>> 2) >>> 0] = d;
      return 0;
    }
    function yc(a) {
      return E ? P(20, 1, a) : 52;
    }
    function zc(a, b, c, d) {
      return E ? P(21, 1, a, b, c, d) : 52;
    }
    function Ac(a, b, c, d) {
      return E ? P(22, 1, a, b, c, d) : 70;
    }
    var ne = [null, [], []];
    function Bc(a, b, c, d) {
      if (E) return P(23, 1, a, b, c, d);
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      for (var f = 0, g = 0; g < c; g++) {
        var k = A()[(b >>> 2) >>> 0],
          l = A()[((b + 4) >>> 2) >>> 0];
        b += 8;
        for (var p = 0; p < l; p++) {
          var n = w()[(k + p) >>> 0],
            r = ne[a];
          0 === n || 10 === n
            ? ((1 === a ? Ea : H)(ed(r, 0)), (r.length = 0))
            : r.push(n);
        }
        f += l;
      }
      A()[(d >>> 2) >>> 0] = f;
      return 0;
    }
    var oe = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      pe = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function qe(a) {
      var b = Array(fd(a) + 1);
      gd(a, b, 0, b.length);
      return b;
    }
    var re = (a, b) => {
      e().set(a, b >>> 0);
    };
    function Cc(a, b, c, d) {
      function f(h, t, v) {
        for (h = "number" == typeof h ? h.toString() : h || ""; h.length < t; )
          h = v[0] + h;
        return h;
      }
      function g(h, t) {
        return f(h, t, "0");
      }
      function k(h, t) {
        function v(Qc) {
          return 0 > Qc ? -1 : 0 < Qc ? 1 : 0;
        }
        var aa;
        0 === (aa = v(h.getFullYear() - t.getFullYear())) &&
          0 === (aa = v(h.getMonth() - t.getMonth())) &&
          (aa = v(h.getDate() - t.getDate()));
        return aa;
      }
      function l(h) {
        switch (h.getDay()) {
          case 0:
            return new Date(h.getFullYear() - 1, 11, 29);
          case 1:
            return h;
          case 2:
            return new Date(h.getFullYear(), 0, 3);
          case 3:
            return new Date(h.getFullYear(), 0, 2);
          case 4:
            return new Date(h.getFullYear(), 0, 1);
          case 5:
            return new Date(h.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(h.getFullYear() - 1, 11, 30);
        }
      }
      function p(h) {
        var t = h.wb;
        for (h = new Date(new Date(h.xb + 1900, 0, 1).getTime()); 0 < t; ) {
          var v = h.getMonth(),
            aa = (fe(h.getFullYear()) ? oe : pe)[v];
          if (t > aa - h.getDate())
            (t -= aa - h.getDate() + 1),
              h.setDate(1),
              11 > v
                ? h.setMonth(v + 1)
                : (h.setMonth(0), h.setFullYear(h.getFullYear() + 1));
          else {
            h.setDate(h.getDate() + t);
            break;
          }
        }
        v = new Date(h.getFullYear() + 1, 0, 4);
        t = l(new Date(h.getFullYear(), 0, 4));
        v = l(v);
        return 0 >= k(t, h)
          ? 0 >= k(v, h)
            ? h.getFullYear() + 1
            : h.getFullYear()
          : h.getFullYear() - 1;
      }
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var n = A()[((d + 40) >>> 2) >>> 0];
      d = {
        Zb: z()[(d >>> 2) >>> 0],
        Yb: z()[((d + 4) >>> 2) >>> 0],
        Bb: z()[((d + 8) >>> 2) >>> 0],
        Fb: z()[((d + 12) >>> 2) >>> 0],
        Cb: z()[((d + 16) >>> 2) >>> 0],
        xb: z()[((d + 20) >>> 2) >>> 0],
        ub: z()[((d + 24) >>> 2) >>> 0],
        wb: z()[((d + 28) >>> 2) >>> 0],
        fc: z()[((d + 32) >>> 2) >>> 0],
        Xb: z()[((d + 36) >>> 2) >>> 0],
        $b: n ? K(n) : "",
      };
      c = K(c);
      n = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var r in n) c = c.replace(new RegExp(r, "g"), n[r]);
      var x = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        y =
          "January February March April May June July August September October November December".split(
            " "
          );
      n = {
        "%a": (h) => x[h.ub].substring(0, 3),
        "%A": (h) => x[h.ub],
        "%b": (h) => y[h.Cb].substring(0, 3),
        "%B": (h) => y[h.Cb],
        "%C": (h) => g(((h.xb + 1900) / 100) | 0, 2),
        "%d": (h) => g(h.Fb, 2),
        "%e": (h) => f(h.Fb, 2, " "),
        "%g": (h) => p(h).toString().substring(2),
        "%G": p,
        "%H": (h) => g(h.Bb, 2),
        "%I": (h) => {
          h = h.Bb;
          0 == h ? (h = 12) : 12 < h && (h -= 12);
          return g(h, 2);
        },
        "%j": (h) => {
          for (
            var t = 0, v = 0;
            v <= h.Cb - 1;
            t += (fe(h.xb + 1900) ? oe : pe)[v++]
          );
          return g(h.Fb + t, 3);
        },
        "%m": (h) => g(h.Cb + 1, 2),
        "%M": (h) => g(h.Yb, 2),
        "%n": () => "\n",
        "%p": (h) => (0 <= h.Bb && 12 > h.Bb ? "AM" : "PM"),
        "%S": (h) => g(h.Zb, 2),
        "%t": () => "\t",
        "%u": (h) => h.ub || 7,
        "%U": (h) => g(Math.floor((h.wb + 7 - h.ub) / 7), 2),
        "%V": (h) => {
          var t = Math.floor((h.wb + 7 - ((h.ub + 6) % 7)) / 7);
          2 >= (h.ub + 371 - h.wb - 2) % 7 && t++;
          if (t)
            53 == t &&
              ((v = (h.ub + 371 - h.wb) % 7),
              4 == v || (3 == v && fe(h.xb)) || (t = 1));
          else {
            t = 52;
            var v = (h.ub + 7 - h.wb - 1) % 7;
            (4 == v || (5 == v && fe((h.xb % 400) - 1))) && t++;
          }
          return g(t, 2);
        },
        "%w": (h) => h.ub,
        "%W": (h) => g(Math.floor((h.wb + 7 - ((h.ub + 6) % 7)) / 7), 2),
        "%y": (h) => (h.xb + 1900).toString().substring(2),
        "%Y": (h) => h.xb + 1900,
        "%z": (h) => {
          h = h.Xb;
          var t = 0 <= h;
          h = Math.abs(h) / 60;
          return (
            (t ? "+" : "-") +
            String("0000" + ((h / 60) * 100 + (h % 60))).slice(-4)
          );
        },
        "%Z": (h) => h.$b,
        "%%": () => "%",
      };
      c = c.replace(/%%/g, "\x00\x00");
      for (r in n)
        c.includes(r) && (c = c.replace(new RegExp(r, "g"), n[r](d)));
      c = c.replace(/\0\0/g, "%");
      r = qe(c);
      if (r.length > b) return 0;
      re(r, a);
      return r.length - 1;
    }
    function Dc(a, b, c, d) {
      return Cc(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
    }
    E || Tc();
    for (var se = Array(256), te = 0; 256 > te; ++te)
      se[te] = String.fromCharCode(te);
    jd = se;
    R = B.BindingError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "BindingError";
      }
    };
    B.InternalError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "InternalError";
      }
    };
    U.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1);
    B.count_emval_handles = () => U.length / 2 - 5 - pd.length;
    var Ed = [
        Pc,
        Rc,
        cd,
        nb,
        ob,
        pb,
        qb,
        rb,
        sb,
        tb,
        ub,
        vb,
        wb,
        xb,
        yb,
        zb,
        jc,
        kc,
        vc,
        wc,
        yc,
        zc,
        Ac,
        Bc,
      ],
      jb,
      Y = (function () {
        function a(c, d) {
          Y = c.exports;
          Y = Jd();
          Y = ue();
          Sc.push(Y.cb);
          Xa.unshift(Y.va);
          Ta = d;
          bb();
          return Y;
        }
        var b = Ja();
        Za++;
        if (B.instantiateWasm)
          try {
            return B.instantiateWasm(b, a);
          } catch (c) {
            H(`Module.instantiateWasm callback failed with error: ${c}`), oa(c);
          }
        eb ||= B.locateFile
          ? db("ort-wasm-simd-threaded.jsep.wasm")
            ? "ort-wasm-simd-threaded.jsep.wasm"
            : B.locateFile
            ? B.locateFile("ort-wasm-simd-threaded.jsep.wasm", G)
            : G + "ort-wasm-simd-threaded.jsep.wasm"
          : new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href;
        ib(b, function (c) {
          a(c.instance, c.module);
        }).catch(oa);
        return {};
      })(),
      Fd = (a) => (Fd = Y.wa)(a),
      Oa = () => (Oa = Y.xa)();
    B._OrtInit = (a, b) => (B._OrtInit = Y.ya)(a, b);
    B._OrtGetLastError = (a, b) => (B._OrtGetLastError = Y.za)(a, b);
    B._OrtCreateSessionOptions = (a, b, c, d, f, g, k, l, p, n) =>
      (B._OrtCreateSessionOptions = Y.Aa)(a, b, c, d, f, g, k, l, p, n);
    B._OrtAppendExecutionProvider = (a, b) =>
      (B._OrtAppendExecutionProvider = Y.Ba)(a, b);
    B._OrtAddFreeDimensionOverride = (a, b, c) =>
      (B._OrtAddFreeDimensionOverride = Y.Ca)(a, b, c);
    B._OrtAddSessionConfigEntry = (a, b, c) =>
      (B._OrtAddSessionConfigEntry = Y.Da)(a, b, c);
    B._OrtReleaseSessionOptions = (a) =>
      (B._OrtReleaseSessionOptions = Y.Ea)(a);
    B._OrtCreateSession = (a, b, c) => (B._OrtCreateSession = Y.Fa)(a, b, c);
    B._OrtReleaseSession = (a) => (B._OrtReleaseSession = Y.Ga)(a);
    B._OrtGetInputOutputCount = (a, b, c) =>
      (B._OrtGetInputOutputCount = Y.Ha)(a, b, c);
    B._OrtGetInputName = (a, b) => (B._OrtGetInputName = Y.Ia)(a, b);
    B._OrtGetOutputName = (a, b) => (B._OrtGetOutputName = Y.Ja)(a, b);
    B._OrtFree = (a) => (B._OrtFree = Y.Ka)(a);
    B._OrtCreateTensor = (a, b, c, d, f, g) =>
      (B._OrtCreateTensor = Y.La)(a, b, c, d, f, g);
    B._OrtGetTensorData = (a, b, c, d, f) =>
      (B._OrtGetTensorData = Y.Ma)(a, b, c, d, f);
    B._OrtReleaseTensor = (a) => (B._OrtReleaseTensor = Y.Na)(a);
    B._OrtCreateRunOptions = (a, b, c, d) =>
      (B._OrtCreateRunOptions = Y.Oa)(a, b, c, d);
    B._OrtAddRunConfigEntry = (a, b, c) =>
      (B._OrtAddRunConfigEntry = Y.Pa)(a, b, c);
    B._OrtReleaseRunOptions = (a) => (B._OrtReleaseRunOptions = Y.Qa)(a);
    B._OrtCreateBinding = (a) => (B._OrtCreateBinding = Y.Ra)(a);
    B._OrtBindInput = (a, b, c) => (B._OrtBindInput = Y.Sa)(a, b, c);
    B._OrtBindOutput = (a, b, c, d) => (B._OrtBindOutput = Y.Ta)(a, b, c, d);
    B._OrtClearBoundOutputs = (a) => (B._OrtClearBoundOutputs = Y.Ua)(a);
    B._OrtReleaseBinding = (a) => (B._OrtReleaseBinding = Y.Va)(a);
    B._OrtRunWithBinding = (a, b, c, d, f) =>
      (B._OrtRunWithBinding = Y.Wa)(a, b, c, d, f);
    B._OrtRun = (a, b, c, d, f, g, k, l) =>
      (B._OrtRun = Y.Xa)(a, b, c, d, f, g, k, l);
    B._OrtEndProfiling = (a) => (B._OrtEndProfiling = Y.Ya)(a);
    B._JsepOutput = (a, b, c) => (B._JsepOutput = Y.Za)(a, b, c);
    B._JsepGetNodeName = (a) => (B._JsepGetNodeName = Y._a)(a);
    var Ia = () => (Ia = Y.$a)(),
      td = (B._malloc = (a) => (td = B._malloc = Y.ab)(a)),
      X = (B._free = (a) => (X = B._free = Y.bb)(a)),
      Ka = (a, b, c, d, f, g) => (Ka = Y.eb)(a, b, c, d, f, g),
      Sa = () => (Sa = Y.fb)(),
      Nc = (a, b, c, d, f) => (Nc = Y.gb)(a, b, c, d, f),
      Vc = (a) => (Vc = Y.hb)(a),
      Qa = (a) => (Qa = Y.ib)(a),
      Cd = () => (Cd = Y.jb)(),
      Yc = (a, b) => (Yc = Y.kb)(a, b),
      Oc = (a) => (Oc = Y.lb)(a),
      Mc = (a) => (Mc = Y.mb)(a),
      Lc = () => (Lc = Y.nb)(),
      Zc = (B.dynCall_ii = (a, b) => (Zc = B.dynCall_ii = Y.pb)(a, b)),
      Wd = (a) => (Wd = Y.qb)(a),
      Ld = () => (Ld = Y.rb)(),
      Vd = (a) => (Vd = Y.sb)(a),
      Xd = () => (Xd = Y.tb)();
    B.___start_em_js = 840004;
    B.___stop_em_js = 840165;
    function ue() {
      var a = Y;
      a = Object.assign({}, a);
      var b = (d) => (f) => d(f) >>> 0,
        c = (d) => () => d() >>> 0;
      a.wa = b(a.wa);
      a.$a = c(a.$a);
      a.ab = b(a.ab);
      a.emscripten_main_runtime_thread_id = c(
        a.emscripten_main_runtime_thread_id
      );
      a.mb = b(a.mb);
      a.nb = c(a.nb);
      return a;
    }
    B.stackSave = () => Lc();
    B.stackRestore = (a) => Oc(a);
    B.stackAlloc = (a) => Mc(a);
    B.UTF8ToString = K;
    B.stringToUTF8 = hd;
    B.lengthBytesUTF8 = fd;
    var ve;
    ab = function we() {
      ve || xe();
      ve || (ab = we);
    };
    function xe() {
      if (!(0 < Za))
        if (E) na(B), E || Xc(Xa), startWorker(B);
        else {
          if (B.preRun)
            for (
              "function" == typeof B.preRun && (B.preRun = [B.preRun]);
              B.preRun.length;

            )
              Wa.unshift(B.preRun.shift());
          Xc(Wa);
          0 < Za ||
            ve ||
            ((ve = !0),
            (B.calledRun = !0),
            I || (E || Xc(Xa), na(B), E || Xc(Ya)));
        }
    }
    xe();
    moduleRtn = pa;

    return moduleRtn;
  };
})();
export default ortWasmThreaded;
var isPthread = globalThis.self?.name === "em-pthread";
var isNode = typeof globalThis.process?.versions?.node == "string";
if (isNode)
  isPthread = (await import("worker_threads")).workerData === "em-pthread";

// When running as a pthread, construct a new instance on startup
isPthread && ortWasmThreaded();
