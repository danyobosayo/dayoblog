---
title: database
date: 2024-08-19
tags:
---
### Chapter 1: Databases and Database Users 08-21
- ##### Vocabulary: 
	- **Database**
	- **Data**
	- **Universe of discourse (mini-world)**
	- **Database management system** - This software system will do 4 things with the data. Some examples inclued: mySQL, mongoDB, oracle
		- Define - Know what information you want to store. Know the data types, the structures and also constraints.
		- Construct - Populate the database with information.
		- Manipulate - Performing some kind of query on the table to get a result. This could also include changing information and storing it again.
			- Retreival, modification, accessing
		- Share
	- **Database system** - The entire db system is simply the DMBS + data.
##### Database types and applications
- There are various data types that a database can store.
	- In the past it was strictly numbers and strings
	- But now we can store videos, images.
- Some applications include:
	- A geographic info system
- For a database to be useable, we need three things:
	- Mini-world
	- Data is correlated, and what data do we need to show for the user.
	- Identify for WHOM we are storing the data.
- **Catalog**
	- Stores the description of a particular databse, e.g. data structures, types, and constraints
	- Also known as meta-data

___
### Example mini-world exercise: 
Online car resale database:
MODELs are of CAR BRANDs
MODELs have YEARs
CAR_ID have MODEL and YEARs and AVAILIBILITY
CAR_SELLERs sell CAR BRANDs
PEOPLE buy CAR_IDs
PEOPLE are interested in CAR_IDS
PEOPLE have SALARYs

**BUYER**

| Name    | Salary | Ethnicity | Interest      |
| ------- | ------ | --------- | ------------- |
| Michael | 90k    | Asian     | Brown, Toyota |
**CAR**

| Make   | Model | Availability |
| ------ | ----- | ------------ |
| Acura  | RDX   | 3            |
| Toyota | Camry | 2            |
| Lexus  | ES100 | 0            |
**CAR_ID**

| ID  | Make   | Model | Year | Color | Condition | Previous owners | Available |
| --- | ------ | ----- | ---- | ----- | --------- | --------------- | --------- |
| 101 | Acura  | RDX   | 2010 | Grey  | Used      | 2               | Yes       |
| 102 | Acura  | RDX   | 2015 | Black | Like New  | 1               | Yes       |
| 103 | Acura  | RDX   | 2024 | White | Mint      | 0               | Yes       |
| 201 | Toyota | Camry | 2010 | Grey  | Used      | 1               | Yes       |
| 202 | Toyota | Camry | 2020 | White | Like New  | 1               | Yes       |
| 301 | Lexus  | ES100 | 2020 | Gold  | New       | 0               | No        |
___
### Meow (8/26)
##### Warmup Questions
1. Explain any DB system.
	- Example of an industry could be health care. They store patient information and they can use it for trends and combatting 
2.  Differentiate: Data, Database, DBMS, DB System
	- Data is information that we would like to store and use.
	- Database is a storage system that will hold all of our data. Held typically within a server when using cloud computing. 
	- DBMS is the management system, such as oracle, mysql, mongodb, etc.
	- A DB system is the DBMS but also including the database (data).
1. What are the main functions of DMBS
	- To modify, add, delete, and access data.
	- Define, construct, modify, and Share
1. Explain Database Catalog
	- A database catalog is metadata, which is data regarding the data.
	- For example: 

##### Characteristics of a Database compared to the programatic approach
- Self describing
- Program-data independence
	- We used to have very tightly coupled programs and databases. 
	- Where programs and data would both have to be changed when one needed to change, such as adding a new attribute to a class.
##### Data abstraction
- Achieved through a data model.
- This is used to achieve program-data independence.
- There are different models for data abstraction
	- Ex: high level, low level, etc.
- You can use this to hide information, but still retrieve it.
- The data model is a representation of the data, and the DBMS will use this to access data without exactly knowing what it is.
##### Data Access
- Just one database, but we will have concurrent users
- How do we juggle this?
	- OLTP (Online Transaction Processing) - allows for many queries to be concurrently executed. 
	- Concurrency control - to guarantee that each transaction is correctly executed or aborted
		- Locking the data based on whoever was first to access it.
		- Eventual consistency.
	- Recovery subsystem - It's a failsafe system to prevent corruptions to information. We log changes permanently so that in the case that the change doesn't go through, we can roll-back and recover the information.

##### Types of users
- End users - People that use an API to query the database
	- Casual users - Low level access users that interactive with the front end to access the database
	- Parametric users - constantly talking to the database 
		- Ex: Reservation agents.
	- Standalone users
- Database designers - Design the database and populate it with information.
- Data Base Administrators - These people would maintain the database for security reasons and make sure that it's in proper order.
	- They have the rights to modify, create, and delete data.
	- They also provide accessing information to other users (who can access what)
	- Also creating policies
	- Basic monitoring

##### Advantages of Database approach
- Storage structure for efficient query processing
	- Most drives will use hashing for indexing. Basically we index things so that we can access it efficiently.
- Controlling redundancy.
	- Say we have the same information stored in different places for different people. This would be potentially exhasutive of our storage resources, and each change to one would have to be replicated in the others. Instead we could control who can access the same information.
- Query optimization via technique.
- Backup/recovery system
- Representing the relational data.
- Enforcing integrity constraints.
	- Basically ensuring that information is true and consistent.
	- Ex: Credit hours will be in a range of 1-6, if you are registering for a class that has a prerequesite, that you have the corresponding credit, if you register for a section of a class, you cannot register for another unique section.

___
# Chapter 1 (8/28)
### Warm up questions:
- Characteristics of DMBS
	- There is abstraction, when we pull data we aren't fetching the data itself, but rather locations of data
	- 
- Types of DB Users
	- End users
		- This includes many types of users, but it's going to be the target audience so to speak. This includes people who make api calls, those who use the service, or make calls via the frontend. Casual, parametric, and standalone
		- Those who commonly access the data essentially.
	- Administrators
		- The database administators exist to ensure that the database is properly maintained and in order. They do this by quality checking the database (the correctness of data) and granting different access levels to different users.
		- This is actor on scene.
	- Designers
	- Workers behind the scene vs on the scene
		- On the scene care about the data, the database, the actual content.
		- But behind the scene workers are like the system designers who create the platform of the DBMS and the hardware/software environment.
- Advantages of DBMS
	- Traditionally in the past, data was tightly coupled, so any changes you make would affect the entire database.
	- But now that we have program-data independence, we now have the ability to change the data without having to change the program.
- Data Abstraction
	- Using a data model, we can hide data but still retrieve it. This allows the user to still effectively access data without having too much that it shouldn't have.
	- Abstraction is the idea that we can hide the unneccessary details such as where the data is specifically located and that entire process, and instead just focusing on getting the accurate information to the user.
	- Program data independence

### Vocab for this lecture:
- Data model
- Schema vs State
- Three-schema architecture
- DB Language
- A typical DBMS Component

### Data model
Related to data abstraction, hiding the process of data retrieval from the user.
This model will describe the structure of the DB, the operations for manipulating and changing the structures, and the constraints that the DB would obey.
**Constructs** define the database structure
- They typically are comprised of elements (data and their types), groups, and relationships
**Operations** are the functions that we call to obtain or update the information regarding the construct of the data model.
- Basic model operations include: insert, delete, update
- User-defined operations include: computer_student_gpa, update_inventory

### Categories of Data Models
Conceptual (high-level, semantic):
- Provide concepts that are close to the way many users perceive data.
Physical (low-level, internal):
- Provide concepts that describe details of how data is stored in the computer. 
	- Such as the data type, number of bytes, the index structure, etc.
Implementation (representational):
- Sort of a middle ground, not too much detail of the physical storage, and also conceptually understandable.
Self-describing:
- Combines the description of data with its values.
	- Such as XML, key-value stores, and some NOSQL systems.
### Schema (intension)
Database Schema - the description of the database (just the structure)
- Includes descriptions of the structure, data types, and the constraints.
	- But most importantly, not the actual data.
- The primary key is the particular column of a data table that provides identifiying information. This is used to with other tables to map relationships.

