; literals
(int_literal) @number

; punctuation
";" @punctuation.delimiter
"," @punctuation.delimiter
"{" @punctuation.bracket
"}" @punctuation.bracket
"(" @punctuation.bracket
")" @punctuation.bracket

; keywords
"fun" @keyword
(unit) @keyword

; operators
"+" @operator
"-" @operator
"*" @operator
"/" @operator
"^" @operator
"==" @operator
"!=" @operator
"<" @operator
"<=" @operator
">" @operator
">=" @operator
"!" @operator

; misc.
(comment) @comment
(type) @type
(ident) @variable
