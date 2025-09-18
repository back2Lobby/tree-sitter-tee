/**
 * @file A low-level language
 * @author Back2Lobby <tayyabisking1101@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tee",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