### State (extension)
At this point of time, what is the current status of the database?
- Ex: At 12:13pm, STUDENT table has 2 records, COURSE has 4 records, etc.
Essentially a snapshot of the database (including the content) at a given type.
Every state should be valid, if any change is invalid, then the state is not saved. 

### Three-Schema Architecture
The main characteristics of a database such as self-describing, program-data independence, and concurrency is achieved through this architecture type
The goal of Three-Schema is to separate user applicatoins from the physical storage
##### The three levels of schema:
- Internal Schema - describes the physical storage structure and access paths (indexes)
	- Uses a physical model
- Conceptual schema - describe the structure using datatypes, relationships, and user operations, as well as constraints for the entire databases
	- Uses a conceptual or an implementation data model.
- External Schema - Various user views for different types of users. ?????? look into this
	- Typically uses the same data model as the conceptual 
##### Mapping
Basically what is the relationship of the external view to the conceptual schema to the internal schema so that we can effectively obtain the proper information and display it accurately to the user.
When a user makes an access request from the top level, it has to be formatted to the appropriate label at each level. This transformation is being done by mapping. This is why the three-schema architecture has a mapping concept.

##### Data Independence:
- Logical Data Independence
	- You can change the conceptual schema without having to change the external schema.
- Physical Data Independence:
	- You can change internal schema such as the "how the data is stored" without making any change to the conceptual schema.
		- Example: Reorganizing indexes for performance improvement.
- Physical Data changes are easier to implement than Logical Data.
	- This is because physical change independence are done by the computer, the system.
	- Whereas logical changes have to be thoughtfully taken into consideration by you.

### DBMS Languages
Data Defintion Language (DDL)
- Once you are done with the database design on paper, you have to actually build it
- You will define all of the structures, this is where we have the DDL.
Data Manipulation language(DML)
- Specifies the data retrievals and updates.
- Examples: Querying changes such as create, retrieve, update, etc.
- Can be embedded into a host language such as C++, COBOL, etc.
	- Stand-alone DML commands can be used directly such as SQL queries.

___
# (9/4)
### Warm up Questions
1. What informations data model represents? Different data model?
	1. There are four different categories of data model.
2. Data base schema vs database state (valid state)
	1. The schema is sort of the skeleton structure of what information is being stored, the data type, the constraints, etc.
		1. The schema is stored in the database catalog. this stores the metadata.
	2. a database state is a single snapshot of databaes at a given time. So We would have an empty state at the beginning, and only valid states would be saved.
		1. A valid state is any state that satisfies all of the constraints and requirements and relations.
3. Three schema architecture -> program data independence.
	1. The three schema architecture involves different levels of representation of the same data. The primary goal is to separate what the user sees from the physical storage.
	2. It is all connected via a mapping within every level. This is how we achieve program data independence. Changes within any level, will affect the other layers but without making direct changes to the schema.
4. DDL DML?
	1. DDL is data definition language. Used to define the structure and constraints of the DB. It's just a general descriptor of the database. After creating the DDL, we should store it in the Database Catalog.

### DMBS Component Modules
Secondary -> Buffer -> Main Memory
The operating system will retrieve data from the hard drive.
Diff users that access data
- Admin/Designer: Privileged commands
	- CREATE user, alter permissions
	- DDL compiler will check if it's a valid query, if the data is valid. Basically if it's a correct query, it will convert it into the internal form.
- Casual: 
	- Query optimizer - rearragne the query in such a way that you can access the data faster. It's inherent to any DBMS. Checks for redundancy as well. Essentially optimizes it maine.
- Parametric user:
	- Think of it as a database entry operator. or data entry operator
		- They don't write new queries, they only enter new data
		- Let's say we have a table with 10000 students, we can write a program to do data entry. 
		- COMPILED TRANSACTIONS, basically they create functions that are already valid, and then they will simply supply parameters to execute. 
	- stored data manager ensures that whatever physical access of the data is valid.
	- The catalog is frequently communicated with by the run time databse processor to optimize efficient retrievals, such as getting index information, etc. It's in the bottom left .
	- Concurrency control module is seen right after the execution. This is because concurrency control is all about validating execution. 
### Physical Centralized Architecture
Combines evrything into a single system. This includes: DBMS software, hardware, application programs, and UI processing software.
User can still connect remotely, but all the processing is done at a centralized site.

### Client Server Architecture
Client:
What happens in this case?
Client has application programs, has U.I.
Same concept in terms of DML, we use a host language with ODBC and JDBC for connectivity between the client and the server to generate queries. 
The query is passed to the computer network, and that network is connected to a number of different servers. Examples of server includefile server, print server, and DBMS server. If it's a database query, the query will be given to the DBMS server. So instead of one server doing everything, we split up the services. 

### Three-tier client-server architecture
In between the client and databse sever, we will have a separate server called the application server or web server. 
What is the responsibility of this middle layer? 
- It works as a middle man kind of .
- All of the access control information, the logic, and the business
- Acts like a conduit.
- What is the advantage of this third layer?
	- This middle layer will verify whether a query is valid or not, and pass it accordingly. 
	- There's also a greater level of security. The clients cannot directly access the database server, only the middle tier can access it.

___
# (9/9)
### Warmup questions
- DDL Compiler - What is the main job of compiler? Translate to machine code by looking at the query. Validates that the queries are accurate. 
- Query Optimizer - Optimize queries. When we query, there are different ways to get the same result, and we can optimize it by accessing certain indexes, or combining tables etc.
- Pre-compiler - Separates the code for the Host Language Compiler and the DML Compiler. It separates the queries from the rest of the code. We can embed SQL code in a host language such as ODBC and JDBC
- Runtime DB processor - Essential coments. Processes executable commands such as queries and transactions. It works in tandem with the system catalog because of the three schema architecture. We can get index information, and the physical location of data.
- Stored data manager - Whenever we access data, the SDM will handle will access requests of the data. 
- Architecture: Centralized vs two-tier vs three-tier
	- In a centralized architecture, all of the information is in a single system. Everything we want to do will be part of a particular machine's job. There's a terminal that doesn't have ANY processing power, to access that system. Wireless or wired, we can access it within an available network.
	- Two tier - We have a separation of servers, a division of work. Allows users to access specific functions and multiple clients can process different work at the same time? The client now has a user interface and a bit of processing power as well.
	- Three tier - The main focus here is the existence of the third tier (middle layer). This intermdiate layer is called the application server or web server. It connects the client to the server and gives a level of abstraction. The client doesn't have access to all of the data, only requests that are allowed will they be able to retrieve partially processed data. 

### Database Design Process
- Almost any application will require a database of some sort. 
- First, we need to identify our miniworld. 
- Secondly, go to your client and ask, "what are the requirements?". Typical software design process. Collect information and requirements. 
- Thirdly, we create a detailed conceptual schema. This allows us to cross-check requirements and also ask our client if there's any issues. It's easier to understand.
- Fourthly, the logical design. We select our DBMS. Most DBMS can take an ER model and generate a logical schema which is the intitial implementation of the DB. It can create a table, it might not be perfect and we may need to add some constraints. 
- Lastly, physical design. We need to verify everything: if all of the constraints exist, the relationships are established, etc.
### Examples Database Application
### Entity Relationship (ER) Model Concepts
Three components:
- **Entity** - an object or idea that can be defined by attributes.
	- Type - What is the structure as a whole. Sorta like the schema to snapshot
	- Set - At this point of time, how many entities are in the DB?
	- Example of Student entity:
		- The structure would be first name, last name, id, etc.
		- Set - At this number of time, how many labels do we have in our DB table.
