import { Bi as signal, D as DestroyRef, Gr as isSignal, I as EventEmitter, Mn as forwardRef, Sa as Observable, T as DOCUMENT, U as InjectionToken, W as Injector, _ as untracked, _a as BehaviorSubject, c as computed, dt as SecurityContext, et as NgZone, ka as Subscription, sa as ɵɵdefineInjector, v as ANIMATION_MODULE_TYPE, va as Subject, x as CSP_NONCE, xr as inject, y as APP_ID, yn as effect } from "./_resource-chunk-B6ovZ6Q1.js";
import { $a as ɵɵdomProperty, Ba as ɵɵdefineComponent, Gn as RendererFactory2, Ha as ɵɵdefineNgModule, Hn as QueryList, Ji as ɵɵNgOnChangesFeature, Js as map, Jt as Component, Nn as NgModule, O as booleanAttribute, Po as ɵɵlistener, Sn as Input, Va as ɵɵdefineDirective, Wa as ɵɵdefineService, X as input, Zn as Service, a as ContentChildren, at as output, fa as ɵɵcontentQuerySignal, fn as ElementRef, fr as ViewContainerRef, ia as ɵɵattribute, ir as TemplateRef, j as contentChildren, ki as setClassMetadata, ns as ɵɵqueryAdvance, nt as model, pr as ViewEncapsulation, r as ChangeDetectorRef, un as Directive, vr as afterNextRender, zn as Output } from "./core-Pon-_TSP.js";
import { C as distinctUntilChanged, S as shareReplay, _ as _CdkPrivateStyleLoader, b as _getShadowRoot, d as ViewportRuler, g as coerceArray, h as Directionality, t as hasModifierKey, v as _getEventTarget, w as timer, x as Platform, y as _getFocusedElementPierceShadowDom } from "./keycodes-CQCuehg6.js";
import { t as coerceElement } from "./_element-chunk-BwMD0orb.js";
import { i as EMPTY, n as take, r as combineLatest, t as tap } from "./tap-BMXp6-Po.js";
import { i as popNumber, n as of, o as popScheduler, r as from, t as switchMap } from "./switchMap-6S147_rv.js";
import { t as innerFrom } from "./innerFrom-Bu1mU6qO.js";
import { n as concat, r as mergeAll, t as startWith } from "./startWith-CsZmGbKV.js";
import { t as fromEvent } from "./fromEvent-DRpnW_k-.js";
import { t as filter } from "./filter-C2O4_ixY.js";
import { r as DomSanitizer } from "./platform-browser-EC2-s9QC.js";
import { a as debounceTime, i as ObserversModule, n as ContentObserver } from "./observers-B1CiA-km.js";
import { t as takeUntil } from "./takeUntil-DFj6F7LE.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/merge.js
function merge() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = popScheduler(args);
	var concurrent = popNumber(args, Infinity);
	var sources = args;
	return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/skip.js
