---
title: paradigms
date: 2024-08-19
tags:
---
## Chapter 1: Preliminaries (8/19)
The significant difference between *natural* language and *programmming* language is **ambiguity**. Natural language has developed over time, and was not constructed by a team of engineers. Programming languages on the other hand were purposefully created to have unamibguous grammar, whereas english has ambiguous grammar.

English is SVO typology. subject-verb-object
Starwars Yoda typology: object-subject-verb
##### What is the effect of one language being ambiguous, and the other being unambiguous?
- There is no set phonology of a programming language. This conversion from unambiguous grammar into ambiguous grammar, such as from code to english, leads to a possible misinterpretation of meaning (semantics).
	- Example: Siri still struggles today with pronunciation.
##### Language - Set of strings, sentences, and statements
- English is recursively enumerable. It is possible to list every combination of sentences, but this list would be infinitely long because there is no upper bound, however this does mean that they are "countable".
- Countable -> They map one to one (onto) each integer of the number system.
	- There are some languages that are infinitely long, but also not countable. 
- **Turing complete or recursively enumerable?** How can we realistically find the maximum length of a 'valid' sentence?
	- We could use grammar rules to define how sentences should be formed. Some of these rules include: syntax, semantics, and grammar.
		- Syntax allows us to create order when structuring sentences.
		- Semantics give sentences and words meaning and sense depending on context.
##### Culture
- every language has some sense of **culture** of people who are using those languages because they have experience and context. It takes time to adapt to these cultures, but they are not aways intuitive.
	- So although things may be allowed, it may not be encouraged.
##### Why are there so many languages? 
- We create new languages based on a need or desire: to solve a specific problem.
- If we put all the functionality of every language into a single language, it would be so bloated that it could not be efficient.
##### Infinity, Ordinal Number Theory 
- There are variations of infinity. Infinity is a concept, not a number.
	- Aleph null is an example of this, the cardinality of all natural numbers. It's considered to be the smallest of the infinite symbols.
##### Linguistics 
- LOGLAN was created to have unambiguous grammar, but still have meaning.
- Sapir-Whorf Hypothesis: Language can shape how we perceive and interpret the world.
##### P vs NP 
- Polynomial Time vs Super Polynomial (nonpolynomial) Time
- The time it takes to interpret a particular language or sentence takes longer than O(n^k)
___
### Preliminaries Cont. (8/21)
##### First Programming Language
- Ada Lovelace Bernouli sequence rational thingy
- The program was tabular, it didn't go line by line from top to bottom, but could specify where to go after a line was ran.
##### First High-level Programming Language
- Plankalkul designed by Konrad Zuze in Germany between 1942 and 1945
- Its original implementation was tabular, but in 1990, the first linear notation was developed.
- Although it was developed in the 1940s, this code already had 
	- floating point arithmetic
	- arrays
	- and more

##### Files
- It's an abstract concept of a container.
- The way a file is stored on a disc is continuous and not a single entity.
	- On computers, files are stored in blocks as a sector. We consider code in a single sector as a page. 
	- A single block or page size is 4096 bytes or 2^12 bytes. In hexadecimal, this is 'h1000
- How does a disk work?  
	- A page, or sector, or block in memory is always 4096 bytes. 
	- When we create a text file, it will immediately use 1 page worth of memory. Once the content takes up more than the limit, it will retrieve another page worth of memory to store this file.
- parse - The term we use to see if a compiler can make sense of the source code.
- The file type is important for a compiler. 
- The extension of a file can be used solely for the use of naming, and not changing the content at all.
- For example, a .java file and a .py file are both plain text files. You can compile with either compiler and get the same output so long as its the same source code, and each compiler can make sense of the content.
- However, sometimes a file type could be INCOMPATIBLE with compilers such as .docx or .rtf
	- This is because the content is not just plain ascii, but would instead contain formatting that would be extra information that the compiler doesn't know how to make sense of it.
##### Source Code Files
- These files are purposed for a specific language, and this is identified by the extension.
	- Ex: .py, .java, .pl, 
- Integrated Development Environment:
	- An IDE helps us program more efficiently by giving us color highlighting of certain key words, strings, variables, and data types.
	- An IDE can come in the simple form like notepad++, or get more complicated such as with vsCode

##### Esoteric Languages
- Also known as joke languages.
- Many were created for research purposes and to test certain hypothesis, but none of them were created for the purpose of serious use.
- Whitespace
	- This language understands and compiles whitespace characters such as tab, new lines, and spaces.
	- The consequence of the creation of this program was the realization that a single program, a single source code can be interpreted in two vastly different ways by compilers.
	- Thus it became very possible to hide information, which is the concept known as steganography.
- "Branflake"
	- This language was created for the purpose of being the smallest turing complete language.
	- It has no variables, only 8 characters that are individual scripts.

___
### Chapter 3: Syntax and Semantics (8/26)
##### Vocabulary:
- Syntax - The structure of expressions
- Semantics - The meaning of the expressions and program units
- Sentence - string of characters of some alphabet
- Language - set of sentences
	- Can be recursively enumerable. 
