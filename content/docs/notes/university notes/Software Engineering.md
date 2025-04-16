---
title: software engineering
date: 2024-08-20
tags:
---
### Modern Software Engineering (8/20)
- What is the point of software engineering? What does it fix?
	- The problem with software development in the past:
		- Late
		- Too expensive
		- Poor quality
		- And less functional than promised.
- The internet was first born in the early 1970s.
- Mid 1990s, the web came ot be.
___ 
### Modern Software Engineering (8/22)
- Waterfall life cycle model is evil, much worse than agile methodology.
	- It was the method used for centuries before technology existed.
- What is the fundamental problem with building projects?
	- Poor project management
	- Do not use good engineering practices.
		- Example: waterfall methodology
			- The waterfall methodology is popular, but this life cycle model doesn't work because of one key issue, that the requirements KEEP CHANGING. Waterfall assumes that the requirements don't change.
- project efficiency - described as a project being on time and within budget.
- A low failure rate of software projects is not a direct indication of success or product quality.
	- If only 1% of projects fail, it may indicate that not enough risks are being taken.
Multicore is usually better for performance, but there are edge cases where this is not the case.
- In situations like these, it's better to go back to singlecore and use rate monotonic analysis.
- Be careful with the decisions you make especially when trying to prioritize speed.
	- It is not worth it to deliver poor quality work at the price of speed.
___
### Some random shit (8/27)
##### What is devops
- Getting the users involved with the developer team to find what works and what doesn't.
##### How to avoid the typical mistakes:
- Identify problems that have occured in previous projects that have a similar goal to your project.
- Discuss major mistakes that were made with other people, whether coworkers in different departments, or even friends in the industry.
- Create a checklist of mistakes to be mindful of. Hopefully they don't get checked off
- Create a list of mistakes to AVOID during planning and monitor cautiously.
- Create a watchdog, an alarm so to speak, to sound whenever your proect starts leaning toward a mistake.
##### Essential vs Accidental Complexity
Any project has a certain aspect of essential complexity, it is just intrinsic to the stuff that we do. 

Accidental is not intrinsic to the problem, but sometimes it's necessary. 

___
### (8/29)
##### Lessons Learned from Historic Cases
Boeing
- They got a larger engine that was more powerful but it caused issues with the plane during flight. To combat this, engineers created radars and scanners to detect when the plane is in danger, but it was an optional feature that many engineers did not opt to install because it cost extra. This meant that there was only one point of failure. Furthermore, there was new software that would take control of the plane to correct its sterring, but this feature was not known to many pilots, causing major panic in those situations to the pilots that did not understand why they could not fly their plane.
- Bob Martin's lessons learned:
	- When our mistakes may cause injury, loss, or death, it is up to us to ensure the upmost safety.
##### Healthcare.gov 
- There were a lot of separate teams that worked on different pieces. 
	- The lack of communication between these teams contributed to poor development.
- Originally, they had a very short timeline, but the requirements of the project kept increasing, while keeping the time-line the same. 
	- Their solution to reaching the deadline was adding more engineers that did not necessarily help.
- Part of the problem was that, there was nobody in charge (nobody was responsible for this disaster). 
- There's supposed to be test cases for each of the features, but there was poor testing, and not a full implementation of the features.
	- So when they actually ran tests, they failed almost every single one.
		- Some issues were, could not handle the load
		- Security issues
		- Clear text. 
- Volunteers from Silicon valley fixed the issues in 1/10 the time with 1/10 the resources.
- When you have a big project where you expect many users, there **NEEDS** to be a dashboard.
- Also, when you want to build a big project with many users, you have to incrementally scale it and fix it as you go.
- Just because you use the word sprint, does not indicate the use of agile methodologies.
- **Root causes of failure:**
	- The time frame must be well established, and modified when necessary
	- Requirements can change, be quick on your feet.
	- No effective planning
	- Poor integration strategy (lax oversight of contractors).
##### London Ambulance Service 
 - War between management and reunions
 - Skipped a lot of steps in the testing protocols
	 - Relates to the quality culture. When we have a culture that doesn't prioritize quality, then you won't get it.
	 - This led to many deaths in London because of the delay in ambulance services.
- In 1992, GPS and the web did not exist.
	- They wanted a computer aided system where the driver could say, "This is where I am, where should I go"
- One issue: They used single shot implementation (waterfall).
	- If any feature did not expect to be completed by the 8 Jan 1992 deadline would be scrapped.
