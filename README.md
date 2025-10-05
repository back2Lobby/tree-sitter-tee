# Instructions for Nvim

- Paste following code into your init.lua to register the parser in treesitter

```lua

-- [[ Set up stuff for T Language ]]
vim.filetype.add({
 extension = {
  tee = "tee",
 },
})

local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.tee = {
 install_info = {
  -- url = "https://github.com/back2Lobby/tree-sitter-tee",
  url = "~/Learn/tree-sitter-tee/",
  branch = "main",
  files = { "src/parser.c" },
 },
 filetype = "tee",
 maintainers = { "@back2Lobby" },
}

vim.treesitter.language.register("tee", "tee")
```

- Copy paste the queries folder into nvim config (if you already have it then just copy paste the queries/tee folder)
- Reopen Nvim and run `TSInstall tee`
