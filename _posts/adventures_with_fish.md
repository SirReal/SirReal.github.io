# Adventures with Fish (shell)

<pre class="right ml2 mb2 p2 bg-white blue overflow-hidden">
                 ___
  ___======____=---=)
/T            \_--===)
L \ (@)   \~    \_-==)
 \      / )J~~    \-=)
  \\___/  )JJ~~    \)
   \_____/JJJ~~      \
   / \  , \J~~~~      \
  (-\)\=|  \~~~        L__
  (\\)  ( -\)_            ==__
   \V    \-\) ===_____  J\   \\
          \V)     \_) \   JJ J\)
                      /J JT\JJJJ)
                      (JJJ| \UUU)
                       (UU)
</pre>

I've been using [fish][fish], the **F**riendly **I**nteractive **SH**ell, as my primary shell for the past few weeks.
I'm in and out of terminals for all of my working day and much of my free time.

## Where I'm coming from
I know my way around the shell,
My terminal use is not particularly demanding, but there are certain things I do expect from my shell, like responsiveness, and command completion.
The experience has been very positive and I will continue using fish for the time being.
Bash - I use it and will continue. Locally, fish is nice. Simple config, functions, completion, etc. Good stuff, ubuquitous, yeah.
No way around this really.
Zsh - Meh. I tried it for several months. Prompts were pretty, but that's pretty low on my list of things a shell should do.
Didn't find any reason to use it over bash. Slow completions? Caused by Prezto? Maybe I should've tried "Oh-my-zsh".
Lots of people seem convinced that zsh is a really great shell, but I didn't see the big advantages.

I know there are other shells floating around, and thye probably offer some really interesting features.

## Completions
Completions work and are enabled out of the box.
That's is part of the [fish philosophy][fish-design], things should work well without config or digging around, and they've done a good job.
Completions start as "[autosuggestions](http://fishshell.com/docs/current/index.html#autosuggestions)", as you type you'll see a suggested completion after the cursor.
These suggestions come from history, completions, and valid paths, and are differentiated from your command by highlighting (highlighting is also built in and works out of the box).
If you see the command you want, just hit <kbd title="key-right">→</kbd> or <kbd>ctrl + F</kbd> to accept it.
If you want to search history for completions including what you've typed, you can do history search by pressing <kbd title="key-up">↑</kbd> and <kbd title="key-down">↓</kbd>.

Completions are fast. You'll notice right away as you type a command that


## Fish shortcomings
I really haven't found many. The thing I've missed most with fish is `!!` as in `sudo !!` or `svn !!`.
I miss that, but it's really not a big deal to type <kbd title="key-up">↑</kbd><kbd title="key-home">HOME</kbd> `sudo`.

Ok, as I've continued to use fish, I have found one.
The line editor uses emacs and a copy-paste system that seems designed to drive me nuts.
Or at least I haven't taken enough time to figure out what's going on.
I ususally copy/paste from the terminal using my mouse for selection (I try to limit mouse use, but this is one big use case for me).
When I'm on the command line, I delete words to the left with ctrl+w, which with emacs bindings puts the string into the system paste buffer and I lose when I've got there, which I often want to paste later, and end up removing and pasting the fish line a few times before I realize what's happening.
Fish does appear to have [vi bindings](#) in the works, but as far as I've seen, the feature is still half-baked.


1. Is familiar (or close enough to bash that there's no big learning curve).
1. Is fast.
1. Has excellent completion support.

[fish]: http://fishshell.com
[fish-design]: http://fishshell.com/docs/current/design.html
