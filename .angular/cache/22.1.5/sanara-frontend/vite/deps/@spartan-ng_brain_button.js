import { xr as inject } from "./_resource-chunk-B6ovZ6Q1.js";
import { O as booleanAttribute, Sn as Input, Va as ɵɵdefineDirective, X as input, d as HOST_TAG_NAME, fn as ElementRef, ia as ɵɵattribute, ki as setClassMetadata, un as Directive } from "./core-Pon-_TSP.js";
import { t as fromEvent } from "./fromEvent-DRpnW_k-.js";
import { t as filter } from "./filter-C2O4_ixY.js";
import { takeUntilDestroyed } from "./@angular_core_rxjs-interop.js";
//#region node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-button.mjs
var BrnButton = class BrnButton {
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : 		/* istanbul ignore next */ {},
		transform: booleanAttribute
	});
	_isAnchor = inject(HOST_TAG_NAME) === "a";
	_elementRef = inject(ElementRef);
	constructor() {
		if (this._isAnchor) fromEvent(this._elementRef.nativeElement, "click").pipe(filter(() => this.disabled()), takeUntilDestroyed()).subscribe((event) => {
			event.preventDefault();
			event.stopImmediatePropagation();
		});
	}
	/** @nocollapse */
	static ɵfac = function BrnButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrnButton)();
	};
	/** @nocollapse */
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: BrnButton,
		selectors: [[
			"a",
			"brnButton",
			""
		], [
			"button",
			"brnButton",
			""
		]],
		hostVars: 3,
		hostBindings: function BrnButton_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("tabindex", ctx.disabled() ? -1 : void 0)("disabled", !ctx._isAnchor && ctx.disabled() || null)("data-disabled", ctx.disabled() || null);
		},
		inputs: { disabled: [1, "disabled"] }
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnButton, [{
		type: Directive,
		args: [{
			selector: "a[brnButton], button[brnButton]",
			host: {
				"[attr.tabindex]": "disabled() ? -1 : undefined",
				"[attr.disabled]": "!_isAnchor && disabled() || null",
				"[attr.data-disabled]": "disabled() || null"
			}
		}]
	}], () => [], { disabled: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "disabled",
			required: false
		}]
	}] });
})();
var BrnButtonImports = [BrnButton];
//#endregion
export { BrnButton, BrnButtonImports };