- **Attributes** - Properties used to describe an entry
	- Essentially information we would like to store and the associated data.
	- *Example:* 
		- Name = 'John Smith'
		- SSN = '123456789'
		- Address = '7321 Fondren Houston'
	- Every attribute will have a **value set** which is a data type or constraint e.g. integer, data, string, etc.
		- The constraint could be like a range of values it cannot exceed or go below.
	- Declaration example in NOTATION form: `Student(Name, Address, Gpa, SSN)` 
	- In ER Model form: Student (entity name) is in a square/rectangle shape, and the attributes will be connected via lines and will have a round shape.
	 ![[Pasted image 20240909121213.png]]
	 - **Types of Attributes**
		- Simple/Atomic - You cannot further divide the data
			- *Example*: SSN, Age
		- Composite - You CAN divide into smaller data components.
			- *Example*: Name -> First name & Last name, Birthday -> Month & Day & Year
			- ==Note that, in the event you rarely or never use the smaller component, you should convert the composite data type into a simple. ==
		- Single-valued - An attribute has a single value that is unique.
			- *Example:* SSN, Age
		- Multi-valued - An attribute that can have multiple values.
			- *Example:* {PreviousDegrees}, {Color}
			- This is represented with a double circle.
			- This Works_on attribute shows that this person can work on MULTIPLE projects.
			![[Pasted image 20240909122157.png]]
		- Complex - Multivalued and composite attributes combined.
			- *Example:* {PreviousDegree}
				- As a user continues their education, this PreviousDegree may increase to contain multiple degrees, and all of these degrees are composite: year, major, school, department, etc.
				- Notation form: `{previous_degree(year, major, school, department)}`
				- Person({Residence(address(street, city, zip), {phone(areacode, 3-digit, 4-digit)})})
		- Stored or Derived - When two or more attributes are related
				- *example:* Age and Birth_date 
					- **Stored:** Birth_date **Derived:** Age
		- NULL - An attribute that has no value for an entity or currently missing
			- *Example:* Apartment Number may not exist for a house, and a person may not have filled out a form entirely.
		- Key - An attribute that is **always unique** 
			- *Example*: SSN, VIN, UTD_ID
			- In a diagram, these values are underlined.
			- A key attribute **can** be composite. 
				- *Example:* A car's license plate can have an identification number and a state.
			- An entity can have multiple keys, and all of them will be underlined. This is different than the relationship schema where only ONE primary key is underlined. 
			- Any entity without a key is a **Weak Entity**.
- **Relationship**
	- Has a type and set
### ER Diagrams - Notation
There are two forms of the ER: diagram and notation
We can represent the same thing in both forms:
![[Pasted image 20240909121751.png]]
- *Example:* In this particular diagram we can notate it as: EMPLOYEE(Name(Fname, Minit, Lname), Address, Salary, ...)
___
# (9/11)
### Warmup questions
- Entities. Entity Type. Entity Set
- Define Attributes

| Attribute Type | ER Notation                       | Regular Notation                                                                                | Example                                     |
| -------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Composite      | More children                     | Parenthesis to signify the children                                                             | Person(height, age)                         |
| Multivalued    | Double lined circle               | checkedoutbooks{Meow1, meow2, meow3}                                                            |                                             |
| Complex        | Double lined circle with children | Squiggly bracket to signify multivalued, <br>and the multiple children can also be double lined | flight{flightNo(First,No), {Pilots}, fline} |
| Derived        | ???                               | I don't know                                                                                    | Stored: Position Derived:                   |
| Null           | ???                               | I don't know                                                                                    | When the entity has no values.              |
| Key            | Underline                         | Underline                                                                                       | Student(ID)                                 |


### Er Diagram for COMPANY Schema
![[Pasted image 20240911123001.png]]
##### Relationships
Note that the arguments of these relationships are undirected. can go both ways.
These are binary relations because there's 2 entity types.
1. Works_for(EMPLOYEE,DEPARTMENT)
2. Supervision(EMPLOYEE, EMPLOYEE)
	- Recursive
3. Works_on(EMPLOYEE, PROJECT)
4. Controls(DEPARTMENT, PROJECT)
5. Manages(EMPLOYEE, DEPARTMENT)
6. Dependents_Of(EMPLOYEE, DEPENDENT)
### Relationships Higher Degree
- When we first create the ER model, we don't consider relationships. 
- Now we need to relate two entity types together, to connect the tables.
- When a relationship is created within the SAME entity type. This is recursive relationship.
In the diagram, we read it from left to right. top to down.
So given the relationships we defined earlier we can create the following refinements:
- Manager of DEPARTMENT -> MANAGES
- Works_on EMPLOYEE -> WORKS_ON
- Department of EMPLOYEE -> WORKS_FOR
**Role naming**: In recursive relations, you need to explicitly show who is the Supervisor and who is the Supervisee. 
Notice how in the diagram below, there are 1s, Ns, and Ms.
### Constraints
Cardinality Ratio - Specifies the maximum number of relationship instances that an entity can participate in. 
- One-to-one (1:1) 
	- Employees (managers) will each manage just one department, and vise versa
	- One-to-many (1:N) or Many-to-one(N:1)
	- Multiple employees can work in the same department, so this would be a Many-to-one
- Many-to-many (M:N)
	- Multiple Employees can be working on varying projects with random overlap.
Participation / Existence Dependency Contraint
![[Pasted image 20240911123510.png]]
### Participation
- Notice how there are multiple lines connecting certain entities and relationships.
- Total Participation - Represented by double lines.
	- Every single entity of that set or type, must participate for a paritcular relationship.
	- Examples: Employees MUST work on a project.
- Optional Participation - Represented by a single line.
	- It is not necessary that every entity of a certain entity type needs to participate.
	- Examples: 
- Let's look at Department CONTROLS Project. Every project MUST have a department that's overseeing it, but NOT every department will have a project. Another thing to note here is that a department can have MULTIPLE projects. And every project will be controlled by a single department.
### **Weak Entity Type** 
- An entity which does not have KEY attribute. Nothing to define uniqueness.
- Identifying itentity type. How will you identify DEPENDENT? based on EMPLOYEE.
- Double Diamond in the ER diagram represents identification dependence. The entity that is weak will also have the double lines, and the weak entity must have an identifying entity.
- Generally, every weak entity will have total particpation to its identifying entity.
- A partial key is dotted underline. A dependent is uniquely identified by the primary key of the identifying, and the partial key of itself.
- Sometimes if a WEAK entity can be represented by a complex attribute, but this is ill-advised.
### **Min-Max Notation** 
- if you have participation and cardinality ratio, you can represent it with Min-Max Notation. You use this with ternary relationships generally.
- Default: min = 0, max = n (signifies no limit)
- Constraints: min <= ,ax, min >=0, max >=1
- ![[Pasted image 20240916121557.png]]
### High Degree Relation
- We can have relations of higher degrees that can be difficult to represent.
- When we have 3 entities related to each other, we can either have 3 separate binary relationships, or a single tertnary relationship. 
	- When we use 3 separate binary relationships, we need to be mindful that we perfectly translate all of the important information.
- In the image below, we can see a WEAK entity representation of a tertiary relationship. To identify this weak entity, we need to pull at least one partial key from EVERY entity that is an IDENTIFYING entity.
- All in all, there are 3 representations of a ternary relationship: using weak entity types, 3 separate binary relations, and a single ternary relationship.
- ![[Pasted image 20240916123417.png]]

___
# (9/16)
### Warm Up Questions
1. Relationship - Relating two entities in order to connect the tables.
2. Degree of relationship - The number of entities involved within a single relationship. Most relationships are binary, but the degree is how many entities are involved with a relationship.
3. Recurisve relationship - When a relationship of the same entity type is created. For example, we may have the Employee Entity, and we could have other Employee entities such as Managers or Supervisors related to an employee.
4. Cardinality Ratio

___
# (9/18)
### Warm Up Questions
Participation constraints - Total vs Optional. In total, every single entity must participate within the relationship. In an optional participation constraint, there is no mandatory existence of a relationship.
weak entity type
Apparently you do NOT have to have a partial key attribute in a weak entity relationship.
Ternary relationship

### EER Diagrams (Enhanced Entity Relation)
Oftentimes, an entity type can have additional subgroupings.
Example:
- EMPLOYEE can be divided into SECRETARY, ENGINEER, TECHNICIAN
- MANAGER
- SALARIED and HOURLY
When we model this, we connect the divided subgroups to a single circle, and then we connect the circle to our entity. Make sure the lines have the subset U symobl.
### Super Class
The parent class that holds attributes in which others may inherit.

