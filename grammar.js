module.exports = grammar({
  name: "glimmer",

  rules: {
    // Entire file
    template: ($) => repeat(choice($.mustache_statement)),

    // "Normal" HTML content
    html: () => prec.right(repeat1(/[^<]+|</)),

    // Entering/existing Handlebars expressions
    mustache_statement_start: () => "{{",
    mustache_statement_end: () => "}}",

    // Glimmer parses all of these as "path expressions"
    // - Variables (foo)
    // - Nested variable access (foo.bar_)
    // - Helpers (foo-bar)
    path_expression: () => /([a-zA-Z]|-|\.)+/,

    mustache_statement: ($) =>
      seq(
        $.mustache_statement_start,
        repeat($.path_expression),
        $.mustache_statement_end
      ),
  },
});
