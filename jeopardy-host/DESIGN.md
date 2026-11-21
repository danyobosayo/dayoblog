# Thanksgiving Potluck Jeopardy

The board is meant to be read across a room. Use the cream category headers
to anchor each column, copper values on dark tiles for available clues, and
an empty recessed tile for clues already played. Team names and scores sit
below the grid. Keep the existing zoom controls for projector adjustment.

Use a serif display face for the welcome screen and clues, and a system sans
with tabular numerals for the board and scores. The card press and short board
entrance borrow from [Bencho’s component catalog](https://bencho.dev/) and
[60fps’s motion library](https://60fps.design/). The emphasis on large type
and simple grids draws from [Regards’ section examples](https://www.regards.design/examples).
The game uses its own CSS and retains the existing controls and shortcuts.

Seat mixed ages together, let them confer, and have teams rotate who speaks.
For rulings, see [the answer sheet](ANSWER-SHEET.md). Parentheses mark a word
or unit the team can omit. The notes cover exceptions and alternate wording.

The round header uses the dot field from Bencho’s MIT-licensed
[Context Meter](https://github.com/cabralorenzo/bencho/tree/main/blocks/context-meter).
The game feeds it the played clue count and retains its plain-text counter.
The component styles and license ship with the page. The React demo’s
rendering is adapted to native DOM so the Hugo page needs no build step.

The team count uses [Magnetic Select](https://github.com/cabralorenzo/bencho/tree/main/blocks/magnet-select)
chips with native buttons. The board uses [Card Stack](https://github.com/cabralorenzo/bencho/tree/main/blocks/card-stack)
faces and the original lift behavior in a fixed grid. The clue and answer
use [Card Swap](https://github.com/cabralorenzo/bencho/tree/main/blocks/card-swap)
surfaces, with the answer entering as a second card after Reveal. The game
keeps the source styles and adapts interaction to click and keyboard input.