function skip(count) {
	return filter(function(_, index) {
		return count <= index;
	});
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_fake-event-detection-chunk.mjs
function isFakeMousedownFromScreenReader(event) {
	return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
	const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
	return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_passive-listeners-chunk.mjs
var supportsPassiveEvents;
function supportsPassiveEventListeners() {
	if (supportsPassiveEvents == null && typeof window !== "undefined") try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: () => supportsPassiveEvents = true }));
	} finally {
		supportsPassiveEvents = supportsPassiveEvents || false;
	}
	return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
	return supportsPassiveEventListeners() ? options : !!options.capture;
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_focus-monitor-chunk.mjs
var INPUT_MODALITY_DETECTOR_OPTIONS = new InjectionToken("cdk-input-modality-detector-options");
var INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = { ignoreKeys: [
	18,
	17,
	224,
	91,
	16
] };
var TOUCH_BUFFER_MS = 650;
var modalityEventListenerOptions = {
	passive: true,
	capture: true
};
var InputModalityDetector = class InputModalityDetector {
	_platform = inject(Platform);
	_listenerCleanups;
	modalityDetected;
	modalityChanged;
	get mostRecentModality() {
		return this._modality.value;
	}
	_mostRecentTarget = null;
	_modality = new BehaviorSubject(null);
	_options;
	_lastTouchMs = 0;
	_onKeydown = (event) => {
		if (this._options?.ignoreKeys?.some((keyCode) => keyCode === event.keyCode)) return;
		this._modality.next("keyboard");
		this._mostRecentTarget = _getEventTarget(event);
	};
	_onMousedown = (event) => {
		if (Date.now() - this._lastTouchMs < TOUCH_BUFFER_MS) return;
		this._modality.next(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
		this._mostRecentTarget = _getEventTarget(event);
	};
	_onTouchstart = (event) => {
		if (isFakeTouchstartFromScreenReader(event)) {
			this._modality.next("keyboard");
			return;
		}
		this._lastTouchMs = Date.now();
		this._modality.next("touch");
		this._mostRecentTarget = _getEventTarget(event);
	};
	constructor() {
		const ngZone = inject(NgZone);
		const document = inject(DOCUMENT);
		const options = inject(INPUT_MODALITY_DETECTOR_OPTIONS, { optional: true });
		this._options = {
			...INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS,
			...options
		};
		this.modalityDetected = this._modality.pipe(skip(1));
		this.modalityChanged = this.modalityDetected.pipe(distinctUntilChanged());
		if (this._platform.isBrowser) {
			const renderer = inject(RendererFactory2).createRenderer(null, null);
			this._listenerCleanups = ngZone.runOutsideAngular(() => {
				return [
					renderer.listen(document, "keydown", this._onKeydown, modalityEventListenerOptions),
					renderer.listen(document, "mousedown", this._onMousedown, modalityEventListenerOptions),
					renderer.listen(document, "touchstart", this._onTouchstart, modalityEventListenerOptions)
				];
			});
		}
	}
	ngOnDestroy() {
		this._modality.complete();
		this._listenerCleanups?.forEach((cleanup) => cleanup());
	}
	static ɵfac = function InputModalityDetector_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || InputModalityDetector)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: InputModalityDetector,
		factory: InputModalityDetector.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputModalityDetector, [{ type: Service }], () => [], null);
})();
var FocusMonitorDetectionMode;
(function(FocusMonitorDetectionMode) {
	FocusMonitorDetectionMode[FocusMonitorDetectionMode["IMMEDIATE"] = 0] = "IMMEDIATE";
	FocusMonitorDetectionMode[FocusMonitorDetectionMode["EVENTUAL"] = 1] = "EVENTUAL";
})(FocusMonitorDetectionMode || (FocusMonitorDetectionMode = {}));
var FOCUS_MONITOR_DEFAULT_OPTIONS = new InjectionToken("cdk-focus-monitor-default-options");
var captureEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
var FocusMonitor = class FocusMonitor {
	_ngZone = inject(NgZone);
	_platform = inject(Platform);
	_inputModalityDetector = inject(InputModalityDetector);
	_origin = null;
	_lastFocusOrigin = null;
	_windowFocused = false;
	_windowFocusTimeoutId;
	_originTimeoutId;
	_originFromTouchInteraction = false;
	_elementInfo = /* @__PURE__ */ new Map();
	_monitoredElementCount = 0;
	_rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
	_detectionMode;
	_windowFocusListener = () => {
		this._windowFocused = true;
		this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = false);
	};
	_document = inject(DOCUMENT);
	_stopInputModalityDetector = new Subject();
	constructor() {
		const options = inject(FOCUS_MONITOR_DEFAULT_OPTIONS, { optional: true });
		this._detectionMode = options?.detectionMode || FocusMonitorDetectionMode.IMMEDIATE;
	}
	_rootNodeFocusAndBlurListener = (event) => {
		const target = _getEventTarget(event);
		for (let element = target; element; element = element.parentElement) if (event.type === "focus") this._onFocus(event, element);
		else this._onBlur(event, element);
	};
	monitor(element, checkChildren = false) {
		const nativeElement = coerceElement(element);
		if (!this._platform.isBrowser || nativeElement.nodeType !== 1) return of();
		const rootNode = _getShadowRoot(nativeElement) || this._document;
		const cachedInfo = this._elementInfo.get(nativeElement);
		if (cachedInfo) {
			if (checkChildren) cachedInfo.checkChildren = true;
			return cachedInfo.subject;
		}
		const info = {
			checkChildren,
			subject: new Subject(),
			rootNode
		};
		this._elementInfo.set(nativeElement, info);
		this._registerGlobalListeners(info);
		return info.subject;
	}
	stopMonitoring(element) {
		const nativeElement = coerceElement(element);
		const elementInfo = this._elementInfo.get(nativeElement);
		if (elementInfo) {
			elementInfo.subject.complete();
			this._setClasses(nativeElement);
			this._elementInfo.delete(nativeElement);
			this._removeGlobalListeners(elementInfo);
		}
	}
	focusVia(element, origin, options) {
		const nativeElement = coerceElement(element);
		if (nativeElement === this._document.activeElement) this._getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => this._originChanged(currentElement, origin, info));
		else {
			this._setOrigin(origin);
			if (typeof nativeElement.focus === "function") nativeElement.focus(options);
		}
	}
	ngOnDestroy() {
		this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
	}
	_getWindow() {
		return this._document.defaultView || window;
	}
	_getFocusOrigin(focusEventTarget) {
		if (this._origin) if (this._originFromTouchInteraction) return this._shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
		else return this._origin;
		if (this._windowFocused && this._lastFocusOrigin) return this._lastFocusOrigin;
		if (focusEventTarget && this._isLastInteractionFromInputLabel(focusEventTarget)) return "mouse";
		return "program";
	}
	_shouldBeAttributedToTouch(focusEventTarget) {
		return this._detectionMode === FocusMonitorDetectionMode.EVENTUAL || !!focusEventTarget?.contains(this._inputModalityDetector._mostRecentTarget);
	}
	_setClasses(element, origin) {
		element.classList.toggle("cdk-focused", !!origin);
		element.classList.toggle("cdk-touch-focused", origin === "touch");
		element.classList.toggle("cdk-keyboard-focused", origin === "keyboard");
		element.classList.toggle("cdk-mouse-focused", origin === "mouse");
		element.classList.toggle("cdk-program-focused", origin === "program");
	}
	_setOrigin(origin, isFromInteraction = false) {
		this._ngZone.runOutsideAngular(() => {
			this._origin = origin;
			this._originFromTouchInteraction = origin === "touch" && isFromInteraction;
			if (this._detectionMode === FocusMonitorDetectionMode.IMMEDIATE) {
				clearTimeout(this._originTimeoutId);
				const ms = this._originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
				this._originTimeoutId = setTimeout(() => this._origin = null, ms);
			}
		});
	}
	_onFocus(event, element) {
		const elementInfo = this._elementInfo.get(element);
		const focusEventTarget = _getEventTarget(event);
		if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) return;
		this._originChanged(element, this._getFocusOrigin(focusEventTarget), elementInfo);
	}
	_onBlur(event, element) {
		const elementInfo = this._elementInfo.get(element);
		if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
		this._setClasses(element);
		this._emitOrigin(elementInfo, null);
	}
	_emitOrigin(info, origin) {
		if (info.subject.observers.length) this._ngZone.run(() => info.subject.next(origin));
	}
	_registerGlobalListeners(elementInfo) {
		if (!this._platform.isBrowser) return;
		const rootNode = elementInfo.rootNode;
		const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode) || 0;
		if (!rootNodeFocusListeners) this._ngZone.runOutsideAngular(() => {
			rootNode.addEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
			rootNode.addEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
		});
		this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
		if (++this._monitoredElementCount === 1) {
			this._ngZone.runOutsideAngular(() => {
				this._getWindow().addEventListener("focus", this._windowFocusListener);
			});
			this._inputModalityDetector.modalityDetected.pipe(takeUntil(this._stopInputModalityDetector)).subscribe((modality) => {
				this._setOrigin(modality, true);
			});
		}
	}
	_removeGlobalListeners(elementInfo) {
		const rootNode = elementInfo.rootNode;
		if (this._rootNodeFocusListenerCount.has(rootNode)) {
			const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode);
			if (rootNodeFocusListeners > 1) this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
			else {
				rootNode.removeEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
				rootNode.removeEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
				this._rootNodeFocusListenerCount.delete(rootNode);
			}
		}
		if (!--this._monitoredElementCount) {
			this._getWindow().removeEventListener("focus", this._windowFocusListener);
			this._stopInputModalityDetector.next();
			clearTimeout(this._windowFocusTimeoutId);
			clearTimeout(this._originTimeoutId);
		}
	}
	_originChanged(element, origin, elementInfo) {
		this._setClasses(element, origin);
		this._emitOrigin(elementInfo, origin);
		this._lastFocusOrigin = origin;
	}
	_getClosestElementsInfo(element) {
		const results = [];
		this._elementInfo.forEach((info, currentElement) => {
			if (currentElement === element || info.checkChildren && currentElement.contains(element)) results.push([currentElement, info]);
		});
		return results;
	}
	_isLastInteractionFromInputLabel(focusEventTarget) {
		const { _mostRecentTarget: mostRecentTarget, mostRecentModality } = this._inputModalityDetector;
		if (mostRecentModality !== "mouse" || !mostRecentTarget || mostRecentTarget === focusEventTarget || focusEventTarget.nodeName !== "INPUT" && focusEventTarget.nodeName !== "TEXTAREA" || focusEventTarget.disabled) return false;
		const labels = focusEventTarget.labels;
		if (labels) {
			for (let i = 0; i < labels.length; i++) if (labels[i].contains(mostRecentTarget)) return true;
		}
		return false;
	}
	static ɵfac = function FocusMonitor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusMonitor)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: FocusMonitor,
		factory: FocusMonitor.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusMonitor, [{ type: Service }], () => [], null);
})();
var CdkMonitorFocus = class CdkMonitorFocus {
	_elementRef = inject(ElementRef);
	_focusMonitor = inject(FocusMonitor);
	_monitorSubscription;
	_focusOrigin = null;
	cdkFocusChange = new EventEmitter();
	get focusOrigin() {
		return this._focusOrigin;
	}
	ngAfterViewInit() {
		const element = this._elementRef.nativeElement;
		this._monitorSubscription = this._focusMonitor.monitor(element, element.nodeType === 1 && element.hasAttribute("cdkMonitorSubtreeFocus")).subscribe((origin) => {
			this._focusOrigin = origin;
			this.cdkFocusChange.emit(origin);
		});
	}
	ngOnDestroy() {
		this._focusMonitor.stopMonitoring(this._elementRef);
		this._monitorSubscription?.unsubscribe();
	}
	static ɵfac = function CdkMonitorFocus_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkMonitorFocus)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: CdkMonitorFocus,
		selectors: [[
			"",
			"cdkMonitorElementFocus",
			""
		], [
			"",
			"cdkMonitorSubtreeFocus",
			""
		]],
		outputs: { cdkFocusChange: "cdkFocusChange" },
		exportAs: ["cdkMonitorFocus"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMonitorFocus, [{
		type: Directive,
		args: [{
			selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]",
			exportAs: "cdkMonitorFocus"
		}]
	}], null, { cdkFocusChange: [{ type: Output }] });
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/private.mjs
var _VisuallyHiddenLoader = class _VisuallyHiddenLoader {
	static ɵfac = function _VisuallyHiddenLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _VisuallyHiddenLoader)();
	};
	static ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
		type: _VisuallyHiddenLoader,
		selectors: [["ng-component"]],
		exportAs: ["cdkVisuallyHidden"],
		decls: 0,
		vars: 0,
		template: function _VisuallyHiddenLoader_Template(rf, ctx) {},
		styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_VisuallyHiddenLoader, [{
		type: Component,
		args: [{
			exportAs: "cdkVisuallyHidden",
			encapsulation: ViewEncapsulation.None,
			template: "",
			styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"]
		}]
	}], null, null);
})();
var policy;
function getPolicy() {
	if (policy === void 0) {
		policy = null;
		if (typeof window !== "undefined") {
			const ttWindow = window;
			if (ttWindow.trustedTypes !== void 0) policy = ttWindow.trustedTypes.createPolicy("angular#components", { createHTML: (s) => s });
		}
	}
	return policy;
}
function trustedHTMLFromString(html) {
	return getPolicy()?.createHTML(html) || html;
}
function _setInnerHtml(element, html, sanitizer) {
	const cleanHtml = sanitizer.sanitize(SecurityContext.HTML, html);
	if (cleanHtml === null && (typeof ngDevMode === "undefined" || ngDevMode)) throw new Error(`Could not sanitize HTML: ${html}`);
	element.innerHTML = trustedHTMLFromString(cleanHtml || "");
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_breakpoints-observer-chunk.mjs
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
var MediaMatcher = class MediaMatcher {
	_platform = inject(Platform);
	_nonce = inject(CSP_NONCE, { optional: true });
	_matchMedia;
	constructor() {
		this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
	}
	matchMedia(query) {
		if (this._platform.WEBKIT || this._platform.BLINK) createEmptyStyleRule(query, this._nonce);
		return this._matchMedia(query);
	}
	static ɵfac = function MediaMatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MediaMatcher)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: MediaMatcher,
		factory: MediaMatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaMatcher, [{ type: Service }], () => [], null);
})();
function createEmptyStyleRule(query, nonce) {
	if (mediaQueriesForWebkitCompatibility.has(query)) return;
	try {
		if (!mediaQueryStyleNode) {
			mediaQueryStyleNode = document.createElement("style");
			if (nonce) mediaQueryStyleNode.setAttribute("nonce", nonce);
			mediaQueryStyleNode.setAttribute("type", "text/css");
			document.head.appendChild(mediaQueryStyleNode);
		}
		if (mediaQueryStyleNode.sheet) {
			mediaQueryStyleNode.sheet.insertRule(`@media ${query} {body{ }}`, 0);
			mediaQueriesForWebkitCompatibility.add(query);
		}
	} catch (e) {
		console.error(e);
	}
}
function noopMatchMedia(query) {
	return {
		matches: query === "all" || query === "",
		media: query,
		addListener: () => {},
		removeListener: () => {}
	};
}
var BreakpointObserver = class BreakpointObserver {
	_mediaMatcher = inject(MediaMatcher);
	_zone = inject(NgZone);
	_queries = /* @__PURE__ */ new Map();
	_destroySubject = new Subject();
	ngOnDestroy() {
		this._destroySubject.next();
		this._destroySubject.complete();
	}
	isMatched(value) {
		return splitQueries(coerceArray(value)).some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
	}
	observe(value) {
		let stateObservable = combineLatest(splitQueries(coerceArray(value)).map((query) => this._registerQuery(query).observable));
		stateObservable = concat(stateObservable.pipe(take(1)), stateObservable.pipe(skip(1), debounceTime(0)));
		return stateObservable.pipe(map((breakpointStates) => {
			const response = {
				matches: false,
				breakpoints: {}
			};
			breakpointStates.forEach(({ matches, query }) => {
				response.matches = response.matches || matches;
				response.breakpoints[query] = matches;
			});
			return response;
		}));
	}
	_registerQuery(query) {
		if (this._queries.has(query)) return this._queries.get(query);
		const mql = this._mediaMatcher.matchMedia(query);
		const output = {
			observable: new Observable((observer) => {
				const handler = (e) => this._zone.run(() => observer.next(e));
				mql.addListener(handler);
				return () => {
					mql.removeListener(handler);
				};
			}).pipe(startWith(mql), map(({ matches }) => ({
				query,
				matches
			})), takeUntil(this._destroySubject)),
			mql
		};
		this._queries.set(query, output);
		return output;
	}
	static ɵfac = function BreakpointObserver_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BreakpointObserver)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: BreakpointObserver,
		factory: BreakpointObserver.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreakpointObserver, [{ type: Service }], null, null);
})();
function splitQueries(queries) {
	return queries.map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_a11y-module-chunk.mjs
var InteractivityChecker = class InteractivityChecker {
	_platform = inject(Platform);
	isDisabled(element) {
		return element.hasAttribute("disabled");
	}
	isVisible(element) {
		return hasGeometry(element) && getComputedStyle(element).visibility === "visible";
	}
	isTabbable(element) {
		if (!this._platform.isBrowser) return false;
		const frameElement = getFrameElement(getWindow(element));
		if (frameElement) {
			if (getTabIndexValue(frameElement) === -1) return false;
			if (!this.isVisible(frameElement)) return false;
		}
		let nodeName = element.nodeName.toLowerCase();
		let tabIndexValue = getTabIndexValue(element);
		if (element.hasAttribute("contenteditable")) return tabIndexValue !== -1;
		if (nodeName === "iframe" || nodeName === "object") return false;
		if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) return false;
		if (nodeName === "audio") {
			if (!element.hasAttribute("controls")) return false;
			return tabIndexValue !== -1;
		}
		if (nodeName === "video") {
			if (tabIndexValue === -1) return false;
			if (tabIndexValue !== null) return true;
			return this._platform.FIREFOX || element.hasAttribute("controls");
		}
		return element.tabIndex >= 0;
	}
	isFocusable(element, config) {
		return isPotentiallyFocusable(element) && !this.isDisabled(element) && (config?.ignoreVisibility || this.isVisible(element));
	}
	static ɵfac = function InteractivityChecker_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || InteractivityChecker)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: InteractivityChecker,
		factory: InteractivityChecker.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InteractivityChecker, [{ type: Service }], null, null);
})();
function getFrameElement(window) {
	try {
		return window.frameElement;
	} catch {
		return null;
	}
}
function hasGeometry(element) {
	return !!(element.offsetWidth || element.offsetHeight || typeof element.getClientRects === "function" && element.getClientRects().length);
}
function isNativeFormElement(element) {
	let nodeName = element.nodeName.toLowerCase();
	return nodeName === "input" || nodeName === "select" || nodeName === "button" || nodeName === "textarea";
}
function isHiddenInput(element) {
	return isInputElement(element) && element.type == "hidden";
}
function isAnchorWithHref(element) {
	return isAnchorElement(element) && element.hasAttribute("href");
}
function isInputElement(element) {
	return element.nodeName.toLowerCase() == "input";
}
function isAnchorElement(element) {
	return element.nodeName.toLowerCase() == "a";
}
function hasValidTabIndex(element) {
	if (!element.hasAttribute("tabindex") || element.tabIndex === void 0) return false;
	let tabIndex = element.getAttribute("tabindex");
	return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
function getTabIndexValue(element) {
	if (!hasValidTabIndex(element)) return null;
	const tabIndex = parseInt(element.getAttribute("tabindex") || "", 10);
	return isNaN(tabIndex) ? -1 : tabIndex;
}
function isPotentiallyTabbableIOS(element) {
	let nodeName = element.nodeName.toLowerCase();
	let inputType = nodeName === "input" && element.type;
	return inputType === "text" || inputType === "password" || nodeName === "select" || nodeName === "textarea";
}
function isPotentiallyFocusable(element) {
	if (isHiddenInput(element)) return false;
	return isNativeFormElement(element) || isAnchorWithHref(element) || element.hasAttribute("contenteditable") || hasValidTabIndex(element);
}
function getWindow(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || window;
}
var FocusTrap = class {
	_element;
	_checker;
	_ngZone;
	_document;
	_injector;
	_startAnchor = null;
	_endAnchor = null;
	_hasAttached = false;
	startAnchorListener = () => this.focusLastTabbableElement();
	endAnchorListener = () => this.focusFirstTabbableElement();
	get enabled() {
		return this._enabled;
	}
	set enabled(value) {
		this._enabled = value;
		if (this._startAnchor && this._endAnchor) {
			this._toggleAnchorTabIndex(value, this._startAnchor);
			this._toggleAnchorTabIndex(value, this._endAnchor);
		}
	}
	_enabled = true;
	constructor(_element, _checker, _ngZone, _document, deferAnchors = false, _injector) {
		this._element = _element;
		this._checker = _checker;
		this._ngZone = _ngZone;
		this._document = _document;
		this._injector = _injector;
		if (!deferAnchors) this.attachAnchors();
	}
	destroy() {
		const startAnchor = this._startAnchor;
		const endAnchor = this._endAnchor;
		if (startAnchor) {
			startAnchor.removeEventListener("focus", this.startAnchorListener);
			startAnchor.remove();
		}
		if (endAnchor) {
			endAnchor.removeEventListener("focus", this.endAnchorListener);
			endAnchor.remove();
		}
		this._startAnchor = this._endAnchor = null;
		this._hasAttached = false;
	}
	attachAnchors() {
		if (this._hasAttached) return true;
		this._ngZone.runOutsideAngular(() => {
			if (!this._startAnchor) {
				this._startAnchor = this._createAnchor();
				this._startAnchor.addEventListener("focus", this.startAnchorListener);
			}
			if (!this._endAnchor) {
				this._endAnchor = this._createAnchor();
				this._endAnchor.addEventListener("focus", this.endAnchorListener);
			}
		});
		if (this._element.parentNode) {
			this._element.parentNode.insertBefore(this._startAnchor, this._element);
			this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
			this._hasAttached = true;
		}
		return this._hasAttached;
	}
	focusInitialElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusInitialElement(options)));
		});
	}
	focusFirstTabbableElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusFirstTabbableElement(options)));
		});
	}
	focusLastTabbableElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusLastTabbableElement(options)));
		});
	}
	_getRegionBoundary(bound) {
		const markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], [cdkFocusRegion${bound}], [cdk-focus-${bound}]`);
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			for (let i = 0; i < markers.length; i++) if (markers[i].hasAttribute(`cdk-focus-${bound}`)) console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
			else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
		}
		if (bound == "start") return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
		return markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
	}
	focusInitialElement(options) {
		const redirectToElement = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");
		if (redirectToElement) {
			if ((typeof ngDevMode === "undefined" || ngDevMode) && redirectToElement.hasAttribute(`cdk-focus-initial`)) console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0", redirectToElement);
			if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._checker.isFocusable(redirectToElement)) console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
			if (!this._checker.isFocusable(redirectToElement)) {
				const focusableChild = this._getFirstTabbableElement(redirectToElement);
				focusableChild?.focus(options);
				return !!focusableChild;
			}
			redirectToElement.focus(options);
			return true;
		}
		return this.focusFirstTabbableElement(options);
	}
	focusFirstTabbableElement(options) {
		const redirectToElement = this._getRegionBoundary("start");
		if (redirectToElement) redirectToElement.focus(options);
		return !!redirectToElement;
	}
	focusLastTabbableElement(options) {
		const redirectToElement = this._getRegionBoundary("end");
		if (redirectToElement) redirectToElement.focus(options);
		return !!redirectToElement;
	}
	hasAttached() {
		return this._hasAttached;
	}
	_getFirstTabbableElement(root) {
		if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
		const children = root.children;
		for (let i = 0; i < children.length; i++) {
			const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
			if (tabbableChild) return tabbableChild;
		}
		return null;
	}
	_getLastTabbableElement(root) {
		if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
		const children = root.children;
		for (let i = children.length - 1; i >= 0; i--) {
			const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
			if (tabbableChild) return tabbableChild;
		}
		return null;
	}
	_createAnchor() {
		const anchor = this._document.createElement("div");
		this._toggleAnchorTabIndex(this._enabled, anchor);
		anchor.classList.add("cdk-visually-hidden");
		anchor.classList.add("cdk-focus-trap-anchor");
		anchor.setAttribute("aria-hidden", "true");
		return anchor;
	}
	_toggleAnchorTabIndex(isEnabled, anchor) {
		isEnabled ? anchor.setAttribute("tabindex", "0") : anchor.removeAttribute("tabindex");
	}
	toggleAnchors(enabled) {
		if (this._startAnchor && this._endAnchor) {
			this._toggleAnchorTabIndex(enabled, this._startAnchor);
			this._toggleAnchorTabIndex(enabled, this._endAnchor);
		}
	}
	_executeOnStable(fn) {
		afterNextRender(fn, { injector: this._injector });
	}
};
var FocusTrapFactory = class FocusTrapFactory {
	_checker = inject(InteractivityChecker);
	_ngZone = inject(NgZone);
	_document = inject(DOCUMENT);
	_injector = inject(Injector);
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
	}
	create(element, deferCaptureElements = false) {
		return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements, this._injector);
	}
	static ɵfac = function FocusTrapFactory_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusTrapFactory)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: FocusTrapFactory,
		factory: FocusTrapFactory.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapFactory, [{ type: Service }], () => [], null);
})();
var CdkTrapFocus = class CdkTrapFocus {
	_elementRef = inject(ElementRef);
	_focusTrapFactory = inject(FocusTrapFactory);
	focusTrap = void 0;
	_previouslyFocusedElement = null;
	get enabled() {
		return this.focusTrap?.enabled || false;
	}
	set enabled(value) {
		if (this.focusTrap) this.focusTrap.enabled = value;
	}
	autoCapture = false;
	constructor() {
		if (inject(Platform).isBrowser) this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
	}
	ngOnDestroy() {
		this.focusTrap?.destroy();
		if (this._previouslyFocusedElement) {
			this._previouslyFocusedElement.focus();
			this._previouslyFocusedElement = null;
		}
	}
	ngAfterContentInit() {
		this.focusTrap?.attachAnchors();
		if (this.autoCapture) this._captureFocus();
	}
	ngDoCheck() {
		if (this.focusTrap && !this.focusTrap.hasAttached()) this.focusTrap.attachAnchors();
	}
	ngOnChanges(changes) {
		const autoCaptureChange = changes["autoCapture"];
		if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture && this.focusTrap?.hasAttached()) this._captureFocus();
	}
	_captureFocus() {
		this._previouslyFocusedElement = _getFocusedElementPierceShadowDom();
		this.focusTrap?.focusInitialElementWhenReady();
	}
	static ɵfac = function CdkTrapFocus_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkTrapFocus)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: CdkTrapFocus,
		selectors: [[
			"",
			"cdkTrapFocus",
			""
		]],
		inputs: {
			enabled: [
				2,
				"cdkTrapFocus",
				"enabled",
				booleanAttribute
			],
			autoCapture: [
				2,
				"cdkTrapFocusAutoCapture",
				"autoCapture",
				booleanAttribute
			]
		},
		exportAs: ["cdkTrapFocus"],
		features: [ɵɵNgOnChangesFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTrapFocus, [{
		type: Directive,
		args: [{
			selector: "[cdkTrapFocus]",
			exportAs: "cdkTrapFocus"
		}]
	}], () => [], {
		enabled: [{
			type: Input,
			args: [{
				alias: "cdkTrapFocus",
				transform: booleanAttribute
			}]
		}],
		autoCapture: [{
			type: Input,
			args: [{
				alias: "cdkTrapFocusAutoCapture",
				transform: booleanAttribute
			}]
		}]
	});
})();
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken("liveAnnouncerElement", {
	providedIn: "root",
	factory: () => null
});
var LIVE_ANNOUNCER_DEFAULT_OPTIONS = new InjectionToken("LIVE_ANNOUNCER_DEFAULT_OPTIONS");
var uniqueIds = 0;
var LiveAnnouncer = class LiveAnnouncer {
	_ngZone = inject(NgZone);
	_defaultOptions = inject(LIVE_ANNOUNCER_DEFAULT_OPTIONS, { optional: true });
	_liveElement;
	_document = inject(DOCUMENT);
	_sanitizer = inject(DomSanitizer);
	_previousTimeout;
	_currentPromise;
	_currentResolve;
	constructor() {
		const elementToken = inject(LIVE_ANNOUNCER_ELEMENT_TOKEN, { optional: true });
		this._liveElement = elementToken || this._createLiveElement();
	}
	announce(message, ...args) {
		const defaultOptions = this._defaultOptions;
		let politeness;
		let duration;
		if (args.length === 1 && typeof args[0] === "number") duration = args[0];
		else [politeness, duration] = args;
		this.clear();
		clearTimeout(this._previousTimeout);
		if (!politeness) politeness = defaultOptions && defaultOptions.politeness ? defaultOptions.politeness : "polite";
		if (duration == null && defaultOptions) duration = defaultOptions.duration;
		this._liveElement.setAttribute("aria-live", politeness);
		if (this._liveElement.id) this._exposeAnnouncerToModals(this._liveElement.id);
		return this._ngZone.runOutsideAngular(() => {
			if (!this._currentPromise) this._currentPromise = new Promise((resolve) => this._currentResolve = resolve);
			clearTimeout(this._previousTimeout);
			this._previousTimeout = setTimeout(() => {
				if (!message || typeof message === "string") this._liveElement.textContent = message;
				else _setInnerHtml(this._liveElement, message, this._sanitizer);
				if (typeof duration === "number") this._previousTimeout = setTimeout(() => this.clear(), duration);
				this._currentResolve?.();
				this._currentPromise = this._currentResolve = void 0;
			}, 100);
			return this._currentPromise;
		});
	}
	clear() {
		if (this._liveElement) this._liveElement.textContent = "";
	}
	ngOnDestroy() {
		clearTimeout(this._previousTimeout);
		this._liveElement?.remove();
		this._liveElement = null;
		this._currentResolve?.();
		this._currentPromise = this._currentResolve = void 0;
	}
	_createLiveElement() {
		const elementClass = "cdk-live-announcer-element";
		const previousElements = this._document.getElementsByClassName(elementClass);
		const liveEl = this._document.createElement("div");
		for (let i = 0; i < previousElements.length; i++) previousElements[i].remove();
		liveEl.classList.add(elementClass);
		liveEl.classList.add("cdk-visually-hidden");
		liveEl.setAttribute("aria-atomic", "true");
		liveEl.setAttribute("aria-live", "polite");
		liveEl.id = `cdk-live-announcer-${uniqueIds++}`;
		this._document.body.appendChild(liveEl);
		return liveEl;
	}
	_exposeAnnouncerToModals(id) {
		const modals = this._document.querySelectorAll("body > .cdk-overlay-container [aria-modal=\"true\"]");
		for (let i = 0; i < modals.length; i++) {
			const modal = modals[i];
			const ariaOwns = modal.getAttribute("aria-owns");
			if (!ariaOwns) modal.setAttribute("aria-owns", id);
			else if (ariaOwns.indexOf(id) === -1) modal.setAttribute("aria-owns", ariaOwns + " " + id);
		}
	}
	static ɵfac = function LiveAnnouncer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || LiveAnnouncer)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: LiveAnnouncer,
		factory: LiveAnnouncer.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveAnnouncer, [{ type: Service }], () => [], null);
})();
var CdkAriaLive = class CdkAriaLive {
	_elementRef = inject(ElementRef);
	_liveAnnouncer = inject(LiveAnnouncer);
	_contentObserver = inject(ContentObserver);
	_ngZone = inject(NgZone);
	get politeness() {
		return this._politeness;
	}
	set politeness(value) {
		this._politeness = value === "off" || value === "assertive" ? value : "polite";
		if (this._politeness === "off") {
			if (this._subscription) {
				this._subscription.unsubscribe();
				this._subscription = void 0;
			}
		} else if (!this._subscription) this._subscription = this._ngZone.runOutsideAngular(() => {
			return this._contentObserver.observe(this._elementRef).subscribe(() => {
				const elementText = this._elementRef.nativeElement.textContent;
				if (elementText !== this._previousAnnouncedText) {
					this._liveAnnouncer.announce(elementText, this._politeness, this.duration);
					this._previousAnnouncedText = elementText;
				}
			});
		});
	}
	_politeness = "polite";
	duration;
	_previousAnnouncedText;
	_subscription;
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
	}
	ngOnDestroy() {
		this._subscription?.unsubscribe();
	}
	static ɵfac = function CdkAriaLive_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkAriaLive)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: CdkAriaLive,
		selectors: [[
			"",
			"cdkAriaLive",
			""
		]],
		inputs: {
			politeness: [
				0,
				"cdkAriaLive",
				"politeness"
			],
			duration: [
				0,
				"cdkAriaLiveDuration",
				"duration"
			]
		},
		exportAs: ["cdkAriaLive"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAriaLive, [{
		type: Directive,
		args: [{
			selector: "[cdkAriaLive]",
			exportAs: "cdkAriaLive"
		}]
	}], () => [], {
		politeness: [{
			type: Input,
			args: ["cdkAriaLive"]
		}],
		duration: [{
			type: Input,
			args: ["cdkAriaLiveDuration"]
		}]
	});
})();
var HighContrastMode;
(function(HighContrastMode) {
	HighContrastMode[HighContrastMode["NONE"] = 0] = "NONE";
	HighContrastMode[HighContrastMode["BLACK_ON_WHITE"] = 1] = "BLACK_ON_WHITE";
	HighContrastMode[HighContrastMode["WHITE_ON_BLACK"] = 2] = "WHITE_ON_BLACK";
})(HighContrastMode || (HighContrastMode = {}));
var BLACK_ON_WHITE_CSS_CLASS = "cdk-high-contrast-black-on-white";
var WHITE_ON_BLACK_CSS_CLASS = "cdk-high-contrast-white-on-black";
var HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = "cdk-high-contrast-active";
var HighContrastModeDetector = class HighContrastModeDetector {
	_platform = inject(Platform);
	_hasCheckedHighContrastMode = false;
	_document = inject(DOCUMENT);
	_breakpointSubscription;
	constructor() {
		this._breakpointSubscription = inject(BreakpointObserver).observe("(forced-colors: active)").subscribe(() => {
			if (this._hasCheckedHighContrastMode) {
				this._hasCheckedHighContrastMode = false;
				this._applyBodyHighContrastModeCssClasses();
			}
		});
	}
	getHighContrastMode() {
		if (!this._platform.isBrowser) return HighContrastMode.NONE;
		const testElement = this._document.createElement("div");
		testElement.style.backgroundColor = "rgb(1,2,3)";
		testElement.style.position = "absolute";
		this._document.body.appendChild(testElement);
		const documentWindow = this._document.defaultView || window;
		const computedStyle = documentWindow && documentWindow.getComputedStyle ? documentWindow.getComputedStyle(testElement) : null;
		const computedColor = (computedStyle && computedStyle.backgroundColor || "").replace(/ /g, "");
		testElement.remove();
		switch (computedColor) {
			case "rgb(0,0,0)":
			case "rgb(45,50,54)":
			case "rgb(32,32,32)": return HighContrastMode.WHITE_ON_BLACK;
			case "rgb(255,255,255)":
			case "rgb(255,250,239)": return HighContrastMode.BLACK_ON_WHITE;
		}
		return HighContrastMode.NONE;
	}
	ngOnDestroy() {
		this._breakpointSubscription.unsubscribe();
	}
	_applyBodyHighContrastModeCssClasses() {
		if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
			const bodyClasses = this._document.body.classList;
			bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
			this._hasCheckedHighContrastMode = true;
			const mode = this.getHighContrastMode();
			if (mode === HighContrastMode.BLACK_ON_WHITE) bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS);
			else if (mode === HighContrastMode.WHITE_ON_BLACK) bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
		}
	}
	static ɵfac = function HighContrastModeDetector_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HighContrastModeDetector)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: HighContrastModeDetector,
		factory: HighContrastModeDetector.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighContrastModeDetector, [{ type: Service }], () => [], null);
})();
var A11yModule = class A11yModule {
	constructor() {
		inject(HighContrastModeDetector)._applyBodyHighContrastModeCssClasses();
	}
	static ɵfac = function A11yModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || A11yModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: A11yModule,
		imports: [
			ObserversModule,
			CdkAriaLive,
			CdkTrapFocus,
			CdkMonitorFocus
		],
		exports: [
			CdkAriaLive,
			CdkTrapFocus,
			CdkMonitorFocus
		]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ imports: [ObserversModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(A11yModule, [{
		type: NgModule,
		args: [{
			imports: [
				ObserversModule,
				CdkAriaLive,
				CdkTrapFocus,
				CdkMonitorFocus
			],
			exports: [
				CdkAriaLive,
				CdkTrapFocus,
				CdkMonitorFocus
			]
		}]
	}], () => [], null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_typeahead-chunk.mjs
var DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS = 200;
var Typeahead = class {
	_letterKeyStream = new Subject();
	_items = [];
	_selectedItemIndex = -1;
	_pressedLetters = [];
	_skipPredicateFn;
	_selectedItem = new Subject();
	selectedItem = this._selectedItem;
	constructor(initialItems, config) {
		const typeAheadInterval = typeof config?.debounceInterval === "number" ? config.debounceInterval : DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS;
		if (config?.skipPredicate) this._skipPredicateFn = config.skipPredicate;
		if ((typeof ngDevMode === "undefined" || ngDevMode) && initialItems.length && initialItems.some((item) => typeof item.getLabel !== "function")) throw new Error("KeyManager items in typeahead mode must implement the `getLabel` method.");
		this.setItems(initialItems);
		this._setupKeyHandler(typeAheadInterval);
	}
	destroy() {
		this._pressedLetters = [];
		this._letterKeyStream.complete();
		this._selectedItem.complete();
	}
	setCurrentSelectedItemIndex(index) {
		this._selectedItemIndex = index;
	}
	setItems(items) {
		this._items = items;
	}
	handleKey(event) {
		const keyCode = event.keyCode;
		if (event.key && event.key.length === 1) this._letterKeyStream.next(event.key.toLocaleUpperCase());
		else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57) this._letterKeyStream.next(String.fromCharCode(keyCode));
	}
	isTyping() {
		return this._pressedLetters.length > 0;
	}
	reset() {
		this._pressedLetters = [];
	}
	_setupKeyHandler(typeAheadInterval) {
		this._letterKeyStream.pipe(tap((letter) => this._pressedLetters.push(letter)), debounceTime(typeAheadInterval), filter(() => this._pressedLetters.length > 0), map(() => this._pressedLetters.join("").toLocaleUpperCase())).subscribe((inputString) => {
			for (let i = 1; i < this._items.length + 1; i++) {
				const index = (this._selectedItemIndex + i) % this._items.length;
				const item = this._items[index];
				if (!this._skipPredicateFn?.(item) && item.getLabel?.().toLocaleUpperCase().trim().indexOf(inputString) === 0) {
					this._selectedItem.next(item);
					break;
				}
			}
			this._pressedLetters = [];
		});
	}
};
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_list-key-manager-chunk.mjs
var ListKeyManager = class {
	_items;
	_activeItemIndex = signal(-1, ...ngDevMode ? [{ debugName: "_activeItemIndex" }] : []);
	_activeItem = signal(null, ...ngDevMode ? [{ debugName: "_activeItem" }] : []);
	_wrap = false;
	_typeaheadSubscription = Subscription.EMPTY;
	_itemChangesSubscription;
	_vertical = true;
	_horizontal = null;
	_allowedModifierKeys = [];
	_homeAndEnd = false;
	_pageUpAndDown = {
		enabled: false,
		delta: 10
	};
	_effectRef;
	_typeahead;
	_skipPredicateFn = (item) => item.disabled;
	constructor(_items, injector) {
		this._items = _items;
		if (_items instanceof QueryList) this._itemChangesSubscription = _items.changes.subscribe((newItems) => this._itemsChanged(newItems.toArray()));
		else if (isSignal(_items)) {
			if (!injector && (typeof ngDevMode === "undefined" || ngDevMode)) throw new Error("ListKeyManager constructed with a signal must receive an injector");
			this._effectRef = effect(() => this._itemsChanged(_items()), {
				...ngDevMode ? { debugName: "_effectRef" } : {},
				injector
			});
		}
	}
	tabOut = new Subject();
	change = new Subject();
	skipPredicate(predicate) {
		this._skipPredicateFn = predicate;
		return this;
	}
	withWrap(shouldWrap = true) {
		this._wrap = shouldWrap;
		return this;
	}
	withVerticalOrientation(enabled = true) {
		this._vertical = enabled;
		return this;
	}
	withHorizontalOrientation(direction) {
		this._horizontal = direction;
		return this;
	}
	withAllowedModifierKeys(keys) {
		this._allowedModifierKeys = keys;
		return this;
	}
	withTypeAhead(debounceInterval = 200) {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			const items = this._getItemsArray();
			if (items.length > 0 && items.some((item) => typeof item.getLabel !== "function")) throw Error("ListKeyManager items in typeahead mode must implement the `getLabel` method.");
		}
		this._typeaheadSubscription.unsubscribe();
		const items = this._getItemsArray();
		this._typeahead = new Typeahead(items, {
			debounceInterval: typeof debounceInterval === "number" ? debounceInterval : void 0,
			skipPredicate: (item) => this._skipPredicateFn(item)
		});
		this._typeaheadSubscription = this._typeahead.selectedItem.subscribe((item) => {
			this.setActiveItem(item);
		});
		return this;
	}
	cancelTypeahead() {
		this._typeahead?.reset();
		return this;
	}
	withHomeAndEnd(enabled = true) {
		this._homeAndEnd = enabled;
		return this;
	}
	withPageUpDown(enabled = true, delta = 10) {
		this._pageUpAndDown = {
			enabled,
			delta
		};
		return this;
	}
	setActiveItem(item) {
		const previousActiveItem = this._activeItem();
		this.updateActiveItem(item);
		if (this._activeItem() !== previousActiveItem) this.change.next(this._activeItemIndex());
	}
	onKeydown(event) {
		const keyCode = event.keyCode;
		const isModifierAllowed = [
			"altKey",
			"ctrlKey",
			"metaKey",
			"shiftKey"
		].every((modifier) => {
			return !event[modifier] || this._allowedModifierKeys.indexOf(modifier) > -1;
		});
		switch (keyCode) {
			case 9:
				this.tabOut.next();
				return;
			case 40: if (this._vertical && isModifierAllowed) {
				this.setNextItemActive();
				break;
			} else return;
			case 38: if (this._vertical && isModifierAllowed) {
				this.setPreviousItemActive();
				break;
			} else return;
			case 39: if (this._horizontal && isModifierAllowed) {
				this._horizontal === "rtl" ? this.setPreviousItemActive() : this.setNextItemActive();
				break;
			} else return;
			case 37: if (this._horizontal && isModifierAllowed) {
				this._horizontal === "rtl" ? this.setNextItemActive() : this.setPreviousItemActive();
				break;
			} else return;
			case 36: if (this._homeAndEnd && isModifierAllowed) {
				this.setFirstItemActive();
				break;
			} else return;
			case 35: if (this._homeAndEnd && isModifierAllowed) {
				this.setLastItemActive();
				break;
			} else return;
			case 33: if (this._pageUpAndDown.enabled && isModifierAllowed) {
				const targetIndex = this._activeItemIndex() - this._pageUpAndDown.delta;
				this._setActiveItemByIndex(targetIndex > 0 ? targetIndex : 0, 1);
				break;
			} else return;
			case 34: if (this._pageUpAndDown.enabled && isModifierAllowed) {
				const targetIndex = this._activeItemIndex() + this._pageUpAndDown.delta;
				const itemsLength = this._getItemsArray().length;
				this._setActiveItemByIndex(targetIndex < itemsLength ? targetIndex : itemsLength - 1, -1);
				break;
			} else return;
			default:
				if (isModifierAllowed || hasModifierKey(event, "shiftKey")) this._typeahead?.handleKey(event);
				return;
		}
		this._typeahead?.reset();
		event.preventDefault();
	}
	get activeItemIndex() {
		return this._activeItemIndex();
	}
	get activeItem() {
		return this._activeItem();
	}
	isTyping() {
		return !!this._typeahead && this._typeahead.isTyping();
	}
	setFirstItemActive() {
		this._setActiveItemByIndex(0, 1);
	}
	setLastItemActive() {
		this._setActiveItemByIndex(this._getItemsArray().length - 1, -1);
	}
	setNextItemActive() {
		this._activeItemIndex() < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
	}
	setPreviousItemActive() {
		this._activeItemIndex() < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1);
	}
	updateActiveItem(item) {
		const itemArray = this._getItemsArray();
		const index = typeof item === "number" ? item : itemArray.indexOf(item);
		const activeItem = itemArray[index];
		this._activeItem.set(activeItem == null ? null : activeItem);
		this._activeItemIndex.set(index);
		this._typeahead?.setCurrentSelectedItemIndex(index);
	}
	destroy() {
		this._typeaheadSubscription.unsubscribe();
		this._itemChangesSubscription?.unsubscribe();
		this._effectRef?.destroy();
		this._typeahead?.destroy();
		this.tabOut.complete();
		this.change.complete();
	}
	_setActiveItemByDelta(delta) {
		this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
	}
	_setActiveInWrapMode(delta) {
		const items = this._getItemsArray();
		for (let i = 1; i <= items.length; i++) {
			const index = (this._activeItemIndex() + delta * i + items.length) % items.length;
			const item = items[index];
			if (!this._skipPredicateFn(item)) {
				this.setActiveItem(index);
				return;
			}
		}
	}
	_setActiveInDefaultMode(delta) {
		this._setActiveItemByIndex(this._activeItemIndex() + delta, delta);
	}
	_setActiveItemByIndex(index, fallbackDelta) {
		const items = this._getItemsArray();
		if (!items[index]) return;
		while (this._skipPredicateFn(items[index])) {
			index += fallbackDelta;
			if (!items[index]) return;
		}
		this.setActiveItem(index);
	}
	_getItemsArray() {
		if (isSignal(this._items)) return this._items();
		return this._items instanceof QueryList ? this._items.toArray() : this._items;
	}
	_itemsChanged(newItems) {
		this._typeahead?.setItems(newItems);
		const activeItem = this._activeItem();
		if (activeItem) {
			const newIndex = newItems.indexOf(activeItem);
			if (newIndex > -1 && newIndex !== this._activeItemIndex()) {
				this._activeItemIndex.set(newIndex);
				this._typeahead?.setCurrentSelectedItemIndex(newIndex);
			}
		}
	}
};
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_focus-key-manager-chunk.mjs
var FocusKeyManager = class extends ListKeyManager {
	_origin = "program";
	setFocusOrigin(origin) {
		this._origin = origin;
		return this;
	}
	setActiveItem(item) {
		super.setActiveItem(item);
		if (this.activeItem) this.activeItem.focus(this._origin);
	}
};
//#endregion
//#region node_modules/@angular/cdk/fesm2022/a11y.mjs
var ID_DELIMITER = " ";
function addAriaReferencedId(el, attr, id) {
	const ids = getAriaReferenceIds(el, attr);
	id = id.trim();
	if (ids.some((existingId) => existingId.trim() === id)) return;
	ids.push(id);
	el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
	const ids = getAriaReferenceIds(el, attr);
	id = id.trim();
	const filteredIds = ids.filter((val) => val !== id);
	if (filteredIds.length) el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
	else el.removeAttribute(attr);
}
function getAriaReferenceIds(el, attr) {
	return el.getAttribute(attr)?.match(/\S+/g) ?? [];
}
var CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
var nextId = 0;
var AriaDescriber = class AriaDescriber {
	_platform = inject(Platform);
	_document = inject(DOCUMENT);
	_messageRegistry = /* @__PURE__ */ new Map();
	_messagesContainer = null;
	_id = `${nextId++}`;
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
		this._id = inject(APP_ID) + "-" + nextId++;
	}
	describe(hostElement, message, role) {
		if (!this._canBeDescribed(hostElement, message)) return;
		const key = getKey(message, role);
		if (typeof message !== "string") {
			setMessageId(message, this._id);
			this._messageRegistry.set(key, {
				messageElement: message,
				referenceCount: 0
			});
		} else if (!this._messageRegistry.has(key)) this._createMessageElement(message, role);
		if (!this._isElementDescribedByMessage(hostElement, key)) this._addMessageReference(hostElement, key);
	}
	removeDescription(hostElement, message, role) {
		if (!message || !this._isElementNode(hostElement)) return;
		const key = getKey(message, role);
		if (this._isElementDescribedByMessage(hostElement, key)) this._removeMessageReference(hostElement, key);
		if (typeof message === "string") {
			const registeredMessage = this._messageRegistry.get(key);
			if (registeredMessage && registeredMessage.referenceCount === 0) this._deleteMessageElement(key);
		}
		if (this._messagesContainer?.childNodes.length === 0) {
			this._messagesContainer.remove();
			this._messagesContainer = null;
		}
	}
	ngOnDestroy() {
		const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
		for (let i = 0; i < describedElements.length; i++) {
			this._removeCdkDescribedByReferenceIds(describedElements[i]);
			describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
		}
		this._messagesContainer?.remove();
		this._messagesContainer = null;
		this._messageRegistry.clear();
	}
	_createMessageElement(message, role) {
		const messageElement = this._document.createElement("div");
		setMessageId(messageElement, this._id);
		messageElement.textContent = message;
		if (role) messageElement.setAttribute("role", role);
		this._createMessagesContainer();
		this._messagesContainer.appendChild(messageElement);
		this._messageRegistry.set(getKey(message, role), {
			messageElement,
			referenceCount: 0
		});
	}
	_deleteMessageElement(key) {
		this._messageRegistry.get(key)?.messageElement?.remove();
		this._messageRegistry.delete(key);
	}
	_createMessagesContainer() {
		if (this._messagesContainer) return;
		const containerClassName = "cdk-describedby-message-container";
		const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
		for (let i = 0; i < serverContainers.length; i++) serverContainers[i].remove();
		const messagesContainer = this._document.createElement("div");
		messagesContainer.style.visibility = "hidden";
		messagesContainer.classList.add(containerClassName);
		messagesContainer.classList.add("cdk-visually-hidden");
		if (!this._platform.isBrowser) messagesContainer.setAttribute("platform", "server");
		this._document.body.appendChild(messagesContainer);
		this._messagesContainer = messagesContainer;
	}
	_removeCdkDescribedByReferenceIds(element) {
		const originalReferenceIds = getAriaReferenceIds(element, "aria-describedby").filter((id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
		element.setAttribute("aria-describedby", originalReferenceIds.join(" "));
	}
	_addMessageReference(element, key) {
		const registeredMessage = this._messageRegistry.get(key);
		addAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
		element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
		registeredMessage.referenceCount++;
	}
	_removeMessageReference(element, key) {
		const registeredMessage = this._messageRegistry.get(key);
		registeredMessage.referenceCount--;
		removeAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
		element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
	}
	_isElementDescribedByMessage(element, key) {
		const referenceIds = getAriaReferenceIds(element, "aria-describedby");
		const registeredMessage = this._messageRegistry.get(key);
		const messageId = registeredMessage && registeredMessage.messageElement.id;
		return !!messageId && referenceIds.indexOf(messageId) != -1;
	}
	_canBeDescribed(element, message) {
		if (!this._isElementNode(element)) return false;
		if (message && typeof message === "object") return true;
		const trimmedMessage = message == null ? "" : `${message}`.trim();
		const ariaLabel = element.getAttribute("aria-label");
		return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
	}
	_isElementNode(element) {
		return element.nodeType === this._document.ELEMENT_NODE;
	}
	static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || AriaDescriber)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: AriaDescriber,
		factory: AriaDescriber.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AriaDescriber, [{ type: Service }], () => [], null);
})();
function getKey(message, role) {
	return typeof message === "string" ? `${role || ""}/${message}` : message;
}
function setMessageId(element, serviceId) {
	if (!element.id) element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
}
var ConfigurableFocusTrap = class extends FocusTrap {
	_focusTrapManager;
	_inertStrategy;
	get enabled() {
		return this._enabled;
	}
	set enabled(value) {
		this._enabled = value;
		if (this._enabled) this._focusTrapManager.register(this);
		else this._focusTrapManager.deregister(this);
	}
	constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
		super(_element, _checker, _ngZone, _document, config.defer, injector);
		this._focusTrapManager = _focusTrapManager;
		this._inertStrategy = _inertStrategy;
		this._focusTrapManager.register(this);
	}
	destroy() {
		this._focusTrapManager.deregister(this);
		super.destroy();
	}
	_enable() {
		this._inertStrategy.preventFocus(this);
		this.toggleAnchors(true);
	}
	_disable() {
		this._inertStrategy.allowFocus(this);
		this.toggleAnchors(false);
	}
};
var EventListenerFocusTrapInertStrategy = class {
	_listener = null;
	preventFocus(focusTrap) {
		if (this._listener) focusTrap._document.removeEventListener("focus", this._listener, true);
		this._listener = (e) => this._trapFocus(focusTrap, e);
		focusTrap._ngZone.runOutsideAngular(() => {
			focusTrap._document.addEventListener("focus", this._listener, true);
		});
	}
	allowFocus(focusTrap) {
		if (!this._listener) return;
		focusTrap._document.removeEventListener("focus", this._listener, true);
		this._listener = null;
	}
	_trapFocus(focusTrap, event) {
		const target = event.target;
		const focusTrapRoot = focusTrap._element;
		if (target && !focusTrapRoot.contains(target) && !target.closest?.("div.cdk-overlay-pane")) setTimeout(() => {
			if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) focusTrap.focusFirstTabbableElement();
		});
	}
};
var FOCUS_TRAP_INERT_STRATEGY = new InjectionToken("FOCUS_TRAP_INERT_STRATEGY");
var FocusTrapManager = class FocusTrapManager {
	_focusTrapStack = [];
	register(focusTrap) {
		this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
		let stack = this._focusTrapStack;
		if (stack.length) stack[stack.length - 1]._disable();
		stack.push(focusTrap);
		focusTrap._enable();
	}
	deregister(focusTrap) {
		focusTrap._disable();
		const stack = this._focusTrapStack;
		const i = stack.indexOf(focusTrap);
		if (i !== -1) {
			stack.splice(i, 1);
			if (stack.length) stack[stack.length - 1]._enable();
		}
	}
	static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusTrapManager)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: FocusTrapManager,
		factory: FocusTrapManager.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{ type: Service }], null, null);
})();
var ConfigurableFocusTrapFactory = class ConfigurableFocusTrapFactory {
	_checker = inject(InteractivityChecker);
	_ngZone = inject(NgZone);
	_focusTrapManager = inject(FocusTrapManager);
	_document = inject(DOCUMENT);
	_inertStrategy;
	_injector = inject(Injector);
	constructor() {
		const inertStrategy = inject(FOCUS_TRAP_INERT_STRATEGY, { optional: true });
		this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
	}
	create(element, config = { defer: false }) {
		return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, config, this._injector);
	}
	static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ConfigurableFocusTrapFactory)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: ConfigurableFocusTrapFactory,
		factory: ConfigurableFocusTrapFactory.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurableFocusTrapFactory, [{ type: Service }], () => [], null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/observers-private.mjs
var loopLimitExceededErrorHandler = (e) => {
	if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
};
var SingleBoxSharedResizeObserver = class {
	_box;
	_destroyed = new Subject();
	_resizeSubject = new Subject();
	_resizeObserver;
	_elementObservables = /* @__PURE__ */ new Map();
	constructor(_box) {
		this._box = _box;
		if (typeof ResizeObserver !== "undefined") this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
	}
	observe(target) {
		if (!this._elementObservables.has(target)) this._elementObservables.set(target, new Observable((observer) => {
			const subscription = this._resizeSubject.subscribe(observer);
			this._resizeObserver?.observe(target, { box: this._box });
			return () => {
				this._resizeObserver?.unobserve(target);
				subscription.unsubscribe();
				this._elementObservables.delete(target);
			};
		}).pipe(filter((entries) => entries.some((entry) => entry.target === target)), shareReplay({
			bufferSize: 1,
			refCount: true
		}), takeUntil(this._destroyed)));
		return this._elementObservables.get(target);
	}
	destroy() {
		this._destroyed.next();
		this._destroyed.complete();
		this._resizeSubject.complete();
		this._elementObservables.clear();
	}
};
var SharedResizeObserver = class SharedResizeObserver {
	_cleanupErrorListener;
	_observers = /* @__PURE__ */ new Map();
	_ngZone = inject(NgZone);
	constructor() {
		if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) this._ngZone.runOutsideAngular(() => {
			const renderer = inject(RendererFactory2).createRenderer(null, null);
			this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
		});
	}
	ngOnDestroy() {
		for (const [, observer] of this._observers) observer.destroy();
		this._observers.clear();
		this._cleanupErrorListener?.();
	}
	observe(target, options) {
		const box = options?.box || "content-box";
		if (!this._observers.has(box)) this._observers.set(box, new SingleBoxSharedResizeObserver(box));
		return this._observers.get(box).observe(target);
	}
	static ɵfac = function SharedResizeObserver_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || SharedResizeObserver)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: SharedResizeObserver,
		factory: SharedResizeObserver.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{ type: Service }], () => [], null);
})();
//#endregion
//#region node_modules/@angular/cdk/fesm2022/platform.mjs
var PlatformModule = class PlatformModule {
	static ɵfac = function PlatformModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || PlatformModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: PlatformModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
		type: NgModule,
		args: [{}]
	}], null, null);
})();
//#endregion
//#region node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-tabs.mjs
var BrnTabs = class BrnTabs {
	_dir = inject(Directionality);
	orientation = input("horizontal", ...ngDevMode ? [{ debugName: "orientation" }] : 	/* istanbul ignore next */ []);
	/** internal **/
	$orientation = this.orientation;
	/** internal **/
	direction = this._dir.valueSignal;
	activeTab = model(void 0, {
		...ngDevMode ? { debugName: "activeTab" } : 		/* istanbul ignore next */ {},
		alias: "brnTabs"
	});
	/** internal **/
	$activeTab = this.activeTab.asReadonly();
	activationMode = input("automatic", ...ngDevMode ? [{ debugName: "activationMode" }] : 	/* istanbul ignore next */ []);
	/** internal **/
	$activationMode = this.activationMode;
	tabActivated = output();
	_tabs = signal({}, ...ngDevMode ? [{ debugName: "_tabs" }] : 	/* istanbul ignore next */ []);
	$tabs = this._tabs.asReadonly();
	registerTrigger(key, trigger) {
		this.updateEntry(key, { trigger });
	}
	registerContent(key, content) {
		this.updateEntry(key, { content });
	}
	unregisterTrigger(key) {
		this.updateEntry(key, { trigger: void 0 });
	}
	unregisterContent(key) {
		this.updateEntry(key, { content: void 0 });
	}
	updateEntry(key, patch) {
		this._tabs.update((tabs) => {
			const merged = {
				...tabs[key] ?? {},
				...patch
			};
			if (!merged.trigger && !merged.content) {
				const { [key]: removed, ...rest } = tabs;
				return rest;
			}
			return {
				...tabs,
				[key]: merged
			};
		});
	}
	emitTabActivated(key) {
		this.tabActivated.emit(key);
	}
	setActiveTab(key) {
		this.activeTab.set(key);
	}
	/** @nocollapse */
	static ɵfac = function BrnTabs_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabs)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabs,
		selectors: [[
			"",
			"brnTabs",
			""
		]],
		hostVars: 2,
		hostBindings: function BrnTabs_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("data-orientation", ctx.orientation())("dir", ctx.direction());
		},
		inputs: {
			orientation: [1, "orientation"],
			activeTab: [
				1,
				"brnTabs",
				"activeTab"
			],
			activationMode: [1, "activationMode"]
		},
		outputs: {
			activeTab: "brnTabsChange",
			tabActivated: "tabActivated"
		},
		exportAs: ["brnTabs"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabs, [{
		type: Directive,
		args: [{
			selector: "[brnTabs]",
			exportAs: "brnTabs",
			host: {
				"[attr.data-orientation]": "orientation()",
				"[attr.dir]": "direction()"
			}
		}]
	}], null, {
		orientation: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "orientation",
				required: false
			}]
		}],
		activeTab: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "brnTabs",
				required: false
			}]
		}, {
			type: Output,
			args: ["brnTabsChange"]
		}],
		activationMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "activationMode",
				required: false
			}]
		}],
		tabActivated: [{
			type: Output,
			args: ["tabActivated"]
		}]
	});
})();
var BrnTabsContent = class BrnTabsContent {
	_root = inject(BrnTabs);
	_elementRef = inject(ElementRef);
	contentFor = input.required({
		...ngDevMode ? { debugName: "contentFor" } : 		/* istanbul ignore next */ {},
		alias: "brnTabsContent"
	});
	_isSelected = computed(() => this._root.$activeTab() === this.contentFor(), ...ngDevMode ? [{ debugName: "_isSelected" }] : 	/* istanbul ignore next */ []);
	_contentId = computed(() => `brn-tabs-content-${this.contentFor()}`, ...ngDevMode ? [{ debugName: "_contentId" }] : 	/* istanbul ignore next */ []);
	_labelId = computed(() => `brn-tabs-label-${this.contentFor()}`, ...ngDevMode ? [{ debugName: "_labelId" }] : 	/* istanbul ignore next */ []);
	constructor() {
		effect(() => {
			const contentFor = this.contentFor();
			untracked(() => this._root.registerContent(contentFor, this));
		});
	}
	focus() {
		this._elementRef.nativeElement.focus();
	}
	ngOnDestroy() {
		this._root.unregisterContent(this.contentFor());
	}
	/** @nocollapse */
	static ɵfac = function BrnTabsContent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabsContent)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabsContent,
		selectors: [[
			"",
			"brnTabsContent",
			""
		]],
		hostAttrs: [
			"role",
			"tabpanel",
			"tabindex",
			"0"
		],
		hostVars: 3,
		hostBindings: function BrnTabsContent_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵdomProperty("id", ctx._contentId())("hidden", ctx._isSelected() === false);
				ɵɵattribute("aria-labelledby", ctx._labelId());
			}
		},
		inputs: { contentFor: [
			1,
			"brnTabsContent",
			"contentFor"
		] },
		exportAs: ["brnTabsContent"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabsContent, [{
		type: Directive,
		args: [{
			selector: "[brnTabsContent]",
			exportAs: "brnTabsContent",
			host: {
				role: "tabpanel",
				tabindex: "0",
				"[id]": "_contentId()",
				"[attr.aria-labelledby]": "_labelId()",
				"[hidden]": "_isSelected() === false"
			}
		}]
	}], () => [], { contentFor: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "brnTabsContent",
			required: true
		}]
	}] });
})();
var BrnTabsContentLazy = class BrnTabsContentLazy {
	_root = inject(BrnTabs);
	_content = inject(BrnTabsContent);
	_templateRef = inject(TemplateRef);
	_viewContainerRef = inject(ViewContainerRef);
	_destroyRef = inject(DestroyRef);
	_hasBeenActivated = false;
	constructor() {
		this._destroyRef.onDestroy(() => this._viewContainerRef.clear());
		effect(() => {
			const activeTab = this._root.$activeTab();
			const contentFor = this._content.contentFor();
			untracked(() => {
				if (activeTab === contentFor && !this._hasBeenActivated) {
					this._viewContainerRef.createEmbeddedView(this._templateRef);
					this._hasBeenActivated = true;
				}
			});
		});
	}
	/** @nocollapse */
	static ɵfac = function BrnTabsContentLazy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabsContentLazy)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabsContentLazy,
		selectors: [[
			"ng-template",
			"brnTabsContentLazy",
			""
		]],
		exportAs: ["brnTabsContentLazy"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabsContentLazy, [{
		type: Directive,
		args: [{
			selector: "ng-template[brnTabsContentLazy]",
			exportAs: "brnTabsContentLazy"
		}]
	}], () => [], null);
})();
var BrnTabsTrigger = class BrnTabsTrigger {
	elementRef = inject(ElementRef);
	_root = inject(BrnTabs);
	_orientation = this._root.$orientation;
	triggerFor = input.required({
		...ngDevMode ? { debugName: "triggerFor" } : 		/* istanbul ignore next */ {},
		alias: "brnTabsTrigger"
	});
	selected = computed(() => this._root.$activeTab() === this.triggerFor(), ...ngDevMode ? [{ debugName: "selected" }] : 	/* istanbul ignore next */ []);
	_contentId = computed(() => `brn-tabs-content-${this.triggerFor()}`, ...ngDevMode ? [{ debugName: "_contentId" }] : 	/* istanbul ignore next */ []);
	_labelId = computed(() => `brn-tabs-label-${this.triggerFor()}`, ...ngDevMode ? [{ debugName: "_labelId" }] : 	/* istanbul ignore next */ []);
	_disabled = input(false, {
		...ngDevMode ? { debugName: "_disabled" } : 		/* istanbul ignore next */ {},
		alias: "disabled",
		transform: booleanAttribute
	});
	get disabled() {
		return this._disabled();
	}
	constructor() {
		effect(() => {
			const triggerFor = this.triggerFor();
			untracked(() => this._root.registerTrigger(triggerFor, this));
		});
	}
	focus() {
		this.elementRef.nativeElement.focus();
		if (this._root.$activationMode() === "automatic") this.activate();
	}
	activate() {
		if (!this.triggerFor()) return;
		this._root.setActiveTab(this.triggerFor());
		this._root.emitTabActivated(this.triggerFor());
	}
	get key() {
		return this.triggerFor();
	}
	ngOnDestroy() {
		this._root.unregisterTrigger(this.triggerFor());
	}
	/** @nocollapse */
	static ɵfac = function BrnTabsTrigger_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabsTrigger)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabsTrigger,
		selectors: [[
			"button",
			"brnTabsTrigger",
			""
		]],
		hostAttrs: [
			"type",
			"button",
			"role",
			"tab"
		],
		hostVars: 9,
		hostBindings: function BrnTabsTrigger_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("click", function BrnTabsTrigger_click_HostBindingHandler() {
				return ctx.activate();
			});
			if (rf & 2) {
				ɵɵdomProperty("id", ctx._labelId())("tabIndex", ctx._disabled() ? -1 : ctx.selected() ? 0 : -1);
				ɵɵattribute("aria-selected", ctx.selected())("aria-controls", ctx._contentId())("aria-disabled", ctx._disabled())("data-state", ctx.selected() ? "active" : "inactive")("data-orientation", ctx._orientation())("data-disabled", ctx._disabled() ? "" : void 0)("disabled", ctx._disabled() ? "" : void 0);
			}
		},
		inputs: {
			triggerFor: [
				1,
				"brnTabsTrigger",
				"triggerFor"
			],
			_disabled: [
				1,
				"disabled",
				"_disabled"
			]
		},
		exportAs: ["brnTabsTrigger"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabsTrigger, [{
		type: Directive,
		args: [{
			selector: "button[brnTabsTrigger]",
			exportAs: "brnTabsTrigger",
			host: {
				"[id]": "_labelId()",
				type: "button",
				role: "tab",
				"[tabindex]": "_disabled() ? -1 : (selected() ? 0 : -1)",
				"[attr.aria-selected]": "selected()",
				"[attr.aria-controls]": "_contentId()",
				"[attr.aria-disabled]": "_disabled()",
				"[attr.data-state]": "selected() ? 'active' : 'inactive'",
				"[attr.data-orientation]": "_orientation()",
				"[attr.data-disabled]": "_disabled() ? '' : undefined",
				"[attr.disabled]": "_disabled() ? '' : undefined",
				"(click)": "activate()"
			}
		}]
	}], () => [], {
		triggerFor: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "brnTabsTrigger",
				required: true
			}]
		}],
		_disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}]
	});
})();
var BrnTabsList = class BrnTabsList {
	_root = inject(BrnTabs);
	_orientation = this._root.$orientation;
	_direction = this._root.direction;
	_activeTab = this._root.$activeTab;
	_tabs = this._root.$tabs;
	_elementRef = inject(ElementRef);
	_keyDownListener = fromEvent(this._elementRef.nativeElement, "keydown");
	_keyManager;
	triggers = contentChildren(BrnTabsTrigger, {
		...ngDevMode ? { debugName: "triggers" } : 		/* istanbul ignore next */ {},
		descendants: true
	});
	ngAfterContentInit() {
		this._keyManager = new FocusKeyManager(this.triggers()).withHorizontalOrientation(this._direction()).withHomeAndEnd().withPageUpDown().withWrap();
		this._keyDownListener.pipe(take(1)).subscribe(() => {
			const currentTabKey = this._activeTab();
			const tabs = this._tabs();
			let activeIndex = 0;
			if (currentTabKey) {
				const currentTab = tabs[currentTabKey];
				if (currentTab) activeIndex = this.triggers().indexOf(currentTab.trigger);
			}
			this._keyManager?.setActiveItem(activeIndex);
		});
		this._keyDownListener.subscribe((event) => {
			if ("key" in event) {
				if (this._orientation() === "horizontal") {
					if (event.key === "ArrowUp" || event.key === "ArrowDown") return;
				}
				if (this._orientation() === "vertical") {
					if (event.key === "ArrowLeft" || event.key === "ArrowRight") return;
				}
			}
			this._keyManager?.onKeydown(event);
		});
	}
	/** @nocollapse */
	static ɵfac = function BrnTabsList_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabsList)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabsList,
		selectors: [[
			"",
			"brnTabsList",
			""
		]],
		contentQueries: function BrnTabsList_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.triggers, BrnTabsTrigger, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		hostAttrs: ["role", "tablist"],
		hostVars: 2,
		hostBindings: function BrnTabsList_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("aria-orientation", ctx._orientation())("data-orientation", ctx._orientation());
		},
		exportAs: ["brnTabsList"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabsList, [{
		type: Directive,
		args: [{
			selector: "[brnTabsList]",
			exportAs: "brnTabsList",
			host: {
				role: "tablist",
				"[attr.aria-orientation]": "_orientation()",
				"[attr.data-orientation]": "_orientation()"
			}
		}]
	}], null, { triggers: [{
		type: ContentChildren,
		args: [forwardRef(() => BrnTabsTrigger), {
			descendants: true,
			isSignal: true
		}]
	}] });
})();
/**
* We are building on shoulders of giants here and adapt the implementation provided by the incredible Angular
* team: https://github.com/angular/components/blob/main/src/material/tabs/paginated-tab-header.ts
* Check them out! Give them a try! Leave a star! Their work is incredible!
*/
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
/** Config used to bind passive event listeners */
var passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
* Amount of milliseconds to wait before starting to scroll the header automatically.
* Set a little conservatively in order to handle fake events dispatched on touch devices.
*/
var HEADER_SCROLL_DELAY = 650;
/**
* Interval in milliseconds at which to scroll the header
* while the user is holding their pointer.
*/
var HEADER_SCROLL_INTERVAL = 100;
/**
* Base class for a tab header that supported pagination.
* @docs-private
*/
var BrnTabsPaginatedList = class BrnTabsPaginatedList {
	/** The distance in pixels that the tab labels should be translated to the left. */
	_scrollDistance = 0;
	/** Whether the header should scroll to the selected index after the view has been checked. */
	_selectedIndexChanged = false;
	_root = inject(BrnTabs);
	_activeTab = this._root.$activeTab;
	_tabs = this._root.$tabs;
	/** Emits when the component is destroyed. */
	_destroyed = new Subject();
	/** Whether the controls for pagination should be displayed */
	showPaginationControls = signal(false, ...ngDevMode ? [{ debugName: "showPaginationControls" }] : 	/* istanbul ignore next */ []);
	/** Whether the tab list can be scrolled more towards the end of the tab label list. */
	disableScrollAfter = true;
	/** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
	disableScrollBefore = true;
	/**
	* The number of tab labels that are displayed on the header. When this changes, the header
	* should re-evaluate the scroll position.
	*/
	_tabLabelCount;
	/** Whether the scroll distance has changed and should be applied after the view is checked. */
	_scrollDistanceChanged;
	/** Used to manage focus between the tabs. */
	_keyManager;
	/** Cached text content of the header. */
	_currentTextContent;
	/** Stream that will stop the automated scrolling. */
	_stopScrolling = new Subject();
	/**
	* Whether pagination should be disabled. This can be used to avoid unnecessary
	* layout recalculations if it's known that pagination won't be required.
	*/
	disablePagination = input(false, {
		...ngDevMode ? { debugName: "disablePagination" } : 		/* istanbul ignore next */ {},
		transform: booleanAttribute
	});
	/** The index of the active tab. */
	_selectedIndex = computed(() => {
		const currentTabKey = this._activeTab();
		const tabs = this._tabs();
		let activeIndex = 0;
		if (currentTabKey && this.items()) {
			const currentTab = tabs[currentTabKey];
			if (currentTab) activeIndex = this.items().indexOf(currentTab.trigger);
		}
		return activeIndex;
	}, ...ngDevMode ? [{ debugName: "_selectedIndex" }] : 	/* istanbul ignore next */ []);
	/** Event emitted when the option is selected. */
	selectFocusedIndex = output();
	/** Event emitted when a label is focused. */
	indexFocused = output();
	_sharedResizeObserver = inject(SharedResizeObserver);
	_injector = inject(Injector);
	_elementRef = inject(ElementRef);
	_changeDetectorRef = inject(ChangeDetectorRef);
	_viewportRuler = inject(ViewportRuler);
	_dir = inject(Directionality, { optional: true });
	_ngZone = inject(NgZone);
	_platform = inject(Platform);
	animationMode = inject(ANIMATION_MODULE_TYPE, { optional: true });
	constructor() {
		this._ngZone.runOutsideAngular(() => {
			fromEvent(this._elementRef.nativeElement, "mouseleave").pipe(takeUntil(this._destroyed)).subscribe(() => {
				this._stopInterval();
			});
		});
		effect(() => {
			const selectedIndex = this._selectedIndex();
			if (selectedIndex !== 0) {
				this._selectedIndexChanged = true;
				if (this._keyManager) this._keyManager.updateActiveItem(selectedIndex);
			}
		});
	}
	ngAfterViewInit() {
		fromEvent(this.previousPaginator().nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
			this._handlePaginatorPress("before");
		});
		fromEvent(this.nextPaginator().nativeElement, "touchstart", passiveEventListenerOptions).pipe(takeUntil(this._destroyed)).subscribe(() => {
			this._handlePaginatorPress("after");
		});
	}
	ngAfterContentInit() {
		const dirChange = this._dir ? this._dir.change : of("ltr");
		const resize = this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(debounceTime(32), takeUntil(this._destroyed));
		const viewportResize = this._viewportRuler.change(150).pipe(takeUntil(this._destroyed));
		const realign = () => {
			this.updatePagination();
		};
		this._keyManager = new FocusKeyManager(this.items()).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(() => false);
		this._keyManager.updateActiveItem(this._selectedIndex());
		afterNextRender(realign, { injector: this._injector });
		merge(dirChange, viewportResize, resize, this.itemsChanges, this._itemsResized()).pipe(takeUntil(this._destroyed)).subscribe(() => {
			this._ngZone.run(() => {
				Promise.resolve().then(() => {
					this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), this._scrollDistance));
					realign();
				});
			});
			this._keyManager.withHorizontalOrientation(this._getLayoutDirection());
		});
		this._keyManager.change.subscribe((newFocusIndex) => {
			this.indexFocused.emit(newFocusIndex);
			this._setTabFocus(newFocusIndex);
		});
	}
	/** Sends any changes that could affect the layout of the items. */
	_itemsResized() {
		if (typeof ResizeObserver !== "function") return EMPTY;
		return this.itemsChanges.pipe(startWith(this.items()), switchMap((tabItems) => new Observable((observer) => this._ngZone.runOutsideAngular(() => {
			const resizeObserver = new ResizeObserver((entries) => observer.next(entries));
			for (const tabItem of tabItems) resizeObserver.observe(tabItem.elementRef.nativeElement);
			return () => {
				resizeObserver.disconnect();
			};
		}))), skip(1), filter((entries) => entries.some((e) => e.contentRect.width > 0 && e.contentRect.height > 0)));
	}
	ngAfterContentChecked() {
		if (this._tabLabelCount !== this.items().length) {
			this.updatePagination();
			this._tabLabelCount = this.items().length;
			this._changeDetectorRef.markForCheck();
		}
		if (this._selectedIndexChanged) {
			this._scrollToLabel(this._selectedIndex());
			this._checkScrollingControls();
			this._selectedIndexChanged = false;
			this._changeDetectorRef.markForCheck();
		}
		if (this._scrollDistanceChanged) {
			this._updateTabScrollPosition();
			this._scrollDistanceChanged = false;
			this._changeDetectorRef.markForCheck();
		}
	}
	ngOnDestroy() {
		this._keyManager?.destroy();
		this._destroyed.next();
		this._destroyed.complete();
		this._stopScrolling.complete();
	}
	/** Handles keyboard events on the header. */
	_handleKeydown(event) {
		if (hasModifierKey(event)) return;
		switch (event.keyCode) {
			case 13:
			case 32:
				if (this.focusIndex !== this._selectedIndex()) {
					const item = this.items()[this.focusIndex];
					if (item && !item.disabled) {
						this.selectFocusedIndex.emit(this.focusIndex);
						this._itemSelected(event);
					}
				}
				break;
			default: this._keyManager.onKeydown(event);
		}
	}
	/**
	* Callback for when the MutationObserver detects that the content has changed.
	*/
	_onContentChanges() {
		const textContent = this._elementRef.nativeElement.textContent;
		if (textContent !== this._currentTextContent) {
			this._currentTextContent = textContent || "";
			this._ngZone.run(() => {
				this.updatePagination();
				this._changeDetectorRef.markForCheck();
			});
		}
	}
	/**
	* Updates the view whether pagination should be enabled or not.
	*
	* WARNING: Calling this method can be very costly in terms of performance. It should be called
	* as infrequently as possible from outside of the Tabs component as it causes a reflow of the
	* page.
	*/
	updatePagination() {
		this._checkPaginationEnabled();
		this._checkScrollingControls();
		this._updateTabScrollPosition();
	}
	/** Tracks which element has focus; used for keyboard navigation */
	get focusIndex() {
		return this._keyManager ? this._keyManager.activeItemIndex ?? 0 : 0;
	}
	/** When the focus index is set, we must manually send focus to the correct label */
	set focusIndex(value) {
		if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) return;
		this._keyManager.setActiveItem(value);
	}
	/**
	* Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
	* providing a valid index and return true.
	*/
	_isValidIndex(index) {
		return this.items() ? !!this.items()[index] : true;
	}
	/**
	* Sets focus on the HTML element for the label wrapper and scrolls it into the view if
	* scrolling is enabled.
	*/
	_setTabFocus(tabIndex) {
		if (this.showPaginationControls()) this._scrollToLabel(tabIndex);
		if (this.items()?.length) {
			this.items()[tabIndex].focus();
			const containerEl = this.tabListContainer().nativeElement;
			if (this._getLayoutDirection() === "ltr") containerEl.scrollLeft = 0;
			else containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
		}
	}
	/** The layout direction of the containing app. */
	_getLayoutDirection() {
		return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
	}
	/** Performs the CSS transformation on the tab list that will cause the list to scroll. */
	_updateTabScrollPosition() {
		if (this.disablePagination()) return;
		const scrollDistance = this.scrollDistance;
		const translateX = this._getLayoutDirection() === "ltr" ? -scrollDistance : scrollDistance;
		this.tabList().nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
		if (this._platform.TRIDENT || this._platform.EDGE) this.tabListContainer().nativeElement.scrollLeft = 0;
	}
	/** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
	get scrollDistance() {
		return this._scrollDistance;
	}
	set scrollDistance(value) {
		this._scrollTo(value);
	}
	/**
	* Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
	* the end of the list, respectively). The distance to scroll is computed to be a third of the
	* length of the tab list view window.
	*
	* This is an expensive call that forces a layout reflow to compute box and scroll metrics and
	* should be called sparingly.
	*/
	_scrollHeader(direction) {
		const viewLength = this.tabListContainer().nativeElement.offsetWidth;
		const scrollAmount = (direction === "before" ? -1 : 1) * viewLength / 3;
		return this._scrollTo(this._scrollDistance + scrollAmount);
	}
	/** Handles click events on the pagination arrows. */
	_handlePaginatorClick(direction) {
		this._stopInterval();
		this._scrollHeader(direction);
	}
	/**
	* Moves the tab list such that the desired tab label (marked by index) is moved into view.
	*
	* This is an expensive call that forces a layout reflow to compute box and scroll metrics and
	* should be called sparingly.
	*/
	_scrollToLabel(labelIndex) {
		if (this.disablePagination()) return;
		const selectedLabel = this.items() ? this.items()[labelIndex] : null;
		if (!selectedLabel) return;
		const viewLength = this.tabListContainer().nativeElement.offsetWidth;
		const { offsetLeft, offsetWidth } = selectedLabel.elementRef.nativeElement;
		let labelBeforePos;
		let labelAfterPos;
		if (this._getLayoutDirection() === "ltr") {
			labelBeforePos = offsetLeft;
			labelAfterPos = labelBeforePos + offsetWidth;
		} else {
			labelAfterPos = this.tabListInner().nativeElement.offsetWidth - offsetLeft;
			labelBeforePos = labelAfterPos - offsetWidth;
		}
		const beforeVisiblePos = this.scrollDistance;
		const afterVisiblePos = this.scrollDistance + viewLength;
		if (labelBeforePos < beforeVisiblePos) this.scrollDistance -= beforeVisiblePos - labelBeforePos;
		else if (labelAfterPos > afterVisiblePos) this.scrollDistance += Math.min(labelAfterPos - afterVisiblePos, labelBeforePos - beforeVisiblePos);
	}
	/**
	* Evaluate whether the pagination controls should be displayed. If the scroll width of the
	* tab list is wider than the size of the header container, then the pagination controls should
	* be shown.
	*
	* This is an expensive call that forces a layout reflow to compute box and scroll metrics and
	* should be called sparingly.
	*/
	_checkPaginationEnabled() {
		if (this.disablePagination()) this.showPaginationControls.set(false);
		else {
			const isEnabled = this.tabListInner().nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
			if (!isEnabled) this.scrollDistance = 0;
			if (isEnabled !== this.showPaginationControls()) this._changeDetectorRef.markForCheck();
			this.showPaginationControls.set(isEnabled);
		}
	}
	/**
	* Evaluate whether the before and after controls should be enabled or disabled.
	* If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
	* before button. If the header is at the end of the list (scroll distance is equal to the
	* maximum distance we can scroll), then disable the after button.
	*
	* This is an expensive call that forces a layout reflow to compute box and scroll metrics and
	* should be called sparingly.
	*/
	_checkScrollingControls() {
		if (this.disablePagination()) this.disableScrollAfter = this.disableScrollBefore = true;
		else {
			this.disableScrollBefore = this.scrollDistance === 0;
			this.disableScrollAfter = this.scrollDistance === this._getMaxScrollDistance();
			this._changeDetectorRef.markForCheck();
		}
	}
	/**
	* Determines what is the maximum length in pixels that can be set for the scroll distance. This
	* is equal to the difference in width between the tab list container and tab header container.
	*
	* This is an expensive call that forces a layout reflow to compute box and scroll metrics and
	* should be called sparingly.
	*/
	_getMaxScrollDistance() {
		return this.tabListInner().nativeElement.scrollWidth - this.tabListContainer().nativeElement.offsetWidth || 0;
	}
	/** Stops the currently-running paginator interval.  */
	_stopInterval() {
		this._stopScrolling.next();
	}
	/**
	* Handles the user pressing down on one of the paginators.
	* Starts scrolling the header after a certain amount of time.
	* @param direction In which direction the paginator should be scrolled.
	*/
	_handlePaginatorPress(direction, mouseEvent) {
		if (mouseEvent && mouseEvent.button !== null && mouseEvent.button !== 0) return;
		this._stopInterval();
		timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL).pipe(takeUntil(merge(this._stopScrolling, this._destroyed))).subscribe(() => {
			const { maxScrollDistance, distance } = this._scrollHeader(direction);
			if (distance === 0 || distance >= maxScrollDistance) this._stopInterval();
		});
	}
	/**
	* Scrolls the header to a given position.
	* @param position Position to which to scroll.
	* @returns Information on the current scroll distance and the maximum.
	*/
	_scrollTo(position) {
		if (this.disablePagination()) return {
			maxScrollDistance: 0,
			distance: 0
		};
		const maxScrollDistance = this._getMaxScrollDistance();
		this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
		this._scrollDistanceChanged = true;
		this._checkScrollingControls();
		return {
			maxScrollDistance,
			distance: this._scrollDistance
		};
	}
	/** @nocollapse */
	static ɵfac = function BrnTabsPaginatedList_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnTabsPaginatedList)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnTabsPaginatedList,
		inputs: { disablePagination: [1, "disablePagination"] },
		outputs: {
			selectFocusedIndex: "selectFocusedIndex",
			indexFocused: "indexFocused"
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnTabsPaginatedList, [{ type: Directive }], () => [], {
		disablePagination: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disablePagination",
				required: false
			}]
		}],
		selectFocusedIndex: [{
			type: Output,
			args: ["selectFocusedIndex"]
		}],
		indexFocused: [{
			type: Output,
			args: ["indexFocused"]
		}]
	});
})();
var BrnTabsImports = [
	BrnTabs,
	BrnTabsList,
	BrnTabsTrigger,
	BrnTabsContent,
	BrnTabsContentLazy
];
//#endregion
export { BrnTabs, BrnTabsContent, BrnTabsContentLazy, BrnTabsImports, BrnTabsList, BrnTabsPaginatedList, BrnTabsTrigger };
