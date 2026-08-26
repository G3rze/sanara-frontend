import { Da as noop, xa as operate, ya as createOperatorSubscriber } from "./_resource-chunk-B6ovZ6Q1.js";
import { t as innerFrom } from "./innerFrom-Bu1mU6qO.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function takeUntil(notifier) {
	return operate(function(source, subscriber) {
		innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
			return subscriber.complete();
		}, noop));
		!subscriber.closed && source.subscribe(subscriber);
	});
}
//#endregion
export { takeUntil as t };