- Lexeme - (Coloquoially we use 'word'). Refers to the lowest level of syntactic unit such as a word, a variable, punctuation.
- Tokens - Category of its lexemes.
	- Some token can have multiple lexemes, and in other cases it's one to one
		- Ex: int_literal, identifier are tokens that can refer to multiple lexemes.
		- Ex: mult_op, equal_sign are tokens that only refer to a single lexeme.
![[Pasted image 20240826104425.png]]
##### Language Recognizers
- **Generator** - Device that we can use to generate sentences of a language.
	- It is effectvive because we can compare a sentence syntacically to the generated structure.
- **Recognizer** - Device that checks every alphabetic character of a sentence and verifies if it exists in the alphabet or not.

##### How can we describe syntax effectively?
- We can use grammars, which are used to describe the syntax of programming language.

##### Context-Free Grammars
- A class of grammar used to describe the syntax of __programming__ languages
- The reason why it's called context-free because it doesn't matter what the context is.
$$G=(S, N, T, P)  $$
- G - Grammar
- S - Start Symbol
- N - Set of Non-Terminal symbols (tokens)
- T - Set of Terminal Symbols (lexemes)
- P - Set of production rules
##### Backus-Naur Form
- A subset of Context-Free grammar rules.
	- Optimized for describing programming languages. Syntax description
	- Remember, we want programmign languages to be as unamibguous as possible.
##### Ambiguous language is defined by distinct parse trees.
- If a grammar is unambiguous, the derived parse trees should be isomorphic. They have the same nodes and edges, but they may be visually different.
- Ambiguous language is not inherently bad, so long as we can prove that we can end up at the same result. 
	- Ex: 2 + 2 + 4 = **4** + 4 = 8 OR 2 + 2 + 4 = 2 + **6** = 8
##### Derivation
- Sequence of repeated application of grammar rules. 
	- Reverse derivation: Start with the symbols, and replace them with non-terminal symbols going right to left.
	- You can do the right-most derivation or left-most derivation.
		- So long as the graphs are both isomorphic (same leaves and edges), they are unambiguous.
- A left-most derivation is like going down a binary tree in preorder.
	- We expand the left most until we can't, and then we go back up and then down right, until we reach the root node. Once we are back to the top, that is when we begin expanding the right side. 
- The deeper a procedure is in a parse tree, the closer it is to the leaves, gives it higher precedence. That value must first be evaluated before it can be used in another context.
##### Functional Languages
- We place names on immutable objects instead of some variable shit bro i don't know. Search up the difference ebtween imperative (procedural) languages and functional languages.

A DFS will traverse an infinite depth for a recursively enumerable language. So we must use one variation of BFS whether it be post or inorder traversal.

### Functional language vs non-functional languages 
Racket is an eager functional language, which requires to know the content of all functions, even if they're never called. 
There is a trade off between efficiency and security. and memory and speed. More ram, less disk space?
There are many optimizations and trade offs that programmers can make, it all depends on what the goal is. 
- Ex: NASA doesn't care about maxing speed, sending a probe is gonna take long regardless. They want to ensure accuracy of data.
- Ex: Facebook wants people to have timely and quick responses, even if the information may not be 100% perfect.

One of the biggest things for this course is identifying what the "care abouts" or goals are for a project. And to find an appropriate language for that particular task. And this is what the word paradigm represents: What is the context (paradigm) in which we are trying to solve a particular task.


### Associativity of Operators

![[Pasted image 20240828104010.png]]
This distinction is important. The reason the latter is unambiguous is because we 

Head recursion - Gives us a complexity problem. When we have right side recursion and right side expansion, then we are doing the recursion before we even build the tree. This is O($n^2$)

Tail recursion - "I have a concrete draft of what my tree is gonna look like, and I will do the recursion as my final task". This is a linear runtime.

### Parsing Terms
Recursion Type:
- **Left** vs **Right** recursion will change the **SHAPE** of the tree
Derivation Type:
- **Leftmost** vs **Rightmost** derivation regards the **ORDER** of a tree's expansion
Parse Direction 
- **Left-to-Right** vs **Right-to-Left** 
- Most of us read left to right
### Type of grammars 
LL grammars and LR grammars
- They have to do with the recursion and parse direction. 
- The derivation type will always be the opposite of the recursion type because we want tail recursion.
- Ex: LL indicates Left Recursion parsing left-to-right
	- Whereas LR indicates Left Recursion parsing right-to-left

### Extended BNF
We talked about building parse trees using grammars, but they also involve a lot of recursion.
EBNF was created as another way representing using loops.
The expressive power of EBNF does not exceed BNF.
- It's just adding some extra ways of expressing the same thing that  makes it easier for humans.
What are the differences between extended BNF and just BNF?
- EBNF provides are more concise syntax that is easier to understand.
EBNF is used in most compiler compilers, like YACC and BISON
	YACC - Yet Another Compiler Compiler
