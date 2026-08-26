import { Bi as signal, D as DestroyRef, Mn as forwardRef, U as InjectionToken, _ as untracked, c as computed, rt as PLATFORM_ID, xr as inject, yn as effect } from "./_resource-chunk-B6ovZ6Q1.js";
import { $ as isDevMode, $a as ɵɵdomProperty, Cs as ɵɵstyleMap, O as booleanAttribute, Po as ɵɵlistener, Sn as Input, Va as ɵɵdefineDirective, X as input, Yi as ɵɵProvidersFeature, a as ContentChildren, at as output, fa as ɵɵcontentQuerySignal, fn as ElementRef, ia as ɵɵattribute, j as contentChildren, ki as setClassMetadata, ns as ɵɵqueryAdvance, un as Directive, vr as afterNextRender, ws as ɵɵstyleProp, zn as Output } from "./core-Pon-_TSP.js";
import { t as fromEvent } from "./fromEvent-DRpnW_k-.js";
import { i as Directionality } from "./keycodes-C5TltlfJ.js";
import { n as FocusMonitor, t as FocusKeyManager } from "./a11y-Cuu3KPEj.js";
import { d as isPlatformServer } from "./common-BL-YhwNO.js";
import { takeUntilDestroyed } from "./@angular_core_rxjs-interop.js";
//#region node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-core.mjs
function createInjectionToken(description) {
	const token = new InjectionToken(description);
	const provideFn = (value) => {
		return {
			provide: token,
			useValue: value
		};
	};
	const provideExistingFn = (value) => {
		return {
			provide: token,
			useExisting: forwardRef(value)
		};
	};
	const injectFn = (options = {}) => {
		return inject(token, options);
	};
	return [
		injectFn,
		provideFn,
		provideExistingFn,
		token
	];
}
var [injectCustomClassSettable, provideCustomClassSettable, provideCustomClassSettableExisting, SET_CLASS_TO_CUSTOM_ELEMENT_TOKEN] = createInjectionToken("@spartan-ng SET_CLASS_TO_CUSTOM_ELEMENT_TOKEN");
ngDevMode;
var [injectExposedSideProvider, provideExposedSideProvider, provideExposedSideProviderExisting, EXPOSES_SIDE_TOKEN] = createInjectionToken("@spartan-ng EXPOSES_SIDE_TOKEN");
var [injectExposesStateProvider, provideExposesStateProvider, provideExposesStateProviderExisting, EXPOSES_STATE_TOKEN] = createInjectionToken("@spartan-ng EXPOSES_STATE_TOKEN");
/**
* Measures the natural size of a collapsible host's content via `scrollHeight` so it can animate
* between `height: 0` and a measured pixel height - the whole content is covered, regardless of how
* it is projected. A `ResizeObserver` on the content keeps the value live. SSR-safe; the host must
* be a block-level element for `scrollHeight` to reflect its content.
*
* @returns Signals with the content's width and height in px, or `null` before measurement.
*/
function injectContentDimensions() {
	const host = inject(ElementRef).nativeElement;
	const platformId = inject(PLATFORM_ID);
	const destroyRef = inject(DestroyRef);
	const width = signal(null, ...ngDevMode ? [{ debugName: "width" }] : 	/* istanbul ignore next */ []);
	const height = signal(null, ...ngDevMode ? [{ debugName: "height" }] : 	/* istanbul ignore next */ []);
	if (isPlatformServer(platformId)) return {
		width: width.asReadonly(),
		height: height.asReadonly()
	};
	const measure = () => {
		const previousHeight = host.style.height;
		host.style.height = "auto";
		width.set(host.scrollWidth);
		height.set(host.scrollHeight);
		host.style.height = previousHeight;
	};
	afterNextRender({ read: () => {
		measure();
		if (typeof ResizeObserver === "undefined") return;
		let frame = 0;
		const observer = new ResizeObserver(() => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(measure);
		});
		const content = host.firstElementChild;
		if (content) observer.observe(content);
		destroyRef.onDestroy(() => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		});
	} });
	return {
		width: width.asReadonly(),
		height: height.asReadonly()
	};
}
new InjectionToken("SpartanMenuSide");
var [injectTableClassesSettable, provideTableClassesSettable, provideTableClassesSettableExisting, SET_TABLE_CLASSES_TOKEN] = createInjectionToken("@spartan-ng SET_TABLE_CLASSES_TOKEN");
//#endregion
//#region node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-accordion.mjs
var BrnAccordionToken = new InjectionToken("BrnAccordionToken");
function injectBrnAccordion() {
	return inject(BrnAccordionToken);
}
function provideBrnAccordion(accordion) {
	return {
		provide: BrnAccordionToken,
		useExisting: accordion
	};
}
var BrnAccordionItemToken = new InjectionToken("BrnAccordionItemToken");
function injectBrnAccordionItem() {
	return inject(BrnAccordionItemToken);
}
function provideBrnAccordionItem(item) {
	return {
		provide: BrnAccordionItemToken,
		useExisting: item
	};
}
var BrnAccordionItem = class BrnAccordionItem {
	static _itemIdGenerator = 0;
	id = ++BrnAccordionItem._itemIdGenerator;
	_accordion = injectBrnAccordion();
	/**
	* Whether the item is opened or closed.
	* @default false
	*/
	isOpened = input(false, {
		...ngDevMode ? { debugName: "isOpened" } : 		/* istanbul ignore next */ {},
		transform: booleanAttribute
	});
	/**
	* Whether the item is disabled.
	* @default false
	*/
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : 		/* istanbul ignore next */ {},
		transform: booleanAttribute
	});
	/**
	* Computed state of the item, either 'open' or 'closed'
	* @default closed
	*/
	state = computed(() => this._accordion.openItemIds()?.includes(this.id) ? "open" : "closed", ...ngDevMode ? [{ debugName: "state" }] : 	/* istanbul ignore next */ []);
	/**
	* Emits boolean when the item is opened or closed.
	*/
	stateChange = output();
	/**
	* Emits state change when item is opened or closed
	*/
	openedChange = output();
	constructor() {
		if (!this._accordion) throw Error("Accordion item can only be used inside an Accordion. Add brnAccordion to ancestor.");
		effect(() => {
			const isOpened = this.isOpened();
			untracked(() => {
				if (isOpened) this._triggerOpen(false);
				else this._triggerClose(false);
			});
		});
	}
	open() {
		this._triggerOpen(true);
	}
	close() {
		this._triggerClose(true);
	}
	_triggerOpen(emitEvent) {
		if (this.disabled() || this.state() === "open") return;
		this._accordion.openItem(this.id);
		if (emitEvent) {
			this.stateChange.emit("open");
			this.openedChange.emit(true);
		}
	}
	_triggerClose(emitEvent) {
		if (this.disabled() || this.state() !== "open") return;
		this._accordion.closeItem(this.id);
		if (emitEvent) {
			this.stateChange.emit("closed");
			this.openedChange.emit(false);
		}
	}
	/** @nocollapse */
	static ɵfac = function BrnAccordionItem_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnAccordionItem)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnAccordionItem,
		selectors: [[
			"",
			"brnAccordionItem",
			""
		]],
		hostVars: 1,
		hostBindings: function BrnAccordionItem_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("data-state", ctx.state());
		},
		inputs: {
			isOpened: [1, "isOpened"],
			disabled: [1, "disabled"]
		},
		outputs: {
			stateChange: "stateChange",
			openedChange: "openedChange"
		},
		exportAs: ["brnAccordionItem"],
		features: [ɵɵProvidersFeature([provideBrnAccordionItem(BrnAccordionItem)])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnAccordionItem, [{
		type: Directive,
		args: [{
			selector: "[brnAccordionItem]",
			exportAs: "brnAccordionItem",
			providers: [provideBrnAccordionItem(BrnAccordionItem)],
			host: { "[attr.data-state]": "state()" }
		}]
	}], () => [], {
		isOpened: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "isOpened",
				required: false
			}]
		}],
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		stateChange: [{
			type: Output,
			args: ["stateChange"]
		}],
		openedChange: [{
			type: Output,
			args: ["openedChange"]
		}]
	});
})();
var HORIZONTAL_KEYS_TO_PREVENT_DEFAULT = [
	"ArrowLeft",
	"ArrowRight",
	"PageDown",
	"PageUp",
	"Home",
	"End",
	" ",
	"Enter"
];
var VERTICAL_KEYS_TO_PREVENT_DEFAULT = [
	"ArrowUp",
	"ArrowDown",
	"PageDown",
	"PageUp",
	"Home",
	"End",
	" ",
	"Enter"
];
var BrnAccordion = class BrnAccordion {
	_el = inject(ElementRef);
	_dir = inject(Directionality);
	_brnAccordionItems = contentChildren(BrnAccordionItem, ...ngDevMode ? [{ debugName: "_brnAccordionItems" }] : 	/* istanbul ignore next */ []);
	_focusMonitor = inject(FocusMonitor);
	_keyManager = computed(() => new FocusKeyManager(this._triggers()).withHomeAndEnd().withPageUpDown().withWrap().withHorizontalOrientation(this.orientation() === "vertical" ? null : this._direction() ?? "ltr").withVerticalOrientation(this.orientation() === "vertical").skipPredicate((item) => item.disabled), ...ngDevMode ? [{ debugName: "_keyManager" }] : 	/* istanbul ignore next */ []);
	_focused = false;
	_openItemIds = signal([], ...ngDevMode ? [{ debugName: "_openItemIds" }] : 	/* istanbul ignore next */ []);
	openItemIds = this._openItemIds.asReadonly();
	state = computed(() => this._openItemIds().length > 0 ? "open" : "closed", ...ngDevMode ? [{ debugName: "state" }] : 	/* istanbul ignore next */ []);
	_triggers = signal([], ...ngDevMode ? [{ debugName: "_triggers" }] : 	/* istanbul ignore next */ []);
	/**
	* Whether the accordion is in single or multiple mode.
	* @default 'single'
	*/
	type = input("single", ...ngDevMode ? [{ debugName: "type" }] : 	/* istanbul ignore next */ []);
	/**
	* The orientation of the accordion, either 'horizontal' or 'vertical'.
	* @default 'vertical'
	*/
	orientation = input("vertical", ...ngDevMode ? [{ debugName: "orientation" }] : 	/* istanbul ignore next */ []);
	/** internal **/
	_direction = this._dir.valueSignal;
	ngAfterContentInit() {
		this._el.nativeElement.addEventListener("keydown", (event) => {
			if (this.shouldIgnoreEvent(event)) return;
			this._keyManager()?.onKeydown(event);
			this.preventDefaultEvents(event);
		});
		this._focusMonitor.monitor(this._el, true).subscribe((origin) => {
			this._focused = origin !== null;
		});
	}
	ngOnDestroy() {
		this._focusMonitor.stopMonitoring(this._el);
	}
	registerTrigger(trigger) {
		this._triggers.update((triggers) => [...triggers, trigger]);
	}
	unregisterTrigger(trigger) {
		this._triggers.update((triggers) => triggers.filter((t) => t !== trigger));
	}
	setActiveItem(item) {
		this._keyManager()?.setActiveItem(item);
	}
	openItem(id) {
		if (this.type() === "single") {
			this._openItemIds.set([id]);
			return;
		}
		this._openItemIds.update((ids) => ids.includes(id) ? ids : [...ids, id]);
	}
	closeItem(id) {
		this._openItemIds.update((ids) => ids.filter((openId) => openId !== id));
	}
	isEditableTarget(el) {
		const node = el;
		if (!node) return false;
		const tag = node.tagName;
		if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
		if (node.isContentEditable) return true;
		const role = node.getAttribute?.("role") ?? "";
		if (/^(textbox|searchbox|combobox|listbox|grid|tree|menu|spinbutton|slider)$/.test(role)) return true;
		return !!node.closest?.("input, textarea, select, [contenteditable=\"\"], [contenteditable=\"true\"], [role=\"textbox\"], [role=\"searchbox\"], [role=\"combobox\"], [role=\"listbox\"], [role=\"grid\"], [role=\"tree\"], [role=\"menu\"], [role=\"spinbutton\"], [role=\"slider\"]");
	}
	shouldIgnoreEvent(e) {
		if (e.defaultPrevented) return true;
		if (e.ctrlKey || e.metaKey || e.altKey) return true;
		return this.isEditableTarget(e.target);
	}
	preventDefaultEvents(event) {
		if (event.defaultPrevented) return;
		if (!this._focused) return;
		if (!("key" in event)) return;
		if ((this.orientation() === "horizontal" ? HORIZONTAL_KEYS_TO_PREVENT_DEFAULT : VERTICAL_KEYS_TO_PREVENT_DEFAULT).includes(event.key) && event.code !== "NumpadEnter") event.preventDefault();
	}
	openAll() {
		if (this.type() === "multiple") this._brnAccordionItems().forEach((a) => a.open());
		else console.warn("[BrnAccordion]: openAll is only available in multiple mode");
	}
	closeAll() {
		this._brnAccordionItems().forEach((a) => a.close());
	}
	/** @nocollapse */
	static ɵfac = function BrnAccordion_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnAccordion)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnAccordion,
		selectors: [[
			"",
			"brnAccordion",
			""
		]],
		contentQueries: function BrnAccordion_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx._brnAccordionItems, BrnAccordionItem, 4);
			if (rf & 2) ɵɵqueryAdvance();
		},
		hostVars: 3,
		hostBindings: function BrnAccordion_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("dir", ctx._direction())("data-state", ctx.state())("data-orientation", ctx.orientation());
		},
		inputs: {
			type: [1, "type"],
			orientation: [1, "orientation"]
		},
		exportAs: ["brnAccordion"],
		features: [ɵɵProvidersFeature([provideBrnAccordion(BrnAccordion)])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnAccordion, [{
		type: Directive,
		args: [{
			selector: "[brnAccordion]",
			exportAs: "brnAccordion",
			providers: [provideBrnAccordion(BrnAccordion)],
			host: {
				"[attr.dir]": "_direction()",
				"[attr.data-state]": "state()",
				"[attr.data-orientation]": "orientation()"
			}
		}]
	}], null, {
		_brnAccordionItems: [{
			type: ContentChildren,
			args: [forwardRef(() => BrnAccordionItem), { isSignal: true }]
		}],
		type: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "type",
				required: false
			}]
		}],
		orientation: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "orientation",
				required: false
			}]
		}]
	});
})();
var BrnAccordionContent = class BrnAccordionContent {
	_item = injectBrnAccordionItem();
	_dimensions = injectContentDimensions();
	_inert = computed(() => this.state?.() === "closed" ? true : void 0, ...ngDevMode ? [{ debugName: "_inert" }] : 	/* istanbul ignore next */ []);
	state = this._item?.state;
	id = `brn-accordion-content-${this._item?.id}`;
	ariaLabeledBy = `brn-accordion-trigger-${this._item?.id}`;
	/**
	* The style to be applied to the host element after the dimensions are calculated.
	* @default 'overflow: hidden'
	*/
	style = input("overflow: hidden", ...ngDevMode ? [{ debugName: "style" }] : 	/* istanbul ignore next */ []);
	constructor() {
		if (!this._item) throw Error("Accordion Content can only be used inside an AccordionItem. Add brnAccordionItem to parent.");
	}
	/** @nocollapse */
	static ɵfac = function BrnAccordionContent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnAccordionContent)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnAccordionContent,
		selectors: [["brn-accordion-content"], [
			"",
			"brnAccordionContent",
			""
		]],
		hostAttrs: ["role", "region"],
		hostVars: 10,
		hostBindings: function BrnAccordionContent_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵdomProperty("id", ctx.id);
				ɵɵattribute("data-state", ctx.state == null ? null : ctx.state())("aria-labelledby", ctx.ariaLabeledBy)("inert", ctx._inert());
				ɵɵstyleMap(ctx.style());
				ɵɵstyleProp("--%NS%brn-accordion-content-width", ctx._dimensions.width(), "px")("--%NS%brn-accordion-content-height", ctx._dimensions.height(), "px");
			}
		},
		inputs: { style: [1, "style"] }
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnAccordionContent, [{
		type: Directive,
		args: [{
			selector: "brn-accordion-content,[brnAccordionContent]",
			host: {
				"[attr.data-state]": "state?.()",
				"[attr.aria-labelledby]": "ariaLabeledBy",
				role: "region",
				"[id]": "id",
				"[style.--brn-accordion-content-width.px]": "_dimensions.width()",
				"[style.--brn-accordion-content-height.px]": "_dimensions.height()",
				"[attr.inert]": "_inert()",
				"[style]": "style()"
			}
		}]
	}], () => [], { style: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "style",
			required: false
		}]
	}] });
})();
var BrnAccordionHeader = class BrnAccordionHeader {
	_accordion = injectBrnAccordion();
	_orientation = this._accordion.orientation;
	/** @nocollapse */
	static ɵfac = function BrnAccordionHeader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnAccordionHeader)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnAccordionHeader,
		selectors: [[
			"",
			"brnAccordionHeader",
			""
		]],
		hostVars: 1,
		hostBindings: function BrnAccordionHeader_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("data-orientation", ctx._orientation());
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnAccordionHeader, [{
		type: Directive,
		args: [{
			selector: "[brnAccordionHeader]",
			host: { "[attr.data-orientation]": "_orientation()" }
		}]
	}], null, null);
})();
var BrnAccordionTrigger = class BrnAccordionTrigger {
	_destroyRef = inject(DestroyRef);
	_accordion = injectBrnAccordion();
	_item = injectBrnAccordionItem();
	_el = inject(ElementRef);
	_orientation = this._accordion.orientation;
	_state = this._item.state;
	_isExpanded = computed(() => this._item.state() === "open", ...ngDevMode ? [{ debugName: "_isExpanded" }] : 	/* istanbul ignore next */ []);
	_disabled = this._item.disabled;
	id = `brn-accordion-trigger-${this._item.id}`;
	ariaControls = `brn-accordion-content-${this._item.id}`;
	get disabled() {
		return this._disabled();
	}
	constructor() {
		if (!this._accordion) throw Error("Accordion trigger requires a parent Accordion.");
		if (!this._item) throw Error("Accordion trigger requires a parent AccordionItem.");
		this._accordion.registerTrigger(this);
		this._destroyRef.onDestroy(() => this._accordion.unregisterTrigger(this));
		this.validateAriaStructure();
		fromEvent(this._el.nativeElement, "focus").pipe(takeUntilDestroyed()).subscribe(() => {
			untracked(() => this._accordion.setActiveItem(this));
		});
	}
	toggle(event) {
		event.preventDefault();
		if (this._state() === "open") this._item.close();
		else this._item.open();
	}
	focus() {
		this._el.nativeElement.focus();
	}
	validateAriaStructure() {
		const element = this._el.nativeElement;
		const isButton = element.tagName === "BUTTON";
		const hasButtonRole = element.getAttribute("role") === "button";
		if (!isButton && !hasButtonRole) throw Error(`BrnAccordionTrigger: The trigger element must be a <button> or have role="button". Found: <${element.tagName.toLowerCase()}>`);
		const parent = element.parentElement;
		if (!parent) {
			const message = "BrnAccordionTrigger: The trigger button must be wrapped in a heading element.";
			if (isDevMode()) throw Error(message);
			else console.warn(message);
		}
		const isNativeHeading = /^H[1-6]$/.test(parent.tagName);
		const hasHeadingRole = parent.getAttribute("role") === "heading";
		if (!isNativeHeading && !hasHeadingRole) throw Error(`BrnAccordionTrigger: The trigger button must be wrapped in a heading element (h1-h6) or an element with role="heading". Found parent: <${parent.tagName.toLowerCase()}>`);
		if (hasHeadingRole && !parent.hasAttribute("aria-level")) throw Error("BrnAccordionTrigger: Elements with role=\"heading\" must have an aria-level attribute.");
	}
	/** @nocollapse */
	static ɵfac = function BrnAccordionTrigger_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnAccordionTrigger)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnAccordionTrigger,
		selectors: [[
			"button",
			"brnAccordionTrigger",
			""
		]],
		hostAttrs: [
			"type",
			"button",
			"tabindex",
			"0"
		],
		hostVars: 7,
		hostBindings: function BrnAccordionTrigger_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("click", function BrnAccordionTrigger_click_HostBindingHandler($event) {
				return ctx.toggle($event);
			})("keyup.space", function BrnAccordionTrigger_keyup_space_HostBindingHandler($event) {
				return ctx.toggle($event);
			})("keyup.enter", function BrnAccordionTrigger_keyup_enter_HostBindingHandler($event) {
				return ctx.toggle($event);
			});
			if (rf & 2) {
				ɵɵdomProperty("id", ctx.id)("disabled", ctx._disabled());
				ɵɵattribute("data-orientation", ctx._orientation())("data-state", ctx._state())("aria-expanded", ctx._isExpanded())("aria-controls", ctx.ariaControls)("aria-disabled", ctx._disabled());
			}
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnAccordionTrigger, [{
		type: Directive,
		args: [{
			selector: "button[brnAccordionTrigger]",
			host: {
				"[id]": "id",
				type: "button",
				tabindex: "0",
				"[attr.data-orientation]": "_orientation()",
				"[attr.data-state]": "_state()",
				"[attr.aria-expanded]": "_isExpanded()",
				"[attr.aria-controls]": "ariaControls",
				"[attr.aria-disabled]": "_disabled()",
				"[disabled]": "_disabled()",
				"(click)": "toggle($event)",
				"(keyup.space)": "toggle($event)",
				"(keyup.enter)": "toggle($event)"
			}
		}]
	}], () => [], null);
})();
var BrnAccordionImports = [
	BrnAccordion,
	BrnAccordionContent,
	BrnAccordionHeader,
	BrnAccordionItem,
	BrnAccordionTrigger
];
//#endregion
export { BrnAccordion, BrnAccordionContent, BrnAccordionHeader, BrnAccordionImports, BrnAccordionItem, BrnAccordionItemToken, BrnAccordionToken, BrnAccordionTrigger, injectBrnAccordion, injectBrnAccordionItem, provideBrnAccordion, provideBrnAccordionItem };