### Sub Class
A sub class entity must not be in a set that is not in the super class. Basically, no entity can exist as a sub class without it existing in the super class. 
There's a list of sets for the super class, and the sub class must come from one of those sets.
Participation of a super class entity into a subclass is optional. But any entity that is in the sub class MUST be in the super class.
A single entity can also be in multiple sub classes.
### Inheritance
When an entity is a member of a subclass:
- it will have all attributes and relationships of the superclass.
### Specialization 
Top-down approach
We have a superclass and create subgroups based off of it. We then create separate subclasses.
![[Pasted image 20240918121837.png]]
##### Three types of specialization 
1. Predicate-defined (conditional): Based on some the VALUE of an attribute such as Job-Type or Car-Type, etc. Be aware that if these unique values didn't have its own unique attribute or relationship, it would be better off as an attribute instead of a subclass.
2. Attribute-defined: this one is based on an attribute of the member class.
	1. The difference between this and predicat-defined is that PREDICATE_DEFINED can be complicated.
3. User-defined: User will select the membership manually. But not only is it manual, but there is also no condition that can determine the membership.

### Generalization
Bottom up approach
We create some subclasses, and try to find common attributes. Based off of those commonalities, we can create a superclass.
![[Pasted image 20240918121822.png]]
### When should we create subclasses?
1. Certain attributes applies to some, but not all entities of the superclass.
2. Some relationship types may be participated only by entities of the subclass.
	1. manager manages a project
	2. Hourly_employee belongs to a trade union

### Constraints on Specialization/Generalization
- Disjointness: 
	- Disjoint set - Indicated by the d in the circle. If an entity exists within one subclass of that set, they cannot identify as anything else.
	- Overlapping set - Indicated by an o in the circle. The same entity is allowed to be a member of more than one subclass of the specialization. A good example of this would be a PART Entity being divided into purchased and manufactured. 
- Completeness:
	- Total - Every entity of the super class must be member of SOME subclass.
	- ==Generalization is usually Total because the superclass is derived from the subclasses.==
	- Partial - It is not necessary that every entity is a part of some subclass, can exist as a super class. 
	- This is indicated by the double / single lines.

# Exam guidelines
common mistake- student gets confused between database model and 3 schema architecture. Conceptual view, physical view, external view.


___
# (9/25)
### Warm Up Questions
- Specialization vs Generalization
	- Specialization is when we are creating subclasses based on one of like three criteria, either a condition, an attribute, or however the user feels. It's a top down approach.
	- Generalization is the opposite, a bottom up process. We have already have a few entities that have similar attributes to one another, and we decide to group then by making them children of a new superclass.
- Define:
	- Disjoint -> If an entity is a part of a subclass, it can only be part of that one subclass, it cannot identify as another.
	- Overlapping -> Entities are allowed to identify as whatever subclasses. Multiple or 1.
	- Total -> every entity that is classified within a superclass must also identify as one of the subclasses.
	- Partial -> An entity can identify and exist as a superclass without associating to a subclass.

### Scope:
- Hierarchy Lattice
- Union type
- Guideline
- ch.9 (Mapping, primary key, foreign key)

### Hierarchy (single inheritance)
We have one subclass, and it inherits from only **one** superclass
The subclass's attribute is the union of the local attributes with the superclass attributes. Same thing for the relationship.

### Lattice (multiple inheritance)
The subclass will inherit from **multiple** superclasses.
This subclass's attributes will be the union of all superclass attributes, and also the every parent superclass that may exist and also its own local attributes. Same thing for relationship.

### Union Type
There's like a standard union for shared subclasses, and also a Category Type.
Let's say we have three superclasses: person, bank, company.
The subclass of these three superclasses is a single Owner entity. 
The owner would be a subset of the superclasses.

Shared subclass vs category type.
A category type is a part of a proper subset. It can only be **one** of the superclasses, not all of them.
Shared subclass is an intersection 

### Simplifying an EER Diagram
- There are many way
- don't create a subclass if it's not necessary
- if that subclass doesn't have any specific relationships either, don't create it


___
# Chapter 9 ER-to-Relational Mapping Algorithm (9/25-10/16)
### Information vs formal versions of the same word 
Table -> Relation
Column -> Atrributes -> Domain data types
Rows -> Tuples

### Primary Key 
This attribute will provide uniqueness to an entity. We can have multiple of these keys to a single entity, and we would use all of them in combination 
### Foreign Key 
The constraint between two Tables/Relations.
We have tables/relations that can be referencing or referenced. 

So we have two tables, SECTION and COURSE. THe Referenced Table's PRIMARY KEY, would be the foreign key of the Referencing Table.
### Goals of mapping
- Preserve as much information as possible.
- Maintain as many constraints as possible.
- The least amount of NULL values.
### Step 1: Mapping of ***Regular*** Entity Types
- Identify the strong identity type. For each, create a table that includes every simple attribute of the entity.
	- Note that we can't use complex or multi-valued right now. Any simple attribute gets written down, composite ones should be written in simple component form (e.g. instead of address, write down street, city, etc.)
- Choose a key attribute as the Primary Key, if it's composite, make the set of simple attributes that form it together to be the primary key.
- You can only have one primary key, every other key would be a unique key. 
- There's a misconception with mapping keys with composite attributes. In the ER-Diagram, you will not underline all of the simple components of a composite attribute, you will **ONLY** underline the parent attribute. In the mapping, you will underline **ALL** children instead. 
	- Note that if you see multiple underlines in a mapping, it **indicates a composite attribute that is a key** 
- Denoting uniqueness can be done in this form. 
	- Unique: Department -> DName
	- Unique: Entity -> Attribute
### Step2: Mapping of *Weak* Entity Types
- Create a table for the weak entity first. At this point of time, all attributes will be put into the table. 
- Include as a foreign key the **primary key** of the OWNER/IDENTIFYING entity type.
- We also need to add the partial key of the weak entity type as a primary key of the table. The primary key is going to be the *combintation* of these 2 keys. 
- Note that if we have a weak entity that has a weak owner, every single sub-entity will inherit all previous keys.
### Step 3: Mapping of *Binary 1:1 Relation Types*
- Three possible approaches
	- Foreign Key (2 relations) approach
		- You arbitrarily assign these two entities as S and T. Ideally you give whichever entity has total participation to S. S will acquire the attributes that relate to the relationship itself, and will also require a foreign key that is a primary key from T.
		- We should try to minimize null values, and this is why we need to be careful when determining which relation is S or T. S should be the entity that has TOTAL participatoin.
	- Merged Relation (1 relation) option:
		- When you have a 1:1 relationship and a total participation, just create a single relation that will represent two entity types. You are encouraged to do this when **both participations** are total. 
			- (Both tables have the same number of tuples all the time).
		- Ex: Emp_Dept -> A() = A(EMP) $U$ A(DEPT) $U$ A(ROLE)
	- Cross-Reference or relationship relations (3 relations)
		- This option is bad because: you have to join more tables to make connections, slowing down your queries.
		- It's purpose is to set up a third relation for the purpose of cross-referencing the primary keys of the two relations S and T. 
### Step 4: Mapping of *Binary 1:N Relation Types*
- Identify one of the relations as S and T. The S will be the N side, and T will be the other side. 
- T will contain the primary key, and its key will be added as a foreign key to S.
- If there are any attributes in the relationship, they will move towards S.
- What if its a recursive relation
	- You again assign an S and T, where S is the supervisee and T is the supervisor. So because we have S and T, the foreign key of S which is still employee would be the primary key of T, the supervisor employee. As such, we add a new attribute called SSN_Supervisor. Just as a general rule of thumb, we want to avoid multivalued attributes, which is why we make the Supervisor SSN instead of a supervisee SSN because there could be multiple per supervisor. 
### Step 5: Mapping of *Binary N:N Relation Types*
- Create a relationship relation S (basically a new table that has the two keys, and any simple attributes of the relation)
- Within S, add as FK the PK of participating entity type. (this will be two keys)
- Within S, add as attributes, any simple attributes of the relationship.
### Step 6: Multi valued attributes
- Create a new relation R
- Add multi-valued attributes to R. 
- Add as a FK the PK of the entity type with whom it is connected.
- So this relation will only have two attributes if it's a simple multi-valued attribute.
### Step 7: Mapping of N-ary Relation Types
- Note that we are creating a new relation (table) that will contain all of the entities within the relation. 
- This table will have a composite primary key, the combintation of all of the primary keys from the participating entities. It will also contain any simple attributes that regard to the relationship itself.
- ![[Pasted image 20241002122132.png]]

