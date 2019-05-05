! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.WebRTC = t() : e.WebRTC = t()
}(window, function() {
	return function(e) {
		var t = {};

		function r(n) {
			if(t[n]) return t[n].exports;
			var i = t[n] = {
				i: n,
				l: !1,
				exports: {}
			};
			return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
		}
		return r.m = e, r.c = t, r.d = function(e, t, n) {
			r.o(e, t) || Object.defineProperty(e, t, {
				configurable: !1,
				enumerable: !0,
				get: n
			})
		}, r.r = function(e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, r.n = function(e) {
			var t = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return r.d(t, "a", t), t
		}, r.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, r.p = "", r(r.s = 498)
	}([function(e, t, r) {
		"use strict";
		var n, i = r(10),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		var o = r(84),
			s = r(72);
		r(118);
		var c, u, d = r(11),
			l = d.getGlobal(),
			f = /\s+/;
		d.deduplicate = function(e) {
			var t = [];
			return e.forEach(function(e) {
				-1 === t.indexOf(e) && t.push(e)
			}), t
		}, d.capFirstLetter = function(e) {
			return e ? (e = "" + e).slice(0, 1).toUpperCase() + e.slice(1) : ""
		}, d.guid = (c = function() {
			return(65536 * (1 + Math.random()) | 0).toString(16).substring(1)
		}, function() {
			return c() + c() + c() + c() + c() + c() + c() + c()
		}), d.extend = function(e, t, r) {
			for(var n in t) void 0 !== e[n] && !0 !== r || (e[n] = t[n])
		}, d.filterObj = function(e, t) {
			var r = {};
			return d.isString(t) && (t = t.split(f)), t.forEach(function(t) {
				e.hasOwnProperty(t) && (r[t] = e[t])
			}), r
		}, d.copy = function(e, t) {
			return t = t || {}, e ? (Object.keys(e).forEach(function(r) {
				d.exist(e[r]) && (t[r] = e[r])
			}), t) : t
		}, d.copyWithNull = function(e, t) {
			return t = t || {}, e ? (Object.keys(e).forEach(function(r) {
				(d.exist(e[r]) || d.isnull(e[r])) && (t[r] = e[r])
			}), t) : t
		}, d.findObjIndexInArray = function(e, t) {
			e = e || [];
			var r = t.keyPath || "id",
				n = -1;
			return e.some(function(e, i) {
				if(s(e, r) === t.value) return n = i, !0
			}), n
		}, d.findObjInArray = function(e, t) {
			var r = d.findObjIndexInArray(e, t);
			return -1 === r ? null : e[r]
		}, d.mergeObjArray = function() {
			var e = [],
				t = [].slice.call(arguments, 0, -1),
				r = arguments[arguments.length - 1];
			d.isArray(r) && (t.push(r), r = {});
			var n, i = r.keyPath = r.keyPath || "id";
			for(r.sortPath = r.sortPath || i; !e.length && t.length;) e = (e = t.shift() || []).slice(0);
			return t.forEach(function(t) {
				t && t.forEach(function(t) {
					-1 !== (n = d.findObjIndexInArray(e, {
						keyPath: i,
						value: s(t, i)
					})) ? e[n] = d.merge({}, e[n], t) : e.push(t)
				})
			}), r.notSort || (e = d.sortObjArray(e, r)), e
		}, d.cutObjArray = function(e) {
			var t = e.slice(0),
				r = arguments.length,
				n = [].slice.call(arguments, 1, r - 1),
				i = arguments[r - 1];
			d.isObject(i) || (n.push(i), i = {});
			var a, o = i.keyPath = i.keyPath || "id";
			return n.forEach(function(e) {
				d.isArray(e) || (e = [e]), e.forEach(function(e) {
					e && (i.value = s(e, o), -1 !== (a = d.findObjIndexInArray(t, i)) && t.splice(a, 1))
				})
			}), t
		}, d.sortObjArray = function(e, t) {
			var r = (t = t || {}).sortPath || "id";
			o.insensitive = !!t.insensitive;
			var n, i, a, c = !!t.desc;
			return a = d.isFunction(t.compare) ? t.compare : function(e, t) {
				return n = s(e, r), i = s(t, r), c ? o(i, n) : o(n, i)
			}, e.sort(a)
		}, d.emptyFunc = function() {}, d.isEmptyFunc = function(e) {
			return e === d.emptyFunc
		}, d.notEmptyFunc = function(e) {
			return e !== d.emptyFunc
		}, d.splice = function(e, t, r) {
			return [].splice.call(e, t, r)
		}, d.reshape2d = function(e, t) {
			if(Array.isArray(e)) {
				d.verifyParamType("type", t, "number", "util::reshape2d");
				var r = e.length;
				if(r <= t) return [e];
				for(var n = Math.ceil(r / t), i = [], a = 0; a < n; a++) i.push(e.slice(a * t, (a + 1) * t));
				return i
			}
			return e
		}, d.flatten2d = function(e) {
			if(Array.isArray(e)) {
				var t = [];
				return e.forEach(function(e) {
					t = t.concat(e)
				}), t
			}
			return e
		}, d.dropArrayDuplicates = function(e) {
			if(Array.isArray(e)) {
				for(var t = {}, r = []; e.length > 0;) {
					t[e.shift()] = !0
				}
				for(var n in t) !0 === t[n] && r.push(n);
				return r
			}
			return e
		}, d.onError = function(e) {
			throw new function(e) {
				"object" === (void 0 === e ? "undefined" : (0, a.default)(e)) ? (this.callFunc = e.callFunc || null, this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date, this.timetag = +this.time
			}(e)
		}, d.verifyParamPresent = function(e, t, r, n) {
			r = r || "";
			var i = !1;
			switch(d.typeOf(t)) {
				case "undefined":
				case "null":
					i = !0;
					break;
				case "string":
					"" === t && (i = !0);
					break;
				case "object":
					Object.keys(t).length || (i = !0);
					break;
				case "array":
					t.length ? t.some(function(e) {
						if(d.notexist(e)) return i = !0, !0
					}) : i = !0
			}
			i && d.onParamAbsent(r + e, n)
		}, d.onParamAbsent = function(e, t) {
			d.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
		}, d.verifyParamAbsent = function(e, t, r, n) {
			r = r || "", void 0 !== t && d.onParamPresent(r + e, n)
		}, d.onParamPresent = function(e, t) {
			d.onParamError("多余的参数 " + e, t)
		}, d.verifyParamType = function(e, t, r, n) {
			var i = d.typeOf(t).toLowerCase();
			d.isArray(r) || (r = [r]);
			var a = !0;
			switch(-1 === (r = r.map(function(e) {
				return e.toLowerCase()
			})).indexOf(i) && (a = !1), i) {
				case "number":
					isNaN(t) && (a = !1)
			}
			a || d.onParamInvalidType(e, r, "", n)
		}, d.onParamInvalidType = function(e, t, r, n) {
			r = r || "", t = d.isArray(t) ? (t = t.map(function(e) {
				return '"' + e + '"'
			})).join(", ") : '"' + t + '"', d.onParamError('参数"' + r + e + '"类型错误, 合法的类型包括: [' + t + "]", n)
		}, d.verifyParamValid = function(e, t, r, n) {
			d.isArray(r) || (r = [r]), -1 === r.indexOf(t) && d.onParamInvalidValue(e, r, n)
		}, d.onParamInvalidValue = function(e, t, r) {
			d.isArray(t) || (t = [t]), t = t.map(function(e) {
				return '"' + e + '"'
			}), d.isArray(t) && (t = t.join(", ")), d.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(t) + "]", r)
		}, d.verifyParamMin = function(e, t, r, n) {
			t < r && d.onParamError("参数" + e + "的值不能小于" + r, n)
		}, d.verifyParamMax = function(e, t, r, n) {
			t > r && d.onParamError("参数" + e + "的值不能大于" + r, n)
		}, d.verifyArrayMax = function(e, t, r, n) {
			t.length > r && d.onParamError("参数" + e + "的长度不能大于" + r, n)
		}, d.verifyEmail = (u = /^\S+@\S+$/, function(e, t, r) {
			u.test(t) || d.onParamError("参数" + e + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", r)
		}), d.verifyTel = function() {
			var e = /^[+\-()\d]+$/;
			return function(t, r, n) {
				e.test(r) || d.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", n)
			}
		}(), d.verifyBirth = function() {
			var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
			return function(t, r, n) {
				e.test(r) || d.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', n)
			}
		}(), d.onParamError = function(e, t) {
			d.onError({
				message: e,
				callFunc: t
			})
		}, d.verifyOptions = function(e, t, r, n, i) {
			if(e = e || {}, t && (d.isString(t) && (t = t.split(f)), d.isArray(t))) {
				"boolean" != typeof r && (i = r || null, r = !0, n = "");
				var a = r ? d.verifyParamPresent : d.verifyParamAbsent;
				t.forEach(function(t) {
					a.call(d, t, e[t], n, i)
				})
			}
			return e
		}, d.verifyParamAtLeastPresentOne = function(e, t, r) {
			t && (d.isString(t) && (t = t.split(f)), d.isArray(t) && (t.some(function(t) {
				return d.exist(e[t])
			}) || d.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", r)))
		}, d.verifyParamPresentJustOne = function(e, t, r) {
			t && (d.isString(t) && (t = t.split(f)), d.isArray(t) && 1 !== t.reduce(function(t, r) {
				return d.exist(e[r]) && t++, t
			}, 0) && d.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", r))
		}, d.verifyBooleanWithDefault = function(e, t, r, n, i) {
			d.undef(r) && (r = !0), f.test(t) && (t = t.split(f)), d.isArray(t) ? t.forEach(function(t) {
				d.verifyBooleanWithDefault(e, t, r, n, i)
			}) : void 0 === e[t] ? e[t] = r : d.isBoolean(e[t]) || d.onParamInvalidType(t, "boolean", n, i)
		}, d.verifyFileInput = function(e, t) {
			return d.verifyParamPresent("fileInput", e, "", t), d.isString(e) && ((e = document.getElementById(e)) || d.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() && "file" === e.type.toLowerCase() || d.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" + e.tagName + ", filetype:" + e.type, t), e
		}, d.verifyFileType = function(e, t) {
			d.verifyParamValid("type", e, d.validFileTypes, t)
		}, d.verifyCallback = function(e, t, r) {
			f.test(t) && (t = t.split(f)), d.isArray(t) ? t.forEach(function(t) {
				d.verifyCallback(e, t, r)
			}) : e[t] ? d.isFunction(e[t]) || d.onParamInvalidType(t, "function", "", r) : e[t] = d.emptyFunc
		}, d.verifyFileUploadCallback = function(e, t) {
			d.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
		}, d.validFileTypes = ["image", "audio", "video", "file"], d.validFileExts = {
			image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
			audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
			video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
		}, d.filterFiles = function(e, t) {
			var r, n, i = "file" === (t = t.toLowerCase()),
				a = [];
			return [].forEach.call(e, function(e) {
				if(i) a.push(e);
				else if(r = e.name.slice(e.name.lastIndexOf(".") + 1), (n = e.type.split("/"))[0] && n[1]) {
					(n[0].toLowerCase() === t || -1 !== d.validFileExts[t].indexOf(r)) && a.push(e)
				}
			}), a
		};
		var p, h, m = d.supportFormData = d.notundef(l.FormData);
		d.getFileName = function(e) {
			return e = d.verifyFileInput(e), m ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
		}, d.getFileInfo = (p = {
			ppt: 1,
			pptx: 2,
			pdf: 3
		}, function(e) {
			var t = {};
			if(!(e = d.verifyFileInput(e)).files) return t;
			var r = e.files[0];
			return m && (t.name = r.name, t.size = r.size, t.type = r.name.match(/\.(\w+)$/), t.type = t.type && t.type[1].toLowerCase(), t.transcodeType = p[t.type] || 0), t
		}), d.sizeText = (h = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"], function(e) {
			var t, r = 0;
			do {
				t = (e = Math.floor(100 * e) / 100) + h[r], e /= 1024, r++
			} while (e > 1);
			return t
		}), d.promises2cmds = function(e) {
			return e.map(function(e) {
				return e.cmd
			})
		}, d.objs2accounts = function(e) {
			return e.map(function(e) {
				return e.account
			})
		}, d.teams2ids = function(e) {
			return e.map(function(e) {
				return e.teamId
			})
		}, d.objs2ids = function(e) {
			return e.map(function(e) {
				return e.id
			})
		}, d.getMaxUpdateTime = function(e) {
			var t = e.map(function(e) {
				return +e.updateTime
			});
			return Math.max.apply(Math, t)
		}, d.genCheckUniqueFunc = function(e, t) {
			return e = e || "id", t = t || 1e3,
				function(t) {
					this.uniqueSet = this.uniqueSet || {}, this.uniqueSet[e] = this.uniqueSet[e] || {};
					var r = this.uniqueSet[e],
						n = t[e];
					return !r[n] && (r[n] = !0, !0)
				}
		}, d.fillPropertyWithDefault = function(e, t, r) {
			return !!d.undef(e[t]) && (e[t] = r, !0)
		}, e.exports = d
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0, t.default = function(e, t) {
			if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n = o(r(165)),
			i = o(r(161)),
			a = o(r(10));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function(e, t) {
			if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, a.default)(t)));
			e.prototype = (0, i.default)(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (n.default ? (0, n.default)(e, t) : e.__proto__ = t)
		}
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n, i = r(10),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = function(e, t) {
			if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" !== (void 0 === t ? "undefined" : (0, a.default)(t)) && "function" != typeof t ? e : t
		}
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n, i = r(120),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = function() {
			function e(e, t) {
				for(var r = 0; r < t.length; r++) {
					var n = t[r];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), (0, a.default)(e, n.key, n)
				}
			}
			return function(t, r, n) {
				return r && e(t.prototype, r), n && e(t, n), t
			}
		}()
	}, function(e, t, r) {
		var n = r(40)("wks"),
			i = r(28),
			a = r(7).Symbol,
			o = "function" == typeof a;
		(e.exports = function(e) {
			return n[e] || (n[e] = o && a[e] || (o ? a : i)("Symbol." + e))
		}).store = n
	}, function(e, t) {
		var r = e.exports = {
			version: "2.5.5"
		};
		"number" == typeof __e && (__e = r)
	}, function(e, t) {
		var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
		"number" == typeof __g && (__g = r)
	}, function(e, t, r) {
		"use strict";
		var n = {
			info: {
				hash: "'dab0c57274ba4c5feea74ca53161893aca1c5be7",
				shortHash: "dab0c5727'",
				version: "5.6.0",
				sdkVersion: "52",
				nrtcVersion: "4.2.0",
				nrtcSdkVersion: "1",
				protocolVersion: 1
			},
			agentVersion: "2.8.0.906",
			lbsUrl: "https://lbs.netease.im/lbs/webconf.jsp",
			roomserver: "roomserver.netease.im",
			connectTimeout: 8e3,
			xhrTimeout: 8e3,
			socketTimeout: 8e3,
			reconnectionDelay: 1600,
			reconnectionDelayMax: 8e3,
			reconnectionJitter: .01,
			reconnectiontimer: null,
			heartbeatInterval: 8e3,
			cmdTimeout: 8e3,
			defaultReportUrl: "https://dr.netease.im/1.gif",
			isWeixinApp: !1,
			isNodejs: !1,
			isRN: !1,
			PUSHTOKEN: "",
			PUSHCONFIG: {},
			CLIENTTYPE: 16,
			formatSocketUrl: function(e) {
				var t = e.url,
					r = e.secure ? "https" : "http";
				return -1 === t.indexOf("http") ? r + "://" + t : t
			},
			uploadUrl: "https://nos.netease.com",
			replaceUrl: "https://{bucket}.nosdn.127.net/{object}",
			downloadHost: "nos.netease.com",
			downloadUrl: "https://{bucket}.nosdn.127.net/{object}",
			httpsEnabled: !1,
			genUploadUrl: function(e) {
				return n.uploadUrl + "/" + e
			},
			genDownloadUrl: function(e, t) {
				var r = e.bucket,
					i = (e.tag, e.expireSec),
					a = +new Date,
					o = i ? "&survivalTime=" + i : "",
					s = n.replaceUrl + "?createTime=" + a + o;
				return /^http/.test(s) ? n.httpsEnabled && (s = s.replace("http", "https")) : s = n.httpsEnabled ? "https://" + s : "http://" + s, s.replace("{bucket}", r).replace("{object}", t)
			}
		};
		e.exports = n
	}, function(e, t, r) {
		"use strict";
		var n = Object.prototype.hasOwnProperty,
			i = "~";

		function a() {}

		function o(e, t, r) {
			this.fn = e, this.context = t, this.once = r || !1
		}

		function s() {
			this._events = new a, this._eventsCount = 0
		}
		Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (i = !1)), s.prototype.eventNames = function() {
			var e, t, r = [];
			if(0 === this._eventsCount) return r;
			for(t in e = this._events) n.call(e, t) && r.push(i ? t.slice(1) : t);
			return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
		}, s.prototype.listeners = function(e, t) {
			var r = i ? i + e : e,
				n = this._events[r];
			if(t) return !!n;
			if(!n) return [];
			if(n.fn) return [n.fn];
			for(var a = 0, o = n.length, s = new Array(o); a < o; a++) s[a] = n[a].fn;
			return s
		}, s.prototype.emit = function(e, t, r, n, a, o) {
			var s = i ? i + e : e;
			if(!this._events[s]) return !1;
			var c, u, d = this._events[s],
				l = arguments.length;
			if(d.fn) {
				switch(d.once && this.removeListener(e, d.fn, void 0, !0), l) {
					case 1:
						return d.fn.call(d.context), !0;
					case 2:
						return d.fn.call(d.context, t), !0;
					case 3:
						return d.fn.call(d.context, t, r), !0;
					case 4:
						return d.fn.call(d.context, t, r, n), !0;
					case 5:
						return d.fn.call(d.context, t, r, n, a), !0;
					case 6:
						return d.fn.call(d.context, t, r, n, a, o), !0
				}
				for(u = 1, c = new Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
				d.fn.apply(d.context, c)
			} else {
				var f, p = d.length;
				for(u = 0; u < p; u++) switch(d[u].once && this.removeListener(e, d[u].fn, void 0, !0), l) {
					case 1:
						d[u].fn.call(d[u].context);
						break;
					case 2:
						d[u].fn.call(d[u].context, t);
						break;
					case 3:
						d[u].fn.call(d[u].context, t, r);
						break;
					case 4:
						d[u].fn.call(d[u].context, t, r, n);
						break;
					default:
						if(!c)
							for(f = 1, c = new Array(l - 1); f < l; f++) c[f - 1] = arguments[f];
						d[u].fn.apply(d[u].context, c)
				}
			}
			return !0
		}, s.prototype.on = function(e, t, r) {
			var n = new o(t, r || this),
				a = i ? i + e : e;
			return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], n] : this._events[a].push(n) : (this._events[a] = n, this._eventsCount++), this
		}, s.prototype.once = function(e, t, r) {
			var n = new o(t, r || this, !0),
				a = i ? i + e : e;
			return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], n] : this._events[a].push(n) : (this._events[a] = n, this._eventsCount++), this
		}, s.prototype.removeListener = function(e, t, r, n) {
			var o = i ? i + e : e;
			if(!this._events[o]) return this;
			if(!t) return 0 == --this._eventsCount ? this._events = new a : delete this._events[o], this;
			var s = this._events[o];
			if(s.fn) s.fn !== t || n && !s.once || r && s.context !== r || (0 == --this._eventsCount ? this._events = new a : delete this._events[o]);
			else {
				for(var c = 0, u = [], d = s.length; c < d; c++)(s[c].fn !== t || n && !s[c].once || r && s[c].context !== r) && u.push(s[c]);
				u.length ? this._events[o] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new a : delete this._events[o]
			}
			return this
		}, s.prototype.removeAllListeners = function(e) {
			var t;
			return e ? (t = i ? i + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new a : delete this._events[t])) : (this._events = new a, this._eventsCount = 0), this
		}, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function() {
			return this
		}, s.prefixed = i, s.EventEmitter = s, e.exports = s
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n = o(r(108)),
			i = o(r(98)),
			a = "function" == typeof i.default && "symbol" == typeof n.default ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : typeof e
			};

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = "function" == typeof i.default && "symbol" === a(n.default) ? function(e) {
			return void 0 === e ? "undefined" : a(e)
		} : function(e) {
			return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : void 0 === e ? "undefined" : a(e)
		}
	}, function(e, t, r) {
		"use strict";
		(function(e) {
			Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format = t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0;
			var n, i = r(10),
				a = (n = i) && n.__esModule ? n : {
					default: n
				};
			t.getGlobal = o, t.detectCSSFeature = function(e) {
				var t = !1,
					r = "Webkit Moz ms O".split(" "),
					n = document.createElement("div"),
					i = null;
				e = e.toLowerCase(), void 0 !== n.style[e] && (t = !0);
				if(!1 === t) {
					i = e.charAt(0).toUpperCase() + e.substr(1);
					for(var a = 0; a < r.length; a++)
						if(void 0 !== n.style[r[a] + i]) {
							t = !0;
							break
						}
				}
				return t
			}, t.fix = s, t.getYearStr = c, t.getMonthStr = u, t.getDayStr = d, t.getHourStr = l, t.getMinuteStr = f, t.getSecondStr = p, t.getMillisecondStr = h, t.dateFromDateTimeLocal = function(e) {
				return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "))
			}, t.getClass = _, t.typeOf = y, t.isString = R, t.isNumber = function(e) {
				return "number" === y(e)
			}, t.isBoolean = function(e) {
				return "boolean" === y(e)
			}, t.isArray = g, t.isFunction = C, t.isDate = E, t.isRegExp = function(e) {
				return "regexp" === y(e)
			}, t.isError = function(e) {
				return "error" === y(e)
			}, t.isnull = T, t.notnull = b, t.undef = O, t.notundef = S, t.exist = A, t.notexist = P, t.isObject = I, t.isEmpty = function(e) {
				return P(e) || (R(e) || g(e)) && 0 === e.length
			}, t.containsNode = function(e, t) {
				if(e === t) return !0;
				for(; t.parentNode;) {
					if(t.parentNode === e) return !0;
					t = t.parentNode
				}
				return !1
			}, t.calcHeight = function(e) {
				var t = e.parentNode || document.body;
				(e = e.cloneNode(!0)).style.display = "block", e.style.opacity = 0, e.style.height = "auto", t.appendChild(e);
				var r = e.offsetHeight;
				return t.removeChild(e), r
			}, t.remove = function(e) {
				e.parentNode && e.parentNode.removeChild(e)
			}, t.dataset = function(e, t, r) {
				if(!A(r)) return e.getAttribute("data-" + t);
				e.setAttribute("data-" + t, r)
			}, t.target = function(e) {
				return e.target || e.srcElement
			}, t.createIframe = function(e) {
				var t;
				if((e = e || {}).name) try {
					(t = document.createElement('<iframe name="' + e.name + '"></iframe>')).frameBorder = 0
				} catch(r) {
					(t = document.createElement("iframe")).name = e.name
				} else t = document.createElement("iframe");
				e.visible || (t.style.display = "none");
				C(e.onload) && L(t, "load", function r(n) {
					if(!t.src) return;
					e.multi || D(t, "load", r);
					e.onload(n)
				});
				(e.parent || document.body).appendChild(t);
				var r = e.src || "about:blank";
				return setTimeout(function() {
					t.src = r
				}, 0), t
			}, t.html2node = function(e) {
				var t = document.createElement("div");
				t.innerHTML = e;
				var r = [],
					n = void 0,
					i = void 0;
				if(t.children)
					for(n = 0, i = t.children.length; n < i; n++) r.push(t.children[n]);
				else
					for(n = 0, i = t.childNodes.length; n < i; n++) {
						var a = t.childNodes[n];
						1 === a.nodeType && r.push(a)
					}
				return r.length > 1 ? t : r[0]
			}, t.scrollTop = function(e) {
				A(e) && (document.documentElement.scrollTop = document.body.scrollTop = e);
				return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
			}, t.forOwn = M, t.mixin = w, t.isJSON = G, t.parseJSON = function e(t) {
				try {
					G(t) && (t = JSON.parse(t)), I(t) && M(t, function(r, n) {
						switch(y(n)) {
							case "string":
							case "object":
								t[r] = e(n)
						}
					})
				} catch(e) {
					console.error(e)
				}
				return t
			}, t.simpleClone = function(e) {
				var t = [],
					r = JSON.stringify(e, function(e, r) {
						if("object" === (void 0 === r ? "undefined" : (0, a.default)(r)) && null !== r) {
							if(-1 !== t.indexOf(r)) return;
							t.push(r)
						}
						return r
					});
				return JSON.parse(r)
			}, t.merge = function() {
				for(var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
				return r.forEach(function(t) {
					w(e, t)
				}), e
			}, t.fillUndef = function(e, t) {
				return M(t, function(t, r) {
					O(e[t]) && (e[t] = r)
				}), e
			}, t.checkWithDefault = function(e, t, r) {
				var n = e[t] || e[t.toLowerCase()];
				P(n) && (n = r, e[t] = n);
				return n
			}, t.fetch = function(e, t) {
				return M(e, function(r, n) {
					A(t[r]) && (e[r] = t[r])
				}), e
			}, t.string2object = function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
					r = {};
				return e.split(t).forEach(function(e) {
					var t = e.split("="),
						n = t.shift();
					n && (r[decodeURIComponent(n)] = decodeURIComponent(t.join("=")))
				}), r
			}, t.object2string = N, t.genUrlSep = function(e) {
				return e.indexOf("?") < 0 ? "?" : "&"
			}, t.object2query = function(e) {
				return N(e, "&", !0)
			}, t.isFileInput = j, t.getKeys = function(e, t) {
				var r = Object.keys(e);
				t && r.sort(function(t, r) {
					var n = j(e[t]),
						i = j(e[r]);
					return n === i ? 0 : n ? 1 : -1
				});
				return r
			};
			t.o = {}, t.emptyObj = {}, t.f = function() {}, t.emptyFunc = function() {}, t.regBlank = /\s+/gi, t.regWhiteSpace = /\s+/gi;

			function o() {
				return "undefined" != typeof window ? window : void 0 !== e ? e : {}
			}

			function s(e, t) {
				t = t || 2;
				for(var r = "" + e; r.length < t;) r = "0" + r;
				return r
			}

			function c(e) {
				return "" + e.getFullYear()
			}

			function u(e) {
				return s(e.getMonth() + 1)
			}

			function d(e) {
				return s(e.getDate())
			}

			function l(e) {
				return s(e.getHours())
			}

			function f(e) {
				return s(e.getMinutes())
			}

			function p(e) {
				return s(e.getSeconds())
			}

			function h(e) {
				return s(e.getMilliseconds(), 3)
			}
			var m, v;
			t.format = (m = /yyyy|MM|dd|hh|mm|ss|SSS/g, v = {
				yyyy: c,
				MM: u,
				dd: d,
				hh: l,
				mm: f,
				ss: p,
				SSS: h
			}, function(e, t) {
				return e = new Date(e), isNaN(+e) ? "invalid date" : (t = t || "yyyy-MM-dd").replace(m, function(t) {
					return v[t](e)
				})
			});

			function _(e) {
				return Object.prototype.toString.call(e).slice(8, -1)
			}

			function y(e) {
				return _(e).toLowerCase()
			}

			function R(e) {
				return "string" === y(e)
			}

			function g(e) {
				return "array" === y(e)
			}

			function C(e) {
				return "function" === y(e)
			}

			function E(e) {
				return "date" === y(e)
			}

			function T(e) {
				return null === e
			}

			function b(e) {
				return null !== e
			}

			function O(e) {
				return void 0 === e
			}

			function S(e) {
				return void 0 !== e
			}

			function A(e) {
				return S(e) && b(e)
			}

			function P(e) {
				return O(e) || T(e)
			}

			function I(e) {
				return A(e) && "object" === y(e)
			}
			var k = t.addEventListener = function(e, t, r) {
					e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, r)
				},
				L = t.on = k,
				W = t.removeEventListener = function(e, t, r) {
					e.removeEventListener ? e.removeEventListener(t, r, !1) : e.detachEvent && e.detachEvent("on" + t, r)
				},
				D = t.off = W;

			function M() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
					r = arguments[2];
				for(var n in e) e.hasOwnProperty(n) && t.call(r, n, e[n])
			}

			function w(e, t) {
				M(t, function(t, r) {
					e[t] = r
				})
			}
			var B;
			t.uniqueID = (B = 0, function() {
				return "" + B++
			});

			function G(e) {
				return R(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
			}

			function N(e, t, r) {
				if(!e) return "";
				var n = [];
				return M(e, function(e, t) {
					C(t) || (E(t) ? t = t.getTime() : g(t) ? t = t.join(",") : I(t) && (t = JSON.stringify(t)), r && (t = encodeURIComponent(t)), n.push(encodeURIComponent(e) + "=" + t))
				}), n.join(t || ",")
			}
			t.url2origin = function() {
				var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
				return function(t) {
					return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
				}
			}();

			function j(e) {
				var t = o();
				return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
			}
		}).call(this, r(30))
	}, function(e, t, r) {
		var n = r(15),
			i = r(61),
			a = r(42),
			o = Object.defineProperty;
		t.f = r(14) ? Object.defineProperty : function(e, t, r) {
			if(n(e), t = a(t, !0), n(r), i) try {
				return o(e, t, r)
			} catch(e) {}
			if("get" in r || "set" in r) throw TypeError("Accessors not supported!");
			return "value" in r && (e[t] = r.value), e
		}
	}, function(e, t) {
		var r = {}.hasOwnProperty;
		e.exports = function(e, t) {
			return r.call(e, t)
		}
	}, function(e, t, r) {
		e.exports = !r(20)(function() {
			return 7 != Object.defineProperty({}, "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, function(e, t, r) {
		var n = r(18);
		e.exports = function(e) {
			if(!n(e)) throw TypeError(e + " is not an object!");
			return e
		}
	}, function(e, t, r) {
		var n = r(7),
			i = r(6),
			a = r(35),
			o = r(19),
			s = r(13),
			c = function(e, t, r) {
				var u, d, l, f = e & c.F,
					p = e & c.G,
					h = e & c.S,
					m = e & c.P,
					v = e & c.B,
					_ = e & c.W,
					y = p ? i : i[t] || (i[t] = {}),
					R = y.prototype,
					g = p ? n : h ? n[t] : (n[t] || {}).prototype;
				for(u in p && (r = t), r)(d = !f && g && void 0 !== g[u]) && s(y, u) || (l = d ? g[u] : r[u], y[u] = p && "function" != typeof g[u] ? r[u] : v && d ? a(l, n) : _ && g[u] == l ? function(e) {
					var t = function(t, r, n) {
						if(this instanceof e) {
							switch(arguments.length) {
								case 0:
									return new e;
								case 1:
									return new e(t);
								case 2:
									return new e(t, r)
							}
							return new e(t, r, n)
						}
						return e.apply(this, arguments)
					};
					return t.prototype = e.prototype, t
				}(l) : m && "function" == typeof l ? a(Function.call, l) : l, m && ((y.virtual || (y.virtual = {}))[u] = l, e & c.R && R && !R[u] && o(R, u, l)))
			};
		c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
	}, function(e, t, r) {
		var n = r(58),
			i = r(43);
		e.exports = function(e) {
			return n(i(e))
		}
	}, function(e, t) {
		e.exports = function(e) {
			return "object" == typeof e ? null !== e : "function" == typeof e
		}
	}, function(e, t, r) {
		var n = r(12),
			i = r(26);
		e.exports = r(14) ? function(e, t, r) {
			return n.f(e, t, i(1, r))
		} : function(e, t, r) {
			return e[t] = r, e
		}
	}, function(e, t) {
		e.exports = function(e) {
			try {
				return !!e()
			} catch(e) {
				return !0
			}
		}
	}, function(e, t, r) {
		"use strict";
		(function(t) {
			var n, i = r(10),
				a = (n = i) && n.__esModule ? n : {
					default: n
				};
			var o = function() {
				var e = "object" === (void 0 === t ? "undefined" : (0, a.default)(t)) ? t : window,
					r = Math.pow(2, 53) - 1,
					n = /\bOpera/,
					i = Object.prototype,
					o = i.hasOwnProperty,
					s = i.toString;

				function c(e) {
					return(e = String(e)).charAt(0).toUpperCase() + e.slice(1)
				}

				function u(e) {
					return e = h(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : c(e)
				}

				function d(e, t) {
					for(var r in e) o.call(e, r) && t(e[r], r, e)
				}

				function l(e) {
					return null == e ? c(e) : s.call(e).slice(8, -1)
				}

				function f(e) {
					return String(e).replace(/([ -])(?!$)/g, "$1?")
				}

				function p(e, t) {
					var n = null;
					return function(e, t) {
						var n = -1,
							i = e ? e.length : 0;
						if("number" == typeof i && i > -1 && i <= r)
							for(; ++n < i;) t(e[n], n, e);
						else d(e, t)
					}(e, function(r, i) {
						n = t(n, r, i, e)
					}), n
				}

				function h(e) {
					return String(e).replace(/^ +| +$/g, "")
				}
				return function t(r) {
					var i = e,
						o = r && "object" === (void 0 === r ? "undefined" : (0, a.default)(r)) && "String" != l(r);
					o && (i = r, r = null);
					var c = i.navigator || {},
						m = c.userAgent || "";
					r || (r = m);
					var v, _, y, R, g, C = o ? !!c.likeChrome : /\bChrome\b/.test(r) && !/internal|\n/i.test(s.toString()),
						E = o ? "Object" : "ScriptBridgingProxyObject",
						T = o ? "Object" : "Environment",
						b = o && i.java ? "JavaPackage" : l(i.java),
						O = o ? "Object" : "RuntimeObject",
						S = /\bJava/.test(b) && i.java,
						A = S && l(i.environment) == T,
						P = S ? "a" : "α",
						I = S ? "b" : "β",
						k = i.document || {},
						L = i.operamini || i.opera,
						W = n.test(W = o && L ? L["[[Class]]"] : l(L)) ? W : L = null,
						D = r,
						M = [],
						w = null,
						B = r == m,
						G = B && L && "function" == typeof L.version && L.version(),
						N = p([{
							label: "EdgeHTML",
							pattern: "Edge"
						}, "Trident", {
							label: "WebKit",
							pattern: "AppleWebKit"
						}, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function(e, t) {
							return e || RegExp("\\b" + (t.pattern || f(t)) + "\\b", "i").exec(r) && (t.label || t)
						}),
						j = function(e) {
							return p(e, function(e, t) {
								return e || RegExp("\\b" + (t.pattern || f(t)) + "\\b", "i").exec(r) && (t.label || t)
							})
						}(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
							label: "Microsoft Edge",
							pattern: "Edge"
						}, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
							label: "Samsung Internet",
							pattern: "SamsungBrowser"
						}, "SeaMonkey", {
							label: "Silk",
							pattern: "(?:Cloud9|Silk-Accelerated)"
						}, "Sleipnir", "SlimBrowser", {
							label: "SRWare Iron",
							pattern: "Iron"
						}, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
							label: "Opera Mini",
							pattern: "OPiOS"
						}, "Opera", {
							label: "Opera",
							pattern: "OPR"
						}, "Chrome", {
							label: "Chrome Mobile",
							pattern: "(?:CriOS|CrMo)"
						}, {
							label: "Firefox",
							pattern: "(?:Firefox|Minefield)"
						}, {
							label: "Firefox for iOS",
							pattern: "FxiOS"
						}, {
							label: "IE",
							pattern: "IEMobile"
						}, {
							label: "IE",
							pattern: "MSIE"
						}, "Safari"]),
						x = V([{
							label: "BlackBerry",
							pattern: "BB10"
						}, "BlackBerry", {
							label: "Galaxy S",
							pattern: "GT-I9000"
						}, {
							label: "Galaxy S2",
							pattern: "GT-I9100"
						}, {
							label: "Galaxy S3",
							pattern: "GT-I9300"
						}, {
							label: "Galaxy S4",
							pattern: "GT-I9500"
						}, {
							label: "Galaxy S5",
							pattern: "SM-G900"
						}, {
							label: "Galaxy S6",
							pattern: "SM-G920"
						}, {
							label: "Galaxy S6 Edge",
							pattern: "SM-G925"
						}, {
							label: "Galaxy S7",
							pattern: "SM-G930"
						}, {
							label: "Galaxy S7 Edge",
							pattern: "SM-G935"
						}, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
							label: "Kindle Fire",
							pattern: "(?:Cloud9|Silk-Accelerated)"
						}, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
							label: "Wii U",
							pattern: "WiiU"
						}, "Wii", "Xbox One", {
							label: "Xbox 360",
							pattern: "Xbox"
						}, "Xoom"]),
						F = function(e) {
							return p(e, function(e, t, n) {
								return e || (t[x] || t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(x)] || RegExp("\\b" + f(n) + "(?:\\b|\\w*\\d)", "i").exec(r)) && n
							})
						}({
							Apple: {
								iPad: 1,
								iPhone: 1,
								iPod: 1
							},
							Archos: {},
							Amazon: {
								Kindle: 1,
								"Kindle Fire": 1
							},
							Asus: {
								Transformer: 1
							},
							"Barnes & Noble": {
								Nook: 1
							},
							BlackBerry: {
								PlayBook: 1
							},
							Google: {
								"Google TV": 1,
								Nexus: 1
							},
							HP: {
								TouchPad: 1
							},
							HTC: {},
							LG: {},
							Microsoft: {
								Xbox: 1,
								"Xbox One": 1
							},
							Motorola: {
								Xoom: 1
							},
							Nintendo: {
								"Wii U": 1,
								Wii: 1
							},
							Nokia: {
								Lumia: 1
							},
							Samsung: {
								"Galaxy S": 1,
								"Galaxy S2": 1,
								"Galaxy S3": 1,
								"Galaxy S4": 1
							},
							Sony: {
								PlayStation: 1,
								"PlayStation Vita": 1
							}
						}),
						U = function(e) {
							return p(e, function(e, t) {
								var n = t.pattern || f(t);
								return !e && (e = RegExp("\\b" + n + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(r)) && (e = function(e, t, r) {
									var n = {
										"10.0": "10",
										6.4: "10 Technical Preview",
										6.3: "8.1",
										6.2: "8",
										6.1: "Server 2008 R2 / 7",
										"6.0": "Server 2008 / Vista",
										5.2: "Server 2003 / XP 64-bit",
										5.1: "XP",
										5.01: "2000 SP1",
										"5.0": "2000",
										"4.0": "NT",
										"4.90": "ME"
									};
									return t && r && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (n = n[/[\d.]+$/.exec(e)]) && (e = "Windows " + n), e = String(e), t && r && (e = e.replace(RegExp(t, "i"), r)), e = u(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
								}(e, n, t.label || t)), e
							})
						}(["Windows Phone", "Android", "CentOS", {
							label: "Chrome OS",
							pattern: "CrOS"
						}, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);

					function V(e) {
						return p(e, function(e, t) {
							var n = t.pattern || f(t);
							return !e && (e = RegExp("\\b" + n + " *\\d+[.\\w_]*", "i").exec(r) || RegExp("\\b" + n + " *\\w+-[\\w]*", "i").exec(r) || RegExp("\\b" + n + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(r)) && ((e = String(t.label && !RegExp(n, "i").test(t.label) ? t.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) && (e[0] += " " + e[1]), t = t.label || t, e = u(e[0].replace(RegExp(n, "i"), t).replace(RegExp("; *(?:" + t + "[_-])?", "i"), " ").replace(RegExp("(" + t + ")[-_.]?(\\w)", "i"), "$1 $2"))), e
						})
					}
					if(N && (N = [N]), F && !x && (x = V([F])), (v = /\bGoogle TV\b/.exec(x)) && (x = v[0]), /\bSimulator\b/i.test(r) && (x = (x ? x + " " : "") + "Simulator"), "Opera Mini" == j && /\bOPiOS\b/.test(r) && M.push("running in Turbo/Uncompressed mode"), "IE" == j && /\blike iPhone OS\b/.test(r) ? (F = (v = t(r.replace(/like iPhone OS/, ""))).manufacturer, x = v.product) : /^iP/.test(x) ? (j || (j = "Safari"), U = "iOS" + ((v = / OS ([\d_]+)/i.exec(r)) ? " " + v[1].replace(/_/g, ".") : "")) : "Konqueror" != j || /buntu/i.test(U) ? F && "Google" != F && (/Chrome/.test(j) && !/\bMobile Safari\b/i.test(r) || /\bVita\b/.test(x)) || /\bAndroid\b/.test(U) && /^Chrome/.test(j) && /\bVersion\//i.test(r) ? (j = "Android Browser", U = /\bAndroid\b/.test(U) ? U : "Android") : "Silk" == j ? (/\bMobi/i.test(r) || (U = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(r) && M.unshift("accelerated")) : "PaleMoon" == j && (v = /\bFirefox\/([\d.]+)\b/.exec(r)) ? M.push("identifying as Firefox " + v[1]) : "Firefox" == j && (v = /\b(Mobile|Tablet|TV)\b/i.exec(r)) ? (U || (U = "Firefox OS"), x || (x = v[1])) : !j || (v = !/\bMinefield\b/i.test(r) && /\b(?:Firefox|Safari)\b/.exec(j)) ? (j && !x && /[\/,]|^[^(]+?\)/.test(r.slice(r.indexOf(v + "/") + 8)) && (j = null), (v = x || F || U) && (x || F || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(U)) && (j = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(U) ? U : v) + " Browser")) : "Electron" == j && (v = (/\bChrome\/([\d.]+)\b/.exec(r) || 0)[1]) && M.push("Chromium " + v) : U = "Kubuntu", G || (G = p(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", f(j), "(?:Firefox|Minefield|NetFront)"], function(e, t) {
							return e || (RegExp(t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(r) || 0)[1] || null
						})), (v = ("iCab" == N && parseFloat(G) > 3 ? "WebKit" : /\bOpera\b/.test(j) && (/\bOPR\b/.test(r) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(r) && !/^(?:Trident|EdgeHTML)$/.test(N) && "WebKit" || !N && /\bMSIE\b/i.test(r) && ("Mac OS" == U ? "Tasman" : "Trident") || "WebKit" == N && /\bPlayStation\b(?! Vita\b)/i.test(j) && "NetFront") && (N = [v]), "IE" == j && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(r) || 0)[1]) ? (j += " Mobile", U = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(r) ? (j = "IE Mobile", U = "Windows Phone 8.x", M.unshift("desktop mode"), G || (G = (/\brv:([\d.]+)/.exec(r) || 0)[1])) : "IE" != j && "Trident" == N && (v = /\brv:([\d.]+)/.exec(r)) && (j && M.push("identifying as " + j + (G ? " " + G : "")), j = "IE", G = v[1]), B) {
						if(R = "global", g = null != (y = i) ? (0, a.default)(y[R]) : "number", /^(?:boolean|number|string|undefined)$/.test(g) || "object" == g && !y[R]) l(v = i.runtime) == E ? (j = "Adobe AIR", U = v.flash.system.Capabilities.os) : l(v = i.phantom) == O ? (j = "PhantomJS", G = (v = v.version || null) && v.major + "." + v.minor + "." + v.patch) : "number" == typeof k.documentMode && (v = /\bTrident\/(\d+)/i.exec(r)) ? (G = [G, k.documentMode], (v = +v[1] + 4) != G[1] && (M.push("IE " + G[1] + " mode"), N && (N[1] = ""), G[1] = v), G = "IE" == j ? String(G[1].toFixed(1)) : G[0]) : "number" == typeof k.documentMode && /^(?:Chrome|Firefox)\b/.test(j) && (M.push("masking as " + j + " " + G), j = "IE", G = "11.0", N = ["Trident"], U = "Windows");
						else if(S && (D = (v = S.lang.System).getProperty("os.arch"), U = U || v.getProperty("os.name") + " " + v.getProperty("os.version")), A) {
							try {
								G = i.require("ringo/engine").version.join("."), j = "RingoJS"
							} catch(e) {
								(v = i.system) && v.global.system == i.system && (j = "Narwhal", U || (U = v[0].os || null))
							}
							j || (j = "Rhino")
						} else "object" === (0, a.default)(i.process) && !i.process.browser && (v = i.process) && ("object" === (0, a.default)(v.versions) && ("string" == typeof v.versions.electron ? (M.push("Node " + v.versions.node), j = "Electron", G = v.versions.electron) : "string" == typeof v.versions.nw && (M.push("Chromium " + G, "Node " + v.versions.node), j = "NW.js", G = v.versions.nw)), j || (j = "Node.js", D = v.arch, U = v.platform, G = (G = /[\d.]+/.exec(v.version)) ? G[0] : null));
						U = U && u(U)
					}
					if(G && (v = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(G) || /(?:alpha|beta)(?: ?\d)?/i.exec(r + ";" + (B && c.appMinorVersion)) || /\bMinefield\b/i.test(r) && "a") && (w = /b/i.test(v) ? "beta" : "alpha", G = G.replace(RegExp(v + "\\+?$"), "") + ("beta" == w ? I : P) + (/\d+\+?/.exec(v) || "")), "Fennec" == j || "Firefox" == j && /\b(?:Android|Firefox OS)\b/.test(U)) j = "Firefox Mobile";
					else if("Maxthon" == j && G) G = G.replace(/\.[\d.]+/, ".x");
					else if(/\bXbox\b/i.test(x)) "Xbox 360" == x && (U = null), "Xbox 360" == x && /\bIEMobile\b/.test(r) && M.unshift("mobile mode");
					else if(!/^(?:Chrome|IE|Opera)$/.test(j) && (!j || x || /Browser|Mobi/.test(j)) || "Windows CE" != U && !/Mobi/i.test(r))
						if("IE" == j && B) try {
							null === i.external && M.unshift("platform preview")
						} catch(e) {
							M.unshift("embedded")
						} else(/\bBlackBerry\b/.test(x) || /\bBB10\b/.test(r)) && (v = (RegExp(x.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(r) || 0)[1] || G) ? (U = ((v = [v, /BB10/.test(r)])[1] ? (x = null, F = "BlackBerry") : "Device Software") + " " + v[0], G = null) : this != d && "Wii" != x && (B && L || /Opera/.test(j) && /\b(?:MSIE|Firefox)\b/i.test(r) || "Firefox" == j && /\bOS X (?:\d+\.){2,}/.test(U) || "IE" == j && (U && !/^Win/.test(U) && G > 5.5 || /\bWindows XP\b/.test(U) && G > 8 || 8 == G && !/\bTrident\b/.test(r))) && !n.test(v = t.call(d, r.replace(n, "") + ";")) && v.name && (v = "ing as " + v.name + ((v = v.version) ? " " + v : ""), n.test(j) ? (/\bIE\b/.test(v) && "Mac OS" == U && (U = null), v = "identify" + v) : (v = "mask" + v, j = W ? u(W.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(v) && (U = null), B || (G = null)), N = ["Presto"], M.push(v));
						else j += " Mobile";
					(v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(r) || 0)[1]) && (v = [parseFloat(v.replace(/\.(\d)$/, ".0$1")), v], "Safari" == j && "+" == v[1].slice(-1) ? (j = "WebKit Nightly", w = "alpha", G = v[1].slice(0, -1)) : G != v[1] && G != (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(r) || 0)[1]) || (G = null), v[1] = (/\bChrome\/([\d.]+)/i.exec(r) || 0)[1], 537.36 == v[0] && 537.36 == v[2] && parseFloat(v[1]) >= 28 && "WebKit" == N && (N = ["Blink"]), B && (C || v[1]) ? (N && (N[1] = "like Chrome"), v = v[1] || ((v = v[0]) < 530 ? 1 : v < 532 ? 2 : v < 532.05 ? 3 : v < 533 ? 4 : v < 534.03 ? 5 : v < 534.07 ? 6 : v < 534.1 ? 7 : v < 534.13 ? 8 : v < 534.16 ? 9 : v < 534.24 ? 10 : v < 534.3 ? 11 : v < 535.01 ? 12 : v < 535.02 ? "13+" : v < 535.07 ? 15 : v < 535.11 ? 16 : v < 535.19 ? 17 : v < 536.05 ? 18 : v < 536.1 ? 19 : v < 537.01 ? 20 : v < 537.11 ? "21+" : v < 537.13 ? 23 : v < 537.18 ? 24 : v < 537.24 ? 25 : v < 537.36 ? 26 : "Blink" != N ? "27" : "28")) : (N && (N[1] = "like Safari"), v = (v = v[0]) < 400 ? 1 : v < 500 ? 2 : v < 526 ? 3 : v < 533 ? 4 : v < 534 ? "4+" : v < 535 ? 5 : v < 537 ? 6 : v < 538 ? 7 : v < 601 ? 8 : "8"), N && (N[1] += " " + (v += "number" == typeof v ? ".x" : /[.+]/.test(v) ? "" : "+")), "Safari" == j && (!G || parseInt(G) > 45) && (G = v)), "Opera" == j && (v = /\bzbov|zvav$/.exec(U)) ? (j += " ", M.unshift("desktop mode"), "zvav" == v ? (j += "Mini", G = null) : j += "Mobile", U = U.replace(RegExp(" *" + v + "$"), "")) : "Safari" == j && /\bChrome\b/.exec(N && N[1]) && (M.unshift("desktop mode"), j = "Chrome Mobile", G = null, /\bOS X\b/.test(U) ? (F = "Apple", U = "iOS 4.3+") : U = null), G && 0 == G.indexOf(v = /[\d.]+$/.exec(U)) && r.indexOf("/" + v + "-") > -1 && (U = h(U.replace(v, ""))), N && !/\b(?:Avant|Nook)\b/.test(j) && (/Browser|Lunascape|Maxthon/.test(j) || "Safari" != j && /^iOS/.test(U) && /\bSafari\b/.test(N[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(j) && N[1]) && (v = N[N.length - 1]) && M.push(v), M.length && (M = ["(" + M.join("; ") + ")"]), F && x && x.indexOf(F) < 0 && M.push("on " + F), x && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + x), U && (v = / ([\d.+]+)$/.exec(U), _ = v && "/" == U.charAt(U.length - v[0].length - 1), U = {
						architecture: 32,
						family: v && !_ ? U.replace(v[0], "") : U,
						version: v ? v[1] : null,
						toString: function() {
							var e = this.version;
							return this.family + (e && !_ ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
						}
					}), (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(D)) && !/\bi686\b/i.test(D) ? (U && (U.architecture = 64, U.family = U.family.replace(RegExp(" *" + v), "")), j && (/\bWOW64\b/i.test(r) || B && /\w(?:86|32)$/.test(c.cpuClass || c.platform) && !/\bWin64; x64\b/i.test(r)) && M.unshift("32-bit")) : U && /^OS X/.test(U.family) && "Chrome" == j && parseFloat(G) >= 39 && (U.architecture = 64), r || (r = null);
					var H = {};
					return H.description = r, H.layout = N && N[0], H.manufacturer = F, H.name = j, H.prerelease = w, H.product = x, H.ua = r, H.version = j && G, H.os = U || {
						architecture: null,
						family: null,
						version: null,
						toString: function() {
							return "null"
						}
					}, H.parse = t, H.toString = function() {
						return this.description || ""
					}, H.version && M.unshift(G), H.name && M.unshift(j), U && j && (U != String(U).split(" ")[0] || U != j.split(" ")[0] && !x) && M.push(x ? "(" + U + ")" : "on " + U), M.length && (H.description = M.join(" ")), H
				}()
			}();
			e.exports = o
		}).call(this, r(30))
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(401);
		Object.defineProperty(t, "RTC_EVENTS", {
			enumerable: !0,
			get: function() {
				return n.RTC_EVENTS
			}
		}), Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return n.BeCallingEvent
			}
		}), Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return n.CallResponseEvent
			}
		}), Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return n.CallerAckSyncEvent
			}
		}), Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return n.HangupEvent
			}
		}), Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return n.ControlEvent
			}
		}), Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return n.JoinChannelEvent
			}
		}), Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return n.RemoteTrackEvent
			}
		}), Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return n.LeaveChannelEvent
			}
		});
		var i = r(389);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return i.PushConfig
			}
		}), Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig
			}
		}), Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4P2P
			}
		}), Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4Meeting
			}
		}), Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4Live
			}
		}), Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return i.NetcallOption
			}
		}), Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		}), Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return i.NRTCOption
			}
		}), Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return i.CallRequestParam
			}
		}), Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ResponseRequestParam
			}
		}), Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ControlRequestParam
			}
		}), Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return i.CreateChannelRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelRequestParam
			}
		}), Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoScaleRequestParam
			}
		}), Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return i.StartDeviceRequestParam
			}
		}), Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return i.StartRemoteStreamRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoViewSizeRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoViewRemoteSizeRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelRequestParam4NRTC
			}
		}), Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return i.validateVideoQuality
			}
		}), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return i.validateVideoFrameRate
			}
		}), Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return i.CONTROL_TYPE
			}
		}), Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return i.CONFIG_MAP
			}
		}), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DECTECT_RESULT_TYPE
			}
		}), Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DECTECT_TYPE
			}
		}), Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DEVICE_TYPE
			}
		}), Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return i.NETCALL_TYPE
			}
		}), Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return i.SCALE_TYPE
			}
		}), Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return i.SPLIT_MODE
			}
		}), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_ENCODE_MODE
			}
		}), Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return i.ROLE_FOR_MEETING
			}
		}), Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return i.HANGUP_TYPE
			}
		}), Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return i.SESSION_MODE
			}
		}), Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NRTC_OPTION
			}
		}), Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return i.GATE_WAY_RESPONSE_CODE
			}
		});
		var a = r(340);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_JOIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_LOGIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_ERROR_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.ICE_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.ICE_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.LOGIN_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "BROADCASE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.BROADCASE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "JOIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.JOIN_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_ACK_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_NODE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_NODE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.LOGIN_ACK_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.LOGIN_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.LOGOUT_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "TOUSER_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.TOUSER_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return a.WEBRTC_GATE_WAY_API
			}
		}), Object.defineProperty(t, "WHITEBOARD_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return a.WHITEBOARD_GATE_WAY_API
			}
		}), Object.defineProperty(t, "WHITEBOARD_SERIALIZE", {
			enumerable: !0,
			get: function() {
				return a.WHITEBOARD_SERIALIZE
			}
		}), Object.defineProperty(t, "WHITEBOARD_UNSERIALIZE", {
			enumerable: !0,
			get: function() {
				return a.WHITEBOARD_UNSERIALIZE
			}
		})
	}, function(e, t) {
		e.exports = {}
	}, , , function(e, t) {
		e.exports = function(e, t) {
			return {
				enumerable: !(1 & e),
				configurable: !(2 & e),
				writable: !(4 & e),
				value: t
			}
		}
	}, function(e, t) {
		t.f = {}.propertyIsEnumerable
	}, function(e, t) {
		var r = 0,
			n = Math.random();
		e.exports = function(e) {
			return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + n).toString(36))
		}
	}, function(e, t, r) {
		var n = r(59),
			i = r(39);
		e.exports = Object.keys || function(e) {
			return n(e, i)
		}
	}, function(e, t) {
		var r;
		r = function() {
			return this
		}();
		try {
			r = r || Function("return this")() || (0, eval)("this")
		} catch(e) {
			"object" == typeof window && (r = window)
		}
		e.exports = r
	}, , function(e, t) {
		var r = {}.toString;
		e.exports = function(e) {
			return r.call(e).slice(8, -1)
		}
	}, function(e, t, r) {
		var n = r(12).f,
			i = r(13),
			a = r(5)("toStringTag");
		e.exports = function(e, t, r) {
			e && !i(e = r ? e : e.prototype, a) && n(e, a, {
				configurable: !0,
				value: t
			})
		}
	}, function(e, t) {
		e.exports = !0
	}, function(e, t, r) {
		var n = r(55);
		e.exports = function(e, t, r) {
			if(n(e), void 0 === t) return e;
			switch(r) {
				case 1:
					return function(r) {
						return e.call(t, r)
					};
				case 2:
					return function(r, n) {
						return e.call(t, r, n)
					};
				case 3:
					return function(r, n, i) {
						return e.call(t, r, n, i)
					}
			}
			return function() {
				return e.apply(t, arguments)
			}
		}
	}, function(e, t) {
		t.f = Object.getOwnPropertySymbols
	}, function(e, t, r) {
		var n = r(7),
			i = r(6),
			a = r(34),
			o = r(38),
			s = r(12).f;
		e.exports = function(e) {
			var t = i.Symbol || (i.Symbol = a ? {} : n.Symbol || {});
			"_" == e.charAt(0) || e in t || s(t, e, {
				value: o.f(e)
			})
		}
	}, function(e, t, r) {
		t.f = r(5)
	}, function(e, t) {
		e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
	}, function(e, t, r) {
		var n = r(7),
			i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
		e.exports = function(e) {
			return i[e] || (i[e] = {})
		}
	}, function(e, t, r) {
		var n = r(40)("keys"),
			i = r(28);
		e.exports = function(e) {
			return n[e] || (n[e] = i(e))
		}
	}, function(e, t, r) {
		var n = r(18);
		e.exports = function(e, t) {
			if(!n(e)) return e;
			var r, i;
			if(t && "function" == typeof(r = e.toString) && !n(i = r.call(e))) return i;
			if("function" == typeof(r = e.valueOf) && !n(i = r.call(e))) return i;
			if(!t && "function" == typeof(r = e.toString) && !n(i = r.call(e))) return i;
			throw TypeError("Can't convert object to primitive value")
		}
	}, function(e, t) {
		e.exports = function(e) {
			if(null == e) throw TypeError("Can't call method on  " + e);
			return e
		}
	}, function(e, t) {
		var r = Math.ceil,
			n = Math.floor;
		e.exports = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e)
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(224);
		Object.defineProperty(t, "element", {
			enumerable: !0,
			get: function() {
				return n.element
			}
		});
		var i = r(223);
		Object.defineProperty(t, "ajax", {
			enumerable: !0,
			get: function() {
				return i.ajax
			}
		});
		var a = r(222);
		Object.defineProperty(t, "tool", {
			enumerable: !0,
			get: function() {
				return a.tool
			}
		});
		var o = r(127);
		Object.defineProperty(t, "ApiInvokeData", {
			enumerable: !0,
			get: function() {
				return o.ApiInvokeData
			}
		}), Object.defineProperty(t, "DataRtc", {
			enumerable: !0,
			get: function() {
				return o.DataRtc
			}
		}), Object.defineProperty(t, "DataStats", {
			enumerable: !0,
			get: function() {
				return o.DataStats
			}
		});
		var s = r(218);
		Object.defineProperty(t, "Device", {
			enumerable: !0,
			get: function() {
				return s.Device
			}
		}), Object.defineProperty(t, "MDevices", {
			enumerable: !0,
			get: function() {
				return s.MDevices
			}
		}), Object.defineProperty(t, "Recorder", {
			enumerable: !0,
			get: function() {
				return s.Recorder
			}
		}), Object.defineProperty(t, "MStream", {
			enumerable: !0,
			get: function() {
				return s.MStream
			}
		});
		var c = r(77);
		Object.defineProperty(t, "RtcUtil", {
			enumerable: !0,
			get: function() {
				return c.RtcUtil
			}
		}), Object.defineProperty(t, "SdpUtil", {
			enumerable: !0,
			get: function() {
				return c.SdpUtil
			}
		}), Object.defineProperty(t, "RtcStats", {
			enumerable: !0,
			get: function() {
				return c.RtcStats
			}
		}), Object.defineProperty(t, "RtcStatsNew", {
			enumerable: !0,
			get: function() {
				return c.RtcStatsNew
			}
		}), Object.defineProperty(t, "RtcSupport", {
			enumerable: !0,
			get: function() {
				return c.RtcSupport
			}
		});
		var u = r(126);
		Object.defineProperty(t, "WebAudio", {
			enumerable: !0,
			get: function() {
				return u.WebAudio
			}
		})
	}, function(e, t, r) {
		var n = r(43);
		e.exports = function(e) {
			return Object(n(e))
		}
	}, function(e, t, r) {
		var n = r(15),
			i = r(104),
			a = r(39),
			o = r(41)("IE_PROTO"),
			s = function() {},
			c = function() {
				var e, t = r(52)("iframe"),
					n = a.length;
				for(t.style.display = "none", r(75).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[a[n]];
				return c()
			};
		e.exports = Object.create || function(e, t) {
			var r;
			return null !== e ? (s.prototype = n(e), r = new s, s.prototype = null, r[o] = e) : r = c(), void 0 === t ? r : i(r, t)
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(106)(!0);
		r(62)(String, "String", function(e) {
			this._t = String(e), this._i = 0
		}, function() {
			var e, t = this._t,
				r = this._i;
			return r >= t.length ? {
				value: void 0,
				done: !0
			} : (e = n(t, r), this._i += e.length, {
				value: e,
				done: !1
			})
		})
	}, , , function(e, t, r) {
		"use strict";
		var n = r(65),
			i = r(136),
			a = r(135);
		n.json = i, n.upload = a, e.exports = n
	}, function(e, t, r) {
		var n = r(18),
			i = r(7).document,
			a = n(i) && n(i.createElement);
		e.exports = function(e) {
			return a ? i.createElement(e) : {}
		}
	}, , function(e, t, r) {
		r(101);
		for(var n = r(7), i = r(19), a = r(23), o = r(5)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
			var u = s[c],
				d = n[u],
				l = d && d.prototype;
			l && !l[o] && i(l, o, u), a[u] = a.Array
		}
	}, function(e, t) {
		e.exports = function(e) {
			if("function" != typeof e) throw TypeError(e + " is not a function!");
			return e
		}
	}, function(e, t, r) {
		var n = r(27),
			i = r(26),
			a = r(17),
			o = r(42),
			s = r(13),
			c = r(61),
			u = Object.getOwnPropertyDescriptor;
		t.f = r(14) ? u : function(e, t) {
			if(e = a(e), t = o(t, !0), c) try {
				return u(e, t)
			} catch(e) {}
			if(s(e, t)) return i(!n.f.call(e, t), e[t])
		}
	}, function(e, t, r) {
		var n = r(59),
			i = r(39).concat("length", "prototype");
		t.f = Object.getOwnPropertyNames || function(e) {
			return n(e, i)
		}
	}, function(e, t, r) {
		var n = r(32);
		e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
			return "String" == n(e) ? e.split("") : Object(e)
		}
	}, function(e, t, r) {
		var n = r(13),
			i = r(17),
			a = r(103)(!1),
			o = r(41)("IE_PROTO");
		e.exports = function(e, t) {
			var r, s = i(e),
				c = 0,
				u = [];
			for(r in s) r != o && n(s, r) && u.push(r);
			for(; t.length > c;) n(s, r = t[c++]) && (~a(u, r) || u.push(r));
			return u
		}
	}, function(e, t, r) {
		e.exports = r(19)
	}, function(e, t, r) {
		e.exports = !r(14) && !r(20)(function() {
			return 7 != Object.defineProperty(r(52)("div"), "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, function(e, t, r) {
		"use strict";
		var n = r(34),
			i = r(16),
			a = r(60),
			o = r(19),
			s = r(23),
			c = r(105),
			u = r(33),
			d = r(74),
			l = r(5)("iterator"),
			f = !([].keys && "next" in [].keys()),
			p = function() {
				return this
			};
		e.exports = function(e, t, r, h, m, v, _) {
			c(r, t, h);
			var y, R, g, C = function(e) {
					if(!f && e in O) return O[e];
					switch(e) {
						case "keys":
						case "values":
							return function() {
								return new r(this, e)
							}
					}
					return function() {
						return new r(this, e)
					}
				},
				E = t + " Iterator",
				T = "values" == m,
				b = !1,
				O = e.prototype,
				S = O[l] || O["@@iterator"] || m && O[m],
				A = S || C(m),
				P = m ? T ? C("entries") : A : void 0,
				I = "Array" == t && O.entries || S;
			if(I && (g = d(I.call(new e))) !== Object.prototype && g.next && (u(g, E, !0), n || "function" == typeof g[l] || o(g, l, p)), T && S && "values" !== S.name && (b = !0, A = function() {
					return S.call(this)
				}), n && !_ || !f && !b && O[l] || o(O, l, A), s[t] = A, s[E] = p, m)
				if(y = {
						values: T ? A : C("values"),
						keys: v ? A : C("keys"),
						entries: P
					}, _)
					for(R in y) R in O || a(O, R, y[R]);
				else i(i.P + i.F * (f || b), t, y);
			return y
		}
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n, i = r(88),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = a.default || function(e) {
			for(var t = 1; t < arguments.length; t++) {
				var r = arguments[t];
				for(var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
			}
			return e
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = n.f,
			a = r(139);

		function o(e) {
			e.onload && this.once("load", e.onload), e.onerror && this.once("error", e.onerror), e.onbeforesend && this.once("beforesend", e.onbeforesend), e.onaftersend && this.once("aftersend", e.onaftersend);
			var t = (e = this.options = n.fetch({
				method: "GET",
				url: "",
				sync: !1,
				data: null,
				headers: {},
				cookie: !1,
				timeout: 6e4,
				type: "text",
				form: null,
				input: null,
				putFileAtEnd: !1,
				proxyUrl: ""
			}, e)).headers;
			n.notexist(t["Content-Type"]) && (t["Content-Type"] = "application/x-www-form-urlencoded"), this.send()
		}
		var s = o.prototype = Object.create(a.prototype);
		s.send = function() {
			var e = this,
				t = e.options;
			setTimeout(function() {
				try {
					try {
						e.emit("beforesend", t)
					} catch(e) {
						console.error("ignore error ajax beforesend,", e)
					}
					e.doSend()
				} catch(t) {
					console.error("ignore error server error,", t), e.onError("serverError", "请求失败:" + t.message)
				}
			}, 0)
		}, s.doSend = i, s.afterSend = function() {
			var e = this;
			setTimeout(function() {
				e.emit("aftersend", e.options)
			}, 0)
		}, s.onLoad = function(e) {
			var t = this.options,
				r = e.status,
				n = e.result;
			if(0 === ("" + r).indexOf("2")) {
				if("json" === t.type) try {
					n = JSON.parse(n)
				} catch(e) {
					return console.error("ignore error parse json,", e), void this.onError("parseError", n)
				}
				this.emit("load", n)
			} else this.onError("serverError", "服务器返回异常状态", {
				status: r,
				result: n
			})
		}, s.onError = function(e, t, r) {
			var i = n.isObject(r) ? r : {};
			i.code = e || "error", i.message = t || "发生错误", this.emit("error", i)
		}, s.onTimeout = function() {
			this.onError("timeout", "请求超时")
		}, s.abort = function() {
			this.onError("abort", "客户端中止")
		}, s.header = function(e) {
			var t = this;
			if(!n.isArray(e)) return t.getResponseHeader(e || "");
			var r = {};
			return e.forEach(function(e) {
				r[e] = t.header(e)
			}), r
		}, s.getResponseHeader = i, s.destroy = i, e.exports = o
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = r(140),
			a = r(138),
			o = r(137),
			s = {},
			c = n.f;

		function u(e) {
			var t = e.upload = "multipart/form-data" === (e.headers || n.o)["Content-Type"],
				r = !1;
			try {
				r = (location.protocol + "//" + location.host).toLowerCase() !== n.url2origin(e.url)
			} catch(e) {}
			return e.cors = r, t || r || e.mode ? function(e) {
				var t = e.mode,
					r = i,
					s = n.getGlobal();
				return !s.FormData && s.document && (t = "iframe"), "iframe" === t && (r = e.upload ? a : o), new r(e)
			}(e) : new i(e)
		}

		function d(e, t, r) {
			var n = s[e];
			if(n) {
				"onload" === t && n.result && (r = function(e, t) {
						t = {
							data: t
						};
						var r = e.result.headers;
						return r && (t.headers = e.req.header(r)), t
					}(n, r)),
					function(e) {
						var t = s[e];
						t && (t.req.destroy(), delete s[e])
					}(e);
				var i = {
					type: t,
					result: r
				};
				c(i), i.stopped || n[t](i.result)
			}
		}

		function l(e, t) {
			var r = n.genUrlSep(e);
			return t = t || "", n.isObject(t) && (t = n.object2query(t)), t && (e += r + t), e
		}

		function f(e, t) {
			t = t || {};
			var r = n.uniqueID(),
				i = {
					result: t.result,
					onload: t.onload || n.f,
					onerror: t.onerror || n.f
				};
			s[r] = i, t.onload = function(e, t) {
				d(e, "onload", t)
			}.bind(null, r), t.onerror = function(e, t) {
				d(e, "onerror", t)
			}.bind(null, r), t.query && (e = l(e, t.query));
			var a = t.method || "";
			return a && !/get/i.test(a) || !t.data || (e = l(e, t.data), t.data = null), t.url = e, i.req = u(t), r
		}
		f.filter = function(e) {
			n.isFunction(e) && (c = e)
		}, f.abort = function(e) {
			var t = s[e];
			t && t.req.abort()
		}, e.exports = f
	}, , function(e, t, r) {
		var n = r(44),
			i = Math.min;
		e.exports = function(e) {
			return e > 0 ? i(n(e), 9007199254740991) : 0
		}
	}, function(e, t, r) {
		"use strict";
		var n = !0,
			i = !0,
			a = {
				disableLog: function(e) {
					return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (n = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
				},
				disableWarnings: function(e) {
					return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (i = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
				},
				log: function() {
					if("object" == typeof window) {
						if(n) return;
						"undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
					}
				},
				deprecated: function(e, t) {
					i && console.warn(e + " is deprecated, please use " + t + " instead.")
				},
				extractVersion: function(e, t, r) {
					var n = e.match(t);
					return n && n.length >= r && parseInt(n[r], 10)
				},
				detectBrowser: function(e) {
					var t = e && e.navigator,
						r = {
							browser: null,
							version: null
						};
					if(void 0 === e || !e.navigator) return r.browser = "Not a browser.", r;
					if(t.mozGetUserMedia) r.browser = "firefox", r.version = this.extractVersion(t.userAgent, /Firefox\/(\d+)\./, 1);
					else if(t.webkitGetUserMedia)
						if(e.webkitRTCPeerConnection) r.browser = "chrome", r.version = this.extractVersion(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
						else {
							if(!t.userAgent.match(/Version\/(\d+).(\d+)/)) return r.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", r;
							r.browser = "safari", r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
						}
					else if(t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = "edge", r.version = this.extractVersion(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
					else {
						if(!t.mediaDevices || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser = "Not a supported browser.", r;
						r.browser = "safari", r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
					}
					return r
				}
			};
		e.exports = {
			log: a.log,
			deprecated: a.deprecated,
			disableLog: a.disableLog,
			disableWarnings: a.disableWarnings,
			extractVersion: a.extractVersion,
			shimCreateObjectURL: a.shimCreateObjectURL,
			detectBrowser: a.detectBrowser.bind(a)
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(388);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return n.PushConfig
			}
		});
		var i = r(124);
		Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig
			}
		});
		var a = r(387);
		Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return a.SessionConfig4P2P
			}
		});
		var o = r(386);
		Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return o.SessionConfig4Meeting
			}
		});
		var s = r(385);
		Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return s.SessionConfig4Live
			}
		})
	}, , , function(e, t) {
		e.exports = function(e, t) {
			var r = t.split(".");
			for(; r.length;) {
				var n = r.shift(),
					i = !1;
				if("?" == n[n.length - 1] && (n = n.slice(0, -1), i = !0), !(e = e[n]) && i) return e
			}
			return e
		}
	}, function(e, t) {}, function(e, t, r) {
		var n = r(13),
			i = r(46),
			a = r(41)("IE_PROTO"),
			o = Object.prototype;
		e.exports = Object.getPrototypeOf || function(e) {
			return e = i(e), n(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
		}
	}, function(e, t, r) {
		var n = r(7).document;
		e.exports = n && n.documentElement
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(369);
		Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return n.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return n.validateVideoQuality
			}
		});
		var i = r(368);
		Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return i.validateVideoFrameRate
			}
		});
		var a = r(367);
		Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return a.CONTROL_TYPE
			}
		});
		var o = r(366);
		Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return o.CONFIG_MAP
			}
		});
		var s = r(365);
		Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return s.DEVICE_TYPE
			}
		});
		var c = r(364);
		Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return c.NETCALL_TYPE
			}
		});
		var u = r(363);
		Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return u.SPLIT_MODE
			}
		});
		var d = r(362);
		Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return d.ROLE_FOR_MEETING
			}
		});
		var l = r(361);
		Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return l.HANGUP_TYPE
			}
		});
		var f = r(360);
		Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return f.SESSION_MODE
			}
		});
		var p = r(359);
		Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return p.DECTECT_RESULT_TYPE
			}
		});
		var h = r(358);
		Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return h.DECTECT_TYPE
			}
		});
		var m = r(357);
		Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return m.VIDEO_ENCODE_MODE
			}
		});
		var v = r(356);
		Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return v.SCALE_TYPE
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(201);
		Object.defineProperty(t, "RtcUtil", {
			enumerable: !0,
			get: function() {
				return s(n).default
			}
		});
		var i = r(198);
		Object.defineProperty(t, "SdpUtil", {
			enumerable: !0,
			get: function() {
				return s(i).default
			}
		});
		var a = r(190);
		Object.defineProperty(t, "RtcStatsNew", {
			enumerable: !0,
			get: function() {
				return s(a).default
			}
		});
		var o = r(143);

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "RtcSupport", {
			enumerable: !0,
			get: function() {
				return s(o).default
			}
		})
	}, function(e, t, r) {
		var n = r(32),
			i = r(5)("toStringTag"),
			a = "Arguments" == n(function() {
				return arguments
			}());
		e.exports = function(e) {
			var t, r, o;
			return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(r = function(e, t) {
				try {
					return e[t]
				} catch(e) {}
			}(t = Object(e), i)) ? r : a ? n(t) : "Object" == (o = n(t)) && "function" == typeof t.callee ? "Arguments" : o
		}
	}, , function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n, i = r(215),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = function(e) {
			return function() {
				var t = e.apply(this, arguments);
				return new a.default(function(e, r) {
					return function n(i, o) {
						try {
							var s = t[i](o),
								c = s.value
						} catch(e) {
							return void r(e)
						}
						if(!s.done) return a.default.resolve(c).then(function(e) {
							n("next", e)
						}, function(e) {
							n("throw", e)
						});
						e(c)
					}("next")
				})
			}
		}
	}, function(e, t, r) {
		e.exports = r(217)
	}, , function(e, t, r) {
		"use strict";
		var n = r(11),
			i = n.getGlobal(),
			a = {},
			o = i.name || "_parent",
			s = [],
			c = [];
		a.addMsgListener = function(e) {
			s.push(e)
		};
		var u, d, l, f, p = (u = /^([\w]+?:\/\/.*?(?=\/|$))/i, function(e) {
				return e = e || "", u.test(e) ? RegExp.$1 : "*"
			}),
			h = function() {
				var e = unescape(i.name || "").trim();
				if(e && 0 === e.indexOf("MSG|")) {
					i.name = "";
					var t = n.string2object(e.replace("MSG|", ""), "|"),
						r = (t.origin || "").toLowerCase();
					r && "*" !== r && 0 !== location.href.toLowerCase().indexOf(r) || function(e) {
						for(var t = 0, r = s.length; t < r; t++) try {
							s[t].call(null, e)
						} catch(e) {}
					}({
						data: JSON.parse(t.data || "null"),
						source: i.frames[t.self] || t.self,
						origin: p(t.ref || document.referrer)
					})
				}
			},
			m = (l = function(e, t) {
				for(var r = 0, n = e.length; r < n; r++)
					if(e[r] === t) return !0;
				return !1
			}, function() {
				if(c.length) {
					d = [];
					for(var e, t = c.length - 1; t >= 0; t--) e = c[t], l(d, e.w) || (d.push(e.w), c.splice(t, 1), e.w.name = e.d);
					d = null
				}
			}),
			v = a.startTimer = (f = !1, function() {
				f || (f = !0, i.postMessage || (setInterval(m, 100), setInterval(h, 20)))
			});
		a.postMessage = function(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			if(n.fillUndef(t, {
					origin: "*",
					source: o
				}), i.postMessage) {
				var r = t.data;
				i.FormData || (r = JSON.stringify(r)), e.postMessage(r, t.origin)
			} else {
				if(v(), n.isObject(t)) {
					var a = {};
					a.origin = t.origin || "", a.ref = location.href, a.self = t.source, a.data = JSON.stringify(t.data), t = "MSG|" + n.object2string(a, "|", !0)
				}
				c.unshift({
					w: e,
					d: escape(t)
				})
			}
		}, e.exports = a
	}, function(e, t) {
		e.exports = function e(t, r) {
			"use strict";
			var n, i, a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
				o = /(^[ ]*|[ ]*$)/g,
				s = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
				c = /^0x[0-9a-f]+$/i,
				u = /^0/,
				d = function(t) {
					return e.insensitive && ("" + t).toLowerCase() || "" + t
				},
				l = d(t).replace(o, "") || "",
				f = d(r).replace(o, "") || "",
				p = l.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
				h = f.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
				m = parseInt(l.match(c), 16) || 1 !== p.length && l.match(s) && Date.parse(l),
				v = parseInt(f.match(c), 16) || m && f.match(s) && Date.parse(f) || null;
			if(v) {
				if(m < v) return -1;
				if(m > v) return 1
			}
			for(var _ = 0, y = Math.max(p.length, h.length); _ < y; _++) {
				if(n = !(p[_] || "").match(u) && parseFloat(p[_]) || p[_] || 0, i = !(h[_] || "").match(u) && parseFloat(h[_]) || h[_] || 0, isNaN(n) !== isNaN(i)) return isNaN(n) ? 1 : -1;
				if(typeof n != typeof i && (n += "", i += ""), n < i) return -1;
				if(n > i) return 1
			}
			return 0
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(29),
			i = r(36),
			a = r(27),
			o = r(46),
			s = r(58),
			c = Object.assign;
		e.exports = !c || r(20)(function() {
			var e = {},
				t = {},
				r = Symbol(),
				n = "abcdefghijklmnopqrst";
			return e[r] = 7, n.split("").forEach(function(e) {
				t[e] = e
			}), 7 != c({}, e)[r] || Object.keys(c({}, t)).join("") != n
		}) ? function(e, t) {
			for(var r = o(e), c = arguments.length, u = 1, d = i.f, l = a.f; c > u;)
				for(var f, p = s(arguments[u++]), h = d ? n(p).concat(d(p)) : n(p), m = h.length, v = 0; m > v;) l.call(p, f = h[v++]) && (r[f] = p[f]);
			return r
		} : c
	}, function(e, t, r) {
		var n = r(16);
		n(n.S + n.F, "Object", {
			assign: r(85)
		})
	}, function(e, t, r) {
		r(86), e.exports = r(6).Object.assign
	}, function(e, t, r) {
		e.exports = {
			default: r(87),
			__esModule: !0
		}
	}, , function(e, t, r) {
		r(37)("observable")
	}, function(e, t, r) {
		r(37)("asyncIterator")
	}, function(e, t, r) {
		var n = r(17),
			i = r(57).f,
			a = {}.toString,
			o = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
		e.exports.f = function(e) {
			return o && "[object Window]" == a.call(e) ? function(e) {
				try {
					return i(e)
				} catch(e) {
					return o.slice()
				}
			}(e) : i(n(e))
		}
	}, function(e, t, r) {
		var n = r(32);
		e.exports = Array.isArray || function(e) {
			return "Array" == n(e)
		}
	}, function(e, t, r) {
		var n = r(29),
			i = r(36),
			a = r(27);
		e.exports = function(e) {
			var t = n(e),
				r = i.f;
			if(r)
				for(var o, s = r(e), c = a.f, u = 0; s.length > u;) c.call(e, o = s[u++]) && t.push(o);
			return t
		}
	}, function(e, t, r) {
		var n = r(28)("meta"),
			i = r(18),
			a = r(13),
			o = r(12).f,
			s = 0,
			c = Object.isExtensible || function() {
				return !0
			},
			u = !r(20)(function() {
				return c(Object.preventExtensions({}))
			}),
			d = function(e) {
				o(e, n, {
					value: {
						i: "O" + ++s,
						w: {}
					}
				})
			},
			l = e.exports = {
				KEY: n,
				NEED: !1,
				fastKey: function(e, t) {
					if(!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
					if(!a(e, n)) {
						if(!c(e)) return "F";
						if(!t) return "E";
						d(e)
					}
					return e[n].i
				},
				getWeak: function(e, t) {
					if(!a(e, n)) {
						if(!c(e)) return !0;
						if(!t) return !1;
						d(e)
					}
					return e[n].w
				},
				onFreeze: function(e) {
					return u && l.NEED && c(e) && !a(e, n) && d(e), e
				}
			}
	}, function(e, t, r) {
		"use strict";
		var n = r(7),
			i = r(13),
			a = r(14),
			o = r(16),
			s = r(60),
			c = r(95).KEY,
			u = r(20),
			d = r(40),
			l = r(33),
			f = r(28),
			p = r(5),
			h = r(38),
			m = r(37),
			v = r(94),
			_ = r(93),
			y = r(15),
			R = r(18),
			g = r(17),
			C = r(42),
			E = r(26),
			T = r(47),
			b = r(92),
			O = r(56),
			S = r(12),
			A = r(29),
			P = O.f,
			I = S.f,
			k = b.f,
			L = n.Symbol,
			W = n.JSON,
			D = W && W.stringify,
			M = p("_hidden"),
			w = p("toPrimitive"),
			B = {}.propertyIsEnumerable,
			G = d("symbol-registry"),
			N = d("symbols"),
			j = d("op-symbols"),
			x = Object.prototype,
			F = "function" == typeof L,
			U = n.QObject,
			V = !U || !U.prototype || !U.prototype.findChild,
			H = a && u(function() {
				return 7 != T(I({}, "a", {
					get: function() {
						return I(this, "a", {
							value: 7
						}).a
					}
				})).a
			}) ? function(e, t, r) {
				var n = P(x, t);
				n && delete x[t], I(e, t, r), n && e !== x && I(x, t, n)
			} : I,
			Y = function(e) {
				var t = N[e] = T(L.prototype);
				return t._k = e, t
			},
			K = F && "symbol" == typeof L.iterator ? function(e) {
				return "symbol" == typeof e
			} : function(e) {
				return e instanceof L
			},
			q = function(e, t, r) {
				return e === x && q(j, t, r), y(e), t = C(t, !0), y(r), i(N, t) ? (r.enumerable ? (i(e, M) && e[M][t] && (e[M][t] = !1), r = T(r, {
					enumerable: E(0, !1)
				})) : (i(e, M) || I(e, M, E(1, {})), e[M][t] = !0), H(e, t, r)) : I(e, t, r)
			},
			J = function(e, t) {
				y(e);
				for(var r, n = v(t = g(t)), i = 0, a = n.length; a > i;) q(e, r = n[i++], t[r]);
				return e
			},
			Q = function(e) {
				var t = B.call(this, e = C(e, !0));
				return !(this === x && i(N, e) && !i(j, e)) && (!(t || !i(this, e) || !i(N, e) || i(this, M) && this[M][e]) || t)
			},
			z = function(e, t) {
				if(e = g(e), t = C(t, !0), e !== x || !i(N, t) || i(j, t)) {
					var r = P(e, t);
					return !r || !i(N, t) || i(e, M) && e[M][t] || (r.enumerable = !0), r
				}
			},
			$ = function(e) {
				for(var t, r = k(g(e)), n = [], a = 0; r.length > a;) i(N, t = r[a++]) || t == M || t == c || n.push(t);
				return n
			},
			X = function(e) {
				for(var t, r = e === x, n = k(r ? j : g(e)), a = [], o = 0; n.length > o;) !i(N, t = n[o++]) || r && !i(x, t) || a.push(N[t]);
				return a
			};
		F || (s((L = function() {
			if(this instanceof L) throw TypeError("Symbol is not a constructor!");
			var e = f(arguments.length > 0 ? arguments[0] : void 0),
				t = function(r) {
					this === x && t.call(j, r), i(this, M) && i(this[M], e) && (this[M][e] = !1), H(this, e, E(1, r))
				};
			return a && V && H(x, e, {
				configurable: !0,
				set: t
			}), Y(e)
		}).prototype, "toString", function() {
			return this._k
		}), O.f = z, S.f = q, r(57).f = b.f = $, r(27).f = Q, r(36).f = X, a && !r(34) && s(x, "propertyIsEnumerable", Q, !0), h.f = function(e) {
			return Y(p(e))
		}), o(o.G + o.W + o.F * !F, {
			Symbol: L
		});
		for(var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ee = 0; Z.length > ee;) p(Z[ee++]);
		for(var te = A(p.store), re = 0; te.length > re;) m(te[re++]);
		o(o.S + o.F * !F, "Symbol", {
			for: function(e) {
				return i(G, e += "") ? G[e] : G[e] = L(e)
			},
			keyFor: function(e) {
				if(!K(e)) throw TypeError(e + " is not a symbol!");
				for(var t in G)
					if(G[t] === e) return t
			},
			useSetter: function() {
				V = !0
			},
			useSimple: function() {
				V = !1
			}
		}), o(o.S + o.F * !F, "Object", {
			create: function(e, t) {
				return void 0 === t ? T(e) : J(T(e), t)
			},
			defineProperty: q,
			defineProperties: J,
			getOwnPropertyDescriptor: z,
			getOwnPropertyNames: $,
			getOwnPropertySymbols: X
		}), W && o(o.S + o.F * (!F || u(function() {
			var e = L();
			return "[null]" != D([e]) || "{}" != D({
				a: e
			}) || "{}" != D(Object(e))
		})), "JSON", {
			stringify: function(e) {
				for(var t, r, n = [e], i = 1; arguments.length > i;) n.push(arguments[i++]);
				if(r = t = n[1], (R(t) || void 0 !== e) && !K(e)) return _(t) || (t = function(e, t) {
					if("function" == typeof r && (t = r.call(this, e, t)), !K(t)) return t
				}), n[1] = t, D.apply(W, n)
			}
		}), L.prototype[w] || r(19)(L.prototype, w, L.prototype.valueOf), l(L, "Symbol"), l(Math, "Math", !0), l(n.JSON, "JSON", !0)
	}, function(e, t, r) {
		r(96), r(73), r(91), r(90), e.exports = r(6).Symbol
	}, function(e, t, r) {
		e.exports = {
			default: r(97),
			__esModule: !0
		}
	}, function(e, t) {
		e.exports = function(e, t) {
			return {
				value: t,
				done: !!e
			}
		}
	}, function(e, t) {
		e.exports = function() {}
	}, function(e, t, r) {
		"use strict";
		var n = r(100),
			i = r(99),
			a = r(23),
			o = r(17);
		e.exports = r(62)(Array, "Array", function(e, t) {
			this._t = o(e), this._i = 0, this._k = t
		}, function() {
			var e = this._t,
				t = this._k,
				r = this._i++;
			return !e || r >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? r : "values" == t ? e[r] : [r, e[r]])
		}, "values"), a.Arguments = a.Array, n("keys"), n("values"), n("entries")
	}, function(e, t, r) {
		var n = r(44),
			i = Math.max,
			a = Math.min;
		e.exports = function(e, t) {
			return(e = n(e)) < 0 ? i(e + t, 0) : a(e, t)
		}
	}, function(e, t, r) {
		var n = r(17),
			i = r(67),
			a = r(102);
		e.exports = function(e) {
			return function(t, r, o) {
				var s, c = n(t),
					u = i(c.length),
					d = a(o, u);
				if(e && r != r) {
					for(; u > d;)
						if((s = c[d++]) != s) return !0
				} else
					for(; u > d; d++)
						if((e || d in c) && c[d] === r) return e || d || 0;
				return !e && -1
			}
		}
	}, function(e, t, r) {
		var n = r(12),
			i = r(15),
			a = r(29);
		e.exports = r(14) ? Object.defineProperties : function(e, t) {
			i(e);
			for(var r, o = a(t), s = o.length, c = 0; s > c;) n.f(e, r = o[c++], t[r]);
			return e
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(47),
			i = r(26),
			a = r(33),
			o = {};
		r(19)(o, r(5)("iterator"), function() {
			return this
		}), e.exports = function(e, t, r) {
			e.prototype = n(o, {
				next: i(1, r)
			}), a(e, t + " Iterator")
		}
	}, function(e, t, r) {
		var n = r(44),
			i = r(43);
		e.exports = function(e) {
			return function(t, r) {
				var a, o, s = String(i(t)),
					c = n(r),
					u = s.length;
				return c < 0 || c >= u ? e ? "" : void 0 : (a = s.charCodeAt(c)) < 55296 || a > 56319 || c + 1 === u || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) : o - 56320 + (a - 55296 << 10) + 65536
			}
		}
	}, function(e, t, r) {
		r(48), r(54), e.exports = r(38).f("iterator")
	}, function(e, t, r) {
		e.exports = {
			default: r(107),
			__esModule: !0
		}
	}, function(e, t, r) {
		var n = r(78),
			i = r(5)("iterator"),
			a = r(23);
		e.exports = r(6).getIteratorMethod = function(e) {
			if(null != e) return e[i] || e["@@iterator"] || a[n(e)]
		}
	}, function(e, t, r) {
		var n = r(200),
			i = r(199);
		t.write = i, t.parse = n.parse, t.parseFmtpConfig = n.parseFmtpConfig, t.parseParams = n.parseParams, t.parsePayloads = n.parsePayloads, t.parseRemoteCandidates = n.parseRemoteCandidates, t.parseImageAttributes = n.parseImageAttributes, t.parseSimulcastStreamList = n.parseSimulcastStreamList
	}, function(e, t, r) {
		"use strict";
		var n = r(55);
		e.exports.f = function(e) {
			return new function(e) {
				var t, r;
				this.promise = new e(function(e, n) {
					if(void 0 !== t || void 0 !== r) throw TypeError("Bad Promise constructor");
					t = e, r = n
				}), this.resolve = n(t), this.reject = n(r)
			}(e)
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = a(r(81)),
			i = a(r(80));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = {
			getDevices: function() {
				var e = this;
				return(0, i.default)(n.default.mark(function t() {
					var r;
					return n.default.wrap(function(e) {
						for(;;) switch(e.prev = e.next) {
							case 0:
								if(WEBRTCLOG.log("开始获取设备列表"), r = null, navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
									e.next = 4;
									break
								}
								return e.abrupt("return", Promise.reject("your browser not support this feature, see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices"));
							case 4:
								return e.next = 6, navigator.mediaDevices.enumerateDevices().then(function(e) {
									0 !== e.length && (r = {
										video: [],
										audioIn: [],
										audioOut: []
									}, e.forEach(function(e) {
										"videoinput" === e.kind ? r.video.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "camera " + (r.video.length + 1)
										}) : "audioinput" === e.kind ? r.audioIn.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "microphone " + (r.audioIn.length + 1)
										}) : "audiooutput" === e.kind && r.audioOut.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "speaker " + (r.audioOut.length + 1)
										})
									}))
								});
							case 6:
								return e.abrupt("return", r);
							case 7:
							case "end":
								return e.stop()
						}
					}, t, e)
				}))()
			}
		}, e.exports = t.default
	}, , , , , , function(e, t, r) {
		"use strict";
		var n = r(8);
		"undefined" != typeof window && (window.console || n.isWeixinApp || (window.console = {
			log: function() {},
			info: function() {},
			warn: function() {},
			error: function() {}
		}))
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n = a(r(232)),
			i = a(r(229));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function e(t, r, a) {
			null === t && (t = Function.prototype);
			var o = (0, i.default)(t, r);
			if(void 0 === o) {
				var s = (0, n.default)(t);
				return null === s ? void 0 : e(s, r, a)
			}
			if("value" in o) return o.value;
			var c = o.get;
			return void 0 !== c ? c.call(a) : void 0
		}
	}, function(e, t, r) {
		e.exports = {
			default: r(167),
			__esModule: !0
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractWebRTC = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2));
		r(290);
		var s = r(9),
			c = r(45),
			u = r(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.imInfo = e.imInfo, r.targetUid = e.targetUid || r.imInfo.uid, r.adapterRef = e.adapterRef, r._init(), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_resetOfferRelativeStatus",
				value: function() {
					this.sdpOffer = null, this.sdpAnswer = null, this.iceOffer = [], this.iceAnswer = [], this.offerCount = 0
				}
			}, {
				key: "_reset",
				value: function() {
					this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection = null, this.currStream = null, this.isNeedUpdataSdp = !1, this.imInfo = null, this.targetUid = null
				}
			}, {
				key: "_resetPeerTimeOut",
				value: function() {
					this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection = null, this.isNeedUpdataSdp = !1
				}
			}, {
				key: "_init",
				value: function() {
					var e = this;
					if(this.rtcConnection) WEBRTCLOG.log("AbstractWebRTC:init 已存在rtcConnection");
					else {
						var t = {
								iceServers: [{
									urls: ["stun:turn.ideasip.com"]
								}],
								rtcpMuxPolicy: "require"
							},
							r = {
								relayaddrs: null,
								relaytoken: null,
								uid: this.imInfo.uid,
								cid: this.imInfo.cid
							};
						this.adapterRef.instance._isFirefox() || ("WebRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] ? (r.relayaddrs = this.imInfo.serverMap.relayaddrs, r.relaytoken = this.imInfo.serverMap.relaytoken) : "NRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] && (r.relayaddrs = this.imInfo.relayaddrs, r.relaytoken = this.imInfo.relaytoken)), r.relayaddrs && r.relayaddrs.length && r.relaytoken ? (r.relayaddrs = Array.from(new Set(r.relayaddrs)), t.iceServers = [], r.relayaddrs.forEach(function(e) {
							t.iceServers.push({
								urls: "turn:" + e,
								credential: r.uid + "/" + r.cid,
								username: r.relaytoken
							})
						}), t.iceTransportPolicy = "relay", this.timer = setTimeout(function() {
							e.rtcConnection && e.emit("iceCandidateTimeOut", {
								rtc: e,
								state: e.rtcConnection.iceConnectionState
							})
						}, 15e3)) : this.timer && (clearTimeout(this.timer), this.timer = null), WEBRTCLOG.log("AbstractWebRTC:init create rtcConnection");
						var n = this.rtcConnection = new RTCPeerConnection(t, {
							optional: [{
								googIPv6: !1
							}]
						});
						n.uid = this.imInfo.uid, n.targetUid = this.targetUid, n.onicecandidate = this.onIceCandidate.bind(this), n.onnegotiationneeded = this.onNegotiationNeeded.bind(this), n.oniceconnectionstatechange = this.onIceStateChange.bind(this), /Firefox/gi.test(navigator.userAgent) ? n.ontrack = this.onAddRemoteTrack.bind(this) : n.onaddstream = this.onAddRemoteStream.bind(this), n.onremovestream = this.onRemoveRemoteStream.bind(this)
					}
				}
			}, {
				key: "onIceCandidate",
				value: function(e) {
					!e.candidate || this.rtcConnection.iceGatheringState && "complete" === this.rtcConnection.iceGatheringState ? WEBRTCLOG.warn("AbstractWebRTC:onIceCandidate 收集完成") : / tcp /gi.test(e.candidate.candidate) || /\.1 /gi.test(e.candidate.candidate) || / 2 UDP /gi.test(e.candidate.candidate) || (WEBRTCLOG.log("AbstractWebRTC:onIceCandidate targetUid: %s , gather candidate : %o", this.targetUid, e.candidate.candidate), this.iceOffer.push(e.candidate), this.offerCount++, this.rtcConnection && this.rtcConnection.signalingState && "stable" == this.rtcConnection.signalingState && this.doSendIce())
				}
			}, {
				key: "onNegotiationNeeded",
				value: function(e) {
					this.emit("negotiaionNeeded", e)
				}
			}, {
				key: "onIceStateChange",
				value: function(e) {
					if(this.rtcConnection) {
						var t = this.rtcConnection.iceConnectionState;
						WEBRTCLOG.log("AbstractWebRTC:onIceStateChange: %s, %s", t, this.targetUid), "connected" !== t && "completed" !== t || (this.timer && (clearTimeout(this.timer), this.timer = null), this.iceCompleted = !0, this.emit("iceCompleted"), this.setProgress(!1)), "failed" === t && (this.iceCompleted = !1), this.emit("iceStateChange", {
							rtc: this,
							state: this.rtcConnection.iceConnectionState
						})
					} else WEBRTCLOG.warn("AbstractWebRTC:onIceStateChange 不存在的 rtcConnection")
				}
			}, {
				key: "onAddRemoteStream",
				value: function(e) {
					WEBRTCLOG.log("AbstractWebRTC:onAddRemoteStream ", e), this.targetUid != this.imInfo.uid ? (WEBRTCLOG.log("AbstractWebRTC:onAddRemoteStream targetUid: %s, remote Stream: %o ", this.targetUid, e.stream), e.stream && "default" === e.stream.id ? WEBRTCLOG.error("AbstractWebRTC:onAddRemoteStream ID为default的流收到时不做任何事") : this.emit("getRemoteStream", {
						uid: this.targetUid,
						stream: e.stream
					})) : WEBRTCLOG.error("AbstractWebRTC:onAddRemoteStream 自己的远程流直接忽略")
				}
			}, {
				key: "onAddRemoteTrack",
				value: function(e) {
					if(this.targetUid != this.imInfo.uid) {
						var t = e.streams[0];
						t ? this.emit("getRemoteStream", {
							uid: this.targetUid,
							stream: t,
							track: e.track
						}) : WEBRTCLOG.error("AbstractWebRTC:onAddRemoteTrack 未找到流")
					} else WEBRTCLOG.log("AbstractWebRTC:onAddRemoteTrack 自己的远程流直接忽略")
				}
			}, {
				key: "onRemoveRemoteStream",
				value: function(e) {
					WEBRTCLOG.log("AbstractWebRTC:onRemoveRemoteStream targetUid: %s, stream: %o ", this.targetUid, e.stream)
				}
			}, {
				key: "setProgress",
				value: function(e) {
					this.isProgress = e, !1 === e && "completed" === this.rtcConnection.iceConnectionState && this.emit("ready")
				}
			}, {
				key: "getReceivers",
				value: function() {
					return this.rtcConnection.getReceivers()
				}
			}, {
				key: "getRemoteStreams",
				value: function() {
					return this.rtcConnection.getRemoteStreams()
				}
			}, {
				key: "getIceConnectionState",
				value: function() {
					if(this.rtcConnection) return this.rtcConnection.iceConnectionState
				}
			}, {
				key: "close",
				value: function() {
					WEBRTCLOG.log("AbstractWebRTC:close targetUid: %s", this.targetUid);
					var e = this.rtcConnection;
					e && (e.onicecandidate = null, e.onnegotiationneeded = null, e.oniceconnectionstatechange = null, e.ontrack = null, e.onaddstream = null, e.onremovestream = null, e.close(), this.rtcConnection = null)
				}
			}, {
				key: "doSendIce",
				value: function() {
					if(this.sdpAnswer) {
						if(this.iceCompleted) return WEBRTCLOG.warn("AbstractWebRTC:doSendIce ice已协商完成"), void(this.iceOffer.length = 0);
						if(0 !== this.iceOffer.length) {
							var e = this.iceOffer.shift();
							this.emit("iceCandidate", {
								uid: this.targetUid,
								ice: e
							}), this.doSendIce()
						} else WEBRTCLOG.warn("AbstractWebRTC:doSendIce iceOffer队列为空")
					} else WEBRTCLOG.warn("AbstractWebRTC:doSendIce 未协商完sdp，无法发送ice")
				}
			}, {
				key: "updateStream",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
					c.RtcUtil.updateMediaStream({
						peer: this.rtcConnection,
						currStream: this.currStream,
						streams: t
					}).then(function(t) {
						e.currStream || (e.currStream = t)
					})
				}
			}, {
				key: "getLocalSdp",
				value: function() {
					return this.rtcConnection.localDescription
				}
			}, {
				key: "getRemoteSdp",
				value: function() {
					return this.rtcConnection.remoteDescription
				}
			}, {
				key: "checkMediaStatus",
				value: function(e, t, r) {
					return c.RtcUtil.checkMediaStatus(e, t, r)
				}
			}, {
				key: "addRemoteIceCandidate",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("AbstractWebRTC:addRemoteIceCandidate targetUid:%s , ice candidate: %o ", this.targetUid, e), this.rtcConnection.addIceCandidate(new RTCIceCandidate(e)).then(function() {
						t.iceAnswer.push(e), t.iceAnswer.length === t.offerCount && (t.iceAnswer = [], t.offerCount = 0)
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:addRemoteIceCandidate error:%o", e)
					})
				}
			}, {
				key: "createOffer",
				value: function() {
					var e = this;
					return this.setProgress(!0), c.RtcUtil.createOffer(this.rtcConnection).then(function(t) {
						return WEBRTCLOG.log("********************** 创建 sdp offer **********************"), WEBRTCLOG.log("AbstractWebRTC:createOffer"), e._resetOfferRelativeStatus(), t.sdp = c.SdpUtil.maybePreferVideoReceiveCodec(t.sdp, {
							videoRecvCodec: "H264"
						}), e.currStream && WEBRTCLOG.log("AbstractWebRTC:createOffer currentStream: %o", e.currStream.getTracks()), (t = c.RtcUtil.formatSdp({
							offerOrAnswer: t,
							uid: e.imInfo.uid,
							cid: e.imInfo.cid,
							chromeScreenShareOpened: e.adapterRef.state.chromeScreenShareOpened,
							stream: e.currStream,
							highAudio: e.imInfo.sessionConfig.highAudio,
							stero: e.imInfo.sessionConfig.stero,
							targetUid: e.targetUid
						})) ? Promise.resolve(t) : (e.adapterRef.imInfo && "p2p" === e.adapterRef.imInfo.sessionMode ? (e.adapterRef.instance.hangup && e.adapterRef.instance.hangup(), e.adapterRef.instance.emit("hangup", {
							channelId: e.imInfo.cid,
							account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid),
							type: -1
						})) : (e.adapterRef.instance.leaveChannel && e.adapterRef.instance.leaveChannel(), e.adapterRef.instance.emit("leaveChannel", {
							channelId: e.imInfo.cid,
							account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid)
						})), e.adapterRef.instance.emit("error", {
							desc: "clientError: 该机型浏览器不支持H264编码",
							code: 500
						}), Promise.reject("该机型浏览器不支持H264编码"))
					})
				}
			}, {
				key: "createAnswer",
				value: function(e) {
					var t = this;
					return this.setProgress(!0), this.rtcConnection.createAnswer().then(function(e) {
						return WEBRTCLOG.log("AbstractWebRTC:createAnswer 原始sdp answer", e), e.sdp = c.SdpUtil.maybePreferVideoReceiveCodec(e.sdp, {
							videoRecvCodec: "H264"
						}), e = c.RtcUtil.formatSdp({
							offerOrAnswer: e,
							uid: t.imInfo.uid,
							cid: t.imInfo.cid,
							chromeScreenShareOpened: t.adapterRef.state.chromeScreenShareOpened,
							stream: t.currStream,
							highAudio: t.imInfo.sessionConfig.highAudio,
							stero: t.imInfo.sessionConfig.stero,
							targetUid: t.targetUid
						})
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:createAnswer error: %o", e)
					})
				}
			}, {
				key: "setLocalDescription",
				value: function(e, t) {
					var r = this;
					return this.sdpOffer = e, WEBRTCLOG.log("AbstractWebRTC:setLocalDescription 设置到本地：\n", e.sdp), this.rtcConnection.setLocalDescription(e).then(function() {
						return e.sdp = c.RtcUtil.setMediaBitrates({
							sdp: e.sdp
						}), "answer" === e.type ? (r.sdpAnswer = e, r.iceCompleted && r.emit("iceCompleted"), r.setProgress(!1)) : r.sdpAnswer = null, Promise.resolve(e)
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:setLocalDescription  , error: %o", e)
					})
				}
			}, {
				key: "setRemoteDescription",
				value: function(e, t) {
					var r = this;
					"offer" === e.type && (WEBRTCLOG.log("********************** 创建 sdp offer(remote) **********************"), WEBRTCLOG.log("AbstractWebRTC:setRemoteDescription 对端 targetUid: %s, 原始SDP: %o", this.targetUid, e)), this.setProgress("offer" === e.type);
					var n = {
						sdp: e.sdp,
						type: e.type
					};
					if("offer" === e.type && !this.sdpAnswer) return Promise.reject();
					n.sdp = c.SdpUtil.maybePreferVideoSendCodec(n.sdp, {
						videoRecvCodec: "H264"
					}), n.sdp = c.RtcUtil.formatSdpRemote(n.sdp, this.sdpOffer, this.adapterRef.state.chromeScreenShareOpened), this.sdpAnswer = "answer" === e.type ? n : null;
					var i = this.rtcConnection;
					return WEBRTCLOG.warn(i.signalingState), i.signalingState && "have-local-offer" == i.signalingState ? i.setRemoteDescription(n).then(function() {
						if(WEBRTCLOG.log("#### setRemoteDescription ... type: ", e.type), "answer" === e.type) {
							if(r.iceCompleted) return WEBRTCLOG.warn("ice已协商完成, targetUid:", i.targetUid), void r.emit("iceCompleted", i.targetUid);
							r.doSendIce()
						}
						return Promise.resolve()
					}).catch(function(e) {
						return WEBRTCLOG.error("AbstractWebRTC:setRemoteDescription uid:%s, error: %o", i.uid, e), Promise.reject(e)
					}) : Promise.resolve()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AbstractWebRTC:destroy"), this.close(), this._reset()
				}
			}]), t
		}(s.EventEmitter);
		t.AbstractWebRTC = l
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractBusiness = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
			}
			return(0, a.default)(t, e), t
		}(r(9).EventEmitter);
		t.AbstractBusiness = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(384);
		Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return n.NetcallOption
			}
		});
		var i = r(383);
		Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		});
		var a = r(382);
		Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return a.NRTCOption
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.SessionConfig = function e(t) {
			(0, a.default)(this, e);
			var r = t.maxVideoQuality,
				n = t.videoQuality,
				i = t.videoFrameRate,
				o = t.videoBitrate,
				s = t.videoEncodeMode,
				c = t.highAudio,
				u = t.recordVideo,
				d = t.recordAudio,
				l = t.isHostSpeaker,
				f = t.recordType,
				p = t.rtmpUrl,
				h = t.splitMode,
				m = t.layout,
				v = t.liveEnable;
			this.maxVideoQuality = r, this.videoQuality = n, this.videoFrameRate = i, this.videoBitrate = o, this.videoEncodeMode = s, this.highAudio = c, this.liveEnable = v, void 0 !== u && (this.recordVideo = u), void 0 !== d && (this.recordAudio = d), void 0 !== l && (this.isHostSpeaker = l), void 0 !== f && (this.recordType = f), void 0 !== p && (this.rtmpUrl = p), void 0 !== h && (this.splitMode = h), void 0 !== m && (this.layout = m)
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(156);
		Object.defineProperty(t, "WebRTCGateWay", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWay
			}
		}), Object.defineProperty(t, "WebRTCGateWayContext", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWayContext
			}
		}), Object.defineProperty(t, "WebRTCGateWayManager", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWayManager
			}
		}), Object.defineProperty(t, "WhiteBoardGateWay", {
			enumerable: !0,
			get: function() {
				return n.WhiteBoardGateWay
			}
		}), Object.defineProperty(t, "WhiteBoardGateWayContext", {
			enumerable: !0,
			get: function() {
				return n.WhiteBoardGateWayContext
			}
		}), Object.defineProperty(t, "WhiteBoardGateWayManager", {
			enumerable: !0,
			get: function() {
				return n.WhiteBoardGateWayManager
			}
		}), Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWayProtocolHandler
			}
		}), Object.defineProperty(t, "WhiteBoardGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return n.WhiteBoardGateWayProtocolHandler
			}
		});
		var i = r(305);
		Object.defineProperty(t, "MediaDeviceHelper", {
			enumerable: !0,
			get: function() {
				return i.MediaDeviceHelper
			}
		});
		var a = r(304);
		Object.defineProperty(t, "MediaRecordHelper", {
			enumerable: !0,
			get: function() {
				return a.MediaRecordHelper
			}
		});
		var o = r(303);
		Object.defineProperty(t, "AudioHelper", {
			enumerable: !0,
			get: function() {
				return o.AudioHelper
			}
		});
		var s = r(301);
		Object.defineProperty(t, "VideoHelper", {
			enumerable: !0,
			get: function() {
				return s.VideoHelper
			}
		});
		var c = r(299);
		Object.defineProperty(t, "ApiReportHelper", {
			enumerable: !0,
			get: function() {
				return c.ApiReportHelper
			}
		}), Object.defineProperty(t, "StatsReportHelper", {
			enumerable: !0,
			get: function() {
				return c.StatsReportHelper
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebAudio = void 0;
		var n = r(77).RtcSupport.checkWebAudio();

		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.stream,
				r = e.uid,
				i = e.isAnalyze,
				a = e.isRemote;
			this.support = n.WebAudio && n.MediaStream, this.gain = 1, this.stream = t, this.support && (this.audioIn = {}, this.uid = r || 0, this.isAnalyze = i, this.isRemote = a || !1, this.instant = 0, this.slow = 0, this.clip = 0, this.init())
		}
		i.ac = n.WebAudio && n.MediaStream ? new window.AudioContext : {}, i.destination = i.ac.createMediaStreamDestination ? i.ac.createMediaStreamDestination() : {};
		var a = i.prototype;
		a.context = i.ac, a.init = function() {
			this.validateInput() && (this.isAnalyze && this.initMonitor(), this.formatStreams(), this.initWebAudio(), this.initAudioIn())
		}, a.validateInput = function() {
			return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor)
		}, a.initMonitor = function() {
			var e = this;
			(this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function(t) {
				var r, n = t.inputBuffer.getChannelData(0),
					i = 0,
					a = 0;
				for(r = 0; r < n.length; ++r) i += Math.abs(n[r]), Math.abs(n[r]) > .99 && (a += 1);
				e.instant = Math.sqrt(i / n.length), e.slow = .95 * e.slow + .05 * e.instant, e.clip = a / n.length
			}
		}, a.initWebAudio = function() {
			var e = this.context;
			this.gainFilter = e.createGain(), this.destination = this.isRemote ? i.destination : e.createMediaStreamDestination(), this.gainFilter.gain.value = this.gain, this.gainFilter.connect(this.destination)
		}, a.initAudioIn = function() {
			var e = this,
				t = this,
				r = this.stream,
				n = this.context,
				i = void 0;
			if(/(MediaStream|LocalMediaStream)/.test(r.constructor)) return a(r), void(this.outputStream = this.destination.stream);

			function a(e) {
				if(!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
				if(0 === e.getAudioTracks().length) return null;
				var r = n.createMediaStreamSource(e);
				return t.isAnalyze && t.script && (r.connect(t.script), t.script.connect(t.gainFilter)), r.connect(t.gainFilter), r
			}
			r.constructor === Array && (r.forEach(function(t) {
				(i = a(t)) && (e.audioIn[t.id] = i)
			}), this.outputStream = this.destination.stream)
		}, a.formatStreams = function() {
			var e = this.stream,
				t = [];
			if(/(MediaStream|LocalMediaStream)/.test(e.constructor)) return e.getAudioTracks().map(function(e) {
				t.push(new MediaStream([e]))
			}), void(this.stream = t);
			e.constructor === Array && (e.map(function(e) {
				e.getAudioTracks().map(function(e) {
					t.push(new MediaStream([e]))
				})
			}), this.stream = t)
		}, a.addStream = function(e) {
			var t = this.context;
			if(0 !== e.getAudioTracks().length) {
				var r = t.createMediaStreamSource(e);
				this.isAnalyze && this.script && r.connect(this.script), r.connect(this.gainFilter), this.audioIn[e.id] = r, this.outputStream = this.destination.stream
			}
		}, a.updateStream = function(e) {
			if(this.audioIn)
				for(var t in this.audioIn) this.audioIn[t] && this.audioIn[t].disconnect(0), this.audioIn[t] = null;
			this.audioIn = {}, this.stream = e, this.initAudioIn()
		}, a.setGain = function(e) {
			this.support && (this.gainFilter.gain.value = e, this.gain = e)
		}, a.getGain = function() {
			return this.gain
		}, a.off = function() {
			return this.setGain(0)
		}, a.on = function() {
			this.setGain(1)
		}, a.destroy = function() {
			if(this.instant = 0, this.slow = 0, this.clip = 0, this.gainFilter && this.gainFilter.disconnect(0), this.script && this.script.disconnect(0), this.audioIn)
				for(var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
			this.audioIn = {};
			var t = this.stream;

			function r(e) {
				e && e.getTracks().forEach(function(t) {
					e.removeTrack(t)
				})
			}
			/(MediaStream|LocalMediaStream)/.test(t.constructor) && r(t), t.constructor === Array && t.forEach(function(e) {
				r(e)
			}), this.stream = null, this.outputStream = null
		}, a.getVolumeData = function() {
			return this.instant.toFixed(2)
		}, t.WebAudio = i
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = o(r(221)),
			i = o(r(220)),
			a = o(r(219));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = {
			ApiInvokeData: function(e) {
				return new n.default(e)
			},
			FormatDataFromStats: function(e) {
				return new i.default(e)
			},
			RawDataFromStats: function(e) {
				return new a.default(e)
			}
		}, e.exports = t.default
	}, , , , , function(e, t, r) {
		var n = r(5)("iterator"),
			i = !1;
		try {
			var a = [7][n]();
			a.return = function() {
				i = !0
			}, Array.from(a, function() {
				throw 2
			})
		} catch(e) {}
		e.exports = function(e, t) {
			if(!t && !i) return !1;
			var r = !1;
			try {
				var a = [7],
					o = a[n]();
				o.next = function() {
					return {
						done: r = !0
					}
				}, a[n] = function() {
					return o
				}, e(a)
			} catch(e) {}
			return r
		}
	}, function(e, t, r) {
		var n = r(23),
			i = r(5)("iterator"),
			a = Array.prototype;
		e.exports = function(e) {
			return void 0 !== e && (n.Array === e || a[i] === e)
		}
	}, function(e, t, r) {
		var n = r(15);
		e.exports = function(e, t, r, i) {
			try {
				return i ? t(n(r)[0], r[1]) : t(r)
			} catch(t) {
				var a = e.return;
				throw void 0 !== a && n(a.call(e)), t
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(65);
		e.exports = function(e, t) {
			return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] = "multipart/form-data", t.timeout = 0, t.type = t.type || "json", n(e, t)
		}
	}, function(e, t, r) {
		"use strict";
		var n, i, a = r(11),
			o = r(65),
			s = (n = /json/i, i = /post/i, function(e, t) {
				var r = (t = t || {}).data = t.data || {},
					s = t.headers = t.headers || {},
					c = a.checkWithDefault(s, "Accept", "application/json"),
					u = a.checkWithDefault(s, "Content-Type", "application/json");
				return n.test(c) && (t.type = "json"), i.test(t.method) && n.test(u) && (t.data = JSON.stringify(r)), o(e, t)
			});
		e.exports = s
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = r(83),
			a = r(64),
			o = {};

		function s(e) {
			this.init(), a.call(this, e)
		}
		var c = a.prototype,
			u = s.prototype = Object.create(c);
		u.init = function() {
			var e = "NEJ-AJAX-DATA:",
				t = !1;

			function r(t) {
				var r = t.data;
				if(0 === r.indexOf(e)) {
					var n = (r = JSON.parse(r.replace(e, ""))).key,
						i = o[n];
					i && (delete o[n], r.result = decodeURIComponent(r.result || ""), i.onLoad(r))
				}
			}
			return function() {
				! function() {
					if(!t) {
						t = !0;
						var e = n.getGlobal();
						e.postMessage ? n.on(e, "message", r) : i.addMsgListener(r)
					}
				}()
			}
		}(), u.doSend = function() {
			var e = this.options,
				t = n.url2origin(e.url),
				r = e.proxyUrl || t + "/res/nej_proxy_frame.html",
				a = o[r];
			if(n.isArray(a)) a.push(this.doSend.bind(this, e));
			else {
				if(!a) return o[r] = [this.doSend.bind(this, e)], void n.createIframe({
					src: r,
					onload: function(e) {
						var t = o[r];
						o[r] = n.target(e).contentWindow, t.forEach(function(e) {
							try {
								e()
							} catch(e) {
								console.error(e)
							}
						})
					}
				});
				if(!this.aborted) {
					var s = this.key = n.uniqueID();
					o[s] = this;
					var c = n.fetch({
						method: "GET",
						url: "",
						data: null,
						headers: {},
						timeout: 0
					}, e);
					c.key = s, i.postMessage(a, {
						data: c
					}), this.afterSend()
				}
			}
		}, u.abort = function() {
			this.aborted = !0, delete o[this.key], c.abort.call(this)
		}, e.exports = s
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = r(64),
			a = r(83),
			o = "NEJ-UPLOAD-RESULT:",
			s = {};

		function c(e) {
			this.init(), i.call(this, e)
		}
		var u = i.prototype,
			d = c.prototype = Object.create(u);
		d.init = function() {
			var e = !1;

			function t(e) {
				var t = e.data;
				if(0 === t.indexOf(o)) {
					var r = (t = JSON.parse(t.replace(o, ""))).key,
						n = s[r];
					n && (delete s[r], t.result = decodeURIComponent(t.result || ""), n.onLoad(t.result))
				}
			}
			return function() {
				! function() {
					if(!e) {
						e = !0;
						var r = n.getGlobal();
						r.postMessage ? n.on(r, "message", t) : (a.addMsgListener(t), a.startTimer())
					}
				}()
			}
		}(), d.doSend = function() {
			var e = this,
				t = e.options,
				r = e.key = "zoro-ajax-upload-iframe-" + n.uniqueID();
			s[r] = e;
			var i = e.form = n.html2node('<form style="display:none;"></form>');
			document.body.appendChild(i), i.target = r, i.method = "POST", i.enctype = "multipart/form-data", i.encoding = "multipart/form-data";
			var a = t.url,
				o = n.genUrlSep(a);
			i.action = a + o + "_proxy_=form";
			var c = t.data,
				u = [],
				d = [];

			function l() {
				u.forEach(function(e, t) {
					var r = d[t];
					r.parentNode && (e.name = r.name, n.isFunction(e.setAttribute) && e.setAttribute("form", r.getAttribute("form")), r.parentNode.replaceChild(e, r))
				})
			}
			c && n.getKeys(c, t.putFileAtEnd).forEach(function(e) {
				var t = c[e];
				if(t.tagName && "INPUT" === t.tagName.toUpperCase()) {
					if("file" === t.type) {
						var r = t,
							a = r.cloneNode(!0);
						r.parentNode.insertBefore(a, r);
						var o = n.dataset(r, "name");
						o && (r.name = o), i.appendChild(r), n.isFunction(r.setAttribute) && (r.setAttribute("form", ""), r.removeAttribute("form")), u.push(t), d.push(a)
					}
				} else {
					var s = n.html2node('<input type="hidden"/>');
					s.name = e, s.value = t, i.appendChild(s)
				}
			});
			var f = e.iframe = n.createIframe({
				name: r,
				onload: function() {
					e.aborted ? l() : (n.on(f, "load", e.checkResult.bind(e)), i.submit(), l(), e.afterSend())
				}
			})
		}, d.checkResult = function() {
			var e, t;
			try {
				if((t = ((e = this.iframe.contentWindow.document.body).innerText || e.textContent || "").trim()).indexOf(o) >= 0 || e.innerHTML.indexOf(o) >= 0) return
			} catch(e) {
				return void console.error("ignore error if not same domain,", e)
			}
			this.onLoad(t)
		}, d.onLoad = function(e) {
			u.onLoad.call(this, {
				status: 200,
				result: e
			}), n.remove(this.form), n.remove(this.iframe), u.destroy.call(this)
		}, d.destroy = function() {
			n.remove(this.iframe), n.remove(this.form)
		}, d.abort = function() {
			this.aborted = !0, delete s[this.key], u.abort.call(this)
		}, e.exports = c
	}, function(e, t, r) {
		var n;
		/*!
		 * EventEmitter v5.2.4 - git.io/ee
		 * Unlicense - http://unlicense.org/
		 * Oliver Caldwell - http://oli.me.uk/
		 * @preserve
		 */
		! function(t) {
			"use strict";

			function i() {}
			var a = i.prototype,
				o = t.EventEmitter;

			function s(e, t) {
				for(var r = e.length; r--;)
					if(e[r].listener === t) return r;
				return -1
			}

			function c(e) {
				return function() {
					return this[e].apply(this, arguments)
				}
			}
			a.getListeners = function(e) {
				var t, r, n = this._getEvents();
				if(e instanceof RegExp)
					for(r in t = {}, n) n.hasOwnProperty(r) && e.test(r) && (t[r] = n[r]);
				else t = n[e] || (n[e] = []);
				return t
			}, a.flattenListeners = function(e) {
				var t, r = [];
				for(t = 0; t < e.length; t += 1) r.push(e[t].listener);
				return r
			}, a.getListenersAsObject = function(e) {
				var t, r = this.getListeners(e);
				return r instanceof Array && ((t = {})[e] = r), t || r
			}, a.addListener = function(e, t) {
				if(! function e(t) {
						return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
					}(t)) throw new TypeError("listener must be a function");
				var r, n = this.getListenersAsObject(e),
					i = "object" == typeof t;
				for(r in n) n.hasOwnProperty(r) && -1 === s(n[r], t) && n[r].push(i ? t : {
					listener: t,
					once: !1
				});
				return this
			}, a.on = c("addListener"), a.addOnceListener = function(e, t) {
				return this.addListener(e, {
					listener: t,
					once: !0
				})
			}, a.once = c("addOnceListener"), a.defineEvent = function(e) {
				return this.getListeners(e), this
			}, a.defineEvents = function(e) {
				for(var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
				return this
			}, a.removeListener = function(e, t) {
				var r, n, i = this.getListenersAsObject(e);
				for(n in i) i.hasOwnProperty(n) && -1 !== (r = s(i[n], t)) && i[n].splice(r, 1);
				return this
			}, a.off = c("removeListener"), a.addListeners = function(e, t) {
				return this.manipulateListeners(!1, e, t)
			}, a.removeListeners = function(e, t) {
				return this.manipulateListeners(!0, e, t)
			}, a.manipulateListeners = function(e, t, r) {
				var n, i, a = e ? this.removeListener : this.addListener,
					o = e ? this.removeListeners : this.addListeners;
				if("object" != typeof t || t instanceof RegExp)
					for(n = r.length; n--;) a.call(this, t, r[n]);
				else
					for(n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? a.call(this, n, i) : o.call(this, n, i));
				return this
			}, a.removeEvent = function(e) {
				var t, r = typeof e,
					n = this._getEvents();
				if("string" === r) delete n[e];
				else if(e instanceof RegExp)
					for(t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
				else delete this._events;
				return this
			}, a.removeAllListeners = c("removeEvent"), a.emitEvent = function(e, t) {
				var r, n, i, a, o = this.getListenersAsObject(e);
				for(a in o)
					if(o.hasOwnProperty(a))
						for(r = o[a].slice(0), i = 0; i < r.length; i++) !0 === (n = r[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
				return this
			}, a.trigger = c("emitEvent"), a.emit = function(e) {
				var t = Array.prototype.slice.call(arguments, 1);
				return this.emitEvent(e, t)
			}, a.setOnceReturnValue = function(e) {
				return this._onceReturnValue = e, this
			}, a._getOnceReturnValue = function() {
				return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
			}, a._getEvents = function() {
				return this._events || (this._events = {})
			}, i.noConflict = function() {
				return t.EventEmitter = o, i
			}, void 0 === (n = function() {
				return i
			}.call(t, r, t, e)) || (e.exports = n)
		}(this || {})
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = r(64);

		function a(e) {
			e.onuploading && this.on("uploading", e.onuploading), i.call(this, e)
		}
		var o = i.prototype,
			s = a.prototype = Object.create(o);
		s.doSend = function() {
			var e = this.options,
				t = e.headers,
				r = this.xhr = new XMLHttpRequest;
			if("multipart/form-data" === t["Content-Type"]) {
				delete t["Content-Type"], r.upload.onprogress = this.onProgress.bind(this), r.upload.onload = this.onProgress.bind(this);
				var i = e.data;
				e.data = new window.FormData, i && n.getKeys(i, e.putFileAtEnd).forEach(function(t) {
					var r = i[t];
					r.tagName && "INPUT" === r.tagName.toUpperCase() ? "file" === r.type && [].forEach.call(r.files, function(t) {
						e.data.append(n.dataset(r, "name") || r.name || t.name || "file-" + n.uniqueID(), t)
					}) : e.data.append(t, r)
				})
			}
			r.onreadystatechange = this.onStateChange.bind(this), 0 !== e.timeout && (this.timer = setTimeout(this.onTimeout.bind(this), e.timeout)), r.open(e.method, e.url, !e.sync), Object.keys(t).forEach(function(e) {
				r.setRequestHeader(e, t[e])
			}), e.cookie && "withCredentials" in r && (r.withCredentials = !0), r.send(e.data), this.afterSend()
		}, s.onProgress = function(e) {
			e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
		}, s.onStateChange = function() {
			var e = this.xhr;
			4 === e.readyState && this.onLoad({
				status: e.status,
				result: e.responseText || ""
			})
		}, s.getResponseHeader = function(e) {
			var t = this.xhr;
			return t ? t.getResponseHeader(e) : ""
		}, s.destroy = function() {
			clearTimeout(this.timer);
			try {
				this.xhr.onreadystatechange = n.f, this.xhr.abort()
			} catch(e) {
				console.error("ignore error ajax destroy,", e)
			}
			o.destroy.call(this)
		}, e.exports = a
	}, , function(e, t) {
		var r = e.exports = {
			v: [{
				name: "version",
				reg: /^(\d*)$/
			}],
			o: [{
				name: "origin",
				reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
				names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
				format: "%s %s %d %s IP%d %s"
			}],
			s: [{
				name: "name"
			}],
			i: [{
				name: "description"
			}],
			u: [{
				name: "uri"
			}],
			e: [{
				name: "email"
			}],
			p: [{
				name: "phone"
			}],
			z: [{
				name: "timezones"
			}],
			r: [{
				name: "repeats"
			}],
			t: [{
				name: "timing",
				reg: /^(\d*) (\d*)/,
				names: ["start", "stop"],
				format: "%d %d"
			}],
			c: [{
				name: "connection",
				reg: /^IN IP(\d) (\S*)/,
				names: ["version", "ip"],
				format: "IN IP%d %s"
			}],
			b: [{
				push: "bandwidth",
				reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
				names: ["type", "limit"],
				format: "%s:%s"
			}],
			m: [{
				reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
				names: ["type", "port", "protocol", "payloads"],
				format: "%s %d %s %s"
			}],
			a: [{
				push: "rtp",
				reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
				names: ["payload", "codec", "rate", "encoding"],
				format: function(e) {
					return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
				}
			}, {
				push: "fmtp",
				reg: /^fmtp:(\d*) ([\S| ]*)/,
				names: ["payload", "config"],
				format: "fmtp:%d %s"
			}, {
				name: "control",
				reg: /^control:(.*)/,
				format: "control:%s"
			}, {
				name: "rtcp",
				reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
				names: ["port", "netType", "ipVer", "address"],
				format: function(e) {
					return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
				}
			}, {
				push: "rtcpFbTrrInt",
				reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
				names: ["payload", "value"],
				format: "rtcp-fb:%d trr-int %d"
			}, {
				push: "rtcpFb",
				reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
				names: ["payload", "type", "subtype"],
				format: function(e) {
					return null != e.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
				}
			}, {
				push: "ext",
				reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
				names: ["value", "direction", "uri", "config"],
				format: function(e) {
					return "extmap:%d" + (e.direction ? "/%s" : "%v") + " %s" + (e.config ? " %s" : "")
				}
			}, {
				push: "crypto",
				reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
				names: ["id", "suite", "config", "sessionConfig"],
				format: function(e) {
					return null != e.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
				}
			}, {
				name: "setup",
				reg: /^setup:(\w*)/,
				format: "setup:%s"
			}, {
				name: "mid",
				reg: /^mid:([^\s]*)/,
				format: "mid:%s"
			}, {
				name: "msid",
				reg: /^msid:(.*)/,
				format: "msid:%s"
			}, {
				name: "ptime",
				reg: /^ptime:(\d*)/,
				format: "ptime:%d"
			}, {
				name: "maxptime",
				reg: /^maxptime:(\d*)/,
				format: "maxptime:%d"
			}, {
				name: "direction",
				reg: /^(sendrecv|recvonly|sendonly|inactive)/
			}, {
				name: "icelite",
				reg: /^(ice-lite)/
			}, {
				name: "iceUfrag",
				reg: /^ice-ufrag:(\S*)/,
				format: "ice-ufrag:%s"
			}, {
				name: "icePwd",
				reg: /^ice-pwd:(\S*)/,
				format: "ice-pwd:%s"
			}, {
				name: "fingerprint",
				reg: /^fingerprint:(\S*) (\S*)/,
				names: ["type", "hash"],
				format: "fingerprint:%s %s"
			}, {
				push: "candidates",
				reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
				names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
				format: function(e) {
					var t = "candidate:%s %d %s %d %s %d typ %s";
					return t += null != e.raddr ? " raddr %s rport %d" : "%v%v", t += null != e.tcptype ? " tcptype %s" : "%v", null != e.generation && (t += " generation %d"), t += null != e["network-id"] ? " network-id %d" : "%v", t += null != e["network-cost"] ? " network-cost %d" : "%v"
				}
			}, {
				name: "endOfCandidates",
				reg: /^(end-of-candidates)/
			}, {
				name: "remoteCandidates",
				reg: /^remote-candidates:(.*)/,
				format: "remote-candidates:%s"
			}, {
				name: "iceOptions",
				reg: /^ice-options:(\S*)/,
				format: "ice-options:%s"
			}, {
				push: "ssrcs",
				reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
				names: ["id", "attribute", "value"],
				format: function(e) {
					var t = "ssrc:%d";
					return null != e.attribute && (t += " %s", null != e.value && (t += ":%s")), t
				}
			}, {
				push: "ssrcGroups",
				reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
				names: ["semantics", "ssrcs"],
				format: "ssrc-group:%s %s"
			}, {
				name: "msidSemantic",
				reg: /^msid-semantic:\s?(\w*) (\S*)/,
				names: ["semantic", "token"],
				format: "msid-semantic: %s %s"
			}, {
				push: "groups",
				reg: /^group:(\w*) (.*)/,
				names: ["type", "mids"],
				format: "group:%s %s"
			}, {
				name: "rtcpMux",
				reg: /^(rtcp-mux)/
			}, {
				name: "rtcpRsize",
				reg: /^(rtcp-rsize)/
			}, {
				name: "sctpmap",
				reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
				names: ["sctpmapNumber", "app", "maxMessageSize"],
				format: function(e) {
					return null != e.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
				}
			}, {
				name: "xGoogleFlag",
				reg: /^x-google-flag:([^\s]*)/,
				format: "x-google-flag:%s"
			}, {
				push: "rids",
				reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
				names: ["id", "direction", "params"],
				format: function(e) {
					return e.params ? "rid:%s %s %s" : "rid:%s %s"
				}
			}, {
				push: "imageattrs",
				reg: new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"),
				names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
				format: function(e) {
					return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "")
				}
			}, {
				name: "simulcast",
				reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),
				names: ["dir1", "list1", "dir2", "list2"],
				format: function(e) {
					return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "")
				}
			}, {
				name: "simulcast_03",
				reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
				names: ["value"],
				format: "simulcast: %s"
			}, {
				name: "framerate",
				reg: /^framerate:(\d+(?:$|\.\d+))/,
				format: "framerate:%s"
			}, {
				name: "sourceFilter",
				reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
				names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
				format: "source-filter: %s %s %s %s %s"
			}, {
				push: "invalid",
				names: ["value"]
			}]
		};
		Object.keys(r).forEach(function(e) {
			r[e].forEach(function(e) {
				e.reg || (e.reg = /(.*)/), e.format || (e.format = "%s")
			})
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = o(r(81)),
			i = o(r(80)),
			a = o(r(112));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = r(21),
			c = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
			u = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext,
			d = window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
			l = window.RTCDataChannel = window.RTCDataChannel || window.DataChannel,
			f = window.MediaStream = window.MediaStream || window.webkitMediaStream;

		function p(e) {
			var t = void 0;
			return t || (t = document.createElement("video")), !!t.canPlayType({
				ogg: 'video/ogg; codecs="theora"',
				h264: 'video/mp4; codecs="avc1.42E01E"',
				webm: 'video/webm; codecs="vp8, vorbis"',
				vp9: 'video/webm; codecs="vp9"',
				hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
			}[e] || e)
		}
		var h = {
			WebRTC: !!d && !!f,
			RTCPeerConnection: !!d,
			Vp8: p("webm"),
			Vp9: p("vp9"),
			H264: p("h264"),
			GetUserMedia: !!c && !!navigator.mediaDevices,
			DataChannel: !!(d && l && d.prototype && d.prototype.createDataChannel),
			WebAudio: !(!u || !u.prototype.createMediaStreamSource),
			MediaStream: !!f
		};

		function m() {
			var e = s && s.name,
				t = s && s.version;
			return console.log("platform", s), {
				prefix: e,
				version: t = (t = t && t.match(/(\d|\.)+/)[0]) && t.match(/\d+/)[0]
			}
		}
		t.default = {
			checkWebAudio: function() {
				return {
					WebAudio: h.WebAudio,
					MediaStream: h.MediaStream
				}
			},
			checkCompatibility: function() {
				var e = Object.assign(m(), {
					system: s && s.os.family + " " + s.os.version,
					browser: s && s.name,
					version: s && s.version
				});
				return new Promise(function(t, r) {
					var o = this;
					(0, i.default)(n.default.mark(function r() {
						var i, s;
						return n.default.wrap(function(r) {
							for(;;) switch(r.prev = r.next) {
								case 0:
									return i = Object.assign(e, h, {
										ScreenSharing: !1
									}), r.next = 3, a.default.getDevices().catch(function(e) {
										return console.warn(e), t(i)
									});
								case 3:
									return s = r.sent, i.MicrophoneList = s && s.audioIn || [], i.CameraList = s && s.video || [], i.Microphone = s && s.audioIn && s.audioIn.length > 0 || !1, i.Camera = s && s.video && s.video.length > 0 || !1, r.abrupt("return", t(i));
								case 9:
								case "end":
									return r.stop()
							}
						}, r, o)
					}))()
				})
			},
			checkVersion: function() {
				return m()
			}
		}, e.exports = t.default
	}, function(e, t, r) {
		var n = r(15),
			i = r(18),
			a = r(111);
		e.exports = function(e, t) {
			if(n(e), i(t) && t.constructor === e) return t;
			var r = a.f(e);
			return(0, r.resolve)(t), r.promise
		}
	}, function(e, t) {
		e.exports = function(e) {
			try {
				return {
					e: !1,
					v: e()
				}
			} catch(e) {
				return {
					e: !0,
					v: e
				}
			}
		}
	}, function(e, t, r) {
		var n, i, a, o = r(35),
			s = r(210),
			c = r(75),
			u = r(52),
			d = r(7),
			l = d.process,
			f = d.setImmediate,
			p = d.clearImmediate,
			h = d.MessageChannel,
			m = d.Dispatch,
			v = 0,
			_ = {},
			y = function() {
				var e = +this;
				if(_.hasOwnProperty(e)) {
					var t = _[e];
					delete _[e], t()
				}
			},
			R = function(e) {
				y.call(e.data)
			};
		f && p || (f = function(e) {
			for(var t = [], r = 1; arguments.length > r;) t.push(arguments[r++]);
			return _[++v] = function() {
				s("function" == typeof e ? e : Function(e), t)
			}, n(v), v
		}, p = function(e) {
			delete _[e]
		}, "process" == r(32)(l) ? n = function(e) {
			l.nextTick(o(y, e, 1))
		} : m && m.now ? n = function(e) {
			m.now(o(y, e, 1))
		} : h ? (a = (i = new h).port2, i.port1.onmessage = R, n = o(a.postMessage, a, 1)) : d.addEventListener && "function" == typeof postMessage && !d.importScripts ? (n = function(e) {
			d.postMessage(e + "", "*")
		}, d.addEventListener("message", R, !1)) : n = "onreadystatechange" in u("script") ? function(e) {
			c.appendChild(u("script")).onreadystatechange = function() {
				c.removeChild(this), y.call(e)
			}
		} : function(e) {
			setTimeout(o(y, e, 1), 0)
		}), e.exports = {
			set: f,
			clear: p
		}
	}, function(e, t, r) {
		var n = r(15),
			i = r(55),
			a = r(5)("species");
		e.exports = function(e, t) {
			var r, o = n(e).constructor;
			return void 0 === o || null == (r = n(o)[a]) ? t : i(r)
		}
	}, function(e, t, r) {
		var n = r(16),
			i = r(6),
			a = r(20);
		e.exports = function(e, t) {
			var r = (i.Object || {})[e] || Object[e],
				o = {};
			o[e] = t(r), n(n.S + n.F * a(function() {
				r(1)
			}), "Object", o)
		}
	}, , , , , , , function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractProtocolHandler = void 0;
		var n = a(r(1)),
			i = a(r(4));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var o = function() {
			function e() {
				(0, n.default)(this, e)
			}
			return(0, i.default)(e, [{
				key: "pack",
				value: function(e, t) {
					WEBRTCLOG.error("AbstractProtocolHandler:pack 需要子类实现")
				}
			}, {
				key: "unpack",
				value: function(e) {
					WEBRTCLOG.error("AbstractProtocolHandler:unpack 需要子类实现")
				}
			}]), e
		}();
		t.AbstractProtocolHandler = o
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(402);
		Object.defineProperty(t, "WebRTCGateWay", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWay
			}
		});
		var i = r(186);
		Object.defineProperty(t, "WebRTCGateWayContext", {
			enumerable: !0,
			get: function() {
				return i.WebRTCGateWayContext
			}
		});
		var a = r(312);
		Object.defineProperty(t, "WebRTCGateWayManager", {
			enumerable: !0,
			get: function() {
				return a.WebRTCGateWayManager
			}
		});
		var o = r(311);
		Object.defineProperty(t, "WhiteBoardGateWay", {
			enumerable: !0,
			get: function() {
				return o.WhiteBoardGateWay
			}
		});
		var s = r(183);
		Object.defineProperty(t, "WhiteBoardGateWayContext", {
			enumerable: !0,
			get: function() {
				return s.WhiteBoardGateWayContext
			}
		});
		var c = r(310);
		Object.defineProperty(t, "WhiteBoardGateWayManager", {
			enumerable: !0,
			get: function() {
				return c.WhiteBoardGateWayManager
			}
		});
		var u = r(308);
		Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return u.WebRTCGateWayProtocolHandler
			}
		}), Object.defineProperty(t, "WhiteBoardGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return u.WhiteBoardGateWayProtocolHandler
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(403);
		Object.defineProperty(t, "WebRTC", {
			enumerable: !0,
			get: function() {
				return n.WebRTC
			}
		});
		var i = r(265);
		Object.defineProperty(t, "NRTCAdapter", {
			enumerable: !0,
			get: function() {
				return i.NRTCAdapter
			}
		})
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n, i = r(120),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = function(e, t, r) {
			return t in e ? (0, a.default)(e, t, {
				value: r,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = r, e
		}
	}, function(e, t, r) {
		var n = r(16);
		n(n.S, "Object", {
			create: r(47)
		})
	}, function(e, t, r) {
		r(159);
		var n = r(6).Object;
		e.exports = function(e, t) {
			return n.create(e, t)
		}
	}, function(e, t, r) {
		e.exports = {
			default: r(160),
			__esModule: !0
		}
	}, function(e, t, r) {
		var n = r(18),
			i = r(15),
			a = function(e, t) {
				if(i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
			};
		e.exports = {
			set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
				try {
					(n = r(35)(Function.call, r(56).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
				} catch(e) {
					t = !0
				}
				return function(e, r) {
					return a(e, r), t ? e.__proto__ = r : n(e, r), e
				}
			}({}, !1) : void 0),
			check: a
		}
	}, function(e, t, r) {
		var n = r(16);
		n(n.S, "Object", {
			setPrototypeOf: r(162).set
		})
	}, function(e, t, r) {
		r(163), e.exports = r(6).Object.setPrototypeOf
	}, function(e, t, r) {
		e.exports = {
			default: r(164),
			__esModule: !0
		}
	}, function(e, t, r) {
		var n = r(16);
		n(n.S + n.F * !r(14), "Object", {
			defineProperty: r(12).f
		})
	}, function(e, t, r) {
		r(166);
		var n = r(6).Object;
		e.exports = function(e, t, r) {
			return n.defineProperty(e, t, r)
		}
	}, , , , , , , , , , , function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4SafariRelease = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(r(121).AbstractWebRTC);
		t.WebRTC4SafariRelease = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4FirefoxRelease = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(r(121).AbstractWebRTC);
		t.WebRTC4FirefoxRelease = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4ChromeRelease = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(r(121).AbstractWebRTC);
		t.WebRTC4ChromeRelease = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.isMatchVersion = function(e, t) {
			var r = n[e];
			if(!(r && r.length > 0)) return !1;
			return -1 !== r.findIndex(function(e, r) {
				return e === t
			})
		}, t.maxVersion = function(e) {
			var t = n[e];
			if(!(t && t.length > 0)) return -1;
			for(var r = t[0], i = 0, a = t.length; i < a; i++) r = Math.max(r, t[i]);
			return r
		};
		var n = t.RELEASE_VERSION_MAP = {
			chrome: ["65"],
			firefox: ["59"],
			safari: ["11"]
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getMediaStream = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
				audio: !0,
				video: !0
			};
			return /safari/gi.test(platform.name) && e.video && (e.video = !0), WEBRTCLOG.log("MediaTool: getLocalStream constraint:", e), navigator.mediaDevices.getUserMedia(e).then(function(t) {
				if(/Firefox/gi.test(platform.name) && t.getVideoTracks().length > 0) {
					var r = {
							width: {
								max: e.video.width
							},
							height: {
								max: e.video.height
							},
							advanced: [{
								width: e.video.width,
								height: e.video.height
							}]
						},
						n = t.getVideoTracks()[0];
					return WEBRTCLOG.warn("MediaTool:constraints:", r), n.applyConstraints(r).then(function() {
						return WEBRTCLOG.warn("变更视频流成功: ", t), Promise.resolve(t)
					}).catch(function(e) {
						return WEBRTCLOG.error("变更视频流失败，", e), Promise.reject(e)
					})
				}
				return Promise.resolve(t)
			}).catch(function(t) {
				var r = t.constructor === Object ? t.name : JSON.stringify(t);
				return WEBRTCLOG.error(e, t), Promise.reject(r)
			})
		}, t.removeTrackFromMediaStream = function(e) {
			if(e) {
				var t = e.getTracks();
				t && 0 !== t.length && t.forEach(function(t) {
					WEBRTCLOG.log("stop track", e.id, t), t.stop(), e.removeTrack(t)
				})
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WhiteBoardGateWayContext = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
					a = e.version,
					o = void 0 === a ? 31 : a,
					s = e.content;
				return r.version = o, r.content = s, r
			}
			return(0, a.default)(t, e), t
		}(r(185).AbstractGateWayContext);
		t.WhiteBoardGateWayContext = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWayManager = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2)),
			s = r(9),
			c = r(11),
			u = r(156);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = (0, c.getGlobal)(),
			f = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
						i = e.url,
						o = e.context,
						s = e.keepAliveInterval4Second;
					return r.reset(), o.constructor === u.WebRTCGateWayContext ? r.gateway = new u.WebRTCGateWay({
						url: i,
						protocolHandler: new u.WebRTCGateWayProtocolHandler
					}) : r.gateway = new u.WhiteBoardGateWay({
						url: i,
						protocolHandler: new u.WhiteBoardGateWayProtocolHandler
					}), r.context = o, r.keepAliveInterval4Second = s || 5, r
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "reset",
					value: function() {
						this.gateway = null, this.context = null, this.state = {
							hasLogined: !1
						}, this.cmd = {
							lastCmd: null
						}, this.keepAliveInterval4Second = 5, this.keepAliveTimer = null, this.keepAliveTimer && (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
					}
				}, {
					key: "setState",
					value: function(e) {
						var t = e.hasLogined,
							r = e.waiting4Message;
						void 0 !== t && (this.state.hasLogined = t), void 0 !== r && (this.state.waiting4Message = r)
					}
				}, {
					key: "startKeepAliveTimer",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:startKeepAliveTimer "), this.keepAliveTimer && this.stopKeepAliveTimer(), this.doSendKeepAliveTask()
					}
				}, {
					key: "stopKeepAliveTimer",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:stopKeepAliveTimer "), this.keepAliveTimer && (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
					}
				}, {
					key: "doSendKeepAliveTask",
					value: function() {
						WEBRTCLOG.error("心跳包发送逻辑未在子类实现")
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:destroy"), this.gateway && (this.gateway.destroy(), this.reset())
					}
				}]), t
			}(s.EventEmitter);
		t.AbstractGateWayManager = f
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWayContext = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.AbstractGateWayContext = function e(t) {
			(0, a.default)(this, e);
			var r = t.uid,
				n = t.cid;
			this.uid = r, this.cid = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayContext = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				r.uid = "" + r.uid, r.cid = "" + r.cid;
				var a = e.hasAudio,
					o = e.hasVideo,
					s = e.session_mode,
					c = e.params,
					u = e.browser,
					d = e.bypass_rtmp,
					l = e.record;
				return r.hasAudio = a, r.hasVideo = o, r.session_mode = s, r.params = c, r.browser = u, r.bypass_rtmp = d, r.record = l, r
			}
			return(0, a.default)(t, e), t
		}(r(185).AbstractGateWayContext);
		t.WebRTCGateWayContext = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWay = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2)),
			s = r(9),
			c = r(22),
			u = r(156);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				r.reset();
				var i = e.url,
					o = e.protocolHandler;
				return r.protocolHandler = o, r.initSocket(i), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "reset",
				value: function() {
					this.protocolHandler = null, this.url = "", this.ws = null, this.inited = !1
				}
			}, {
				key: "initSocket",
				value: function(e) {
					/^wss:\/\//.test(e) || (e = "wss://" + e), this.url = e, this.ws = new WebSocket(e);
					var t = this.ws;
					t.onopen = this.onOpen.bind(this), t.onmessage = this.onMessage.bind(this), t.onclose = this.onClose.bind(this), t.onerror = this.onError.bind(this)
				}
			}, {
				key: "onOpen",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onOpen -> ", e), this.inited = !0, this.emit("open", e)
				}
			}, {
				key: "onMessage",
				value: function(e) {
					var t = this.protocolHandler.unpack(e.data);
					null != t ? ((this.protocolHandler.constructor === u.WebRTCGateWayProtocolHandler && t.type !== c.WEBRTC_GATE_WAY_API.keep_alive_ack.key || this.protocolHandler.constructor === u.WhiteBoardGateWayProtocolHandler && t.type !== (0, c.WHITEBOARD_SERIALIZE)(c.WHITEBOARD_GATE_WAY_API.keep_alive_ack.key) && t.type !== (0, c.WHITEBOARD_SERIALIZE)(c.WHITEBOARD_GATE_WAY_API.keep_alive_node.key)) && WEBRTCLOG.log("AbstractGateWay:onMessage <- ", e.data), this.emit("message", t)) : WEBRTCLOG.error("解包数据为空")
				}
			}, {
				key: "onClose",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onClose <- ", e), this.emit("close", e)
				}
			}, {
				key: "onError",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onError <- ", e), this.emit("error", e)
				}
			}, {
				key: "send",
				value: function(e) {
					return(this.protocolHandler.constructor === u.WebRTCGateWayProtocolHandler && e.type !== c.WEBRTC_GATE_WAY_API.keep_alive.key || this.protocolHandler.constructor === u.WhiteBoardGateWayProtocolHandler && e.type !== (0, c.WHITEBOARD_SERIALIZE)(c.WHITEBOARD_GATE_WAY_API.keep_alive.key)) && WEBRTCLOG.log("AbstractGateWay:send -> ", e), this.ws && this.ws.readyState === WebSocket.OPEN ? (this.ws.send(JSON.stringify(e)), {
						code: c.GATE_WAY_RESPONSE_CODE.OK
					}) : (WEBRTCLOG.warn("AbstractGateWay:当前不能发送，等待ws连接成功之后发送"), {
						code: c.GATE_WAY_RESPONSE_CODE.NO_CONNECTION
					})
				}
			}, {
				key: "close",
				value: function() {
					WEBRTCLOG.log("AbstractGateWay:close"), this.ws && this.ws.close()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AbstractGateWay:destroy"), this.close(), this.protocolHandler = null, this.url = null, this.ws.onopen = null, this.ws.onmessage = null, this.ws.onclose = null, this.ws.onerror = null, this.ws = null
				}
			}]), t
		}(s.EventEmitter);
		t.AbstractGateWay = l
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractAdapter = void 0;
		var n = m(r(1)),
			i = m(r(4)),
			a = m(r(3)),
			o = m(r(2)),
			s = r(9),
			c = r(125),
			u = r(22),
			d = r(77),
			l = r(296),
			f = r(275),
			p = r(45),
			h = r(157);

		function m(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var v = r(266),
			_ = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return r._reset(), r.adapterRef.system = d.RtcSupport.checkVersion(), r.adapterRef.container = e.container, r.adapterRef.remoteContainer = e.remoteContainer, r.adapterRef.chromeId = e.chromeId, r.adapterRef.debug = e.debug, r.adapterRef.nim = e.nim, r.apiList = e.apiList, r.sdkRef = e.ref, r.channelId = null, window.WEBRTCLOG = new v({
						debug: e.debug,
						prefix: "WEBRTC"
					}), r.on("leaveChannel", function() {
						1 == r.adapterRef.mediaRecordHelper.checkIsRecording() && (WEBRTCLOG.log("对端离开：正在录制远端视频，即将停止"), r.adapterRef.mediaRecordHelper.uid != r.adapterRef.imInfo.uid && r.adapterRef.mediaRecordHelper.stop())
					}), r._init(), r
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this._resetGlobalParam(), this._resetSDKParam(), this._resetBusinessParam(), this._resetHelperParam(), this._resetApiParam(), this._resetStateParam()
					}
				}, {
					key: "_resetGlobalParam",
					value: function() {
						this.apiList = [], this.sdkRef = null, this.adapterRef = {}
					}
				}, {
					key: "_resetSDKParam",
					value: function() {
						this.adapterRef.container = null, this.adapterRef.remoteContainer = null, this.adapterRef.chromeId = null, this.adapterRef.debug = !1, this.adapterRef.nim = null
					}
				}, {
					key: "_resetBusinessParam",
					value: function() {
						this.adapterRef.webrtcGateWayBusiness = null, this.adapterRef.deviceBusiness = null, this.adapterRef.webrtcBusiness = null
					}
				}, {
					key: "_resetHelperParam",
					value: function() {
						this.adapterRef.mediaRecordHelper = null, this.adapterRef.system = null
					}
				}, {
					key: "_resetApiParam",
					value: function() {
						this.adapterRef.deviceApi = null, this.adapterRef.playApi = null, this.adapterRef.recordApi = null, this.adapterRef.commonApi = null, this.adapterRef.meeting4NRTCApi = null, this.adapterRef.meeting4WebRTCApi = null, this.adapterRef.captureApi = null, this.adapterRef.p2p4WebRTCApi = null
					}
				}, {
					key: "_resetStateParam",
					value: function() {
						var e = this;
						this.adapterRef.imInfo = null, this.adapterRef.monitorRemoteStreamStartTime = null, this.adapterRef.userJoinTimeoutId = null, this.adapterRef.audioHelperMap = {}, this.adapterRef.videoHelperMap = {}, this.adapterRef.signalInited = !1, this.adapterRef.needQueryAccountMap = {}, this.adapterRef.account4UidMap = {}, this.adapterRef.uid4AccountMap = {}, this.adapterRef.isCaller = !1, this.adapterRef.calling = !1, this.adapterRef.callee = null, this.adapterRef.channelId = null, this.adapterRef.type = null, this.adapterRef.beCalledInfo = null, this.adapterRef.callerInfo = null, this.adapterRef.target = {
							account: null,
							uid: null
						}, this.adapterRef.callAccepted = !1, this.adapterRef.sessionMode = null, this.adapterRef.state = {
							lastDeviceStatus: {
								audio: {
									type: null,
									device: null
								},
								video: {
									type: null,
									device: null
								}
							},
							audioDeviceHasOpened: !1,
							videoDeviceHasOpened: !1,
							chromeScreenShareOpened: !1,
							isFirstOpenMediaDevice: !0,
							rtcConnected: !1,
							startSessionTime: null,
							endSessionTime: null
						}, this.adapterRef.reconnectState ? (this.adapterRef.reconnectState.count = 0, this.adapterRef.reconnectState.isReconnect = !1, setTimeout(function() {
							e.adapterRef.reconnectState && e.adapterRef.reconnectState.wssTime && clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.isStoped = !1
						}, 300)) : this.adapterRef.reconnectState = {
							count: 0,
							isReconnect: !1,
							startReconnect: !1,
							isStoped: !1,
							wssTime: null
						}
					}
				}, {
					key: "_resetParamNeededByReConnect",
					value: function() {
						this.adapterRef.webrtcBusiness._destroyRtcSelf(), this.doDestroyRemoteResourceByUid(), this.apiList = [], this.adapterRef.container = null, this.adapterRef.remoteContainer = null, this.adapterRef.debug = !1, this.adapterRef.webrtcGateWayBusiness = null, this.adapterRef.deviceBusiness = null, this.adapterRef.webrtcBusiness = null, this._resetHelperParam(), this.adapterRef.playApi = null, this.adapterRef.recordApi = null, this.adapterRef.commonApi = null, this.adapterRef.meeting4NRTCApi = null, this.adapterRef.meeting4WebRTCApi = null, this.adapterRef.captureApi = null, this.adapterRef.p2p4WebRTCApi = null, this.adapterRef.monitorRemoteStreamStartTime = null, this.adapterRef.userJoinTimeoutId = null, this.adapterRef.reconnectState.isReconnect = !1, this.adapterRef.statsReportHelper = null
					}
				}, {
					key: "_init",
					value: function() {
						this._initBusiness(), this._initHelper(), this._initApi()
					}
				}, {
					key: "_initBusiness",
					value: function() {
						this._initWebRTCGateWayBusiness(), this._initDeviceBusiness(), this._initWebRTCBusiness()
					}
				}, {
					key: "_initHelper",
					value: function() {
						this._initMediaRecordHelper()
					}
				}, {
					key: "_initApi",
					value: function() {
						this._initDeviceApi(), this._initPlayApi(), this._initRecordApi(), this._initCommonApi(), this._initMeeting4NRTCApi(), this._initCaptureApi(), this._initMeeting4WebRTCApi(), this._initP2P4WebRTCApi()
					}
				}, {
					key: "_initWebRTCGateWayBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initWebRTCGateWayBusiness 初始化webrtc网关业务处理器..."), this.adapterRef.webrtcGateWayBusiness ? WEBRTCLOG.warn("AbstractAdapter:_initWebRTCGateWayBusiness 已存在的WebRTC网关业务处理器，不重复创建...") : this.adapterRef.webrtcGateWayBusiness = new l.WebRTCGateWayBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initDeviceBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initDeviceBusiness 初始化设备业务处理器..."), this.adapterRef.deviceBusiness ? WEBRTCLOG.warn("AbstractAdapter:_initDeviceBusiness 已存在的设备业务处理器，不重复创建...") : this.adapterRef.deviceBusiness = new l.DeviceBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initWebRTCBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initWebRTCBusiness"), this.adapterRef.webrtcBusiness ? WEBRTCLOG.warn("已存在的webrtcBusiness对象，不需要重复创建...") : this.adapterRef.webrtcBusiness = new l.WebRTCBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initIMBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initIMBusiness"), this.adapterRef.imBusiness ? WEBRTCLOG.warn("已存在的imBusiness对象，不需要重复创建...") : this.adapterRef.imBusiness = new l.IMBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_getWebRTCGateWayManager",
					value: function() {
						return this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
					}
				}, {
					key: "_getAudioHelperByUid",
					value: function(e) {
						e = "" + e;
						var t = this.adapterRef.audioHelperMap[e];
						return this.adapterRef.imInfo ? (t || (t = new c.AudioHelper({
							uid: e,
							isRemote: this.adapterRef.imInfo.uid != e,
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}), this.adapterRef.audioHelperMap[e] = t), t) : (WEBRTCLOG.error("不存在的imInfo信息对象，直接返回"), null)
					}
				}, {
					key: "_getVideoHelperByUid",
					value: function(e) {
						e = "" + e;
						var t = this.adapterRef.videoHelperMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getVideoHelperByUid 获取videoHelper uid=%o", e), t || (t = new c.VideoHelper({
							uid: e,
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}), this.adapterRef.videoHelperMap[e] = t), t
					}
				}, {
					key: "_updateRtc",
					value: function() {
						var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
						return WEBRTCLOG.log("AbstractAdapter:_updateRtc isUpdate=%s ", e), this.adapterRef.instance._isPlayer() || this.adapterRef.webrtcBusiness.selfWebRtcInstance ? (this.selfWebRtcInstance || this.adapterRef.webrtcBusiness._initWebRTCInstance4Self(!0), this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.localDescription && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.getSenders().length > 0 && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && "connected" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && "completed" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState ? (WEBRTCLOG.warn("update rtc later"), Promise.resolve()) : (this.adapterRef.webrtcBusiness._updateRtcStream(), this.adapterRef.webrtcBusiness._createOffer({
							isUpdate: e
						}))) : (WEBRTCLOG.warn("AbstractAdapter:_updateRtc 非互动者并且自己的RTC实例不存在，直接返回..."), Promise.resolve())
					}
				}, {
					key: "_initDeviceApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initDeviceApi"), this.adapterRef.deviceApi ? WEBRTCLOG.warn("deviceApi已初始化，不用重复创建...") : this.adapterRef.deviceApi = new f.DeviceApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initPlayApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initPlayApi"), this.adapterRef.playApi ? WEBRTCLOG.warn("playApi已初始化，不用重复创建...") : this.adapterRef.playApi = new f.PlayApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initRecordApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initRecordApi"), this.adapterRef.recordApi ? WEBRTCLOG.warn("recordApi已初始化，不用重复创建...") : this.adapterRef.recordApi = new f.RecordApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initCommonApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initCommonApi"), this.adapterRef.commonApi ? WEBRTCLOG.warn("commonApi已初始化，不用重复创建...") : this.adapterRef.commonApi = new f.CommonApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initMeeting4NRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMeeting4NRTCApi"), this.adapterRef.meeting4NRTCApi ? WEBRTCLOG.warn("meeting4NRTCApi已初始化，不用重复创建...") : this.adapterRef.meeting4NRTCApi = new f.Meeting4NRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initCaptureApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initCaptureApi"), this.adapterRef.captureApi ? WEBRTCLOG.warn("captureApi已初始化，不用重复创建...") : this.adapterRef.captureApi = new f.CaptureApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initMeeting4WebRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMeeting4WebRTCApi"), this.adapterRef.meeting4WebRTCApi ? WEBRTCLOG.warn("meeting4WebRTCApi已初始化，不用重复创建...") : this.adapterRef.meeting4WebRTCApi = new f.Meeting4WebRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initP2P4WebRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initP2P4WebRTCApi"), this.adapterRef.p2p4WebRTCApi ? WEBRTCLOG.warn("p2p4WebRTCApi已初始化，不用重复创建...") : this.adapterRef.p2p4WebRTCApi = new f.P2P4WebRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initApiReportHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initApiReportHelper 初始化数据上报管理器 ..."), this.adapterRef.apiReportHelper || (this.adapterRef.apiReportHelper = new c.ApiReportHelper({
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef,
							platform: u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE]
						}))
					}
				}, {
					key: "_initStatsReportHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initStatsReportHelper 初始化数据上报管理器 ..."), this.adapterRef.statsReportHelper || (this.adapterRef.statsReportHelper = new c.StatsReportHelper({
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}))
					}
				}, {
					key: "_initMediaRecordHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMediaRecordHelper 初始化媒体录制管理器 ..."), this.adapterRef.mediaRecordHelper ? WEBRTCLOG.warn("已存在的mediaRecordHelper对象，不需要重复...") : this.adapterRef.mediaRecordHelper = new c.MediaRecordHelper
					}
				}, {
					key: "doClearAfterRemoteLeave",
					value: function(e) {
						this.doDestroyRemoteResourceByUid(e), this.adapterRef.mediaRecordHelper && this.adapterRef.mediaRecordHelper.leave({
							uid: e
						})
					}
				}, {
					key: "doDestroyRemoteResourceByUid",
					value: function(e) {
						var t = this;
						if(WEBRTCLOG.log("AbstractAdapter:doDestroyRemoteResourceByUid uid=%o", e), e) return this._doDestroyRemoteRtcByUid(e), this._doDestroyRemoteMediaStreamByUid(e), void this._doDestroyMediaHelperByUid(e);
						var r = [],
							n = Object.keys(this.adapterRef.videoHelperMap),
							i = Object.keys(this.adapterRef.audioHelperMap);
						0 != n.length ? r = n : 0 != i.length && (r = i), r.map(function(e) {
							t.adapterRef.imInfo && t.adapterRef.imInfo.uid != e && (t._doDestroyRemoteRtcByUid(e), t._doDestroyRemoteMediaStreamByUid(e), t._doDestroyMediaHelperByUid(e))
						})
					}
				}, {
					key: "_doDestroyRemoteRtcByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyRemoteRtcByUid uid=%o", e), e ? this.adapterRef.webrtcBusiness ? this.adapterRef.webrtcBusiness._destroyRtcByUid(e) : WEBRTCLOG.error("不存在的webrtcBusiness对象，直接返回") : WEBRTCLOG.error("不存在uid=%s，直接返回", e)
					}
				}, {
					key: "_doDestroyRemoteMediaStreamByUid",
					value: function(e) {
						if(WEBRTCLOG.log("AbstractAdapter:_doDestroyRemoteMediaStreamByUid uid=%o", e), e) {
							var t = this._getAudioHelperByUid(e);
							t && t.remoteAudioStream && (t.removeTrackFromMediaStream(t.remoteAudioStream), this.adapterRef.webrtcBusiness.switchTrackEvent({
								stream: t.remoteAudioStream,
								uid: e,
								bindTrackEvent: !1
							}), t.remoteAudioStream = null);
							var r = this._getVideoHelperByUid(e);
							r && r.remoteVideoStream && (r.removeTrackFromMediaStream(r.remoteVideoStream), this.adapterRef.webrtcBusiness.switchTrackEvent({
								stream: r.remoteVideoStream,
								uid: e,
								bindTrackEvent: !1
							}), r.remoteVideoStream = null)
						} else WEBRTCLOG.error("不存在uid=%s，直接返回", e)
					}
				}, {
					key: "_isFirefox",
					value: function() {
						return /Firefox/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isChrome",
					value: function() {
						return /Chrome/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isSafari",
					value: function() {
						return /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isFirefoxMoreThan59",
					value: function() {
						return this._isFirefox() && this.adapterRef.system.version >= 59
					}
				}, {
					key: "_isFirefoxLessThan59",
					value: function() {
						return this._isFirefox() && this.adapterRef.system.version < 59
					}
				}, {
					key: "_doRemoteStream",
					value: function(e, t, r) {
						this._isFirefox() ? this._doRemoteStream4Firefox(e, t, r) : this._doRemoteStream4Other(e, t, r)
					}
				}, {
					key: "_doRemoteStream4Firefox",
					value: function(e, t, r) {
						var n = this._getAudioHelperByUid(t),
							i = this._getVideoHelperByUid(t);
						if(this.adapterRef.webrtcBusiness.getRtcObject(t))
							if(r) {
								WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Firefox remote stream uid: %s, track num: %d " + t + " " + e.getTracks().length);
								var a = e.getAudioTracks()[0],
									o = e.getVideoTracks()[0];
								a && n.setIsRemote(!0).composeTrack(t, a), o && i.setIsRemote(!0).composeTrack(t, o), this.emit(u.RTC_EVENTS.remoteTrack.key, {
									uid: t,
									account: this._getAccountByUid(t),
									track: r
								})
							} else WEBRTCLOG.warn("不存在的轨道...");
						else WEBRTCLOG.error("不存在的远程rtc对象 , track")
					}
				}, {
					key: "_doRemoteStream4Other",
					value: function(e, t, r) {
						if(e) {
							WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Other remote stream uid: %s, track num: %d", t, e.getTracks().length), e.getTracks().forEach(function(e) {
								WEBRTCLOG.log("--\x3e track kind=%s, id=%s , %o", e.kind, e.id, e)
							});
							var n = e.getAudioTracks()[0],
								i = e.getVideoTracks()[0];
							n && this._getAudioHelperByUid(t).setIsRemote(!0).composeTrack(t, n), i && this._getVideoHelperByUid(t).setIsRemote(!0).composeTrack(t, i), this.adapterRef.webrtcBusiness.switchTrackEvent({
								stream: e,
								uid: t
							}), n && this.emit(u.RTC_EVENTS.remoteTrack.key, {
								uid: t,
								account: this._getAccountByUid(t),
								track: n
							}), i && this.emit(u.RTC_EVENTS.remoteTrack.key, {
								uid: t,
								account: this._getAccountByUid(t),
								track: i
							})
						} else WEBRTCLOG.error("AbstractAdapter:_doRemoteStream4Other 远程流不存在...")
					}
				}, {
					key: "_setSessionConfig",
					value: function(e) {
						WEBRTCLOG.warn("AbstractAdapter:_setSessionConfig ", e), this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig = Object.assign(this.adapterRef.imInfo.sessionConfig, e), WEBRTCLOG.log("AbstractAdapter:_setSessionConfig value ", this.adapterRef.imInfo)
					}
				}, {
					key: "_setSessionVideoQuality",
					value: function(e) {
						this._validateVideoQuality(e) ? (this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig.videoQuality = e) : WEBRTCLOG.error("AbstractAdapter:_setSessionVideoQuality 非法值：%d", e)
					}
				}, {
					key: "_setSessionVideoFrameRate",
					value: function(e) {
						this._validateVideoFrameRate(e) ? (this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig.videoFrameRate = e) : WEBRTCLOG.error("AbstractAdapter:_setSessionVideoFrameRate 非法值：%d", e)
					}
				}, {
					key: "_startSession",
					value: function() {
						WEBRTCLOG.log("待校验的imInfo: %o", this.adapterRef.imInfo), this.adapterRef.imInfo.cid = this.adapterRef.imInfo.cid || this.adapterRef.imInfo.channelId, this.channelId = this.adapterRef.imInfo.cid, this.adapterRef.imInfo.sessionMode = this.adapterRef.imInfo.sessionMode || u.SESSION_MODE.P2P, this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.constructor === String && (this.adapterRef.imInfo.serverMap = JSON.parse(this.adapterRef.imInfo.serverMap)), this.adapterRef.instance.constructor === h.NRTCAdapter ? (WEBRTCLOG.log("NRTCAdapter实例 额外校验字段..."), p.tool.verifyOptions(this.adapterRef.imInfo, "appkey cid uid token sessionMode wssArr")) : this.adapterRef.imInfo.token = this.adapterRef.imInfo.cid, WEBRTCLOG.log("iminfo: ", this.adapterRef.imInfo), this.adapterRef.imInfo.sessionConfig.videoQuality == u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL && (this.adapterRef.imInfo.sessionConfig.videoQuality = u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_480P);
						var e = this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig).quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality;
						WEBRTCLOG.log("maxQuality:", e, ", quality:", this.adapterRef.imInfo.sessionConfig.videoQuality), this.adapterRef.imInfo.sessionConfig.videoQuality > e && (this.adapterRef.imInfo.sessionConfig.videoQuality = e), WEBRTCLOG.log("quality:", this.adapterRef.imInfo.sessionConfig.videoQuality);
						var t = this.sdkRef.getVideoSessionConfig({
							quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
							frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
						});
						if(console.log("videoConfig:", t), this.adapterRef.imInfo = Object.assign(this.adapterRef.imInfo, {
								videoConfig: t
							}), WEBRTCLOG.log("启动会话后的imInfo: ", this.adapterRef.imInfo), this._init(), this._initStatsReportHelper(), this._initApiReportHelper(), this.adapterRef.statsReportHelper.startStats(), this.adapterRef.apiReportHelper.uploadDataApi("start", {
								uid: this.adapterRef.imInfo.uid
							}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "meeting"
							}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: this.adapterRef.imInfo.sessionMode
							}), this.adapterRef.imInfo.sessionConfig.recordAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_audio"
							}), this.adapterRef.imInfo.sessionConfig.recordVideo && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_video"
							}), this.adapterRef.imInfo.sessionConfig.singleRecord && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_single_user"
							}), this.adapterRef.imInfo.sessionConfig.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "hd_audio"
							}), void 0 !== this.adapterRef.imInfo.sessionConfig.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "fps",
								ext: 0 == +this.adapterRef.imInfo.sessionConfig.videoFrameRate ? 0 : +this.adapterRef.imInfo.sessionConfig.videoFrameRate + 1
							}), this.adapterRef.imInfo.sessionConfig.liveEnable && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "bypass",
								ext: void 0 !== this.adapterRef.imInfo.sessionConfig.splitMode ? +this.adapterRef.imInfo.sessionConfig.splitMode + 1 : 0
							}), void 0 !== this.adapterRef.imInfo.sessionConfig.videoQuality) {
							var r = +this.adapterRef.imInfo.sessionConfig.videoQuality;
							r === u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? r = u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : r === u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (r = u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "video_quality",
								ext: r || 0
							})
						}
						return this.adapterRef.webrtcGateWayBusiness.doTryInit()
					}
				}, {
					key: "_stopSession",
					value: function() {
						return this._stopAllDataUpload(), this._stopIfInRecording(), this._resetStatus(), Promise.resolve()
					}
				}, {
					key: "_stopAllDataUpload",
					value: function() {
						this.adapterRef.statsReportHelper ? this.adapterRef.statsReportHelper.stopStats() : WEBRTCLOG.warn("AbstractAdapter: _stopSession: 已停止stats统计，请勿重复！"), this.adapterRef.apiReportHelper ? this.adapterRef.apiReportHelper.uploadDataApi("send") : WEBRTCLOG.warn("AbstractAdapter: _stopSession: 已停止api统计，请勿重复！")
					}
				}, {
					key: "_doDestroyLocalMediaStream",
					value: function() {
						this._doDestroyLocalMediaStream4Audio(), this._doDestroyLocalMediaStream4Video()
					}
				}, {
					key: "_doDestroyLocalMediaStream4Audio",
					value: function() {
						var e = this._getAudioHelperByUid(this.adapterRef.imInfo.uid);
						e && e.localAudioStream && (e.localAudioStream = null)
					}
				}, {
					key: "_doDestroyLocalMediaStream4Video",
					value: function() {
						var e = this._getVideoHelperByUid(this.adapterRef.imInfo.uid);
						e && e.localVideoStream && (e.localVideoStream = null)
					}
				}, {
					key: "_stopIfInRecording",
					value: function() {
						!0 === this._checkIsInRecording() && this.adapterRef.mediaRecordHelper.stop()
					}
				}, {
					key: "_checkIsInRecording",
					value: function() {
						return !(!this.adapterRef.mediaRecordHelper || !0 !== this.adapterRef.mediaRecordHelper.checkIsRecording())
					}
				}, {
					key: "_resetStatus",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_resetStatus "), this.adapterRef.imInfo && this.adapterRef.imInfo.uid && (this._getVideoHelperByUid(this.adapterRef.imInfo.uid).destroy(), this.adapterRef.deviceApi.stopDevice(u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN), this.adapterRef.deviceApi.stopDevice(u.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this._doDestroyLocalMediaStream()), this.doDestroyRemoteResourceByUid(), this._doDestroyBusinessObjects(), this._doDestroyApiObjects(), this._doDestroyHelperObjects(), this._resetStateParam()
					}
				}, {
					key: "_doDestroyBusinessObjects",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyBusinessObjects 销毁Business类子对象 "), this.adapterRef.webrtcGateWayBusiness && (this.adapterRef.webrtcGateWayBusiness.destroy(), this.adapterRef.webrtcGateWayBusiness = null), this.adapterRef.deviceBusiness && (this.adapterRef.deviceBusiness.destroy(), this.adapterRef.deviceBusiness = null), this.adapterRef.webrtcBusiness && (this.adapterRef.webrtcBusiness.destroy(), this.adapterRef.webrtcBusiness = null)
					}
				}, {
					key: "_doDestroyApiObjects",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyApiObjects 销毁Api类子对象 ")
					}
				}, {
					key: "_doDestroyHelperObjects",
					value: function() {
						WEBRTCLOG.log("AsbtractAdapter:_doDestroyHelperObjects 销毁helper类子对象"), this.adapterRef.statsReportHelper && (this.adapterRef.statsReportHelper = null)
					}
				}, {
					key: "_doDestroyMediaHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyMediaHelperByUid uid=%o", e), this._doDestroyAudioHelperByUid(e), this._doDestroyVideoHelperByUid(e)
					}
				}, {
					key: "_doDestroyAudioHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyAudioHelperByUid uid=%o", e);
						var t = this.adapterRef.audioHelperMap[e];
						t && (t.destroy(), t = null), delete this.adapterRef.audioHelperMap[e]
					}
				}, {
					key: "_doDestroyVideoHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyVideoHelperByUid uid=%o", e);
						var t = this.adapterRef.videoHelperMap[e];
						t && (t.destroy(), t = null), delete this.adapterRef.videoHelperMap[e]
					}
				}, {
					key: "_isPlayer",
					value: function() {
						return this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.MEETING && this.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_PLAYER || this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.P2P
					}
				}, {
					key: "_getUidByAccount",
					value: function(e) {
						var t = this.adapterRef.account4UidMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getUidByAccount " + e + " => " + t), t
					}
				}, {
					key: "_getAccountByUid",
					value: function(e) {
						var t = this.adapterRef.uid4AccountMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getAccountByUid " + e + " => " + t), t
					}
				}, {
					key: "_convertToUidIfAccout",
					value: function(e) {
						var t = e;
						return u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] === u.CONFIG_MAP.SDK_TYPE.WEBRTC && (t = this.adapterRef.instance._getUidByAccount(e)), t
					}
				}, {
					key: "_validateVideoQuality",
					value: function(e) {
						return(0, u.validateVideoQuality)(e)
					}
				}, {
					key: "_validateVideoFrameRate",
					value: function(e) {
						return(0, u.validateVideoFrameRate)(e)
					}
				}, {
					key: "_onSignalTimeout",
					value: function(e) {
						this.adapterRef.webrtcGateWayBusiness && this.adapterRef.webrtcGateWayBusiness._onSignalTimeout ? (this.adapterRef.webrtcGateWayBusiness._onSignalTimeout(), WEBRTCLOG.log("AbstractAdapter: _onSignalTimeout 网络断开了!")) : WEBRTCLOG.log("AbstractAdapter: _onSignalTimeout _onSignalTimeout undefined！")
					}
				}, {
					key: "judgeSendSdpOfferOrUpdate",
					value: function() {
						WEBRTCLOG.warn("judgeSendSdpOfferOrUpdate"), 1 == this.adapterRef.state.isFirstOpenMediaDevice ? (this.adapterRef.instance._updateRtc(!1), this.adapterRef.state.isFirstOpenMediaDevice = !1) : this.adapterRef.instance._updateRtc(!0)
					}
				}, {
					key: "checkExist",
					value: function(e) {
						return !!this[e]
					}
				}, {
					key: "setStartSessionTime",
					value: function() {
						this.adapterRef.state.startSessionTime = Date.now()
					}
				}, {
					key: "setEndSessionTime",
					value: function() {
						if(this.adapterRef.state.startSessionTime) {
							this.adapterRef.state.endSessionTime = Date.now();
							var e = this.adapterRef.state.endSessionTime - this.adapterRef.state.startSessionTime;
							this.emit(u.RTC_EVENTS.sessionDuration.key, e), this.adapterRef.state.startSessionTime = 0, this.adapterRef.state.endSessionTime = 0
						} else WEBRTCLOG.log("AbstractGateWay:send ->", "没有通话开始时间异常")
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:destroy"), this._doDestroyBusinessObjects(), this._doDestroyApiObjects(), this._doDestroyHelperObjects(), this._reset()
					}
				}]), t
			}(s.EventEmitter);
		t.AbstractAdapter = _
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = {
				framesEncoded: 1,
				qpSum: 1,
				audioOutputLevel: 1,
				googDecodingCTN: 1,
				googDecodingNormal: 1,
				googAvailableSendBandwidth: 1,
				googTargetEncBitrate: 1,
				googActualEncBitrate: 1,
				googRetransmitBitrate: 1,
				googTransmitBitrate: 1
			},
			i = {
				googCaptureStartNtpTimeMs: 1
			};
		t.default = {
			getStats: function(e) {
				var t = this;
				if(e && !/(failed|closed)/gi.test(e.iceConnectionState)) return navigator.mozGetUserMedia ? this.getStatsFirefox(e) : new Promise(function(r, n) {
					e.getStats(function(n) {
						var i = {};
						n.result().forEach(function(e) {
							var t = {};
							e.names().forEach(function(r) {
								t[r] = e.stat(r)
							}), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, i[t.id] = t
						}), e.lastStats = e.lastStats || {}, i = t.format(e, i), r(i)
					})
				})
			},
			getStatsFirefox: function(e) {
				var t = this;
				return e.getStats(null).then(function(r) {
					return e.lastStats = e.lastStats || {}, r = t.format(e, r), Promise.resolve(r)
				}).catch(function(e) {})
			},
			format: function(e, t) {
				return !e || /(failed|closed)/gi.test(e.iceConnectionState) ? {} : t = parseInt(e.uid) - parseInt(e.targetUid) == 0 ? this.ssrcLocal(e, t) : this.ssrcRemote(e, t)
			},
			formatSSRC: function(e, t, r, n) {
				return this[navigator.mozGetUserMedia ? "_formatSSRC_F" : "_formatSSRC_G"](e, t, r, n)
			},
			_formatSSRC_G: function(e, t, r, n) {
				var i = this,
					a = {};
				return Object.values(t).map(function(t) {
					if(("recv" !== n || /^ssrc_/gi.test(t.id)) && ("send" !== n || /^(bweforvideo|ssrc_)/gi.test(t.id))) {
						t = i.formatData(t);
						var r = new RegExp("ssrc_(\\d+)_" + n),
							o = t.id.match(r),
							s = t.id;
						a[s] = t, o && o[1] && ("recv" !== n || 0 !== e.uid ? (t.id = "ssrc_" + e.uid + "_" + n + "_" + ("recv" === n ? e.targetUid : 0) + "_" + t.mediaType, t = i.computeData(e, t), a[t.id] = t, delete a[s]) : delete a[s])
					}
				}), a
			},
			_formatSSRC_F: function(e, t, r, n) {
				var i = this,
					a = {},
					o = new RegExp("^" + ("send" === n ? "outbound" : "inbound") + "_", "i");
				return Object.values(t).map(function(t) {
					if(o.test(t.id)) {
						var r = t.id;
						t.id = t.id.replace(/\d+/, e.uid + "_" + n + "_" + ("recv" === n ? e.targetUid : 0)), t = i.computeData(e, t), a[t.id] = t, delete a[r]
					}
				}), a
			},
			formatData: function(e) {
				return Object.keys(e).map(function(t) {
					n[t] && (e[t] = (e[t] / 1024).toFixed(2)), i[t] && (e[t] = (e[t] / 1024 / 1024).toFixed(2))
				}), e
			},
			computeData: function(e, t) {
				var r = {
					peer: e,
					ssrcKey: t.id,
					currentItem: t
				};
				return t.bytesSent && (t.bitsSentPerSecond = this.getLastStats(Object.assign({}, r, {
					valueKey: "bytesSent"
				}))), t.packetsSent && (t.packetsSentPerSecond = this.getLastStats(Object.assign({}, r, {
					valueKey: "packetsSent"
				}))), t.bytesReceived && (t.bitsReceivedPerSecond = this.getLastStats(Object.assign({}, r, {
					valueKey: "bytesReceived"
				}))), t.packetsReceived && (t.packetsReceivedPerSecond = this.getLastStats(Object.assign({}, r, {
					valueKey: "packetsReceived"
				}))), t
			},
			ssrcLocal: function(e, t) {
				var r = e.localDescription;
				return this.formatSSRC(e, t, r.sdp, "send")
			},
			ssrcRemote: function(e, t) {
				var r = e.remoteDescription;
				return this.formatSSRC(e, t, r.sdp, "recv")
			},
			getLastStats: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.peer,
					r = e.ssrcKey,
					n = e.valueKey,
					i = e.currentItem,
					a = null;
				return a = t.lastStats[r] && t.lastStats[r][n] ? i[n] - t.lastStats[r][n] : i[n], a = /bytes/gi.test(n) ? (8 * a * 1e3 / 1 / 1024).toFixed(2) : 1e3 * a / 1, t.lastStats[r] = i[n], a
			}
		}, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = l(r(81)),
			i = l(r(80)),
			a = l(r(1)),
			o = l(r(4)),
			s = l(r(3)),
			c = l(r(2)),
			u = r(9),
			d = l(r(189));

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = function(e) {
			function t(e) {
				(0, a.default)(this, t);
				var r = (0, s.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r.webrtcBusiness = e.webrtcBusiness || null, r.interval = e.interval || 1e3, r
			}
			return(0, c.default)(t, e), (0, o.default)(t, [{
				key: "reset",
				value: function() {
					this.times = 0, this.timer && clearInterval(this.timer), this.timer = null, this.webrtcBusiness = null
				}
			}, {
				key: "start",
				value: function() {
					this.timer = setInterval(this.getStats.bind(this), this.interval)
				}
			}, {
				key: "stop",
				value: function() {
					this.reset()
				}
			}, {
				key: "getStats",
				value: function() {
					var e = (0, i.default)(n.default.mark(function e() {
						var t;
						return n.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									return t = {}, e.next = 3, this.getLocalStats();
								case 3:
									return t.self = e.sent, e.next = 6, this.getRemoteStats();
								case 6:
									t.other = e.sent, Object.keys(t.other).map(function(e) {
										t.self = Object.assign(t.self, t.other[e])
									}), this.times = (this.times || 0) + 1, this.emit("stats", t.self, this.times);
								case 10:
								case "end":
									return e.stop()
							}
						}, e, this)
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}, {
				key: "getLocalStats",
				value: function() {
					var e = (0, i.default)(n.default.mark(function e() {
						var t;
						return n.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									if((t = this.webrtcBusiness) && t.selfWebRtcInstance) {
										e.next = 3;
										break
									}
									return e.abrupt("return", {});
								case 3:
									return e.next = 5, d.default.getStats(t.selfWebRtcInstance.rtcConnection);
								case 5:
									return e.abrupt("return", e.sent);
								case 6:
								case "end":
									return e.stop()
							}
						}, e, this)
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}, {
				key: "getRemoteStats",
				value: function() {
					var e = (0, i.default)(n.default.mark(function e() {
						var t, r, a, o, s, c, u, l, f, p, h = this;
						return n.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									if((t = this.webrtcBusiness) && t.remoteWebRtcInstanceMap) {
										e.next = 3;
										break
									}
									return e.abrupt("return", {});
								case 3:
									r = {}, a = t.remoteWebRtcInstanceMap, o = Object.keys(a).map(function() {
										var e = (0, i.default)(n.default.mark(function e(t) {
											return n.default.wrap(function(e) {
												for(;;) switch(e.prev = e.next) {
													case 0:
														if(!a[t] || !a[t].rtcConnection) {
															e.next = 5;
															break
														}
														return e.next = 3, d.default.getStats(a[t].rtcConnection);
													case 3:
														return r[t] = e.sent, e.abrupt("return", r[t]);
													case 5:
													case "end":
														return e.stop()
												}
											}, e, h)
										}));
										return function(t) {
											return e.apply(this, arguments)
										}
									}()), s = !0, c = !1, u = void 0, e.prev = 9, l = o[Symbol.iterator]();
								case 11:
									if(s = (f = l.next()).done) {
										e.next = 18;
										break
									}
									return p = f.value, e.next = 15, p;
								case 15:
									s = !0, e.next = 11;
									break;
								case 18:
									e.next = 24;
									break;
								case 20:
									e.prev = 20, e.t0 = e.catch(9), c = !0, u = e.t0;
								case 24:
									e.prev = 24, e.prev = 25, !s && l.return && l.return();
								case 27:
									if(e.prev = 27, !c) {
										e.next = 30;
										break
									}
									throw u;
								case 30:
									return e.finish(27);
								case 31:
									return e.finish(24);
								case 32:
									return e.abrupt("return", r);
								case 33:
								case "end":
									return e.stop()
							}
						}, e, this, [
							[9, 20, 24, 32],
							[25, , 27, 31]
						])
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}]), t
		}(u.EventEmitter);
		t.default = f, e.exports = t.default
	}, function(e, t, r) {
		var n = r(15),
			i = r(109);
		e.exports = r(6).getIterator = function(e) {
			var t = i(e);
			if("function" != typeof t) throw TypeError(e + " is not iterable!");
			return n(t.call(e))
		}
	}, function(e, t, r) {
		r(54), r(48), e.exports = r(191)
	}, function(e, t, r) {
		e.exports = {
			default: r(192),
			__esModule: !0
		}
	}, function(e, t, r) {
		var n = r(78),
			i = r(5)("iterator"),
			a = r(23);
		e.exports = r(6).isIterable = function(e) {
			var t = Object(e);
			return void 0 !== t[i] || "@@iterator" in t || a.hasOwnProperty(n(t))
		}
	}, function(e, t, r) {
		r(54), r(48), e.exports = r(194)
	}, function(e, t, r) {
		e.exports = {
			default: r(195),
			__esModule: !0
		}
	}, function(e, t, r) {
		"use strict";
		t.__esModule = !0;
		var n = a(r(196)),
			i = a(r(193));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function() {
			return function(e, t) {
				if(Array.isArray(e)) return e;
				if((0, n.default)(Object(e))) return function(e, t) {
					var r = [],
						n = !0,
						a = !1,
						o = void 0;
					try {
						for(var s, c = (0, i.default)(e); !(n = (s = c.next()).done) && (r.push(s.value), !t || r.length !== t); n = !0);
					} catch(e) {
						a = !0, o = e
					} finally {
						try {
							!n && c.return && c.return()
						} finally {
							if(a) throw o
						}
					}
					return r
				}(e, t);
				throw new TypeError("Invalid attempt to destructure non-iterable instance")
			}
		}()
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n, i = r(197),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.default = {
			randomSSRC: function() {
				var e = Math.floor(1e8 * Math.random()) + 1e7;
				return e > 1e8 ? 99999999 : e
			},
			_createLocalDescription: function(e, t) {
				var r = {},
					n = this._iceGatherer.getLocalParameters(),
					i = this._iceGatherer.getLocalCandidates(),
					o = this._dtlsTransport.getLocalParameters(),
					s = this._dtlsTransport.getRemoteParameters(),
					c = this._localCapabilities,
					u = this._localTrackInfos;
				"offer" === t && this._sdpGlobalFields.version++, r.version = 0, r.origin = {
					address: "127.0.0.1",
					ipVer: 4,
					netType: "IN",
					sessionId: this._sdpGlobalFields.id,
					sessionVersion: this._sdpGlobalFields.version,
					username: "jitsi-ortc-webrtc-shim"
				}, r.name = "-", r.timing = {
					start: 0,
					stop: 0
				}, r.msidSemantic = {
					semantic: "WMS",
					token: "*"
				}, r.groups = [{
					mids: Array.from(this._mids.keys()).join(" "),
					type: "BUNDLE"
				}], r.media = [], r.fingerprint = {
					hash: o.fingerprints[0].value,
					type: o.fingerprints[0].algorithm
				};
				var d = !1,
					l = !0,
					f = !1,
					p = void 0;
				try {
					for(var h, m = c.codecs[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
						var v = h.value;
						if("video" === v.kind && "rtx" === v.name) {
							d = !0;
							break
						}
					}
				} catch(e) {
					f = !0, p = e
				} finally {
					try {
						!l && m.return && m.return()
					} finally {
						if(f) throw p
					}
				}
				var _ = !0,
					y = !1,
					R = void 0;
				try {
					for(var g, C = this._mids[Symbol.iterator](); !(_ = (g = C.next()).done); _ = !0) {
						var E = g.value,
							T = (0, a.default)(E, 2),
							b = T[0],
							O = T[1];
						S.call(this, b, O)
					}
				} catch(e) {
					y = !0, R = e
				} finally {
					try {
						!_ && C.return && C.return()
					} finally {
						if(y) throw R
					}
				}
				return new RTCSessionDescription({
					type: t,
					_sdpObject: r
				});

				function S(e, a) {
					var o = {};
					switch(o.type = a, a) {
						case "audio":
						case "video":
							o.protocol = "RTP/SAVPF", o.port = 9, o.direction = "sendrecv";
							break;
						case "application":
							o.protocol = "DTLS/SCTP", o.port = 0, o.payloads = "0", o.direction = "inactive"
					}
					o.connection = {
						ip: "127.0.0.1",
						version: 4
					}, o.mid = e, o.iceUfrag = n.usernameFragment, o.icePwd = n.password, o.candidates = [];
					var l = !0,
						f = !1,
						p = void 0;
					try {
						for(var h, m = i[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
							var v = h.value,
								_ = {
									component: 1
								};
							_.foundation = v.foundation, _.ip = v.ip, _.port = v.port, _.priority = v.priority, _.transport = v.protocol.toLowerCase(), _.type = v.type, "tcp" === _.transport && (_.tcptype = v.tcpType), o.candidates.push(_)
						}
					} catch(e) {
						f = !0, p = e
					} finally {
						try {
							!l && m.return && m.return()
						} finally {
							if(f) throw p
						}
					}
					if(o.endOfCandidates = "end-of-candidates", o.setup = "offer" === t ? "actpass" : "server" === s.role ? "active" : "passive", "audio" === a || "video" === a) {
						o.rtp = [], o.rtcpFb = [], o.fmtp = [];
						var y = [],
							R = !0,
							g = !1,
							C = void 0;
						try {
							for(var E, T = c.codecs[Symbol.iterator](); !(R = (E = T.next()).done); R = !0) {
								var b = E.value;
								if(!b.kind || b.kind === a) {
									y.push(b.preferredPayloadType);
									var O = {
										codec: b.name,
										payload: b.preferredPayloadType,
										rate: b.clockRate
									};
									if(b.numChannels > 1 && (O.encoding = b.numChannels), o.rtp.push(O), b.parameters) {
										var S = {
												config: "",
												payload: b.preferredPayloadType
											},
											A = !0,
											P = !1,
											I = void 0;
										try {
											for(var k, L = Object.keys(b.parameters)[Symbol.iterator](); !(A = (k = L.next()).done); A = !0) {
												var W = k.value;
												S.config && (S.config += ";"), S.config += W + "=" + b.parameters[W]
											}
										} catch(e) {
											P = !0, I = e
										} finally {
											try {
												!A && L.return && L.return()
											} finally {
												if(P) throw I
											}
										}
										S.config && o.fmtp.push(S)
									}
									var D = !0,
										M = !1,
										w = void 0;
									try {
										for(var B, G = (b.rtcpFeedback || [])[Symbol.iterator](); !(D = (B = G.next()).done); D = !0) {
											var N = B.value;
											o.rtcpFb.push({
												payload: b.preferredPayloadType,
												subtype: N.parameter || void 0,
												type: N.type
											})
										}
									} catch(e) {
										M = !0, w = e
									} finally {
										try {
											!D && G.return && G.return()
										} finally {
											if(M) throw w
										}
									}
								}
							}
						} catch(e) {
							g = !0, C = e
						} finally {
							try {
								!R && T.return && T.return()
							} finally {
								if(g) throw C
							}
						}
						0 === y.length ? (o.payloads = "9", o.port = 0, o.direction = "inactive") : o.payloads = y.join(" "), o.ssrcs = [], o.ssrcGroups = [];
						var j = !0,
							x = !1,
							F = void 0;
						try {
							for(var U, V = u.values()[Symbol.iterator](); !(j = (U = V.next()).done); j = !0) {
								var H = U.value,
									Y = H.rtpSender,
									K = H.stream.id,
									q = Y.track;
								if("ended" !== q.readyState && q.kind === a) {
									H.ssrc || (H.ssrc = this.randomSSRC());
									var J = d && "video" === q.kind;
									J && !H.rtxSsrc && (H.rtxSsrc = H.ssrc + 1), o.ssrcs.push({
										attribute: "cname",
										id: H.ssrc,
										value: CNAME
									}), o.ssrcs.push({
										attribute: "msid",
										id: H.ssrc,
										value: K + " " + q.id
									}), o.ssrcs.push({
										attribute: "mslabel",
										id: H.ssrc,
										value: K
									}), o.ssrcs.push({
										attribute: "label",
										id: H.ssrc,
										value: q.id
									}), J && (o.ssrcs.push({
										attribute: "cname",
										id: H.rtxSsrc,
										value: CNAME
									}), o.ssrcs.push({
										attribute: "msid",
										id: H.rtxSsrc,
										value: K + " " + q.id
									}), o.ssrcs.push({
										attribute: "mslabel",
										id: H.rtxSsrc,
										value: K
									}), o.ssrcs.push({
										attribute: "label",
										id: H.rtxSsrc,
										value: q.id
									}), o.ssrcGroups.push({
										semantics: "FID",
										ssrcs: H.ssrc + " " + H.rtxSsrc
									}))
								}
							}
						} catch(e) {
							x = !0, F = e
						} finally {
							try {
								!j && V.return && V.return()
							} finally {
								if(x) throw F
							}
						}
						o.ext = [];
						var Q = !0,
							z = !1,
							$ = void 0;
						try {
							for(var X, Z = c.headerExtensions[Symbol.iterator](); !(Q = (X = Z.next()).done); Q = !0) {
								var ee = X.value;
								ee.kind && ee.kind !== a || o.ext.push({
									value: ee.preferredId,
									uri: ee.uri
								})
							}
						} catch(e) {
							z = !0, $ = e
						} finally {
							try {
								!Q && Z.return && Z.return()
							} finally {
								if(z) throw $
							}
						}
						o.rtcpMux = "rtcp-mux", o.rtcpRsize = "rtcp-rsize"
					}
					r.media.push(o)
				}
			},
			mergeConstraints: function(e, t) {
				if(!e || !t) return e || t;
				var r = e;
				for(var n in t) r[n] = t[n];
				return r
			},
			iceCandidateType: function(e) {
				return e.split(" ")[7]
			},
			formatTypePreference: function(e) {
				if(/Chrome\/\d+/.test(navigator.userAgent)) switch(e) {
					case 0:
						return "TURN/TLS";
					case 1:
						return "TURN/TCP";
					case 2:
						return "TURN/UDP"
				} else if(/Firefox\/\d+/.test(navigator.userAgent)) switch(e) {
					case 0:
						return "TURN/TCP";
					case 5:
						return "TURN/UDP"
				}
				return ""
			},
			maybeSetOpusOptions: function(e, t) {
				return "true" === t.opusStereo ? e = this.setCodecParam(e, "opus/48000", "stereo", "1") : "false" === t.opusStereo && (e = this.removeCodecParam(e, "opus/48000", "stereo")), "true" === t.opusFec ? e = this.setCodecParam(e, "opus/48000", "useinbandfec", "1") : "false" === t.opusFec && (e = this.removeCodecParam(e, "opus/48000", "useinbandfec")), "true" === t.opusDtx ? e = this.setCodecParam(e, "opus/48000", "usedtx", "1") : "false" === t.opusDtx && (e = this.removeCodecParam(e, "opus/48000", "usedtx")), t.opusMaxPbr && (e = this.setCodecParam(e, "opus/48000", "maxplaybackrate", t.opusMaxPbr)), e
			},
			maybeSetAudioSendBitRate: function(e, t) {
				return t.audioSendBitrate ? (WEBRTCLOG.log("Prefer audio send bitrate: " + t.audioSendBitrate), this.preferBitRate(e, t.audioSendBitrate, "audio")) : e
			},
			maybeSetAudioReceiveBitRate: function(e, t) {
				return t.audioRecvBitrate ? (WEBRTCLOG.log("Prefer audio receive bitrate: " + t.audioRecvBitrate), this.preferBitRate(e, t.audioRecvBitrate, "audio")) : e
			},
			maybeSetVideoSendBitRate: function(e, t) {
				return t.videoSendBitrate ? (WEBRTCLOG.log("Prefer video send bitrate: " + t.videoSendBitrate), this.preferBitRate(e, t.videoSendBitrate, "video")) : e
			},
			maybeSetVideoReceiveBitRate: function(e, t) {
				return t.videoRecvBitrate ? (WEBRTCLOG.log("Prefer video receive bitrate: " + t.videoRecvBitrate), this.preferBitRate(e, t.videoRecvBitrate, "video")) : e
			},
			preferBitRate: function(e, t, r) {
				var n = e.split("\r\n"),
					i = this.findLine(n, "m=", r);
				if(null === i) return WEBRTCLOG.log("Failed to add bandwidth line to sdp, as no m-line found"), e;
				var a = this.findLineInRange(n, i + 1, -1, "m=");
				null === a && (a = n.length);
				var o = this.findLineInRange(n, i + 1, a, "c=");
				if(null === o) return WEBRTCLOG.log("Failed to add bandwidth line to sdp, as no c-line found"), e;
				var s = this.findLineInRange(n, o + 1, a, "b=AS");
				s && n.splice(s, 1);
				var c = "b=AS:" + t;
				return n.splice(o + 1, 0, c), e = n.join("\r\n")
			},
			maybeSetVideoSendInitialBitRate: function(e, t) {
				var r = t.videoSendInitialBitrate;
				if(!r) return e;
				var n = r,
					i = t.videoSendBitrate;
				i && (r > i && (WEBRTCLOG.log("Clamping initial bitrate to max bitrate of " + i + " kbps."), r = i, t.videoSendInitialBitrate = r), n = i);
				var a = e.split("\r\n");
				if(null === this.findLine(a, "m=", "video")) return WEBRTCLOG.log("Failed to find video m-line"), e;
				var o = t.videoRecvCodec;
				return e = this.setCodecParam(e, o, "x-google-min-bitrate", t.videoSendInitialBitrate.toString()), e = this.setCodecParam(e, o, "x-google-max-bitrate", n.toString())
			},
			removePayloadTypeFromMline: function(e, t) {
				e = e.split(" ");
				for(var r = 0; r < e.length; ++r) e[r] === t.toString() && e.splice(r, 1);
				return e.join(" ")
			},
			removeCodecByName: function(e, t) {
				var r = this.findLine(e, "a=rtpmap", t);
				if(null === r) return e;
				var n = this.getCodecPayloadTypeFromLine(e[r]);
				e.splice(r, 1);
				var i = this.findLine(e, "m=", "video");
				return null === i ? e : (e[i] = this.removePayloadTypeFromMline(e[i], n), e)
			},
			removeCodecByPayloadType: function(e, t) {
				var r = this.findLine(e, "a=rtpmap", t.toString());
				if(null === r) return e;
				e.splice(r, 1);
				var n = this.findLine(e, "m=", "video");
				return null === n ? e : (e[n] = this.removePayloadTypeFromMline(e[n], t), e)
			},
			maybeRemoveVideoFec: function(e, t) {
				if("false" !== t.videoFec) return e;
				var r = e.split("\r\n"),
					n = this.findLine(r, "a=rtpmap", "red");
				if(null === n) return e;
				var i = this.getCodecPayloadTypeFromLine(r[n]);
				if(r = this.removeCodecByPayloadType(r, i), r = this.removeCodecByName(r, "ulpfec"), null === (n = this.findLine(r, "a=fmtp", i.toString()))) return e;
				var a = this.parseFmtpLine(r[n]).pt;
				return null === a ? e : (r.splice(n, 1), (r = this.removeCodecByPayloadType(r, a)).join("\r\n"))
			},
			maybePreferAudioSendCodec: function(e, t) {
				return this.maybePreferCodec(e, "audio", "send", t.audioSendCodec)
			},
			maybePreferAudioReceiveCodec: function(e, t) {
				return this.maybePreferCodec(e, "audio", "receive", t.audioRecvCodec)
			},
			maybePreferVideoSendCodec: function(e, t) {
				return this.maybePreferCodec(e, "video", "send", t.videoSendCodec)
			},
			maybePreferVideoReceiveCodec: function(e, t) {
				return this.maybePreferCodec(e, "video", "receive", t.videoRecvCodec)
			},
			maybePreferCodec: function(e, t, r, n) {
				var i = t + " " + r + " codec";
				if(!n) return WEBRTCLOG.log("No preference on " + i + "."), e;
				WEBRTCLOG.log("Prefer " + i + ": " + n);
				var a = e.split("\r\n"),
					o = this.findLine(a, "m=", t);
				if(null === o) return e;
				var s = this.getCodecPayloadType(a, n);
				return s ? a[o] = this.setDefaultCodec(a[o], s) : WEBRTCLOG.error("no prefered codec found for ", n), e = a.join("\r\n")
			},
			setCodecParam: function(e, t, r, n) {
				var i = e.split("\r\n"),
					a = this.findFmtpLine(i, t),
					o = {};
				if(null === a) {
					var s = this.findLine(i, "a=rtpmap", t);
					if(null === s) return e;
					var c = this.getCodecPayloadTypeFromLine(i[s]);
					o.pt = c.toString(), o.params = {}, o.params[r] = n, i.splice(s + 1, 0, this.writeFmtpLine(o))
				} else(o = this.parseFmtpLine(i[a])).params[r] = n, i[a] = this.writeFmtpLine(o);
				return e = i.join("\r\n")
			},
			removeCodecParam: function(e, t, r) {
				var n = e.split("\r\n"),
					i = this.findFmtpLine(n, t);
				if(null === i) return e;
				var a = this.parseFmtpLine(n[i]);
				delete a.params[r];
				var o = this.writeFmtpLine(a);
				return null === o ? n.splice(i, 1) : n[i] = o, e = n.join("\r\n")
			},
			parseFmtpLine: function(e) {
				var t = {},
					r = e.indexOf(" "),
					n = e.substring(r + 1).split("; "),
					i = new RegExp("a=fmtp:(\\d+)"),
					a = e.match(i);
				if(!a || 2 !== a.length) return null;
				t.pt = a[1];
				for(var o = {}, s = 0; s < n.length; ++s) {
					var c = n[s].split("=");
					2 === c.length && (o[c[0]] = c[1])
				}
				return t.params = o, t
			},
			writeFmtpLine: function(e) {
				if(!e.hasOwnProperty("pt") || !e.hasOwnProperty("params")) return null;
				var t = e.pt,
					r = e.params,
					n = [],
					i = 0;
				for(var a in r) n[i] = a + "=" + r[a], ++i;
				return 0 === i ? null : "a=fmtp:" + t.toString() + " " + n.join("; ")
			},
			findFmtpLine: function(e, t) {
				var r = this.getCodecPayloadType(e, t);
				return r ? this.findLine(e, "a=fmtp:" + r.toString()) : null
			},
			findLine: function(e, t, r) {
				return this.findLineInRange(e, 0, -1, t, r)
			},
			findLineInRange: function(e, t, r, n, i) {
				for(var a = -1 !== r ? r : e.length, o = t; o < a; ++o)
					if(0 === e[o].indexOf(n) && (!i || -1 !== e[o].toLowerCase().indexOf(i.toLowerCase()))) return o;
				return null
			},
			getCodecPayloadType: function(e, t) {
				var r = this.findLine(e, "a=rtpmap", t);
				return r ? this.getCodecPayloadTypeFromLine(e[r]) : null
			},
			getCodecPayloadTypeFromLine: function(e) {
				var t = new RegExp("a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+"),
					r = e.match(t);
				return r && 2 === r.length ? r[1] : null
			},
			setDefaultCodec: function(e, t) {
				var r = e.split(" "),
					n = r.slice(0, 3);
				n.push(t);
				for(var i = 3; i < r.length; i++) r[i] !== t && n.push(r[i]);
				return n.join(" ")
			}
		}, e.exports = t.default
	}, function(e, t, r) {
		var n = r(142),
			i = /%[sdv%]/g,
			a = function(e, t, r) {
				var n = [e + "=" + (t.format instanceof Function ? t.format(t.push ? r : r[t.name]) : t.format)];
				if(t.names)
					for(var a = 0; a < t.names.length; a += 1) {
						var o = t.names[a];
						t.name ? n.push(r[t.name][o]) : n.push(r[t.names[a]])
					} else n.push(r[t.name]);
				return function(e) {
					var t = 1,
						r = arguments,
						n = r.length;
					return e.replace(i, function(e) {
						if(t >= n) return e;
						var i = r[t];
						switch(t += 1, e) {
							case "%%":
								return "%";
							case "%s":
								return String(i);
							case "%d":
								return Number(i);
							case "%v":
								return ""
						}
					})
				}.apply(null, n)
			},
			o = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
			s = ["i", "c", "b", "a"];
		e.exports = function(e, t) {
			t = t || {}, null == e.version && (e.version = 0), null == e.name && (e.name = " "), e.media.forEach(function(e) {
				null == e.payloads && (e.payloads = "")
			});
			var r = t.outerOrder || o,
				i = t.innerOrder || s,
				c = [];
			return r.forEach(function(t) {
				n[t].forEach(function(r) {
					r.name in e && null != e[r.name] ? c.push(a(t, r, e)) : r.push in e && null != e[r.push] && e[r.push].forEach(function(e) {
						c.push(a(t, r, e))
					})
				})
			}), e.media.forEach(function(e) {
				c.push(a("m", n.m[0], e)), i.forEach(function(t) {
					n[t].forEach(function(r) {
						r.name in e && null != e[r.name] ? c.push(a(t, r, e)) : r.push in e && null != e[r.push] && e[r.push].forEach(function(e) {
							c.push(a(t, r, e))
						})
					})
				})
			}), c.join("\r\n") + "\r\n"
		}
	}, function(e, t, r) {
		var n = function(e) {
				return String(Number(e)) === e ? Number(e) : e
			},
			i = function(e, t, r) {
				var i = e.name && e.names;
				e.push && !t[e.push] ? t[e.push] = [] : i && !t[e.name] && (t[e.name] = {});
				var a = e.push ? {} : i ? t[e.name] : t;
				! function(e, t, r, i) {
					if(i && !r) t[i] = n(e[1]);
					else
						for(var a = 0; a < r.length; a += 1) null != e[a + 1] && (t[r[a]] = n(e[a + 1]))
				}(r.match(e.reg), a, e.names, e.name), e.push && t[e.push].push(a)
			},
			a = r(142),
			o = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
		t.parse = function(e) {
			var t = {},
				r = [],
				n = t;
			return e.split(/(\r\n|\r|\n)/).filter(o).forEach(function(e) {
				var t = e[0],
					o = e.slice(2);
				"m" === t && (r.push({
					rtp: [],
					fmtp: []
				}), n = r[r.length - 1]);
				for(var s = 0; s < (a[t] || []).length; s += 1) {
					var c = a[t][s];
					if(c.reg.test(o)) return i(c, n, o)
				}
			}), t.media = r, t
		};
		var s = function(e, t) {
			var r = t.split(/=(.+)/, 2);
			return 2 === r.length ? e[r[0]] = n(r[1]) : 1 === r.length && t.length > 1 && (e[r[0]] = void 0), e
		};
		t.parseParams = function(e) {
			return e.split(/\;\s?/).reduce(s, {})
		}, t.parseFmtpConfig = t.parseParams, t.parsePayloads = function(e) {
			return e.split(" ").map(Number)
		}, t.parseRemoteCandidates = function(e) {
			for(var t = [], r = e.split(" ").map(n), i = 0; i < r.length; i += 3) t.push({
				component: r[i],
				ip: r[i + 1],
				port: r[i + 2]
			});
			return t
		}, t.parseImageAttributes = function(e) {
			return e.split(" ").map(function(e) {
				return e.substring(1, e.length - 1).split(",").reduce(s, {})
			})
		}, t.parseSimulcastStreamList = function(e) {
			return e.split(";").map(function(e) {
				return e.split(",").map(function(e) {
					var t, r = !1;
					return "~" !== e[0] ? t = n(e) : (t = n(e.substring(1, e.length)), r = !0), {
						scid: t,
						paused: r
					}
				})
			})
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n, i = r(143),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		var o = r(110),
			s = a.default.checkVersion(),
			c = {};
		t.default = {
			fnShake: function(e) {
				var t = this,
					r = e.fn,
					n = e.peer,
					i = void 0 === n ? {} : n;
				if(r) {
					if(i) return i.id || (i.id = Object.keys(c).length + 1), r = "_" + r, c[i.id] || (c[i.id] = {}), c[i.id] && c[i.id][r] && (WEBRTCLOG.log("destroy " + r + " timer"), clearTimeout(c[i.id][r]), c[i.id][r] = null), WEBRTCLOG.log("create " + r + " timer"), new Promise(function(n) {
						c[i.id][r] = setTimeout(function() {
							c[i.id][r] = null, n(t[r](e))
						}, 200)
					});
					WEBRTCLOG.error("RtcUtil:fnShake peer is null")
				}
			},
			createOffer: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				return this.fnShake({
					peer: e,
					fn: "createOffer"
				})
			},
			_createOffer: function() {
				var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).peer;
				WEBRTCLOG.log("------ do createoffer ------");
				var t = {
					offerToReceiveVideo: 1,
					offerToReceiveAudio: 1
				};
				if(e.uid - e.targetUid != 0) {
					var r = e.getLocalStreams(),
						n = r[0] && r[0].getTracks() || !1;
					n && 0 !== n.length || e.addTransceiver && "Safari" === s.prefix && (e.addTransceiver("audio"), e.addTransceiver("video"))
				}
				return WEBRTCLOG.log("iceConnectionState :", e.iceConnectionState), e.iceConnectionState && "failed" == e.iceConnectionState ? t.iceRestart = !0 : "connected" != e.iceConnectionState && "completed" != e.iceConnectionState && (t.iceRestart = !0), e.createOffer(t)
			},
			formatSdp: function() {
				var e = this,
					t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					r = t.offerOrAnswer,
					n = t.uid,
					i = t.highAudio,
					a = t.stero,
					c = t.targetUid,
					u = t.chromeScreenShareOpened,
					d = t.stream || new MediaStream,
					l = r.sdp,
					f = r.type,
					p = [],
					h = [];
				if(/h264/i.test(l)) {
					var m = o.parse(l);
					WEBRTCLOG.log(c + " 原始sdp " + f + " \n", l);
					var v = d.getAudioTracks()[0],
						_ = d.getVideoTracks()[0];
					return m.media && m.media.map(function(t) {
						if(t.candidates && delete t.candidates, t.direction = c !== n ? "recvonly" : /recvonly/.test(t.direction) ? "recvonly" : "sendonly", (/audio/.test(t.type) && !v || /video/.test(t.type) && !_) && delete t.ssrcs && delete t.ssrcGroups && delete t.msid, "audio" === t.type && (h.push(t.mid), t), "video" === t.type && _) {
							var o = [];
							if(t.rtp && t.rtp.length && t.rtp.map(function(e) {
									"H264" === e.codec && o.push(e.payload)
								}), t.fmtp && t.fmtp.length && t.fmtp.map(function(e) {
									-1 != o.indexOf(e.payload) && e.config && -1 === e.config.indexOf("x-google-min-bitrate=1024") && u && (e.config += ";x-google-min-bitrate=1024"), -1 != o.indexOf(e.payload) && e.config && -1 !== e.config.indexOf("x-google-min-bitrate=1024") && !u && (e.config = e.config.replace(";x-google-min-bitrate=1024", ""))
								}), t.ssrcs.map(function(e) {
									/^label$/.test(e.attribute) && e.value !== _.id && p.push(e.id)
								}), "Firefox" === s.prefix && t.msid) {
								var d = t.msid.split(" ");
								if(d[1] == _.id) {
									d[1] = d[1].replace(/([\da-zA-Z]{4})/, function(e, t, r) {
										var n = "",
											i = t,
											a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
										e && (i = Math.round(Math.random() * (r - t)) + t);
										for(var o = 0; o < i; o++) n += a[Math.round(Math.random() * (a.length - 1))];
										return n
									}(!1, 4))
								} else d[1] = _.id;
								t.msid = d.join(" ")
							}
						}
						if("audio" === t.type && (t.ptime = 60, t.maxptime = 60, t.fmtp && t.fmtp.length)) {
							var l = !1,
								f = i ? 48e3 : 16e3;
							t.fmtp.map(function(e) {
								e.config && -1 !== e.config.indexOf("minptime=") && (e.config = e.config.replace(/minptime=\d+/, "minptime=60")), e.config && -1 !== e.config.indexOf("sprop-maxcapturerate=") && -1 !== e.config.indexOf("maxplaybackrate") && (l = !0, e.config = e.config.replace(/sprop-maxcapturerate=\d+/, "sprop-maxcapturerate=" + f), e.config = e.config.replace(/maxplaybackrate=\d+/, "maxplaybackrate=" + f)), l || (e.config += ";maxplaybackrate=" + f + ";sprop-maxcapturerate=" + f), a && (e.config += ";maxaveragebitrate=131072;stereo=1;sprop-stereo=1;cbr=1")
							})
						}
						if("offer" === r.type) {
							var y = t.mid;
							m.groups && m.groups.map(function(e) {
								var r = e.mids.split(" "); - 1 !== r.indexOf(y) && (r.splice(r.indexOf(y), 1, t.mid), e.mids = r.join(" "))
							})
						}
						t.fmtp = e.limitFrame(t.fmtp)
					}), r.sdp = o.write(m), p.length > 0 && p.map(function(e) {
						var t = new RegExp("a=ssrc:" + e + ".+\\r\\n", "gi");
						r.sdp = r.sdp.replace(t, "")
					}), r
				}
				WEBRTCLOG.error("该机型浏览器不支持H264编码")
			},
			limitFrame: function(e) {
				return e.map(function(e) {
					/42e01f/gi.test(e.config) && (e.config += ";max-fs=12288")
				}), e
			},
			setMediaBitrates: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.sdp,
					r = e.bit,
					n = void 0 === r ? {} : r,
					i = n.video,
					a = void 0 === i ? 500 : i,
					s = n.audio,
					c = void 0 === s ? 500 : s,
					u = o.parse(t);
				return u.media && u.media.map(function(e) {
					e.bandwidth = [{
						type: navigator.mozGetUserMedia ? "TIAS" : "AS",
						limit: "audio" === e.type ? c : a
					}]
				}), o.write(u)
			},
			formatSSRCChrome: function(e, t, r) {
				return e.map(function(e, n) {
					return e.id = t + "0" + r + "0" + Math.floor(n / 4), e.id -= 0, e
				})
			},
			formatSSRCFirefox: function(e, t, r) {
				return e.map(function(e, n) {
					return e.id = t + "0" + r + "0" + Math.floor(n / 4), e.id -= 0, e
				})
			},
			formatSdpRemote: function(e, t, r) {
				return /Chrome/gi.test(navigator.userAgent) ? this.formatSdpRemoteChrome(e, t, r) : this.formatSdpRemoteFirefox(e, t)
			},
			formatSdpRemoteChrome: function(e, t) {
				return -1 === (e = e.replace(/a=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
					var t = e.match(/a=ssrc:(\d+)/),
						r = e.match(/a=msid:(.+) (.+)/);
					return t[1] && (e = e.replace("a=msid", "a=ssrc:" + t[1] + " msid")), r[1] && t[1] && (e = e + "\r\na=ssrc:" + t[1] + " mslabel:" + r[1]), r[2] && t[1] && (e = e + "\r\na=ssrc:" + t[1] + " label:" + r[2]), e
				})).indexOf("b=AS:1024") && t && (e += "b=AS:1024\r\n"), WEBRTCLOG.log("formated: \n", e), e
			},
			formatSdpRemoteFirefox: function(e, t) {
				if(e = e.replace(/\r\na=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
						var t = e.match(/\r\na=ssrc:\d+ cname:.+/);
						return e = (e = e.replace(/a=ssrc:\d+ cname:.+/, "")).replace("a=msid", t[0] + "\r\na=msid")
					}), t && t.sdp) {
					var r = o.parse(e),
						n = o.parse(t.sdp);
					r.media.length, n.media.length
				}
				return WEBRTCLOG.log("formated: \n", e), e
			},
			parse: function(e) {
				var t = o.parse(e);
				WEBRTCLOG.log("原始sdp\n", e), WEBRTCLOG.log(t)
			},
			updateMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				return e.fn = "updateMediaStream", this.fnShake(e)
			},
			_updateMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				WEBRTCLOG.log("_updateMediaStream");
				var t = e.peer,
					r = e.currStream,
					n = e.streams,
					i = void 0 === n ? [] : n,
					a = this.checkCurrStream(t),
					o = {},
					c = t,
					u = r || new MediaStream;
				i.map(function(e) {
					e.getTracks().map(function(e) {
						WEBRTCLOG.log("_updateMediaStream newTracks", e), o[e.id] = e
					})
				});
				var d = Object.keys(a.tracks).filter(function(e) {
					return !o[e]
				});
				WEBRTCLOG.warn("webrtc-rtc::获取移除的列表", d);
				var l = Object.keys(o).filter(function(e) {
					return !a.tracks[e]
				});
				return WEBRTCLOG.log("webrtc-rtc::获取新加的列表", l), d && d.map(function(e) {
					var r = a.tracks[e].sender,
						n = a.tracks[e].track;
					if(WEBRTCLOG.log("remove old track ", r, n), "Firefox" === s.prefix) {
						var i = "audio" === n.kind ? t.audioSender : t.videoSender;
						i && i.replaceTrack(null)
					} else c.removeTrack(r);
					u.removeTrack(n)
				}), l && l.map(function(e) {
					var r = o[e];
					WEBRTCLOG.log("add new track: ", r), u.addTrack(r), "Firefox" === s.prefix ? "audio" === r.kind ? (t.audioSender ? t.audioSender.replaceTrack(r) : t.audioSender = c.addTrack(r, u), WEBRTCLOG.info("audioSender track: ", t.audioSender)) : "video" === r.kind && (t.videoSender ? (WEBRTCLOG.info("open the camera"), t.videoSender.replaceTrack(r)) : t.videoSender = c.addTrack(r, u)) : c.addTrack(r, u)
				}), this.checkCurrStream(t), Promise.resolve(u)
			},
			removeTrack: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.peer,
					r = e.currStream,
					n = e.tracks,
					i = void 0 === n ? [] : n;
				if(0 !== i.length) {
					var a = this.checkCurrStream(t);
					i.map(function(e) {
						a.tracks[e.id] && (WEBRTCLOG.log("====remove track", e, e.readyState, a.tracks[e.id].sender), r.removeTrack(e), t.removeTrack(a.tracks[e.id].sender))
					})
				}
			},
			checkCurrStream: function(e) {
				var t = {},
					r = [],
					n = e.getSenders();
				return n && n.map(function(e) {
					WEBRTCLOG.log("get Senders: ", e);
					var n = e.track;
					n ? (t[n.id] = {
						sender: e,
						track: n
					}, WEBRTCLOG.log(" --\x3e track id:", n.kind + ":" + n.id)) : r.push(e)
				}), {
					tracks: t,
					empty: r
				}
			},
			checkMediaStatus: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.videoTrack,
					r = e.sdp,
					n = (e.uid, {
						video: !1
					});
				return n.video = new RegExp(t.id).test(r), WEBRTCLOG.log("checkMediaStatus ----\x3e result", n), n
			},
			validMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.sdp,
					r = e.msid,
					n = e.trackid;
				if(!r || !n) return !1;
				var i = !1;
				return r && (i = new RegExp(r).test(t)), i ? (n && (i = new RegExp(n).test(t)), i) : i
			}
		}, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.default = i;
		var n = r(77).RtcSupport.checkWebAudio();

		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.stream,
				r = e.uid,
				i = e.isAnalyze,
				a = e.isRemote;
			this.support = n.WebAudio && n.MediaStream, this.gain = 1, this.stream = t, this.support && (this.audioIn = {}, this.uid = r || 0, this.isAnalyze = i, this.isRemote = a || !1, this.instant = 0, this.slow = 0, this.clip = 0, this.init())
		}
		i.ac = n.WebAudio && n.MediaStream ? new window.AudioContext : {}, i.destination = i.ac.createMediaStreamDestination ? i.ac.createMediaStreamDestination() : {};
		var a = i.prototype;
		a.context = i.ac, a.init = function() {
			this.validateInput() && (this.isAnalyze && this.initMonitor(), this.formatStreams(), this.initWebAudio(), this.initAudioIn())
		}, a.validateInput = function() {
			return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor)
		}, a.initMonitor = function() {
			var e = this;
			(this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function(t) {
				var r, n = t.inputBuffer.getChannelData(0),
					i = 0,
					a = 0;
				for(r = 0; r < n.length; ++r) i += Math.abs(n[r]), Math.abs(n[r]) > .99 && (a += 1);
				e.instant = Math.sqrt(i / n.length), e.slow = .95 * e.slow + .05 * e.instant, e.clip = a / n.length
			}
		}, a.initWebAudio = function() {
			var e = this.context;
			this.gainFilter = e.createGain(), this.destination = this.isRemote ? i.destination : e.createMediaStreamDestination(), this.gainFilter.gain.value = this.gain, this.gainFilter.connect(this.destination)
		}, a.initAudioIn = function() {
			var e = this,
				t = this,
				r = this.stream,
				n = this.context,
				i = void 0;
			if(/(MediaStream|LocalMediaStream)/.test(r.constructor)) return a(r), void(this.outputStream = this.destination.stream);

			function a(e) {
				if(!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
				if(0 === e.getAudioTracks().length) return null;
				var r = n.createMediaStreamSource(e);
				return t.isAnalyze && t.script && (r.connect(t.script), t.script.connect(t.gainFilter)), r.connect(t.gainFilter), r
			}
			r.constructor === Array && (r.forEach(function(t) {
				(i = a(t)) && (e.audioIn[t.id] = i)
			}), this.outputStream = this.destination.stream)
		}, a.formatStreams = function() {
			var e = this.stream,
				t = [];
			if(/(MediaStream|LocalMediaStream)/.test(e.constructor)) return e.getAudioTracks().map(function(e) {
				t.push(new MediaStream([e]))
			}), void(this.stream = t);
			e.constructor === Array && (e.map(function(e) {
				e.getAudioTracks().map(function(e) {
					t.push(new MediaStream([e]))
				})
			}), this.stream = t)
		}, a.addStream = function(e) {
			var t = this.context;
			if(0 !== e.getAudioTracks().length) {
				var r = t.createMediaStreamSource(e);
				this.isAnalyze && this.script && r.connect(this.script), r.connect(this.gainFilter), this.audioIn[e.id] = r, this.outputStream = this.destination.stream
			}
		}, a.updateStream = function(e) {
			if(this.audioIn)
				for(var t in this.audioIn) this.audioIn[t] && this.audioIn[t].disconnect(0), this.audioIn[t] = null;
			this.audioIn = {}, this.stream = e, this.initAudioIn()
		}, a.setGain = function(e) {
			this.support && (this.gainFilter.gain.value = e, this.gain = e)
		}, a.getGain = function() {
			return this.gain
		}, a.off = function() {
			return this.setGain(0)
		}, a.on = function() {
			this.setGain(1)
		}, a.destroy = function() {
			if(this.instant = 0, this.slow = 0, this.clip = 0, this.gainFilter && this.gainFilter.disconnect(0), this.script && this.script.disconnect(0), this.audioIn)
				for(var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
			this.audioIn = {};
			var t = this.stream;

			function r(e) {
				e && e.getTracks().forEach(function(t) {
					e.removeTrack(t)
				})
			}
			/(MediaStream|LocalMediaStream)/.test(t.constructor) && r(t), t.constructor === Array && t.forEach(function(e) {
				r(e)
			}), this.stream = null, this.outputStream = null
		}, a.getVolumeData = function() {
			return this.instant.toFixed(2)
		}, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = c(r(1)),
			i = c(r(4)),
			a = c(r(3)),
			o = c(r(2)),
			s = c(r(202));

		function c(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = r(9),
			d = function(e) {
				function t() {
					(0, n.default)(this, t);
					var e = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return e.recordedChunks = [], e.isRecording = !1, e.contentTypes = ["video/mp4;codecs=opus", "video/webm", "video/webm;codecs=h264", "video/x-matroska;codecs=opus", "video/invalid"], e
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "validation",
					value: function(e) {
						return e.filter(function(e) {
							return MediaRecorder.isTypeSupported(e)
						})
					}
				}, {
					key: "format",
					value: function() {
						var e = this,
							t = this.stream,
							r = this.option;
						return new Promise(function(n, i) {
							if(/(MediaStream)/.test(t.constructor) && (t = [t]), t.constructor !== Array) return i("音视频录制输入错误");
							if("audio" === r.type) return e.audioController = new s.default({
								stream: t,
								uid: e.uid
							}), e.opStream = e.audioController.outputStream, n();
							var a = new MediaStream;
							if(t.forEach(function(e) {
									e && /(MediaStream)/.test(e.constructor) && e.getTracks().forEach(function(e) {
										a.addTrack(e)
									})
								}), 0 === a.getTracks().length) return i("当前没有任何音视频数据，无法进行录制");
							e.opStream = a, n()
						})
					}
				}, {
					key: "start",
					value: function(e) {
						var t = this,
							r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
								type: "video"
							};
						return r.uid || r.account ? e ? window.MediaRecorder && MediaRecorder.isTypeSupported ? (this.stream = e, this.option = r, "audio" === r.type && (this.contentTypes = ["audio/wav", "audio/ogg", "audio/pcm", "audio/webm"]), (this.mimeType = this.validation(this.contentTypes)[0]) ? this.isRecording ? Promise.reject("音视频正在录制中，请勿重复操作") : this.format().then(function() {
							return t._start()
						}).catch(function(e) {
							return Promise.reject(e)
						}) : Promise.reject("当前浏览器不支持对应格式的视频录制")) : Promise.reject("当前浏览器不支持音视频录制功能") : Promise.reject("获取视频流失败") : Promise.reject("需要录制的帐号缺失")
					}
				}, {
					key: "_start",
					value: function() {
						var e = {
								audioBitsPerSecond: 128e3,
								videoBitsPerSecond: 25e5,
								mimeType: this.mimeType
							},
							t = this.recorder = new MediaRecorder(this.opStream, e);
						return t.ondataavailable = this.ondataavailable.bind(this), t.onstop = this.onstop.bind(this), this.isRecording = !0, this.status = "started", this.recorder.start(), this.startTimer(), Promise.resolve(this.option)
					}
				}, {
					key: "stop",
					value: function(e) {
						if(!this.isRecording || !this.recorder) return Promise.reject("请先开启音视频录制");
						if(this.status = "stopped", WEBRTCLOG.log("MediaRecorder: stop event", this.recorder.state), "inactive" === this.recorder.state) return WEBRTCLOG.warn("MediaRecorder already stopped:", this.recorder.state), Promise.reject("音视频录制已结束，请勿重复操作");
						var t = (this.option.account || this.option.uid) + "--" + Date.now() + "--" + (this.option.type || "video");
						return this.fileName = e || t, this.recorder.stop(), Promise.resolve()
					}
				}, {
					key: "leave",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						if(this.isRecording && this.recorder) {
							var t = e.uid;
							t && this.option && this.option && t == this.option.uid && this.stop()
						}
					}
				}, {
					key: "ondataavailable",
					value: function(e) {
						if(WEBRTCLOG.log("MediaRecorder: data received"), !(e.data.size > 0)) return this.stop(), Promise.reject("获取视频流失败");
						this.recordedChunks.push(e.data)
					}
				}, {
					key: "onstop",
					value: function() {
						if(WEBRTCLOG.log("MediaRecorder: onstop"), "stopped" !== this.status) return this._start();
						var e = new Blob(this.recordedChunks, {
								type: this.mimeType
							}),
							t = URL.createObjectURL(e),
							r = document.createElement("a");
						document.body.appendChild(r), r.style = "display: none", r.href = t, r.download = (this.fileName || Date.now()) + ".webm", r.click(), window.URL.revokeObjectURL(t), this.destroy(), this.clearTimer(), this.emit("stopRecord")
					}
				}, {
					key: "pause",
					value: function() {
						this.recorder && this.recorder.pause()
					}
				}, {
					key: "resume",
					value: function() {
						this.recorder && this.recorder.resume()
					}
				}, {
					key: "destroy",
					value: function() {
						this.stream = null, this.recorder = null, this.recordedChunks = [], this.isRecording = !1, this.audioController && this.audioController.destroy(), this.audioController = null, this.fileName = this.fileNameDefault = "", this.option = {}, this.status = ""
					}
				}, {
					key: "startTimer",
					value: function() {
						var e = this;
						this.timer || (this.timer = setInterval(function() {
							WEBRTCLOG.log((new Date).toLocaleString() + " --\x3e MediaRecorder status: " + e.recorder.state)
						}, 2e3))
					}
				}, {
					key: "clearTimer",
					value: function() {
						this.timer && (clearInterval(this.timer), this.timer = null)
					}
				}], [{
					key: "init",
					value: function(e) {
						e || window.Logger
					}
				}]), t
			}(u);
		t.default = d, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = u(r(81)),
			i = u(r(80)),
			a = u(r(1)),
			o = u(r(3)),
			s = u(r(2)),
			c = u(r(112));

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t() {
				(0, a.default)(this, t);
				var e = (0, o.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return e.init(), e
			}
			return(0, s.default)(t, e), t
		}(r(9));
		t.default = d;
		var l = d.prototype;
		l.init = function() {
			if(this.getDevices().catch(function(e) {
					WEBRTCLOG.warn(e)
				}), navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
				var e = void 0,
					t = this;
				navigator.mediaDevices.ondevicechange = function(r) {
					e && (clearTimeout(e), e = null);
					var n = Object.assign({}, t.devicesCache);
					e = setTimeout(function() {
						e = null, t.getDevices(!0).then(function() {
							t.emit("deviceStatus", t.devicesCache), t.filterDeviceChange(t.devicesCache, n)
						}).catch(function() {})
					}, 500)
				}
			}
		}, l.filterDeviceChange = function(e, t) {
			function r(e) {
				var t = {};
				return Object.keys(e).forEach(function(r) {
					e[r].forEach(function(e) {
						t[r + e.deviceId] = Object.assign({}, e, {
							type: r
						})
					})
				}), t
			}
			var n = r(e),
				i = r(t),
				a = Object.keys(n),
				o = Object.keys(i);
			if(a.length > o.length) {
				var s = [];
				a.forEach(function(e) {
					-1 === o.indexOf(e) && s.push(n[e])
				}), s.length && this.emit("deviceAdd", s)
			} else {
				var c = [];
				o.forEach(function(e) {
					-1 === a.indexOf(e) && c.push(i[e])
				}), c.length && this.emit("deviceRemove", c)
			}
		}, l.getDevicesOfType = function(e) {
			return void 0 !== e ? this.getDevices().then(function(t) {
				return [t[e]]
			}) : this.getDevices()
		}, l.getDevices = function(e) {
			var t = this,
				r = void 0;
			return !e && this.devicesCache ? Promise.resolve(this.devicesCache) : new Promise(function(e, a) {
				var o = this;
				(0, i.default)(n.default.mark(function i() {
					return n.default.wrap(function(n) {
						for(;;) switch(n.prev = n.next) {
							case 0:
								return n.next = 2, c.default.getDevices().catch(function(e) {
									return a(e)
								});
							case 2:
								if(r = n.sent) {
									n.next = 5;
									break
								}
								return n.abrupt("return", a("没有找到可用设备"));
							case 5:
								return t.devicesCache = r, n.abrupt("return", e(r));
							case 7:
							case "end":
								return n.stop()
						}
					}, i, o)
				}))()
			})
		}, l.getDeviceStatus = function() {
			return {
				hasAudio: this.devicesCache && this.devicesCache.audioIn.length > 0 || !1,
				hasVideo: this.devicesCache && this.devicesCache.video.length > 0 || !1
			}
		}, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		var n = r(16),
			i = r(111),
			a = r(145);
		n(n.S, "Promise", {
			try: function(e) {
				var t = i.f(this),
					r = a(e);
				return(r.e ? t.reject : t.resolve)(r.v), t.promise
			}
		})
	}, function(e, t, r) {
		"use strict";
		var n = r(16),
			i = r(6),
			a = r(7),
			o = r(147),
			s = r(144);
		n(n.P + n.R, "Promise", {
			finally: function(e) {
				var t = o(this, i.Promise || a.Promise),
					r = "function" == typeof e;
				return this.then(r ? function(r) {
					return s(t, e()).then(function() {
						return r
					})
				} : e, r ? function(r) {
					return s(t, e()).then(function() {
						throw r
					})
				} : e)
			}
		})
	}, function(e, t, r) {
		"use strict";
		var n = r(7),
			i = r(6),
			a = r(12),
			o = r(14),
			s = r(5)("species");
		e.exports = function(e) {
			var t = "function" == typeof i[e] ? i[e] : n[e];
			o && t && !t[s] && a.f(t, s, {
				configurable: !0,
				get: function() {
					return this
				}
			})
		}
	}, function(e, t, r) {
		var n = r(19);
		e.exports = function(e, t, r) {
			for(var i in t) r && e[i] ? e[i] = t[i] : n(e, i, t[i]);
			return e
		}
	}, function(e, t, r) {
		var n = r(7),
			i = r(146).set,
			a = n.MutationObserver || n.WebKitMutationObserver,
			o = n.process,
			s = n.Promise,
			c = "process" == r(32)(o);
		e.exports = function() {
			var e, t, r, u = function() {
				var n, i;
				for(c && (n = o.domain) && n.exit(); e;) {
					i = e.fn, e = e.next;
					try {
						i()
					} catch(n) {
						throw e ? r() : t = void 0, n
					}
				}
				t = void 0, n && n.enter()
			};
			if(c) r = function() {
				o.nextTick(u)
			};
			else if(!a || n.navigator && n.navigator.standalone)
				if(s && s.resolve) {
					var d = s.resolve();
					r = function() {
						d.then(u)
					}
				} else r = function() {
					i.call(n, u)
				};
			else {
				var l = !0,
					f = document.createTextNode("");
				new a(u).observe(f, {
					characterData: !0
				}), r = function() {
					f.data = l = !l
				}
			}
			return function(n) {
				var i = {
					fn: n,
					next: void 0
				};
				t && (t.next = i), e || (e = i, r()), t = i
			}
		}
	}, function(e, t) {
		e.exports = function(e, t, r) {
			var n = void 0 === r;
			switch(t.length) {
				case 0:
					return n ? e() : e.call(r);
				case 1:
					return n ? e(t[0]) : e.call(r, t[0]);
				case 2:
					return n ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
				case 3:
					return n ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
				case 4:
					return n ? e(t[0], t[1], t[2], t[3]) : e.call(r, t[0], t[1], t[2], t[3])
			}
			return e.apply(r, t)
		}
	}, function(e, t, r) {
		var n = r(35),
			i = r(134),
			a = r(133),
			o = r(15),
			s = r(67),
			c = r(109),
			u = {},
			d = {};
		(t = e.exports = function(e, t, r, l, f) {
			var p, h, m, v, _ = f ? function() {
					return e
				} : c(e),
				y = n(r, l, t ? 2 : 1),
				R = 0;
			if("function" != typeof _) throw TypeError(e + " is not iterable!");
			if(a(_)) {
				for(p = s(e.length); p > R; R++)
					if((v = t ? y(o(h = e[R])[0], h[1]) : y(e[R])) === u || v === d) return v
			} else
				for(m = _.call(e); !(h = m.next()).done;)
					if((v = i(m, y, h.value, t)) === u || v === d) return v
		}).BREAK = u, t.RETURN = d
	}, function(e, t) {
		e.exports = function(e, t, r, n) {
			if(!(e instanceof t) || void 0 !== n && n in e) throw TypeError(r + ": incorrect invocation!");
			return e
		}
	}, function(e, t, r) {
		"use strict";
		var n, i, a, o, s = r(34),
			c = r(7),
			u = r(35),
			d = r(78),
			l = r(16),
			f = r(18),
			p = r(55),
			h = r(212),
			m = r(211),
			v = r(147),
			_ = r(146).set,
			y = r(209)(),
			R = r(111),
			g = r(145),
			C = r(144),
			E = c.TypeError,
			T = c.process,
			b = c.Promise,
			O = "process" == d(T),
			S = function() {},
			A = i = R.f,
			P = !! function() {
				try {
					var e = b.resolve(1),
						t = (e.constructor = {})[r(5)("species")] = function(e) {
							e(S, S)
						};
					return(O || "function" == typeof PromiseRejectionEvent) && e.then(S) instanceof t
				} catch(e) {}
			}(),
			I = function(e) {
				var t;
				return !(!f(e) || "function" != typeof(t = e.then)) && t
			},
			k = function(e, t) {
				if(!e._n) {
					e._n = !0;
					var r = e._c;
					y(function() {
						for(var n = e._v, i = 1 == e._s, a = 0, o = function(t) {
								var r, a, o, s = i ? t.ok : t.fail,
									c = t.resolve,
									u = t.reject,
									d = t.domain;
								try {
									s ? (i || (2 == e._h && D(e), e._h = 1), !0 === s ? r = n : (d && d.enter(), r = s(n), d && (d.exit(), o = !0)), r === t.promise ? u(E("Promise-chain cycle")) : (a = I(r)) ? a.call(r, c, u) : c(r)) : u(n)
								} catch(e) {
									d && !o && d.exit(), u(e)
								}
							}; r.length > a;) o(r[a++]);
						e._c = [], e._n = !1, t && !e._h && L(e)
					})
				}
			},
			L = function(e) {
				_.call(c, function() {
					var t, r, n, i = e._v,
						a = W(e);
					if(a && (t = g(function() {
							O ? T.emit("unhandledRejection", i, e) : (r = c.onunhandledrejection) ? r({
								promise: e,
								reason: i
							}) : (n = c.console) && n.error && n.error("Unhandled promise rejection", i)
						}), e._h = O || W(e) ? 2 : 1), e._a = void 0, a && t.e) throw t.v
				})
			},
			W = function(e) {
				return 1 !== e._h && 0 === (e._a || e._c).length
			},
			D = function(e) {
				_.call(c, function() {
					var t;
					O ? T.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
						promise: e,
						reason: e._v
					})
				})
			},
			M = function(e) {
				var t = this;
				t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), k(t, !0))
			},
			w = function(e) {
				var t, r = this;
				if(!r._d) {
					r._d = !0, r = r._w || r;
					try {
						if(r === e) throw E("Promise can't be resolved itself");
						(t = I(e)) ? y(function() {
							var n = {
								_w: r,
								_d: !1
							};
							try {
								t.call(e, u(w, n, 1), u(M, n, 1))
							} catch(e) {
								M.call(n, e)
							}
						}): (r._v = e, r._s = 1, k(r, !1))
					} catch(e) {
						M.call({
							_w: r,
							_d: !1
						}, e)
					}
				}
			};
		P || (b = function(e) {
			h(this, b, "Promise", "_h"), p(e), n.call(this);
			try {
				e(u(w, this, 1), u(M, this, 1))
			} catch(e) {
				M.call(this, e)
			}
		}, (n = function(e) {
			this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
		}).prototype = r(208)(b.prototype, {
			then: function(e, t) {
				var r = A(v(this, b));
				return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = O ? T.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && k(this, !1), r.promise
			},
			catch: function(e) {
				return this.then(void 0, e)
			}
		}), a = function() {
			var e = new n;
			this.promise = e, this.resolve = u(w, e, 1), this.reject = u(M, e, 1)
		}, R.f = A = function(e) {
			return e === b || e === o ? new a(e) : i(e)
		}), l(l.G + l.W + l.F * !P, {
			Promise: b
		}), r(33)(b, "Promise"), r(207)("Promise"), o = r(6).Promise, l(l.S + l.F * !P, "Promise", {
			reject: function(e) {
				var t = A(this);
				return(0, t.reject)(e), t.promise
			}
		}), l(l.S + l.F * (s || !P), "Promise", {
			resolve: function(e) {
				return C(s && this === o ? b : this, e)
			}
		}), l(l.S + l.F * !(P && r(132)(function(e) {
			b.all(e).catch(S)
		})), "Promise", {
			all: function(e) {
				var t = this,
					r = A(t),
					n = r.resolve,
					i = r.reject,
					a = g(function() {
						var r = [],
							a = 0,
							o = 1;
						m(e, !1, function(e) {
							var s = a++,
								c = !1;
							r.push(void 0), o++, t.resolve(e).then(function(e) {
								c || (c = !0, r[s] = e, --o || n(r))
							}, i)
						}), --o || n(r)
					});
				return a.e && i(a.v), r.promise
			},
			race: function(e) {
				var t = this,
					r = A(t),
					n = r.reject,
					i = g(function() {
						m(e, !1, function(e) {
							t.resolve(e).then(r.resolve, n)
						})
					});
				return i.e && n(i.v), r.promise
			}
		})
	}, function(e, t, r) {
		r(73), r(48), r(54), r(213), r(206), r(205), e.exports = r(6).Promise
	}, function(e, t, r) {
		e.exports = {
			default: r(214),
			__esModule: !0
		}
	}, function(e, t) {
		! function(t) {
			"use strict";
			var r, n = Object.prototype,
				i = n.hasOwnProperty,
				a = "function" == typeof Symbol ? Symbol : {},
				o = a.iterator || "@@iterator",
				s = a.asyncIterator || "@@asyncIterator",
				c = a.toStringTag || "@@toStringTag",
				u = "object" == typeof e,
				d = t.regeneratorRuntime;
			if(d) u && (e.exports = d);
			else {
				(d = t.regeneratorRuntime = u ? e.exports : {}).wrap = g;
				var l = "suspendedStart",
					f = "suspendedYield",
					p = "executing",
					h = "completed",
					m = {},
					v = {};
				v[o] = function() {
					return this
				};
				var _ = Object.getPrototypeOf,
					y = _ && _(_(L([])));
				y && y !== n && i.call(y, o) && (v = y);
				var R = b.prototype = E.prototype = Object.create(v);
				T.prototype = R.constructor = b, b.constructor = T, b[c] = T.displayName = "GeneratorFunction", d.isGeneratorFunction = function(e) {
					var t = "function" == typeof e && e.constructor;
					return !!t && (t === T || "GeneratorFunction" === (t.displayName || t.name))
				}, d.mark = function(e) {
					return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, c in e || (e[c] = "GeneratorFunction")), e.prototype = Object.create(R), e
				}, d.awrap = function(e) {
					return {
						__await: e
					}
				}, O(S.prototype), S.prototype[s] = function() {
					return this
				}, d.AsyncIterator = S, d.async = function(e, t, r, n) {
					var i = new S(g(e, t, r, n));
					return d.isGeneratorFunction(t) ? i : i.next().then(function(e) {
						return e.done ? e.value : i.next()
					})
				}, O(R), R[c] = "Generator", R[o] = function() {
					return this
				}, R.toString = function() {
					return "[object Generator]"
				}, d.keys = function(e) {
					var t = [];
					for(var r in e) t.push(r);
					return t.reverse(),
						function r() {
							for(; t.length;) {
								var n = t.pop();
								if(n in e) return r.value = n, r.done = !1, r
							}
							return r.done = !0, r
						}
				}, d.values = L, k.prototype = {
					constructor: k,
					reset: function(e) {
						if(this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(I), !e)
							for(var t in this) "t" === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = r)
					},
					stop: function() {
						this.done = !0;
						var e = this.tryEntries[0].completion;
						if("throw" === e.type) throw e.arg;
						return this.rval
					},
					dispatchException: function(e) {
						if(this.done) throw e;
						var t = this;

						function n(n, i) {
							return s.type = "throw", s.arg = e, t.next = n, i && (t.method = "next", t.arg = r), !!i
						}
						for(var a = this.tryEntries.length - 1; a >= 0; --a) {
							var o = this.tryEntries[a],
								s = o.completion;
							if("root" === o.tryLoc) return n("end");
							if(o.tryLoc <= this.prev) {
								var c = i.call(o, "catchLoc"),
									u = i.call(o, "finallyLoc");
								if(c && u) {
									if(this.prev < o.catchLoc) return n(o.catchLoc, !0);
									if(this.prev < o.finallyLoc) return n(o.finallyLoc)
								} else if(c) {
									if(this.prev < o.catchLoc) return n(o.catchLoc, !0)
								} else {
									if(!u) throw new Error("try statement without catch or finally");
									if(this.prev < o.finallyLoc) return n(o.finallyLoc)
								}
							}
						}
					},
					abrupt: function(e, t) {
						for(var r = this.tryEntries.length - 1; r >= 0; --r) {
							var n = this.tryEntries[r];
							if(n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
								var a = n;
								break
							}
						}
						a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
						var o = a ? a.completion : {};
						return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, m) : this.complete(o)
					},
					complete: function(e, t) {
						if("throw" === e.type) throw e.arg;
						return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), m
					},
					finish: function(e) {
						for(var t = this.tryEntries.length - 1; t >= 0; --t) {
							var r = this.tryEntries[t];
							if(r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), I(r), m
						}
					},
					catch: function(e) {
						for(var t = this.tryEntries.length - 1; t >= 0; --t) {
							var r = this.tryEntries[t];
							if(r.tryLoc === e) {
								var n = r.completion;
								if("throw" === n.type) {
									var i = n.arg;
									I(r)
								}
								return i
							}
						}
						throw new Error("illegal catch attempt")
					},
					delegateYield: function(e, t, n) {
						return this.delegate = {
							iterator: L(e),
							resultName: t,
							nextLoc: n
						}, "next" === this.method && (this.arg = r), m
					}
				}
			}

			function g(e, t, r, n) {
				var i = t && t.prototype instanceof E ? t : E,
					a = Object.create(i.prototype),
					o = new k(n || []);
				return a._invoke = function(e, t, r) {
					var n = l;
					return function(i, a) {
						if(n === p) throw new Error("Generator is already running");
						if(n === h) {
							if("throw" === i) throw a;
							return W()
						}
						for(r.method = i, r.arg = a;;) {
							var o = r.delegate;
							if(o) {
								var s = A(o, r);
								if(s) {
									if(s === m) continue;
									return s
								}
							}
							if("next" === r.method) r.sent = r._sent = r.arg;
							else if("throw" === r.method) {
								if(n === l) throw n = h, r.arg;
								r.dispatchException(r.arg)
							} else "return" === r.method && r.abrupt("return", r.arg);
							n = p;
							var c = C(e, t, r);
							if("normal" === c.type) {
								if(n = r.done ? h : f, c.arg === m) continue;
								return {
									value: c.arg,
									done: r.done
								}
							}
							"throw" === c.type && (n = h, r.method = "throw", r.arg = c.arg)
						}
					}
				}(e, r, o), a
			}

			function C(e, t, r) {
				try {
					return {
						type: "normal",
						arg: e.call(t, r)
					}
				} catch(e) {
					return {
						type: "throw",
						arg: e
					}
				}
			}

			function E() {}

			function T() {}

			function b() {}

			function O(e) {
				["next", "throw", "return"].forEach(function(t) {
					e[t] = function(e) {
						return this._invoke(t, e)
					}
				})
			}

			function S(e) {
				var t;
				this._invoke = function(r, n) {
					function a() {
						return new Promise(function(t, a) {
							! function t(r, n, a, o) {
								var s = C(e[r], e, n);
								if("throw" !== s.type) {
									var c = s.arg,
										u = c.value;
									return u && "object" == typeof u && i.call(u, "__await") ? Promise.resolve(u.__await).then(function(e) {
										t("next", e, a, o)
									}, function(e) {
										t("throw", e, a, o)
									}) : Promise.resolve(u).then(function(e) {
										c.value = e, a(c)
									}, o)
								}
								o(s.arg)
							}(r, n, t, a)
						})
					}
					return t = t ? t.then(a, a) : a()
				}
			}

			function A(e, t) {
				var n = e.iterator[t.method];
				if(n === r) {
					if(t.delegate = null, "throw" === t.method) {
						if(e.iterator.return && (t.method = "return", t.arg = r, A(e, t), "throw" === t.method)) return m;
						t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
					}
					return m
				}
				var i = C(n, e.iterator, t.arg);
				if("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, m;
				var a = i.arg;
				return a ? a.done ? (t[e.resultName] = a.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = r), t.delegate = null, m) : a : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, m)
			}

			function P(e) {
				var t = {
					tryLoc: e[0]
				};
				1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
			}

			function I(e) {
				var t = e.completion || {};
				t.type = "normal", delete t.arg, e.completion = t
			}

			function k(e) {
				this.tryEntries = [{
					tryLoc: "root"
				}], e.forEach(P, this), this.reset(!0)
			}

			function L(e) {
				if(e) {
					var t = e[o];
					if(t) return t.call(e);
					if("function" == typeof e.next) return e;
					if(!isNaN(e.length)) {
						var n = -1,
							a = function t() {
								for(; ++n < e.length;)
									if(i.call(e, n)) return t.value = e[n], t.done = !1, t;
								return t.value = r, t.done = !0, t
							};
						return a.next = a
					}
				}
				return {
					next: W
				}
			}

			function W() {
				return {
					value: r,
					done: !0
				}
			}
		}(function() {
			return this
		}() || Function("return this")())
	}, function(e, t, r) {
		var n = function() {
				return this
			}() || Function("return this")(),
			i = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >= 0,
			a = i && n.regeneratorRuntime;
		if(n.regeneratorRuntime = void 0, e.exports = r(216), i) n.regeneratorRuntime = a;
		else try {
			delete n.regeneratorRuntime
		} catch(e) {
			n.regeneratorRuntime = void 0
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(112);
		Object.defineProperty(t, "Device", {
			enumerable: !0,
			get: function() {
				return o(n).default
			}
		});
		var i = r(204);
		Object.defineProperty(t, "MDevices", {
			enumerable: !0,
			get: function() {
				return o(i).default
			}
		});
		var a = r(203);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "Recorder", {
			enumerable: !0,
			get: function() {
				return o(a).default
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = o(r(1)),
			i = o(r(4)),
			a = r(45);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = r(8).info.nrtcVersion,
			c = r(21),
			u = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, n.default)(this, e);
					var r = t.appkey;
					this.infos = {}, this.init(r), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "resetStatus",
					value: function() {}
				}, {
					key: "init",
					value: function(e) {
						this.infos = Object.assign(this.infos, {
							interval: 30,
							ver: 2,
							platform: d.convertPlatform(c.os.family) + "-" + c.os.version,
							browser: c.name + "-" + c.version,
							sdk_ver: s || "3.6.0",
							uid: null,
							appkey: e,
							time: null,
							data: {}
						})
					}
				}, {
					key: "clear",
					value: function() {
						this.infos.data = {}
					}
				}, {
					key: "start",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						this.infos.appkey = e.appKey || e.appkey || this.infos.appkey, this.infos.cid = e.cid, this.infos.uid = e.uid
					}
				}, {
					key: "stop",
					value: function() {
						this.clear()
					}
				}, {
					key: "update",
					value: function(e) {
						this.infos.data["stat_" + Date.now()] = e, Object.keys(this.infos.data).length === this.infos.interval && this.send()
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						0 !== Object.keys(this.infos.data).length && (this.infos.time = Date.now(), (0, a.ajax)({
							type: "post",
							url: "//statistic.live.126.net/webrtc/stat",
							data: this.infos
						}).then(function(t) {
							e.clear()
						}).catch(function(e) {
							WEBRTCLOG.log("err", e)
						}))
					}
				}]), e
			}();
		t.default = u;
		var d = {
			convertNetwork: function(e) {
				return {
					wlan: "wifi",
					lan: "ethernet"
				}[e] || "unknown"
			},
			convertPlatform: function(e) {
				var t = void 0;
				return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
			}
		};
		e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = o(r(1)),
			i = o(r(4)),
			a = r(45);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = r(8).info.nrtcVersion,
			c = r(21),
			u = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, n.default)(this, e);
					var r = t.appkey;
					this.infos = {}, this.userlist = [], this.localVolumn = 0, this.local = {}, this.remote = {}, this.audioBwe = {
						bitsSentCurrent: 0,
						bitsRecvCurrent: []
					}, this.videoBwe = {
						bitsSentCurrent: 0,
						bitsRecvCurrent: []
					}, this.init(r), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "init",
					value: function(e) {
						this.infos = Object.assign(this.infos, {
							ver: 2,
							device: -1,
							isp: -1,
							platform: d.convertPlatform(c.os.family) + "-" + c.os.version,
							browser: c.name + "-" + c.version,
							sdk_ver: s || "3.6.0",
							appkey: e,
							interval: 60,
							samples: 30,
							time: null,
							qos_algorithm: -1,
							fec_algorithm: -1,
							qos_scene: -1,
							qos_strategy: -1
						})
					}
				}, {
					key: "resetStatus",
					value: function() {
						this.infos = Object.assign(this.infos, {
							uid: null,
							cid: null,
							push_url: null,
							turn_ip: null,
							proxy_ip: null,
							meeting: !1,
							live: !1
						}), this.clearInfoData(), this.uidSsrcMap = {}, this.userlist = [], this.audioBwe = {
							bitsSentCurrent: 0,
							bitsRecvCurrent: []
						}, this.videoBwe = {
							bitsSentCurrent: 0,
							bitsRecvCurrent: []
						}
					}
				}, {
					key: "initInfoData",
					value: function(e) {
						var t = {
							uid: e,
							cid: this.imInfo && this.imInfo.cid || -1,
							push_url: this.sessionConfig && this.sessionConfig.rtmpUrl || -1,
							turn_ip: this.imInfo && this.imInfo.turnMap || -1,
							proxy_ip: this.imInfo && this.imInfo.turnMap || -1,
							meeting: /^meeting$/gi.test(this.imInfo.sessionMode),
							live: this.sessionConfig && this.sessionConfig.liveEnable || !1,
							p2p: !1,
							isp: -1,
							net: -1,
							connect_state: this.imInfo && this.imInfo.code || 200,
							signalling_time: (this.sessionConfig && this.sessionConfig.signalEndTime || 0) - (this.sessionConfig && this.sessionConfig.signalStartTime || 0),
							connect_time: (this.sessionConfig && this.sessionConfig.rtcEndTime || 0) - (this.sessionConfig && this.sessionConfig.rtcStartTime || 0)
						};
						this.infos = Object.assign(this.infos, t)
					}
				}, {
					key: "clearInfoData",
					value: function() {
						this.localVolumn = 0, this.infos = Object.assign(this.infos, {
							rx: {
								audio: [],
								video: []
							},
							tx: {
								a_lost: [],
								v_lost: [],
								rtt: [],
								rtt_mdev: [],
								set_v_fps: [],
								qos_v_fps: [],
								v_fps: [],
								set_v_quality: [],
								real_v_res: [],
								real_v_kbps: [],
								real_v_kbps_n: [],
								real_a_kbps: [],
								real_a_kbps_n: [],
								set_v_kbps: [],
								qos_v_kbps: [],
								tx_bw_kbps: [],
								a_volume: []
							}
						})
					}
				}, {
					key: "start",
					value: function(e) {
						var t = e.imInfo,
							r = e.sessionConfig,
							n = e.videoConfig;
						t && (this.infos.appkey = this.infos.appkey, this.imInfo = t || {}, this.infos.cid = this.imInfo.cid, this.infos.uid = this.imInfo.uid, this.sessionConfig = r || {}, this.videoConfig = n || {}, this.clearSecond(), this.getTurnMap(), this.initInfoData(this.infos.uid))
					}
				}, {
					key: "stop",
					value: function() {
						this.resetStatus()
					}
				}, {
					key: "clearSecond",
					value: function() {
						this.paramSecond = {
							packetsLostAudio: "",
							packetsLostAudioList: [],
							packetsSentPerSecondAudio: [],
							packetsLostVideo: "",
							packetsLostVideoList: [],
							packetsSentPerSecondVideo: [],
							googInterframeDelayMaxList: [],
							vrdolr: "",
							vrdohr: ""
						}
					}
				}, {
					key: "update",
					value: function(e, t) {
						var r = [],
							n = [],
							i = [],
							a = [];
						for(var o in e) - 1 !== o.indexOf("_send_") && -1 !== o.indexOf("_audio") ? r.push(e[o]) : -1 !== o.indexOf("_send_") && -1 !== o.indexOf("_video") ? n.push(e[o]) : -1 !== o.indexOf("_recv_") && -1 !== o.indexOf("_audio") ? i.push(e[o]) : -1 !== o.indexOf("_recv_") && -1 !== o.indexOf("_video") ? a.push(e[o]) : this.network = e[o] && e[o].network;
						if(3 === this.paramSecond.packetsLostAudioList.length && this.paramSecond.packetsLostAudioList.shift(), 3 === this.paramSecond.packetsLostVideoList.length && this.paramSecond.packetsLostVideoList.shift(), 3 === this.paramSecond.packetsSentPerSecondAudio.length && this.paramSecond.packetsSentPerSecondAudio.shift(), 3 === this.paramSecond.packetsSentPerSecondVideo.length && this.paramSecond.packetsSentPerSecondVideo.shift(), 3 === this.paramSecond.googInterframeDelayMaxList.length && this.paramSecond.googInterframeDelayMaxList.shift(), this.paramSecond.packetsLostAudioList.push(parseFloat(r[0] && r[0].packetsLost || 0)), this.paramSecond.packetsLostVideoList.push(parseFloat(n[0] && n[0].packetsLost || 0)), this.paramSecond.packetsSentPerSecondAudio.push(parseFloat(r[0] && r[0].packetsSentPerSecond || 0)), this.paramSecond.packetsSentPerSecondVideo.push(parseFloat(n[0] && n[0].packetsSentPerSecond || 0)), this.paramSecond.googInterframeDelayMaxList.push(parseFloat(a[0] && a[0].googInterframeDelayMax || 0)), 1 !== t) {
							if(2 === t) {
								this.paramSecond.packetsLostAudio = (this.paramSecond.packetsLostAudioList[1] - this.paramSecond.packetsLostAudioList[0]) / (this.paramSecond.packetsSentPerSecondAudio[0] + this.paramSecond.packetsSentPerSecondAudio[1]) / 2 * 100, this.paramSecond.packetsLostVideo = (this.paramSecond.packetsLostVideoList[1] - this.paramSecond.packetsLostVideoList[0]) / (this.paramSecond.packetsSentPerSecondVideo[0] + this.paramSecond.packetsSentPerSecondVideo[1]) / 2 * 100;
								var s = 0,
									c = 0,
									u = 0,
									d = 0;
								this.paramSecond.googInterframeDelayMaxList[0] > 200 && this.paramSecond.googInterframeDelayMaxList[0] < 400 && (s = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[1] < 400 && (c = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[0] > 400 && (u = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 400 && (d = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.vrdolr = s + c, this.paramSecond.vrdohr = u + d
							} else if(t % 2 == 1) {
								this.paramSecond.packetsLostAudio = (this.paramSecond.packetsLostAudioList[2] - this.paramSecond.packetsLostAudioList[0]) / (this.paramSecond.packetsSentPerSecondAudio[1] + this.paramSecond.packetsSentPerSecondAudio[2]) / 2 * 100 || 0, this.paramSecond.packetsLostVideo = (this.paramSecond.packetsLostVideoList[2] - this.paramSecond.packetsLostVideoList[0]) / (this.paramSecond.packetsSentPerSecondVideo[1] + this.paramSecond.packetsSentPerSecondVideo[2]) / 2 * 100 || 0;
								var l = 0,
									f = 0,
									p = 0,
									h = 0;
								this.paramSecond.googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[1] < 400 && (l = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[2] > 200 && this.paramSecond.googInterframeDelayMaxList[2] < 400 && (f = this.paramSecond.googInterframeDelayMaxList[2] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 400 && (p = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[2] > 400 && (h = this.paramSecond.googInterframeDelayMaxList[2] / 2e3), this.paramSecond.vrdolr = l + f, this.paramSecond.vrdohr = p + h
							}
							if(t % 2 == 0) {
								if(r[0] && r[0].bitsSentPerSecond) {
									var m = r[0].bitsSentPerSecond;
									r[0].bitsSentPerSecond = r[0].bitsSentPerSecond - this.audioBwe.bitsSentCurrent, this.audioBwe.bitsSentCurrent = m
								}
								if(n[0] && n[0].bitsSentPerSecond) {
									var v = n[0].bitsSentPerSecond;
									n[0].bitsSentPerSecond = n[0].bitsSentPerSecond - this.videoBwe.bitsSentCurrent, this.videoBwe.bitsSentCurrent = v
								}
								for(var _ = 0; _ < i.length; _++)
									if(i[_] && i[_].bitsReceivedPerSecond) {
										var y = i[_].bitsReceivedPerSecond;
										i[_].bitsReceivedPerSecond = i[_].bitsReceivedPerSecond - this.audioBwe.bitsRecvCurrent[_], this.audioBwe.bitsRecvCurrent[_] = y
									}
								for(var R = 0; R < a.length; R++)
									if(a[R] && a[R].bitsReceivedPerSecond) {
										var g = a[R].bitsReceivedPerSecond;
										a[R].bitsReceivedPerSecond = a[R].bitsReceivedPerSecond - this.videoBwe.bitsRecvCurrent[R], this.videoBwe.bitsRecvCurrent[R] = g
									}
								this.updateTxMediaInfo(r, n), this.updateRxMediaInfo(i, a), Object.keys(this.infos.rx.audio).length === this.infos.interval / 2 && this.send()
							}
						}
					}
				}, {
					key: "updateOnce",
					value: function(e) {
						var t = e.imInfo,
							r = e.sessionConfig,
							n = e.rtcConnection;
						t && (this.imInfo = t || {}, this.sessionConfig = r || {}, this.rtcConnection = n || {}, this.videoConfig = e.videoConfig || {}, this.getTurnMap(), this.initInfoData(), this.send())
					}
				}, {
					key: "updateLocalVolumn",
					value: function(e) {
						this.localVolumn = e
					}
				}, {
					key: "updateRxMediaInfo",
					value: function(e, t) {
						var r = this,
							n = {
								u: [],
								g: [],
								c: [],
								bn: [],
								bc: []
							},
							i = {
								u: [],
								i: [],
								bn: [],
								bc: [],
								r: [],
								f: [],
								vrdolr: [],
								vrdohr: []
							};
						e.map(function(e) {
							n.u.push(parseFloat(e.id.split("_")[3])), n.g.push(-1), n.c.push(-1), n.bn.push(parseFloat((e.bitsReceivedPerSecond / 2048).toFixed(1)) || 0), n.bc.push(-1)
						}), t.map(function(e) {
							i.u.push(parseFloat(e.id.split("_")[3])), i.i.push(parseFloat(e.googInterframeDelayMax)), i.bn.push(parseFloat((e.bitsReceivedPerSecond / 2048).toFixed(1)) || 0), i.bc.push(-1), i.r.push((e.googFrameWidthReceived || 0) + "x" + (e.googFrameHeightReceived || 0)), i.f.push(parseFloat(e.googFrameRateReceived)), i.vrdolr.push(r.paramSecond.vrdolr || -1), i.vrdohr.push(r.paramSecond.vrdohr || -1)
						}), this.infos.rx.audio.push(n), this.infos.rx.video.push(i)
					}
				}, {
					key: "getLocalMediaStats",
					value: function(e, t) {
						return {
							a_lost: this.paramSecond.packetsLostAudio || 0,
							v_lost: this.paramSecond.packetsLostVideo || 0,
							rtt: parseFloat(e[0] && e[0].googRtt || 0) || 0,
							rtt_mdev: -1,
							set_v_fps: this.videoConfig.frameRate || 0,
							qos_v_fps: parseFloat(t[0] && t[0].googFrameRateInput || 0) || 0,
							v_fps: parseFloat(t[0] && t[0].googFrameRateSent || 0) || 0,
							set_v_quality: this.sessionConfig.videoQuality,
							real_v_res: (t[0] && t[0].googFrameWidthSent || 0) + "x" + (t[0] && t[0].googFrameHeightSent || 0),
							real_v_kbps: parseFloat(t[0] && t[0].googEncodeUsagePercent || 0) || 0,
							real_v_kbps_n: parseFloat(((t[0] && t[0].bitsSentPerSecond || 0) / 2048).toFixed(1)) || 0,
							real_a_kbps: -1,
							real_a_kbps_n: parseFloat(((e[0] && e[0].bitsSentPerSecond || 0) / 2048).toFixed(1)) || 0,
							set_v_kbps: -1,
							qos_v_kbps: 0,
							tx_bw_kbps: parseFloat(((t[0] && t[0].bitsSentPerSecond || 0) / 2048).toFixed(1)) || 0,
							a_volume: parseFloat(this.localVolumn) || 0
						}
					}
				}, {
					key: "updateTxMediaInfo",
					value: function(e, t) {
						var r = this.getLocalMediaStats(e, t);
						for(var n in r) this.infos.tx[n].push(r[n]);
						var i = ((navigator.connection || {}).type || "unknown").toString().toLowerCase();
						this.infos.net = d.convertNetwork(this.network || i)
					}
				}, {
					key: "getTurnMap",
					value: function() {
						if(this.imInfo) {
							var e = this.imInfo;
							e.serverMap && (e.serverMap.constructor === Object ? e.turnMap = e.serverMap || null : e.turnMap = JSON.parse(e.serverMap || null), e.turnMap = e.turnMap && e.turnMap.turnaddrs, e.turnMap = e.turnMap && e.turnMap[0], e.turnMap = e.turnMap.constructor === Array ? e.turnMap[0] : e.turnMap, e.turnMap = e.turnMap && e.turnMap.match(/\d+\.\d+.\d+\.\d+/), e.turnMap = e.turnMap[0])
						} else WEBRTCLOG.warn("尚未连接网关，不统计")
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						this.infos.uid && this.infos.cid && (this.infos.time = Date.now(), this.infos.samples = this.infos.rx.audio.length, (0, a.ajax)({
							type: "post",
							url: "https://statistic.live.126.net/statistic/realtime/sdkinfo",
							data: this.infos
						}).then(function(t) {
							e.clearInfoData()
						}).catch(function(t) {
							WEBRTCLOG.log("data uploader send", t), e.clearInfoData()
						}))
					}
				}]), e
			}();
		t.default = u;
		var d = {
			convertNetwork: function(e) {
				return {
					wlan: "wifi",
					lan: "ethernet"
				}[e] || "unknown"
			},
			convertPlatform: function(e) {
				var t = void 0;
				return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
			}
		};
		e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = o(r(1)),
			i = o(r(4)),
			a = r(45);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = r(8).info.nrtcVersion,
			c = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, n.default)(this, e);
					var r = t.appkey,
						i = t.platform;
					this.apis = {}, this.isRtc = /WebRTC/.test(i), this.init(r, i), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "init",
					value: function(e, t) {
						this.apis = Object.assign(this.apis, {
							ver: 1,
							platform: t,
							sdk_ver: s || "v4.4.0",
							uid: null,
							appkey: e,
							time: null
						})
					}
				}, {
					key: "start",
					value: function(e) {
						this.calling = !0, this.apis = Object.assign(this.apis, e)
					}
				}, {
					key: "resetStatus",
					value: function() {
						this.calling = !1, this.apis = Object.assign(this.apis, {
							p2p: {
								value: 0
							},
							meeting: {
								value: 0
							},
							bypass: {
								value: 0
							},
							call_control_type: {
								value: 0
							},
							self_mute: {
								value: -1
							},
							self_mic_mute: {
								value: -1
							},
							switch_p2p_type: {
								value: 0
							},
							set_speaker: {
								value: -1
							},
							net_detect: {
								value: this.isRtc ? -1 : 0
							},
							beautify: {
								value: -1
							},
							water_mark: {
								value: -1
							},
							audio_samples: {
								value: -1
							},
							video_samples: {
								value: -1
							},
							pre_view_mirror: {
								value: -1
							},
							code_mirror: {
								value: -1
							},
							custom_audio: {
								value: -1
							},
							custom_video: {
								value: -1
							},
							audio_mix: {
								value: -1
							},
							snap_shot: {
								value: -1
							},
							record: {
								value: 0
							},
							audio_record: {
								value: 0
							},
							display: {
								value: 0
							},
							android_compatibility: {
								value: -1
							},
							hd_audio: {
								value: 0
							},
							video_quality: {
								value: 0
							},
							fps: {
								value: 0
							},
							prefered_video_encoder: {
								value: -1
							},
							prefered_video_decoder: {
								value: -1
							},
							video_max_encode_bitrate: {
								value: this.isRtc ? -1 : 0
							},
							audio_scene: {
								value: -1
							},
							video_adaptive_strategy: {
								value: this.isRtc ? -1 : 0
							},
							ans: {
								value: this.isRtc ? -1 : 0
							},
							agc: {
								value: -1
							},
							dtx: {
								value: -1
							},
							aec: {
								value: this.isRtc ? -1 : 0
							},
							awc: {
								value: this.isRtc ? -1 : 0
							},
							actor: {
								value: 0
							},
							always_keep_calling: {
								value: 0
							},
							server_record_audio: {
								value: 0
							},
							server_record_video: {
								value: 0
							},
							server_record_single_user: {
								value: 0
							},
							screen_sharing_module: {
								value: 0
							},
							video_crop: {
								value: 0
							}
						})
					}
				}, {
					key: "update",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = arguments[1],
							r = e.key,
							n = e.ext;
						e.constructor === String && (r = e), n = n || t, this.apis[r] && (this.apis[r].value = 1, void 0 !== n && (this.apis[r].ext = n), /(p2p|meeting)/.test(r) && (this.calling = !0))
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						this.calling && (this.calling = !1, this.apis.time = Date.now(), (0, a.ajax)({
							type: "post",
							url: "https://statistic.live.126.net/statistic/realtime/sdkFunctioninfo",
							data: this.apis
						}).then(function(t) {
							e.resetStatus()
						}).catch(function(t) {
							WEBRTCLOG.log("err", t), e.resetStatus()
						}))
					}
				}]), e
			}();
		t.default = c, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n;
		t.tool = {
			merge: function() {
				var e = arguments;
				return e[0] = Object.assign.apply(Object.assign, arguments), e[0]
			},
			verifyOptions: function() {
				var e = arguments;
				if(e[0] && e[0].constructor === Object)
					for(var t = 1; t < arguments.length; t++) {
						var r = e[t];
						(r = r.split(" ")).map(function(t) {
							if(!e[0][t]) throw Error("参数缺失 " + t)
						})
					}
			},
			guid: (n = function() {
				return(65536 * (1 + Math.random()) | 0).toString(16).substring(1)
			}, function() {
				return n() + n() + n() + n() + n() + n() + n() + n()
			}),
			sortDevices: function(e) {
				e && e.length > 1 && e.sort(function(e, t) {
					var r = -1 !== e.name.toLowerCase().indexOf("virtual"),
						n = -1 !== e.path.toLowerCase().indexOf("virtual"),
						i = -1 !== t.name.toLowerCase().indexOf("virtual"),
						a = -1 !== t.path.toLowerCase().indexOf("virtual");
					return n ? 1 : a ? -1 : r && i ? 0 : r ? 1 : i ? -1 : 0
				})
			},
			isString: function(e) {
				return e.constructor === String
			},
			isNumber: function(e) {
				return e.constructor === Number
			},
			isBoolean: function(e) {
				return e.constructor === Boolean
			},
			isObject: function(e) {
				return e.constructor === Object
			},
			isArray: function(e) {
				return e.constructor === Array
			},
			isFunction: function(e) {
				return e.constructor === Function
			},
			isDate: function(e) {
				return e.constructor === Date
			},
			isRegExp: function(e) {
				return e.constructor === RegExp
			},
			isNull: function(e) {
				return null === e
			},
			isUndefined: function(e) {
				return void 0 === e
			},
			exist: function(e) {
				return !isNull(e) && !isUndefined(e)
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ajax = function(e) {
			if(!e.url || !e.data) return Promise.reject("参数不完整，无法发起请求");
			e.dataType = e.dataType || "json";
			var t = new XMLHttpRequest;
			return t.open(e.type || "GET", e.url, !0), t.responseType = "" + e.dataType, t.setRequestHeader("Content-type", "application/json;charset=UTF-8"), e.header && Object.keys(e.header).map(function(r) {
				t.setRequestHeader(r, e.header[r])
			}), new Promise(function(r, n) {
				t.onload = function() {
					var e = t.response;
					r(e)
				}, t.onerror = function(e) {
					n(e)
				}, t.send(JSON.stringify(e.data))
			})
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.element = {
			html2node: function(e) {
				var t = document.createElement("div");
				t.innerHTML = e;
				var r = [],
					n = void 0,
					i = void 0;
				if(t.children)
					for(n = 0, i = t.children.length; n < i; n++) r.push(t.children[n]);
				else
					for(n = 0, i = t.childNodes.length; n < i; n++) {
						var a = t.childNodes[n];
						1 == a.nodeType && r.push(a)
					}
				return r.length > 1 ? t : r[0]
			},
			n2node: function(e) {
				return e ? /HTML.+Element/gi.test(e) ? e : e[0] && /HTML.+Element/gi.test(e[0]) ? e[0] : null : null
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(11),
			i = r(21),
			a = n.getGlobal();

		function o(e, t) {
			for(var r in t) e[r] = t[r];
			return e
		}
		a.Object.assign || (console.log("Object.assign polyfill"), a.Object.assign = function() {
			for(var e = arguments, t = 1; t < e.length; t++) e[0] = o(e[0], e[t]);
			return e[0]
		}), a.platform = i
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.default = function(e) {
			var t = e.util;
			return n = t.notundef, i
		};
		var n = void 0;

		function i(e) {
			n(e.enable) && (this.enable = e.enable ? 1 : 0), n(e.needBadge) && (this.needBadge = e.needBadge ? 1 : 0), n(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0), n(e.pushContent) && (this.pushContent = "" + e.pushContent), n(e.custom) && (this.custom = "" + e.custom), n(e.pushPayload) && (this.pushPayload = "" + e.pushPayload), n(e.sound) && (this.sound = "" + e.sound), n(e.webrtcEnable) && (this.webrtcEnable = e.webrtcEnable ? 1 : 0), n(e.forceKeepCalling) && (this.forceKeepCalling = e.forceKeepCalling ? 1 : 0)
		}
		e.exports = t.default
	}, function(e, t, r) {
		var n = r(17),
			i = r(56).f;
		r(148)("getOwnPropertyDescriptor", function() {
			return function(e, t) {
				return i(n(e), t)
			}
		})
	}, function(e, t, r) {
		r(227);
		var n = r(6).Object;
		e.exports = function(e, t) {
			return n.getOwnPropertyDescriptor(e, t)
		}
	}, function(e, t, r) {
		e.exports = {
			default: r(228),
			__esModule: !0
		}
	}, function(e, t, r) {
		var n = r(46),
			i = r(74);
		r(148)("getPrototypeOf", function() {
			return function(e) {
				return i(n(e))
			}
		})
	}, function(e, t, r) {
		r(230), e.exports = r(6).Object.getPrototypeOf
	}, function(e, t, r) {
		e.exports = {
			default: r(231),
			__esModule: !0
		}
	}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NRTCAdapter = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(119)),
			s = d(r(2)),
			c = r(188),
			u = r(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t), e = Object.assign(u.DEFAULT_NRTC_OPTION, e), u.CONFIG_MAP.CURRENT.SDK_TYPE = u.CONFIG_MAP.SDK_TYPE.NRTC;
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r.adapterRef.instance = r, u.CONFIG_MAP.CURRENT.SDK_TYPE = u.CONFIG_MAP.SDK_TYPE.NRTC, r.adapterRef.instance._isFirefox() ? window.addEventListener("beforeunload", function() {
					WEBRTCLOG.log("pagehide event fire"), r.leaveChannel()
				}) : window.addEventListener("pagehide", function() {
					WEBRTCLOG.log("pagehide event fire"), r.leaveChannel()
				}), r
			}
			return(0, s.default)(t, e), (0, i.default)(t, [{
				key: "setAudioBlack",
				value: function(e) {
					this.adapterRef.commonApi.setAudioBlack(e)
				}
			}, {
				key: "setAudioStart",
				value: function(e) {
					this.adapterRef.commonApi.setAudioStart(e)
				}
			}, {
				key: "setVideoBlack",
				value: function(e) {
					this.adapterRef.commonApi.setVideoBlack(e)
				}
			}, {
				key: "setVideoShow",
				value: function(e) {
					this.adapterRef.commonApi.setVideoShow(e)
				}
			}, {
				key: "startRtc",
				value: function() {
					return this.adapterRef.commonApi.startRtc()
				}
			}, {
				key: "createChannel",
				value: function(e) {
					return this.adapterRef.meeting4NRTCApi.createChannel(e)
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					return this.setStartSessionTime(), this.adapterRef.meeting4NRTCApi.joinChannel(e)
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.setEndSessionTime(), this.adapterRef.meeting4NRTCApi.leaveChannel()
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					return this.adapterRef.meeting4NRTCApi.changeRoleToPlayer()
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					return this.adapterRef.meeting4NRTCApi.changeRoleToAudience()
				}
			}, {
				key: "setCaptureVolume",
				value: function(e) {
					this.adapterRef.captureApi.setCaptureVolume(e)
				}
			}, {
				key: "getDevicesOfType",
				value: function(e) {
					return this.adapterRef.deviceApi.getDevicesOfType(e)
				}
			}, {
				key: "startDevice",
				value: function(e) {
					return this.adapterRef.deviceApi.startDevice(e)
				}
			}, {
				key: "stopDevice",
				value: function(e) {
					return this.adapterRef.deviceApi.stopDevice(e)
				}
			}, {
				key: "startLocalStream",
				value: function(e) {
					this.adapterRef.playApi.startLocalStream(e)
				}
			}, {
				key: "stopLocalStream",
				value: function() {
					this.adapterRef.playApi.stopLocalStream()
				}
			}, {
				key: "startRemoteStream",
				value: function(e) {
					this.adapterRef.playApi.startRemoteStream(e)
				}
			}, {
				key: "stopRemoteStream",
				value: function(e) {
					this.adapterRef.playApi.stopRemoteStream(e)
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					this.adapterRef.playApi.setPlayVolume(e)
				}
			}, {
				key: "setVideoViewSize",
				value: function(e) {
					this.adapterRef.playApi.setVideoViewSize(e)
				}
			}, {
				key: "setVideoViewRemoteSize",
				value: function(e) {
					this.adapterRef.playApi.setVideoViewRemoteSize(e)
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					this.adapterRef.playApi.resumeLocalStream()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					this.adapterRef.playApi.suspendLocalStream()
				}
			}, {
				key: "resumeRemoteStream",
				value: function(e) {
					this.adapterRef.playApi.resumeRemoteStream(e)
				}
			}, {
				key: "suspendRemoteStream",
				value: function(e) {
					this.adapterRef.playApi.suspendRemoteStream(e)
				}
			}, {
				key: "startRecordMp4",
				value: function(e) {
					var t = e;
					return this.adapterRef.recordApi.startRecordMp4(t)
				}
			}, {
				key: "startRecordAac",
				value: function() {
					return this.adapterRef.recordApi.startRecordAac()
				}
			}, {
				key: "stopRecordMp4",
				value: function() {
					return this.adapterRef.recordApi.stopRecordMp4()
				}
			}, {
				key: "stopRecordAac",
				value: function() {
					return this.adapterRef.recordApi.stopRecordMp4()
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = e.uid;
					return t ? this.adapterRef.meeting4NRTCApi.updateRtmpHost(t) : Promise.reject("nrtc: 请填写设置互动直播主画面操作uid！")
				}
			}, {
				key: "destroy",
				value: function() {
					(0, o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
				}
			}]), t
		}(c.AbstractAdapter);
		t.NRTCAdapter = l
	}, function(e, t, r) {
		"use strict";
		var n = r(21),
			i = r(0);
		r(51);

		function a() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			i.merge(this, {
				options: e,
				debug: !1,
				api: "log",
				style: "color:#1cb977;",
				log: i.emptyFunc,
				info: i.emptyFunc,
				warn: i.emptyFunc,
				error: i.emptyFunc
			}), this.prefix = e.prefix || "", this.setDebug(e.debug)
		}
		var o = a.prototype,
			s = ["Chrome", "Safari", "Firefox"];
		o.setDebug = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
				t = this;
			if(t.debug = e, e.style && (t.style = e.style), t.debug && i.exist(console)) {
				var r = console;
				t.debug = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(n.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("debug", e)
				}, t.log = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(n.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("log", e)
				}, t.info = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(n.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("info", e)
				}, t.warn = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(n.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("warn", e)
				}, t.error = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(n.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("error", e)
				}, t._log = function(e, n) {
					var a = t.options.logFunc,
						o = null;
					if(a && (a[e] && (o = a[e]), i.isFunction(o))) o.apply(a, n);
					else if(r[e]) try {
						r[e].apply ? t.chrome(e, n) : t.ie(e, n)
					} catch(e) {}
				}, t.chrome = function(e, i) {
					-1 !== s.indexOf(n.name) ? r[e].apply(r, i) : t.ie(e, i)
				}, t.ie = function(e, t) {
					t.forEach(function(t) {
						r[e](JSON.stringify(t, null, 4))
					})
				}
			}
		}, o.formatArgs = function(e) {
			e = [].slice.call(e, 0);
			var t = new Date,
				r = "[WEBRTC LOG " + (c(t.getMonth() + 1) + "-" + c(t.getDate()) + " " + c(t.getHours()) + ":" + c(t.getMinutes()) + ":" + c(t.getSeconds()) + ":" + c(t.getMilliseconds(), 3)) + " " + this.prefix.toUpperCase() + "]  ";
			return i.isString(e[0]) ? e[0] = r + e[0] : e.splice(0, 0, r), e.forEach(function(t, r) {
				(i.isArray(t) || i.isObject(t)) && (e[r] = i.simpleClone(t))
			}), e
		};
		var c = function(e, t) {
			t = t || 2;
			for(var r = "" + e; r.length < t;) r = "0" + r;
			return r
		};
		e.exports = a
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PlayApi = void 0;
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "startLocalStream",
				value: function(e) {
					return this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "display"
					}), this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid).show(e), Promise.resolve()
				}
			}, {
				key: "stopLocalStream",
				value: function() {
					this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid).hide()
				}
			}, {
				key: "startRemoteStream",
				value: function(e) {
					var t = this,
						r = e.account,
						n = e.node,
						i = (e.poster, r);
					return i ? (this.adapterRef.instance._getVideoHelperByUid(i).show(n || this.adapterRef.remoteContainer), Promise.resolve()) : (Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, r) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).show(n || t.adapterRef.remoteContainer)
					}), Promise.resolve())
				}
			}, {
				key: "stopRemoteStream",
				value: function(e) {
					var t = this,
						r = e;
					r ? this.adapterRef.instance._getVideoHelperByUid(r).hide() : Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, r) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).hide()
					})
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					var t = this;
					"number" == typeof e && Object.keys(this.adapterRef.audioHelperMap).map(function(r) {
						t.adapterRef.instance._getAudioHelperByUid(r).setPlayVolume(e)
					});
					return Promise.resolve()
				}
			}, {
				key: "setVideoViewSize",
				value: function(e) {
					this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "video_crop"
					});
					var t = this.adapterRef.imInfo.uid,
						r = this.adapterRef.instance._getVideoHelperByUid(t);
					!0 === r._checkHasVideoStream() ? r.videoDomHelper.resize(e) : WEBRTCLOG.warn("play: show: 未检测到视频流，请检查媒体设备是否开启...")
				}
			}, {
				key: "setVideoViewRemoteSize",
				value: function(e) {
					var t = this;
					if(this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_crop"
						}), e.account) {
						var r = e.account;
						this.adapterRef.instance._getVideoHelperByUid(r).videoDomHelper.resize({
							width: e.width,
							height: e.height,
							cut: e.cut
						})
					} else {
						Object.keys(this.adapterRef.videoHelperMap).map(function(r) {
							var n = t.adapterRef.instance._getVideoHelperByUid(r);
							!0 === n._checkHasVideoStream() && r != t.adapterRef.imInfo.uid ? n.videoDomHelper ? n.videoDomHelper.resize({
								width: e.width,
								height: e.height,
								cut: e.cut
							}) : WEBRTCLOG.warn("play: setVideoViewRemoteSize: 远程节点的承载容器尚未创建出来， " + n.uid) : WEBRTCLOG.warn("play: setVideoViewRemoteSize: 未检测到视频流，请检查媒体设备是否开启..." + n.uid)
						})
					}
					return Promise.resolve()
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					var e = this.adapterRef.imInfo.uid;
					this.adapterRef.instance._getVideoHelperByUid(e).resumeLocalStream()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					var e = this.adapterRef.imInfo.uid;
					this.adapterRef.instance._getVideoHelperByUid(e).suspendLocalStream()
				}
			}, {
				key: "resumeRemoteStream",
				value: function(e) {
					var t = this;
					e ? this.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(e) : Object.keys(this.adapterRef.videoHelperMap).map(function(e) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(e)
					})
				}
			}, {
				key: "suspendRemoteStream",
				value: function(e) {
					var t = this;
					e ? this.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream() : Object.keys(this.adapterRef.videoHelperMap).map(function(e) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream()
					})
				}
			}]), t
		}(r(9).EventEmitter);
		t.PlayApi = c
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CommonApi = void 0;
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "_doStopDevice4PlayVideo",
				value: function(e) {
					return Promise.resolve()
				}
			}, {
				key: "setAudioBlack",
				value: function(e) {
					var t = this;
					if(e)
						if(-1 == e) {
							this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid).stopAudio()
						} else {
							this.adapterRef.instance._getAudioHelperByUid(e).stopAudio()
						}
					else Object.keys(this.adapterRef.audioHelperMap).map(function(e) {
						t.adapterRef.imInfo.uid != e && t.adapterRef.instance._getAudioHelperByUid(e).stopAudio()
					})
				}
			}, {
				key: "setAudioStart",
				value: function(e) {
					-1 == e ? this.adapterRef.deviceApi._doStartDevice4PlayLocalAudio() : this.adapterRef.deviceApi._doStartDevice4PlayRemoteAudio(e)
				}
			}, {
				key: "setVideoBlack",
				value: function(e) {}
			}, {
				key: "setVideoShow",
				value: function(e) {}
			}, {
				key: "startRtc",
				value: function() {
					return this.adapterRef.instance._startSession()
				}
			}]), t
		}(r(9).EventEmitter);
		t.CommonApi = c
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.P2P4WebRTCApi = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(9),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "call",
				value: function(e) {
					if(this.adapterRef.calling) return Promise.reject({
						type: "statusNotMatch",
						error: "呼叫失败: 当前正在通话中"
					});
					var t = e.account,
						r = e.type,
						n = e.pushConfig,
						i = e.sessionConfig;
					if(this.adapterRef.calling = !0, this.adapterRef.isCaller = !0, this.adapterRef.callee = t, this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig(i), this.adapterRef.instance._setSessionConfig({
							signalStartTime: Date.now()
						}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "p2p"
						}), i.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "hd_audio"
						}), n.forceKeepCalling && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "always_keep_calling"
						}), void 0 !== i.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "fps",
							ext: 0 == +i.videoFrameRate ? 0 : +i.videoFrameRate + 1
						}), void 0 !== i.videoQuality) {
						var a = +i.videoQuality;
						a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_quality",
							ext: a || 0
						})
					}
					return this.adapterRef.imBusiness.initNetcall({
						type: r,
						pushConfig: n
					})
				}
			}, {
				key: "setNetcallSession",
				value: function(e) {
					return this.adapterRef.calling ? Promise.reject({
						type: "statusNotMatch",
						error: "开启会话失败: 当前正在通话中"
					}) : (this.adapterRef.signalInited = !0, this.adapterRef.calling = !0, this.adapterRef.channelId = e.channelId, this.adapterRef.imInfo = e, this.adapterRef.type = e.netcallType, this.adapterRef.imInfo.serverAddrs = e.rtcServerMap, this.adapterRef.imInfo.rtcUrls = e.rtcServerMap, this.beCalledInfo = this.adapterRef.imInfo, this.adapterRef.imInfo.sessionConfig && this.adapterRef.instance._setSessionConfig(this.adapterRef.imInfo.sessionConfig), this.adapterRef.imBusiness._parseAccountUidMap(e.accountUidMap), Promise.resolve())
				}
			}, {
				key: "response",
				value: function(e) {
					var t = e.sessionConfig,
						r = void 0 === t ? {} : t,
						n = e;
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "p2p"
						}), r.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "hd_audio"
						}), void 0 !== r.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "fps",
							ext: 0 == +r.videoFrameRate ? 0 : +r.videoFrameRate + 1
						}), void 0 !== r.videoQuality) {
						var i = +r.videoQuality;
						i === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? i = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : i === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (i = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_quality",
							ext: i || 0
						})
					}
					return n.fn = "calleeAck", this.adapterRef.imBusiness.baseResponse(n)
				}
			}, {
				key: "hangup",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					e.fn = "hangup", e.recordType = "cancelNetcallBeforeAccept", this.adapterRef.imBusiness.baseHangup(e)
				}
			}, {
				key: "control",
				value: function(e) {
					var t = e;
					return t.fn = "netcallControl", this.adapterRef.imBusiness.baseControl(t)
				}
			}, {
				key: "switchAudioToVideo",
				value: function() {
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "switch_p2p_type"
						}), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise.reject("no connection");
					var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
					return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._enableDevice(c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_VIDEO, Promise.resolve()
				}
			}, {
				key: "switchVideoToAudio",
				value: function() {
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "switch_p2p_type"
						}), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise.reject("no connection");
					var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
					return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._disableDevice(c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_AUDIO, Promise.resolve()
				}
			}]), t
		}(s.EventEmitter);
		t.P2P4WebRTCApi = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Meeting4WebRTCApi = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2)),
			s = r(9),
			c = r(45),
			u = r(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "createChannel",
				value: function(e) {
					var t = this,
						r = e;
					return c.tool.verifyOptions(r, "channelName"), r.custom = r.custom || "", r.webrtcEnable = !0, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "meeting"
					}), this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.imBusiness.baseCreateChannel("createChannel", r).then(function(e) {
						return Promise.resolve(e)
					}).catch(function(e) {
						return WEBRTCLOG.error("createChannel error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					var t = this,
						r = e;
					if(this.adapterRef.signalInited) return WEBRTCLOG.error("已经加入房间..."), Promise.reject("已经加入房间");
					c.tool.verifyOptions(r, "channelName type");
					var n = r.sessionConfig,
						i = void 0 === n ? {} : n;
					return i.liveEnable = r.liveEnable || i.liveEnable, i.rtmpRecord = r.rtmpRecord || i.rtmpRecord, this.adapterRef.instance._setSessionConfig(i), this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.imBusiness.baseJoinChannel("joinChannel", {
						channelName: r.channelName,
						liveEnable: r.liveEnable,
						rtmpRecord: r.rtmpRecord
					}).then(function(e) {
						return WEBRTCLOG.log("joinChannel success=%o", e), t.adapterRef.type = e.type = r.type, e.account = t.adapterRef.nim.account, t.adapterRef.imInfo = Object.assign(t.adapterRef.imInfo, e), t.adapterRef.imInfo.role = void 0 === r.role ? u.ROLE_FOR_MEETING.ROLE_PLAYER : r.role, t.adapterRef.channelId = e.channelId, t.adapterRef.apiReportHelper.uploadDataApi("start", {
							uid: e.uid
						}), Promise.resolve({
							uid: e.uid,
							account: t.adapterRef.nim.account,
							type: e.type,
							custom: e.custom
						})
					}).catch(function(e) {
						return WEBRTCLOG.log("joinchannel error=%o", e), Promise.reject(e)
					})
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.adapterRef.signalInited ? this.adapterRef.sessionMode ? this.adapterRef.sessionMode !== u.SESSION_MODE.MEETING ? (WEBRTCLOG.error("not in a meeting"), Promise.reject({
						code: "not in a meeting"
					})) : (this.adapterRef.apiReportHelper.uploadDataApi("send"), this.adapterRef.imBusiness.hangup(), this.adapterRef.instance._resetStatus(), Promise.resolve()) : (WEBRTCLOG.error("sessionMode is null"), Promise.reject({
						code: "noConnection"
					})) : (WEBRTCLOG.error("noConnection"), Promise.reject({
						code: "noConnection"
					}))
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					if(this.adapterRef.imInfo.sessionMode !== u.SESSION_MODE.P2P) return this.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_PLAYER ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = u.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "actor"
					}), this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "player"
						})
					}));
					WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法")
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					if(this.adapterRef.imInfo.sessionMode !== u.SESSION_MODE.P2P) return this.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_AUDIENCE ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = u.ROLE_FOR_MEETING.ROLE_AUDIENCE, this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "audience"
						})
					}));
					WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法")
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = this.adapterRef.imInfo.sessionConfig.roomServerUrl + this.adapterRef.imInfo.cid,
						r = this.adapterRef.imInfo.turnToken || this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.token;
					return r ? (0, c.ajax)({
						type: "post",
						url: t,
						data: {
							suid: this.adapterRef.imInfo.uid,
							cid: this.adapterRef.imInfo.cid,
							uid: parseInt(e),
							cmd: 10001
						},
						header: {
							Token: r
						}
					}).then(function(e) {
						if(200 === e.code) return Promise.resolve();
						var t = void 0;
						switch(e.code) {
							case 404:
								t = "房间不存在";
								break;
							case 405:
								t = "目标用户不在房间中";
								break;
							case 406:
								t = "没有权限";
								break;
							case 417:
								t = "请求数据不对";
								break;
							case 600:
								t = "服务器内部错误";
								break;
							default:
								t = "请求参数不正确"
						}
						return Promise.reject(t)
					}) : Promise.reject("token缺失, 请检查")
				}
			}]), t
		}(s.EventEmitter);
		t.Meeting4WebRTCApi = l
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Meeting4NRTCApi = void 0;
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2)),
			s = r(9),
			c = r(45),
			u = r(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "createChannel",
				value: function(e) {
					return Promise.reject("NRTC暂无创建房间接口")
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					var t = e;
					c.tool.verifyOptions(t, "appkey cid uid token sessionMode wssArr"), t.liveEnable && c.tool.verifyOptions(t, "turnToken");
					var r = Object.assign(t.sessionMode === u.SESSION_MODE.P2P ? u.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC : u.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC, t.sessionConfig);
					return this.adapterRef.imInfo = t, r.liveEnable = t.liveEnable, r.rtmpRecord = t.rtmpRecord, t.wssArr.constructor === String && (t.wssArr = [t.wssArr]), this.adapterRef.imInfo.sessionConfig = r, Promise.resolve(t)
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.adapterRef.instance._stopSession()
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					return this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.P2P ? (WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法"), Promise.reject("点对点场景不支持此方法")) : this.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_PLAYER ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = u.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "actor"
					}), this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "player"
						})
					}))
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					return this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.P2P ? (WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法"), Promise.rejct("点对点场景不支持此方法")) : this.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_AUDIENCE ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = u.ROLE_FOR_MEETING.ROLE_AUDIENCE, this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "audience"
						})
					}))
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = this.adapterRef.imInfo.sessionConfig.roomServerUrl + this.adapterRef.imInfo.cid,
						r = this.adapterRef.imInfo.turnToken || this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.token;
					return r ? (0, c.ajax)({
						type: "post",
						url: t,
						data: {
							suid: this.adapterRef.imInfo.uid,
							cid: this.adapterRef.imInfo.cid,
							uid: parseInt(e),
							cmd: 10001
						},
						header: {
							Token: r
						}
					}).then(function(e) {
						if(200 === e.code) return Promise.resolve();
						var t = void 0;
						switch(e.code) {
							case 404:
								t = "房间不存在";
								break;
							case 405:
								t = "目标用户不在房间中";
								break;
							case 406:
								t = "没有权限";
								break;
							case 417:
								t = "请求数据不对";
								break;
							case 600:
								t = "服务器内部错误";
								break;
							default:
								t = "请求参数不正确"
						}
						return Promise.reject(t)
					}) : Promise.reject("token缺失, 请检查")
				}
			}]), t
		}(s.EventEmitter);
		t.Meeting4NRTCApi = l
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RecordApi = void 0;
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "startRecordMp4",
				value: function(e) {
					this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "record"
					});
					var t = [],
						r = null,
						n = null;
					if(e || (e = this.adapterRef.imInfo.uid), r = this.adapterRef.instance._getAudioHelperByUid(e), n = this.adapterRef.instance._getVideoHelperByUid(e), e == this.adapterRef.imInfo.uid) r.getLocalAudioStream() && t.push(r.getLocalAudioStream()), n.getLocalVideoStream() && t.push(n.getLocalVideoStream());
					else {
						if(!r || !n) return Promise.reject("需要录制的账号不正确");
						r.remoteAudioStream && t.push(r.remoteAudioStream), n.remoteVideoStream && t.push(n.remoteVideoStream)
					}
					return 0 === t.length ? Promise.reject("当前没有音视频数据，无法进行录制") : this.adapterRef.mediaRecordHelper.start(t, {
						uid: e
					})
				}
			}, {
				key: "startRecordAac",
				value: function() {
					this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "audio_record"
					});
					var e = this.adapterRef.imInfo.uid,
						t = [],
						r = this.adapterRef.audioHelperMap;
					for(var n in r)(r[n].remoteAudioStream || r[n].localAudioStream) && t.push(r[n].remoteAudioStream || r[n].localAudioStream);
					return this.adapterRef.mediaRecordHelper.start(t, {
						uid: e,
						type: "audio"
					})
				}
			}, {
				key: "stopRecordMp4",
				value: function() {
					return this.adapterRef.mediaRecordHelper.stop()
				}
			}, {
				key: "stopRecordAac",
				value: function() {
					return this.adapterRef.mediaRecordHelper.stop()
				}
			}]), t
		}(r(9).EventEmitter);
		t.RecordApi = c
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CaptureApi = void 0;
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "setCaptureVolume",
				value: function(e) {
					this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid).setGain(e)
				}
			}]), t
		}(r(9).EventEmitter);
		t.CaptureApi = c
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DeviceApi = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(9),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "getDevicesOfType",
				value: function(e) {
					var t = this.sdkRef.getDeviceTypeMap(e);
					return this.adapterRef && this.adapterRef.deviceBusiness && this.adapterRef.deviceBusiness.mediaDeviceHelper && this.adapterRef.deviceBusiness.mediaDeviceHelper.getDevicesOfType(t)
				}
			}, {
				key: "startDevice",
				value: function(e) {
					var t = e.type,
						r = e.device,
						n = e.account,
						i = e.uid;
					return t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (WEBRTCLOG.warn("开启设备, 播放本地声音"), this._doStartDevice4PlayLocalAudio()) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT ? this._doStartDevice4PlayRemoteAudio(n, i) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN ? (this.adapterRef.state.lastDeviceStatus.audio = {
						type: t,
						device: r
					}, this.adapterRef.state.audioDeviceHasOpened = !0, this._doStartDeviceCommon(t, r)) : t === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO ? (this.adapterRef.state.lastDeviceStatus.video = {
						type: t,
						device: r
					}, this.adapterRef.state.chromeScreenShareOpened = !1, this.adapterRef.state.videoDeviceHasOpened = !0, this._doStartDeviceCommon(t, r)) : t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW || t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN ? (this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "screen_sharing_module"
					}), this.adapterRef.state.chromeScreenShareOpened = !0, this._doStartDeviceCommon(t, r)) : Promise.reject("不支持的开启设备类型")
				}
			}, {
				key: "stopDevice",
				value: function(e) {
					var t = this;
					return new Promise(function(r, n) {
						if(e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
							var i = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid);
							return t.adapterRef.state.videoDeviceHasOpened = !1, t.adapterRef.state.chromeScreenShareOpened = !1, i ? i.stopVideoDevice(r) : (WEBRTCLOG.error("不存在的videoHelper对象，直接返回"), Promise.reject("不存在的videoHelper对象"))
						}
						if(e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
							var a = t.adapterRef.instance._getAudioHelperByUid(t.adapterRef.imInfo.uid);
							if(t.adapterRef.state.audioDeviceHasOpened = !1, !a) return WEBRTCLOG.error("不存在的audioHelper对象，直接返回"), Promise.reject("不存在的audioHelper对象");
							a.destroyMedia(), r()
						} else e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (t._doStopDevice4PlayLocalAudio(), r()) : e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT && (t._doStopDevice4PlayRemoteAudio(), r())
					})
				}
			}, {
				key: "_doStopDevice4PlayLocalAudio",
				value: function() {
					return this.adapterRef.audioHelperMap[this.imInfo.uid].stopAudio(), Promise.resolve()
				}
			}, {
				key: "_doStopDevice4PlayRemoteAudio",
				value: function(e, t) {
					return t || e ? t ? this._doStopRemoteAudioByUid(t) : e && (t = this._getUidByAccount(e), this._doStopRemoteAudioByUid(t)) : this._doStopChatAudioOfAllRemoteAudio(), Promise.resolve()
				}
			}, {
				key: "_doStopChatAudioOfAllRemoteAudio",
				value: function() {
					for(var e = Object.keys(this.adapterRef.audioHelperMap), t = 0; t < e.length; t++) {
						this.adapterRef.imInfo.uid != e[t] && this._doStopRemoteAudioByUid(e[t])
					}
				}
			}, {
				key: "_doStopRemoteAudioByUid",
				value: function(e) {
					this.adapterRef.imInfo.uid != e ? this.adapterRef.instance._getAudioHelperByUid(e).stopAudio() : WEBRTCLOG.warn("NRTCAdapter:_doPlayRemoteAudioByUid 非远程流账号或UID，无法停止：UID=%s", e)
				}
			}, {
				key: "_doStartDevice4PlayLocalAudio",
				value: function() {
					return this.adapterRef.audioHelperMap[this.adapterRef.imInfo.uid].playAudio(), Promise.resolve()
				}
			}, {
				key: "_doStartDevice4PlayRemoteAudio",
				value: function(e) {
					return e ? e && this._doPlayRemoteAudioByUid(e) : this._doPlayChatAudioOfAllRemoteAudio(), Promise.resolve()
				}
			}, {
				key: "_doPlayChatAudioOfAllRemoteAudio",
				value: function() {
					var e = this;
					Object.keys(this.adapterRef.audioHelperMap).map(function(t) {
						e.adapterRef.imInfo.uid != t && e._doPlayRemoteAudioByUid(t)
					})
				}
			}, {
				key: "_doPlayRemoteAudioByUid",
				value: function(e) {
					this.adapterRef.imInfo.uid != e ? this.adapterRef.instance._getAudioHelperByUid(e).playAudio() : WEBRTCLOG.warn("NRTCAdapter:_doPlayRemoteAudioByUid 非远程流账号或UID，无法播放：UID=%s", e)
				}
			}, {
				key: "_doStartDeviceCommon",
				value: function(e, t) {
					var r = this,
						n = Promise.resolve(),
						i = !t || !t.deviceId;
					return i && (n = this.getDevicesOfType(e)), new Promise(function(a, o) {
						n.then(function(n) {
							var s = null,
								u = e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN;
							if(i && !u) {
								if(!n || 0 == n.length) return void o("无任何设备，无法开启");
								s = n[0]
							} else s = t;
							if(e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
								var d = r.adapterRef.instance._getAudioHelperByUid(r.adapterRef.imInfo.uid);
								return d.hasStartAudioDeviceRepeat(s).then(function() {
									return d.getAudioStream(s, a, o)
								}).catch(function(e) {
									/重复操作/.test(e) ? a() : o(e)
								})
							}
							if(e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
								var l = r.adapterRef.instance._getVideoHelperByUid(r.adapterRef.imInfo.uid);
								return l.hasStartVideoDeviceRepeat(s).then(function() {
									return l.getVideoStream(s, a, o)
								}).catch(function(e) {
									/重复操作/.test(e) ? a() : o(e)
								})
							}
							if(u) return r.adapterRef.instance._getVideoHelperByUid(r.adapterRef.imInfo.uid).getScreenStream(s, a, o)
						}).catch(function(e) {
							o(e)
						})
					})
				}
			}]), t
		}(s.EventEmitter);
		t.DeviceApi = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(274);
		Object.defineProperty(t, "DeviceApi", {
			enumerable: !0,
			get: function() {
				return n.DeviceApi
			}
		});
		var i = r(273);
		Object.defineProperty(t, "CaptureApi", {
			enumerable: !0,
			get: function() {
				return i.CaptureApi
			}
		});
		var a = r(272);
		Object.defineProperty(t, "RecordApi", {
			enumerable: !0,
			get: function() {
				return a.RecordApi
			}
		});
		var o = r(271);
		Object.defineProperty(t, "Meeting4NRTCApi", {
			enumerable: !0,
			get: function() {
				return o.Meeting4NRTCApi
			}
		});
		var s = r(270);
		Object.defineProperty(t, "Meeting4WebRTCApi", {
			enumerable: !0,
			get: function() {
				return s.Meeting4WebRTCApi
			}
		});
		var c = r(269);
		Object.defineProperty(t, "P2P4WebRTCApi", {
			enumerable: !0,
			get: function() {
				return c.P2P4WebRTCApi
			}
		});
		var u = r(268);
		Object.defineProperty(t, "CommonApi", {
			enumerable: !0,
			get: function() {
				return u.CommonApi
			}
		});
		var d = r(267);
		Object.defineProperty(t, "PlayApi", {
			enumerable: !0,
			get: function() {
				return d.PlayApi
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.IMBusiness = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(45),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r._bindImEvent(), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "_isCurrentChannelId",
				value: function(e) {
					return this.adapterRef.channelId && this.adapterRef.channelId == e
				}
			}, {
				key: "resetWhenHangup",
				value: function() {
					this.adapterRef.instance._stopSession(), this.adapterRef.nim.protocol.setCurrentNetcall()
				}
			}, {
				key: "_initSession",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					this.adapterRef.sessionMode = c.SESSION_MODE.P2P;
					var r = this.adapterRef.isCaller ? this.adapterRef.callerInfo : t.beCalledInfo;
					this._parseAccountUidMap(r.accountUidMap), !r.account && r.uid && (r.account = this.adapterRef.instance._getAccountByUid(r.uid)), this.adapterRef.callAccepted = !0, this.adapterRef.instance._setSessionConfig({
						signalEndTime: Date.now()
					}), this.adapterRef.apiReportHelper.uploadDataApi("start", {
						uid: r.uid
					}), this.adapterRef.target.uid = this.adapterRef.instance._getUidByAccount(this.adapterRef.target.account);
					var n = {
						type: r.type,
						account: this.adapterRef.target && this.adapterRef.target.account || r.account,
						channelId: r.channelId
					};
					r.netcallType && (n.netcallType = r.netcallType), this.adapterRef.imInfo.target = this.target, setTimeout(function() {
						e.adapterRef.instance.setStartSessionTime(), e.adapterRef.instance.emit("callAccepted", n)
					}, 1)
				}
			}, {
				key: "_bindImEvent",
				value: function() {
					WEBRTCLOG.log("IMBusiness:_bindImEvent");
					var e = this.adapterRef.nim;
					e ? (e.on("beCalled", this._handleBeCalledEvent.bind(this)), e.on("notifyCalleeAck", this._hanldeNotifyCalleeAckEvent.bind(this)), e.on("notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.on("netcallControl", this._handleNetCallControlEvent.bind(this)), e.on("notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.on("notifyJoin", this._handleNotifyJoinEvent.bind(this))) : WEBRTCLOG.warn("IMBusiness:_bindImEvent 不存在nim实例...")
				}
			}, {
				key: "_unbindImEvent",
				value: function() {
					var e = this.adapterRef.nim;
					e ? (e.removeListener("beCalled", this._handleBeCalledEvent.bind(this)), e.removeListener("notifyCalleeAck", this._hanldeNotifyCalleeAckEvent.bind(this)), e.removeListener("notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.removeListener("netcallControl", this._handleNetCallControlEvent.bind(this)), e.removeListener("notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.removeListener("notifyJoin", this._handleNotifyJoinEvent.bind(this))) : WEBRTCLOG.warn("IMBusiness:_bindImEvent 不存在nim实例...")
				}
			}, {
				key: "_handleBeCalledEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleBeCalledEvent event=%o", e), this.adapterRef.signalInited = !0, this.adapterRef.channelId = e.channelId, this.adapterRef.beCalledInfo = e, this.adapterRef.imInfo || (this.adapterRef.imInfo = {}), this.adapterRef.imInfo.uid = e.uid, this.adapterRef.instance.emit("beCalling", e)
				}
			}, {
				key: "_hanldeNotifyCalleeAckEvent",
				value: function(e) {
					console.log("!!!!!new -> old", e.channelId, this.adapterRef.channelId), WEBRTCLOG.log("IMBusiness:_hanldeNotifyCalleeAckEvent event=%o", e);
					var t = e.account,
						r = e.type,
						n = e.accepted,
						i = e.channelId;
					if(this._isCurrentChannelId(i)) {
						var a = this.adapterRef.beCalledInfo || this.adapterRef.callerInfo;
						this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), n ? (WEBRTCLOG.log("对方已接收本次通话， channelId=%s", i), this.adapterRef.callAccepted = !0, this._initSession()) : (WEBRTCLOG.log("对方已拒绝本次通话， channelId=%s", i), this._packNetcallRecord({
							type: r,
							channelId: i,
							isCaller: !0,
							target: t,
							recordType: "netcallRejected"
						}), this.resetWhenHangup(), this.adapterRef.instance.emit("callRejected", {
							type: a.type,
							account: t
						}))
					} else WEBRTCLOG.warn("非当前频道ID的通话，直接忽略...")
				}
			}, {
				key: "_hanldeNotifyHangupEvent",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("IMBusiness:_hanldeNotifyHangupEvent event=%o", e);
					var r = e.channelId,
						n = e.account;
					this.adapterRef.channelId ? this.adapterRef.sessionMode == c.SESSION_MODE.P2P || this.adapterRef.beCalledInfo ? (this.adapterRef.apiReportHelper.uploadDataApi("send"), setTimeout(function() {
						WEBRTCLOG.log("主动挂断处理，1s后"), t.resetWhenHangup()
					}, 1e3), this.adapterRef.instance.setEndSessionTime(), this.adapterRef.instance.emit("hangup", {
						channelId: r,
						account: n,
						type: c.HANGUP_TYPE.HANGUP_TYPE_NORMAL
					})) : WEBRTCLOG.warn("非点对点会话模式...") : WEBRTCLOG.warn("未定义的channelId ... ")
				}
			}, {
				key: "_handleNetCallControlEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNetCallControlEvent event=%o", e);
					e.channelId, e.type;
					var t = {};
					t.channelId = e.channelId, t.type = e.type, t.command = e.type, e.account && (t.account = e.account), this.adapterRef.instance.emit("control", t)
				}
			}, {
				key: "_handleNotifyCalleeAckSyncEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNotifyCalleeAckSyncEvent event=%o", e);
					var t = e.timetag,
						r = e.channelId,
						n = e.type,
						i = e.accepted,
						a = e.fromClientType;
					this.adapterRef.instance.emit("callerAckSync", {
						timetag: t,
						channelId: r,
						type: n,
						accepted: i,
						fromClientType: a
					}), this._isCurrentChannelId(r) && this.resetWhenHangup()
				}
			}, {
				key: "_handleNotifyJoinEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNotifyJoinEvent event=%o", e);
					var t = e.accountUidMap;
					this._parseAccountUidMap(t);
					var r = this.adapterRef.needQueryAccountMap;
					for(var n in t) {
						var i = t[n];
						if(i in r) {
							var a = r[i];
							a.account = n, WEBRTCLOG.log("IMBusiness:_handleNotifyJoinEvent 需要反查映射表删除键 uid=%s, account=%s", i, n), delete r[i], this.adapterRef.instance.emit("joinChannel", a)
						}
					}
				}
			}, {
				key: "_packNetcallRecord",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:_packNetcallRecord options=%o", e);
					var t = e.recordType,
						r = e.type || this.adapterRef.type,
						n = e.channelId || this.adapterRef.channelId,
						i = e.duration || 0,
						a = e.isCaller || this.adapterRef.isCaller,
						o = e.target || this.adapterRef.target.account,
						c = this.adapterRef.nim && this.adapterRef.nim.account,
						u = a ? c : o,
						d = a ? o : c,
						l = +new Date;
					this.adapterRef.nim.protocol.onMsg({
						content: {
							msg: {
								attach: JSON.stringify({
									data: {
										calltype: r,
										channel: n,
										duration: i,
										ids: [c, o],
										time: l
									},
									id: t
								}),
								from: u,
								fromClientType: a ? 16 : 0,
								fromDeviceId: "",
								fromNick: "",
								idClient: s.tool.guid(),
								idServer: s.tool.guid(),
								scene: 0,
								time: l,
								to: d,
								type: 5
							}
						}
					})
				}
			}, {
				key: "_parseAccountUidMap",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("IMBusiness:_parseAccountUidMap 解析点对点映射表..."), Object.keys(e).forEach(function(r) {
						t._addAccountUidMap({
							account: r,
							uid: e[r]
						})
					})
				}
			}, {
				key: "_addAccountUidMap",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_addAccountUidMap 追加正反向映射表...");
					var t = e.account,
						r = e.uid;
					this._addUid4AccountMap(t, r), this._addAccount4UidMap(t, r)
				}
			}, {
				key: "_addUid4AccountMap",
				value: function(e, t) {
					WEBRTCLOG.log("IMBusiness:_addUid4AccountMap uid -> account 映射表..."), this.adapterRef.uid4AccountMap || (WEBRTCLOG.log("初始化uid4AccountMap ={} "), this.adapterRef.uid4AccountMap = {}), this.adapterRef.uid4AccountMap[t] = e
				}
			}, {
				key: "_addAccount4UidMap",
				value: function(e, t) {
					WEBRTCLOG.log("IMBusiness:_addAccount4UidMap uid -> account 映射表..."), this.adapterRef.account4UidMap || (WEBRTCLOG.log("初始化account4UidMap ={} "), this.adapterRef.account4UidMap = {}), this.adapterRef.account4UidMap[e] = t
				}
			}, {
				key: "initNetcall",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:initNetcall options=%o", e);
					var t = this,
						r = e.type,
						n = e.pushConfig;
					return this.adapterRef.type = r, this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.nim.initNetcall({
						type: r,
						accounts: [this.adapterRef.callee],
						pushConfig: n,
						webrtcEnable: !0
					}).then(function(e) {
						WEBRTCLOG.log("IMBusiness:initNetcall response=%o", e), t.adapterRef.signalInited = !0, t.adapterRef.sessionMode = c.SESSION_MODE.P2P, t.adapterRef.callerInfo = Object.assign({}, e), t.adapterRef.channelId = e.channelId, t.adapterRef.imInfo = t.adapterRef.callerInfo, t.adapterRef.imInfo.sessionMode = t.adapterRef.sessionMode, t.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER
					}).catch(function(e) {
						return WEBRTCLOG.error("IMBusiness:initNetcall error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), t.resetWhenHangup(), Promise.reject(e)
					})
				}
			}, {
				key: "baseResponse",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:baseResponse options=%o", t);
					var r = t.fn || "calleeAck",
						n = t.beCalledInfo || this.adapterRef.beCalledInfo,
						i = n.accepted = 0 != t.accepted;
					return i ? (this.adapterRef.sessionMode = c.SESSION_MODE.P2P, this.adapterRef.type = n.type, this.adapterRef.channelId = n.channelId, this.adapterRef.target.account = n.account, this.adapterRef.calling = !0, this.adapterRef.imInfo = n, this.adapterRef.imInfo.sessionMode = this.adapterRef.sessionMode, this.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					})) : this._packNetcallRecord({
						type: n.type,
						channelId: n.channelId,
						isCaller: !1,
						target: n.account,
						recordType: "rejectNetcall"
					}), this.adapterRef.nim[r](n).then(function() {
						WEBRTCLOG.log("IMBusiness:baseResponse success"), i && (t.sessionConfig && e.adapterRef.instance._setSessionConfig(t.sessionConfig), e.adapterRefbeCalledInfo = n, e._initSession({
							beCalledInfo: n
						}))
					}, function(e) {
						throw WEBRTCLOG.error("IMBusiness:baseResponse error=%o", e), e
					})
				}
			}, {
				key: "baseHangup",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:baseHandup options=%o", e), this.adapterRef.apiReportHelper.uploadDataApi("send");
					var t = e.channelId,
						r = e.recordType;
					if(!t && this.adapterRef.calling && this.adapterRef.channelId && (t = this.adapterRef.channelId), console.log("===== baseHangup", e, t), t) {
						var n = e.fn || "hangup";
						this.adapterRef.nim[n]({
							channelId: t
						})
					}
					t === this.adapterRef.channelId && (this.adapterRef.isCaller && !this.adapterRef.callAccepted && this._packNetcallRecord({
						recordType: r
					}), this.resetWhenHangup())
				}
			}, {
				key: "baseControl",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					if(WEBRTCLOG.log("IMBusiness:baseControl options=%o", e), e.channelId = e.channelId || this.adapterRef.channelId, e.command && e.channelId) {
						this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "call_control_type"
						});
						var t = e.fn || "netcallControl";
						return e.type = e.command, this.adapterRef.nim[t](e).catch(function(e) {
							WEBRTCLOG.error("IMBusiness:baseControl error=%o", e)
						})
					}
				}
			}, {
				key: "baseCreateChannel",
				value: function(e) {
					var t = this,
						r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return s.tool.verifyOptions(r, "channelName"), r.custom = r.custom || "", this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.nim[e](r).then(function(e) {
						return WEBRTCLOG.log("IMBusiness:baseCreateChannel success=%o", e), Promise.resolve(e)
					}).catch(function(e) {
						return WEBRTCLOG.error("IMBusiness:baseCreateChannel error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "baseJoinChannel",
				value: function(e) {
					var t = this,
						r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return this.adapterRef.nim[e](r).then(function(e) {
						return t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), t.adapterRef.signalInited = !0, t.adapterRef.sessionMode = e.sessionMode = "meeting", t._parseAccountUidMap(e.accountUidMap), e.uid = t.adapterRef.instance._getUidByAccount(t.adapterRef.nim.account), Promise.resolve(e)
					}).catch(function(e) {
						return t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "hangup",
				value: function() {
					this.adapterRef.instance._stopSession(), null != this.adapterRef.userJoinTimeoutId && (clearTimeout(this.adapterRef.userJoinTimeoutId), this.adapterRef.userJoinTimeoutId = null), this.adapterRef.instance._resetStatus()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("IMBusiness:destroy"), this._unbindImEvent()
				}
			}]), t
		}(r(122).AbstractBusiness);
		t.IMBusiness = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCBuilder = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = r(181),
			o = r(180),
			s = r(179),
			c = r(178);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function() {
			function e(t) {
				(0, n.default)(this, e);
				var r = t.imInfo,
					i = t.targetUid,
					a = t.platformName,
					o = t.platformVersion,
					s = t.adapterRef;
				this.webrtcInstance = null, this.adapterRef = s, this.imInfo = r, this.targetUid = i, this.platformName = a, this.platformVersion = o
			}
			return(0, i.default)(e, [{
				key: "getVersion4User",
				value: function() {
					return this.platformVersion.split(".")[0]
				}
			}, {
				key: "build",
				value: function() {
					var e = this.platformName.toLowerCase(),
						t = this.getVersion4User(),
						r = (0, a.isMatchVersion)(e, t),
						n = (0, a.maxVersion)(e);
					switch(this.platformName) {
						case "Chrome":
							this.webrtcInstance = this.buildChrome4DefinedVersion(r ? t : n);
							break;
						case "Firefox":
							this.webrtcInstance = this.buildFirefox4DefinedVersion(r ? t : n);
							break;
						case "Safari":
							this.webrtcInstance = this.buildSafari4DefinedVersion(r ? t : n);
							break;
						default:
							this.webrtcInstance = null
					}
					return this.webrtcInstance
				}
			}, {
				key: "buildChrome4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "65":
						default:
							t = this.createChromeReleaseInstance()
					}
					return t
				}
			}, {
				key: "buildFirefox4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "59":
						default:
							t = this.createFirefoxReleaseInstance()
					}
					return t
				}
			}, {
				key: "buildSafari4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "11":
						default:
							t = this.createSafariReleaseInstance()
					}
					return t
				}
			}, {
				key: "createChromeReleaseInstance",
				value: function() {
					return new o.WebRTC4ChromeRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}, {
				key: "createFirefoxReleaseInstance",
				value: function() {
					return new s.WebRTC4FirefoxRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}, {
				key: "createSafariReleaseInstance",
				value: function() {
					return new c.WebRTC4SafariRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}]), e
		}();
		t.WebRTCBuilder = d
	}, function(e, t, r) {
		"use strict";
		var n = {
			generateIdentifier: function() {
				return Math.random().toString(36).substr(2, 10)
			}
		};
		n.localCName = n.generateIdentifier(), n.splitLines = function(e) {
			return e.trim().split("\n").map(function(e) {
				return e.trim()
			})
		}, n.splitSections = function(e) {
			return e.split("\nm=").map(function(e, t) {
				return(t > 0 ? "m=" + e : e).trim() + "\r\n"
			})
		}, n.getDescription = function(e) {
			var t = n.splitSections(e);
			return t && t[0]
		}, n.getMediaSections = function(e) {
			var t = n.splitSections(e);
			return t.shift(), t
		}, n.matchPrefix = function(e, t) {
			return n.splitLines(e).filter(function(e) {
				return 0 === e.indexOf(t)
			})
		}, n.parseCandidate = function(e) {
			for(var t, r = {
					foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
					component: parseInt(t[1], 10),
					protocol: t[2].toLowerCase(),
					priority: parseInt(t[3], 10),
					ip: t[4],
					port: parseInt(t[5], 10),
					type: t[7]
				}, n = 8; n < t.length; n += 2) switch(t[n]) {
				case "raddr":
					r.relatedAddress = t[n + 1];
					break;
				case "rport":
					r.relatedPort = parseInt(t[n + 1], 10);
					break;
				case "tcptype":
					r.tcpType = t[n + 1];
					break;
				case "ufrag":
					r.ufrag = t[n + 1], r.usernameFragment = t[n + 1];
					break;
				default:
					r[t[n]] = t[n + 1]
			}
			return r
		}, n.writeCandidate = function(e) {
			var t = [];
			t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
			var r = e.type;
			return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
		}, n.parseIceOptions = function(e) {
			return e.substr(14).split(" ")
		}, n.parseRtpMap = function(e) {
			var t = e.substr(9).split(" "),
				r = {
					payloadType: parseInt(t.shift(), 10)
				};
			return t = t[0].split("/"), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.channels = 3 === t.length ? parseInt(t[2], 10) : 1, r.numChannels = r.channels, r
		}, n.writeRtpMap = function(e) {
			var t = e.payloadType;
			void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
			var r = e.channels || e.numChannels || 1;
			return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== r ? "/" + r : "") + "\r\n"
		}, n.parseExtmap = function(e) {
			var t = e.substr(9).split(" ");
			return {
				id: parseInt(t[0], 10),
				direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
				uri: t[1]
			}
		}, n.writeExtmap = function(e) {
			return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
		}, n.parseFmtp = function(e) {
			for(var t, r = {}, n = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < n.length; i++) r[(t = n[i].trim().split("="))[0].trim()] = t[1];
			return r
		}, n.writeFmtp = function(e) {
			var t = "",
				r = e.payloadType;
			if(void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
				var n = [];
				Object.keys(e.parameters).forEach(function(t) {
					e.parameters[t] ? n.push(t + "=" + e.parameters[t]) : n.push(t)
				}), t += "a=fmtp:" + r + " " + n.join(";") + "\r\n"
			}
			return t
		}, n.parseRtcpFb = function(e) {
			var t = e.substr(e.indexOf(" ") + 1).split(" ");
			return {
				type: t.shift(),
				parameter: t.join(" ")
			}
		}, n.writeRtcpFb = function(e) {
			var t = "",
				r = e.payloadType;
			return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
				t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
			}), t
		}, n.parseSsrcMedia = function(e) {
			var t = e.indexOf(" "),
				r = {
					ssrc: parseInt(e.substr(7, t - 7), 10)
				},
				n = e.indexOf(":", t);
			return n > -1 ? (r.attribute = e.substr(t + 1, n - t - 1), r.value = e.substr(n + 1)) : r.attribute = e.substr(t + 1), r
		}, n.parseSsrcGroup = function(e) {
			var t = e.substr(13).split(" ");
			return {
				semantics: t.shift(),
				ssrcs: t.map(function(e) {
					return parseInt(e, 10)
				})
			}
		}, n.getMid = function(e) {
			var t = n.matchPrefix(e, "a=mid:")[0];
			if(t) return t.substr(6)
		}, n.parseFingerprint = function(e) {
			var t = e.substr(14).split(" ");
			return {
				algorithm: t[0].toLowerCase(),
				value: t[1]
			}
		}, n.getDtlsParameters = function(e, t) {
			return {
				role: "auto",
				fingerprints: n.matchPrefix(e + t, "a=fingerprint:").map(n.parseFingerprint)
			}
		}, n.writeDtlsParameters = function(e, t) {
			var r = "a=setup:" + t + "\r\n";
			return e.fingerprints.forEach(function(e) {
				r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
			}), r
		}, n.getIceParameters = function(e, t) {
			var r = n.splitLines(e);
			return {
				usernameFragment: (r = r.concat(n.splitLines(t))).filter(function(e) {
					return 0 === e.indexOf("a=ice-ufrag:")
				})[0].substr(12),
				password: r.filter(function(e) {
					return 0 === e.indexOf("a=ice-pwd:")
				})[0].substr(10)
			}
		}, n.writeIceParameters = function(e) {
			return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
		}, n.parseRtpParameters = function(e) {
			for(var t = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: [],
					rtcp: []
				}, r = n.splitLines(e)[0].split(" "), i = 3; i < r.length; i++) {
				var a = r[i],
					o = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
				if(o) {
					var s = n.parseRtpMap(o),
						c = n.matchPrefix(e, "a=fmtp:" + a + " ");
					switch(s.parameters = c.length ? n.parseFmtp(c[0]) : {}, s.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(n.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
						case "RED":
						case "ULPFEC":
							t.fecMechanisms.push(s.name.toUpperCase())
					}
				}
			}
			return n.matchPrefix(e, "a=extmap:").forEach(function(e) {
				t.headerExtensions.push(n.parseExtmap(e))
			}), t
		}, n.writeRtpDescription = function(e, t) {
			var r = "";
			r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(function(e) {
				return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
			}).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
				r += n.writeRtpMap(e), r += n.writeFmtp(e), r += n.writeRtcpFb(e)
			});
			var i = 0;
			return t.codecs.forEach(function(e) {
				e.maxptime > i && (i = e.maxptime)
			}), i > 0 && (r += "a=maxptime:" + i + "\r\n"), r += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e) {
				r += n.writeExtmap(e)
			}), r
		}, n.parseRtpEncodingParameters = function(e) {
			var t, r = [],
				i = n.parseRtpParameters(e),
				a = -1 !== i.fecMechanisms.indexOf("RED"),
				o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
				s = n.matchPrefix(e, "a=ssrc:").map(function(e) {
					return n.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				}),
				c = s.length > 0 && s[0].ssrc,
				u = n.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
					return e.substr(17).split(" ").map(function(e) {
						return parseInt(e, 10)
					})
				});
			u.length > 0 && u[0].length > 1 && u[0][0] === c && (t = u[0][1]), i.codecs.forEach(function(e) {
				if("RTX" === e.name.toUpperCase() && e.parameters.apt) {
					var n = {
						ssrc: c,
						codecPayloadType: parseInt(e.parameters.apt, 10)
					};
					c && t && (n.rtx = {
						ssrc: t
					}), r.push(n), a && ((n = JSON.parse(JSON.stringify(n))).fec = {
						ssrc: t,
						mechanism: o ? "red+ulpfec" : "red"
					}, r.push(n))
				}
			}), 0 === r.length && c && r.push({
				ssrc: c
			});
			var d = n.matchPrefix(e, "b=");
			return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
				e.maxBitrate = d
			})), r
		}, n.parseRtcpParameters = function(e) {
			var t = {},
				r = n.matchPrefix(e, "a=ssrc:").map(function(e) {
					return n.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				})[0];
			r && (t.cname = r.value, t.ssrc = r.ssrc);
			var i = n.matchPrefix(e, "a=rtcp-rsize");
			t.reducedSize = i.length > 0, t.compound = 0 === i.length;
			var a = n.matchPrefix(e, "a=rtcp-mux");
			return t.mux = a.length > 0, t
		}, n.parseMsid = function(e) {
			var t, r = n.matchPrefix(e, "a=msid:");
			if(1 === r.length) return {
				stream: (t = r[0].substr(7).split(" "))[0],
				track: t[1]
			};
			var i = n.matchPrefix(e, "a=ssrc:").map(function(e) {
				return n.parseSsrcMedia(e)
			}).filter(function(e) {
				return "msid" === e.attribute
			});
			return i.length > 0 ? {
				stream: (t = i[0].value.split(" "))[0],
				track: t[1]
			} : void 0
		}, n.generateSessionId = function() {
			return Math.random().toString().substr(2, 21)
		}, n.writeSessionBoilerplate = function(e, t) {
			var r = void 0 !== t ? t : 2;
			return "v=0\r\no=thisisadapterortc " + (e || n.generateSessionId()) + " " + r + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
		}, n.writeMediaSection = function(e, t, r, i) {
			var a = n.writeRtpDescription(e.kind, t);
			if(a += n.writeIceParameters(e.iceGatherer.getLocalParameters()), a += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ? a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ? a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
				var o = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
				a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"), a
		}, n.getDirection = function(e, t) {
			for(var r = n.splitLines(e), i = 0; i < r.length; i++) switch(r[i]) {
				case "a=sendrecv":
				case "a=sendonly":
				case "a=recvonly":
				case "a=inactive":
					return r[i].substr(2)
			}
			return t ? n.getDirection(t) : "sendrecv"
		}, n.getKind = function(e) {
			return n.splitLines(e)[0].split(" ")[0].substr(2)
		}, n.isRejected = function(e) {
			return "0" === e.split(" ", 2)[1]
		}, n.parseMLine = function(e) {
			var t = n.splitLines(e)[0].substr(2).split(" ");
			return {
				kind: t[0],
				port: parseInt(t[1], 10),
				protocol: t[2],
				fmt: t.slice(3).join(" ")
			}
		}, n.parseOLine = function(e) {
			var t = n.matchPrefix(e, "o=")[0].substr(2).split(" ");
			return {
				username: t[0],
				sessionId: t[1],
				sessionVersion: parseInt(t[2], 10),
				netType: t[3],
				addressType: t[4],
				address: t[5]
			}
		}, n.isValidSDP = function(e) {
			if("string" != typeof e || 0 === e.length) return !1;
			for(var t = n.splitLines(e), r = 0; r < t.length; r++)
				if(t[r].length < 2 || "=" !== t[r].charAt(1)) return !1;
			return !0
		}, e.exports = n
	}, function(e, t, r) {
		"use strict";
		var n = r(278),
			i = r(68);
		e.exports = {
			shimRTCIceCandidate: function(e) {
				if(!(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
					var t = e.RTCIceCandidate;
					e.RTCIceCandidate = function(e) {
							"object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2));
							var r = new t(e),
								i = n.parseCandidate(e.candidate),
								a = Object.assign(r, i);
							return a.toJSON = function() {
								return {
									candidate: a.candidate,
									sdpMid: a.sdpMid,
									sdpMLineIndex: a.sdpMLineIndex,
									usernameFragment: a.usernameFragment
								}
							}, a
						},
						function(e, t, r) {
							if(e.RTCPeerConnection) {
								var n = e.RTCPeerConnection.prototype,
									i = n.addEventListener;
								n.addEventListener = function(e, n) {
									if(e !== t) return i.apply(this, arguments);
									var a = function(e) {
										n(r(e))
									};
									return this._eventMap = this._eventMap || {}, this._eventMap[n] = a, i.apply(this, [e, a])
								};
								var a = n.removeEventListener;
								n.removeEventListener = function(e, r) {
									if(e !== t || !this._eventMap || !this._eventMap[r]) return a.apply(this, arguments);
									var n = this._eventMap[r];
									return delete this._eventMap[r], a.apply(this, [e, n])
								}, Object.defineProperty(n, "on" + t, {
									get: function() {
										return this["_on" + t]
									},
									set: function(e) {
										this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
									}
								})
							}
						}(e, "icecandidate", function(t) {
							return t.candidate && Object.defineProperty(t, "candidate", {
								value: new e.RTCIceCandidate(t.candidate),
								writable: "false"
							}), t
						})
				}
			},
			shimCreateObjectURL: function(e) {
				var t = e && e.URL;
				if("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL && t.revokeObjectURL) {
					var r = t.createObjectURL.bind(t),
						n = t.revokeObjectURL.bind(t),
						a = new Map,
						o = 0;
					t.createObjectURL = function(e) {
						if("getTracks" in e) {
							var t = "polyblob:" + ++o;
							return a.set(t, e), i.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"), t
						}
						return r(e)
					}, t.revokeObjectURL = function(e) {
						n(e), a.delete(e)
					};
					var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
					Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
						get: function() {
							return s.get.apply(this)
						},
						set: function(e) {
							return this.srcObject = a.get(e) || null, s.set.apply(this, [e])
						}
					});
					var c = e.HTMLMediaElement.prototype.setAttribute;
					e.HTMLMediaElement.prototype.setAttribute = function() {
						return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = a.get(arguments[1]) || null), c.apply(this, arguments)
					}
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = {
				shimLocalStreamsAPI: function(e) {
					if("object" == typeof e && e.RTCPeerConnection) {
						if("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
								return this._localStreams || (this._localStreams = []), this._localStreams
							}), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById = function(e) {
								var t = null;
								return this._localStreams && this._localStreams.forEach(function(r) {
									r.id === e && (t = r)
								}), this._remoteStreams && this._remoteStreams.forEach(function(r) {
									r.id === e && (t = r)
								}), t
							}), !("addStream" in e.RTCPeerConnection.prototype)) {
							var t = e.RTCPeerConnection.prototype.addTrack;
							e.RTCPeerConnection.prototype.addStream = function(e) {
								this._localStreams || (this._localStreams = []), -1 === this._localStreams.indexOf(e) && this._localStreams.push(e);
								var r = this;
								e.getTracks().forEach(function(n) {
									t.call(r, n, e)
								})
							}, e.RTCPeerConnection.prototype.addTrack = function(e, r) {
								return r && (this._localStreams ? -1 === this._localStreams.indexOf(r) && this._localStreams.push(r) : this._localStreams = [r]), t.call(this, e, r)
							}
						}
						"removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
							this._localStreams || (this._localStreams = []);
							var t = this._localStreams.indexOf(e);
							if(-1 !== t) {
								this._localStreams.splice(t, 1);
								var r = this,
									n = e.getTracks();
								this.getSenders().forEach(function(e) {
									-1 !== n.indexOf(e.track) && r.removeTrack(e)
								})
							}
						})
					}
				},
				shimRemoteStreamsAPI: function(e) {
					"object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
						return this._remoteStreams ? this._remoteStreams : []
					}), "onaddstream" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
						get: function() {
							return this._onaddstream
						},
						set: function(e) {
							this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function(e) {
								var t = e.streams[0];
								if(this._remoteStreams || (this._remoteStreams = []), !(this._remoteStreams.indexOf(t) >= 0)) {
									this._remoteStreams.push(t);
									var r = new Event("addstream");
									r.stream = e.streams[0], this.dispatchEvent(r)
								}
							}.bind(this))
						}
					}))
				},
				shimCallbacksAPI: function(e) {
					if("object" == typeof e && e.RTCPeerConnection) {
						var t = e.RTCPeerConnection.prototype,
							r = t.createOffer,
							n = t.createAnswer,
							i = t.setLocalDescription,
							a = t.setRemoteDescription,
							o = t.addIceCandidate;
						t.createOffer = function(e, t) {
							var n = arguments.length >= 2 ? arguments[2] : arguments[0],
								i = r.apply(this, [n]);
							return t ? (i.then(e, t), Promise.resolve()) : i
						}, t.createAnswer = function(e, t) {
							var r = arguments.length >= 2 ? arguments[2] : arguments[0],
								i = n.apply(this, [r]);
							return t ? (i.then(e, t), Promise.resolve()) : i
						};
						var s = function(e, t, r) {
							var n = i.apply(this, [e]);
							return r ? (n.then(t, r), Promise.resolve()) : n
						};
						t.setLocalDescription = s, s = function(e, t, r) {
							var n = a.apply(this, [e]);
							return r ? (n.then(t, r), Promise.resolve()) : n
						}, t.setRemoteDescription = s, s = function(e, t, r) {
							var n = o.apply(this, [e]);
							return r ? (n.then(t, r), Promise.resolve()) : n
						}, t.addIceCandidate = s
					}
				},
				shimGetUserMedia: function(e) {
					var t = e && e.navigator;
					t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, r, n) {
						t.mediaDevices.getUserMedia(e).then(r, n)
					}.bind(t)))
				},
				shimRTCIceServerUrls: function(e) {
					var t = e.RTCPeerConnection;
					e.RTCPeerConnection = function(e, r) {
						if(e && e.iceServers) {
							for(var i = [], a = 0; a < e.iceServers.length; a++) {
								var o = e.iceServers[a];
								!o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (n.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, delete o.url, i.push(o)) : i.push(e.iceServers[a])
							}
							e.iceServers = i
						}
						return new t(e, r)
					}, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
						get: function() {
							return t.generateCertificate
						}
					})
				},
				shimTrackEventTransceiver: function(e) {
					"object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
						get: function() {
							return {
								receiver: this.receiver
							}
						}
					})
				},
				shimCreateOfferLegacy: function(e) {
					var t = e.RTCPeerConnection.prototype.createOffer;
					e.RTCPeerConnection.prototype.createOffer = function(e) {
						var r = this;
						if(e) {
							var n = r.getTransceivers().find(function(e) {
								return e.sender.track && "audio" === e.sender.track.kind
							});
							!1 === e.offerToReceiveAudio && n ? "sendrecv" === n.direction ? n.setDirection("sendonly") : "recvonly" === n.direction && n.setDirection("inactive") : !0 !== e.offerToReceiveAudio || n || r.addTransceiver("audio");
							var i = r.getTransceivers().find(function(e) {
								return e.sender.track && "video" === e.sender.track.kind
							});
							!1 === e.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") : "recvonly" === i.direction && i.setDirection("inactive") : !0 !== e.offerToReceiveVideo || i || r.addTransceiver("video")
						}
						return t.apply(r, arguments)
					}
				}
			};
		e.exports = {
			shimCallbacksAPI: i.shimCallbacksAPI,
			shimLocalStreamsAPI: i.shimLocalStreamsAPI,
			shimRemoteStreamsAPI: i.shimRemoteStreamsAPI,
			shimGetUserMedia: i.shimGetUserMedia,
			shimRTCIceServerUrls: i.shimRTCIceServerUrls,
			shimTrackEventTransceiver: i.shimTrackEventTransceiver,
			shimCreateOfferLegacy: i.shimCreateOfferLegacy
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = n.log;
		e.exports = function(e) {
			var t = n.detectBrowser(e),
				r = e && e.navigator,
				a = e && e.MediaStreamTrack,
				o = function(e) {
					return {
						name: {
							InternalError: "NotReadableError",
							NotSupportedError: "TypeError",
							PermissionDeniedError: "NotAllowedError",
							SecurityError: "NotAllowedError"
						}[e.name] || e.name,
						message: {
							"The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
						}[e.message] || e.message,
						constraint: e.constraint,
						toString: function() {
							return this.name + (this.message && ": ") + this.message
						}
					}
				},
				s = function(e, n, a) {
					var s = function(e) {
						if("object" != typeof e || e.require) return e;
						var t = [];
						return Object.keys(e).forEach(function(r) {
							if("require" !== r && "advanced" !== r && "mediaSource" !== r) {
								var n = e[r] = "object" == typeof e[r] ? e[r] : {
									ideal: e[r]
								};
								if(void 0 === n.min && void 0 === n.max && void 0 === n.exact || t.push(r), void 0 !== n.exact && ("number" == typeof n.exact ? n.min = n.max = n.exact : e[r] = n.exact, delete n.exact), void 0 !== n.ideal) {
									e.advanced = e.advanced || [];
									var i = {};
									"number" == typeof n.ideal ? i[r] = {
										min: n.ideal,
										max: n.ideal
									} : i[r] = n.ideal, e.advanced.push(i), delete n.ideal, Object.keys(n).length || delete e[r]
								}
							}
						}), t.length && (e.require = t), e
					};
					return e = JSON.parse(JSON.stringify(e)), t.version < 38 && (i("spec: " + JSON.stringify(e)), e.audio && (e.audio = s(e.audio)), e.video && (e.video = s(e.video)), i("ff37: " + JSON.stringify(e))), r.mozGetUserMedia(e, n, function(e) {
						a(o(e))
					})
				};
			if(r.mediaDevices || (r.mediaDevices = {
					getUserMedia: function(e) {
						return new Promise(function(t, r) {
							s(e, t, r)
						})
					},
					addEventListener: function() {},
					removeEventListener: function() {}
				}), r.mediaDevices.enumerateDevices = r.mediaDevices.enumerateDevices || function() {
					return new Promise(function(e) {
						e([{
							kind: "audioinput",
							deviceId: "default",
							label: "",
							groupId: ""
						}, {
							kind: "videoinput",
							deviceId: "default",
							label: "",
							groupId: ""
						}])
					})
				}, t.version < 41) {
				var c = r.mediaDevices.enumerateDevices.bind(r.mediaDevices);
				r.mediaDevices.enumerateDevices = function() {
					return c().then(void 0, function(e) {
						if("NotFoundError" === e.name) return [];
						throw e
					})
				}
			}
			if(t.version < 49) {
				var u = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
				r.mediaDevices.getUserMedia = function(e) {
					return u(e).then(function(t) {
						if(e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
							e.stop()
						}), new DOMException("The object can not be found here.", "NotFoundError");
						return t
					}, function(e) {
						return Promise.reject(o(e))
					})
				}
			}
			if(!(t.version > 55 && "autoGainControl" in r.mediaDevices.getSupportedConstraints())) {
				var d = function(e, t, r) {
						t in e && !(r in e) && (e[r] = e[t], delete e[t])
					},
					l = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
				if(r.mediaDevices.getUserMedia = function(e) {
						return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)), d(e.audio, "autoGainControl", "mozAutoGainControl"), d(e.audio, "noiseSuppression", "mozNoiseSuppression")), l(e)
					}, a && a.prototype.getSettings) {
					var f = a.prototype.getSettings;
					a.prototype.getSettings = function() {
						var e = f.apply(this, arguments);
						return d(e, "mozAutoGainControl", "autoGainControl"), d(e, "mozNoiseSuppression", "noiseSuppression"), e
					}
				}
				if(a && a.prototype.applyConstraints) {
					var p = a.prototype.applyConstraints;
					a.prototype.applyConstraints = function(e) {
						return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), d(e, "autoGainControl", "mozAutoGainControl"), d(e, "noiseSuppression", "mozNoiseSuppression")), p.apply(this, [e])
					}
				}
			}
			r.getUserMedia = function(e, i, a) {
				if(t.version < 44) return s(e, i, a);
				n.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), r.mediaDevices.getUserMedia(e).then(i, a)
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = {
				shimOnTrack: function(e) {
					"object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
						get: function() {
							return this._ontrack
						},
						set: function(e) {
							this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function(e) {
								e.stream.getTracks().forEach(function(t) {
									var r = new Event("track");
									r.track = t, r.receiver = {
										track: t
									}, r.transceiver = {
										receiver: r.receiver
									}, r.streams = [e.stream], this.dispatchEvent(r)
								}.bind(this))
							}.bind(this))
						}
					}), "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
						get: function() {
							return {
								receiver: this.receiver
							}
						}
					})
				},
				shimSourceObject: function(e) {
					"object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
						get: function() {
							return this.mozSrcObject
						},
						set: function(e) {
							this.mozSrcObject = e
						}
					}))
				},
				shimPeerConnection: function(e) {
					var t = n.detectBrowser(e);
					if("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
						e.RTCPeerConnection || (e.RTCPeerConnection = function(r, n) {
							if(t.version < 38 && r && r.iceServers) {
								for(var i = [], a = 0; a < r.iceServers.length; a++) {
									var o = r.iceServers[a];
									if(o.hasOwnProperty("urls"))
										for(var s = 0; s < o.urls.length; s++) {
											var c = {
												url: o.urls[s]
											};
											0 === o.urls[s].indexOf("turn") && (c.username = o.username, c.credential = o.credential), i.push(c)
										} else i.push(r.iceServers[a])
								}
								r.iceServers = i
							}
							return new e.mozRTCPeerConnection(r, n)
						}, e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
							get: function() {
								return e.mozRTCPeerConnection.generateCertificate
							}
						}), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
							var r = e.RTCPeerConnection.prototype[t];
							e.RTCPeerConnection.prototype[t] = function() {
								return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments)
							}
						});
						var r = e.RTCPeerConnection.prototype.addIceCandidate;
						e.RTCPeerConnection.prototype.addIceCandidate = function() {
							return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
						};
						var i = {
								inboundrtp: "inbound-rtp",
								outboundrtp: "outbound-rtp",
								candidatepair: "candidate-pair",
								localcandidate: "local-candidate",
								remotecandidate: "remote-candidate"
							},
							a = e.RTCPeerConnection.prototype.getStats;
						e.RTCPeerConnection.prototype.getStats = function(e, r, n) {
							return a.apply(this, [e || null]).then(function(e) {
								if(t.version < 48 && (e = function(e) {
										var t = new Map;
										return Object.keys(e).forEach(function(r) {
											t.set(r, e[r]), t[r] = e[r]
										}), t
									}(e)), t.version < 53 && !r) try {
									e.forEach(function(e) {
										e.type = i[e.type] || e.type
									})
								} catch(t) {
									if("TypeError" !== t.name) throw t;
									e.forEach(function(t, r) {
										e.set(r, Object.assign({}, t, {
											type: i[t.type] || t.type
										}))
									})
								}
								return e
							}).then(r, n)
						}
					}
				},
				shimRemoveStream: function(e) {
					!e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
						var t = this;
						n.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(r) {
							r.track && -1 !== e.getTracks().indexOf(r.track) && t.removeTrack(r)
						})
					})
				}
			};
		e.exports = {
			shimOnTrack: i.shimOnTrack,
			shimSourceObject: i.shimSourceObject,
			shimPeerConnection: i.shimPeerConnection,
			shimRemoveStream: i.shimRemoveStream,
			shimGetUserMedia: r(281)
		}
	}, function(e, t, r) {
		"use strict";
		e.exports = function(e) {
			var t = e && e.navigator,
				r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
			t.mediaDevices.getUserMedia = function(e) {
				return r(e).catch(function(e) {
					return Promise.reject(function(e) {
						return {
							name: {
								PermissionDeniedError: "NotAllowedError"
							}[e.name] || e.name,
							message: e.message,
							constraint: e.constraint,
							toString: function() {
								return this.name
							}
						}
					}(e))
				})
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = {
			generateIdentifier: function() {
				return Math.random().toString(36).substr(2, 10)
			}
		};
		n.localCName = n.generateIdentifier(), n.splitLines = function(e) {
			return e.trim().split("\n").map(function(e) {
				return e.trim()
			})
		}, n.splitSections = function(e) {
			return e.split("\nm=").map(function(e, t) {
				return(t > 0 ? "m=" + e : e).trim() + "\r\n"
			})
		}, n.getDescription = function(e) {
			var t = n.splitSections(e);
			return t && t[0]
		}, n.getMediaSections = function(e) {
			var t = n.splitSections(e);
			return t.shift(), t
		}, n.matchPrefix = function(e, t) {
			return n.splitLines(e).filter(function(e) {
				return 0 === e.indexOf(t)
			})
		}, n.parseCandidate = function(e) {
			for(var t, r = {
					foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
					component: parseInt(t[1], 10),
					protocol: t[2].toLowerCase(),
					priority: parseInt(t[3], 10),
					ip: t[4],
					port: parseInt(t[5], 10),
					type: t[7]
				}, n = 8; n < t.length; n += 2) switch(t[n]) {
				case "raddr":
					r.relatedAddress = t[n + 1];
					break;
				case "rport":
					r.relatedPort = parseInt(t[n + 1], 10);
					break;
				case "tcptype":
					r.tcpType = t[n + 1];
					break;
				case "ufrag":
					r.ufrag = t[n + 1], r.usernameFragment = t[n + 1];
					break;
				default:
					r[t[n]] = t[n + 1]
			}
			return r
		}, n.writeCandidate = function(e) {
			var t = [];
			t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
			var r = e.type;
			return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
		}, n.parseIceOptions = function(e) {
			return e.substr(14).split(" ")
		}, n.parseRtpMap = function(e) {
			var t = e.substr(9).split(" "),
				r = {
					payloadType: parseInt(t.shift(), 10)
				};
			return t = t[0].split("/"), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, r
		}, n.writeRtpMap = function(e) {
			var t = e.payloadType;
			return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
		}, n.parseExtmap = function(e) {
			var t = e.substr(9).split(" ");
			return {
				id: parseInt(t[0], 10),
				direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
				uri: t[1]
			}
		}, n.writeExtmap = function(e) {
			return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
		}, n.parseFmtp = function(e) {
			for(var t, r = {}, n = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < n.length; i++) r[(t = n[i].trim().split("="))[0].trim()] = t[1];
			return r
		}, n.writeFmtp = function(e) {
			var t = "",
				r = e.payloadType;
			if(void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
				var n = [];
				Object.keys(e.parameters).forEach(function(t) {
					n.push(t + "=" + e.parameters[t])
				}), t += "a=fmtp:" + r + " " + n.join(";") + "\r\n"
			}
			return t
		}, n.parseRtcpFb = function(e) {
			var t = e.substr(e.indexOf(" ") + 1).split(" ");
			return {
				type: t.shift(),
				parameter: t.join(" ")
			}
		}, n.writeRtcpFb = function(e) {
			var t = "",
				r = e.payloadType;
			return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
				t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
			}), t
		}, n.parseSsrcMedia = function(e) {
			var t = e.indexOf(" "),
				r = {
					ssrc: parseInt(e.substr(7, t - 7), 10)
				},
				n = e.indexOf(":", t);
			return n > -1 ? (r.attribute = e.substr(t + 1, n - t - 1), r.value = e.substr(n + 1)) : r.attribute = e.substr(t + 1), r
		}, n.getMid = function(e) {
			var t = n.matchPrefix(e, "a=mid:")[0];
			if(t) return t.substr(6)
		}, n.parseFingerprint = function(e) {
			var t = e.substr(14).split(" ");
			return {
				algorithm: t[0].toLowerCase(),
				value: t[1]
			}
		}, n.getDtlsParameters = function(e, t) {
			return {
				role: "auto",
				fingerprints: n.matchPrefix(e + t, "a=fingerprint:").map(n.parseFingerprint)
			}
		}, n.writeDtlsParameters = function(e, t) {
			var r = "a=setup:" + t + "\r\n";
			return e.fingerprints.forEach(function(e) {
				r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
			}), r
		}, n.getIceParameters = function(e, t) {
			var r = n.splitLines(e);
			return {
				usernameFragment: (r = r.concat(n.splitLines(t))).filter(function(e) {
					return 0 === e.indexOf("a=ice-ufrag:")
				})[0].substr(12),
				password: r.filter(function(e) {
					return 0 === e.indexOf("a=ice-pwd:")
				})[0].substr(10)
			}
		}, n.writeIceParameters = function(e) {
			return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
		}, n.parseRtpParameters = function(e) {
			for(var t = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: [],
					rtcp: []
				}, r = n.splitLines(e)[0].split(" "), i = 3; i < r.length; i++) {
				var a = r[i],
					o = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
				if(o) {
					var s = n.parseRtpMap(o),
						c = n.matchPrefix(e, "a=fmtp:" + a + " ");
					switch(s.parameters = c.length ? n.parseFmtp(c[0]) : {}, s.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(n.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
						case "RED":
						case "ULPFEC":
							t.fecMechanisms.push(s.name.toUpperCase())
					}
				}
			}
			return n.matchPrefix(e, "a=extmap:").forEach(function(e) {
				t.headerExtensions.push(n.parseExtmap(e))
			}), t
		}, n.writeRtpDescription = function(e, t) {
			var r = "";
			r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(function(e) {
				return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
			}).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
				r += n.writeRtpMap(e), r += n.writeFmtp(e), r += n.writeRtcpFb(e)
			});
			var i = 0;
			return t.codecs.forEach(function(e) {
				e.maxptime > i && (i = e.maxptime)
			}), i > 0 && (r += "a=maxptime:" + i + "\r\n"), r += "a=rtcp-mux\r\n", t.headerExtensions.forEach(function(e) {
				r += n.writeExtmap(e)
			}), r
		}, n.parseRtpEncodingParameters = function(e) {
			var t, r = [],
				i = n.parseRtpParameters(e),
				a = -1 !== i.fecMechanisms.indexOf("RED"),
				o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
				s = n.matchPrefix(e, "a=ssrc:").map(function(e) {
					return n.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				}),
				c = s.length > 0 && s[0].ssrc,
				u = n.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
					var t = e.split(" ");
					return t.shift(), t.map(function(e) {
						return parseInt(e, 10)
					})
				});
			u.length > 0 && u[0].length > 1 && u[0][0] === c && (t = u[0][1]), i.codecs.forEach(function(e) {
				if("RTX" === e.name.toUpperCase() && e.parameters.apt) {
					var n = {
						ssrc: c,
						codecPayloadType: parseInt(e.parameters.apt, 10),
						rtx: {
							ssrc: t
						}
					};
					r.push(n), a && ((n = JSON.parse(JSON.stringify(n))).fec = {
						ssrc: t,
						mechanism: o ? "red+ulpfec" : "red"
					}, r.push(n))
				}
			}), 0 === r.length && c && r.push({
				ssrc: c
			});
			var d = n.matchPrefix(e, "b=");
			return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
				e.maxBitrate = d
			})), r
		}, n.parseRtcpParameters = function(e) {
			var t = {},
				r = n.matchPrefix(e, "a=ssrc:").map(function(e) {
					return n.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				})[0];
			r && (t.cname = r.value, t.ssrc = r.ssrc);
			var i = n.matchPrefix(e, "a=rtcp-rsize");
			t.reducedSize = i.length > 0, t.compound = 0 === i.length;
			var a = n.matchPrefix(e, "a=rtcp-mux");
			return t.mux = a.length > 0, t
		}, n.parseMsid = function(e) {
			var t, r = n.matchPrefix(e, "a=msid:");
			if(1 === r.length) return {
				stream: (t = r[0].substr(7).split(" "))[0],
				track: t[1]
			};
			var i = n.matchPrefix(e, "a=ssrc:").map(function(e) {
				return n.parseSsrcMedia(e)
			}).filter(function(e) {
				return "msid" === e.attribute
			});
			return i.length > 0 ? {
				stream: (t = i[0].value.split(" "))[0],
				track: t[1]
			} : void 0
		}, n.generateSessionId = function() {
			return Math.random().toString().substr(2, 21)
		}, n.writeSessionBoilerplate = function(e, t) {
			var r = void 0 !== t ? t : 2;
			return "v=0\r\no=thisisadapterortc " + (e || n.generateSessionId()) + " " + r + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
		}, n.writeMediaSection = function(e, t, r, i) {
			var a = n.writeRtpDescription(e.kind, t);
			if(a += n.writeIceParameters(e.iceGatherer.getLocalParameters()), a += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ? a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ? a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
				var o = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
				a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"), a
		}, n.getDirection = function(e, t) {
			for(var r = n.splitLines(e), i = 0; i < r.length; i++) switch(r[i]) {
				case "a=sendrecv":
				case "a=sendonly":
				case "a=recvonly":
				case "a=inactive":
					return r[i].substr(2)
			}
			return t ? n.getDirection(t) : "sendrecv"
		}, n.getKind = function(e) {
			return n.splitLines(e)[0].split(" ")[0].substr(2)
		}, n.isRejected = function(e) {
			return "0" === e.split(" ", 2)[1]
		}, n.parseMLine = function(e) {
			var t = n.splitLines(e)[0].substr(2).split(" ");
			return {
				kind: t[0],
				port: parseInt(t[1], 10),
				protocol: t[2],
				fmt: t.slice(3).join(" ")
			}
		}, n.parseOLine = function(e) {
			var t = n.matchPrefix(e, "o=")[0].substr(2).split(" ");
			return {
				username: t[0],
				sessionId: t[1],
				sessionVersion: parseInt(t[2], 10),
				netType: t[3],
				addressType: t[4],
				address: t[5]
			}
		}, e.exports = n
	}, function(e, t, r) {
		"use strict";
		var n = r(284);

		function i(e, t, r, i, a) {
			var o = n.writeRtpDescription(e.kind, t);
			if(o += n.writeIceParameters(e.iceGatherer.getLocalParameters()), o += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : a || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
				var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
				e.rtpSender._initialTrackId = s;
				var c = "msid:" + (i ? i.id : "-") + " " + s + "\r\n";
				o += "a=" + c, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"), o
		}

		function a(e, t) {
			var r = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: []
				},
				n = function(e, t) {
					e = parseInt(e, 10);
					for(var r = 0; r < t.length; r++)
						if(t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r]
				},
				i = function(e, t, r, i) {
					var a = n(e.parameters.apt, r),
						o = n(t.parameters.apt, i);
					return a && o && a.name.toLowerCase() === o.name.toLowerCase()
				};
			return e.codecs.forEach(function(n) {
				for(var a = 0; a < t.codecs.length; a++) {
					var o = t.codecs[a];
					if(n.name.toLowerCase() === o.name.toLowerCase() && n.clockRate === o.clockRate) {
						if("rtx" === n.name.toLowerCase() && n.parameters && o.parameters.apt && !i(n, o, e.codecs, t.codecs)) continue;
						(o = JSON.parse(JSON.stringify(o))).numChannels = Math.min(n.numChannels, o.numChannels), r.codecs.push(o), o.rtcpFeedback = o.rtcpFeedback.filter(function(e) {
							for(var t = 0; t < n.rtcpFeedback.length; t++)
								if(n.rtcpFeedback[t].type === e.type && n.rtcpFeedback[t].parameter === e.parameter) return !0;
							return !1
						});
						break
					}
				}
			}), e.headerExtensions.forEach(function(e) {
				for(var n = 0; n < t.headerExtensions.length; n++) {
					var i = t.headerExtensions[n];
					if(e.uri === i.uri) {
						r.headerExtensions.push(i);
						break
					}
				}
			}), r
		}

		function o(e, t, r) {
			return -1 !== {
				offer: {
					setLocalDescription: ["stable", "have-local-offer"],
					setRemoteDescription: ["stable", "have-remote-offer"]
				},
				answer: {
					setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
					setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
				}
			}[t][e].indexOf(r)
		}

		function s(e, t) {
			var r = e.getRemoteCandidates().find(function(e) {
				return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
			});
			return r || e.addRemoteCandidate(t), !r
		}

		function c(e, t) {
			var r = new Error(t);
			return r.name = e, r.code = {
				NotSupportedError: 9,
				InvalidStateError: 11,
				InvalidAccessError: 15,
				TypeError: void 0,
				OperationError: void 0
			}[e], r
		}
		e.exports = function(e, t) {
			function r(t, r) {
				r.addTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
					track: t
				}))
			}

			function u(t, r, n, i) {
				var a = new Event("track");
				a.track = r, a.receiver = n, a.transceiver = {
					receiver: n
				}, a.streams = i, e.setTimeout(function() {
					t._dispatchEvent("track", a)
				})
			}
			var d = function(r) {
				var i = this,
					a = document.createDocumentFragment();
				if(["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
						i[e] = a[e].bind(a)
					}), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", r = JSON.parse(JSON.stringify(r || {})), this.usingBundle = "max-bundle" === r.bundlePolicy, "negotiate" === r.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
				switch(r.rtcpMuxPolicy || (r.rtcpMuxPolicy = "require"), r.iceTransportPolicy) {
					case "all":
					case "relay":
						break;
					default:
						r.iceTransportPolicy = "all"
				}
				switch(r.bundlePolicy) {
					case "balanced":
					case "max-compat":
					case "max-bundle":
						break;
					default:
						r.bundlePolicy = "balanced"
				}
				if(r.iceServers = function(e, t) {
						var r = !1;
						return(e = JSON.parse(JSON.stringify(e))).filter(function(e) {
							if(e && (e.urls || e.url)) {
								var n = e.urls || e.url;
								e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
								var i = "string" == typeof n;
								return i && (n = [n]), n = n.filter(function(e) {
									return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || r ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (r = !0, !0)
								}), delete e.url, e.urls = i ? n[0] : n, !!n.length
							}
						})
					}(r.iceServers || [], t), this._iceGatherers = [], r.iceCandidatePoolSize)
					for(var o = r.iceCandidatePoolSize; o > 0; o--) this._iceGatherers.push(new e.RTCIceGatherer({
						iceServers: r.iceServers,
						gatherPolicy: r.iceTransportPolicy
					}));
				else r.iceCandidatePoolSize = 0;
				this._config = r, this.transceivers = [], this._sdpSessionId = n.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1
			};
			Object.defineProperty(d.prototype, "localDescription", {
				configurable: !0,
				get: function() {
					return this._localDescription
				}
			}), Object.defineProperty(d.prototype, "remoteDescription", {
				configurable: !0,
				get: function() {
					return this._remoteDescription
				}
			}), d.prototype.onicecandidate = null, d.prototype.onaddstream = null, d.prototype.ontrack = null, d.prototype.onremovestream = null, d.prototype.onsignalingstatechange = null, d.prototype.oniceconnectionstatechange = null, d.prototype.onconnectionstatechange = null, d.prototype.onicegatheringstatechange = null, d.prototype.onnegotiationneeded = null, d.prototype.ondatachannel = null, d.prototype._dispatchEvent = function(e, t) {
				this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
			}, d.prototype._emitGatheringStateChange = function() {
				var e = new Event("icegatheringstatechange");
				this._dispatchEvent("icegatheringstatechange", e)
			}, d.prototype.getConfiguration = function() {
				return this._config
			}, d.prototype.getLocalStreams = function() {
				return this.localStreams
			}, d.prototype.getRemoteStreams = function() {
				return this.remoteStreams
			}, d.prototype._createTransceiver = function(e, t) {
				var r = this.transceivers.length > 0,
					n = {
						track: null,
						iceGatherer: null,
						iceTransport: null,
						dtlsTransport: null,
						localCapabilities: null,
						remoteCapabilities: null,
						rtpSender: null,
						rtpReceiver: null,
						kind: e,
						mid: null,
						sendEncodingParameters: null,
						recvEncodingParameters: null,
						stream: null,
						associatedRemoteMediaStreams: [],
						wantReceive: !0
					};
				if(this.usingBundle && r) n.iceTransport = this.transceivers[0].iceTransport, n.dtlsTransport = this.transceivers[0].dtlsTransport;
				else {
					var i = this._createIceAndDtlsTransports();
					n.iceTransport = i.iceTransport, n.dtlsTransport = i.dtlsTransport
				}
				return t || this.transceivers.push(n), n
			}, d.prototype.addTrack = function(t, r) {
				if(this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
				var n;
				if(this.transceivers.find(function(e) {
						return e.track === t
					})) throw c("InvalidAccessError", "Track already exists.");
				for(var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (n = this.transceivers[i]);
				return n || (n = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(r) && this.localStreams.push(r), n.track = t, n.stream = r, n.rtpSender = new e.RTCRtpSender(t, n.dtlsTransport), n.rtpSender
			}, d.prototype.addStream = function(e) {
				var r = this;
				if(t >= 15025) e.getTracks().forEach(function(t) {
					r.addTrack(t, e)
				});
				else {
					var n = e.clone();
					e.getTracks().forEach(function(e, t) {
						var r = n.getTracks()[t];
						e.addEventListener("enabled", function(e) {
							r.enabled = e.enabled
						})
					}), n.getTracks().forEach(function(e) {
						r.addTrack(e, n)
					})
				}
			}, d.prototype.removeTrack = function(t) {
				if(this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
				if(!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
				var r = this.transceivers.find(function(e) {
					return e.rtpSender === t
				});
				if(!r) throw c("InvalidAccessError", "Sender was not created by this connection.");
				var n = r.stream;
				r.rtpSender.stop(), r.rtpSender = null, r.track = null, r.stream = null, -1 === this.transceivers.map(function(e) {
					return e.stream
				}).indexOf(n) && this.localStreams.indexOf(n) > -1 && this.localStreams.splice(this.localStreams.indexOf(n), 1), this._maybeFireNegotiationNeeded()
			}, d.prototype.removeStream = function(e) {
				var t = this;
				e.getTracks().forEach(function(e) {
					var r = t.getSenders().find(function(t) {
						return t.track === e
					});
					r && t.removeTrack(r)
				})
			}, d.prototype.getSenders = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpSender
				}).map(function(e) {
					return e.rtpSender
				})
			}, d.prototype.getReceivers = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpReceiver
				}).map(function(e) {
					return e.rtpReceiver
				})
			}, d.prototype._createIceGatherer = function(t, r) {
				var n = this;
				if(r && t > 0) return this.transceivers[0].iceGatherer;
				if(this._iceGatherers.length) return this._iceGatherers.shift();
				var i = new e.RTCIceGatherer({
					iceServers: this._config.iceServers,
					gatherPolicy: this._config.iceTransportPolicy
				});
				return Object.defineProperty(i, "state", {
					value: "new",
					writable: !0
				}), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
					var r = !e.candidate || 0 === Object.keys(e.candidate).length;
					i.state = r ? "completed" : "gathering", null !== n.transceivers[t].bufferedCandidateEvents && n.transceivers[t].bufferedCandidateEvents.push(e)
				}, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
			}, d.prototype._gather = function(t, r) {
				var i = this,
					a = this.transceivers[r].iceGatherer;
				if(!a.onlocalcandidate) {
					var o = this.transceivers[r].bufferedCandidateEvents;
					this.transceivers[r].bufferedCandidateEvents = null, a.removeEventListener("localcandidate", this.transceivers[r].bufferCandidates), a.onlocalcandidate = function(e) {
						if(!(i.usingBundle && r > 0)) {
							var o = new Event("icecandidate");
							o.candidate = {
								sdpMid: t,
								sdpMLineIndex: r
							};
							var s = e.candidate,
								c = !s || 0 === Object.keys(s).length;
							if(c) "new" !== a.state && "gathering" !== a.state || (a.state = "completed");
							else {
								"new" === a.state && (a.state = "gathering"), s.component = 1, s.ufrag = a.getLocalParameters().usernameFragment;
								var u = n.writeCandidate(s);
								o.candidate = Object.assign(o.candidate, n.parseCandidate(u)), o.candidate.candidate = u, o.candidate.toJSON = function() {
									return {
										candidate: o.candidate.candidate,
										sdpMid: o.candidate.sdpMid,
										sdpMLineIndex: o.candidate.sdpMLineIndex,
										usernameFragment: o.candidate.usernameFragment
									}
								}
							}
							var d = n.getMediaSections(i._localDescription.sdp);
							d[o.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", i._localDescription.sdp = n.getDescription(i._localDescription.sdp) + d.join("");
							var l = i.transceivers.every(function(e) {
								return e.iceGatherer && "completed" === e.iceGatherer.state
							});
							"gathering" !== i.iceGatheringState && (i.iceGatheringState = "gathering", i._emitGatheringStateChange()), c || i._dispatchEvent("icecandidate", o), l && (i._dispatchEvent("icecandidate", new Event("icecandidate")), i.iceGatheringState = "complete", i._emitGatheringStateChange())
						}
					}, e.setTimeout(function() {
						o.forEach(function(e) {
							a.onlocalcandidate(e)
						})
					}, 0)
				}
			}, d.prototype._createIceAndDtlsTransports = function() {
				var t = this,
					r = new e.RTCIceTransport(null);
				r.onicestatechange = function() {
					t._updateIceConnectionState(), t._updateConnectionState()
				};
				var n = new e.RTCDtlsTransport(r);
				return n.ondtlsstatechange = function() {
					t._updateConnectionState()
				}, n.onerror = function() {
					Object.defineProperty(n, "state", {
						value: "failed",
						writable: !0
					}), t._updateConnectionState()
				}, {
					iceTransport: r,
					dtlsTransport: n
				}
			}, d.prototype._disposeIceAndDtlsTransports = function(e) {
				var t = this.transceivers[e].iceGatherer;
				t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
				var r = this.transceivers[e].iceTransport;
				r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
				var n = this.transceivers[e].dtlsTransport;
				n && (delete n.ondtlsstatechange, delete n.onerror, delete this.transceivers[e].dtlsTransport)
			}, d.prototype._transceive = function(e, r, i) {
				var o = a(e.localCapabilities, e.remoteCapabilities);
				r && e.rtpSender && (o.encodings = e.sendEncodingParameters, o.rtcp = {
					cname: n.localCName,
					compound: e.rtcpParameters.compound
				}, e.recvEncodingParameters.length && (o.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(o)), i && e.rtpReceiver && o.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
					delete e.rtx
				}), e.recvEncodingParameters.length ? o.encodings = e.recvEncodingParameters : o.encodings = [{}], o.rtcp = {
					compound: e.rtcpParameters.compound
				}, e.rtcpParameters.cname && (o.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (o.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(o))
			}, d.prototype.setLocalDescription = function(e) {
				var t, r, i = this;
				if(-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
				if(!o("setLocalDescription", e.type, i.signalingState) || i._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + i.signalingState));
				if("offer" === e.type) t = n.splitSections(e.sdp), r = t.shift(), t.forEach(function(e, t) {
					var r = n.parseRtpParameters(e);
					i.transceivers[t].localCapabilities = r
				}), i.transceivers.forEach(function(e, t) {
					i._gather(e.mid, t)
				});
				else if("answer" === e.type) {
					t = n.splitSections(i._remoteDescription.sdp), r = t.shift();
					var s = n.matchPrefix(r, "a=ice-lite").length > 0;
					t.forEach(function(e, t) {
						var o = i.transceivers[t],
							c = o.iceGatherer,
							u = o.iceTransport,
							d = o.dtlsTransport,
							l = o.localCapabilities,
							f = o.remoteCapabilities;
						if(!(n.isRejected(e) && 0 === n.matchPrefix(e, "a=bundle-only").length) && !o.rejected) {
							var p = n.getIceParameters(e, r),
								h = n.getDtlsParameters(e, r);
							s && (h.role = "server"), i.usingBundle && 0 !== t || (i._gather(o.mid, t), "new" === u.state && u.start(c, p, s ? "controlling" : "controlled"), "new" === d.state && d.start(h));
							var m = a(l, f);
							i._transceive(o, m.codecs.length > 0, !1)
						}
					})
				}
				return i._localDescription = {
					type: e.type,
					sdp: e.sdp
				}, "offer" === e.type ? i._updateSignalingState("have-local-offer") : i._updateSignalingState("stable"), Promise.resolve()
			}, d.prototype.setRemoteDescription = function(i) {
				var a = this;
				if(-1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + i.type + '"'));
				if(!o("setRemoteDescription", i.type, a.signalingState) || a._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + i.type + " in state " + a.signalingState));
				var d = {};
				a.remoteStreams.forEach(function(e) {
					d[e.id] = e
				});
				var l = [],
					f = n.splitSections(i.sdp),
					p = f.shift(),
					h = n.matchPrefix(p, "a=ice-lite").length > 0,
					m = n.matchPrefix(p, "a=group:BUNDLE ").length > 0;
				a.usingBundle = m;
				var v = n.matchPrefix(p, "a=ice-options:")[0];
				return a.canTrickleIceCandidates = !!v && v.substr(14).split(" ").indexOf("trickle") >= 0, f.forEach(function(o, c) {
					var u = n.splitLines(o),
						f = n.getKind(o),
						v = n.isRejected(o) && 0 === n.matchPrefix(o, "a=bundle-only").length,
						_ = u[0].substr(2).split(" ")[2],
						y = n.getDirection(o, p),
						R = n.parseMsid(o),
						g = n.getMid(o) || n.generateIdentifier();
					if(v || "application" === f && ("DTLS/SCTP" === _ || "UDP/DTLS/SCTP" === _)) a.transceivers[c] = {
						mid: g,
						kind: f,
						protocol: _,
						rejected: !0
					};
					else {
						var C, E, T, b, O, S, A, P, I;
						!v && a.transceivers[c] && a.transceivers[c].rejected && (a.transceivers[c] = a._createTransceiver(f, !0));
						var k, L, W = n.parseRtpParameters(o);
						v || (k = n.getIceParameters(o, p), (L = n.getDtlsParameters(o, p)).role = "client"), A = n.parseRtpEncodingParameters(o);
						var D = n.parseRtcpParameters(o),
							M = n.matchPrefix(o, "a=end-of-candidates", p).length > 0,
							w = n.matchPrefix(o, "a=candidate:").map(function(e) {
								return n.parseCandidate(e)
							}).filter(function(e) {
								return 1 === e.component
							});
						if(("offer" === i.type || "answer" === i.type) && !v && m && c > 0 && a.transceivers[c] && (a._disposeIceAndDtlsTransports(c), a.transceivers[c].iceGatherer = a.transceivers[0].iceGatherer, a.transceivers[c].iceTransport = a.transceivers[0].iceTransport, a.transceivers[c].dtlsTransport = a.transceivers[0].dtlsTransport, a.transceivers[c].rtpSender && a.transceivers[c].rtpSender.setTransport(a.transceivers[0].dtlsTransport), a.transceivers[c].rtpReceiver && a.transceivers[c].rtpReceiver.setTransport(a.transceivers[0].dtlsTransport)), "offer" !== i.type || v) "answer" !== i.type || v || (E = (C = a.transceivers[c]).iceGatherer, T = C.iceTransport, b = C.dtlsTransport, O = C.rtpReceiver, S = C.sendEncodingParameters, P = C.localCapabilities, a.transceivers[c].recvEncodingParameters = A, a.transceivers[c].remoteCapabilities = W, a.transceivers[c].rtcpParameters = D, w.length && "new" === T.state && (!h && !M || m && 0 !== c ? w.forEach(function(e) {
							s(C.iceTransport, e)
						}) : T.setRemoteCandidates(w)), m && 0 !== c || ("new" === T.state && T.start(E, k, "controlling"), "new" === b.state && b.start(L)), a._transceive(C, "sendrecv" === y || "recvonly" === y, "sendrecv" === y || "sendonly" === y), !O || "sendrecv" !== y && "sendonly" !== y ? delete C.rtpReceiver : (I = O.track, R ? (d[R.stream] || (d[R.stream] = new e.MediaStream), r(I, d[R.stream]), l.push([I, O, d[R.stream]])) : (d.default || (d.default = new e.MediaStream), r(I, d.default), l.push([I, O, d.default]))));
						else {
							(C = a.transceivers[c] || a._createTransceiver(f)).mid = g, C.iceGatherer || (C.iceGatherer = a._createIceGatherer(c, m)), w.length && "new" === C.iceTransport.state && (!M || m && 0 !== c ? w.forEach(function(e) {
								s(C.iceTransport, e)
							}) : C.iceTransport.setRemoteCandidates(w)), P = e.RTCRtpReceiver.getCapabilities(f), t < 15019 && (P.codecs = P.codecs.filter(function(e) {
								return "rtx" !== e.name
							})), S = C.sendEncodingParameters || [{
								ssrc: 1001 * (2 * c + 2)
							}];
							var B, G = !1;
							if("sendrecv" === y || "sendonly" === y) {
								if(G = !C.rtpReceiver, O = C.rtpReceiver || new e.RTCRtpReceiver(C.dtlsTransport, f), G) I = O.track, R && "-" === R.stream || (R ? (d[R.stream] || (d[R.stream] = new e.MediaStream, Object.defineProperty(d[R.stream], "id", {
									get: function() {
										return R.stream
									}
								})), Object.defineProperty(I, "id", {
									get: function() {
										return R.track
									}
								}), B = d[R.stream]) : (d.default || (d.default = new e.MediaStream), B = d.default)), B && (r(I, B), C.associatedRemoteMediaStreams.push(B)), l.push([I, O, B])
							} else C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function(t) {
								var r, n, i = t.getTracks().find(function(e) {
									return e.id === C.rtpReceiver.track.id
								});
								i && (r = i, (n = t).removeTrack(r), n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
									track: r
								})))
							}), C.associatedRemoteMediaStreams = []);
							C.localCapabilities = P, C.remoteCapabilities = W, C.rtpReceiver = O, C.rtcpParameters = D, C.sendEncodingParameters = S, C.recvEncodingParameters = A, a._transceive(a.transceivers[c], !1, G)
						}
					}
				}), void 0 === a._dtlsRole && (a._dtlsRole = "offer" === i.type ? "active" : "passive"), a._remoteDescription = {
					type: i.type,
					sdp: i.sdp
				}, "offer" === i.type ? a._updateSignalingState("have-remote-offer") : a._updateSignalingState("stable"), Object.keys(d).forEach(function(t) {
					var r = d[t];
					if(r.getTracks().length) {
						if(-1 === a.remoteStreams.indexOf(r)) {
							a.remoteStreams.push(r);
							var n = new Event("addstream");
							n.stream = r, e.setTimeout(function() {
								a._dispatchEvent("addstream", n)
							})
						}
						l.forEach(function(e) {
							var t = e[0],
								n = e[1];
							r.id === e[2].id && u(a, t, n, [r])
						})
					}
				}), l.forEach(function(e) {
					e[2] || u(a, e[0], e[1], [])
				}), e.setTimeout(function() {
					a && a.transceivers && a.transceivers.forEach(function(e) {
						e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
					})
				}, 4e3), Promise.resolve()
			}, d.prototype.close = function() {
				this.transceivers.forEach(function(e) {
					e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
				}), this._isClosed = !0, this._updateSignalingState("closed")
			}, d.prototype._updateSignalingState = function(e) {
				this.signalingState = e;
				var t = new Event("signalingstatechange");
				this._dispatchEvent("signalingstatechange", t)
			}, d.prototype._maybeFireNegotiationNeeded = function() {
				var t = this;
				"stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function() {
					if(t.needNegotiation) {
						t.needNegotiation = !1;
						var e = new Event("negotiationneeded");
						t._dispatchEvent("negotiationneeded", e)
					}
				}, 0))
			}, d.prototype._updateIceConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					checking: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if(this.transceivers.forEach(function(e) {
						t[e.iceTransport.state]++
					}), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
					this.iceConnectionState = e;
					var r = new Event("iceconnectionstatechange");
					this._dispatchEvent("iceconnectionstatechange", r)
				}
			}, d.prototype._updateConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					connecting: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if(this.transceivers.forEach(function(e) {
						t[e.iceTransport.state]++, t[e.dtlsTransport.state]++
					}), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
					this.connectionState = e;
					var r = new Event("connectionstatechange");
					this._dispatchEvent("connectionstatechange", r)
				}
			}, d.prototype.createOffer = function() {
				var r = this;
				if(r._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
				var a = r.transceivers.filter(function(e) {
						return "audio" === e.kind
					}).length,
					o = r.transceivers.filter(function(e) {
						return "video" === e.kind
					}).length,
					s = arguments[0];
				if(s) {
					if(s.mandatory || s.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
					void 0 !== s.offerToReceiveAudio && (a = !0 === s.offerToReceiveAudio ? 1 : !1 === s.offerToReceiveAudio ? 0 : s.offerToReceiveAudio), void 0 !== s.offerToReceiveVideo && (o = !0 === s.offerToReceiveVideo ? 1 : !1 === s.offerToReceiveVideo ? 0 : s.offerToReceiveVideo)
				}
				for(r.transceivers.forEach(function(e) {
						"audio" === e.kind ? --a < 0 && (e.wantReceive = !1) : "video" === e.kind && --o < 0 && (e.wantReceive = !1)
					}); a > 0 || o > 0;) a > 0 && (r._createTransceiver("audio"), a--), o > 0 && (r._createTransceiver("video"), o--);
				var u = n.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
				r.transceivers.forEach(function(i, a) {
					var o = i.track,
						s = i.kind,
						c = i.mid || n.generateIdentifier();
					i.mid = c, i.iceGatherer || (i.iceGatherer = r._createIceGatherer(a, r.usingBundle));
					var u = e.RTCRtpSender.getCapabilities(s);
					t < 15019 && (u.codecs = u.codecs.filter(function(e) {
						return "rtx" !== e.name
					})), u.codecs.forEach(function(e) {
						"H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), i.remoteCapabilities && i.remoteCapabilities.codecs && i.remoteCapabilities.codecs.forEach(function(t) {
							e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
						})
					}), u.headerExtensions.forEach(function(e) {
						(i.remoteCapabilities && i.remoteCapabilities.headerExtensions || []).forEach(function(t) {
							e.uri === t.uri && (e.id = t.id)
						})
					});
					var d = i.sendEncodingParameters || [{
						ssrc: 1001 * (2 * a + 1)
					}];
					o && t >= 15019 && "video" === s && !d[0].rtx && (d[0].rtx = {
						ssrc: d[0].ssrc + 1
					}), i.wantReceive && (i.rtpReceiver = new e.RTCRtpReceiver(i.dtlsTransport, s)), i.localCapabilities = u, i.sendEncodingParameters = d
				}), "max-compat" !== r._config.bundlePolicy && (u += "a=group:BUNDLE " + r.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n"), u += "a=ice-options:trickle\r\n", r.transceivers.forEach(function(e, t) {
					u += i(e, e.localCapabilities, "offer", e.stream, r._dtlsRole), u += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === r.iceGatheringState || 0 !== t && r.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
						e.component = 1, u += "a=" + n.writeCandidate(e) + "\r\n"
					}), "completed" === e.iceGatherer.state && (u += "a=end-of-candidates\r\n"))
				});
				var d = new e.RTCSessionDescription({
					type: "offer",
					sdp: u
				});
				return Promise.resolve(d)
			}, d.prototype.createAnswer = function() {
				var r = this;
				if(r._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
				if("have-remote-offer" !== r.signalingState && "have-local-pranswer" !== r.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + r.signalingState));
				var o = n.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
				r.usingBundle && (o += "a=group:BUNDLE " + r.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n");
				var s = n.getMediaSections(r._remoteDescription.sdp).length;
				r.transceivers.forEach(function(e, n) {
					if(!(n + 1 > s)) {
						if(e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? o += "m=application 0 DTLS/SCTP 5000\r\n" : o += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? o += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (o += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(o += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
						var c;
						if(e.stream) "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
							ssrc: e.sendEncodingParameters[0].ssrc + 1
						});
						var u = a(e.localCapabilities, e.remoteCapabilities);
						!u.codecs.filter(function(e) {
							return "rtx" === e.name.toLowerCase()
						}).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, o += i(e, u, "answer", e.stream, r._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (o += "a=rtcp-rsize\r\n")
					}
				});
				var u = new e.RTCSessionDescription({
					type: "answer",
					sdp: o
				});
				return Promise.resolve(u)
			}, d.prototype.addIceCandidate = function(e) {
				var t, r = this;
				return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(i, a) {
					if(!r._remoteDescription) return a(c("InvalidStateError", "Can not add ICE candidate without a remote description"));
					if(e && "" !== e.candidate) {
						var o = e.sdpMLineIndex;
						if(e.sdpMid)
							for(var u = 0; u < r.transceivers.length; u++)
								if(r.transceivers[u].mid === e.sdpMid) {
									o = u;
									break
								}
						var d = r.transceivers[o];
						if(!d) return a(c("OperationError", "Can not add ICE candidate"));
						if(d.rejected) return i();
						var l = Object.keys(e.candidate).length > 0 ? n.parseCandidate(e.candidate) : {};
						if("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return i();
						if(l.component && 1 !== l.component) return i();
						if((0 === o || o > 0 && d.iceTransport !== r.transceivers[0].iceTransport) && !s(d.iceTransport, l)) return a(c("OperationError", "Can not add ICE candidate"));
						var f = e.candidate.trim();
						0 === f.indexOf("a=") && (f = f.substr(2)), (t = n.getMediaSections(r._remoteDescription.sdp))[o] += "a=" + (l.type ? f : "end-of-candidates") + "\r\n", r._remoteDescription.sdp = n.getDescription(r._remoteDescription.sdp) + t.join("")
					} else
						for(var p = 0; p < r.transceivers.length && (r.transceivers[p].rejected || (r.transceivers[p].iceTransport.addRemoteCandidate({}), (t = n.getMediaSections(r._remoteDescription.sdp))[p] += "a=end-of-candidates\r\n", r._remoteDescription.sdp = n.getDescription(r._remoteDescription.sdp) + t.join(""), !r.usingBundle)); p++);
					i()
				})
			}, d.prototype.getStats = function(t) {
				if(t && t instanceof e.MediaStreamTrack) {
					var r = null;
					if(this.transceivers.forEach(function(e) {
							e.rtpSender && e.rtpSender.track === t ? r = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (r = e.rtpReceiver)
						}), !r) throw c("InvalidAccessError", "Invalid selector.");
					return r.getStats()
				}
				var n = [];
				return this.transceivers.forEach(function(e) {
					["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
						e[t] && n.push(e[t].getStats())
					})
				}), Promise.all(n).then(function(e) {
					var t = new Map;
					return e.forEach(function(e) {
						e.forEach(function(e) {
							t.set(e.id, e)
						})
					}), t
				})
			};
			["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
				var r = e[t];
				if(r && r.prototype && r.prototype.getStats) {
					var n = r.prototype.getStats;
					r.prototype.getStats = function() {
						return n.apply(this).then(function(e) {
							var t = new Map;
							return Object.keys(e).forEach(function(r) {
								var n;
								e[r].type = {
									inboundrtp: "inbound-rtp",
									outboundrtp: "outbound-rtp",
									candidatepair: "candidate-pair",
									localcandidate: "local-candidate",
									remotecandidate: "remote-candidate"
								}[(n = e[r]).type] || n.type, t.set(r, e[r])
							}), t
						})
					}
				}
			});
			var l = ["createOffer", "createAnswer"];
			return l.forEach(function(e) {
				var t = d.prototype[e];
				d.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
						"function" == typeof e[0] && e[0].apply(null, [t])
					}, function(t) {
						"function" == typeof e[1] && e[1].apply(null, [t])
					}) : t.apply(this, arguments)
				}
			}), (l = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
				var t = d.prototype[e];
				d.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
						"function" == typeof e[1] && e[1].apply(null)
					}, function(t) {
						"function" == typeof e[2] && e[2].apply(null, [t])
					}) : t.apply(this, arguments)
				}
			}), ["getStats"].forEach(function(e) {
				var t = d.prototype[e];
				d.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
						"function" == typeof e[1] && e[1].apply(null)
					}) : t.apply(this, arguments)
				}
			}), d
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = r(285);
		e.exports = {
			shimGetUserMedia: r(283),
			shimPeerConnection: function(e) {
				var t = n.detectBrowser(e);
				if(e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
						return e
					}), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
						return e
					}), t.version < 15025)) {
					var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
					Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
						set: function(e) {
							r.set.call(this, e);
							var t = new Event("enabled");
							t.enabled = e, this.dispatchEvent(t)
						}
					})
				}!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
					get: function() {
						return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
					}
				}), e.RTCPeerConnection = i(e, t.version)
			},
			shimReplaceTrack: function(e) {
				!e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = n.log;
		e.exports = function(e) {
			var t = n.detectBrowser(e),
				r = e && e.navigator,
				a = function(e) {
					if("object" != typeof e || e.mandatory || e.optional) return e;
					var t = {};
					return Object.keys(e).forEach(function(r) {
						if("require" !== r && "advanced" !== r && "mediaSource" !== r) {
							var n = "object" == typeof e[r] ? e[r] : {
								ideal: e[r]
							};
							void 0 !== n.exact && "number" == typeof n.exact && (n.min = n.max = n.exact);
							var i = function(e, t) {
								return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
							};
							if(void 0 !== n.ideal) {
								t.optional = t.optional || [];
								var a = {};
								"number" == typeof n.ideal ? (a[i("min", r)] = n.ideal, t.optional.push(a), (a = {})[i("max", r)] = n.ideal, t.optional.push(a)) : (a[i("", r)] = n.ideal, t.optional.push(a))
							}
							void 0 !== n.exact && "number" != typeof n.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", r)] = n.exact) : ["min", "max"].forEach(function(e) {
								void 0 !== n[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, r)] = n[e])
							})
						}
					}), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
				},
				o = function(e, n) {
					if(t.version >= 61) return n(e);
					if((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
						var o = function(e, t, r) {
							t in e && !(r in e) && (e[r] = e[t], delete e[t])
						};
						o((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), o(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = a(e.audio)
					}
					if(e && "object" == typeof e.video) {
						var s = e.video.facingMode;
						s = s && ("object" == typeof s ? s : {
							ideal: s
						});
						var c, u = t.version < 66;
						if(s && ("user" === s.exact || "environment" === s.exact || "user" === s.ideal || "environment" === s.ideal) && (!r.mediaDevices.getSupportedConstraints || !r.mediaDevices.getSupportedConstraints().facingMode || u))
							if(delete e.video.facingMode, "environment" === s.exact || "environment" === s.ideal ? c = ["back", "rear"] : "user" !== s.exact && "user" !== s.ideal || (c = ["front"]), c) return r.mediaDevices.enumerateDevices().then(function(t) {
								var r = (t = t.filter(function(e) {
									return "videoinput" === e.kind
								})).find(function(e) {
									return c.some(function(t) {
										return -1 !== e.label.toLowerCase().indexOf(t)
									})
								});
								return !r && t.length && -1 !== c.indexOf("back") && (r = t[t.length - 1]), r && (e.video.deviceId = s.exact ? {
									exact: r.deviceId
								} : {
									ideal: r.deviceId
								}), e.video = a(e.video), i("chrome: " + JSON.stringify(e)), n(e)
							});
						e.video = a(e.video)
					}
					return i("chrome: " + JSON.stringify(e)), n(e)
				},
				s = function(e) {
					return {
						name: {
							PermissionDeniedError: "NotAllowedError",
							InvalidStateError: "NotReadableError",
							DevicesNotFoundError: "NotFoundError",
							ConstraintNotSatisfiedError: "OverconstrainedError",
							TrackStartError: "NotReadableError",
							MediaDeviceFailedDueToShutdown: "NotReadableError",
							MediaDeviceKillSwitchOn: "NotReadableError"
						}[e.name] || e.name,
						message: e.message,
						constraint: e.constraintName,
						toString: function() {
							return this.name + (this.message && ": ") + this.message
						}
					}
				};
			r.getUserMedia = function(e, t, n) {
				o(e, function(e) {
					r.webkitGetUserMedia(e, t, function(e) {
						n && n(s(e))
					})
				})
			};
			var c = function(e) {
				return new Promise(function(t, n) {
					r.getUserMedia(e, t, n)
				})
			};
			if(r.mediaDevices || (r.mediaDevices = {
					getUserMedia: c,
					enumerateDevices: function() {
						return new Promise(function(t) {
							var r = {
								audio: "audioinput",
								video: "videoinput"
							};
							return e.MediaStreamTrack.getSources(function(e) {
								t(e.map(function(e) {
									return {
										label: e.label,
										kind: r[e.kind],
										deviceId: e.id,
										groupId: ""
									}
								}))
							})
						})
					},
					getSupportedConstraints: function() {
						return {
							deviceId: !0,
							echoCancellation: !0,
							facingMode: !0,
							frameRate: !0,
							height: !0,
							width: !0
						}
					}
				}), r.mediaDevices.getUserMedia) {
				var u = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
				r.mediaDevices.getUserMedia = function(e) {
					return o(e, function(e) {
						return u(e).then(function(t) {
							if(e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
								e.stop()
							}), new DOMException("", "NotFoundError");
							return t
						}, function(e) {
							return Promise.reject(s(e))
						})
					})
				}
			} else r.mediaDevices.getUserMedia = function(e) {
				return c(e)
			};
			void 0 === r.mediaDevices.addEventListener && (r.mediaDevices.addEventListener = function() {
				i("Dummy mediaDevices.addEventListener called.")
			}), void 0 === r.mediaDevices.removeEventListener && (r.mediaDevices.removeEventListener = function() {
				i("Dummy mediaDevices.removeEventListener called.")
			})
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68),
			i = n.log,
			a = {
				shimMediaStream: function(e) {
					e.MediaStream = e.MediaStream || e.webkitMediaStream
				},
				shimOnTrack: function(e) {
					if("object" == typeof e && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
						Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
							get: function() {
								return this._ontrack
							},
							set: function(e) {
								this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e)
							}
						});
						var t = e.RTCPeerConnection.prototype.setRemoteDescription;
						e.RTCPeerConnection.prototype.setRemoteDescription = function() {
							var r = this;
							return r._ontrackpoly || (r._ontrackpoly = function(t) {
								t.stream.addEventListener("addtrack", function(n) {
									var i;
									i = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
										return e.track && e.track.id === n.track.id
									}) : {
										track: n.track
									};
									var a = new Event("track");
									a.track = n.track, a.receiver = i, a.transceiver = {
										receiver: i
									}, a.streams = [t.stream], r.dispatchEvent(a)
								}), t.stream.getTracks().forEach(function(n) {
									var i;
									i = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
										return e.track && e.track.id === n.id
									}) : {
										track: n
									};
									var a = new Event("track");
									a.track = n, a.receiver = i, a.transceiver = {
										receiver: i
									}, a.streams = [t.stream], r.dispatchEvent(a)
								})
							}, r.addEventListener("addstream", r._ontrackpoly)), t.apply(r, arguments)
						}
					}
				},
				shimGetSendersWithDtmf: function(e) {
					if("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
						var t = function(e, t) {
							return {
								track: t,
								get dtmf() {
									return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf
								},
								_pc: e
							}
						};
						if(!e.RTCPeerConnection.prototype.getSenders) {
							e.RTCPeerConnection.prototype.getSenders = function() {
								return this._senders = this._senders || [], this._senders.slice()
							};
							var r = e.RTCPeerConnection.prototype.addTrack;
							e.RTCPeerConnection.prototype.addTrack = function(e, n) {
								var i = r.apply(this, arguments);
								return i || (i = t(this, e), this._senders.push(i)), i
							};
							var n = e.RTCPeerConnection.prototype.removeTrack;
							e.RTCPeerConnection.prototype.removeTrack = function(e) {
								n.apply(this, arguments);
								var t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
							}
						}
						var i = e.RTCPeerConnection.prototype.addStream;
						e.RTCPeerConnection.prototype.addStream = function(e) {
							var r = this;
							r._senders = r._senders || [], i.apply(r, [e]), e.getTracks().forEach(function(e) {
								r._senders.push(t(r, e))
							})
						};
						var a = e.RTCPeerConnection.prototype.removeStream;
						e.RTCPeerConnection.prototype.removeStream = function(e) {
							var t = this;
							t._senders = t._senders || [], a.apply(t, [e]), e.getTracks().forEach(function(e) {
								var r = t._senders.find(function(t) {
									return t.track === e
								});
								r && t._senders.splice(t._senders.indexOf(r), 1)
							})
						}
					} else if("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
						var o = e.RTCPeerConnection.prototype.getSenders;
						e.RTCPeerConnection.prototype.getSenders = function() {
							var e = this,
								t = o.apply(e, []);
							return t.forEach(function(t) {
								t._pc = e
							}), t
						}, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
							get: function() {
								return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf
							}
						})
					}
				},
				shimSourceObject: function(e) {
					var t = e && e.URL;
					"object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
						get: function() {
							return this._srcObject
						},
						set: function(e) {
							var r = this;
							this._srcObject = e, this.src && t.revokeObjectURL(this.src), e ? (this.src = t.createObjectURL(e), e.addEventListener("addtrack", function() {
								r.src && t.revokeObjectURL(r.src), r.src = t.createObjectURL(e)
							}), e.addEventListener("removetrack", function() {
								r.src && t.revokeObjectURL(r.src), r.src = t.createObjectURL(e)
							})) : this.src = ""
						}
					}))
				},
				shimAddTrackRemoveTrack: function(e) {
					var t = n.detectBrowser(e);
					if(!(e.RTCPeerConnection.prototype.addTrack && t.version >= 64)) {
						var r = e.RTCPeerConnection.prototype.getLocalStreams;
						e.RTCPeerConnection.prototype.getLocalStreams = function() {
							var e = this,
								t = r.apply(this);
							return e._reverseStreams = e._reverseStreams || {}, t.map(function(t) {
								return e._reverseStreams[t.id]
							})
						};
						var i = e.RTCPeerConnection.prototype.addStream;
						e.RTCPeerConnection.prototype.addStream = function(t) {
							var r = this;
							if(r._streams = r._streams || {}, r._reverseStreams = r._reverseStreams || {}, t.getTracks().forEach(function(e) {
									if(r.getSenders().find(function(t) {
											return t.track === e
										})) throw new DOMException("Track already exists.", "InvalidAccessError")
								}), !r._reverseStreams[t.id]) {
								var n = new e.MediaStream(t.getTracks());
								r._streams[t.id] = n, r._reverseStreams[n.id] = t, t = n
							}
							i.apply(r, [t])
						};
						var a = e.RTCPeerConnection.prototype.removeStream;
						e.RTCPeerConnection.prototype.removeStream = function(e) {
							var t = this;
							t._streams = t._streams || {}, t._reverseStreams = t._reverseStreams || {}, a.apply(t, [t._streams[e.id] || e]), delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id], delete t._streams[e.id]
						}, e.RTCPeerConnection.prototype.addTrack = function(t, r) {
							var n = this;
							if("closed" === n.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
							var i = [].slice.call(arguments, 1);
							if(1 !== i.length || !i[0].getTracks().find(function(e) {
									return e === t
								})) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
							if(n.getSenders().find(function(e) {
									return e.track === t
								})) throw new DOMException("Track already exists.", "InvalidAccessError");
							n._streams = n._streams || {}, n._reverseStreams = n._reverseStreams || {};
							var a = n._streams[r.id];
							if(a) a.addTrack(t), Promise.resolve().then(function() {
								n.dispatchEvent(new Event("negotiationneeded"))
							});
							else {
								var o = new e.MediaStream([t]);
								n._streams[r.id] = o, n._reverseStreams[o.id] = r, n.addStream(o)
							}
							return n.getSenders().find(function(e) {
								return e.track === t
							})
						}, ["createOffer", "createAnswer"].forEach(function(t) {
							var r = e.RTCPeerConnection.prototype[t];
							e.RTCPeerConnection.prototype[t] = function() {
								var e = this,
									t = arguments;
								return arguments.length && "function" == typeof arguments[0] ? r.apply(e, [function(r) {
									var n = c(e, r);
									t[0].apply(null, [n])
								}, function(e) {
									t[1] && t[1].apply(null, e)
								}, arguments[2]]) : r.apply(e, arguments).then(function(t) {
									return c(e, t)
								})
							}
						});
						var o = e.RTCPeerConnection.prototype.setLocalDescription;
						e.RTCPeerConnection.prototype.setLocalDescription = function() {
							return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
								var r = t.sdp;
								return Object.keys(e._reverseStreams || []).forEach(function(t) {
									var n = e._reverseStreams[t],
										i = e._streams[n.id];
									r = r.replace(new RegExp(n.id, "g"), i.id)
								}), new RTCSessionDescription({
									type: t.type,
									sdp: r
								})
							}(this, arguments[0]), o.apply(this, arguments)) : o.apply(this, arguments)
						};
						var s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
						Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
							get: function() {
								var e = s.get.apply(this);
								return "" === e.type ? e : c(this, e)
							}
						}), e.RTCPeerConnection.prototype.removeTrack = function(e) {
							var t, r = this;
							if("closed" === r.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
							if(!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
							if(!(e._pc === r)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
							r._streams = r._streams || {}, Object.keys(r._streams).forEach(function(n) {
								r._streams[n].getTracks().find(function(t) {
									return e.track === t
								}) && (t = r._streams[n])
							}), t && (1 === t.getTracks().length ? r.removeStream(r._reverseStreams[t.id]) : t.removeTrack(e.track), r.dispatchEvent(new Event("negotiationneeded")))
						}
					}

					function c(e, t) {
						var r = t.sdp;
						return Object.keys(e._reverseStreams || []).forEach(function(t) {
							var n = e._reverseStreams[t],
								i = e._streams[n.id];
							r = r.replace(new RegExp(i.id, "g"), n.id)
						}), new RTCSessionDescription({
							type: t.type,
							sdp: r
						})
					}
				},
				shimPeerConnection: function(e) {
					var t = n.detectBrowser(e);
					if(e.RTCPeerConnection) {
						var r = e.RTCPeerConnection;
						e.RTCPeerConnection = function(e, t) {
							if(e && e.iceServers) {
								for(var i = [], a = 0; a < e.iceServers.length; a++) {
									var o = e.iceServers[a];
									!o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (n.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, i.push(o)) : i.push(e.iceServers[a])
								}
								e.iceServers = i
							}
							return new r(e, t)
						}, e.RTCPeerConnection.prototype = r.prototype, Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
							get: function() {
								return r.generateCertificate
							}
						})
					} else e.RTCPeerConnection = function(t, r) {
						return i("PeerConnection"), t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy), new e.webkitRTCPeerConnection(t, r)
					}, e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype, e.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
						get: function() {
							return e.webkitRTCPeerConnection.generateCertificate
						}
					});
					var a = e.RTCPeerConnection.prototype.getStats;
					e.RTCPeerConnection.prototype.getStats = function(e, t, r) {
						var n = this,
							i = arguments;
						if(arguments.length > 0 && "function" == typeof e) return a.apply(this, arguments);
						if(0 === a.length && (0 === arguments.length || "function" != typeof arguments[0])) return a.apply(this, []);
						var o = function(e) {
								var t = {};
								return e.result().forEach(function(e) {
									var r = {
										id: e.id,
										timestamp: e.timestamp,
										type: {
											localcandidate: "local-candidate",
											remotecandidate: "remote-candidate"
										}[e.type] || e.type
									};
									e.names().forEach(function(t) {
										r[t] = e.stat(t)
									}), t[r.id] = r
								}), t
							},
							s = function(e) {
								return new Map(Object.keys(e).map(function(t) {
									return [t, e[t]]
								}))
							};
						if(arguments.length >= 2) {
							return a.apply(this, [function(e) {
								i[1](s(o(e)))
							}, arguments[0]])
						}
						return new Promise(function(e, t) {
							a.apply(n, [function(t) {
								e(s(o(t)))
							}, t])
						}).then(t, r)
					}, t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
						var r = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							var e = arguments,
								t = this,
								n = new Promise(function(n, i) {
									r.apply(t, [e[0], n, i])
								});
							return e.length < 2 ? n : n.then(function() {
								e[1].apply(null, [])
							}, function(t) {
								e.length >= 3 && e[2].apply(null, [t])
							})
						}
					}), t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
						var r = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							var e = this;
							if(arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
								var t = 1 === arguments.length ? arguments[0] : void 0;
								return new Promise(function(n, i) {
									r.apply(e, [n, i, t])
								})
							}
							return r.apply(this, arguments)
						}
					}), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
						var r = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments)
						}
					});
					var o = e.RTCPeerConnection.prototype.addIceCandidate;
					e.RTCPeerConnection.prototype.addIceCandidate = function() {
						return arguments[0] ? o.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
					}
				}
			};
		e.exports = {
			shimMediaStream: a.shimMediaStream,
			shimOnTrack: a.shimOnTrack,
			shimAddTrackRemoveTrack: a.shimAddTrackRemoveTrack,
			shimGetSendersWithDtmf: a.shimGetSendersWithDtmf,
			shimSourceObject: a.shimSourceObject,
			shimPeerConnection: a.shimPeerConnection,
			shimGetUserMedia: r(287)
		}
	}, function(e, t, r) {
		"use strict";
		var n = r(68);
		e.exports = function(e, t) {
			var i = e && e.window,
				a = {
					shimChrome: !0,
					shimFirefox: !0,
					shimEdge: !0,
					shimSafari: !0
				};
			for(var o in t) hasOwnProperty.call(t, o) && (a[o] = t[o]);
			var s = n.log,
				c = n.detectBrowser(i),
				u = {
					browserDetails: c,
					extractVersion: n.extractVersion,
					disableLog: n.disableLog,
					disableWarnings: n.disableWarnings
				},
				d = r(288) || null,
				l = r(286) || null,
				f = r(282) || null,
				p = r(280) || null,
				h = r(279) || null;
			switch(c.browser) {
				case "chrome":
					if(!d || !d.shimPeerConnection || !a.shimChrome) return s("Chrome shim is not included in this adapter release."), u;
					s("adapter.js shimming chrome."), u.browserShim = d, h.shimCreateObjectURL(i), d.shimGetUserMedia(i), d.shimMediaStream(i), d.shimSourceObject(i), d.shimPeerConnection(i), d.shimOnTrack(i), d.shimAddTrackRemoveTrack(i), d.shimGetSendersWithDtmf(i), h.shimRTCIceCandidate(i);
					break;
				case "firefox":
					if(!f || !f.shimPeerConnection || !a.shimFirefox) return s("Firefox shim is not included in this adapter release."), u;
					s("adapter.js shimming firefox."), u.browserShim = f, h.shimCreateObjectURL(i), f.shimGetUserMedia(i), f.shimSourceObject(i), f.shimPeerConnection(i), f.shimOnTrack(i), f.shimRemoveStream(i), h.shimRTCIceCandidate(i);
					break;
				case "edge":
					if(!l || !l.shimPeerConnection || !a.shimEdge) return s("MS edge shim is not included in this adapter release."), u;
					s("adapter.js shimming edge."), u.browserShim = l, h.shimCreateObjectURL(i), l.shimGetUserMedia(i), l.shimPeerConnection(i), l.shimReplaceTrack(i);
					break;
				case "safari":
					if(!p || !a.shimSafari) return s("Safari shim is not included in this adapter release."), u;
					s("adapter.js shimming safari."), u.browserShim = p, h.shimCreateObjectURL(i), p.shimRTCIceServerUrls(i), p.shimCallbacksAPI(i), p.shimLocalStreamsAPI(i), p.shimRemoteStreamsAPI(i), p.shimTrackEventTransceiver(i), p.shimGetUserMedia(i), p.shimCreateOfferLegacy(i), h.shimRTCIceCandidate(i);
					break;
				default:
					s("Unsupported browser!")
			}
			return u
		}
	}, function(e, t, r) {
		"use strict";
		(function(t) {
			var n = r(289);
			e.exports = n({
				window: t.window
			})
		}).call(this, r(30))
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(121);
		Object.defineProperty(t, "AbstractWebRTC", {
			enumerable: !0,
			get: function() {
				return n.AbstractWebRTC
			}
		});
		var i = r(181);
		Object.defineProperty(t, "RELEASE_VERSION_MAP", {
			enumerable: !0,
			get: function() {
				return i.RELEASE_VERSION_MAP
			}
		}), Object.defineProperty(t, "isMatchVersion", {
			enumerable: !0,
			get: function() {
				return i.isMatchVersion
			}
		}), Object.defineProperty(t, "maxVersion", {
			enumerable: !0,
			get: function() {
				return i.maxVersion
			}
		});
		var a = r(277);
		Object.defineProperty(t, "WebRTCBuilder", {
			enumerable: !0,
			get: function() {
				return a.WebRTCBuilder
			}
		});
		var o = r(180);
		Object.defineProperty(t, "WebRTC4ChromeRelease", {
			enumerable: !0,
			get: function() {
				return o.WebRTC4ChromeRelease
			}
		});
		var s = r(179);
		Object.defineProperty(t, "WebRTC4FirefoxRelease", {
			enumerable: !0,
			get: function() {
				return s.WebRTC4FirefoxRelease
			}
		});
		var c = r(178);
		Object.defineProperty(t, "WebRTC4SafariRelease", {
			enumerable: !0,
			get: function() {
				return c.WebRTC4SafariRelease
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCBusiness = void 0;
		var n = l(r(1)),
			i = l(r(4)),
			a = l(r(3)),
			o = l(r(2)),
			s = r(122),
			c = l(r(21)),
			u = r(291),
			d = (function(e) {
				if(e && e.__esModule) return e;
				var t = {};
				if(null != e)
					for(var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
				t.default = e
			}(r(110)), r(22));

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = r(8),
			p = f.info.nrtcSdkVersion,
			h = f.info.version,
			m = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this.adapterRef = null, this.sdkRef = null, this.selfWebRtcInstance = null, this.remoteWebRtcInstanceMap = {}
					}
				}, {
					key: "_createWebRTCInstance",
					value: function(e) {
						return new u.WebRTCBuilder({
							imInfo: this.adapterRef.imInfo,
							adapterRef: this.adapterRef,
							targetUid: e,
							platformName: c.default.name,
							platformVersion: c.default.version
						}).build()
					}
				}, {
					key: "createSelfWebRTCInstance",
					value: function() {
						var e = this._createWebRTCInstance(this.adapterRef.imInfo.uid);
						return this.selfWebRtcInstance = e, this._bindWebRTCEvent(e), e
					}
				}, {
					key: "_destroyRtcSelf",
					value: function() {
						var e = this.selfWebRtcInstance;
						e ? (e.close(), this.selfWebRtcInstance = null) : WEBRTCLOG.warn("local rtc 为空，已被提前关闭")
					}
				}, {
					key: "_destroyRtcByUid",
					value: function(e) {
						var t = this.remoteWebRtcInstanceMap[e];
						t ? (t.close(), clearInterval(t.reConnectTimer), delete this.remoteWebRtcInstanceMap[e]) : WEBRTCLOG.warn("remote rtc 为空，已被提前关闭")
					}
				}, {
					key: "createRemoteWebRTCInstance",
					value: function(e) {
						var t = this._createWebRTCInstance(e);
						return this.remoteWebRtcInstanceMap[e] = t, this._bindWebRTCEvent(t), t
					}
				}, {
					key: "_bindWebRTCEvent",
					value: function(e) {
						e.on("ready", this._handleReadyEvent4WebRTC.bind(this)), e.on("iceCandidate", this._handleIceCandidateEvent4WebRTC.bind(this)), e.on("iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.on("negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.on("iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.on("iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.on("getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
					}
				}, {
					key: "_unbindWebRTCEvent",
					value: function(e) {
						e.removeListener("ready", this._handleReadyEvent4WebRTC.bind(this)), e.removeListener("iceCandidate", this._handleIceCandidateEvent4WebRTC.bind(this)), e.removeListener("iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.removeListener("negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.removeListener("iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.removeListener("iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.removeListener("getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
					}
				}, {
					key: "_handleReadyEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleReadyEvent4WebRTC event: %o", e)
					}
				}, {
					key: "_handleIceCandidateEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleIceCandidateEvent4WebRTC event: %o", e);
						var t = e.uid,
							r = e.ice;
						/\d tcp \d/gi.test(r.candidate) ? WEBRTCLOG.warn("tcp candidate 忽略 ") : this.adapterRef.instance._getWebRTCGateWayManager().doSendIceOffer({
							params: {
								dst_id: t,
								content: r
							}
						})
					}
				}, {
					key: "_handleIceCompletedEvent4WebRTC",
					value: function(e) {
						if(WEBRTCLOG.log("WebRTCBusiness:_handleIceCompletedEvent4WebRTC event: ", e), e) {
							var t = e;
							WEBRTCLOG.log("确保是拉流的updata sdp 触发的");
							var r = this.getRtcObject(t),
								n = this.adapterRef.instance._getVideoHelperByUid(t);
							if(n && r && r.rtcConnection && r.rtcConnection.remoteDescription && r.rtcConnection.remoteDescription.sdp) {
								var i = r.rtcConnection.remoteDescription.sdp;
								if(n.checkRemoteTrack(t, i, r.rtcConnection) && (WEBRTCLOG.log("视频需要检查远程轨道"), n.delayVideoShow(t, !0), n.remoteVideoStream)) {
									var a = n.remoteVideoStream.getVideoTracks()[0];
									this.adapterRef.instance.emit(d.RTC_EVENTS.remoteTrack.key, {
										account: this.adapterRef.instance._getAccountByUid(t),
										uid: t,
										track: a
									})
								}
							}
						}
					}
				}, {
					key: "_handleNegotiationNeededEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleNegotiationNeededEvent4WebRTC event: %o", e)
					}
				}, {
					key: "_handleIceStateChangeEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleIceStateChange4WebRTC event: ", e);
						var t = e.rtc,
							r = e.state,
							n = t.targetUid;
						if("connected" === r && n == this.adapterRef.imInfo.uid && this.adapterRef.instance.emit("sessionConnected"), "connected" !== r && "completed" !== r || (t && t.reConnectTimer && (WEBRTCLOG.warn("下行重连成功: ", n), clearInterval(t.reConnectTimer), t.reConnectTimer = null), this._doSdpUpdata(t)), "failed" === r) {
							if(WEBRTCLOG.error("ICE 连接失败: ", n), n == this.adapterRef.imInfo.uid || this.adapterRef.instance._isFirefox()) return void this._doIceFail4Self();
							this._doIceFail4Remote(n)
						}
					}
				}, {
					key: "_handleIceCandidateTimeOutEvent4WebRTC",
					value: function(e) {
						var t = e.rtc,
							r = e.state;
						"completed" !== r && "connected" !== r && "closed" !== r && t && (WEBRTCLOG.log("WebRTCBusiness:_handleGetRemoteStreamEvent4WebRTC event: %o", "中继连接失败开始直连"), "WebRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] ? this.adapterRef.imInfo.serverMap.relayaddrs = null : "NRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] && (this.adapterRef.imInfo.relayaddrs = null), t.close(), t._resetPeerTimeOut(), t._init(), t.targetUid == this.adapterRef.imInfo.uid ? this.adapterRef.instance.judgeSendSdpOfferOrUpdate() : this.adapterRef.webrtcBusiness._createOffer({
							rtc: t
						}))
					}
				}, {
					key: "_handleGetRemoteStreamEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleGetRemoteStreamEvent4WebRTC event: %o", e);
						var t = e.uid,
							r = e.stream,
							n = e.track;
						t ? this.adapterRef.instance._doRemoteStream(r, t, n) : WEBRTCLOG.error("未找到远程流的UID...")
					}
				}, {
					key: "_doSdpUpdata",
					value: function(e) {
						var t = e.rtcConnection;
						WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata");
						var r = t.getSenders();
						if(e.targetUid == this.adapterRef.imInfo.uid && r && r.length > 0)
							if(r[0].track && r[1].track) WEBRTCLOG.log(" --\x3e media type: %s %s", r[0].track.kind, r[1].track.kind);
							else {
								if(!this.adapterRef.instance._isPlayer()) return;
								var n = [],
									i = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
									a = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
									o = i.getLocalAudioStream(),
									s = a.getLocalVideoStream();
								o && n.push(o), s && n.push(s), 2 == n.length && (WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata 上行需要进行sdp协商!"), this.selfWebRtcInstance.updateStream(n), this._createOffer({
									rtc: e
								}))
							}
						else WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata isNeedUpdataSdp: ", e), e.isNeedUpdataSdp && (WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata 下行(%s)需要进行sdp协商!", e.targetUid), e.isNeedUpdataSdp = !1, this._createOffer({
							rtc: e
						}))
					}
				}, {
					key: "_doIceFail4Self",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness: _doIceFail4Self 自己断开，_onSignalTimeout 开始重连!"), this.adapterRef.reconnectState.isReconnect = !0, this.adapterRef.instance._onSignalTimeout()
					}
				}, {
					key: "_doIceFail4Remote",
					value: function(e) {
						var t = this;
						WEBRTCLOG.log("WebRTCBusiness:_doIceFail4Remote (%s）断开连接了，现在开始进行下行第一次重连...", e);
						var r = this.getRtcObject(e);
						r ? (r.reConnectTimer = setInterval(function() {
							WEBRTCLOG.warn("(%s)下行第%s重连结束, state: ", e, r.count, r.rtcConnection.iceConnectionState), "connected" != r.rtcConnection.iceConnectionState && "completed" != r.rtcConnection.iceConnectionState && "closed" != r.rtcConnection.iceConnectionState ? (r.count > 2 && (clearInterval(r.reConnectTimer), WEBRTCLOG.warn("(%s)连接失败，现在清除该下行重连...", e), t.adapterRef.instance.emit("remoteSignalClosed", e), t.adapterRef.instance.doClearAfterRemoteLeave(e)), r.count++, t._createOffer({
								rtc: r
							})) : clearInterval(r.reConnectTimer)
						}, 15e3), r.count = 0, r.count++, this._createOffer({
							rtc: r
						})) : WEBRTCLOG.error("WebRTCBusiness:_doIceFail4Remote 不存在的远程rtc对象")
					}
				}, {
					key: "getRtcObject",
					value: function(e) {
						var t = null;
						return t = e == this.adapterRef.imInfo.uid ? this._getSelfWebRtcInstance() : this._getRemoteWebRtcInstance(e), WEBRTCLOG.log("WebRTCBusiness:getRtcObject %s, uid=%s, rtc=%o", e == this.adapterRef.imInfo.uid ? "上行" : "下行", e, t), t
					}
				}, {
					key: "_hasAudio",
					value: function() {
						return this.adapterRef.deviceBusiness.hasAudio(this.adapterRef.deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef.state.audioDeviceHasOpened, this.adapterRef.imInfo.role)
					}
				}, {
					key: "_hasVideo",
					value: function() {
						return this.adapterRef.deviceBusiness.hasVideo(this.adapterRef.deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef.state.videoDeviceHasOpened, this.adapterRef.state.chromeScreenShareOpened, this.adapterRef.imInfo.role)
					}
				}, {
					key: "_getSelfWebRtcInstance",
					value: function() {
						return this.selfWebRtcInstance
					}
				}, {
					key: "_getRemoteWebRtcInstance",
					value: function(e) {
						return this.remoteWebRtcInstanceMap[e]
					}
				}, {
					key: "_startRTCIfHasDeviceOpened",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:_startRTCIfHasDeviceOpened 如果有本地设备启用则初始化rtc"), (this._hasAudio() || this._hasVideo()) && this._initWebRTCInstance4Self(!1, !0)
					}
				}, {
					key: "_initWebRTCInstance4Self",
					value: function() {
						arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
						var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
						if(WEBRTCLOG.log("WebRTCBusiness:_initWebRTCInstance4Self 初始化WebRTC流程管理器 ..."), this.selfWebRtcInstance) return WEBRTCLOG.log("WebRTCBusiness:_initWebRTCInstance4Self 已初始流程管理器，只更新流"), void(e && (this._updateRtcStream(), this._startRtc(!0)));
						this.createSelfWebRTCInstance(), e && (this._updateRtcStream(), this._startRtc(!0))
					}
				}, {
					key: "_updateRtcStream",
					value: function() {
						if(WEBRTCLOG.log("WebRTCBusiness:_updateRtcStream 更新流到RTC中"), this.selfWebRtcInstance) {
							var e = [];
							if(this.adapterRef.instance._isPlayer()) {
								var t = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
									r = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
									n = t.getLocalAudioStream(),
									i = r.getLocalVideoStream();
								n && e.push(n), i && e.push(i)
							}
							this.selfWebRtcInstance.updateStream(e)
						} else WEBRTCLOG.error("WebRTCBusiness:_updateRtcStream 自己的上行webrtc流程管理器实例未创建，无法更新流")
					}
				}, {
					key: "_startRtc",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
						return this._createOffer({
							isUpdate: t
						}).then(function() {
							return new Promise(function(t, r) {
								e.once("sessionConnected", function(r) {
									WEBRTCLOG.log("WebRTCBusiness:_startRtc ===== RTC连接成功...."), e.adapterRef.state.rtcConnected = !0, e.adapterRef.instance._setSessionConfig({
										rtcEndTime: Date.now()
									}), t(r)
								}), e.once("rtcConnectError", function(e) {
									WEBRTCLOG.error("WebRTCBusiness:_startRtc ===== RTC连接失败..."), r(e)
								})
							})
						}).catch(function(e) {
							return WEBRTCLOG.error("WebRTCBusiness:_startRtc 发起上行流失败 error=%o", e), Promise.reject(e)
						})
					}
				}, {
					key: "_createOffer",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							r = t.isUpdate,
							n = void 0 !== r && r,
							i = t.rtc,
							a = void 0 === i ? this.selfWebRtcInstance : i;
						return WEBRTCLOG.log("WebRTCBusiness:_createOffer isUpdate=%o", n), a.createOffer().then(function(e) {
							return WEBRTCLOG.log("WebRTCBusiness:_createOffer, 开始设置本地描述..."), a.setLocalDescription(e, n)
						}).then(function(t) {
							WEBRTCLOG.log("WebRTCBusiness:_createOffer 本地描述设置成功 ");
							var r = a.targetUid == e.adapterRef.imInfo.uid,
								i = e.adapterRef.imInfo,
								o = e.adapterRef.imInfo.videoConfig,
								s = e.adapterRef.imInfo.sessionConfig,
								c = {
									params: {
										version: +p,
										token: i.token || i.cid + "",
										user_type: i.token ? 3 : 2,
										user_token_type: 0,
										content: t,
										dst_id: r ? i.uid : a.targetUid,
										is_multi_peerconnection: !0,
										sdk_version: h
									}
								};
							if(r) {
								var u = e._hasAudio(),
									d = e._hasVideo();
								WEBRTCLOG.log("WebRTCBusiness:_createOffer  hasAudio: %s, hasVideo: %s ", u, d), c.hasAudio = u, c.hasVideo = d, c.params.streamSetting = {
									video: {
										width: e.adapterRef.state.chromeScreenShareOpened ? 1280 : o.width,
										height: e.adapterRef.state.chromeScreenShareOpened ? 720 : o.height,
										frameRate: e.adapterRef.state.chromeScreenShareOpened ? 5 : s.liveEnable && o.frameRate > 15 ? 15 : o.frameRate
									}
								}
							}
							n ? e.adapterRef.instance._getWebRTCGateWayManager().doSendSdpUpdate(c) : e.adapterRef.instance._getWebRTCGateWayManager().doSendSdpOffer(c)
						})
					}
				}, {
					key: "doClientJoin",
					value: function(e) {
						if(WEBRTCLOG.log("AbstractAdapter: _onclient_join: ===== 人员加入，创建下行流..."), this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(e)) return WEBRTCLOG.log("AbstractAdapter: _onclient_join: 已存在远程rtc实例，即将执行_onclient_update"), this.doClientUpdate(e, !0);
						var t = this.adapterRef.webrtcBusiness.createRemoteWebRTCInstance(e),
							r = this.adapterRef.instance._getAudioHelperByUid(e),
							n = this.adapterRef.instance._getVideoHelperByUid(e);
						n.setVideoContainer(this.adapterRef.remoteContainer), n.isJoined = !0, n.setRTC(t), r.setRTC(t), this._createOffer({
							rtc: t
						})
					}
				}, {
					key: "doClientUpdate",
					value: function(e, t) {
						if(WEBRTCLOG.log("WebRTCBusiness:doClientUpdate uid=%o, hasVideo=%o", e, t), !this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(e)) return WEBRTCLOG.log("WebRTCBusiness: doClientUpdate: 不存在远程rtc实例，即将执行doClientJoin"), this.doClientJoin(e);
						var r = this.getRtcObject(e);
						r ? 1 == t ? r.rtcConnection && r.rtcConnection.localDescription && r.rtcConnection.iceConnectionState && "connected" !== r.rtcConnection.iceConnectionState && "completed" !== r.rtcConnection.iceConnectionState ? (WEBRTCLOG.warn("create rtc later"), r.isNeedUpdataSdp = !0) : this._createOffer({
							rtc: r
						}) : this.adapterRef.instance._getVideoHelperByUid(e).delayVideoShow(e, t) : WEBRTCLOG.error("WebRTCBusiness:doClientUpdate 不存在的远程rtc对象")
					}
				}, {
					key: "switchTrackEvent",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = e.stream,
							r = e.uid,
							n = e.bindTrackEvent,
							i = void 0 === n || n;
						WEBRTCLOG.log("WebRTCBusiness:switchTrackEvent stream=%o, uid=%o, bindTrackEvent=%o", t, r, i), t && r ? i ? this._doBindTrackEvent(e) : this._doUnBindTrackEvent(e) : WEBRTCLOG.error("WebRTCBusiness:switchTrackEvent 不存在的流或uid")
					}
				}, {
					key: "_doUnBindTrackEvent",
					value: function(e) {
						var t = e.stream,
							r = e.uid;
						WEBRTCLOG.log("WebRTCBusiness:_doUnBindTrackEvent 解绑轨道事件 stream=%o, uid=%o", t, r), t.onaddtrack = null, t.onremovetrack = null
					}
				}, {
					key: "_doBindTrackEvent",
					value: function(e) {
						var t = e.stream,
							r = e.uid;
						WEBRTCLOG.log("WebRTCBusiness:_doBindTrackEvent 绑定轨道事件 stream=%o, uid=%o", t, r), t && r ? (t.onaddtrack || this._doRegisterAddTrackEvent(t, r), t.onremovetrack || this._doRegisterRemoveTrackEvent(t, r)) : WEBRTCLOG.error("WebRTCBusiness:_doBindTrackEvent 不存在的流对象或uid")
					}
				}, {
					key: "_doRegisterAddTrackEvent",
					value: function(e, t) {
						var r = this;
						WEBRTCLOG.log("WebRTCBusiness:_doRegisterAddTrackEvent 添加轨道添加事件 stream=%o, uid=%o", e, t), e.onaddtrack = function(e) {
							r.adapterRef.instance.emit(d.RTC_EVENTS.addTrack.key, e), WEBRTCLOG.log("stream 添加轨道添加事件: ", e);
							var n = e.track;
							if("audio" == n.kind) return r.adapterRef.instance._getAudioHelperByUid(t).composeTrack(t, n), void WEBRTCLOG.warn("WebRTCBusiness:_doRegisterAddTrackEvent 非video直接返回...");
							var i = r.adapterRef.instance._getVideoHelperByUid(t);
							i.composeTrack(t, n), i.setIsRemote(!0);
							var a = r.getRtcObject(t);
							if(r.adapterRef.instance.emit(d.RTC_EVENTS.remoteTrack.key, {
									account: r.adapterRef.instance._getAccountByUid(t),
									uid: t,
									track: n
								}), a.rtcConnection && a.rtcConnection.remoteDescription && a.rtcConnection.remoteDescription.sdp) {
								var o = a.rtcConnection.remoteDescription.sdp;
								i.checkRemoteTrack(t, o)
							}
							i.delayVideoShow(t)
						}
					}
				}, {
					key: "_doRegisterRemoveTrackEvent",
					value: function(e, t) {
						var r = this;
						WEBRTCLOG.log("WebRTCBusiness:_doRegisterRemoveTrackEvent 删除轨道事件 stream=%o, uid=%o", e, t), e.onremovetrack = function(e) {
							var n = e.track.kind;
							if(r.adapterRef.instance.emit(d.RTC_EVENTS.removeTrack.key, e), "audio" !== n) {
								var i = r.adapterRef.instance._getVideoHelperByUid(t);
								i.remoteVideoStream && i.hide()
							} else WEBRTCLOG.warn("WebRTCBusiness:_doRegisterRemoveTrackEvent 非video直接返回...")
						}
					}
				}, {
					key: "_switchRole",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:_switchRole ");
						var e = this.adapterRef.instance._getWebRTCGateWayManager();
						return e && e.state.hasLogined ? this.adapterRef.instance._updateRtc(!0) : (WEBRTCLOG.error("WebRTCBusiness:_switchRole 网关未登录"), Promise.resolve())
					}
				}, {
					key: "_enableDevice",
					value: function(e) {
						return WEBRTCLOG.log("WebRTCBusiness:_enableDevice 设备解禁"), this._switchDeviceTrackStatus(e, !0), Promise.resolve()
					}
				}, {
					key: "_disableDevice",
					value: function(e) {
						return WEBRTCLOG.log("WebRTCBusiness:_disableDevice 设备禁用"), this._switchDeviceTrackStatus(e, !1), Promise.resolve()
					}
				}, {
					key: "_switchDeviceTrackStatus",
					value: function(e, t) {
						var r = [];
						if(e === d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
							var n = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
							n.localAudioStream && (r = n.localAudioStream.getTracks())
						} else {
							var i = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
							i.localVideoStream && (r = i.localVideoStream.getTracks())
						}
						r.map(function(e) {
							e.enabled = t
						})
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:destroy"), this.selfWebRtcInstance && (this._unbindWebRTCEvent(this.selfWebRtcInstance), this.selfWebRtcInstance.destroy(), this.selfWebRtcInstance = null);
						var e = this.remoteWebRtcInstanceMap;
						for(var t in e) {
							var r = e[t];
							r && (this._unbindWebRTCEvent(r), r.destroy(), r = null)
						}
					}
				}]), t
			}(s.AbstractBusiness);
		t.WebRTCBusiness = m
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DeviceBusiness = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(125),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), r._initMediaDeviceHelper(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null, this.mediaDeviceHelper = null
				}
			}, {
				key: "_initMediaDeviceHelper",
				value: function() {
					WEBRTCLOG.log("DeviceBusiness:_initMediaDeviceHelper 初始化媒体设备管理器 ..."), this.mediaDeviceHelper ? WEBRTCLOG.warn("DeviceBusiness:_initMediaDeviceHelper 已存在的MediaDeviceHelper实例，不重复创建...") : (this.mediaDeviceHelper = new s.MediaDeviceHelper, this._bindDeviceEvent())
				}
			}, {
				key: "_bindDeviceEvent",
				value: function() {
					this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceAdd.key, this._onDeviceAdd.bind(this)), this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceRemove.key, this._onDeviceRemove.bind(this)), this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceStatus.key, this._onDeviceStatus.bind(this))
				}
			}, {
				key: "_unbindDeviceEvent",
				value: function() {
					this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceAdd.key, this._onDeviceAdd.bind(this)), this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceRemove.key, this._onDeviceRemove.bind(this)), this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceStatus.key, this._onDeviceStatus.bind(this))
				}
			}, {
				key: "_onDeviceAdd",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceAdd ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceAdd.key, e)
				}
			}, {
				key: "_onDeviceRemove",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceRemove ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceRemove.key, e)
				}
			}, {
				key: "_onDeviceStatus",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceStatus ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceStatus.key, e)
				}
			}, {
				key: "hasAudio",
				value: function(e, t, r) {
					return WEBRTCLOG.log("DeviceBusiness:hasAudio 检测是否有音频, deviceStatus=%o, audioDeviceHasOpened=%o, role=%o", e, t, r), e.hasAudioDevice && t && r === c.ROLE_FOR_MEETING.ROLE_PLAYER
				}
			}, {
				key: "hasVideo",
				value: function(e, t, r, n) {
					return WEBRTCLOG.log("DeviceBusiness:hasVideo 检测是否有视频, deviceStatus=%o, videoDeviceHasOpened=%o, chromeScreenShareOpened=%o, role=%o", e, t, r, n), r || e.hasVideoDevice && t && n === c.ROLE_FOR_MEETING.ROLE_PLAYER
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("DeviceBusiness:destroy "), this.mediaDeviceHelper && (this._unbindDeviceEvent(), this.mediaDeviceHelper.destroy(), this.mediaDeviceHelper = null)
				}
			}]), t
		}(r(122).AbstractBusiness);
		t.DeviceBusiness = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WhiteBoardGateWayBusiness = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));
		r(125);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
			}
			return(0, a.default)(t, e), t
		}(r(9).EventEmitter);
		t.WhiteBoardGateWayBusiness = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayBusiness = void 0;
		var n = f(r(1)),
			i = f(r(4)),
			a = f(r(3)),
			o = f(r(2)),
			s = r(125),
			c = r(122),
			u = f(r(21)),
			d = r(157),
			l = r(22);

		function f(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = r(8),
			h = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this.adapterRef = null, this.sdkRef = null, this.webRTCGateWayManager = null
					}
				}, {
					key: "_onWaitForWssocket",
					value: function() {
						var e = this;
						return WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 等待连接"), new Promise(function(t, r) {
							if(WEBRTCLOG.log("_onWaitForWssocket startReconnect: ", e.adapterRef.reconnectState.startReconnect), !e.adapterRef.reconnectState.startReconnect)
								if(e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket wss已经连接成功");
								else {
									var n = 0;
									e.adapterRef.reconnectState.wssTime = setInterval(function() {
										n++ > 450 && (WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket wss连接超时"), n = 0, r("wss connect timeout")), e.adapterRef.webrtcGateWayBusiness, e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined ? (WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 连接成功, wssTime: ", e.adapterRef.reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.wssTime = null, t(e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager)) : e.adapterRef.reconnectState.isStoped && (WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 连接失败, wssTime: ", e.adapterRef.reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.wssTime = null, e.adapterRef.reconnectState.isStoped = !1, r("wss connect timeout"))
									}, 200)
								}
						})
					}
				}, {
					key: "doTryInit",
					value: function() {
						var e = this.adapterRef.imInfo,
							t = e.serverMap,
							r = void 0 === t ? {} : t,
							n = e.wssArr;
						if(WEBRTCLOG.log("WebRTCGateWayBusiness:doTryInit serverMap=%o, wssArr=%o", r, n), n = n || r.webrtcarry || [r.webrtc], WEBRTCLOG.log("合并后的wssArr=%o", n), !n || 0 === n.length) {
							var i = "无可用的网关地址(如果当前应用是WebRTC音视频, 请确保对方打开了WebRTC兼容开关)";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:doTryInit msg=%s", i), Promise.reject(i)
						}
						return this._initWebRTCGateWayManager({
							url: n[0],
							context: this._transform2WebRTCGateWayContext(this.adapterRef.imInfo),
							keepAliveInterval4Second: 5
						}), this._onWaitForWssocket()
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCGateWayBusiness:destroy");
						var e = this.webRTCGateWayManager;
						e && (this._unbindWebRTCGateWayManagerEvent(e), e.state.hasLogined ? e.doSendLogout({
							params: {
								content: {
									timestamp: Date.now()
								}
							}
						}) : WEBRTCLOG.warn("WebRTCGateWayBusiness:destroy, 没有login，无需logout"), e.destroy(), e = null)
					}
				}, {
					key: "_initWebRTCGateWayManager",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_initWebRTCGateWayManager 初始化网关管理器 ...");
						var t = e.url,
							r = e.context,
							n = e.keepAliveInterval4Second;
						if(null != this.webRTCGateWayManager) {
							var i = "网关管理器【已初始化】，不需要重复操作";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:_initWebRTCGateWayManager msg=%s", i), Promise.reject(i)
						}
						if(null != this.webRTCGateWayManager && this.webRTCGateWayManager.state.hasLogined) {
							var a = "网关管理器【已登录】，不需要重复操作";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:_initWebRTCGateWayManager msg=%s", a), Promise.reject(a)
						}
						this.webRTCGateWayManager = new s.WebRTCGateWayManager({
							url: t,
							context: r,
							keepAliveInterval4Second: n
						}), this._bindWebRTCGateWayManagerEvent(this.webRTCGateWayManager)
					}
				}, {
					key: "_bindWebRTCGateWayManagerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_bindWebRTCGateWayManagerEvent 网关管理器事件绑定 ..."), e.on("error", this._handleErrorEvent.bind(this)), e.on("close", this._handleCloseEvent.bind(this)), e.on("login", this._handleLoginEvent.bind(this)), e.on("sdpAnswer", this._handleSdpAnswerEvent.bind(this)), e.on("iceAnswer", this._handleIceAnswerEvent.bind(this)), e.on("userJoin", this._handleUserJoinEvent.bind(this)), e.on("userUpdate", this._handleUserUpdateEvent.bind(this)), e.on("userLeave", this._handleUserLeaveEvent.bind(this)), e.on("clientError", this._handleClentErrorEvent.bind(this))
					}
				}, {
					key: "_unbindWebRTCGateWayManagerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_unbindWebRTCGateWayManagerEvent 网关管理器事件解除绑定 ..."), e.removeListener("error", this._handleErrorEvent.bind(this)), e.removeListener("close", this._handleCloseEvent.bind(this)), e.removeListener("login", this._handleLoginEvent.bind(this)), e.removeListener("sdpAnswer", this._handleSdpAnswerEvent.bind(this)), e.removeListener("iceAnswer", this._handleIceAnswerEvent.bind(this)), e.removeListener("userJoin", this._handleUserJoinEvent.bind(this)), e.removeListener("userUpdate", this._handleUserUpdateEvent.bind(this)), e.removeListener("userLeave", this._handleUserLeaveEvent.bind(this)), e.removeListener("clientError", this._handleClentErrorEvent.bind(this))
					}
				}, {
					key: "_onSignalTimeout",
					value: function() {
						var e = this;
						this.adapterRef.reconnectState.startReconnect ? WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 正在重连中 ...") : (0 == this.adapterRef.reconnectState.count && WEBRTCLOG.warn("webrtcGateWayBusiness： _onSignalTimeout 网络断开了，现在开始重连"), this.adapterRef.reconnectState.isReconnect && (this.adapterRef.instance._stopAllDataUpload(), WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 第 %s 次重连中", this.adapterRef.reconnectState.count + 1), this.adapterRef.instance._resetParamNeededByReConnect(), this.adapterRef.reconnectState.startReconnect = !0, this.adapterRef.instance._startSession(), setTimeout(function() {
							WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout webrtcGateWayBusiness: ", e.adapterRef.webrtcGateWayBusiness), e.adapterRef.reconnectState.startReconnect = !1, e.adapterRef.webrtcGateWayBusiness && 0 == e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined ? (WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 第 %s 次重连不成功", e.adapterRef.reconnectState.count), e.adapterRef.reconnectState.isReconnect = !0, e._onSignalTimeout()) : (e.adapterRef.reconnectState.isReconnect = !1, e.adapterRef.reconnectState.count = 0)
						}, 12e3), this.adapterRef.reconnectState.count++, this.adapterRef.reconnectState.count > 5 && this.adapterRef.webrtcGateWayBusiness && 0 == this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined && (this.adapterRef.reconnectState.isStoped = !0, WEBRTCLOG.log("_onSignalTimeout 重连次数超限，不再重连", this.adapterRef.reconnectState.count), this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ? this.adapterRef.instance.hangup() : this.adapterRef.instance.leaveChannel())))
					}
				}, {
					key: "_handleErrorEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleErrorEvent 网关发生错误，event=%o", e)
					}
				}, {
					key: "_handleCloseEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleCloseEvent 网关关闭，event=%o", e), this.webRTCGateWayManager && this.webRTCGateWayManager.keepAliveTimer && (this.adapterRef && !this.adapterRef.reconnectState.isStoped && this.adapterRef.webrtcGateWayBusiness ? (this.adapterRef.reconnectState.isReconnect = !0, this._onSignalTimeout()) : WEBRTCLOG.warn("_handleErrorEvent 重连次数超限，不再重连"))
					}
				}, {
					key: "_handleLoginEvent",
					value: function(e) {
						if(WEBRTCLOG.log("WebRTCGateWayBusiness:_handleLoginEvent 网关登录结果, event:", e), !e.success) return WEBRTCLOG.warn("登录失败，断开连接"), void this.emit("signalClosed", {
							code: "login-fail",
							error: "登录失败，断开连接"
						});
						1 == this.adapterRef.reconnectState.startReconnect && this.adapterRef.webrtcBusiness && (this.adapterRef.reconnectState.isReconnect = !1, this.adapterRef.reconnectState.count = 0, this.adapterRef.webrtcBusiness._startRTCIfHasDeviceOpened())
					}
				}, {
					key: "_handleSdpAnswerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleSdpAnswerEvent 收到SDP ANSWER (网关） event=%o", e);
						var t = e.success,
							r = e.code,
							n = e.dst_id,
							i = e.type,
							a = e.sdp;
						if(!t) return WEBRTCLOG.error("SDP ANSWER 非200，断开"), void this.emit("signalClosed", {
							code: r,
							error: "服务器验证不通过，断开连接"
						});
						var o = this.adapterRef.webrtcBusiness.getRtcObject(n);
						WEBRTCLOG.log("当前收到SDP answer 的uid=%s, rtc=%o", n, o), o.rtcConnection.signalingState && "have-local-offer" == o.rtcConnection.signalingState && (WEBRTCLOG.log("signalingState: ", o.rtcConnection.signalingState), o.setRemoteDescription({
							type: i,
							sdp: a
						}, "answer"))
					}
				}, {
					key: "_handleIceAnswerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleIceAnswerEvent 收到ICE ANSWER (网关） event=%o", e);
						var t = e.dst_id,
							r = {
								candidate: e.candidate,
								sdpMid: e.sdpMid,
								sdpMLineIndex: e.sdpMLineIndex
							},
							n = this.adapterRef.webrtcBusiness.getRtcObject(t);
						n ? n.addRemoteIceCandidate(r) : WEBRTCLOG.error("不存在rtc对象")
					}
				}, {
					key: "_handleUserJoinEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserJoinEvent 信令网关有人加入通知 event=%o", e);
						var t = e.client_id,
							r = {
								uid: t,
								account: this.adapterRef.instance._getAccountByUid(t),
								channelId: this.adapterRef.imInfo.cid
							};
						"NRTC" === l.CONFIG_MAP.SDK_NAME[l.CONFIG_MAP.CURRENT.SDK_TYPE] && "p2p" === this.adapterRef.imInfo.sessionMode && this.adapterRef.instance.setStartSessionTime(), this.adapterRef.instance.emit("joinChannel", r), this.adapterRef.state.isFirstOpenCamera = !0
					}
				}, {
					key: "_handleUserUpdateEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserUpdateEvent 信令网关有人更新通知 event=%o", e);
						var t = e.client_id,
							r = e.has_audio,
							n = e.has_video;
						this.adapterRef.instance.emit("remoteStreamUpdate", {
							uid: t,
							audio: r,
							video: n
						}), 1 == this.adapterRef.instance._getVideoHelperByUid(t).isJoined ? this.adapterRef.webrtcBusiness.doClientUpdate(t, n) : (r || n) && this.adapterRef.webrtcBusiness.doClientJoin(t)
					}
				}, {
					key: "_handleUserLeaveEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserLeaveEvent %s 离开了...");
						var t = e.uid,
							r = e.logout_type;
						r = "normal" === r ? this.sdkRef.HANGUP_TYPE_NORMAL : this.sdkRef.HANGUP_TYPE_TIMEOUT, "p2p" === this.adapterRef.imInfo.sessionMode ? this.adapterRef.instance.emit("hangup", {
							account: this.adapterRef.instance._getAccountByUid(t) || t,
							channelId: this.adapterRef.imInfo.cid,
							type: 0
						}) : this.adapterRef.instance.emit("leaveChannel", {
							account: this.adapterRef.instance._getAccountByUid(t) || t,
							channelId: this.adapterRef.imInfo.cid
						}), this.adapterRef.instance.doClearAfterRemoteLeave(t)
					}
				}, {
					key: "_handleClentErrorEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleClientErrorEvent 网关反馈错误: ", e);
						var t = e.uid,
							r = e.error_code;
						509 != r && 102 != r && 103 != r && 104 != r && 105 != r && 106 != r || (this.adapterRef.instance.emit("error", {
							code: r,
							desc: "clientError: 请求错误"
						}), this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ? (this.adapterRef.instance.hangup && this.adapterRef.instance.hangup(), this.adapterRef.instance.emit("hangup", {
							channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
							account: this.adapterRef.instance._getAccountByUid(t),
							type: -1
						})) : (this.adapterRef.instance.leaveChannel(), this.adapterRef.instance.emit("leaveChannel", {
							channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
							account: this.adapterRef.instance._getAccountByUid(t)
						})))
					}
				}, {
					key: "_transform2WebRTCGateWayContext",
					value: function(e) {
						var t = Object.assign({}, e),
							r = new s.WebRTCGateWayContext({
								uid: t.uid,
								cid: t.cid,
								hasAudio: !1,
								hasVideo: !1,
								session_mode: t.sessionMode,
								params: {
									content: "",
									dst_id: t.uid,
									user_token_type: 0,
									token: t.token,
									user_type: this.adapterRef.instance.constructor === d.NRTCAdapter ? 3 : 2,
									version: 1,
									is_multi_peerconnection: !0,
									sdk_version: p.info.version,
									streamSetting: {
										video: t.videoConfig
									}
								},
								browser: {
									name: u.default.name,
									version: u.default.version
								},
								bypass_rtmp: {
									is_host: !!t.sessionConfig.rtmpUrl,
									support_bypass_rtmp: t.sessionConfig.liveEnable || !1,
									support_bypass_rtmp_record: t.sessionConfig.rtmpRecord || !1,
									bypass_rtmp_url: t.sessionConfig.rtmpUrl || "",
									layout: t.sessionConfig.layout || "",
									participant_mode: "M-" + t.sessionConfig.splitMode
								},
								record: {
									support_audio_record: t.sessionConfig.recordAudio || !1,
									support_video_record: t.sessionConfig.recordVideo || !1,
									single_record_in_meeting: t.sessionConfig.singleRecord || !1,
									is_host_speaker: t.sessionConfig.isHostSpeaker || !1,
									record_type: t.sessionConfig.recordType || "0"
								}
							});
						return WEBRTCLOG.log("webrtcGateWayContext: ", r), r
					}
				}]), t
			}(c.AbstractBusiness);
		t.WebRTCGateWayBusiness = h
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(295);
		Object.defineProperty(t, "WebRTCGateWayBusiness", {
			enumerable: !0,
			get: function() {
				return n.WebRTCGateWayBusiness
			}
		});
		var i = r(294);
		Object.defineProperty(t, "WhiteBoardGateWayBusiness", {
			enumerable: !0,
			get: function() {
				return i.WhiteBoardGateWayBusiness
			}
		});
		var a = r(293);
		Object.defineProperty(t, "DeviceBusiness", {
			enumerable: !0,
			get: function() {
				return a.DeviceBusiness
			}
		});
		var o = r(292);
		Object.defineProperty(t, "WebRTCBusiness", {
			enumerable: !0,
			get: function() {
				return o.WebRTCBusiness
			}
		});
		var s = r(276);
		Object.defineProperty(t, "IMBusiness", {
			enumerable: !0,
			get: function() {
				return s.IMBusiness
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = l(r(1)),
			i = l(r(4)),
			a = l(r(3)),
			o = l(r(2)),
			s = r(9),
			c = r(22),
			u = r(77),
			d = r(127);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.appKey = r.adapterRef.imInfo.appkey || r.adapterRef.nim.options.appKey, r.statsNew = new u.RtcStatsNew({
					webrtcBusiness: r.adapterRef.webrtcBusiness,
					interval: 1e3
				}), r.statsNew.on("stats", function(e, t) {
					t % 2 == 0 && r._uploadRawDataStats(e), r._uploadFormatDataStats(!1, e, t)
				}), r.formatDataFromStats = new d.FormatDataFromStats({
					appkey: r.appKey
				}), r.rawDataFromStats = new d.RawDataFromStats({
					appkey: r.appKey
				}), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.statsNew = null, this.formatDataFromStats = null, this.rawDataFromStats = null
				}
			}, {
				key: "stopStats",
				value: function() {
					this.statsNew && this.statsNew.stop(), this.formatDataFromStats && this.formatDataFromStats.stop(), this.rawDataFromStats && this.rawDataFromStats.stop()
				}
			}, {
				key: "startStats",
				value: function() {
					this.statsNew.start(), this._uploadRawDataStatsStart(), this._uploadFormatDataStatsStart()
				}
			}, {
				key: "_uploadRawDataStatsStart",
				value: function() {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats.start({
						info: this.adapterRef.imInfo,
						cid: this.adapterRef.imInfo.cid,
						uid: this.adapterRef.imInfo.uid
					})
				}
			}, {
				key: "_uploadRawDataStats",
				value: function(e) {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats.update(e)
				}
			}, {
				key: "_uploadFormatDataStatsStart",
				value: function() {
					this.appKey ? c.CONFIG_MAP.STATS_FUN[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats && this.formatDataFromStats.start({
						controller: this,
						imInfo: this.adapterRef.imInfo,
						sessionConfig: this.adapterRef.imInfo.sessionConfig,
						videoConfig: this.adapterRef.imInfo.videoConfig
					}) : WEBRTCLOG.warn("_uploadFormatDataStatsStart: 不存在appkey， 本次format debug数据未能上报")
				}
			}, {
				key: "_uploadFormatDataStats",
				value: function(e, t, r) {
					if(c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE])
						if(this.appKey) {
							if(this.formatDataFromStats)
								if("volume" !== e) {
									if(this.adapterRef && this.adapterRef.imInfo) {
										var n = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
										n && n.webAudio && this.formatDataFromStats.updateLocalVolumn(n.webAudio.getVolumeData())
									}
									this.formatDataFromStats.update(t, r)
								} else this.formatDataFromStats.updateLocalVolumn(t)
						} else WEBRTCLOG.warn("_uploadFormatDataStats: 不存在appkey， 本次format debug数据未能上报")
				}
			}, {
				key: "uploadFormatDataStatsOnce",
				value: function(e) {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats && this.formatDataFromStats.updateOnce({
						imInfo: e,
						sessionConfig: this.adapterRef.imInfo.sessionConfig,
						videoConfig: videoConfig
					})
				}
			}]), t
		}(s.EventEmitter);
		t.default = f, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = d(r(1)),
			i = d(r(4)),
			a = d(r(3)),
			o = d(r(2)),
			s = r(9),
			c = r(127),
			u = r(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.adapterRef.imInfo && r.adapterRef.imInfo.appkey ? r.appkey = r.adapterRef.imInfo.appkey : r.appkey = r.adapterRef.nim.options.appKey, r.dataApi = new c.ApiInvokeData({
					appkey: r.appkey,
					platform: e.platform
				}), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "uploadDataApi",
				value: function(e, t) {
					u.CONFIG_MAP.STATS_FUN[u.CONFIG_MAP.CURRENT.SDK_TYPE] && this.appkey && ("start" === e && (t.appkey = this.appkey), this.dataApi[e] && this.dataApi[e](t))
				}
			}]), t
		}(s.EventEmitter);
		t.default = l, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(298);
		Object.defineProperty(t, "ApiReportHelper", {
			enumerable: !0,
			get: function() {
				return a(n).default
			}
		});
		var i = r(297);

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "StatsReportHelper", {
			enumerable: !0,
			get: function() {
				return a(i).default
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), r.uid = e.uid || 0, r.adapterRef = e.adapterRef, r._initNode(), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.videoContainerDom = null, this.videoDom = null, this.uid = null, this.containerSize = {
						width: 0,
						height: 0
					}
				}
			}, {
				key: "_initNode",
				value: function() {
					var e = this._initVideoContainer();
					this.videoContainerDom = e;
					var t = this._initVideo();
					this.videoDom = t, e.appendChild(t)
				}
			}, {
				key: "_initVideoContainer",
				value: function() {
					var e = document.createElement("div");
					return e.style.overflow = "hidden", e.style.position = "relative", e.style.width = this.containerSize.width + "px", e.style.height = this.containerSize.height + "px", e.style.display = "inline-block", e
				}
			}, {
				key: "_initVideo",
				value: function() {
					var e = document.createElement("video");
					return e.style.position = "absolute", e.style.left = "50%", e.style.top = "50%", e.style.transform = "translate(-50%,-50%)", e.setAttribute("x-webkit-airplay", "x-webkit-airplay"), e.setAttribute("playsinline", "playsinline"), e.setAttribute("webkit-playsinline", "webkit-playsinline"), e.preload = "auto", e.dataset.uid = this.uid, e.autoplay = "autoplay", e
				}
			}, {
				key: "resize",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
						width: 100,
						height: 100,
						cut: !0
					};
					if(e.cut && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_crop"
						}), this.containerSize = e, this.videoContainerDom.style.width = e.width + "px", this.videoContainerDom.style.height = e.height + "px", !e.cut) return this.videoDom.style.height = "100%", void(this.videoDom.style.width = "100%");
					this.videoDom.videoWidth / this.videoDom.videoHeight > e.width / e.height ? (this.videoDom.style.width = "auto", this.videoDom.style.height = "100%") : (this.videoDom.style.width = "100%", this.videoDom.style.height = "auto")
				}
			}, {
				key: "destory",
				value: function() {
					WEBRTCLOG.log("VideoDomHelper:destroy"), this.videoContainerDom && this.videoDom && this.videoContainerDom.removeChild(this.videoDom), this.videoDom && !this.videoDom.paused && this.videoDom.pause(), this._reset()
				}
			}]), t
		}(r(9).EventEmitter);
		t.default = c, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.VideoHelper = void 0;
		var n = p(r(1)),
			i = p(r(4)),
			a = p(r(3)),
			o = p(r(2)),
			s = r(9),
			c = r(45),
			u = f(r(110)),
			d = f(r(182)),
			l = p(r(300));

		function f(e) {
			if(e && e.__esModule) return e;
			var t = {};
			if(null != e)
				for(var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
			return t.default = e, t
		}

		function p(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var h = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.uid = e.uid, r.poster = e.poster || "", r.videoContainer = e.videoContainer || document.body, r.videoDomHelper = r._createVideoDomHelper(), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.sdkRef = null, this.adapterRef = null, this._resetStateParam()
				}
			}, {
				key: "_resetStateParam",
				value: function() {
					this.isPlaying = !1, this.system = c.RtcSupport.checkVersion(), this.uid = null, this.poster = "", this.rtc = null, this.constraint = {}, this.localVideoStream = null, this.remoteVideoStream = null, this.videoContainer = null, this.videoDomHelper = null, this.webAudio = null
				}
			}, {
				key: "getVideoStream",
				value: function(e, t, r) {
					return this._getVideoStream(e, t, r)
				}
			}, {
				key: "setIsRemote",
				value: function(e) {
					return this.isRemote = e, this
				}
			}, {
				key: "setRemoteVideoStream",
				value: function(e) {
					this.remoteVideoStream = e, this.hide()
				}
			}, {
				key: "setRTC",
				value: function(e) {
					this.rtc = e
				}
			}, {
				key: "setVideoContainer",
				value: function(e) {
					e ? this.videoContainer = e : WEBRTCLOG.error("不存在dom")
				}
			}, {
				key: "updateStream",
				value: function(e) {
					var t = null;
					this.isRemote ? (t = this.remoteVideoStream, this.remoteVideoStream = e) : (t = this.localVideoStream, this.localVideoStream = e), d.removeTrackFromMediaStream(t)
				}
			}, {
				key: "composeTrack",
				value: function(e, t) {
					if(e != this.adapterRef.imInfo.uid)
						if(this.remoteVideoStream && this.remoteVideoStream.getVideoTracks && this.remoteVideoStream.getVideoTracks() > 0 && this.remoteVideoStream.getVideoTracks()[0].id == t.id) WEBRTCLOG.warn("NRTCAdapter:_composeTrack 已经添加过该轨道");
						else {
							var r = new MediaStream;
							r.addTrack(t), this.setRemoteVideoStream(r), WEBRTCLOG.log("NRTCAdapter:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), WEBRTCLOG.log("remoteVideoStream: ", this.remoteVideoStream), this.delayVideoShow(e)
						}
					else WEBRTCLOG.warn("NRTCAdapter:_composeTrack 自己的轨道直接忽略")
				}
			}, {
				key: "delayVideoShow",
				value: function(e) {
					var t = this,
						r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
					WEBRTCLOG.log("VideoHelper:delayVideoShow uid=%o, has_video=%o", e, r), setTimeout(function() {
						t._doDelayVideoShow(e, r)
					}, 100)
				}
			}, {
				key: "_doDelayVideoShow",
				value: function(e) {
					var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
					if(e && e != this.adapterRef.imInfo.uid)
						if(this.remoteVideoStream) {
							if(WEBRTCLOG.log("VideoHelper:_doDelayVideoShow uid=%s, has_video=%s", e, t), !this.adapterRef.instance._isFirefox()) {
								var r = {};
								t && (r = this.checkRemoteTrack(e, this.rtc.sdpAnswer.sdp)), t = r.video
							}!0 === t ? (WEBRTCLOG.log("show..."), this.show()) : (WEBRTCLOG.log("hide..."), this.hide())
						} else WEBRTCLOG.warn("VideoHelper:_doDeplayVideoShow 不存在的远程视频流， 不显示");
					else WEBRTCLOG.warn("VideoHelper:_doDelayVideoShow 自己直接返回， 不显示")
				}
			}, {
				key: "checkRemoteTrack",
				value: function(e, t, r) {
					if(!this.remoteVideoStream) return WEBRTCLOG.warn("不存在远端的对象..."), {};
					if(!this.remoteVideoStream || !this.rtc) return WEBRTCLOG.warn("远程视频流均不存在，或者流程管理器不存在"), {};
					var n = this.remoteVideoStream.getVideoTracks()[0];
					if(n && "ended" == n.readyState && r.getReceivers().length > 1) {
						n = r.getReceivers()[1].track;
						var i = new MediaStream;
						i.addTrack(n), this.setRemoteVideoStream(i), WEBRTCLOG.log("webrtc::checkMediaStatus new videoTrack ----\x3e ", n)
					} else WEBRTCLOG.log("webrtc::checkMediaStatus videoTrack ----\x3e ", n);
					var a = this.rtc.checkMediaStatus({
						videoTrack: n,
						sdp: t,
						uid: e
					});
					return a.video || this.hide(), a
				}
			}, {
				key: "_getVideoStream",
				value: function(e, t, r) {
					var n = this,
						i = {};
					i.deviceId = e.deviceId;
					var a = this.sdkRef.getVideoSessionConfig({
						maxQuality: this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig).quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality,
						quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
						frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
					});
					return i = Object.assign(i, a), this.constraint.video = i, WEBRTCLOG.log("videoHelper::_getVideoStream"), d.getMediaStream(this.constraint).then(function(i) {
						WEBRTCLOG.log("videoHelper::获取到视频流:", i.id), n.localVideoStream && (n.destroy(), n.localVideoStream = null), n.localVideoStream = i, n.adapterRef.webrtcGateWayBusiness || (n.destroy(), r("logout")), n.adapterRef.instance.judgeSendSdpOfferOrUpdate(), t({
							device: e,
							stream: i
						})
					}).catch(function(e) {
						r(e)
					})
				}
			}, {
				key: "getScreenStream",
				value: function(e, t, r) {
					return this._getScreenStream(e, t, r)
				}
			}, {
				key: "enableDevice",
				value: function(e) {
					WEBRTCLOG.log("AudioHelper: enableDevice: 恢复设备 Audio");
					var t = [];
					return this.localVideoStream && (t = this.localVideoStream.getTracks()), t.map(function(e) {
						e.enabled = !0
					}), Promise.resolve()
				}
			}, {
				key: "removeTrackFromMediaStream",
				value: function(e) {
					d.removeTrackFromMediaStream(e)
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("videoHelper:destroy 移除本地远程流"), this.hide(), this.isRemote || d.removeTrackFromMediaStream(this.localVideoStream), null !== this.videoRatioIntervalId && (window.clearInterval(this.videoRatioIntervalId), this.videoRatioIntervalId = null), this.videoDomHelper && (this.videoDomHelper.destroy(), this.videoDomHelper = null), this.webAudio && this.webAudio.context && this.webAudio.destroy && this.webAudio.destroy(), this._resetStateParam()
				}
			}, {
				key: "_getScreenStream",
				value: function(e, t, r) {
					var n = this,
						i = this.adapterRef.chromeId;
					if(!i) return WEBRTCLOG.warn("chrome屏幕共享id未设置"), t("chrome屏幕共享id未设置");
					var a = {
						sources: ["window", "screen", "tab"]
					};
					return new Promise(function() {
						chrome.runtime.sendMessage(i, a, {}, function(e) {
							if(WEBRTCLOG.log("chrome 屏幕共享", e), e && "success" === e.type) {
								var i = {
									video: {
										mandatory: {
											maxWidth: 1280,
											maxHeight: 720,
											maxFrameRate: 5,
											minFrameRate: 1,
											chromeMediaSource: "desktop",
											chromeMediaSourceId: e.streamId
										}
									}
								};
								return WEBRTCLOG.log("webrtc-controller::_getScreenStream:", i), d.getMediaStream(i).then(function(e) {
									n.localVideoStream && (n.destroy(), n.localVideoStream = null), n.localVideoStream = e, n.adapterRef.instance.judgeSendSdpOfferOrUpdate(), t()
								}).catch(r)
							}
							e ? (WEBRTCLOG.error("获取流失败"), r({
								code: 20,
								msg: "获取流失败"
							})) : (WEBRTCLOG.error("未安装插件"), r({
								code: 404,
								msg: "未安装插件"
							}))
						})
					})
				}
			}, {
				key: "stopVideoDevice",
				value: function(e) {
					return WEBRTCLOG.log("开始关闭摄像头"), this.localVideoStream ? (WEBRTCLOG.log("清除 localVideoStream"), this.destroy(), this.localVideoStream = null, this.adapterRef.instance._updateRtc(!0), e()) : e("摄像头未开启")
				}
			}, {
				key: "disableDevice",
				value: function() {
					WEBRTCLOG.log("设备禁用");
					var e = [];
					return this.localVideoStream && (e = this.localVideoStream.getTracks()), e.map(function(e) {
						e.enabled = !1
					}), Promise.resolve()
				}
			}, {
				key: "hide",
				value: function() {
					if(this.videoDomHelper) {
						var e = this.videoDomHelper.videoContainerDom;
						e ? (e.parentNode && this.videoContainer.removeChild(e), this.videoDomHelper.destory(), this.videoDomHelper = null, this.isPlaying = !1) : WEBRTCLOG.warn("VideoHelper:hide videoContainerDom不存在")
					} else WEBRTCLOG.warn("VideoHelper:hide videoDomHelper不存在")
				}
			}, {
				key: "_createVideoDomHelper",
				value: function() {
					return new l.default({
						adapterRef: this.adapterRef,
						uid: this.uid
					})
				}
			}, {
				key: "show",
				value: function(e) {
					!1 !== this._checkHasVideoStream() ? this.videoContainer || e ? (this.videoDomHelper || (this.videoDomHelper = this._createVideoDomHelper()), e && this.setVideoContainer(e), this._mountVideoToDom(), this.play()) : WEBRTCLOG.warn("请先设置容器后再调用此方法，或传入对应渲染容器节点...") : WEBRTCLOG.warn("videoHelper: show: 未检测到视频流，请检查媒体设备是否开启...")
				}
			}, {
				key: "_mountVideoToDom",
				value: function() {
					var e = this.videoDomHelper.videoContainerDom,
						t = this.videoContainer;
					e && t ? t != e.parentNode ? (WEBRTCLOG.log("videoContainerDom container", e, t), t.appendChild(e)) : WEBRTCLOG.log("videoHelper: _mountVideoToDom: 节点已挂载，请勿重复挂载") : WEBRTCLOG.error("videoHelper: _mountVideoToDom: 未设置渲染根节点或子节点为空")
				}
			}, {
				key: "play",
				value: function() {
					var e = this;
					if(WEBRTCLOG.log("播放视频"), 1 != this.isPlaying) {
						var t = this.videoDomHelper.videoDom;
						if(0 != t.paused) {
							this.poster && (t.poster = this.poster), WEBRTCLOG.log("isRemote: ", this.isRemote), t.srcObject || (WEBRTCLOG.log("设置播放对象"), t.srcObject = this.isRemote ? this.remoteVideoStream : this.localVideoStream, WEBRTCLOG.log("video: ", t.srcObject.id)), 4 !== t.readyState && t.load();
							var r = t.play();
							void 0 !== r && r.catch(function(e) {
								WEBRTCLOG.warn(e)
							}).then(function() {
								e.isPlaying = !0, WEBRTCLOG.log("playing-。-", t, t.parentNode, t.srcObject && t.srcObject.getTracks())
							})
						} else WEBRTCLOG.warn("已经播放，请勿重复播放")
					} else WEBRTCLOG.warn("正在播放，请勿重复播放")
				}
			}, {
				key: "getLocalVideoStream",
				value: function() {
					return this.localVideoStream
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.play()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.pause()
				}
			}, {
				key: "resumeRemoteStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.play()
				}
			}, {
				key: "suspendRemoteStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.pause()
				}
			}, {
				key: "hasStartVideoDeviceRepeat",
				value: function(e) {
					return this.localVideoStream && this.constraint.video && this.constraint.video.deviceId == e.deviceId ? (this.enableDevice(), Promise.reject("设备已开启，重复操作")) : Promise.resolve()
				}
			}, {
				key: "checkMediaTrackBySDP",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						t = e.video,
						r = e.sdp,
						n = e.uid,
						i = {
							video: !1
						},
						a = u.parse(r),
						o = t && t.getVideoTracks()[0];
					return WEBRTCLOG.log(n + " checkMediaTrackBySDP ----\x3e track status", a), o && WEBRTCLOG.log("webrtc::checkMediaTrackBySDP videoTrack ----\x3e ", o), i.video = o && "ended" !== o.readyState && new RegExp(o.id).test(r), i
				}
			}, {
				key: "_checkHasVideoStream",
				value: function() {
					return Boolean(this.localVideoStream) || Boolean(this.remoteVideoStream)
				}
			}]), t
		}(s.EventEmitter);
		t.VideoHelper = h
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = s(r(1)),
			i = s(r(4)),
			a = s(r(3)),
			o = s(r(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), r._initNode(), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.audioDom = null
				}
			}, {
				key: "_initNode",
				value: function() {
					this.audioDom = document.createElement("audio")
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AudioDomHelper:destroy"), this._reset()
				}
			}]), t
		}(r(9).EventEmitter);
		t.default = c, e.exports = t.default
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AudioHelper = void 0;
		var n = p(r(1)),
			i = p(r(4)),
			a = p(r(3)),
			o = p(r(2)),
			s = r(9),
			c = r(126),
			u = f(r(182)),
			d = p(r(302)),
			l = f(r(110));

		function f(e) {
			if(e && e.__esModule) return e;
			var t = {};
			if(null != e)
				for(var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
			return t.default = e, t
		}

		function p(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var h = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.uid = e.uid, r.isRemote = e.isRemote, r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.sdkRef = null, this.adapterRef = null, this._resetStateParam()
				}
			}, {
				key: "_resetStateParam",
				value: function() {
					this.constraint = {}, this.system = null, this.uid = null, this.isRemote = !1, this.rtc = null, this.audioDomHelper = new d.default, this.localAudioStream = null, this.remoteAudioStream = null, this.localAudioStreamFromMIC = null, this.webAudio && this.webAudio.context && this.webAudio.destroy && this.webAudio.destroy(), this.webAudio = null, this.muted = !1, this.volume = 100, this.gainVolume = .5, this.gainOff = !1
				}
			}, {
				key: "_getMediaStream",
				value: function() {
					var e = this;
					!1 === this.isRemote && u.getMediaStream({
						video: !1,
						audio: !0
					}).then(function(t) {
						e.localAudioStream = t
					})
				}
			}, {
				key: "playAudio",
				value: function() {
					!1 === this.isRemote ? this.audioDomHelper.audioDom.srcObject = this.localAudioStream : !0 === this.isRemote && (this.audioDomHelper.audioDom.srcObject = this.remoteAudioStream), this.muted && this.setMuted(!1), this.play()
				}
			}, {
				key: "stopAudio",
				value: function() {
					this.setMuted(!0)
				}
			}, {
				key: "setIsRemote",
				value: function(e) {
					return this.isRemote = e, this
				}
			}, {
				key: "setRemoteAudioStream",
				value: function(e) {
					this.remoteAudioStream = e
				}
			}, {
				key: "setRTC",
				value: function(e) {
					this.rtc = e
				}
			}, {
				key: "setMuted",
				value: function(e) {
					this.muted = !!e, this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.muted = !!e, this.setPlayVolume())
				}
			}, {
				key: "play",
				value: function() {
					var e = this.audioDomHelper.audioDom;
					4 !== e.readyState && e.load(), 0 !== e.played.length && e.pause();
					var t = e.play();
					void 0 !== t && t.then(function() {
						WEBRTCLOG.log("audioHelper: play: muted-" + e.muted + " " + e.parentNode + " " + (e.srcObject && e.srcObject.getTracks()))
					}).catch(function(e) {
						WEBRTCLOG.warn(e)
					})
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					var t = void 0;
					t = e || 0 == e ? e < 0 ? 0 : e > 255 ? 255 : e : this.volume, this.volume = t, this.getMuted() || this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.volume = t / 255)
				}
			}, {
				key: "setGain",
				value: function(e) {
					var t = 0 === e || 0 !== e && e ? e / 255 : 1;
					this.gainVolume = t, this.localAudioStream && !this.isRemote ? this.gainOff ? WEBRTCLOG.log("audioHelper: setGain: 本地音频被禁止采集") : this.webAudio && (this.webAudio.setGain(t), WEBRTCLOG.log("audioHelper: setGain: webAudio: 设置音量", t)) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "getGain",
				value: function() {
					return this.gainVolume
				}
			}, {
				key: "setGainOff",
				value: function() {
					this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(0), this.gainOff = !0) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "setGainOn",
				value: function() {
					this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(this.gainVolume), this.gainOff = !1) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "getMuted",
				value: function() {
					return !!this.muted
				}
			}, {
				key: "composeTrack",
				value: function(e, t) {
					if(e != this.adapterRef.imInfo.uid) {
						var r = new MediaStream;
						r.addTrack(t), this.remoteAudioStream ? this.updateStream(r) : this.setRemoteAudioStream(r), WEBRTCLOG.log("NRTCAdapter:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), WEBRTCLOG.log("重组轨道，stream id:", r.id), this.playAudio()
					} else WEBRTCLOG.warn("NRTCAdapter:_composeTrack 自己的轨道直接忽略")
				}
			}, {
				key: "stopAudioDevice",
				value: function() {
					this.localAudioStreamFromMIC && u.removeTrackFromMediaStream(this.localAudioStreamFromMIC)
				}
			}, {
				key: "getAudioStream",
				value: function(e, t, r) {
					return this._getAudioStream(e, t, r)
				}
			}, {
				key: "_getAudioStream",
				value: function(e, t, r) {
					var n = this,
						i = e && e.deviceId;
					return this.constraint.audio = !i || {
						deviceId: i
					}, WEBRTCLOG.log("audioHelper::_getAudioStream:", this.constraint), u.getMediaStream(this.constraint).then(function(i) {
						n.stopAudioDevice(), WEBRTCLOG.log("获取到音频流:", i), n.adapterRef.webrtcGateWayBusiness || (u.removeTrackFromMediaStream(i), r("logout")), n._initAudioStream(n.constraint, i), t({
							device: e,
							stream: i
						})
					}).catch(function(e) {
						r(e)
					})
				}
			}, {
				key: "_initAudioStream",
				value: function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new MediaStream;
					this.localAudioStreamFromMIC = t, this.localAudioStream || this.webAudio ? this.updateStream(t) : (this.localAudioStream = t, this.adapterRef.instance._isSafari() || (this.webAudio = new c.WebAudio({
						stream: t,
						uid: this.uid,
						isAnalyze: !0,
						isRemote: this.isRemote
					})), 1 == this.isRemote ? this.remoteAudioStream = this.webAudio.outputStream : (this.localAudioStream = this.webAudio.outputStream, WEBRTCLOG.log("_initAudioStream, 本地音频: ", this.localAudioStream)), this.adapterRef.instance.judgeSendSdpOfferOrUpdate())
				}
			}, {
				key: "disableDevice",
				value: function() {
					WEBRTCLOG.log("AudioHelper: disableDevice: 暂停设备 Audio");
					var e = [];
					return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
						e.enabled = !1
					}), Promise.resolve()
				}
			}, {
				key: "enableDevice",
				value: function() {
					WEBRTCLOG.log("AudioHelper: enableDevice: 恢复设备 Audio");
					var e = [];
					return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
						e.enabled = !0
					}), Promise.resolve()
				}
			}, {
				key: "updateStream",
				value: function(e) {
					this.audioDomHelper.audioDom && e && (WEBRTCLOG.log("AudioHelper: updateStream : updateAudioTrack", e.getTracks()), 1 == this.isRemote ? (this.remoteAudioStream = e, WEBRTCLOG.log("remoteAudioStream:", this.remoteAudioStream)) : this.webAudio && (this.webAudio.updateStream(e), this.localAudioStream = this.webAudio.outputStream, WEBRTCLOG.log("updaStream，localAudioStream:", this.localAudioStream)))
				}
			}, {
				key: "getAudioVolume",
				value: function() {
					return this.webAudio && this.webAudio.getVolumeData() || 0
				}
			}, {
				key: "removeTrackFromMediaStream",
				value: function(e) {
					u.removeTrackFromMediaStream(e)
				}
			}, {
				key: "destroyMedia",
				value: function() {
					WEBRTCLOG.log("audioHelper: stopDevice: 销毁音频流 " + this.uid + ", localAudioStream:\n", this.localAudioStreamFromMIC), u.removeTrackFromMediaStream(this.localAudioStreamFromMIC), this.localAudioStreamFromMIC = null
				}
			}, {
				key: "getLocalAudioStream",
				value: function() {
					return this.localAudioStream
				}
			}, {
				key: "hasStartAudioDeviceRepeat",
				value: function(e) {
					return this.localAudioStreamFromMIC && this.constraint.audio.deviceId == e.deviceId ? (this.enableDevice(), Promise.reject("设备已开启，重复操作")) : Promise.resolve()
				}
			}, {
				key: "checkMediaTrackBySDP",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						t = e.audio,
						r = e.sdp,
						n = e.uid,
						i = {
							audio: !1
						},
						a = l.parse(r),
						o = t && t.getAudioTracks()[0];
					return WEBRTCLOG.log(n + " checkMediaTrackBySDP ----\x3e track status", a), o && WEBRTCLOG.log("webrtc::checkMediaTrackBySDP audioTrack ----\x3e ", o), i.audio = o && "ended" !== o.readyState && new RegExp(o.id).test(r), i
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AudioHelper:destroy "), this.audioDomHelper && (this.audioDomHelper.destroy(), this.audioDomHelper = null), this._resetStateParam()
				}
			}]), t
		}(s.EventEmitter);
		t.AudioHelper = h
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.MediaRecordHelper = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(9),
			c = r(126);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t(e) {
				(0, n.default)(this, t);
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r._reset(), window.addEventListener("beforeunload", function(e) {
					if(WEBRTCLOG.log("beforeunload event fire: will stop recording"), !0 === r.checkIsRecording()) {
						r.stop();
						return(e || window.event).returnValue = "o/", "o/"
					}
				}), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "start",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
							uid: 0,
							account: "",
							type: "video"
						};
					return r.uid || r.account ? t ? window.MediaRecorder && MediaRecorder.isTypeSupported ? (this.stream = t, this.option = r, "audio" === r.type ? this.contentTypes = ["audio/wav", "audio/ogg", "audio/pcm", "audio/webm"] : this.contentTypes = ["video/mp4;codecs=opus", "video/webm", "video/webm;codecs=h264", "video/x-matroska;codecs=opus", "video/invalid"], (this.mimeType = this._validation(this.contentTypes)[0]) ? this.isRecording ? Promise.reject("音视频正在录制中，请勿重复操作") : this._format().then(function() {
						return e._start()
					}).catch(function(e) {
						return Promise.reject(e)
					}) : Promise.reject("当前浏览器不支持对应格式的视频录制")) : (WEBRTCLOG.log("MediaRecordHelper: start : 当前浏览器不支持音视频录制功能"), Promise.reject("当前浏览器不支持音视频录制功能")) : (WEBRTCLOG.log("MediaRecordHelper: start : stream流数据为空"), Promise.reject("获取视频流失败")) : (WEBRTCLOG.log("MediaRecordHelper: start : option参数缺失"), Promise.reject("需要录制的帐号缺失"))
				}
			}, {
				key: "stop",
				value: function(e) {
					if(!this.isRecording || !this.recorder) return Promise.reject("请先开启音视频录制");
					if(this.status = "stopped", WEBRTCLOG.log("MediaRecordHelper: stop start : " + this.recorder.state), "inactive" === this.recorder.state) return WEBRTCLOG.warn("MediaRecordHelper: stop stopped: this.recorder.state"), Promise.reject("音视频录制已结束，请勿重复操作");
					var t = (this.option.account || this.option.uid) + "--" + Date.now() + "--" + (this.option.type || "video");
					return this.fileName = e || t, this.recorder.stop(), Promise.resolve()
				}
			}, {
				key: "leave",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
						uid: 0
					};
					if(this.isRecording && this.recorder) {
						var t = e.uid;
						t && this.option && this.option && t === +this.option.uid && this.stop()
					}
				}
			}, {
				key: "pause",
				value: function() {
					this.recorder && this.recorder.pause()
				}
			}, {
				key: "resume",
				value: function() {
					this.recorder && this.recorder.resume()
				}
			}, {
				key: "_reset",
				value: function() {
					this.recordedChunks = [], this.isRecording = !1, this.stream = null, this.option = null, this.contentTypes = [], this.mimeType = "", this.audioController = null, this.opStream = null, this.recorder = null, this.status = "", this.timer = null, this.fileName = null
				}
			}, {
				key: "_validation",
				value: function(e) {
					return e.filter(function(e) {
						return MediaRecorder.isTypeSupported(e)
					})
				}
			}, {
				key: "_format",
				value: function() {
					var e = this,
						t = this.stream,
						r = this.option;
					return new Promise(function(n, i) {
						var a = new MediaStream;
						return e._matchLocalStreamConstructor(t.constructor) && (t = [t]), t.constructor !== Array ? i("音视频录制输入错误") : "audio" === r.type ? (e.audioController = new c.WebAudio({
							stream: t,
							uid: r.uid
						}), e.opStream = e.audioController.outputStream, n()) : (t.forEach(function(t) {
							t && e._matchLocalStreamConstructor(t.constructor) && t.getTracks().forEach(function(e) {
								a.addTrack(e)
							})
						}), 0 === a.getTracks().length ? i("当前没有任何音视频数据，无法进行录制") : (e.opStream = a, void n()))
					})
				}
			}, {
				key: "_matchLocalStreamConstructor",
				value: function(e) {
					return /(LocalMediaStream|MediaStream)/.test(e)
				}
			}, {
				key: "_start",
				value: function() {
					var e = {
							audioBitsPerSecond: 128e3,
							videoBitsPerSecond: 25e5,
							mimeType: this.mimeType
						},
						t = this.recorder = new MediaRecorder(this.opStream, e);
					return t.ondataavailable = this._onDataAvailable.bind(this), t.onstop = this._onStop.bind(this), this.isRecording = !0, this.status = "started", this.recorder.start(), this._startTimer(), Promise.resolve(this.option)
				}
			}, {
				key: "updateRecordStream",
				value: function(e) {}
			}, {
				key: "_startTimer",
				value: function() {
					var e = this;
					this.timer || (this.timer = setInterval(function() {
						WEBRTCLOG.log("MediaRecordHelper: startTimer " + (new Date).toLocaleString() + " --\x3e MediaRecorder status: " + e.recorder.state)
					}, 2e3))
				}
			}, {
				key: "_onStop",
				value: function() {
					if(WEBRTCLOG.log("MediaRecordHelper: onstop"), "stopped" !== this.status) return this._start();
					var e = new Blob(this.recordedChunks, {
							type: this.mimeType
						}),
						t = URL.createObjectURL(e),
						r = document.createElement("a");
					document.body.appendChild(r), r.style = "display: none", r.href = t, r.download = (this.fileName || Date.now()) + ".webm", r.click(), window.URL.revokeObjectURL(t), this._destroy(), this._clearTimer(), this.emit("stopRecord")
				}
			}, {
				key: "_destroy",
				value: function() {
					this.stream = null, this.recorder = null, this.recordedChunks = [], this.isRecording = !1, this.audioController && this.audioController.destroy(), this.audioController = null, this.fileName = "", this.option = {}, this.status = ""
				}
			}, {
				key: "_clearTimer",
				value: function() {
					this.timer && (clearInterval(this.timer), this.timer = null)
				}
			}, {
				key: "_onDataAvailable",
				value: function(e) {
					if(WEBRTCLOG.log("MediaRecordHelper: ondataavailable data received"), !(e.data.size > 0)) return this.stop(), Promise.reject("获取视频流失败");
					this.recordedChunks.push(e.data)
				}
			}, {
				key: "checkIsRecording",
				value: function() {
					return this.isRecording
				}
			}]), t
		}(s.EventEmitter);
		t.MediaRecordHelper = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.MediaDeviceHelper = void 0;
		var n = c(r(1)),
			i = c(r(4)),
			a = c(r(3)),
			o = c(r(2)),
			s = r(9);

		function c(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = (0, r(11).getGlobal)(),
			d = function(e) {
				function t() {
					(0, n.default)(this, t);
					var e = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return e.devicesCache = {}, e.deviceChangeCheckTimer = null, e._init(), e
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_init",
					value: function() {
						var e = this;
						WEBRTCLOG.log("MediaDeviceHelper:_init"), this._getDevices(function(t) {
							e.devicesCache = e._transformDeviceData(t), e._registerDeviceChangeEvent()
						}, function(e) {
							WEBRTCLOG.error("MediaDeviceHelper:_init 获取可用设备列表失败：", e)
						})
					}
				}, {
					key: "_registerDeviceChangeEvent",
					value: function() {
						WEBRTCLOG.log("MediaDeviceHelper:_registerDeviceChangeEvent"), navigator.mediaDevices.ondevicechange = this._onDeviceChangeHandler.bind(this)
					}
				}, {
					key: "_onDeviceChangeHandler",
					value: function(e) {
						var t = this;
						WEBRTCLOG.log("MediaDeviceHelper:_onDeviceChangeHandler"), this.deviceChangeCheckTimer && (u.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer = null);
						var r = Object.assign({}, this.devicesCache);
						this.deviceChangeCheckTimer = u.setTimeout(function() {
							t._getDevices(function(e) {
								t.devicesCache = t._transformDeviceData(e), t.emit("deviceStatus", t.devicesCache), t._filterDeviceChange(t.devicesCache, r)
							}, function(e) {
								WEBRTCLOG.error("MediaDeviceHelper:_onDeviceChangeHandler 获取可用设备列表失败：", e)
							})
						}, 500)
					}
				}, {
					key: "_filterDeviceChange",
					value: function(e, t) {
						var r = function(e) {
								var t = {};
								return Object.keys(e).forEach(function(r) {
									e[r].forEach(function(e) {
										t[r + e.deviceId] = Object.assign({}, e, {
											type: r
										})
									})
								}), t
							},
							n = r(e),
							i = r(t),
							a = Object.keys(n),
							o = Object.keys(i);
						if(a.length > o.length) {
							var s = [];
							a.forEach(function(e) {
								-1 === o.indexOf(e) && s.push(n[e])
							}), s.length && this.emit("deviceAdd", s)
						} else {
							var c = [];
							o.forEach(function(e) {
								-1 === a.indexOf(e) && c.push(i[e])
							}), c.length && this.emit("deviceRemove", c)
						}
					}
				}, {
					key: "_getDevices",
					value: function(e, t) {
						if(WEBRTCLOG.log("MediaDeviceHelper:_getDevices 开始获取设备列表"), !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
							return WEBRTCLOG.error("enumerateDevices 接口不支持"), void t("enumerateDevices 接口不支持")
						}
						navigator.mediaDevices.enumerateDevices().then(e).catch(t)
					}
				}, {
					key: "_transformDeviceData",
					value: function(e) {
						WEBRTCLOG.log("MediaDeviceHelper:_transformDeviceData 转换设备列表");
						var t = {
							video: [],
							audioIn: [],
							audioOut: []
						};
						return 0 === e.length ? t : (e.forEach(function(e) {
							var r = void 0;
							switch(e.kind) {
								case "videoinput":
									r = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "camera " + (t.video.length + 1)
									}, t.video.push(r);
									break;
								case "audioinput":
									r = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "microphone " + (t.audioIn.length + 1)
									}, t.audioIn.push(r);
									break;
								case "audiooutput":
									r = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "speaker " + (t.audioOut.length + 1)
									}, t.audioOut.push(r)
							}
						}), t)
					}
				}, {
					key: "getDevicesOfType",
					value: function(e) {
						var t = this;
						return new Promise(function(r, n) {
							t._getDevices(function(n) {
								var i = t._transformDeviceData(n);
								void 0 === e && r(i), r(i[e])
							}, function(e) {
								WEBRTCLOG.error("MediaDeviceHelper:getDevicesOfType 获取可用设备列表失败：", e), n(e)
							})
						})
					}
				}, {
					key: "getDeviceStatus",
					value: function() {
						var e = {
							hasAudioDevice: !1,
							hasVideoDevice: !1
						};
						return this.devicesCache && (this.devicesCache.audioIn.length > 0 && (e.hasAudioDevice = !0), this.devicesCache.video.length > 0 && (e.hasVideoDevice = !0)), e
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("MediaDeviceHelper:destory"), this.devicesCache && (this.devicesCache = {}), this.deviceChangeCheckTimer && (u.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer = null)
					}
				}]), t
			}(s.EventEmitter);
		t.MediaDeviceHelper = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayProtocolHandler = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(155),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "pack",
				value: function(e, t) {
					switch(e) {
						case c.WHITEBOARD_GATE_WAY_API.login.key:
							return this.generateLoginPackData(t);
						case c.WHITEBOARD_GATE_WAY_API.keep_alive.key:
							return this.generateKeepAlivePackData(t);
						case c.WHITEBOARD_GATE_WAY_API.broadcast.key:
							return this.generateBroadCastPackData(t);
						case c.WHITEBOARD_GATE_WAY_API.toUser.key:
							return this.generateToUserPackData(t);
						case c.WHITEBOARD_GATE_WAY_API.logout.key:
							return this.generateLogoutPackData(t);
						default:
							return null
					}
				}
			}, {
				key: "unpack",
				value: function(e) {
					try {
						e = JSON.parse(e)
					} catch(e) {
						return null
					}
					switch(e.type = c.WHITEBOARD_UNSERIALIZE[e.type], e.type) {
						case c.WHITEBOARD_GATE_WAY_API.login_ack.key:
							return this.parseLoginAckPackData(e);
						case c.WHITEBOARD_GATE_WAY_API.join.key:
							return this.parseJoinPackData(e);
						case c.WHITEBOARD_GATE_WAY_API.keep_alive_ack.key:
							return this.parseKeepAliveAckPackData(e);
						case c.WHITEBOARD_GATE_WAY_API.keep_alive_node.key:
							return this.parseKeepAliveNodePackData(e);
						case c.WHITEBOARD_GATE_WAY_API.broadcast.key:
							return this.parseBroadCasePackData(e);
						case c.WHITEBOARD_GATE_WAY_API.toUser.key:
							return this.parseToUserPackData(e);
						case c.WHITEBOARD_GATE_WAY_API.logout.key:
							return this.parseLogoutPackData(e);
						default:
							return null
					}
				}
			}, {
				key: "generateLoginPackData",
				value: function(e) {
					return Object.assign(c.LOGIN_OF_WHITEBOARD, e)
				}
			}, {
				key: "generateKeepAlivePackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_OF_WHITEBOARD, e)
				}
			}, {
				key: "generateBroadCastPackData",
				value: function(e) {
					return Object.assign(c.BROADCASE_OF_WHITEBOARD, e)
				}
			}, {
				key: "generateToUserPackData",
				value: function(e) {
					return Object.assign(c.TOUSER_OF_WHITEBOARD, e)
				}
			}, {
				key: "generateLogoutPackData",
				value: function(e) {
					return Object.assign(c.LOGOUT_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseLoginAckPackData",
				value: function(e) {
					return Object.assign(c.LOGIN_ACK_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseJoinPackData",
				value: function(e) {
					return Object.assign(c.JOIN_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseKeepAliveAckPackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_ACK_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseKeepAliveNodePackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_NODE_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseBroadCasePackData",
				value: function(e) {
					return Object.assign(c.BROADCASE_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseToUserPackData",
				value: function(e) {
					return Object.assign(c.TOUSER_OF_WHITEBOARD, e)
				}
			}, {
				key: "parseLogoutPackData",
				value: function(e) {
					return Object.assign(c.LOGOUT_OF_WHITEBOARD, e)
				}
			}]), t
		}(s.AbstractProtocolHandler);
		t.WebRTCGateWayProtocolHandler = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayProtocolHandler = void 0;
		var n = u(r(1)),
			i = u(r(4)),
			a = u(r(3)),
			o = u(r(2)),
			s = r(155),
			c = r(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "pack",
				value: function(e, t) {
					switch(e) {
						case c.WEBRTC_GATE_WAY_API.client_login.key:
							return this.generateClientLoginPackData(t);
						case c.WEBRTC_GATE_WAY_API.sdp_offer.key:
							return this.generateSdpOfferPackData(t);
						case c.WEBRTC_GATE_WAY_API.ice_offer.key:
							return this.generateIceOfferPackData(t);
						case c.WEBRTC_GATE_WAY_API.keep_alive.key:
							return this.generateKeepAlivePackData(t);
						case c.WEBRTC_GATE_WAY_API.sdp_update.key:
							return this.genearateSdkUpdatePackData(t);
						case c.WEBRTC_GATE_WAY_API.logout.key:
							return this.generateLogoutPackData(t);
						default:
							return null
					}
				}
			}, {
				key: "unpack",
				value: function(e) {
					try {
						e = JSON.parse(e)
					} catch(e) {
						return console.warn(e), null
					}
					switch(e.type) {
						case c.WEBRTC_GATE_WAY_API.login_ack.key:
							return this.parseLoginAckPackData(e);
						case c.WEBRTC_GATE_WAY_API.sdp_answer.key:
							return this.parseSdpAnswerPackData(e);
						case c.WEBRTC_GATE_WAY_API.ice_answer.key:
							return this.parseIceAnswerPackData(e);
						case c.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
							return this.parseKeepAliveAckPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_join.key:
							return this.parseClientJoinPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_update.key:
							return this.parseClientUpdatePackData(e);
						case c.WEBRTC_GATE_WAY_API.client_logout.key:
							return this.parseClientLogoutPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_error.key:
							return this.parseClientErrorPackData(e);
						default:
							return null
					}
				}
			}, {
				key: "generateClientLoginPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_LOGIN_OF_WEBRTC, e)
				}
			}, {
				key: "generateSdpOfferPackData",
				value: function(e) {
					return Object.assign(c.SDP_OFFER_OF_WEBRTC, e)
				}
			}, {
				key: "generateIceOfferPackData",
				value: function(e) {
					return Object.assign(c.ICE_OFFER_OF_WEBRTC, e)
				}
			}, {
				key: "generateKeepAlivePackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_OF_WEBRTC, e)
				}
			}, {
				key: "genearateSdkUpdatePackData",
				value: function(e) {
					return Object.assign(c.SDP_UPDATE_OF_WEBRTC, e)
				}
			}, {
				key: "generateLogoutPackData",
				value: function(e) {
					return Object.assign(c.LOGOUT_OF_WEBRTC, e)
				}
			}, {
				key: "parseLoginAckPackData",
				value: function(e) {
					return Object.assign(c.LOGIN_ACK_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientJoinPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_JOIN_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientUpdatePackData",
				value: function(e) {
					return Object.assign(c.CLIENT_UPDATE_OF_WEBRTC, e)
				}
			}, {
				key: "parseKeepAliveAckPackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_ACK_OF_WEBRTC, e)
				}
			}, {
				key: "parseSdpAnswerPackData",
				value: function(e) {
					return Object.assign(c.SDP_ANSWER_OF_WEBRTC, e)
				}
			}, {
				key: "parseIceAnswerPackData",
				value: function(e) {
					return Object.assign(c.ICE_ANSWER_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientLogoutPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_LOGOUT_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientErrorPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_ERROR_OF_WEBRTC, e)
				}
			}]), t
		}(s.AbstractProtocolHandler);
		t.WebRTCGateWayProtocolHandler = d
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(155);
		Object.defineProperty(t, "AbstractProtocolHandler", {
			enumerable: !0,
			get: function() {
				return n.AbstractProtocolHandler
			}
		});
		var i = r(307);
		Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return i.WebRTCGateWayProtocolHandler
			}
		});
		var a = r(306);
		Object.defineProperty(t, "WhiteBoardGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return a.WhiteBoardGateWayProtocolHandler
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.preHandle = function(e, t, r) {
			var i = t[e];
			i && (t[e] = function() {
				var e = !0;
				r && (0, n.isFunction)(r) && (e = r()), e && i.apply(t, arguments)
			})
		}, t.aop = function(e, t, r, i) {
			var a = t[e];
			a && (t[e] = function() {
				r && (0, n.isFunction)(r) && r(), a.apply(t, arguments), i && (0, n.isFunction)(i) && i()
			})
		};
		var n = r(11)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WhiteBoardGateWayManager = void 0;
		var n = f(r(1)),
			i = f(r(4)),
			a = f(r(3)),
			o = f(r(2)),
			s = r(184),
			c = r(22),
			u = r(183),
			d = r(11),
			l = r(309);

		function f(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = (0, d.getGlobal)(),
			h = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					r._handleGateWayEvent();
					return ["doSendLogin", "doSendBroadCast", "doSendToUser"].forEach(function(e, t) {
						(0, l.preHandle)(e, r, r._preHandle.bind(r))
					}), r
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_preHandle",
					value: function() {
						return !this.state.waiting4Message || (WEBRTCLOG.error("WhiteBoardGateWayManager:_preHandle 正在等待上一条命令【%s】的服务器回包", this.cmd.lastCmd || "无"), !1)
					}
				}, {
					key: "_handleGateWayEvent",
					value: function() {
						this.gateway.on("open", this.doSendLogin.bind(this)), this.gateway.on("message", this._handleMessage.bind(this)), this.gateway.on("close", this._handleClose.bind(this)), this.gateway.on("error", this._handleError.bind(this))
					}
				}, {
					key: "_handleMessage",
					value: function(e) {
						WEBRTCLOG.log("WhiteBoardGateWayManager:_handleMessage <- ", e);
						var t = null;
						switch(e.type) {
							case c.WHITEBOARD_GATE_WAY_API.login_ack.key:
								if(this.setState({
										waiting4Message: !1
									}), 200 != (t = e.content.params).auth_result) return this.setState({
									hasLogined: !1
								}), void this.emit("login", {
									success: !1
								});
								this.setState({
									hasLogined: !0
								}), this.startKeepAliveTimer(), this.emit("login", {
									success: !0,
									client_map_addr: t.client_map_addr,
									record_addr: t.record_addr,
									record_file_name: t.record_file_name
								});
								break;
							case c.WHITEBOARD_GATE_WAY_API.join.key:
								t = e.content.params, this.emit("join", {
									client_id: t.client_id,
									client_map_addr: t.client_map_addr,
									client_net: t.client.net,
									client_os: t.client_os
								});
								break;
							case c.WHITEBOARD_GATE_WAY_API.keep_alive_ack.key:
								this.doSendKeepAliveTask();
								break;
							case c.WHITEBOARD_GATE_WAY_API.keep_alive_node.key:
								break;
							case c.WHITEBOARD_GATE_WAY_API.broadcast.key:
								t = e.content.params, this.emit("broadcast", {
									data: t.data,
									from: e.uid
								});
								break;
							case c.WHITEBOARD_GATE_WAY_API.toUser.key:
								t = e.content.params, this.emit("toUser", {
									data: t.data,
									dst_client_id: t.dst_client_id
								});
								break;
							case c.WHITEBOARD_GATE_WAY_API.logout.key:
								t = e.content.params, this.emit("logout", {
									recv_bytes: t.recv_bytes,
									send_bytes: t.send_bytes
								})
						}
					}
				}, {
					key: "_handleClose",
					value: function(e) {
						WEBRTCLOG.log("WhiteBoardGateWayManager:_handleClose <- ", e), this.emit("close", e)
					}
				}, {
					key: "_handleError",
					value: function(e) {
						WEBRTCLOG.log("WhiteBoardGateWayManager:_handleError <- ", e), this.emit("error", e)
					}
				}, {
					key: "doSendKeepAliveTask",
					value: function() {
						var e = this;
						this.startKeepAliveTimer = p.setTimeout(function() {
							e.doSendKeepAlive({
								content: {
									params: {
										timestamp: "" + Date.now()
									}
								}
							})
						}, 1e3 * this.keepAliveInterval4Second)
					}
				}, {
					key: "doSendLogin",
					value: function() {
						this.cmd.lastCmd = c.WHITEBOARD_GATE_WAY_API.login.key;
						var e = {
								uid: this.context.uid,
								cid: this.context.cid,
								version: this.context.version,
								content: this.context.content
							},
							t = new u.WhiteBoardGateWayContext(e),
							r = this.gateway.protocolHandler.pack(c.WHITEBOARD_GATE_WAY_API.login.key, t);
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendLogin -> ", r);
						var n = this.gateway.send(r);
						if(n.code !== c.GATE_WAY_RESPONSE_CODE.OK) return WEBRTCLOG.error("WhiteBoardGateWayManager:doSendLogin:send fail, code=%s", n.code), void this.setState({
							hasLogined: !1
						});
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendLogin:send success"), this.setState({
							waiting4Message: !0
						})
					}
				}, {
					key: "doSendBroadCast",
					value: function(e) {
						this.cmd.lastCmd = c.WHITEBOARD_GATE_WAY_API.broadcast.key;
						var t = e.content,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								version: this.context.version,
								content: t
							},
							n = new u.WhiteBoardGateWayContext(r),
							i = this.gateway.protocolHandler.pack(c.WHITEBOARD_GATE_WAY_API.broadcast.key, n);
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendBroadCast -> ", i);
						var a = this.gateway.send(i);
						a.code === c.GATE_WAY_RESPONSE_CODE.OK ? (WEBRTCLOG.log("WhiteBoardGateWayManager:doSendBroadCast:send success"), this.setState({
							waiting4Message: !0
						})) : WEBRTCLOG.error("WhiteBoardGateWayManager:doSendBroadCast:send fail, code=%s", a.code)
					}
				}, {
					key: "doSendToUser",
					value: function(e) {
						this.cmd.lastCmd = c.WHITEBOARD_GATE_WAY_API.toUser.key;
						var t = e.content,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								version: this.context.version,
								content: t
							},
							n = new u.WhiteBoardGateWayContext(r),
							i = this.gateway.protocolHandler.pack(c.WHITEBOARD_GATE_WAY_API.toUser.key, n);
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendToUser -> ", i);
						var a = this.gateway.send(i);
						a.code === c.GATE_WAY_RESPONSE_CODE.OK ? (WEBRTCLOG.log("WhiteBoardGateWayManager:doSendToUser:send success"), this.setState({
							waiting4Message: !0
						})) : WEBRTCLOG.error("WhiteBoardGateWayManager:doSendToUser:send fail, code=%s", a.code)
					}
				}, {
					key: "doSendKeepAlive",
					value: function(e) {
						var t = e.content,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								version: this.context.version,
								content: t
							},
							n = new u.WhiteBoardGateWayContext(r),
							i = this.gateway.protocolHandler.pack(c.WHITEBOARD_GATE_WAY_API.keep_alive.key, n);
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendKeepAlive -> ", i);
						var a = this.gateway.send(i);
						a.code === c.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WhiteBoardGateWayManager:doSendKeepAlive:send success") : WEBRTCLOG.error("WhiteBoardGateWayManager:doSendKeepAlive:send fail, code=%s", a.code)
					}
				}, {
					key: "doSendLogout",
					value: function(e) {
						var t = e.content,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								version: this.context.version,
								content: t
							},
							n = new u.WhiteBoardGateWayContext(r),
							i = this.gateway.protocolHandler.pack(c.WHITEBOARD_GATE_WAY_API.logout.key, n);
						WEBRTCLOG.log("WhiteBoardGateWayManager:doSendLogout -> ", i);
						var a = this.gateway.send(i);
						a.code === c.GATE_WAY_RESPONSE_CODE.OK ? (WEBRTCLOG.log("WhiteBoardGateWayManager:doSendLogout:send success"), this.setState({
							hasLogined: !1
						}), this.stopKeepAliveTimer()) : WEBRTCLOG.error("WhiteBoardGateWayManager:doSendLogout:send fail, code=%s", a.code)
					}
				}]), t
			}(s.AbstractGateWayManager);
		t.WhiteBoardGateWayManager = h
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WhiteBoardGateWay = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(r(187).AbstractGateWay);
		t.WhiteBoardGateWay = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayManager = void 0;
		var n = l(r(1)),
			i = l(r(4)),
			a = l(r(3)),
			o = l(r(119)),
			s = l(r(2)),
			c = r(184),
			u = r(22),
			d = r(186);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = (0, r(11).getGlobal)(),
			p = function(e) {
				function t(e) {
					(0, n.default)(this, t);
					var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return r._bindGateWayEvent(), r
				}
				return(0, s.default)(t, e), (0, i.default)(t, [{
					key: "_bindGateWayEvent",
					value: function() {
						this.gateway.on("open", this.doSendClientLogin.bind(this)), this.gateway.on("message", this._handleMessage.bind(this)), this.gateway.on("close", this._handleClose.bind(this)), this.gateway.on("error", this._handleError.bind(this))
					}
				}, {
					key: "_unbindGateWayEvent",
					value: function() {
						this.gateway.removeListener("open", this.doSendClientLogin.bind(this)), this.gateway.removeListener("message", this._handleMessage.bind(this)), this.gateway.removeListener("close", this._handleClose.bind(this)), this.gateway.removeListener("error", this._handleError.bind(this))
					}
				}, {
					key: "_handleMessage",
					value: function(e) {
						e.type !== u.WEBRTC_GATE_WAY_API.keep_alive_ack.key && WEBRTCLOG.log("WebRTCGateWayManager:_handleMessage <- ", e);
						var t = 0,
							r = null,
							n = null;
						switch(e.type) {
							case u.WEBRTC_GATE_WAY_API.login_ack.key:
								if(200 != (t = e.params.auth_res)) return this.setState({
									hasLogined: !1
								}), void this.emit("login", {
									success: !1
								});
								WEBRTCLOG.warn("登录成功，设置状态"), this.setState({
									hasLogined: !0
								}), this.startKeepAliveTimer(), this.emit("login", {
									success: !0
								});
								break;
							case u.WEBRTC_GATE_WAY_API.sdp_answer.key:
								if(200 != (t = e.params.auth_res)) return void this.emit("sdpAnswer", {
									success: !1
								});
								r = e.params.content, this.emit("sdpAnswer", {
									success: !0,
									code: t,
									dst_id: e.params.dst_id,
									type: r.type,
									sdp: r.sdp
								});
								break;
							case u.WEBRTC_GATE_WAY_API.ice_answer.key:
								r = e.params.content, this.emit("iceAnswer", {
									dst_id: e.params.dst_id,
									candidate: r.candidate,
									sdpMid: r.sdpMid,
									sdpMLineIndex: r.sdpMLineIndex
								});
								break;
							case u.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
								this.doSendKeepAliveTask();
								break;
							case u.WEBRTC_GATE_WAY_API.client_join.key:
								n = e.params, this.emit("userJoin", {
									client_id: n.client_id,
									has_audio: n.has_audio,
									has_video: n.has_video
								});
								break;
							case u.WEBRTC_GATE_WAY_API.client_update.key:
								n = e.params, this.emit("userUpdate", {
									client_id: n.client_id,
									has_audio: n.has_audio,
									has_video: n.has_video
								});
								break;
							case u.WEBRTC_GATE_WAY_API.client_logout.key:
								r = e.params.content, this.emit("userLeave", {
									uid: e.uid,
									logout_type: r.logout_type,
									timestamp: r.timestamp
								});
								break;
							case u.WEBRTC_GATE_WAY_API.client_error.key:
								r = e.params.content, console.warn("网关反馈错误, content: ", r), this.emit("clientError", {
									uid: e.uid,
									error_code: r.error_code,
									timestamp: r.timestamp
								})
						}
					}
				}, {
					key: "_handleClose",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayManager:_handleClose <- ", e), this.emit("close", e)
					}
				}, {
					key: "_handleError",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayManager:_handleError <- ", e), this.emit("error", e)
					}
				}, {
					key: "doSendKeepAliveTask",
					value: function() {
						var e = this;
						this.context && this.context.browser && this.context.browser.name && this.context.browser.version ? this.keepAliveTimer = f.setTimeout(function() {
							e.doSendKeepAlive({
								browser: {
									name: e.context.browser.name,
									version: e.context.browser.version
								},
								params: {
									content: {
										timestamp: "" + Date.now()
									}
								}
							})
						}, 1e3 * this.keepAliveInterval4Second) : WEBRTCLOG.error("WebRTCGateWayManager:doSendKeepAliveTask 上下文字段不存在")
					}
				}, {
					key: "doSendClientLogin",
					value: function() {
						this.cmd.lastCmd = u.WEBRTC_GATE_WAY_API.client_login.key;
						var e = {
								uid: this.context.uid,
								cid: this.context.cid,
								hasAudio: this.context.hasAudio,
								hasVideo: this.context.hasVideo,
								session_mode: this.context.session_mode,
								params: this.context.params,
								browser: this.context.browser,
								bypass_rtmp: this.context.bypass_rtmp,
								record: this.context.record
							},
							t = new d.WebRTCGateWayContext(e),
							r = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.client_login.key, t);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendClientLogin -> ", r);
						var n = this.gateway.send(r);
						if(n.code !== u.GATE_WAY_RESPONSE_CODE.OK) return WEBRTCLOG.error("WebRTCGateWayManager:doSendClientLogin:send fail, code=%s", n.code), void this.setState({
							hasLogined: !1
						});
						WEBRTCLOG.log("WebRTCGateWayManager:doSendClientLogin:send success")
					}
				}, {
					key: "doSendSdpOffer",
					value: function(e) {
						this.cmd.lastCmd = u.WEBRTC_GATE_WAY_API.sdp_offer.key;
						var t = e.hasAudio,
							r = e.hasVideo,
							n = e.session_mode,
							i = e.params,
							a = e.browser,
							o = e.bypass_rtmp,
							s = e.record,
							c = {
								uid: this.context.uid,
								cid: this.context.cid,
								hasAudio: t || this.context.hasAudio,
								hasVideo: r || this.context.hasVideo,
								session_mode: n || this.context.session_mode,
								params: i,
								browser: a || this.context.browser,
								bypass_rtmp: o || this.context.bypass_rtmp,
								record: s || this.context.record
							},
							l = new d.WebRTCGateWayContext(c),
							f = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.sdp_offer.key, l);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpOffer -> ", f);
						var p = this.gateway.send(f);
						p.code === u.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpOffer:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendSdpOffer:send fail, code=%s", p.code)
					}
				}, {
					key: "doSendIceOffer",
					value: function(e) {
						this.cmd.lastCmd = u.WEBRTC_GATE_WAY_API.ice_offer.key;
						var t = e.params,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								params: t
							},
							n = new d.WebRTCGateWayContext(r),
							i = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.ice_offer.key, n);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendIceOffer -> ", i);
						var a = this.gateway.send(i);
						a.code === u.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendIceOffer:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendIceOffer:send fail, code=%s", a.code)
					}
				}, {
					key: "doSendSdpUpdate",
					value: function(e) {
						this.cmd.lastCmd = u.WEBRTC_GATE_WAY_API.sdp_update.key;
						var t = e.hasAudio,
							r = e.hasVideo,
							n = e.session_mode,
							i = e.params,
							a = e.browser,
							o = e.bypass_rtmp,
							s = e.record,
							c = {
								uid: this.context.uid,
								cid: this.context.cid,
								hasAudio: t || this.context.hasAudio,
								hasVideo: r || this.context.hasVideo,
								session_mode: n || this.context.session_mode,
								params: i,
								browser: a || this.context.browser,
								bypass_rtmp: o || this.context.bypass_rtmp,
								record: s || this.context.record
							},
							l = new d.WebRTCGateWayContext(c),
							f = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.sdp_update.key, l);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpUpdate -> ", f);
						var p = this.gateway.send(f);
						p.code === u.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpUpdate:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendSdpUpdate:send fail, code=%s", p.code)
					}
				}, {
					key: "doSendKeepAlive",
					value: function(e) {
						var t = e.browser,
							r = e.params,
							n = {
								uid: this.context.uid,
								cid: this.context.cid,
								browser: t || this.context.browser,
								params: r
							},
							i = new d.WebRTCGateWayContext(n),
							a = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.keep_alive.key, i),
							o = this.gateway.send(a);
						o.code !== u.GATE_WAY_RESPONSE_CODE.OK && WEBRTCLOG.error("WebRTCGateWayManager:doSendKeepAlive:send fail, code=%s", o.code)
					}
				}, {
					key: "doSendLogout",
					value: function(e) {
						var t = e.browser,
							r = e.params,
							n = {
								uid: this.context.uid,
								cid: this.context.cid,
								browser: t || this.context.browser,
								params: r
							},
							i = new d.WebRTCGateWayContext(n),
							a = this.gateway.protocolHandler.pack(u.WEBRTC_GATE_WAY_API.logout.key, i);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendLogout -> ", a);
						var o = this.gateway.send(a);
						o.code === u.GATE_WAY_RESPONSE_CODE.OK ? (WEBRTCLOG.log("WebRTCGateWayManager:doSendLogout:send success"), this.setState({
							hasLogined: !1
						}), this.stopKeepAliveTimer()) : WEBRTCLOG.error("WebRTCGateWayManager:doSendLogout:send fail, code=%s", o.code)
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCGateWayManager:destroy"), this._unbindGateWayEvent(), (0, o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
					}
				}]), t
			}(c.AbstractGateWayManager);
		t.WebRTCGateWayManager = p
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.WHITEBOARD_GATE_WAY_API = {
			login: {
				key: "login",
				label: "登录(发)"
			},
			login_ack: {
				key: "login_ack",
				label: "登录回包（收）"
			},
			join: {
				key: "join",
				label: "加入通知（收)"
			},
			keep_alive: {
				key: "keep_alive",
				label: "心跳（发）"
			},
			keep_alive_ack: {
				key: "keep_alive_ack",
				label: "心跳回包（收）"
			},
			keep_alive_node: {
				key: "keep_alive_node",
				label: "节点心跳"
			},
			broadcast: {
				key: "broadcast",
				label: "广播（收、发）"
			},
			toUser: {
				key: "toUser",
				label: "私聊（收、发）"
			},
			logout: {
				key: "logout",
				label: "退出"
			}
		}, t.WHITEBOARD_SERIALIZE = {
			login: 1,
			login_ack: 2,
			join: 3,
			keep_alive: 4,
			keep_alive_ack: 5,
			keep_alive_node: 6,
			broadcast: 7,
			toUser: 8,
			logout: 9
		}, t.WHITEBOARD_UNSERIALIZE = {
			1: "login",
			2: "login_ack",
			3: "join",
			4: "keep_alive",
			5: "keep_alive_ack",
			6: "keep_alive_node",
			7: "broadcast",
			8: "toUser",
			9: "logout"
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.WEBRTC_GATE_WAY_API = {
			client_login: {
				key: "client_login",
				label: "登录"
			},
			login_ack: {
				key: "login_ack",
				label: "登录响应"
			},
			sdp_offer: {
				key: "sdp_offer",
				label: "发送sdp offer描述"
			},
			sdp_answer: {
				key: "sdp_answer",
				label: "sdp answer响应"
			},
			ice_offer: {
				key: "ice_offer",
				label: "发送ice offer描述"
			},
			ice_answer: {
				key: "ice_answer",
				label: "ice answer响应"
			},
			keep_alive: {
				key: "keep_alive",
				label: "信令层探活"
			},
			keep_alive_ack: {
				key: "keep_alive_ack",
				label: "信令层探活响应"
			},
			sdp_update: {
				key: "sdp_update",
				label: "sdp更新（关闭/打开设备时发送）"
			},
			client_join: {
				key: "client_join",
				label: "人员加入通知"
			},
			client_update: {
				key: "client_update",
				label: "人员更新（关闭/打开设备时发送）"
			},
			client_logout: {
				key: "client_logout",
				label: "人员离开"
			},
			logout: {
				key: "logout",
				label: "退出"
			},
			client_error: {
				key: "client_error",
				label: "客户端出现错误"
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.TOUSER_OF_WHITEBOARD = {
			type: 8,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					data: "sfrew",
					dst_client_id: 234
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGOUT_OF_WHITEBOARD = {
			type: 9,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					recv_bytes: 45656,
					send_bytes: 347645
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGIN_OF_WHITEBOARD = {
			type: 1,
			uid: "",
			cid: "",
			version: 31,
			content: {
				params: {
					client_type: 2,
					client_net: 2,
					client_os: 6,
					client_support_record: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGIN_ACK_OF_WHITEBOARD = {
			type: 2,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					auth_result: 100,
					client_map_addr: "10.240.76.159:8989",
					record_addr: "223.252.198.177:5990",
					record_file_name: "hfgerhg"
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_OF_WHITEBOARD = {
			type: 4,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					timestamp: 3465456456
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_NODE_OF_WHITEBOARD = {
			type: 6,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					timestamp: 3465456456
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_ACK_OF_WHITEBOARD = {
			type: 5,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					timestamp: 3465456456
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.JOIN_OF_WHITEBOARD = {
			type: 3,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					client_id: 100,
					client_map_addr: "10.240.76.159:8989",
					client_net: 4,
					client_os: 2
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.BROADCASE_OF_WHITEBOARD = {
			type: 7,
			uid: 337611,
			cid: 123122,
			version: 31,
			content: {
				params: {
					data: "3465456456"
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(323);
		Object.defineProperty(t, "BROADCASE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return n.BROADCASE_OF_WHITEBOARD
			}
		});
		var i = r(322);
		Object.defineProperty(t, "JOIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.JOIN_OF_WHITEBOARD
			}
		});
		var a = r(321);
		Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_ACK_OF_WHITEBOARD
			}
		});
		var o = r(320);
		Object.defineProperty(t, "KEEP_ALIVE_NODE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return o.KEEP_ALIVE_NODE_OF_WHITEBOARD
			}
		});
		var s = r(319);
		Object.defineProperty(t, "KEEP_ALIVE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return s.KEEP_ALIVE_OF_WHITEBOARD
			}
		});
		var c = r(318);
		Object.defineProperty(t, "LOGIN_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return c.LOGIN_ACK_OF_WHITEBOARD
			}
		});
		var u = r(317);
		Object.defineProperty(t, "LOGIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return u.LOGIN_OF_WHITEBOARD
			}
		});
		var d = r(316);
		Object.defineProperty(t, "LOGOUT_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return d.LOGOUT_OF_WHITEBOARD
			}
		});
		var l = r(315);
		Object.defineProperty(t, "TOUSER_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return l.TOUSER_OF_WHITEBOARD
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SDP_UPDATE_OF_WEBRTC = {
			type: "sdp_update",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			session_mode: "p2p",
			params: {
				content: {
					type: "offer",
					sdp: ""
				},
				dst_id: "",
				user_token_type: 0,
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SDP_OFFER_OF_WEBRTC = {
			type: "sdp_offer",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			session_mode: "p2p",
			params: {
				content: {
					type: "offer",
					sdp: ""
				},
				dst_id: "",
				user_token_type: 0,
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SDP_ANSWER_OF_WEBRTC = {
			type: "sdp_answer",
			uid: "",
			cid: "",
			params: {
				auth_res: 200,
				dst_id: "",
				content: {
					type: "answer",
					sdp: ""
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGOUT_OF_WEBRTC = {
			type: "logout",
			uid: "",
			cid: "",
			browser: {
				name: "",
				version: ""
			},
			params: {
				content: {
					timestamp: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGIN_ACK_OF_WEBRTC = {
			type: "login_ack",
			uid: "",
			cid: "",
			params: {
				auth_res: 200
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_OF_WEBRTC = {
			type: "keep_alive",
			uid: "",
			cid: "",
			browser: {
				name: "",
				version: ""
			},
			params: {
				content: {
					timestamp: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_ACK_OF_WEBRTC = {
			type: "keep_alive_ack",
			uid: "",
			cid: "",
			params: {
				content: {
					timestamp: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ICE_OFFER_OF_WEBRTC = {
			type: "ice_offer",
			uid: "",
			cid: "",
			params: {
				dst_id: "",
				content: {
					candidate: "",
					sdpMid: "",
					sdpMLineIndex: "",
					usernameFragment: ""
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ICE_ANSWER_OF_WEBRTC = {
			type: "ice_answer",
			uid: "",
			cid: "",
			params: {
				dst_id: "",
				content: {
					candidate: "",
					sdpMid: "",
					sdpMLineIndex: ""
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_UPDATE_OF_WEBRTC = {
			type: "client_update",
			uid: "",
			cid: "",
			params: {
				client_id: "123122",
				has_audio: !0,
				has_video: !0
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_ERROR_OF_WEBRTC = {
			type: "client_error",
			uid: "",
			cid: "",
			params: {
				content: {
					error_code: "",
					timestamp: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_LOGOUT_OF_WEBRTC = {
			type: "client_logout",
			uid: "",
			cid: "",
			params: {
				content: {
					logout_type: "normal",
					timestamp: 0
				}
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_LOGIN_OF_WEBRTC = {
			type: "client_login",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			session_mode: "p2p",
			params: {
				content: {},
				dst_id: "",
				user_token_type: 0,
				token: "",
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1,
				single_record_in_meeting: !1
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_JOIN_OF_WEBRTC = {
			type: "client_join",
			uid: "",
			cid: "",
			params: {
				client_id: "123122",
				has_audio: !0,
				has_video: !0
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(338);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_JOIN_OF_WEBRTC
			}
		});
		var i = r(337);
		Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.CLIENT_LOGIN_OF_WEBRTC
			}
		});
		var a = r(336);
		Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_LOGOUT_OF_WEBRTC
			}
		});
		var o = r(335);
		Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return o.CLIENT_ERROR_OF_WEBRTC
			}
		});
		var s = r(334);
		Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.CLIENT_UPDATE_OF_WEBRTC
			}
		});
		var c = r(333);
		Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return c.ICE_ANSWER_OF_WEBRTC
			}
		});
		var u = r(332);
		Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return u.ICE_OFFER_OF_WEBRTC
			}
		});
		var d = r(331);
		Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return d.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		});
		var l = r(330);
		Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return l.KEEP_ALIVE_OF_WEBRTC
			}
		});
		var f = r(329);
		Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return f.LOGIN_ACK_OF_WEBRTC
			}
		});
		var p = r(328);
		Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return p.LOGOUT_OF_WEBRTC
			}
		});
		var h = r(327);
		Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return h.SDP_ANSWER_OF_WEBRTC
			}
		});
		var m = r(326);
		Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return m.SDP_OFFER_OF_WEBRTC
			}
		});
		var v = r(325);
		Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return v.SDP_UPDATE_OF_WEBRTC
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(339);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_JOIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_LOGIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_ERROR_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.CLIENT_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.ICE_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.ICE_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.KEEP_ALIVE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.LOGIN_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.SDP_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.SDP_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.SDP_UPDATE_OF_WEBRTC
			}
		});
		var i = r(324);
		Object.defineProperty(t, "BROADCASE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.BROADCASE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "JOIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.JOIN_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.KEEP_ALIVE_ACK_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_NODE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.KEEP_ALIVE_NODE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.KEEP_ALIVE_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.LOGIN_ACK_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGIN_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.LOGIN_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.LOGOUT_OF_WHITEBOARD
			}
		}), Object.defineProperty(t, "TOUSER_OF_WHITEBOARD", {
			enumerable: !0,
			get: function() {
				return i.TOUSER_OF_WHITEBOARD
			}
		});
		var a = r(314);
		Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return a.WEBRTC_GATE_WAY_API
			}
		});
		var o = r(313);
		Object.defineProperty(t, "WHITEBOARD_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return o.WHITEBOARD_GATE_WAY_API
			}
		}), Object.defineProperty(t, "WHITEBOARD_SERIALIZE", {
			enumerable: !0,
			get: function() {
				return o.WHITEBOARD_SERIALIZE
			}
		}), Object.defineProperty(t, "WHITEBOARD_UNSERIALIZE", {
			enumerable: !0,
			get: function() {
				return o.WHITEBOARD_UNSERIALIZE
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.GATE_WAY_RESPONSE_CODE = {
			OK: "OK",
			NO_CONNECTION: "NO_CONNECTION"
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(341);
		Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return n.GATE_WAY_RESPONSE_CODE
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_NRTC_OPTION = void 0;
		var n = r(123);
		t.DEFAULT_NRTC_OPTION = new n.NRTCOption({
			container: null,
			remoteContainer: null,
			chromeId: null,
			debug: !1
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_WEBRTC_OPTION = void 0;
		var n = r(123);
		t.DEFAULT_WEBRTC_OPTION = new n.WebRTCOption({
			nim: null,
			container: null,
			remoteContainer: null,
			chromeId: null,
			debug: !1
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_NETCALL_OPTION = void 0;
		var n = r(123);
		t.DEFAULT_NETCALL_OPTION = new n.NetcallOption({
			kickLast: !1,
			nim: null,
			container: null,
			remoteContainer: null,
			mirror: !1,
			mirrorRemote: !1
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(345);
		Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_NETCALL_OPTION
			}
		});
		var i = r(344);
		Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		});
		var a = r(343);
		Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return a.DEFAULT_NRTC_OPTION
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				rtmpUrl: "",
				splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
				layout: ""
			};
		t.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC = new n.SessionConfig4Live(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordType: 0,
				isHostSpeaker: 0,
				rtmpUrl: "",
				splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
				layout: "",
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT = new n.SessionConfig4Live(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				liveEnable: !1
			};
		t.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC = new n.SessionConfig4Meeting(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				isHostSpeaker: !1,
				recordType: 0,
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT = new n.SessionConfig4Meeting(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordVideo: !1,
				recordAudio: !1,
				singleRecord: !1,
				isHostSpeaker: !1,
				recordType: "0",
				liveEnabled: !1
			};
		t.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC = new n.SessionConfig4P2P(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT = void 0;
		var n = r(69),
			i = r(76),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordVideo: !1,
				recordAudio: !1,
				singleRecord: !1,
				isHostSpeaker: !1,
				recordType: 0,
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT = new n.SessionConfig4P2P(a)
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_PUSH_CONFIG = void 0;
		var n = r(69);
		t.DEFAULT_PUSH_CONFIG = new n.PushConfig({
			enable: !0,
			needBadge: !0,
			needPushNick: !0,
			pushContent: "",
			custom: "",
			pushPayload: "",
			sound: !0
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(353);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_PUSH_CONFIG
			}
		});
		var i = r(352);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		});
		var a = r(351);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		});
		var o = r(350);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return o.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		});
		var s = r(349);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		});
		var c = r(348);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return c.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		});
		var u = r(347);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return u.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(354);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return n.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		});
		var i = r(346);
		Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NRTC_OPTION
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SCALE_TYPE = {
			CHAT_VIDEO_SCALE_None: 0,
			CHAT_VIDEO_SCALE_1x1: 1,
			CHAT_VIDEO_SCALE_4x3: 2,
			CHAT_VIDEO_SCALE_16x9: 3
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.VIDEO_ENCODE_MODE = {
			CHAT_VIDEO_ENCODEMODE_NORMAL: 0,
			CHAT_VIDEO_ENCODEMODE_SMOOTH: 1,
			CHAT_VIDEO_ENCODEMODE_QUALITY: 2,
			CHAT_VIDEO_ENCODEMODE_SCREEN: 3
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DECTECT_TYPE = {
			NETDETECT_AUDIO: 0,
			NETDETECT_VIDEO: 1
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DECTECT_RESULT_TYPE = {
			CHAT_NET_STATUS_VERY_GOOD: 0,
			CHAT_NET_STATUS_GOOD: 1,
			CHAT_NET_STATUS_POOR: 2,
			CHAT_NET_STATUS_BAD: 3,
			CHAT_NET_STATUS_VERY_BAD: 4,
			CHAT_NET_STATUS_VERY_BAD_VIDEO_CLOSE: -1
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SESSION_MODE = {
			P2P: "p2p",
			MEETING: "meeting"
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.HANGUP_TYPE = {
			HANGUP_TYPE_NORMAL: 0,
			HANGUP_TYPE_TIMEOUT: -1
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ROLE_FOR_MEETING = {
			ROLE_PLAYER: 0,
			ROLE_AUDIENCE: 1
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SPLIT_MODE = {
			LAYOUT_SPLITBOTTOMHORFLOATING: 0,
			LAYOUT_SPLITTOPHORFLOATING: 1,
			LAYOUT_SPLITLATTICETILE: 2,
			LAYOUT_SPLITLATTICECUTTINGTILE: 3,
			LAYOUT_SPLITCUSTOM: 4,
			LAYOUT_SPLITAUDIO: 5
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.NETCALL_TYPE = {
			NETCALL_TYPE_AUDIO: 1,
			NETCALL_TYPE_VIDEO: 2
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DEVICE_TYPE = {
			DEVICE_TYPE_AUDIO_IN: 0,
			DEVICE_TYPE_AUDIO_OUT_LOCAL: 1,
			DEVICE_TYPE_AUDIO_OUT_CHAT: 2,
			DEVICE_TYPE_VIDEO: 3,
			DEVICE_TYPE_DESKTOP_SCREEN: 4,
			DEVICE_TYPE_DESKTOP_WINDOW: 5,
			DEVICE_TYPE_DESKTOP_CHROME_SCREEN: 6
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CONFIG_MAP = void 0;
		var n, i, a, o = r(158),
			s = (n = o) && n.__esModule ? n : {
				default: n
			};
		var c = {
			CURRENT: {
				SDK_TYPE: null
			},
			SDK_TYPE: {
				NETCALL: 1,
				WEBRTC: 2,
				WHITEBOARD: 3,
				NRTC: 4
			},
			SDK_NAME: {
				1: "Netcall",
				2: "WebRTC",
				3: "WhiteBoard",
				4: "NRTC"
			}
		};
		c.STATS_FUN = (i = {}, (0, s.default)(i, c.SDK_TYPE.NETCALL, 1), (0, s.default)(i, c.SDK_TYPE.WEBRTC, 1), (0, s.default)(i, c.SDK_TYPE.NRTC, 1), (0, s.default)(i, c.SDK_TYPE.WHITEBOARD, 0), i), c.STATS_RTC = (a = {}, (0, s.default)(a, c.SDK_TYPE.WEBRTC, 1), (0, s.default)(a, c.SDK_TYPE.NRTC, 1), (0, s.default)(a, c.SDK_TYPE.WHITEBOARD, 0), a), t.CONFIG_MAP = c
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CONTROL_TYPE = {
			NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON: 1,
			NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF: 2,
			NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON: 3,
			NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF: 4,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO: 5,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE: 6,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT: 7,
			NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO: 8,
			NETCALL_CONTROL_COMMAND_BUSY: 9,
			NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID: 10,
			NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID: 11,
			NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND: 12,
			NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED: 13,
			NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START: 14,
			NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP: 15
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.validateVideoFrameRate = function(e) {
			var t = Object.keys(n),
				r = !1;
			for(var i in t) n[i] === e && (r = !0);
			return r
		};
		var n = t.VIDEO_FRAME_RATE = {
			CHAT_VIDEO_FRAME_RATE_NORMAL: 0,
			CHAT_VIDEO_FRAME_RATE_5: 1,
			CHAT_VIDEO_FRAME_RATE_10: 2,
			CHAT_VIDEO_FRAME_RATE_15: 3,
			CHAT_VIDEO_FRAME_RATE_20: 4,
			CHAT_VIDEO_FRAME_RATE_25: 5
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.validateVideoQuality = function(e) {
			var t = Object.keys(n),
				r = !1;
			for(var i in t) n[i] === e && (r = !0);
			return r
		};
		var n = t.VIDEO_QUALITY = {
			CHAT_VIDEO_QUALITY_NORMAL: 0,
			CHAT_VIDEO_QUALITY_LOW: 1,
			CHAT_VIDEO_QUALITY_MEDIUM: 2,
			CHAT_VIDEO_QUALITY_HIGH: 3,
			CHAT_VIDEO_QUALITY_480P: 4,
			CHAT_VIDEO_QUALITY_540P: 5,
			CHAT_VIDEO_QUALITY_720P: 6,
			CHAT_VIDEO_QUALITY_1080P: 7
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelRequestParam4NRTC = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.JoinChannelRequestParam4NRTC = function e(t) {
			(0, a.default)(this, e);
			var r = t.appkey,
				n = t.cid,
				i = t.uid,
				o = t.token,
				s = t.turnToken,
				c = t.role,
				u = t.liveEnable,
				d = t.sessionMode,
				l = t.wssArr,
				f = t.sessionConfig;
			this.appkey = r, this.cid = n, this.uid = i, this.token = o, this.turnToken = s, this.role = c, this.liveEnable = u, this.sessionMode = d, this.wssArr = l, this.sessionConfig = f
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoViewRemoteSizeRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.SetVideoViewRemoteSizeRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.width,
				i = t.height,
				o = t.cut;
			this.account = r, this.width = n, this.height = i, this.cut = o
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoViewSizeRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.SetVideoViewSizeRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.width,
				n = t.height,
				i = t.cut;
			this.width = r, this.height = n, this.cut = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.StartRemoteStreamRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.StartRemoteStreamRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.node,
				i = t.poster;
			this.account = r, this.node = n, this.poster = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.StartDeviceRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.StartDeviceRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.type,
				n = t.device,
				i = t.width,
				o = t.height,
				s = t.account,
				c = t.uid;
			this.type = r, this.device = n, void 0 !== i && (this.width = i), void 0 !== o && (this.height = o), void 0 !== s && (this.account = s), void 0 !== c && (this.uid = c)
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoScaleRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.SetVideoScaleRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.type;
			this.account = r, this.type = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.JoinChannelRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.channelName,
				n = t.type,
				i = t.sessionConfig;
			this.channelName = r, this.type = n, this.sessionConfig = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CreateChannelRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.CreateChannelRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.channelName,
				n = t.custom,
				i = t.webrtcEnable;
			this.channelName = r, this.custom = n, this.webrtcEnable = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ControlRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.ControlRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.channelId,
				n = t.command;
			this.channelId = r, this.command = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ResponseRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.ResponseRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.accepted,
				n = t.beCalledInfo,
				i = t.sessionConfig,
				o = t.channelId,
				s = t.command;
			this.accepted = r, this.beCalledInfo = n, this.sessionConfig = i, this.channelId = o, this.command = s
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallRequestParam = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.CallRequestParam = function e(t) {
			(0, a.default)(this, e);
			var r = t.type,
				n = t.webrtcEnable,
				i = t.account,
				o = t.pushConfig,
				s = t.sessionConfig;
			this.type = r, this.webrtcEnable = n, this.account = i, this.pushConfig = o, this.sessionConfig = s
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(380);
		Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return n.CallRequestParam
			}
		});
		var i = r(379);
		Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ResponseRequestParam
			}
		});
		var a = r(378);
		Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ControlRequestParam
			}
		});
		var o = r(377);
		Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return o.CreateChannelRequestParam
			}
		});
		var s = r(376);
		Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return s.JoinChannelRequestParam
			}
		});
		var c = r(375);
		Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return c.SetVideoScaleRequestParam
			}
		});
		var u = r(374);
		Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return u.StartDeviceRequestParam
			}
		});
		var d = r(373);
		Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return d.StartRemoteStreamRequestParam
			}
		});
		var l = r(372);
		Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return l.SetVideoViewSizeRequestParam
			}
		});
		var f = r(371);
		Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return f.SetVideoViewRemoteSizeRequestParam
			}
		});
		var p = r(370);
		Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return p.JoinChannelRequestParam4NRTC
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NRTCOption = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.NRTCOption = function e(t) {
			(0, a.default)(this, e);
			var r = t.container,
				n = t.remoteContainer,
				i = t.chromeId,
				o = t.debug;
			this.container = r, this.remoteContainer = n, this.chromeId = i, this.debug = o
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCOption = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.WebRTCOption = function e(t) {
			(0, a.default)(this, e);
			var r = t.nim,
				n = t.container,
				i = t.remoteContainer,
				o = t.chromeId,
				s = t.debug;
			this.nim = r, this.container = n, this.remoteContainer = i, this.chromeId = o, this.debug = s
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NetcallOption = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.NetcallOption = function e(t) {
			(0, a.default)(this, e);
			var r = t.kickLast,
				n = t.nim,
				i = t.container,
				o = t.remoteContainer,
				s = t.mirror,
				c = t.mirrorRemote;
			this.kickLast = r, this.nim = n, this.container = i, this.remoteContainer = o, this.mirror = s, this.mirrorRemote = c
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4Live = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, n.default)(this, t), e.recordVideo = void 0, e.recordAudio = void 0, e.isHostSpeaker = void 0, e.recordType = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(r(124).SessionConfig);
		t.SessionConfig4Live = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4Meeting = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, n.default)(this, t), e.recordVideo = void 0, e.recordAudio = void 0, e.isHostSpeaker = void 0, e.recordType = void 0, e.rtmpUrl = void 0, e.splitMode = void 0, e.layout = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(r(124).SessionConfig);
		t.SessionConfig4Meeting = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4P2P = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, n.default)(this, t), e.rtmpUrl = void 0, e.splitMode = void 0, e.layout = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(r(124).SessionConfig);
		t.SessionConfig4P2P = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PushConfig = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.PushConfig = function e(t) {
			(0, a.default)(this, e);
			var r = t.enable,
				n = t.needBadge,
				i = t.needPushNick,
				o = t.pushContent,
				s = t.custom,
				c = t.pushPayload,
				u = t.sound;
			this.enable = r, this.needBadge = n, this.needPushNick = i, this.pushContent = o, this.custom = s, this.pushPayload = c, this.sound = u
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(69);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return n.PushConfig
			}
		}), Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return n.SessionConfig
			}
		}), Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return n.SessionConfig4P2P
			}
		}), Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return n.SessionConfig4Meeting
			}
		}), Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return n.SessionConfig4Live
			}
		});
		var i = r(123);
		Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return i.NetcallOption
			}
		}), Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		}), Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return i.NRTCOption
			}
		});
		var a = r(381);
		Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return a.CallRequestParam
			}
		}), Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ResponseRequestParam
			}
		}), Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ControlRequestParam
			}
		}), Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return a.CreateChannelRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return a.JoinChannelRequestParam
			}
		}), Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoScaleRequestParam
			}
		}), Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return a.StartDeviceRequestParam
			}
		}), Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return a.StartRemoteStreamRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoViewSizeRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoViewRemoteSizeRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return a.JoinChannelRequestParam4NRTC
			}
		});
		var o = r(76);
		Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return o.validateVideoQuality
			}
		}), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return o.validateVideoFrameRate
			}
		}), Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return o.CONTROL_TYPE
			}
		}), Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return o.CONFIG_MAP
			}
		}), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DECTECT_RESULT_TYPE
			}
		}), Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DECTECT_TYPE
			}
		}), Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DEVICE_TYPE
			}
		}), Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return o.NETCALL_TYPE
			}
		}), Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return o.SCALE_TYPE
			}
		}), Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return o.SPLIT_MODE
			}
		}), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_ENCODE_MODE
			}
		}), Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return o.ROLE_FOR_MEETING
			}
		}), Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return o.HANGUP_TYPE
			}
		}), Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return o.SESSION_MODE
			}
		});
		var s = r(355);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_NRTC_OPTION
			}
		});
		var c = r(342);
		Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return c.GATE_WAY_RESPONSE_CODE
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.LeaveChannelEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.LeaveChannelEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.channelId;
			this.account = r, this.channelId = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RemoteTrackEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.RemoteTrackEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.track,
				n = t.account,
				i = t.channelId;
			this.track = r, this.account = n, this.channelId = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.JoinChannelEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.channelId;
			this.account = r, this.channelId = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ControlEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.ControlEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.channelId,
				n = t.command;
			this.channelId = r, this.command = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.HangupEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.HangupEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.timetag,
				n = t.channelId,
				i = t.account,
				o = t.type;
			this.timetag = r, this.channelId = n, this.account = i, this.type = o
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallerAckSyncEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.CallerAckSyncEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.timetag,
				n = t.channelId,
				i = t.type,
				o = t.accepted,
				s = t.fromClientType;
			this.timetag = r, this.channelId = n, this.type = i, this.accepted = o, this.fromClientType = s
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallResponseEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.CallResponseEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.type;
			this.account = r, this.type = n
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.BeCallingEvent = void 0;
		var n, i = r(1),
			a = (n = i) && n.__esModule ? n : {
				default: n
			};
		t.BeCallingEvent = function e(t) {
			(0, a.default)(this, e);
			var r = t.account,
				n = t.type,
				i = t.channelId;
			this.account = r, this.type = n, this.channelId = i
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(397);
		Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return n.BeCallingEvent
			}
		});
		var i = r(396);
		Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return i.CallResponseEvent
			}
		});
		var a = r(395);
		Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return a.CallerAckSyncEvent
			}
		});
		var o = r(394);
		Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return o.HangupEvent
			}
		});
		var s = r(393);
		Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return s.ControlEvent
			}
		});
		var c = r(392);
		Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return c.JoinChannelEvent
			}
		});
		var u = r(391);
		Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return u.RemoteTrackEvent
			}
		});
		var d = r(390);
		Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return d.LeaveChannelEvent
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.RTC_EVENTS = {
			beCalling: {
				key: "beCalling",
				label: "收到呼叫通知"
			},
			callAccepted: {
				key: "callAccepted",
				label: "主叫收到被叫应答通知: 接受"
			},
			callRejected: {
				key: "callRejected",
				label: "主叫收到被叫应答通知: 拒绝"
			},
			control: {
				key: "control",
				label: "通话进行中收到对端的控制通知"
			},
			hangup: {
				key: "hangup",
				label: "收到挂断通知"
			},
			callerAckSync: {
				key: "callerAckSync",
				label: "其他端已处理的通知"
			},
			joinChannel: {
				key: "joinChannel",
				label: "收到用户加入房间的通知"
			},
			leaveChannel: {
				key: "leaveChannel",
				label: "收到用户离开房间的通知"
			},
			sessionDuration: {
				key: "sessionDuration",
				label: "通话计时"
			},
			audioVolume: {
				key: "audioVolume",
				label: "当前所有参与通话者的音量大小实时回调通知"
			},
			deviceAdd: {
				key: "deviceAdd",
				label: "设备新增通知"
			},
			deviceRemove: {
				key: "deviceRemove",
				label: "设备移除通知"
			},
			deviceStatus: {
				key: "deviceStatus",
				label: "设备状态变化通知"
			},
			remoteTrack: {
				key: "remoteTrack",
				label: "收到用户媒体流的通知"
			},
			addTrack: {
				key: "addTrack",
				label: "添加轨道事件"
			},
			removeTrack: {
				key: "removeTrack",
				label: "删除轨道事件"
			}
		}
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(399);
		Object.defineProperty(t, "RTC_EVENTS", {
			enumerable: !0,
			get: function() {
				return n.RTC_EVENTS
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = r(400);
		Object.defineProperty(t, "RTC_EVENTS", {
			enumerable: !0,
			get: function() {
				return n.RTC_EVENTS
			}
		});
		var i = r(398);
		Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return i.BeCallingEvent
			}
		}), Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return i.CallResponseEvent
			}
		}), Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return i.CallerAckSyncEvent
			}
		}), Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return i.HangupEvent
			}
		}), Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return i.ControlEvent
			}
		}), Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelEvent
			}
		}), Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return i.RemoteTrackEvent
			}
		}), Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return i.LeaveChannelEvent
			}
		})
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWay = void 0;
		var n = o(r(1)),
			i = o(r(3)),
			a = o(r(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, n.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(r(187).AbstractGateWay);
		t.WebRTCGateWay = s
	}, function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC = void 0;
		var n = l(r(1)),
			i = l(r(4)),
			a = l(r(3)),
			o = l(r(2)),
			s = l(r(119)),
			c = r(188),
			u = r(22),
			d = l(r(21));

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = function(e) {
			function t(e) {
				(0, n.default)(this, t), e = Object.assign(u.DEFAULT_WEBRTC_OPTION, e), u.CONFIG_MAP.CURRENT.SDK_TYPE = u.CONFIG_MAP.SDK_TYPE.WEBRTC;
				var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return r.adapterRef.instance = r, r.adapterRef.nim = e.nim, r._initApiReportHelper(), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_initIMBusiness", r).call(r), /safari/gi.test(d.default.name) ? window.addEventListener("pagehide", r.beforeunload.bind(r)) : window.addEventListener("beforeunload", r.beforeunload.bind(r)), r
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "beforeunload",
				value: function() {
					console.log("beforeunload event fire", this.adapterRef.imInfo), this.adapterRef.imInfo && (this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.P2P ? (WEBRTCLOG.log("===== 即将执行SDK内部的hangup逻辑"), this.adapterRef.instance.emit("hangup", {
						channelId: this.adapterRef.imInfo.cid,
						account: this.adapterRef.instance._getAccountByUid(this.adapterRef.imInfo.uid),
						type: 0
					}), this.hangup()) : this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.MEETING ? (this.adapterRef.instance.emit("leaveChannel", {
						account: this.adapterRef.instance._getAccountByUid(uid),
						channelId: this.adapterRef.imInfo.cid
					}), this.leaveChannel()) : this.adapterRef.beCalledInfo && (WEBRTCLOG.log("===== 拒绝来电"), WEBRTCLOG.log("beCalledInfo:", this.adapterRef.beCalledInfo), this.control({
						channelId: this.adapterRef.beCalledInfo.channelId,
						command: u.CONTROL_TYPE.NETCALL_CONTROL_COMMAND_BUSY
					}), this.response({
						accepted: !1,
						beCalledInfo: this.adapterRef.beCalledInfo
					})))
				}
			}, {
				key: "isCurrentChannelId",
				value: function(e) {
					return this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
				}
			}, {
				key: "notCurrentChannelId",
				value: function(e) {
					return !this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
				}
			}, {
				key: "resetWhenHangup",
				value: function() {
					(0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_stopSession", this).call(this), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_resetStatus", this).call(this)
				}
			}, {
				key: "setAudioBlack",
				value: function(e) {
					var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
					this.adapterRef.commonApi.setAudioBlack(t)
				}
			}, {
				key: "setAudioStart",
				value: function(e) {
					var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
					this.adapterRef.commonApi.setAudioStart(t)
				}
			}, {
				key: "setVideoBlack",
				value: function(e) {
					var t = this.adapterRef.account4UidMap[e];
					this.adapterRef.commonApi.setVideoBlack(t)
				}
			}, {
				key: "setVideoShow",
				value: function(e) {
					var t = this.adapterRef.account4UidMap[e];
					this.adapterRef.commonApi.setVideoShow(t)
				}
			}, {
				key: "startRtc",
				value: function() {
					return this.adapterRef.commonApi.startRtc()
				}
			}, {
				key: "initSignal",
				value: function() {
					return Promise.resolve()
				}
			}, {
				key: "setNetcallSession",
				value: function(e) {
					return this.adapterRef.p2p4WebRTCApi.setNetcallSession(e)
				}
			}, {
				key: "call",
				value: function(e) {
					return this.adapterRef.p2p4WebRTCApi.call(e)
				}
			}, {
				key: "response",
				value: function(e) {
					return this.setStartSessionTime(), this.adapterRef.p2p4WebRTCApi.response(e)
				}
			}, {
				key: "hangup",
				value: function() {
					this.setEndSessionTime(), this.adapterRef.p2p4WebRTCApi.hangup()
				}
			}, {
				key: "control",
				value: function(e) {
					this.adapterRef.p2p4WebRTCApi.control(e)
				}
			}, {
				key: "switchAudioToVideo",
				value: function() {
					this.adapterRef.p2p4WebRTCApi.switchAudioToVideo()
				}
			}, {
				key: "switchVideoToAudio",
				value: function() {
					this.adapterRef.p2p4WebRTCApi.switchVideoToAudio()
				}
			}, {
				key: "createChannel",
				value: function(e) {
					return this.adapterRef.meeting4WebRTCApi.createChannel(e)
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					return this.setStartSessionTime(), this.adapterRef.meeting4WebRTCApi.joinChannel(e)
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.setEndSessionTime(), this.adapterRef.meeting4WebRTCApi.leaveChannel()
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					return this.adapterRef.meeting4WebRTCApi.changeRoleToPlayer()
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					return this.adapterRef.meeting4WebRTCApi.changeRoleToAudience()
				}
			}, {
				key: "setCaptureVolume",
				value: function(e) {
					this.adapterRef.captureApi.setCaptureVolume(e)
				}
			}, {
				key: "getDevicesOfType",
				value: function(e) {
					return this.adapterRef.deviceApi.getDevicesOfType(e)
				}
			}, {
				key: "startDevice",
				value: function(e) {
					return this.adapterRef.deviceApi.startDevice(e)
				}
			}, {
				key: "stopDevice",
				value: function(e) {
					return this.adapterRef.deviceApi.stopDevice(e)
				}
			}, {
				key: "startLocalStream",
				value: function(e) {
					return this.adapterRef.playApi.startLocalStream(e)
				}
			}, {
				key: "stopLocalStream",
				value: function() {
					this.adapterRef.playApi.stopLocalStream()
				}
			}, {
				key: "startRemoteStream",
				value: function(e) {
					var t = e.account;
					return t && (e.account = this._getUidByAccount(t)), this.adapterRef.playApi.startRemoteStream(e)
				}
			}, {
				key: "stopRemoteStream",
				value: function(e) {
					var t = "";
					e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.stopRemoteStream(t)
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					return this.adapterRef.playApi.setPlayVolume(e)
				}
			}, {
				key: "setVideoViewSize",
				value: function(e) {
					return this.adapterRef.playApi.setVideoViewSize(e)
				}
			}, {
				key: "setVideoViewRemoteSize",
				value: function(e) {
					var t = e.account;
					return t && (e.account = this._getUidByAccount(t)), this.adapterRef.playApi.setVideoViewRemoteSize(e)
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					this.adapterRef.playApi.resumeLocalStream()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					this.adapterRef.playApi.suspendLocalStream()
				}
			}, {
				key: "resumeRemoteStream",
				value: function(e) {
					var t = "";
					e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.resumeRemoteStream(t)
				}
			}, {
				key: "suspendRemoteStream",
				value: function(e) {
					var t = "";
					e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.suspendRemoteStream(t)
				}
			}, {
				key: "startRecordMp4",
				value: function(e) {
					var r = (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_getUidByAccount", this).call(this, e);
					return this.adapterRef.recordApi.startRecordMp4(r)
				}
			}, {
				key: "startRecordAac",
				value: function() {
					return this.adapterRef.recordApi.startRecordAac()
				}
			}, {
				key: "stopRecordMp4",
				value: function() {
					return this.adapterRef.recordApi.stopRecordMp4()
				}
			}, {
				key: "stopRecordAac",
				value: function() {
					return this.adapterRef.recordApi.stopRecordMp4()
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = e.uid;
					return t ? this.adapterRef.meeting4NRTCApi.updateRtmpHost(t) : Promise.reject("nrtc: 请填写设置互动直播主画面操作uid！")
				}
			}, {
				key: "destroy",
				value: function() {
					(0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
				}
			}]), t
		}(c.AbstractAdapter);
		t.WebRTC = f
	}, function(e, t, r) {
		"use strict";
		e.exports = {
			pushConfig: {
				1: "enable",
				2: "needBadge",
				3: "needPushNick",
				4: "pushContent",
				5: "custom",
				6: "pushPayload",
				7: "sound",
				9: "forceKeepCalling",
				10: "webrtcEnable"
			},
			liveOption: {
				1: "liveEnable",
				2: "webrtcEnable"
			}
		}
	}, function(e, t, r) {
		"use strict";
		e.exports = {
			pushConfig: {
				enable: 1,
				needBadge: 2,
				needPushNick: 3,
				pushContent: 4,
				custom: 5,
				pushPayload: 6,
				sound: 7,
				forceKeepCalling: 9,
				webrtcEnable: 10
			},
			liveOption: {
				liveEnable: 1,
				webrtcEnable: 2
			}
		}
	}, function(e, t, r) {
		"use strict";
		var n = {
				netcall: {
					id: 9,
					initNetcall: 1,
					keepCalling: 3,
					calleeAck: 4,
					notifyCalleeAck: 5,
					hangup: 6,
					notifyHangup: 7,
					netcallControl: 8,
					notifyNetcallControl: 9,
					verifyChannelId: 10,
					createChannel: 13,
					joinChannel: 14,
					queryAccountUidMap: 16
				}
			},
			i = {
				initNetcall: {
					sid: 9,
					cid: n.netcall.initNetcall,
					params: [{
						type: "byte",
						name: "type"
					}, {
						type: "StrArray",
						name: "accounts"
					}, {
						type: "String",
						name: "pushContent"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "Property",
						name: "pushConfig"
					}]
				},
				keepCalling: {
					sid: 9,
					cid: n.netcall.keepCalling,
					params: [{
						type: "byte",
						name: "type"
					}, {
						type: "StrArray",
						name: "accounts"
					}, {
						type: "long",
						name: "channelId"
					}]
				},
				calleeAck: {
					sid: 9,
					cid: n.netcall.calleeAck,
					params: [{
						type: "string",
						name: "account"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}]
				},
				hangup: {
					sid: 9,
					cid: n.netcall.hangup,
					params: [{
						type: "long",
						name: "channelId"
					}]
				},
				netcallControl: {
					sid: 9,
					cid: n.netcall.netcallControl,
					params: [{
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}]
				},
				verifyChannelId: {
					sid: 9,
					cid: n.netcall.verifyChannelId,
					params: [{
						type: "long",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}]
				},
				createChannel: {
					sid: 9,
					cid: n.netcall.createChannel,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "String",
						name: "webrtcEnable"
					}]
				},
				joinChannel: {
					sid: 9,
					cid: n.netcall.joinChannel,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "Property",
						name: "liveOption"
					}]
				},
				queryAccountUidMap: {
					sid: 9,
					cid: n.netcall.queryAccountUidMap,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "LongArray",
						name: "uids"
					}]
				}
			},
			a = {
				"9_1": {
					service: "netcall",
					cmd: "initNetcall",
					response: [{
						type: "Number",
						name: "timetag"
					}, {
						type: "Number",
						name: "uid"
					}, {
						type: "Number",
						name: "channelId"
					}, {
						type: "StrArray",
						name: "turnServerList"
					}, {
						type: "StrArray",
						name: "sturnServerList"
					}, {
						type: "StrArray",
						name: "proxyServerList"
					}, {
						type: "StrArray",
						name: "keepCallingAccounts"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "serverMap"
					}]
				},
				"9_2": {
					service: "netcall",
					cmd: "beCalled",
					response: [{
						type: "Number",
						name: "timetag"
					}, {
						type: "Number",
						name: "type"
					}, {
						type: "Number",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}, {
						type: "Number",
						name: "uid"
					}, {
						type: "StrArray",
						name: "turnServerList"
					}, {
						type: "StrArray",
						name: "sturnServerList"
					}, {
						type: "StrArray",
						name: "proxyServerList"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "Property",
						name: "pushConfig"
					}, {
						type: "String",
						name: "serverMap"
					}]
				},
				"9_3": {
					service: "netcall",
					cmd: "keepCalling",
					response: [{
						type: "StrArr",
						name: "accounts"
					}]
				},
				"9_4": {
					service: "netcall",
					cmd: "calleeAck",
					response: []
				},
				"9_5": {
					service: "netcall",
					cmd: "notifyCalleeAck",
					response: [{
						type: "String",
						name: "account"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}]
				},
				"9_6": {
					service: "netcall",
					cmd: "hangup",
					response: []
				},
				"9_7": {
					service: "netcall",
					cmd: "notifyHangup",
					response: [{
						type: "long",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}, {
						type: "long",
						name: "timetag"
					}]
				},
				"9_8": {
					service: "netcall",
					cmd: "netcallControl",
					response: []
				},
				"9_9": {
					service: "netcall",
					cmd: "notifyNetcallControl",
					response: [{
						type: "String",
						name: "account"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "long",
						name: "channelId"
					}]
				},
				"9_10": {
					service: "netcall",
					cmd: "verifyChannelId",
					response: []
				},
				"9_11": {
					service: "netcall",
					cmd: "notifyNetcallRecord",
					response: [{
						type: "Property",
						name: "msg"
					}]
				},
				"9_12": {
					service: "netcall",
					cmd: "notifyCalleeAckSync",
					response: [{
						type: "String",
						name: "timetag"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}, {
						type: "byte",
						name: "fromClientType"
					}]
				},
				"9_13": {
					service: "netcall",
					cmd: "createChannel",
					response: [{
						type: "long",
						name: "timetag"
					}]
				},
				"9_14": {
					service: "netcall",
					cmd: "joinChannel",
					response: [{
						type: "long",
						name: "timetag"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "serverMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "custom"
					}]
				},
				"9_15": {
					service: "netcall",
					cmd: "notifyJoin",
					response: [{
						type: "Long",
						name: "channelId"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}]
				},
				"9_16": {
					service: "netcall",
					cmd: "queryAccountUidMap",
					response: []
				}
			};
		e.exports = {
			idMap: n,
			cmdConfig: i,
			packetConfig: a
		}
	}, function(e, t, r) {
		"use strict";
		var n = {
			install: function(e) {
				var t = e.Protocol.fn;
				t.processNetcall = function(e) {
					switch(e.cmd) {
						case "initNetcall":
							this.onInitNetcall(e);
							break;
						case "beCalled":
							this.onBeCalled(e);
							break;
						case "keepCalling":
							this.onKeepCalling(e);
							break;
						case "calleeAck":
							break;
						case "notifyCalleeAck":
							this.onNotifyCalleeAck(e);
							break;
						case "hangup":
							break;
						case "notifyHangup":
							this.onNotifyHangup(e);
							break;
						case "notifyNetcallControl":
							this.onNetcallControl(e);
							break;
						case "notifyCalleeAckSync":
							this.onNotifyCalleeAckSync(e);
							break;
						case "notifyNetcallRecord":
							this.onMsg(e);
							break;
						case "createChannel":
							break;
						case "joinChannel":
							this.joinChannel(e);
							break;
						case "notifyJoin":
							this.notifyJoin(e)
					}
				}, t.onInitNetcall = function(e) {
					if(!e.error) {
						var t = e.obj.type;
						e.obj = e.content, e.obj.type = t, e.obj.accounts = e.obj.keepCallingAccounts, this.setCurrentNetcall(e.obj.channelId), this.keepCalling(e)
					}
				}, t.setCurrentNetcall = function(e) {
					this.currentNetcallChannelId = e
				}, t.onKeepCalling = function(e) {
					e.error || e.content.accounts.length && this.keepCalling(e)
				}, t.keepCalling = function(e) {
					var t = this,
						r = e.obj,
						n = r.type,
						i = r.accounts,
						a = r.channelId;
					i && i.length && setTimeout(function() {
						t.currentNetcallChannelId && t.currentNetcallChannelId === a && t.api.keepCalling({
							type: n,
							accounts: i,
							channelId: a
						}).catch(function() {})
					}, 3e3)
				}, t.onBeCalled = function(e) {
					e.error || this.emitAPI({
						type: "beCalled",
						obj: e.content
					})
				}, t.onNotifyCalleeAck = function(e) {
					e.error || this.emitAPI({
						type: "notifyCalleeAck",
						obj: e.content
					})
				}, t.onNotifyHangup = function(e) {
					e.error || this.emitAPI({
						type: "notifyHangup",
						obj: e.content
					})
				}, t.onNetcallControl = function(e) {
					e.error || this.emitAPI({
						type: "netcallControl",
						obj: e.content
					})
				}, t.onNotifyCalleeAckSync = function(e) {
					e.error || this.emitAPI({
						type: "notifyCalleeAckSync",
						obj: e.content
					})
				}, t.notifyJoin = function(e) {
					e.error || this.emitAPI({
						type: "notifyJoin",
						obj: e.content
					})
				}, t.joinChannel = function(e) {
					e.obj = e.content
				}
			}
		};
		e.exports = n
	}, function(e, t, r) {
		"use strict";
		var n = r(226),
			i = {
				install: function(e) {
					var t = e.fn,
						r = e.util,
						i = n({
							util: r
						});
					t.initNetcall = function(e) {
						return r.verifyOptions(e, "type accounts", "netcall::initNetcall"), e.pushContent = "", e.custom = "", e.pushConfig || (e.pushConfig = {}), e.pushConfig.webrtcEnable = e.webrtcEnable, e.pushConfig = new i(e.pushConfig), this.cbAndSendCmd("initNetcall", e)
					}, t.keepCalling = function(e) {
						return r.verifyOptions(e, "type accounts channelId", "netcall::keepCalling"), this.cbAndSendCmd("keepCalling", e)
					}, t.calleeAck = function(e) {
						return r.verifyOptions(e, "account channelId type accepted", "netcall::calleeAck"), this.cbAndSendCmd("calleeAck", e)
					}, t.hangup = function(e) {
						return r.verifyOptions(e, "channelId", "netcall::hangup"), this.cbAndSendCmd("hangup", e)
					}, t.netcallControl = function(e) {
						return r.verifyOptions(e, "channelId type", "netcall::netcallControl"), this.cbAndSendCmd("netcallControl", e)
					}, t.createChannel = function(e) {
						return this.cbAndSendCmd("createChannel", e)
					}, t.joinChannel = function(e) {
						return r.verifyOptions(e, "channelName", "netcall::joinChannel"), r.verifyBooleanWithDefault(e, "liveEnable", !1, "", "netcall::joinChannel"), r.verifyBooleanWithDefault(e, "webrtcEnable", !1, "", "netcall::joinChannel"), this.cbAndSendCmd("joinChannel", {
							channelName: e.channelName,
							liveOption: {
								liveEnable: e.liveEnable ? 1 : 0,
								webrtcEnable: e.webrtcEnable ? 1 : 0
							}
						})
					}, t.queryAccountUidMap = function(e, t) {
						return this.cbAndSendCmd("queryAccountUidMap", {
							channelName: e,
							uids: t
						})
					}
				}
			};
		e.exports = i
	}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n, i, a, o = l(r(158)),
			s = l(r(63));
		r(225);
		var c = r(157),
			u = r(22),
			d = r(45);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = r(408),
			p = r(407),
			h = r(406),
			m = r(405),
			v = r(404),
			_ = r(8);
		window.WEBRTCLOG = window.WEBRTCLOG ? window.WEBRTCLOG : console, t.default = (0, s.default)({
			version: _.info.version,
			versionRtc: _.info.nrtcVersion
		}, d.RtcSupport, u.NETCALL_TYPE, u.DEVICE_TYPE, u.VIDEO_QUALITY, u.VIDEO_FRAME_RATE, u.SPLIT_MODE, u.ROLE_FOR_MEETING, u.HANGUP_TYPE, u.CONTROL_TYPE, {
			deviceTypeMap: (n = {}, (0, o.default)(n, u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN, "audioIn"), (0, o.default)(n, u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL, "audioOut"), (0, o.default)(n, u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT, "audioOut"), (0, o.default)(n, u.DEVICE_TYPE.DEVICE_TYPE_VIDEO, "video"), n),
			videoMap: {
				frame: (i = {}, (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL, "640x480"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_LOW, "176x144"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_MEDIUM, "352x288"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_HIGH, "480x360"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_480P, "640x480"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P, "960x540"), (0, o.default)(i, u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P, "1280x720"), i),
				frameRate: (a = {}, (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL, 15), (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_5, 5), (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_10, 10), (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_15, 15), (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_20, 20), (0, o.default)(a, u.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_25, 25), a)
			},
			getVideoSessionConfig: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.quality,
					r = void 0 === t ? u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL : t,
					n = e.frameRate,
					i = void 0 === n ? u.VIDEO_QUALITY.CHAT_VIDEO_FRAME_RATE_NORMAL : n,
					a = {},
					o = this.videoMap.frame[r];
				return a.frameRate = this.videoMap.frameRate[i], a.width = +o.split("x")[0], a.height = +o.split("x")[1], a
			},
			getDeviceTypeMap: function(e) {
				return this.deviceTypeMap[e]
			},
			install: function(e, t) {
				f.install(e, t), p.install(e, t), e.parser.mixin({
					configMap: h,
					serializeMap: m,
					unserializeMap: v
				})
			},
			getInstance: function(e) {
				var t = e.container,
					r = e.remoteContainer,
					n = e.chromeId,
					i = e.debug,
					a = e.nim;
				return new c.WebRTC({
					container: t,
					remoteContainer: r,
					debug: i,
					nim: a,
					chromeId: n,
					apiList: [],
					ref: this
				})
			},
			destroy: function(e) {
				e && (e.destroy(), e = null)
			}
		}), e.exports = t.default
	}])
});