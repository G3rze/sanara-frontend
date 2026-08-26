import { Ba as __spreadArray, za as __read } from "./_resource-chunk-B6ovZ6Q1.js";
import { Js as map } from "./core-Pon-_TSP.js";
//#region node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray = Array.isArray;
function callOrApply(fn, args) {
	return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
	return map(function(args) {
		return callOrApply(fn, args);
	});
}
//#endregion
export { mapOneOrManyArgs as t };