| Supply | ->  | SName | PartNo | ProjName | Quantity |     |
| ------ | --- | ----- | ------ | -------- | -------- | --- |
### Mapping of Generalization and Specialization Hierarchies to a Relational Schema 

### Step 8: Options for mapping specialization or generalization
- Convert each specialization with m subclasses
- 8A: Multiple relations-Superclass and subclasses.
	- The table/relation will contain all of the attributes of the superclass and its primary key. We then create another relation labelled Li for each of the subclasses which will contain the primary key of the superclass unioned with the individual attributes of the unique subclasses.
- 8B: Multiple relations-Subclass relations only
	- Still creating multiple relations, but those relations will be for each subclass where each attribute of the subclass is the local attribute Union, all of the attributes of the super classes. This only works for **total and disjoint** relations. Note that you will see the total relation from the super to the (d) thing, not from (d) to the subclasses. This should make sense to you mug. 
	- Basically, this variation allows us to not have to write any superclass relation, but all of our subclasses will show the attributes of its superclass.
	- The reason why it has to be total is: say we have a superclass vehicle and two subclasses car and truck. If we don't have total participation, we will **lose** information of the superclass (Vehicle_id, license_plate_no) when it classifies as a subclass. Loss of data.
	- The reason it has to be disjoint is because if it was overlapping, we could have a single vehicle entity identify itself as both a car and a truck. We would then have the same information represented twice and this would be a duplication. Duplication of data.
- 8C: Single relation with one type attribute. **Partial disjoint relation**
	- This one is good for disjoint subclasses. We are creating a single relation/table, so at that point of time, this single relation will have all of the attributes of its superclass union with all attributes of the subclasses union one type attribute. The type attribute specifies whether it identifies as a certain subclass or not. The discriminatory attributes are going to be the subclass attributes because many of them will be null because the entity can only identify as one subclass.
- 8D: Single relatoin with multiple type attributes. **Overlapping** subclasses
	- We have a single relation/table with attributes of the superclass, and all of the attributes of the subclasses. We also have a boolean attribute for each of the subclasses that contains information about whether or not this subclass' attributes should be considered. 
- **The key difference between 8C and 8D**
	- We are either using a single attribute to REFERENCE which subclass that this entity belongs to, or we have overlapping subclasses which means the entity can belong to multiple of them, which is why we use multiple booleans.
### Shared Subclass
- 
### Category Type
- Sometimes it's not possible to find a key from the data, in this case you need to create an surrogate (artificial) key to create uniqueness.
- If possible, use generalization specialization hierarchy methods (8a,b,c,d) instead of category types.
### Relational Model
- Definitions:
	- Domain -> data type along with logical definition and format.
		- ex: Home_phone attribute has the domain of int, 10 digits, country code, area code, number, range, etc.
		- ex: GPA has the domain of type double, ranges from 0 to 4, etc.
		- **Notation**: Dom(GPA) = 
##### Domain
- We can create a domain for multiple / different attributes.
- A home number and an office number would use the same domain.
- Another rule is that, there cannot be a NULL value. This is best seen within forms with required entries.
##### Relation State
$r(R) \subset Dom(A_1) * Dom(A_2) * ...$
All of the attributes in a relation will be within the subset of the cross product of its domain attributes.
##### Degree of Relation
The number of attributes in a relational model.
Don't get this confused with the degree of a relationship (the number of entities in a relationship).
### Characteristic of Relational Model
- Tuples -> We don't have an order, and the records are not expected to follow a certain order either. When we store a tuple/record into physical storage (hard drive), the information WILL be stored at a specific location/index. 
- Attributes -> We **can** have order. When we enter data for a record, we need to follow the order so that information is stored in the correct attribute. Say we have an address and a name column, we need to make sure we enter address and then name in the corresponding order.
	- Note that this correspondence is important to uphold, however there are certain systems that allow you to specify which attribute you are populating.
- Values in attributes -> The value MUST be a part of its domain. 
	- The 3 different types of NULL values
		- Not applicable
		- Unknown
		- Not available at this point of time.
- Flat structure -> The relational model does **not allow lists**. Such as a multivalued attribute. 
- Relation Naming Constraints: two different attributes within the same relation cannot have the same Name. However, two attributes in different relations CAN have the same name.
	- Ex: You can't have an entity Student with two Name attributes, but you can have a separate entity say Department with the attribute Name.
- **Notation** -> Fuck fill this in
##### Relational Database Schema
- structure, constraints, functions
##### Relational Database State
- The state is the populated schema at a certain point of time.
##### Constraints
- Inherit Constraint -> Based on the data model itself. (Example: Flat structure rule)
- Semantic constraint -> beyond the expressive power of the MODEL, must be implemented through the application function/programs.
	- SQL-99 allows CREATE TRIGGER and CREATE ASSERTION to express some semantic constraints.
	- Semantic constraints cannot be enforced by the data model itself and requires third party assistance.
- Explicit Constraints - constraints that we expect to enforce. 
	- Domain constraint -> The value of an attribute must exist within its domain. Ex. a GPA value must be double and must be within the range of 0-4.0
		- What is the difference between domain constraint and a semantic constraint such as working hours of an employee must not exceed 40 hours??
	- Key constraints -> 
		- Superkey constraint -> If no two tuple in any relation state of r will have the same vlaue. Basically when we look at this entire super key, it will be unique compared to any other entry. Basically if we have one primary key, we can have the entire list of attributes as a superkey because it would still be unique because of the primary key????
			- One significant example is Registration number and State, these must be paired to be a super key, individually, neither would suffice as a super key.
			- Minimal superkey is the smallest identifying combination of attributes. we can have multiple minimal superkeys.
			- Candidate keys should be minimal superkeys. The one key we select from the candidates is the primary key.
			- Key vs Superkey -> every key is a superkey, but keys are minimal super keys after omitting all of the attributes that aren't unique. 
	- Entity integrity constraints -> The primary key attribute does NOT allow any null values. There are 3 different aspects of NULL, but for no reason, we cannot have a NULL value. This is because we cannot uniquely identify an entity with a null KEY. Note that with a composite key, none of the components can be null either.
	- Referential Integrity constraints -> The foreign key concept. The foreign key will use the primary key of another tuple to reference it. The foreign key can obtain value from the primary key OR a null value. If foreign key is the PRIMARY KEY of a tuple itself, such as in a weak-entity relationship, then it must have value.
### Warm up Questions (9/30) 
Single vs multi inheritance
- Single inheritance is when you are inheriting attributes and relations from only one super clas, and multiple is when you acquire those attributes from multiple unique superclasses.
- Union type is an entity that represents the subset of multiple superclasses. Typically a category is a member of just one superclass, but is allowed to inherit multiple.
- The difference between shared subclass and union types: 
	- A category type is a part of a proper subset. It can only be **one** of the superclasses, not all of them.
	- Shared subclass is a subset of the intersection of our superclasses. it inherits all of those attributes.
	- When we consider union type, the owner can be represented by only one of the superclasses. 
- A foreign key is a key attribute of an entity that links to the primary key of another entity. 
### Warm up Questions (10/2)
- Step 1: Map strong entity (the entities with only a single rectangle)
	- Create a table that has all of the simple attributes. Identify one unique attribute to be used as the primary key. All of the other keys will unique keys. Any composite attributes should only have its children, the atomic attributes, in the table. 
- Step 2: Map weak entity (the entities with a double rectangle)
	- Put all of the simple attributes into the table. The foreign key of this table is the primary key of the owner or identifying entity type. And of course the partial key of this weak entity type will have its own partial key. And the primary key in total will be the combination of the foreign and partial key. 
- Step 3: Mapping 1:1 binary relationship
	- Why are we considering that S which has total participation within this 1:1 relatoinship, as the S. What will happen if we select employee as S because it has partial participation. Since its total participation, every single instance of department will be related to at least one employee, but not every employee is related to a department. 
	- Foreign key approach (2 relations)
	- Merged relation (1 relation)
		- You can simply merge the tables b/c there will be the same number of rows, with each unique employee being mapped to a unique department in a 1:1 total participation. 
	- Cross-reference (3 relations)
		- Note that in this cross reference table, you need to get the primary keys of the two tables that are being related, and also any attributes that are a part of this relation such as `start_date` in the employee department relation. 