The Three primray differences / additions
- Optional parts are placed in brackets
- Repetition can be placed inside curly braces.
- We can place alternative parts of RHS inside parenthesis and separated via vertical bars, like an OR sign.
Conversion Reminders for exam
==Removing explicit recursion means you can't have any left hand term on the RHS==
___
# (9/4)
### Semantics
- How computers "think" about a particular programming language.
- Two different high level categories
- **Static Semantics** (Attribute Grammars and Context-sensitive Grammars)
	- The feature of attribute grammar provides context.
		- Ex: ``` String x = "hello";```
		-      ``` int y = x; ```
	- Sort of like meta-data, it has more information for interpretation.
	- Starts as an EBNF or BNF
	- Attribute grammar is a context-free grammar
		- But for each grammar symbol *x*, there is a set A(*x*) of attribute values
		- For each rule, there is a set of functions and predicates.
			- certain attribute values that can attached to the entire rule, either functions or predicates.
	- Semantic happens at compilation, before we run.
### Dynamic Semantics
- Operation Semantics - We are going to describe the assembly of what the code is doing. 
- We use operational semantics to describe how a single block of code or algorithm works. To prove the correctness.
	- Platform specific description
		- Example: Converting a high level language to machine code or assembly.
		- Blocks of code with different syntax can be proven to have the same operational semantics if the *Meaning* is the same.
	- Denotational Semantics
		- Mathematical representation.
		- Syntactic - Verify that the math is legal? bro i dont know ==...==
		- Semantic - You verify that the syntax is a well-formed representation.
	- Axiomatic Semantics
		- Logical proofs.
		- Logic programming
		- Precondition and Postconditions. We desire to use the weakest precondition (the least restrictive) that satisfies the postcondition.
			- Ex: a = b + 1
			- Postcondition - {a > 1}
			- Weakest precondition - {b > 0}
			- Possible precondition - {b > 17}
		- Another example where we have multiple statements.
			- Ex: y = 3x + 1
			-      x = y + 3
			- Postcondition: {x < 10}
			- To solve this, we must start from the bottom, our precondition for the bottom is: {y < 7}
			- This precondition for the last line, becomes the post condition for the above statement.
			- And thus we get a final precondition of: {x < 2}
___
# Functional Programming (9/11 - 9/16)
Random tidbits
- Scheme started as a fork of LISP, made by two separate groups. The MIT people that forked it were forced to rename their program to Scheme. Racket (or raquet idk), is also a jab at the origin of the name of Scheme. 98% of the source code of racquet is similar to scheme.

