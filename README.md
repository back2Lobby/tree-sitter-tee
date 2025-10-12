# Instructions for Neovim

- Paste following code into your `init.lua` to register the file type in Neovim

```lua

-- [[ Set up stuff for Tee Language ]]
vim.filetype.add({
 extension = {
  tee = "tee",
 },
})
```

- Add following in `init.lua` or `configs/autocmds.lua` if you are using LazyVim

```lua
vim.api.nvim_create_autocmd("User", {
 pattern = "TSUpdate",
 callback = function()
  require("nvim-treesitter.parsers").tee = {
   install_info = {
    -- keep the line uncommented if you want to use git url to install the parser
    url = "https://github.com/back2Lobby/tree-sitter-tee"
    -- uncomment the line below if you wanna clone the repo locally
    -- path = "~/Learn/tree-sitter-tee",
    branch = "main",
    files = { "src/parser.c" },
    queries = "queries/neovim",
   },
  }
 end,
})
```

- If you don't have a queries/tee folder in the root of your Neovim configs, make
  it. Now simply copy paste the contents of queries/neovim from this repo and
  paste them in your queries/tee inside neovim configs directory.
- Reopen Neovim and run `TSInstall tee`