### Warmup Questions (10/7)
- Describe:
	- 1:N Mapping
		- There are multiple methods for mapping this, but generally we do the foreign key approach. We assign S to whichever entity has more participation and T as the other. The S side entity will add as a foreign key, the primary key of T. S will also inherit any of the relatoinship attributes. 
	- M-N Mapping
		- Create a brand new relationship that has multiple foreign keys, that come from all of the primary keys of two entities. It will also contain any relational attributes.
	- N-ary relationship
		- Just like N-M mapping but we'll have more participating entities.
	- 8a, 8b mappings
		- 8a is where we have separate tables for each subclass and the super class and we will add as a foreign key, the primary key of the super class. 
		- 8b is similar in the fact that we have separate tables, but instead of adding a foreign key, instead we add all of the attributes of the super class and we don't have a super class entity anymore.
			- The reason why we need to have disjoint for 8b is so that for one, we aren't duplicating data. If we have a shared subclass, and we inherit multiple super classes, we would be duplicating the same attributes of the parent. The reason why it has to be total participation is: say we have a superclass vehicle and two subclasses car and truck. If we don't have total participation, we will **lose** information of the superclass (Vehicle_id, license_plate_no) when it doens't classifiy as a subclass.
			- Teacher answer explanation: not every entity in the super class need to identify as a subclass. That means those that do not identify as a subclass will literally disappear.
	- 8c, 8d mappings
		- 8c: we have a single attribute that acts as a type indicator. When the attribute identifies as one of the subclasses, it will have NULL for all of the unused values. 
		- 8d: we have multiple flags that are boolean attributes. This allows for this multiple subclass identities (**overlapping**).

### Warmup Questions (10/9)
- How to map shared subclass?
	- A shared subclass, such as STUDENT_ASSISTANT, is a subclass of several classes, indicating multiple inheritance. These classes must all have the same key attribute; otherwise, the shared subclass would be modeled as a category.
	- Note that the key difference here is that all of these super classes must have the same key attribute.
	- We can map it similarly to step 8 with the 4 different options.
- How to map cateory type?
	- We need to ensure that all of the super classes have a foreign key that comes from the primary key of the subclass that is inheriting the super classes. This is bc the subclass has a greater participation.

### Warmup Questions (10/14)
- Characteristics of Relation
	- Tuple -> data storage type that is unordered. The information just needs to be available and accessible. But when it's stored in the hardware, it is indexable ofc.
	- Attrbute
	- Value in all attribute in tuple
	- When we are inserting value for an attribute as well as denoting the specific attribute it applies to, then there is no order. 
- What is the diff between relational database state and schema.
	- Schema -> Skeletal structure of the attributes, entities, constraints, etc.
	- State -> Data a certain point in time. All of the information must satisfy the requirements of the schema.

### Warmup Questions (10/16)
Constraints
- Not null -> the attribute cannot be null
- Key Constraint -> new tuples must have a unique identifier for its key
- Domain constraint -> the attribute information must exist within the set of the domain
- Entity integrity constraint -> The primary key must not be null
- Referential integirty constraint -> The foreign key is either the primary key that it's referencing, or it can be null.
There are different actions we can perform on a db that will have different possible violations
- Retrieve
- Insert
- Update
- delete

|                       | Retrieve | Insert | Update | Delete |
| --------------------- | -------- | ------ | ------ | ------ |
| Not Null              | X        | Y      | Y      | X      |
| Domain                | X        | Y      | Y      | X      |
| Key                   | X        | Y      | Y      | X      |
| Entity Integriy       | X        | Y      | Y      | X      |
| Referential integrity | X        | Y      | Y      | Y      |

# Chapter 6 SQL(10/16-Present)
### Introduction 
SQL query commands should be fully capitalized, and database names will be stored fully lowercase.

It's a good idea to get into the habit of highlighting the queries you want to run, you generally don't want to run all of them at the same time.

### Data Types
Numerical
- Integer: `INTEGER, INT, SMALLINT`
- Floating-point: `FLOAT`, `REAL`, `DOUBLE PRECISION`
### Database Table 
##### Primary Key Declaration
- You can do it in line if there's only one primary key, but if it's composite, you must do it at the very end separately.
create alter insert update delete select statements
##### Types of Restrictions
- Cascade -> When we drop a table, we have to remove all of the information that references that table from other tables
- Restrict -> If there are other views that reference the information in the table we would like to delete, we stop that operation from occuring. 
- Set Null -> Whenever we make a change to the table, referenced information should be set to Null
- Set Default -> 
##### Creating Constraints
- We can create constraints with names. We can easily apply and remove this constraint with this name.

##### Actions and constraints
- INSERTION
	- Cascade it -> change all values in referenced tables
- DELETE
	- Set NULL
- CREATE
	- Set DEFAULT
- SELECT (there is an order to the parameters and are optional)
	- FROM -> filters what information to return (entire tuples or just a name, etc.)
	- WHERE -> filters by a condition
	- GROUP BY
	- HAVING
	- ORDER BY
	- ALL -> will allow null values to exist in the query
	- DISTINCT -> will give us only the distinct values

##### Changing structure of the database
- We would want to use the ALTER TABLE command. We could either:
	- Add column
	- Drop column
	- Add constraint
	- Drop constraint
	- Rename column
##### SQL Query Examples
- Insertion Explicit
```
SELECT * FROM COMPANY.dept_locations;
use company;
INSERT INTO dept_locations (Dlocation, Dnumber)
values ('Mckinney', '1');
```
- Insertion Implicit
	tbh too lazy to write this one out. basically we don't specify which attribute we're updating. it expects us to follow the ordering of the entity
```
single update without violation
SELECT * FROM company.department;
UPDATE department
set DName = "Research AI"
where DNumber = "5";

single update WITH violation
SELECT * FROM company.department;
UPDATE department
set DNumber = "6";
where DName = "Research";

multi update: two records are updated where their essns were of the matching value.
UPDATE works_on
SET hours = 42.5
where essn = '987987987';

all update: This will have an error because we are in safe mode.
UPDATE works_on
SET hours = 42.5 

multi update: multiple attributes can be updated depending on conditions of AND/OR
```
### General Notes over queries: 
- Not Equal is represented by <>
- When we are cross referencing two different tables, it is good practice to QUALIFY where data is coming from, even if the attributes are unique. 
	- Ex: SELECT employee.fname, employee.lname FROM employee, department WHERE department.dname = 'research_ai' AND employee.dnumber = department.dno
- If you want to include NULL values in your query, use the SELECT ALL statement
- LIKE keyword
	- For searching within attributes such as looking for "Texas" in an address attribute will pull up all of the addresses in Texas.
	- We can use `%` and `_` to help us filter it out.
	- `%` can replace any number of characters, kind of like the wild card 
	- `_` will only replace a single character as wildcard
### Exam Review:
Ch. 6 - Basic SQL
- **Know how to *create* these things**:
	- SCHEMA
	- TABLE
- **Operations on the database**:
	- INSERT
	- DELETE
	- UPDATE
		Additional Keywords:
		- PRIMARY KEY
		- FOREIGN KEY
		- UNIQUE
		- SET
		- VALUES
	- ALTER 
- **Querying on the database**:
	- Basic syntax: `SELECT __ FROM __`
	- Additional syntax:
		- WHERE 
		- GROUP BY
		- HAVING
		- ORDER BY
		- ALL
		- DISTINCT
		- AS -> Used for renaming
		- LIKE -> Used for pattern matching
		- IS -> Non-arithmetic matching
		- IS NOT -> Non-arithmetic matching for not equal.
- **Alias** -> We can rename things within the query to make typing more efficient.
	- Ex: `FROM employee e, department d WHERE e.dno = d.dnumber`
	- Instead of: `FROM employee, department WHERE employee.dno = department.dnumber`
- **Rename** -> We can rename the attributes in the SELECT arguments which will only affect the ***output*** of our query. This is especially useful when either the attribute name isn't clear, or we perform an aggregate function such as `sum(), avg(), count(), etc.` 
	- Ex: For each department, retrieve the department number, the number of employees in the department, and their average salary. In the example below, we are renaming `COUNT(\*)` to 'emp_count', and we are renaming the `AVG(e.salary)` to 'avg_salary'. Without renaming, the column name would simply state "Salary" which is not true.![[Pasted image 20241024113358.png]]
