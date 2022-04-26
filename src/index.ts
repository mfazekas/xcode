import * as parser from "./parser/parser";
import { XcodeProject } from "./types";
import { ContextVisitor } from "./visitor/contextVisitor";
import { Writer } from "./writer";

/** @returns a JSON representation of the given `pbxproj` file in string format. */
export function parse(text: string): Partial<XcodeProject> {
  const cst = parser.parse(text);
  const visitor = new ContextVisitor();
  visitor.visit(cst);
  return visitor.context;
}

/** @returns a string representation of the given `pbxproj` in JSON format. */
export function write(project: Partial<XcodeProject>): string {
  return new Writer(project).getResults();
}

export * from "./types";