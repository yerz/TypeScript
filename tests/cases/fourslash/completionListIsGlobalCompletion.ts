/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export default class C {
////}

// @Filename: a.ts
////import { /*1*/ } from "./file.ts";  // no globals in imports - export found

//@Filename: file.tsx
/////// <reference path="/*2*/..\services\services.ts" /> // no globals in reference paths
////import { /*3*/ } from "./file1.ts";  // no globals in imports - export not found
////var test = "/*4*/"; // no globals in strings
/////*5*/class A { // insert globals
////    foo(): string { return ''; }
////}
////
////class /*6*/B extends A { // no globals after class keyword
////    bar(): string {
//// /*7*/ // insert globals
////        return '';
////    }
////}
////
////class C</*8*/ U extends A, T extends A> { // no globals at beginning of generics
////    x: U;
////    y = this./*9*/x; // no globals inserted for member completions
////   /*10*/ // insert globals
////}
/////*11*/ // insert globals
////const y = <div /*12*/ />; // no globals in jsx attribute found
////const z = <div =/*13*/ />; // no globals in jsx attribute with syntax error
////const x = `/*14*/ ${/*15*/}`; // globals only in template expression
////var user = </*16*/User name=/*17*/{ /*18*/window.isLoggedIn ? window.name : '/*19*/'} />; // globals only in JSX expression (but not in JSX expression strings)

const x = ["test", "A", "B", "C", "y", "z", "x", "user"];
const globals: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [...x, ...completion.globals]
verify.completions(
    { marker: ["1"], exact: undefined, isGlobalCompletion: false },
    { marker: "2", exact: ["a.ts", "file.ts"], isGlobalCompletion: false, isNewIdentifierLocation: true },
    { marker: "3", exact: undefined, isGlobalCompletion: false },
    { marker: "4", exact: [], isGlobalCompletion: false },
    { marker: "5", exact: globals, isGlobalCompletion: true },
    { marker: "6", exact: undefined, isGlobalCompletion: false },
    { marker: "7", exact: completion.globalsInsideFunction(x), isGlobalCompletion: true },
    { marker: "8", exact: undefined, isGlobalCompletion: false },
    { marker: "9", exact: ["x", "y"], isGlobalCompletion: false },
    { marker: "10", exact: completion.classElementKeywords, isGlobalCompletion: false, isNewIdentifierLocation: true },
);

//TODO:MORE
goTo.marker("11");
verify.completionListIsGlobal(true);
goTo.marker("12");
verify.completionListIsGlobal(false);
goTo.marker("13");
verify.completionListIsGlobal(false);
goTo.marker("14");
verify.completionListIsGlobal(false);
goTo.marker("15");
verify.completionListIsGlobal(true);
goTo.marker("16");
verify.completionListIsGlobal(false);
goTo.marker("17");
verify.completionListIsGlobal(false);
goTo.marker("18");
verify.completionListIsGlobal(true);
goTo.marker("19");
verify.completionListIsGlobal(false);
