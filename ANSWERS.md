<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    Sessions act as a way to store information for a user across multiple pages. Sessions also allow us to control access to the site. Whether it be how long someone has access or what they can see.
2. What does bcrypt do to help us store passwords in a secure manner.
 Bcrypt hashes the password so if a hacker somehow gains access to the password information, they can't just use that to get into the users account they would need to compare countless passwords until they finally get a match to the bcrypt hash.
3. What does bcrypt do to slow down attackers?
 It both hashes and is computationaly slow so hackers can't just test large amounts against the hash as often as they would with other hashing systems.
4. What are the three parts of the JSON Web Token?
header, payload, signature

Using jsonwebtokens we provide: payload(first, third) and signature(second)
