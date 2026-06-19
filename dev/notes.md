we need to consider this: "Also someone needs to look at including a phase on the recruitment flow, where they can record 1 minute video answering basic questions, name why c3, etc"

we need to add this to the exisitng flow. we need teh video capture mechanic. can be ideally via webcam,browser cam. have basic controls, test windo to check setup, like the lobby, need to have guiding quesitons side by side of video as talking points. see how they essentially rpesent. data can be straemd to our s3 buckets via a service we can set up in our backend. see C:\Users\Louis\Documents\GitHub\timesheet-back-end\aws and C:\Users\Louis\Documents\GitHub\timesheet-back-end\routes\documentation.js for how we stream to bucket. ensure we have dedicated bucket. also in rec app pattern that uses our prd backend C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\src\store\actions\recruitmentActions.js. reuse mechanic, ensure files feed same or seprate bucket. need model to link up with current recruitment models. see C:\Users\Louis\Documents\GitHub\timesheet-back-end\routes\recruitment.js note we only have the consultatn track now. so only C:\Users\Louis\Documents\GitHub\timesheet-back-end\models\ConsultantRecruit.js applies. use legacy patterns. note though that recruits are not portal (tiesheet backend) users, we are teh users who manages the recruitment data on the portal via the sepertte recruitment site. we now need to add the video feature and i need a comprehensive prd for both repos. add this comprehensive prd in C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev. we will abstract seprte prds form there. need the source of truth prd though.

Resume this session with:
hermes --resume 20260618_142400_decbfd
hermes -c "Recruitment Video PRD Planning"

Session: 20260618_142400_decbfd
Title: Recruitment Video PRD Planning
Duration: 8h 56m 41s
Messages: 71 (2 user, 67 tool calls)