- **Arithmetic Operator** -> We can include arithmetic conditions in our queries to filter the output.
	- Ex: Retrieve all employees whose salary is **between** **$30,000 and $40,000**.
	  ![[Pasted image 20241024113721.png]]
- **Pattern Matching** -> This is how we can filter through information **within** the attribute itself.
	- Ex: Retrieve all employees whose address is in Houston, Texas.![[Pasted image 20241024113932.png]]
	- What's the difference between `%` and `_`? 
		- You use `_` to match any **single** character and `%` to match an **arbitrary** number of characters (including zero).
		- Say you want to find all people whose name starts with G, you can say `WHERE e.fname LIKE "G%";`
		- Whereas if you wanted to find all the people whose birthday is in March, you can say
		  `WHERE e.bdate LIKE "____-03-__"`
		- An important consideration for pattern matching is knowing whether the attribute is a VARCHAR or CHAR. It's easier to use `_` when there's a set number of characters such as in a CHAR type.
		- You can read more about this [here]([MySQL :: MySQL Tutorial :: 4.4.7 Pattern Matching](https://dev.mysql.com/doc/mysql-tutorial-excerpt/5.7/en/pattern-matching.html#:~:text=SQL%20pattern%20matching%20enables%20you,are%20case%2Dinsensitive%20by%20default.))
- **Order By** -> This keyword allows us to alter the way the **output is sorted**.
	- Ex: Retrieve all employees' salaries and in ascending order. ![[Pasted image 20241024115310.png]]
	- Note that ORDER BY is ascending order by default. To change to descending, you must employ the `DESC` keyword.
	- Order By will also work on alphabetic strings.
	- We can also have **multiple columns** in ORDER BY. This means that in the case that the first column has a conflict (same value), it'll then sort by the second column.
- **Having** -> This keyword is used to combine Conditions and GROUP BY. 
	- Ex: For each department where the num of employee >= 2, retrieve the department number, the number of employees in the department, and they average salary.
	- 


### WU (10/21)
- Create table statement for DEPARTMENT and DEPT_LOCATIONS
CREATE TABLE company.DEPARTMENT
Dname VARCHAR(20) UNIQUE,
Dnumber INT PRIMARY KEY,
Mgr_ssn CHAR(9) NOT NULL,
Mgr_start_date DATE
FOREIGN KEY (Mgr_ssn) REFERENCES EMPLOYEE(Ssn)

CREATE TABLE company.DEPT_LOCATIONS
Dnumber INT PRIMARY KEY,
Dlocation VARCHAR(30) PRIMARY KEY

# Chapter 7: More SQL
Clauses
- HAVING
- IS
- GROUP BY

Aggregate functions:
- Count
- Sum
- Avg
- Min
- Max

### Views
- A view is a non-physical representation of the physical table.
- We can use VIEWS to filter a data set and make queries on it later. It makes our future queries less complicated when we already know the constraints.
![[Pasted image 20241030123044.png]]
### Join
We can separate join into two types
- Inner Join -> Always return the information of the tuple that is matched on both sides. JOIN is how we can connect two tables together.
	- Equal Join -> 
	- Natural Join -> Will join two tables with the same attribute name. So you don't need to ON clause.
	- Multiway JOIN -> We can join multiple tables together based off of unique identifiers.
- Outer Join -> represent matched tuple, and also tuples that don't have matched value. It'll use NULL for the non matched values.
	- Left Outer Join
	- Right "" ->
### WU (11/4)
- What are some aggregate functions?
	- COUNT
	- SUM
	- AVG
	- MIN
	- MAX
- Which of these functions ignores NULL values as part of its calculation.
	- SUM, AVG, MIN, MAX
	- For COUNT, to consider NULL we need to use non-generic COUNT. e.g. COUNT(salary), instead of COUNT(*).
- When do we use GROUP BY and what does the HAVING keyword do.
	- GROUP BY will group based on a condition, but because of the cross product, we will have duplicate tuples.
	- This is why we use HAVING, to filter the output again to get rid of the duplicates.
### WU (11/6)
- What's the difference between inner and outer join?
	- Inner join combines tables that have matching values
		- Only displays output that has common attribute.
	- Outer join combines tables regardless of matching values.
		- Left outer join - Will display all left side tuples and possible corresponding rightside values, or NULL otherwise.
		- Right outer join - Will display all right side typles and possible matching left tuples, or NULL otherwise.
- GROUP BY purpose?
	- To partition relations into subsets
# Ch 14: Basis of Functional dependencies and Normalization for Relational Databases.

Normalization -> It's the formal guideline to discern whether a certain design is good or not.

### The 4 informal metrics of bad db design
1. Each tuple in a relation should represent a single entity or instance.
	1. The attributes of other entities should not be mixed in the same relation.
	2. Ex: Instead of having an EMP_DEPT entity that stores information of the employee and the department that they work in, it is better to separate that information into two separate tables, especially if they aren't 1:1 and total participation.
2. Redundant information in Tuples and Update Anomalies
	1. **Redundant Information**: Within a single column, if the values are NOT unique, i.e. department number, d_location, etc. it is best to put them into separate tables and match using the primary key.
	2. **Anomalies**: 
		1. Update -> We have to change multiple tuples when we update.
		2. Insert -> We cannot insert a tuple's information unless an employee is assigned to it.
		3. Delete -> Say we remove department number 5 attribute. We would have to remove the entire tuple that contains information that matches the department.
3. Reduce the number of NULL values as much as possible
	1. If an attribute has frequent NULL values, it is best to create a separate table to house that information with the PRIMARY KEY
4. Avoid the generation of Spurious (invalid) tuples.
	1. Make sure that your joins, we have one primary key, and one foreign key.
### Formal measure of how bad design can be transformed into good design.
- Normalization approach/approach -> Decompose a big table into smaller tables. You get to discern at which point it's too atomic. Hierlogical process because you HAVE to go step by step. For anything to be in the third normal form, it must have first been a first normal and second normal form.
	- First -> We cannot have **composite, multivalued, or nested (complex)** attributes. 
		- **Solution1**: Create a new relation/table w/ the primary key of the original table, and the single attribute that violates.
			- This is the best solution, the others are not good.
		- Solution2: For the multi-valued attribute, create more instances of attributes to accomodate for the multiple versions. The issue here is we will have NULL values for other tables.
		- Solution3: Pair up each individual attribute value with the primary key. The issue here is the redundancy of information.
		- Solution4 (complex): Create two new tables, one that has all of the Non-complex attributes, including the primary key. And then Another table that has ONLY the complex attribute split up, and then also the primary key, whilst making one of the complex attributes that was split into a primary key.
	- Second -> Every non-prime attribute of a relation should be fully functionally dependent on whole keys, not part of the key. 
		- **Solution:** Identify which attributes are not fully functionally dependent. We then create new tables that contain only the attribute itself and whatever primary key is requires. Essentially, if we have 3 relations of dependencies, we will need 3 separate tables for each level of dependency. 
	- Third -> The non-prime attribute should not depend on another non-prime attribute. There should not be a transitive dependency.
	- BCNF -> Rare but possible.
	- Fourth -> Super rare
- Normalization
	- Functional Dependency (FD) -> Specifies relation between different **attributes**. And that relationship becomes a **constraint** in a relational schema.
		- Good Ex: SSN value *determines* the value of the Fname, Minit, and Lname. The reason why this is a good example is the **UNIQUENESS** of the output attribute.
		- Bad Ex: Department Number determines the value of Department Name. So every time Dnumber = 5, Dname = 'Research'. This is poor practice because every Dnumber of 5 will have a Dname of research. Instead of a functional dependency, this information should instead be stored as a base relation. This is because X is not a PRIMARY KEY.
	- Key -> A minimal super key. The smallest combination of attributes that can provide uniqueness.
		- Super key -> Any combination of attributes that can provide uniqueness.
		- Candidate Key -> When you have multiple unique identifiers, these are all considered candidate keys. We can arbitrarily assign one of them as the Primary Key, and everything else is a secondary Key.
	- Prime Attribute -> Attribute that is a member of a candidate key. **Careful with composite keys**, each of their attributes are prime.
	- Non Prime Attribute -> Attribute that is NOT a member of a candidate key. Basically it is not uniquely identifying. 
	- Full Functional Dependecy (second form) (FD) -> Specifies a relationship Y -> Z, where any key attribute lost in Y will break the dependency.
	- Transitive Dependency (third form) -> Suppose we have an FD x -> z. it can be drived from x->y and y->z

# Ch. 30 - Database Security
### Common Threats
##### Unauthorized Privilege Escalation
- Describes the attempt of increasing the privilege level by attacking **vulnerable** points of the database.
##### Privilege Abuse
- Someone that has clearance of performing actions such as an adminstrator should not abuse this power and modify things that should remain untouched.
##### Denial of Service (DOS)
- The act of making resources **unavailable** to its intended users via overflowing the buffer.
##### Weak Authenticatoin
- A weak password can easily be figured out. This will allow an attacker to **impersonate** the identitiy of a legitimate user.
### SQL Injection
- This is when an attacker adds **extra information** to the input of an SQL query. The purpose of this input is to change or manipulate the retrieval for the attacker's advantage.
- Harmful effects of SQL Injection attacks
	- Unauthorized data manipulatoin
	- Retrieve sensitive data
	- Execution of **system-level** commands
		- Ex: could possibly execute a system-level command that would cause the system to **deny service** to the application for common users.
### SQL Injection Methods
##### SQL Manipulation
- Most common form of injection attack
- This involves **changing** the SQL command in the application via:
	- adding conditions to the WHERE clause
	- expanding a query with additional components using set operations such as UNION, INTERSECT, or MINUS
##### Code Injection
##### Function Call Injection
### Warmup Questions 11/20
1. **What is SQL Manipulation vs Code Injection vs Function Call**
	1. **SQL Manipulation** is when the attacker changes the SQL Query (such as the WHERE clause) to get more information than they're supposed to.
	2. **Code Injection** is pretty similar to SQL Manipulation, but the key difference is you're adding an ADDITIONAL LINE of code.
	3. **Function call injection** is when you insert an OS or hardware call into the code to be executed. For example, you can do a network command or open a file through an SQL query. You really could perform any system call. 
		1. To combat a function call, we have to limit permissions. Restrict the command from being called or require a level of permissions.
2. **Explain SQL Injection Risk Factor: Database Fingerprint**
	1. When the attacker can figure out what the type of database is being used, to tailor the attack that focuses on certain vulnerabilities.
3. **Explain SQL Injection protection technique: Bind Variables**
	1. Using parameterized statements to protect against injection attacks
	2. 
4. **Persistent Data vs transient data**
	1. Persistent data is stored for a longer period. This is goign to be the important data that is access and processed frequently.
	2. Transient data only exists during program execution. They're temporary.
	3. A database generally stores persistent data.
Exam questions
This line of code is what type of injection, and how can we handle these injections. What's the solution
# Ch. 16 - Data Organization
### Heap Structure
- Information is in order of insertion, but not sorted in any particular way. 
- We use **file blocks** to store the data. **b** represents the number of file blocks and **record** represents the number of records.
	- Say that **b** = 3 and **record** = 2, then we have 3 file blocks and 2 records per block, which is **6 records** in total. 
- **Insert** -> A new record can **easily** be added to the end of the list. **Constant** operation.
- **Search** -> Retreiving data is much more expensive because it has to be **linear**. If there is one specific record we are looking for, we need to search on average b/2 disk blocks. If that record does **not** exist, then we must read all **b** disk blocks.
- **Update** -> Find the record, copy the information into the buffer, modify the information, and put it back into the same spot.
- **Delete** -> Find all records that satisfy the condition (Might need to go through all blocks). Copy the information into the buffer, delete from the buffer, and rewrite it to the disk. The **disadvantage** of this is the remaining unused record space. A solution for this is creating a new field/attribute called the **deletion marker**. This is simply a boolean indicator of whether or not the attribute is supposed to be removed or not. The problem still remains that we have unused space, and at a certain point we need to rearrange or storage. 
### Ordered File
- Information is stored and sorted by any specific field. It doesn't have to be a key attribute, just any. However, there are some differences that arise from having a non-key field as the dependent. 
	- Key Field example: Say we use ID as the **ordering field**, then we are in order of ID.
	- Non-key Field ex: Say we use State as the ordering field. The primary difference is the existence of duplicate ordering field values. This means that when we look for a specific record, we need to look **within** non-unique key values. 
- **Search** -> `SELECT * FROM student WHERE id = 3;` This example uses the **ordering field** for searching. This means that the record reading is *extremely efficient,* especially if we use **binary search**.
	- **Search but not good** -> `SELECT * FROM student WHERE state = 'NY';` This is an example of how we might be using an **ordered file** structure, but not reaping any benefit because we are searching based on a **non-ordering field**. 
- **Insert** -> Expensive operation.
	- One option is to Initially keep buffer spaces in between each block to account for new records. But the issue will arise once the space is used.
	- Another option is to use an overflow file. Requires periodical reorganization. For the overflow file itself, insertion becomes easier, but then searching becomes difficult again. 
- **Delete** -> We can again use a deletion marker. Eventually we will have to reorganize.
- **Update** -> 4 different types based on two factors: search condition and field to be modified
	- If the search condition is based on
		- Ordering field -> Use binary search
		- Non-ordering field -> Use linear search
	- If the modified data is 
		- Ordering field -> We may have to change the placement of the record
		- Non-ordering field -> We can change the record and insert it back in the same place.
### Hash File
- Information is inserted based upon the hash field of the ordering field. The hsa function with randomize where the data is placed. We use the same hash function to access that record.
- The common internal hasing technique is h(K) K mod M where M is the number of max index number. 
- **Insert** -> 
- **Search** ->
- **Delete** ->
- **Update** ->
- One issue that we can run into is when our attribute addresses exceed the number of memory addresses. This will increase the likelihood of collisions. This is super common so don't really worry about it. 
	- **Collision** -> The address where we are trying to store information is already occupied.
- **Solutions to Collisions:**
	- Open Addressing -> Go to the next available address upon collision.
	- Chaining -> Linked List concept
		- Overflow block space. We place records in the overflow buffer upon collision, and we can find this address by adding an identifier of where we need to traverse to locate the record.
	- Multiple Hashing: Keep applying hashing functions until we don't get a collision.

# Ch 17 - Indexing 
- What is sorted data organization?
	- Data is sorted based on a specific attribute
	- Does this attribute need to be a KEY attribute?
		- Nope! In an example of a student record, we can sort by Student_ID or GPA.
- Indexing is a helping tool to search for files and retrieve the data faster.
- So how does it work?
	- The index file has numbered indexes that point to **file blocks**. It helps section off parts of the entire file structure. Reduce the total search space.
- Requirements:
	- Files are sorted
	- We have file blocks that are ALL indexed
- **Index File** -> 
### Types of Single-level Ordered Indexes
- Primary Index
	- Specified on the **ordering key field** of ordered file of records
	- Essentially a table can have many unique attribute properties, but only one of them will can be the ordering key field. Primary indexing is when we base the index on the ordering key field (primary key). The number of index records we will have is based on the number of **file blocks** we have. And the repsective index for each file block would be the **first entry** of each file block (known as the **anchor record**). 
- Clustering Index 
	- Used for **ordering field** which is **not** a key field (no guaranteed uniqueness) 
	- Used if numerous records can have the same value for the ordering field. Or rather, it's better used when you plan on grouping blocks via a certain attribute's value that is common to many people such as GPA.
	- The file block itself has one entry of index for each **distinct value** and they each will point to the **first** file block that stores that value. 
- Seconday Index
	- Can be specified on any **non-ordering field**
	- Data file can have several secondary indexes.
	- There are two variations
		- Non-ordering **key** field
			- Dense file indexing where we have an index for each searchable record. 
		- Non-ordering **non-key** field
			- Solution 1: Dense Indexing where we create an index entry for every single record and each index will point to a unique record.
			- Solution 2: Sparce indexing where we create another level of indirection. A second file structure that contains each **unique** value's collection of addresses.
	- This shit is so complicated man
### Concurrency
- Many people accessing the same data at the same time.
- **Lost Update Problem** -> 