- Another issue: the original team of workers in 1992 had no experience in building dispatch systems.
	- The 1996 team was filled with members from midland that DID have experience.
- The 1992 project did not use the PRINCE method, but not only that, they did not have the proper culture.
- The root cause was bad management
- There was also just a major lack of testing.
- In 1996, all of the stages were completed in small increments. The project started as a simple call-taking one. At each stage, it was thoroughly tested. 
##### London Stock Exchange 
- This project was extremely over budget and late
- They were just really bad at managing the escalation.
- bad at estimating the cost and time.
- They wanted to have a concrete outline within 2 months, but didn't have one years.
- There were people that were on the project that had poor interests for the project. They were sabotaging and stopping the project from coming to fruition.
- The LSE set an ambitious timescale of 18 months, they allowed politics to take precedence over technical rationality.
- Solution:
	- Taurus renamed CREST arround 1993 and was taken over by England. 
		- They decided to implement a central registry of shares (the decision that would've cost many banks money).
	- The "big hammer"
		- Put their foot down and made the obviously correct decision.
##### Toyota
- I wrote about this in my homework, you already know

___
# Agile Methods (9/3)
Agile: a method that supports responding raipdly to changing requirements
Scrum is one method of Agile.
- There are significant differences in the methods. Scrum is the most widely used method, and also the 2nd most simple. The most simple is .... (I FORGOT)
There's 12 principles for the agile methodology.

If you notice in healthcare.gov incident, we had a bunch of different sprints, but it was the waterfall lifecycle split into chunks.

### What does agile address?
- Requirement volatility.
	- If you look at failed projects, one of the leading causes is high requrement volatility. 
- Heavy-weight documentation
	- Agile moves away from that to simplify things.
- Not collaborating with stakeholders to find out what the problem is and fix it.
	- They have a focus on communication with customers and people
- Poor communication within the team
	- Smaller teams are preferred to enhance communication
- Poor estimating and planning
	- Agile says that we will constantly work on the customer's number 1 issue at every iteration.

The customer controls the schedule and the functionality, but they cannot control how much of it gets done.

### Agile manifesto
We value:
- Individuals and interactions
	- This means confident and competent people working as members of effective teams.
- Working software over comprehensive documentation
	- If you're writnig over thousands of pages of documentation for your code, it's not going to have much value. 
	- Obviously we need to write down the requirements or a formal specification, we may get a lot of documentation for a small amount of code.
	- HOWEVER, there should not be thousands of pages of design spec. Sometimes the design spec won't even match the code that was written because the code changed, but the design spec wasn't update.
		- The design spec and the code can become out of sync, rendering the design spec useless.
- Customer collaboration over contract negotiation.
	- Would you rather work with a third-party lawyer and work with contracts, or collaborate directly with the customer. 
	- The customer is our ally, not an enemy.
- Responding to change over following a plan
	- Having a plan is good. 
	- But the type of plan for an agile project is different
	- Requirements change, and when things change, we need to change our plan.
One of the issues was that agile was too process oriented.
### Principles of the Manifesto
- ==The highest priority is to SATISFY the customer by providing valuable and real products that they find satisfactory. ==
	- How do we know it's valuable?
		- Early and continuous delivery. Deliver the customer software early and allow them to see the iterations. 
- We welcome changes in the requirements. We just say, man that's just how it is, we'll do our best.
- Deliver working software FREQUENTLY, from a couple of weeks to a couple of months. 
	- We prefer shorter timescales. These iterations are usually around 2 weeks, we will rarely see an iteration length of a month. 
- Bulid a project around motivated people. We give them interesting work and the environment and support that they need. 
- Most effective way of communicating is through face to face conversation. 
	- This was the philosophy back then in 2001. A lot of virtual teams exist and perform remotely. But face-to-face is generally the best.
- The primary way of measuring progress is via working software and the implementation of new features. 
- Sustainable development
	- We want to avoid burnout. Avoid 60 hour work weeks. We want to create a culture of sustainable work.
- Make it easier to change the software. Pay really good attention to excellence. 
	- Good design will enchance agility. A well designed software is easier to change. 
	- Refactoring is cleaning up the code base.
- Simplicity - Don't solve a problem you don't have.
	- "At some point, we are going to have some variant of this same problem, should i start strategizing and figure out how to generalize my solution to fit other future problems?"
		- Nah bro, just eat that first bullet and fix the code. 
	- The art of maximizing the amount of work not done is essential.
- The best architectures, requirements, and designs emerge from self-organizing teams.
	- One of the things we want to do early in the lifestyle is think about the architecture. 
	- ==The architecture is not really emerging, it should preemtively be made, and then slightly iterated==
- At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly. 
	- Basically just be self-aware and self-crtitical, individually and on a team basis.

### Different projects need different methodologies
![[Pasted image 20240903165001.png]]
The more important the stake/criticality, the higher up on the Y axis.
When the stakes are higher, we must be more and more thorough with our operation. Review every change, test a bunch, multiple points of failure, etc.

You have got to be dilligent when the consequences are potentially more disasterous. 

### Six Sweet Spots (2001)
Dedicated developer?
- Someone that dedicates 100% of their time to the project, full time.
- Multi-tasking is not encouraged in software development. You cannot interupt your thought process deliberately, especially multiple times. It is basically an unspoken law to only be assigned one task or project at a time.
Experienced developer?
- 10,000 hours (~5 years) of experience. 
- Agile cannot fix inexperienced novice workers. 
- Agile is best with smaller teams of EXPERIENCED workers. 
- You can have a few novices, but not a team full of them.
Small co-located team?
- 7 + or - 2 members (basically less than 10)
- Visible, audible, isolated, same physical space.
Tools to support testing and configuration management
- Doing multiple tests many times perday to see if any changes you've made may have potentially accidentally broken something.
Easy access to uses to respond to their requests
- Basically we need to continuously interact with customers and users.

___
# Scrum(9/5)
### Scrum (The most popular agile method)
Frequently hybridized and expanded on with other methods. No technical aspects, only project management.

### Life Cycle
Product backlog -> 
Sprint backlog -> 
work on this iteration for 2-4 weeks, where everyday the team discuss -> 
at the end of the iteration, you have a shippable increment of the product.

### Team Members
- **product master**
	- responsible for maximizing the value of the product resulting from the work.
	- order (prioritize) the Product Backlog items.
	- communicate the Product Goal.
	- it is important that there is only ONE person as a product master. No conflicts.
- **scrum master**
	- leadership role, advisor like 
		- but has no management authority over the team
	- helps resolve impediments
	- keeps people organized?
	- ==Search up the difference ==
- **developers**
	- Gotta do your work man
	- Incompetent members will get hounded on
	- 5-9 members ideally. Less than 10 typically

Within the team, there is no hierarchy, everyone just works.

### Sprints
Fixed length of time to work on a goal
- The iterations are short, most commonly two weeks as of today
- You cannot change the requirements DURING a sprint.
	- Because of this, even if the Product Owner wants to change the priority, they must wait to mention this until the next meeting.
- A sprint can be cancelled with the Product Goal becomes obsolete.
	- Only one person can do this, the Product OWNER.
- **Sprint Goal** - What makes the sprint valuable?
### Daily Scrum
Timeboxed 15 minutes, cannot go over it no matter what.
Carefully consider the progress being made
Adapt the Sprint Backlog as necessary, and adjust the upcoming planned work.

**Three main questions:**
1. What did you do since the last Scrum?
2. What got in your way?
	1. Only list the problems, don't try to solve the problems.
3. What are you going to do before the next Scrum?
### Sprint Review
- Conduct a review to inspect the current status and outcome and adjust accordingly.
- Timeboxed to a max of 4 hours for a one-month sprint (one hour per week?)
- Rapid feedback on building the product.
### Product Backlog
- The master list of everything that is needed to be created or improved in a product.
- **Product Backlog Refinement** - breaking down and defining items into smaller more precises items.
### Product Goal
- Describes a future state of the product which can serve as a target
- This goal is in the Product Backlog
### User Story
- Is simply a prmoise to have a discussion; not every detail needs to be included.
- Describes functionality that will be valuable to either a user or purcahser of a system.
	- Card - written descriptoin of the story
	- Conversation - about the story taht serve to flesh out the details of the story
	- Confirmation - details that can be used to determine when a story is COMPLETE.
- User stories should be INVEST:
	- Independent - avoid dependencies between stories
	- Negotiable - details are negotiable
	- Valuable - valuable to everyone (users and developers)
	- Estimable - reasonably confident that they can estimate the story
	- Small - story can be completed in a single sprint with < 25% of the team
	- Testable - test should satisfy the Product Owner

### Architecture Breaker
- Having to recreate the architecture
- The architecture is mostly not driven by functional requirements.
- The user stories are funciotnal requirements, they're what the softwrae neds to do
- Architecture is driven by the non functoinal requirementsl ike availabity performance security and usability and things like that
- spanh hgue chunks of the system
- so if you break something there, then you got to change big chunks of the software in order to fix it.
- you dont want totry to do all of the architecture work up front, but at least enought (walking skeleton) to understand the big impacts of the design decisions you're making. if you look at just this part of this stimulus response thread, and then another part, but then in combination the performance is awful. if you do a skinny little skeleton, you could look at the performance from end to end in totality and decide accordinigly.
- Focusing on the architecutre early in the project, frequently line up as being a useful way of spending your time.
- create a strong foundation of the architecture and infrastructure early on first, and then afterward start building business value.
### Splitting stories (not on exam)
- Cross cutting conerns
- mixed priority things
### Tech Stories
- Try to avoid tech stories, but you may not be able to
	- Sometimes you can express a tech story in such a way that the customer understands that value that they are getting out of it, sometimes you can't.
- stuff that needs to be done, but may not be that the user cares about directly.
- Some tmies you can hide a tech story, inside of othe ruser stories, so you can address the tech story underneath the surface, of things the user actually DOES care about.
- Sometimes you need to create a list of tech stories that you keep around and work on when you can.
- These suggestions come from a book called "**scrum and xp from the trenches.**" wtf i don't know.
- If you decide that you're interested in agile read this book.
### Division of Concerns
- Setting the relative importance of requireemnts and the estimates for doing the work are divided.
- Everyone on the team is involved in estimating every story- builds common understanding.
### Planning Poker
- As the user story gets bigger, the accuracy of estimation worsens.
- A size of 20 may not fit in a sprint, but a 40 will definitely not fit in a sprint. 
- The typical story is usually 5.
- A story with 0 is something that is low friction and easy. One minute of work.
Aggregating expert judgment

___
# Scrum Cont. (9/10)
Random tangent: Slow is smooth, smooth is fast.
Essentially the main idea is to take things slow. Plan, be careful, don't rush or else you're cooked.
### Re-estimating
When the size of a story has changed, you need to adjust accordingly. If can be smaller or larger than expected. With experience, you will begin to get better at relative estimation.

### Sprint Backlog and Sprint Goal
The Sprint Goal: what are we trying to accomplish this iteration. This overarching motif. Summarizes what we are doing in a single statement.

### Stories and Tasks
A task is a broken down component of a story.
Stories - DELIVERABLE progress that the Product Owner CARES about
Tasks - Non-deliverable stuff that the Product Owner doesn't care about.
We don't need to fill in the Product Owner about tasks, they're just things to be mindful of as we make progress.

### Definition of Done
How can I know when I've generated a good set of test cases:
- It's gotta cover all of the requirements. 
- MCDC Testing
The definition of done is when the state of the increment reaches the measure of quality it is required. WTF is the point of this slide.
### Why Scrum is powerful
Communication, low-overhead, makes problems visible, puts responsibility on people
### No silver bullet
Though it's easier to find problems, obviously we still have to solve them. You still need to do good work to solve hard problems. 
### Does Agile Fit your needs?
- Really dynamic
- A culture that thrives off of chaos
- Smaller number of personnel
- Low criticality
- Less intern type roles, and more high level positions.
### Barriers to the Success of Agile
Customer that doesn't want to work with you, they're going to make a big requirement spec and figure it out without input from the programmers.

Programmers can actually choose who to work with. Bad customers won't get service. "We don't have the resources to help you at this current time".
- Only do this when you have the luxury

A culture that overworks the employees and expects too much of them
- One common issue is death-marks projects, where a PM will claim that a project's performance will either cause the company to fail or survive. This sort of culture causes burn out.

___
# Requirements (9/10)
Communication is key, make sure you can talk to the end users and understand the requirements that they desire. Also you need to be able to talk to other developers.

Make sure you spend enough time before you even write a single line of code. Make sure you have the architecture, requirements, design, implementation, etc. fully understood.

perspectives on dealing with requirements
System analysts use UML and other stuff
Professor really like iterative development
There's mayn ways to deal with requirements problems. Why do we have so many requirements issues in our projects? 

Some solutions to common problems
The GOLDEN standard: talk to the customers, users, and others.
- realize what the issue is
- support them and show that you care

Derived Requirement vs Requirement
Derived - are derived from the engieners as a result of the requirements analysis. 
### ==Functional vs nonfunctional requirement on exam==
- Functional - something the engineer has gotta do. You can build a module that implements that particular feature, but non-functional are quality attributes.
- Nonfunctional- some constraint such as response time, performance, security. They include quality attributes, the primary drivers of the architecture
### Requirement Eliciation
Basically figuring out what the customer wants and needs. Most importnatly you must talk to the stakeholders.
How can we talk to other people comfortably?
___
# yo fill the in between
### Requirements Defects
- These errors are the most expensive to fix DURING production, but cheapest BEFORE production.
- Missing requirements are obviously the hardest to fix because they dont exist.
	- Therefore, we should constantly be iteritvely updating the requirement list and keep checking for stuff that's missing.

### Characteristics of Good Individual Requirements
- Unambiguous
	- Easy to understand
- Consistent
	- Dont conflict with other erquirements
- Complete
	- dont need to add more stuff
- Singular
	- shouldn't need conjunctions
- Feasibile
	- Possible to do given current tech
- Traceable
	- Should be able to trace during design, test requirements, etc.
- Verifiable
	- Demonstrate that the system satisfies this requirement.

### Characteristics of Good SET of Requirements
- Complete
	- Should contain everything pertinent
- Consistent
	- Same terminology, no duplicatoins / double dipping
- Affordable and Bounded
	- Set the scope of the work

In practice, because of complexity of the system, it is **impossible** to produce a complete and consistent requirements document. But the goal is to get as close to this as possible
Trying to come up with a detailed requirement specification that is complete and consistent is in practical purposes not likely to achieve. Because one day you'll find yourself to fall short.

Gause and Weinberg on ambiguity

### Requirements Jargon: Shall
Requirements are mandatory binding provisions and shall use **shall**.
Statements of fact are non-mandatory so use **will**.
	Preferences are desired but non-mandatory use **should**.
Suggestions use **may**.
Don't use **must** because of posible misinterpretation. 
Use positive statements and avoid negative requirements such as "**shall not**".
Use an active, avoid usign passive voice such as "shall **be** able to select".

### Object-Oriented Requirements
You can generate a specificatoin that is object oriented, but those will likely be derived requirements of what the customer needs.
When doing OO design and generate ues cases, those are not an object oriented artifcat

### Use Cases Document Requirements
a use case is a set of scenarios that describe some usage of the system. let's say you're building an automated cash register. One of the 20 use cases is processing a sale, and it's without a doubt the most important feature. The use case is the set of steps that discuss the actions of the actors and the system. 

### Use case diagrams
Not super clear all the time, not preferred by Paulky.

### Actors
Not a part of the system we are building, but they use it. 
Basically inheritance: We have generealization and specialization.
Actors must be specified sometimes. Instead of just medical staff, we can say physician and nurse. Be specific

### Finding Use cases
not superh ard. think about the custoemr and what they need.

### Use Case Context Diagram
Prmiary actors on the left, supporting on the right.
![[Pasted image 20240917164432.png]]
When we start talking about selling alcoholic beverages, there's more context to this. We have extensions for alcoholic use case. Stereotypes that require more context. 

### Larman's Fully Dressed Use Case
There's a bunch of diff templates that are all p similar. We are gonna use Larman's because that's the one in the textbook. 
**Subfunction** -> dividing the use case into smaller pieces. (Divide and conquer)
**Primary actor** -> Calls on the system to deliver its services.
- In a scenario where we have a customer and a bank teller and a withdrawal of money, who is the primary actor? the primary actor is actually the teller, they're the ones utilizing the system to get the money. if the customer were to use an ATM, it would be the customer. 
- It's whoever is interacting with the computer system.
**Stakeholders and interests**
- Hard to define all of the people the stakeholders and those that care about the project.
**Preconditions**
- What must be true on at the start?
- Something that is always true at the beginning? or something idk.
- Not tested within the use case.
**Sucess Guarantee (postconditions)**
- What must be true on successful completion
- This would be worth telling the reader.
**Main Success Scenario**
- Also typically called the happy path or basic flow.
- Steps of three kinds.
**Extensions**
- Alternate flows
- Basically there's two categories of alternate flows
- Firstly, different ways of doing an activity in the alternative path.
- We don't want conditionals in the main success scenario
Frequently span the system as a hole.

### Bank Loan Example
![[Pasted image 20240917165829.png]]
Much more to this, see slides
Most important thing to remember abt the homework is the extensions and maind success scenario.

___
(9/19)
### Bohem's Cone of Uncertainty 
At the beginning, we may not have a good idea of the requirements and parameters, but as it progresses, we get closer to the ideal.

We spend a lot of our time doing rework, fixing bugs. The avg project spends 50-80% total effort correcting defects. Why does it cost so much to fix defects, the worst ones require analysis, design, and testing. Finding and fixing defects earlier in the life cycle, the cheaper it is to fix. The **cost of change curve**. 

### Pure Watefall Model
Good if requirements don't change. We can perfectly know everything before we begin, and it's just up to us to getting it all down and then forging ahead.
But in the Real World, waterfall is impractical because:
- People make mistakes, make misunderstandings
- The operating environment changes
- Didn't nkow what they wanted in the first place
- There are some things that we don't discover until we are well into implementation.

##### The Royce "waterfall" model
Do everything twice

### Moving Away from Plan-Driven
This idea of Royce's feedback loop is a concession to the insufficient capability of software development. Customers want a linear approach to know the timeline and cost of a project. People used to think that having an iterative approach meant that you had to go backwards and thought of it as evil. 

### Spiral Lifecycle
Iterative process
Prioritizes things according to risk

P vs adapative
- Traditional, plan things carefully, and change things carefully and infrequently
- Adaptive - Change-driven, this is what agile is all about. '
### Iterative and incremental development
Iterate means to redo.
"we dont know what it is we are building, we are figuring it out as we go on. it's evolving as time goes by"

Increment- even if you knew exactly what you were gnona buld, incremental is still good because we are building and releasing in periods. Focus is to get value to the customer early.

IID means iterativeand-incremental

![[Pasted image 20240919162625.png]]

### Snowden's Cynefin Framekwork
There's 5 categories of work
1. Complex - Don't know necsesarily what is going on, what we're doing, but you gotta work to figure it out. AGILE AGILE AGILE
	1. The more uncertainty you have, the better a complex one is.
2. Complicated - Generally know what it is we are doing. Sequential development has its sweet spot.
3. Chaotic
4. Obvious
5. Discord (don't nkow where we are)

People are ignorant and uncertain. We need lifecycle models that can deal with these things such as agile or anything IID

Agile is not a lifecycle model, it's a methodology.
Methodoly- more than a lifecycle. set of practices, techniques, procedures, rules. We usually pick a lifecycle model as part of our methodology.
For agile, the choice is always some form of iterative lifecycle. 
One of the problems with methodology is whether we take a small M or big M approach. 
Small M - Basic approach, tailored plan.
Big M - We are gonna give you a methodology, just do what you're told.


### Unified Process
Methodology process built by the three amigos.
Created the UML for OOD.
THE design notation that everyone uses. 
Unified process was good because it emphasized iterative development.
Historically we had phases, and we would iterate through these phases however many times as necessary. This still has a flavor of waterfall in the sense that we do feasibility analysis, and then develop it and then deliver the product.

### Lifecycles used
Waterfall continues to be used as the predominant lifecycle. More than a third claim its use.

![[Pasted image 20240919164007.png]]
Look at the diff of the second thing

Iterative vs incremental have two different value propositions

Complicated vs complex kind of work

In the uni process, difference between work loads and phases.

___
# Analsis and Design 
### System Perspectives

Specifying Requirements
The sweet spot is semi formal
The proble with informal is that it's very loosey goosey, not specific, tends to be ambiguous. but it's easier to communicate with the cilent that's not a tech head. The devs may be techies and enjoy mathematical rigor and formal specifications, which may be great from a technical perspective, but the customer will be confused.
Semi-form is a reasonable balance point between these. These two extremes are mutually contradictory.

Informal Specification
Don't use negatives with requirements. classic examples are double negatives, triple negatives

### Classical Analysis
![[Pasted image 20240919165616.png]]
___
# Software Design(10/1-Current) Exam 2
### The problem of software design is complexity
Overtime, we keep building more complex and larger systems that require more demand. 

### Complexity
For every 25% increase in problem complexity, there is a 100% incresae in complexity of the solution.

### UP Design Workflow

### Cohesion and Coupling
- ????

EXAM 
what's the difference between shared aggregation and compositiion

EXAM
Slide for software testing -> Subtle Distinctoins
People make mistakes, which becomes a fault, resluting at execution in a failure
Which is wrong with some degree of error. 

Regression testing is one of the most important testing tools with automatic testing.
# Exam 3 Notes
