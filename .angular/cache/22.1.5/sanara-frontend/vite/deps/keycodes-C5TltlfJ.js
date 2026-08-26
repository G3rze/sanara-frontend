import { Bi as signal, I as EventEmitter, P as EnvironmentInjector, T as DOCUMENT, U as InjectionToken, W as Injector, rt as PLATFORM_ID, sa as ɵɵdefineInjector, wa as identity, xa as operate, xr as inject, ya as createOperatorSubscriber } from "./_resource-chunk-B6ovZ6Q1.js";
import { Ha as ɵɵdefineNgModule, M as createComponent, Nn as NgModule, Sn as Input, Va as ɵɵdefineDirective, Vt as ApplicationRef, Wa as ɵɵdefineService, Yi as ɵɵProvidersFeature, Zn as Service, ia as ɵɵattribute, ki as setClassMetadata, un as Directive, zn as Output } from "./core-Pon-_TSP.js";
import { u as isPlatformBrowser } from "./common-BL-YhwNO.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
function distinctUntilChanged(comparator, keySelector) {
	if (keySelector === void 0) keySelector = identity;
	comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
	return operate(function(source, subscriber) {
		var previousKey;
		var first = true;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			var currentKey = keySelector(value);
			if (first || !comparator(previousKey, currentKey)) {
				first = false;
				previousKey = currentKey;
				subscriber.next(value);
			}
		}));
	});
}
function defaultCompare(a, b) {
	return a === b;
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_platform-chunk.mjs
var hasV8BreakIterator;
try {
	hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
	hasV8BreakIterator = false;
}
var Platform = class Platform {
	_platformId = inject(PLATFORM_ID);
	isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
	EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
	TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
	BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
	WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
	IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
	FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
	ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
	SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
	static ɵfac = function Platform_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Platform)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: Platform,
		factory: Platform.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{ type: Service }], null, null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_shadow-dom-chunk.mjs
var shadowDomIsSupported;
function _supportsShadowDom() {
	if (shadowDomIsSupported == null) {
		const head = typeof document !== "undefined" ? document.head : null;
		shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
	}
	return shadowDomIsSupported;
}
function _getShadowRoot(element) {
	if (_supportsShadowDom()) {
		const rootNode = element.getRootNode ? element.getRootNode() : null;
		if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) return rootNode;
	}
	return null;
}
function _getFocusedElementPierceShadowDom() {
	let activeElement = typeof document !== "undefined" && document ? document.activeElement : null;
	while (activeElement && activeElement.shadowRoot) {
		const newActiveElement = activeElement.shadowRoot.activeElement;
		if (newActiveElement === activeElement) break;
		else activeElement = newActiveElement;
	}
	return activeElement;
}
function _getEventTarget(event) {
	return event.composedPath ? event.composedPath()[0] : event.target;
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_style-loader-chunk.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class _CdkPrivateStyleLoader {
	_appRef;
	_injector = inject(Injector);
	_environmentInjector = inject(EnvironmentInjector);
	load(loader) {
		const appRef = this._appRef = this._appRef || this._injector.get(ApplicationRef);
		let data = appsWithLoaders.get(appRef);
		if (!data) {
			data = {
				loaders: /* @__PURE__ */ new Set(),
				refs: []
			};
			appsWithLoaders.set(appRef, data);
			appRef.onDestroy(() => {
				appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
				appsWithLoaders.delete(appRef);
			});
		}
		if (!data.loaders.has(loader)) {
			data.loaders.add(loader);
			data.refs.push(createComponent(loader, { environmentInjector: this._environmentInjector }));
		}
	}
	static ɵfac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _CdkPrivateStyleLoader)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: _CdkPrivateStyleLoader,
		factory: _CdkPrivateStyleLoader.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkPrivateStyleLoader, [{ type: Service }], null, null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_array-chunk.mjs
function coerceArray(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_directionality-chunk.mjs
var DIR_DOCUMENT = new InjectionToken("cdk-dir-doc", {
	providedIn: "root",
	factory: () => inject(DOCUMENT)
});
var RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function _resolveDirectionality(rawValue) {
	const value = rawValue?.toLowerCase() || "";
	if (value === "auto" && typeof navigator !== "undefined" && navigator?.language) return RTL_LOCALE_PATTERN.test(navigator.language) ? "rtl" : "ltr";
	return value === "rtl" ? "rtl" : "ltr";
}
var Directionality = class Directionality {
	get value() {
		return this.valueSignal();
	}
	valueSignal = signal("ltr", ...ngDevMode ? [{ debugName: "valueSignal" }] : []);
	change = new EventEmitter();
	constructor() {
		const _document = inject(DIR_DOCUMENT, { optional: true });
		if (_document) {
			const bodyDir = _document.body ? _document.body.dir : null;
			const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
			this.valueSignal.set(_resolveDirectionality(bodyDir || htmlDir || "ltr"));
		}
	}
	ngOnDestroy() {
		this.change.complete();
	}
	static ɵfac = function Directionality_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Directionality)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: Directionality,
		factory: Directionality.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Directionality, [{ type: Service }], () => [], null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/bidi.mjs
var Dir = class Dir {
	_isInitialized = false;
	_rawDir = "";
	change = new EventEmitter();
	get dir() {
		return this.valueSignal();
	}
	set dir(value) {
		const previousValue = this.valueSignal();
		this.valueSignal.set(_resolveDirectionality(value));
		this._rawDir = value;
		if (previousValue !== this.valueSignal() && this._isInitialized) this.change.emit(this.valueSignal());
	}
	get value() {
		return this.dir;
	}
	valueSignal = signal("ltr", ...ngDevMode ? [{ debugName: "valueSignal" }] : []);
	ngAfterContentInit() {
		this._isInitialized = true;
	}
	ngOnDestroy() {
		this.change.complete();
	}
	static ɵfac = function Dir_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Dir)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: Dir,
		selectors: [[
			"",
			"dir",
			""
		]],
		hostVars: 1,
		hostBindings: function Dir_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("dir", ctx._rawDir);
		},
		inputs: { dir: "dir" },
		outputs: { change: "dirChange" },
		exportAs: ["dir"],
		features: [ɵɵProvidersFeature([{
			provide: Directionality,
			useExisting: Dir
		}])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dir, [{
		type: Directive,
		args: [{
			selector: "[dir]",
			providers: [{
				provide: Directionality,
				useExisting: Dir
			}],
			host: { "[attr.dir]": "_rawDir" },
			exportAs: "dir"
		}]
	}], null, {
		change: [{
			type: Output,
			args: ["dirChange"]
		}],
		dir: [{ type: Input }]
	});
})();
var BidiModule = class BidiModule {
	static ɵfac = function BidiModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BidiModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: BidiModule,
		imports: [Dir],
		exports: [Dir]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BidiModule, [{
		type: NgModule,
		args: [{
			imports: [Dir],
			exports: [Dir]
		}]
	}], null, null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/keycodes.mjs
function hasModifierKey(event, ...modifiers) {
	if (modifiers.length) return modifiers.some((modifier) => event[modifier]);
	return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
//#endregion
export { coerceArray as a, _getFocusedElementPierceShadowDom as c, distinctUntilChanged as d, Directionality as i, _getShadowRoot as l, BidiModule as n, _CdkPrivateStyleLoader as o, Dir as r, _getEventTarget as s, hasModifierKey as t, Platform as u };
