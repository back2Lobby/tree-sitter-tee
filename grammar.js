/**
 * @file A low-level language
 * @author Back2Lobby <tayyabisking1101@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// Adjusted precedence to make room for exponentiation, and shifted higher groups up.
const PREC = {
  lowest: 1,
  compare: 2, // ==, !=, <, <=, >, >=
  sum: 3, // + or -
  product: 4, // * or /
  exponent: 5, // ^
  prefix: 6, // +x, -x, !x
  call: 7, // function call abc()
  primary: 8, // literal, identifiers and grouping ()
};

module.exports = grammar({
  name: "tee",

  extras: ($) => [$.comment, $._whitespace],

  rules: {
    source_file: ($) => optional($.program),

    comment: ($) => token(seq("#", /.*/)),

    _whitespace: () => /\s/,

    program: ($) => repeat1($.statement),

    statement: ($) => choice($.expression, $.discarded_expression),

    expression: ($) => field("expr", $.expr),

    discarded_expression: ($) => seq(field("expr", $.expr), ";"),

    expr: ($) =>
      choice(
        $.int_literal,
        $.ident,
        $.unit,
        $.prefix,
        $.infix,
        $.group,
        $.variable_decl,
        $.function,
        $.func_call,
      ),

    int_literal: () => /\d+/,

    ident: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    unit: () => "unit",

    prefix: ($) => prec(PREC.prefix, seq($.prefix_operator, $.expr)),

    prefix_operator: () => choice("+", "-", "!"),

    infix: ($) =>
      choice(
        prec.right(PREC.exponent, seq($.expr, "^", $.expr)),
        prec.left(PREC.product, seq($.expr, choice("*", "/"), $.expr)),
        prec.left(PREC.sum, seq($.expr, choice("+", "-"), $.expr)),
        prec.left(
          PREC.compare,
          seq($.expr, choice("==", "!=", "<", "<=", ">", ">="), $.expr),
        ),
      ),

    infix_operator: () =>
      choice("+", "-", "*", "/", "^", "==", "!=", "<", "<=", ">", ">="),

    variable_decl: ($) =>
      seq(
        field("name", $.ident),
        choice(
          "::",
          ":=",
          seq(":", field("type", $.type), ":"),
          seq(":", field("type", $.type), "="),
        ),
        field("value", $.expr),
      ),

    group: ($) => prec(PREC.primary, seq("(", $.expr, ")")),

    function: ($) =>
      seq(
        "fun",
        "(",
        commaSep($.function_parameter),
        ")",
        optional($.type),
        "{",
        repeat($.statement),
        "}",
      ),

    function_parameter: ($) =>
      seq(
        optional("~"),
        $.ident,
        optional($.ident),
        optional(seq(":", $.type)),
      ),

    func_call: ($) =>
      prec(
        PREC.call,
        seq($.ident, "(", commaSep(optional($.function_argument)), ")"),
      ),

    function_argument: ($) => choice(seq($.ident, ":", $.expr), $.expr),

    type: () => "Int",
  },
});

/**
 * @param {Rule} rule
 */
function commaSep(rule) {
  // Allows for empty lists (e.g., function parameters: fun ())
  return optional(commaSep1(rule));
}

/**
 * @param {Rule} rule
 */
function commaSep1(rule) {
  // Requires at least one element (e.g., function arguments: calc(foo))
  return seq(rule, repeat(seq(",", rule)));
}
