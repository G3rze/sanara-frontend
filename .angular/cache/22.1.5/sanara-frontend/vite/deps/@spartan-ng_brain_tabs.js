import { Bi as signal, D as DestroyRef, Mn as forwardRef, Sa as Observable, W as Injector, _ as untracked, c as computed, et as NgZone, sa as ɵɵdefineInjector, v as ANIMATION_MODULE_TYPE, va as Subject, xr as inject, yn as effect } from "./_resource-chunk-B6ovZ6Q1.js";
import { $a as ɵɵdomProperty, Gn as RendererFactory2, Ha as ɵɵdefineNgModule, Nn as NgModule, O as booleanAttribute, Po as ɵɵlistener, Sn as Input, Va as ɵɵdefineDirective, Wa as ɵɵdefineService, X as input, Zn as Service, a as ContentChildren, at as output, fa as ɵɵcontentQuerySignal, fn as ElementRef, fr as ViewContainerRef, ia as ɵɵattribute, ir as TemplateRef, j as contentChildren, ki as setClassMetadata, ns as ɵɵqueryAdvance, nt as model, r as ChangeDetectorRef, un as Directive, vr as afterNextRender, zn as Output } from "./core-Pon-_TSP.js";
import { f as shareReplay, p as timer, u as ViewportRuler } from "./scrolling-DESp54iH.js";
import { i as EMPTY, n as take } from "./tap-BMXp6-Po.js";
import { i as popNumber, n as of, o as popScheduler, r as from, t as switchMap } from "./switchMap-6S147_rv.js";
import { t as innerFrom } from "./innerFrom-Bu1mU6qO.js";
import { r as mergeAll, t as startWith } from "./startWith-CsZmGbKV.js";
import { t as fromEvent } from "./fromEvent-DRpnW_k-.js";
import { t as filter } from "./filter-C2O4_ixY.js";
import { a as debounceTime } from "./observers-B1CiA-km.js";
import { i as Directionality, t as hasModifierKey, u as Platform } from "./keycodes-C5TltlfJ.js";
import { i as skip, r as normalizePassiveListenerOptions, t as FocusKeyManager } from "./a11y-Cuu3KPEj.js";
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