### The Paradigms of Functional Programming
- All functional languages are based on Lambda Calculus: $(\lambda)$ 
	- Functions are first order:
		- they can be arguments
		- they can work as return values
		- functions can build other functions
			- i can pass a function to itself, and change the result: it can change itself.
	- Anonymous functions - (# fill this in)
	- Immutability - No such thing as a varaible in functional programming. When we set a value, we cannot change it. Similar to using Const in C programming.
		- Don't think about variables as creating a box and setting a value to it. Think of it more like we have an object with a value, and we are now going to NAME it. Like a POST-IT note instead of a shoebox. We can also stick multiple post-it notes to a value, and we can reference it via both ways.
		- Python has a similar idea, though not purely functional, it has a lot of functional features.
		- Purely functional ___ cannot have functional side effects.\
	- Currying: every function will process the arguments as if they were separate functions with separate returns. 
- No side effects: Functions will always return the same output for the same input. There is nothing within the state machine that can change, or global variable that is used that can be changed.
- LISP, Scheme, Racket, etc. uses explicit parenthesis, and then the descendants of ML: Haskell, Scala, etc. instead have an implied left associative.
- Loops require recursion because you can't have an iterator.

### Lambda Calculus
- Lambda Function:
	- Lisp has list-based expressions
	- All expressions are lists, and all arguments must be functions.
- Any "built-in function" is really just already defined and NAMED functions within the standard library from `#lang racket`. They're defined anonymously. When we include this library, all of those function definitions get passed in.
- Examples: 
```
(define mysqr (λ (x) (* x x)))
	(mysqr 4.5) 
	20.20

(define divtwo (λ (x) (/ x 2)))
	(divtwo 100)
	50

	((λ (x)(* x 3))50)
	150
	

```
### Key Words
- lambda $\lambda$ 
- first, second, third
- car, cdr
- quote (\`)
- quotient and remainder
- length
	- Can do this with direct and indirect recursion
- reverse
	- Can do this with direct and indirect recursion
- append
	- Unlike cons, will return a single list with all elements combined in order.
- list
- 


Syntax:
	- Every lambda function has three characteristics
	- The Lambda symbol
	- Arguments
	- Body
- In racket, we always assume the first argument is a function.
- Square brackets are equivalent to parentheses.
	- We use it to differentiate and make our code more readable.
- List is a keyword that returns a list of the inputs
- what is the eq? key term in racket used for.

### S-Expression
You use the . for 
The dot operator is shorthand for an operator called "Cons" which is short for construction.
We can cons something and add it to a list
To create a dotted pair we can use the cons function
- example: `(cons 2 '(4 6 8)) -> '(2 4 6 8)`
Or we c an use the period:
- example: `'(1 . (2 . (3 . ())))`
**car and cdr**
- cdr stands for the Contents of the Decrement register.
- car stands for Contents of the Address part of the Register.
- Head and tail are equivalent terms for the above, but they must be **explicitly defined.**
- car, head, and first are interchangeable.
- cdr, tail, and rest are interchangeable
- **Haskel** variation
	- They use colons and commas for the dot operator, and key words head/tail for car/cdr
	- Define in Racket is just an equal sign in Haskell.
		- Example `car = head`
- We can call cdr and then car to get the value of an index **deeper** in the list. We have keywords already created such as second, third, fourth, fifth, etc.
	- cadr (second) caddr (third)
- How does this all work?
	- If you look at an s-expression, you'll see that from top down, everything is paired with connections and a dot operator. Whenever we use car or cdr, we are returning either the left or right side of the dot operator, where the left would be a leaf node, and the right would be the subtree of the other elements.
**If statements**
- if function expects 3 curried elements, one that is supposed to be a Boolean, then two other bodies. If True, then the entire List becomes the left argument, else the right argument
	- Example: `(if #t '(1 2) '(3 4))` -> this evaluates to '(1 2) bc it's true. else '(3 4)
- Boolean literals are `#t` and `#f` indiciating True and False
##### Operations will return a value
(+ 4 3)
(/ 15 3)
- Racket does allow for rational numbers. so if we were to run (/ 1 3), it would return $1/3$.
- ==If asked to evaluate this / operator, it should be a fraction, not a decimal number==
- Furthermore, if we instead have (/ 2.0 6.0), it would return 0.33333333
- We can use either remainder or modulo to find that remainder.
##### Evaluations will return a boolean \#t or \#f
(= 3 3)
- Note that this = sign expects only numbers as data types. can't compare lists or strings.
(eq? 4 4)
- Should be used when comparing scalar values such as numbers, ints, floats, strings, etc. But it has to be a single value, not a list

(equal? '(1 2 3) '(1 2 3))
- Can compare any two values. Literally anything
### Functions for checking data types
You can define and put names on things, but these are just aliases. There is no expectation for this value to change, as a variable would.
The question mark at the end indicates that the function is for humans to understand, and it'll always return a boolean.

length
number?
complex?
zero?
string?
integer?
null?
eq? (equal?)

Note that we have many aliases for an empty list:
- empty
- null
- '()

examples: 
- `(number? 4)` -> `#t`
- `(zero? 0)` -> `#t`
- `(zero? 4)` -> `#t`
- `(string? hello)` -> `hello: undefined`
- `(string? 'hello')` -> `#t`
- `(define hello 6`)
	- `(symbol? hello)` -> `#f`
	- `(integer? hello)` -> `#t`
- `(real? 3.4)` -> `#t`
- `(real? 5)` -> `#t`
Note that numbers that have a decimal can still be an integer if it trails with .0
Every number can be considered complex, because 3 = 3+ 0i, for all integers.

**all lists are pairs, but not all pairs are lists.**
a pair could be a pair if it's strictly just two elements with no list inside. Once we add a third value, or there exists a list inside the pair, then it is no longer just a pair but also a list.

nested lists and quotes
Be careful to not double quote, because a cdr or car of a double list will either be a quote tick or the list of a list.

Sometimes you need to peel off the outer layer, so that the inside is not evaluated too early.

### Debugging
Hover over a fucntion and you can find its definition or origin, whether from previous code or an import from Racket. 

### Recursion
We can create our own length function using recursion and the tail.
This function works because the length of CDR is the length of list -1. What's going on under the hood is we are removing one element at a time and adding 1 to length until it's null.
![[Pasted image 20240918105601.png]]
**Direction recursion** -> You can either build the expression by climbing in 1+ 1 + 1 + 1 + 0. Or you can climb out 0 +1 is 1 +1 is 2 + 1 is 3. Climbing in is when you dive until the base case, and add as we climb out.

**Indirect recursion** ->When we use a helper, we pass it a list and an accumulator. We pass in the list and the counter. In this instance, when we hit the base case we return the accumulator value. There's a trade off of memory and speed. Because we are constantly defining the accumulator value in order to increment it, the stack calls will bulid up, but if we have parallel processing, we can start the next operation and allow the stack to pop in the background.

This accumulator function is brittle. We have to initialize this counter at an arbitrary value that the user can input, because it needs to be called every single time. 
To combat this, we can use a **wrapper function**, which initializes the previous function with the same input list, but with a hard coded 0 initialized.
- Note that, a programmer could still run the accumulator function and still potentially get a bad answer.
- To combat this issue, we use scope. We can hide the accumulator function in another function. Just like Java, functional programming has function locallity. when the body of the functions returns back to the caller, everything we defined no longer exists.
Advantages: 
	we can fix weaknesses such as exposure of helper and accumulator
	Faster in some cases
	easier to understand
### SYNTAX OF FUNCTIONAL PROGRAMMING
The entire syntax is based off of just these three rules:
- Everything in a lambda expression
	- Each expression is either a name, function, or application.
- A compiler for a functional language can be created in one hour by a single person, whereas a language like java took a team over a year.

### Errors
Contract violation is a data type error.

___
# Chapter 4 - Lexical and Syntax Analysis (9/30-current)
### Project Details
\> 6
6. similarly to range, start with an integer and loop that many times. direct recursion, decrement the count value. once im at the end of the list and the value is 0, then we return True, else we return false.
7. This question has many lines. Requires helper functions. Mod 10 algorithm

### Analyzer
How do we do this with prgramming languages. How do we determine all of the words are corect for the language/
Lexical and syntactical analyzer

THe syntax analysis portion consists of two parts:
- The low-level part: the lexical analyzer. Tries to determine if any of the characters represent a proper lexeme.
- The high-level part: the syntactic analyzer or parser.
- example: soijw sofijew fwoiejf 
	- Thsi has no valid lexemes, thus the parser would reject this.

### Lexical and Syntax Analysis 
Why do we use bnf to describe syntax?
- because it's easy for humans to understand bnf. The rules are easy to understand.
- They are easy to maintain: making changes can be done by just adding a new rule, and it wouldn't affect the other rules.
The reason we split parsing into the lexical and syntactic parts is because it simplifies the complexity of the parser. We can make a parser that's one level deep, but it's not good to use. Essentially, doing these two separate processes makes it more efficient and simple. 
Also portability. Parts of the lexical analyzer may not be portable, but the parser always is portable.

### [[Lexical Analysis]]
- We need a state machine that is reading each character one by one, and moving states. 
- So basically this lexical analyzer is a finite state machine that looks at individual characters are identifies what this word can mean. If it first sees a character, it's expecting this entire string to be either a variable or a function name and will keep looping alphachars until it stops seeing that. 
- Once it finishes matching a character pattern, it'll then be associated together as a token. And this token can represent many things DEPENDING on it's starting character. if it starts with a number, then the token could represent a float or an integer. If it's an alpha char, then it could represent a variable or a function.
- The lexical analyzer is generally implemented as a **function** that is called by the parser when it needs the next token.
Three approaches to building a lexical analyzer
- Initialize a formal description of the tokens and a software tool taht constructs a table-driven lexican analyzer from such a description.
- Design a State machine that describes the tokens and writes a program that implements the state diagram.
- Hybrid: Design a state diagram that describes the tokens, and then manually construct a table-driven implementation of the state diagram.
Simplification the state process
- If we had to map to every single variation of alphachar, our state machine would be ginormous, so instead we can point to a character class that groups all of them together. 
Lookup
- For identifiers such as variables and functions, the lexeme parser will verify that only after it has iterated through all of the characters in a word.
### Parsing problems
- What is the goal of the parser?
	- Find all **syntax errors**
	- Generate the parse tree for the source code being analyzed.
- What do we do when we run into an error?
	- For each error, we need to create an appropriate message that conveys the issue. 
- If no error is found, then the program will go ahead and create the parse tree, which can be converted into assembly.

Two Categories of Parsers
- **Top down**- Makes a tree starting at the root
	- We need **right recursion** and the expansion requires **leftmost derivation**
- **Bottom up** - Makes a tree starting at the leaves
	- We build up from the bottom, so we use **left recursion**. So we don't recurse until the end. This is tail recursion
	- Order of node rduction uses **rightmost derivation.**
- Depending on the grammar that we want to use, this will dictate the type of parser that we want to use. The architecture/shape of the tree. Neither is better or worse, just depends on whta tools you have at your disposal. 

Most common top-down parsing algorithms ==*These are LL Parsers*==
- Recursive descent -> expands recursively downward into all children
- Table driven implementation -> Used in Assembly because we can't make functions, we can only use predefined machine tools. Uses a parsing table where you find the meaning of lexemes.

##### Recursive-Descent Parsing Continued
top down parser
In the source code, we'll have a function for every single grammar rule. If they expect some element or another, we'll have if and else if statements, followed by an else that will throw an error. 
As we go through each element, we check for tokens,we check for lexemes, and we'll check for expression.

### The LL Grammar Class
Remember, LL means it's left Recursion with left to right parsing
E rule replacement

Detecting (not correcting) Indirect Left Recursion
Pairwise Disjointness
- For every RHS rule, we call the FIRST method to create a set of elements.  We compare these sets to see if there are any intersections.
- "Is the A rule safe using the Pairwise disjointness test"
- Example:
	- A = ab |bc |cd
	- first(ab) = {a}
	- first(bc) = {b}
	- first(cd) = {c}
- Now we have to check for disjointness by intersecting every combination of pairs
	- {a} $\cap$ {b} = {}
	- {a} $\cap$ {c} = {}
	- {b} $\cap$ {c} = {}
- Because we have no intersection, we have disjointness]

### Bottom Up Parsing
- One of the most common ways is using shift-reduce. 
	- We have right most derivation with left recursion. So how can we injest code into our parser right to left, if we are reading it left to right.
	- We use a stack.
	- We read the elements from left to right, but we are reducing chunks from right to left. 
### Shift-reduce Parsing
- This one is somewhat complicated but not really.
- We push into the stack the first element from left to right. As we add symbols, our state will be in different machines, and depending on the state and the next symbol we push, we will have a different action. Keep going through one by one until the end is reached.

# Chapter 16 - Logic Programming (prolog)
### Definitions
Axioms -> a set of rules that are either true or false
Source code -> Knowledge Base
Resolution -> logical inferencing process. The program will intuit what an arbitrarily defined value may be.
hypothesis base -> the possible evaluations that could evaluate to true
### Prolog Syntax
logical and -> `,`
logical or -> `OR`
end every statement with a `.`
write()
### Introduction
- Programs in Logic Programming are expressed in the form of Symbolic Logic
	- This symbolic language is easier to process for humans to intuit because it's based upon human logic instead of machine logic.
- Use a logical inferencing process to produce results
- **declarative** rather than **procedural**
	- only specification of **results** are stated (not detailed procedures for producing them)
		- You define what the results look like, and the run time will figure out how to produce those results. This is **resolution**.
	- You cannot return values, only evaluate to True or False

Random note -> predicate (proposition) vs function vs method. Different *procedures* 
### Statements
- A logical statement is a predicate/proposition that comprises of these elements
	- objects, relationships, and evaluation value
	- Example: student, mexico, has visisted, false
- Both the **input** and the **output** are in the predicate call
	- ex: `add_one(4,5)` evaluates to `true`
	- Essentially we are testing if our conclusion is valid. Checking if our answer is correct
	- When there is insufficent information, we use **Resolution**. The program will assign a value to Var that would make our conclusion true
		- ex: `add_one(4,Var)` evalutes to `Var = 5` 
	- Our program can actually find multiple evaluations that would make evaluate to true.
	- Thus our goal is to write rules that are specific enough to narrow down the possible solutions.
### Symbolic Logic
- The code can only evaluate propositions based off of the **knowledge base**. Don't get caught up in trying to make sense of things in relation to the real world. We are only working off of rules that are defined by the programmer.
- What is computable, and what is complex?
	- A complex problem **is** computable, but it'll take a long time.
### Object Representation
- Variables in logical programming differs from procedual programming. Instead of the programmer declaring and instantiating the value, the program will instead find all possible values that may evaluate to true at a given time. 
- Now this could lead to a tremendously large computational problem. Our 

### Types of terms
- Atomic
- Compound
	- Functor/predicate
		- The symbol that names the relationship
		- No return type or value
	- Parameters
		- An ordered list of parameters (tuple)
		- Not arguments

### Unification (equality)
- ex: `6 = 6` 
	- Note that this equal sign is not assignment.
- ex: `x = 6` 
	- this is not assigning 6 to x. instead it's computing the value that makes this equality true (unified) is x containing the value 6
- ex: `Var = 2 + 3` 
	- In this special case, unification will compute Var as `2 + 3`, and not as `5` and this is because this Var could be any infinite combination of operations that evaluate to 5, thus we assign it the exact value.
- ex: `Var is 2 + 3` 
	- The `is` key word will evaluate the operation. 
### Lists
- Square brackets and comma separated
- ex: `[1,2,3,4] = SomeList
	- SomeList will have the entire List as its value
- ex: `[1,2,3,4] = [1,2,X,4]
	- X will be assigned the value of 3
- ex: `[1,2,3,4] = [X | Y]
	- So this part is a little confusing. X will take the first element, and Y will take the rest so
	- `X = 1`
	- `Y = [2,3,4]`
- ex: `[1][2,3,4] = X`
	- X will be assigned a complete list of `[1,2,3,4]`. Having two lists side by side is the equivalent to cons in Racket
- ex: `[1,2,3,4] = [X, Y, Z]`
	- This will evaluate to False. There is no combination of these three variables that can create a list of 4 elements.
- Generally right now I'm most confused about `|` vs `,` 
- `_` is a placeholder key variable. The program will know that we do not care to use this value. Don't Care variable.
___
```
Head(SomeList, Head) :-
	SomeList = [H | _],
	Head = H.
	
Head([H|_], H).
```
- This code block shows the predicate of finding the Head of some list and its one line version (which is more typical of prolog).
___
```
cons(H,InList,OutList) :-
	OutList = [H|T],
	Elem = H,
	InList = T.
	
cons(H,T,[H|T]).
```
- In this code block, we built a predicate that will append an element to the front of the list
- Ex: `cons(7, [8, 9, 10], Out)`
___
```
leng([],0). % this is a base case for when we have an empty list.
leng(SomeList, Len) :-
	SomeList = [_|T],
	leng(T, Tlen),
	Len is Tlen + 1.
```

```

leng(SomeList, Len) :-
	SomeList = [_|T],
	Len = leng(T, Tlen) + 1.
```
- Recursive call to find length. We need a base case, if we don't the unification statement will evaluate to False.
	- Note that the base case here is an overloaded definition of the same predicate. 
	- Generally it's advised to check for base cases within the same definition such as in the example below.
```
leng(SomeList,Len) :-
	SomeList = [] ->
		Len is 0 ;
		SomeList = [_|T],
		leng(T, TLen),
		Len is TLen + `.
```
___
``` 
is_sorted(SomeList) :-
	SomeList = [] ->
		true;
		SomeList = [_] ->
			true;
			SomeList = [H1,H2|T],
			H1 =< H2,
			is_sorted([H2]T]).
```
- Though it's possible to use overloaded predicates for the base cases in tandem with `!.` (cuts), but it's ill advised.
___
```
rev([],[]).
rev(InputList, OutputList) :-
	InputList = [H\T],
	rev(T,TRev),
	append(TRev, [H]).
```
`H` is a single element, and `[H]` is a singleton list.
This implementation is similar to racket, but the difference is:
In racket you expect to see `append rev(T) head(lst)`
but in Prolog, we can't recursively obtain the Rev(T) through the predicate, instead we need to call `rev(T, TRev)` independently and use the output of that call.

```
	rev2(InputList, OutputList) :-
		InputList = [] ->
			OutputList = [] ;
			InputList = [H|T],
			rev2(T,TRev),
			append(TRev,[H], OutputList)
```
This is the version of rev that doesn't use the overloaded base case.
Also another reminder, we can pass the assignment of our InputList directly into our function, i.e. `rev2([H|T], OutputList) :-`

**Accumulator version of rev**
```
revAcc([], OutputList, Acc) :-  % this is the overloaded base case
	OutputList = Acc.
revAcc(InputList, OutputList, Acc) :-
	InputList = [H|T],
	revAcc(T, OutputList, [H|Acc]).

% input query
revAcc([2,4,6,8], R, []).

```
But how can I ensure that the third argument is always empty? We can wrap this in a helper and call the helper with the empty list argument.
```
revAcc(Input,Output) :-
	revAccHelper(Input, Output, []).
revAccHelper([], OutputList, Acc) :-  % this is the overloaded base case
	OutputList = Acc.
revAccHelper(InputList, OutputList, Acc) :-
	InputList = [H|T],
	revAccHelper(T, OutputList, [H|Acc]).

% input query
revAcc([2,4,6,8], R).
```
___
``` 
add1(X,Y) :-
	Y is X + 1.
```
This is just to reiterate that we these predicates themselves will return a true or false, but the output variable will hold the value that makes it true.
___
```
last(SomeList, L) :-
	rev(SomeList, RevList),
	head(RevList,L)

LastB([L],L) :-
	!.
LastB([H|T], L):-
	LastB(T, L).
```
Here we have two different implementations of finding the last element in a list.
The top version is inefficent, we call reverse and grab the head of the list.
In the bottom version, we have a base case of when the List is just a single element, and we return that element immediately.
___
```
penultimate([L,_], L) :-
	!.
penultimate([_|T],L) :-
	penultimate(T, L).
```
This is the similar to Last but instead of the ultimate eliminate (last), it's the penultimate (second-last)

___
Project question for prolog
Index
We can keep calling recursively by decrementing the counter, and grabbing the 0th index (head) of that recursive calls list.
```
% example input
index(input,output, 0) :-
	!.
index(input, output, index) :-
	
```
### Logical Operators
- We use the `->` symbol with a `;` to separate the then/else
	- ex: `true -> write("Yes"); write("No").
	- `Yes true`
	- OR: `;`
	- AND: `,`
	- CUT: `!.`
- For logic we have symbols such as `-> ; , !`
	- ==I don't completely understand these symbols, read the documentation for this==
### Constants vs Variables
- Camelcase is a variable
- all lowercase is a constant

# Chapter 5 - Names, Bindings, & Scope

### Scalar Variables
- Single values that get dynamically converted.
- the **meta** character will specify the data type that is being stored.
	- `@` signifies a list
	- To print the entire list, we have to use `print(@y);`
	- When we try to print this list using a `$` meta char, it'll only expect one value. In this instance we need to specify a specific index for the output to correctly generate.

### Static Scope
- A runtime will look first locally, and then increasingly larger scopes. If it can't find a variable locally, it will look within its next enclosing scope.
- You can change where the runtime **looks** for a variable value in languages such as Perl, Ada, and Python. Unit is the name of the function to look inside, and name is the variable name. Essentially, we have an X value in main, that is eclipsed by the nested function. However, we can look behind the eclipse through this function.
	- Ex: `unit.name` or `$unit::name` -> `$main::x` 

### Let (in racket)
- The only purpose of LET is to declare local variables within a new scope to use without modifying the original values. 
### Declaration Order
- The major difference between C++/Java/C# and C.
	- In C++, you can declare a variable within the scope of a *for* statement. Whereas in C, we must declare the variable **before** the for loop begins.
- It's pretty incredible how every control flow statement is based off of either an IF or a WHILE. But we can combine these in combinations to create any other control flow statement such as DO WHILE, FOR EACH, etc.
### Global Scope
- Some languages allow you to alter the value of a global variable within a nested scope
```
globvar = 0 
def set_globvar_to_one(): 
	global globvar # Needed to modify global copy of 
	globvar globvar = 1 
def print_globvar(): 
	print globvar   # No need for global declaration 
					# to read value of globvar 
print_globvar() # Prints 0 
set_globvar_to_one() 
print_globvar() # Prints 1
```
### Dynamic Scoping
![[Pasted image 20241111105647.png]]

# Chapter 7 - Expressions and Assignment Statements
### Arithmetic Expressions
- **Arity**
	- The number of operands that can be had by an operator. 
	- **unary operator**: takes one operand
		- **-** negation
		- **++** increment
		- * pointer
		- **&** dereference
	- **binary operator:** has two opernads
		- +, -, /, %, $**$, $*$
	- **ternary operator**: has three operands
		- **? : Conditional** if then else
	- 
- **Precedence**
	- What do we prioritize in operations? Most languages use "PEMDAS", but some languages like ALO and has no operation precedence.
- **Associativity**
	- This is the order in which adjacent operators with the same precedence level are evaluated, e.g. 3+5-2 or 4*2/4
	- Typically we go left to right, except ** which is right to left
- **Evaluation Order**
	- Describes how we access and process operands within an operation. 
		- **Variables** are retrieved to be used
		- **Constants** are also retrieved to be used but comes from either memory or from the machine language instruction such ax MAX_INT
		- **Parenthesized Expressoins**: Evaluates the content of the paren first
		- **Functional Call**: Evaluates the function first, but a possible side effect is the modification of the a value that will be used within the operation that it's a part of.
- **Conditional Operators (ternary)**
	- An alternative way of expressing the if then else control structure
		- Ex: `average = ((count == 0)? 0 : (sum / count))` 
		- The equivalent
		  ![[Pasted image 20241113133612.png]]
- **Potentials for side effects**
	- **Functional side effects**: when a function **changes** a two-way parameter or a non-local variable.
		- What's the problem with functional side effects?
			- The program may behavior unexpectedly.
			-  ![[Pasted image 20241113133833.png]]
	- **Referential Transparency**: If after I execute a function, does it change some of the parameters that i **passed** into it. To check for this, we can declare a temporary variable that is assigned to a function's evaluation, and compare the result of operations using the two original variable, and the temporary one.
		- Benefits: Semantics of a program is much easier to understand
		- Pure functional languages such as Perl are by nature referentially transparent. 
			- These functions cannot have a state
			- Any values that a function obtains from outside its block must be constant.
- **Operator Overloading**
	- Allows us to use an operator with additional purpose. 
	- This occurs much more often than we assume. 
		- Ex: "Hello " + "World" is concatenate instead of arithmetic addition.
		- Ex: 4.3 + 2.5: adding floats is a much different operation/process than adding two integers.


How do we handle type mixing?
- Usually we would have a protocol for determining data type precedence. 
- Ex: 4.5 + 3 evaluates to 7.5 in python, but in C++ if we declare as int, then we keep the type consistent unless we cast.
# Chapter 8 - Statement-Level Control Structures
### Two-Way Selection Statements
- The general form is `if then else`
- The absense of the `then` keyword is generally replaced by parenthesis.
### Loops
- Can be accomplished by either iteration (with counters), or recursion
- Counter-Controlled Loops
	- Initial loop value is generally of type **integer**.
	- Has some state that it identifies as a **terminal state**. Once the counter contorl reaches some state, then the loop will terminate.
	- Step size values -> How does the counter get changed with each loop level
	- Essentially, we keep going until a statement is reached, which will then lead us to terminate the loop
- Range-based For Loops
	- These consider a collection or set to be iterated over.
	- Advantages
		- Miniimzes the change of range out of bounds error
	- Disadvantages
		- Can't iterate through a slice of the collection (a subset).
- Logically-controlled loops (WHILE loops)
	- Design issues
		- Where do we put the test? Pre-test or post-test?
		- Should a logically controlled loop be a special case of the counting loop, or a separate statement. In C, you can actually make a while loop that is more efficient that a for loop with the standard counter procedure.
- User-Located Loop control mechanism
	- Simple design for single loops (e.g. **break**)
	- Design issues for nested loops
		- Should the conditional be part of the exit?
		- Should control be transferable out of more than one loop?
- Iteration based on Data Structure
	- Java 5.0 can also the the `for` items in array.
### Unconditional Branching
- Guarded Commands
	- Combines programming in a concise way, based on the semantics for formal logic and proofs so that if the code compiles correctly, then the semantics are proven to be correct. It's embedded in some languages such as ADA. 
		- Baesd on Tony Hoare's **Hoare logic**.
	- Selection Guarded command
		- Multiway selector -> 
		- ```if <Boolean expr> -> <statement>
			[] <Boolean expr> -> <statement>
			[] <Boolean expr> -> <statement>
			[] <Boolean expr> -> <statement>
			...
			[] <Boolean expr> -> <statement>
			fi```
		- If more than one of these switch statements are true, we choose on at random. If none are true, it is a runtime error.
	- 