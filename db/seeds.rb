User.create!([
  # it's vital that these users be created in precisely this order
  {username: "Skeletor", email: "strongholdguest@hmamail.com", password_digest: "$2a$10$YTlUWFlGaghIJAPEw2nRmOIKolnok9L8XzX0Hd3ygSLaxWB5/HikO", session_token: "I4VHLVV31rPA2UVeaDYaFw", gravatar_url: "http://gravatar.com/avatar/93f7cb69208b71e73a584b390c23bf92"},
  {username: "Dr. Horrible", email: "drhorrible@hmamail.com", password_digest: "$2a$10$1tMMAmtm0XaiQzT7w8cxhOP3R2OFTBcP6.b1ZfDwp4PKkiYR4dDn2", session_token: "XqrnQxTRr2j7aNsaQuiryA", gravatar_url: "http://gravatar.com/avatar/21a16e6807400554671704dc1eba70b9"},
  {username: "Moist", email: "moisturebuddy@hmamail.com", password_digest: "$2a$10$7q/1R0fe5Jl1fvc1H5CQzOXLkyVeYDgzQCbhqQFsoJBw1Qvi9AOHm", session_token: "lbpDmWCKPQ9zSn2Sqz6xeg", gravatar_url: "http://gravatar.com/avatar/b37a50703e1aa307578b13e5e0858eb2"},
  {username: "Ozymandias", email: "veidt@hmamail.com", password_digest: "$2a$10$3Dffk4a3rEai9ngRdZVdXeQ6c8V7GVfs/OtAbzbrHdxgijkpif/uu", session_token: "VZbGpz5bCch2zlqm_RZsLw", gravatar_url: "http://gravatar.com/avatar/ae8aad106398584d87820155b5c3b322"},
  {username: "Lex Luthor", email: "lex_luthor_2015@hmamail.com", password_digest: "$2a$10$UShmkmEr2ce2GAmDfqQeCusbZ7DkUmngzyebP8QVZOU95m/D8jRXS", session_token: "ZZKhBjIvJYCETADdRdW0IA", gravatar_url: "http://gravatar.com/avatar/46953bcf37a2e4caede4fbf251115abc"},
  {username: "Ernst Stavro Blofeld", email: "blofeld@hmamail.com", password_digest: "$2a$10$JytRLxVlAYkEaMQ3R27Rnuokuu.FNtu4k6jK6e0WsLyxMROnp8Y1y", session_token: "nhhO4Xt8QLkZINDg7HrmlQ", gravatar_url: "http://gravatar.com/avatar/c3814ba6e3e8b5e896e9f6557b7f348b"},
  {username: "#21", email: "hench21@hmamail.com", password_digest: "$2a$10$AoeGxEWBDx/cwePuBjg1/ui9LQbRX9JOd3mKJcO3BR99UBNpiaUtS", session_token: "DqZIXgiayCr90ShYu0X47w", gravatar_url: "http://gravatar.com/avatar/10df088997f219acc8be0af0ef9bdb8d"},
  {username: "#24", email: "hench24@hmamail.com", password_digest: "$2a$10$0KPI.W70q3yUySWzuSpmle7rxxJX72ibGjBIWspvLGjSQGBnLzO7q", session_token: "MRjkFL_1GcmnHZnaDJs9CA", gravatar_url: "http://gravatar.com/avatar/281bcef82cc1463566ecc10251ac5d92"},
  {username: "Oddjob", email: "shoddjob@hmamail.com", password_digest: "$2a$10$IC1.CJkyIdC7Cl1w6WkAFe0JVTt24GngR.hB3QK07XBA3h2Cc/vCS", session_token: "mdmFT5qZUSxrcmmEn37VZQ", gravatar_url: "http://gravatar.com/avatar/2f867c0520b0fe30ddd097a7093535de"},
  {username: "Mr. Wint", email: "mrwint@hmamail.com", password_digest: "$2a$10$MHjtT.RVyGshOcGLpZoOJecoEKUOUZQfY.uQ214kOytjhD/roxrn.", session_token: "S69olGaBMXgfDPYymYdSfA", gravatar_url: "http://gravatar.com/avatar/a83ee540f9ebb52c2aaeb1df3244567c"},
  {username: "Mr. Kidd", email: "mrkidd@hmamail.com", password_digest: "$2a$10$KT/EkCAtvnfaqbVu3LGYlOQFffy1X1yZFzwarMaNyoZc1ATFEswK.", session_token: "oESNFmgRYinFQYHKJfvEsA", gravatar_url: "http://gravatar.com/avatar/0548b6fd09f8c71e82469ca711498b07"},
  {username: "Dr. Doom", email: "dr_doom@hmamail.com", password_digest: "$2a$10$B276t/1KnRMSoExV44CSFOg7ApaLa3exSSkldQKqb6ew31GfDkftS", session_token: "CPKIHG8adRMRsiHGIRcVfA", gravatar_url: "http://gravatar.com/avatar/be8e95d55d986be217722c1aac038feb"},
  {username: "the Joker", email: "shjoker@hmamail.com", password_digest: "$2a$10$2xuHX8u0Pun/6Xhw7Z6jkeApezlb.pQjq3px78qJR2M4NRpo0zSDC", session_token: "-qSnVmT3JOaTqOulXGNC2Q", gravatar_url: "http://gravatar.com/avatar/221ce486afb6f927137f402760702371"}
])

Project.create!([
  {creator_id: 2, title: "Operation Persephone", description: "The world's biggest wonderflonium heist"},
  {creator_id: 6, title: "Operation Mohorovicic", description: "Building a volcano lair"}
])

ProjectMembership.create!([
  {user_id: 6, project_id: 1, admin: true},
  {user_id: 2, project_id: 2, admin: true},
  {user_id: 1, project_id: 1, admin: true},
  {user_id: 1, project_id: 2, admin: false},
  {user_id: 3, project_id: 2, admin: true},
  {user_id: 7, project_id: 1, admin: false},
  {user_id: 8, project_id: 1, admin: false},
  {user_id: 11, project_id: 1, admin: false},
  {user_id: 10, project_id: 1, admin: false},
  {user_id: 9, project_id: 1, admin: false}
])

Checklist.create!([
  {title: "Industrial equipment", description: "Machinery, logistics, and supply", project_id: 1, creator_id: 6},
  {title: "Human Resources", description: "Henchmen, minions, politicians...", project_id: 1, creator_id: 8},
  {title: "Reverse engineering the death ray", description: "", project_id: 2, creator_id: 2}
])

Discussion.create!([
  {title: "Bounce-proofing the stocks", body: "I'm sure everybody knows we've got a pretty big...bouncing...problem with our wonderflonium stockpiles. As of this week, we've lost:&nbsp;<br><ul><li>Susan</li><li>Tyler</li><li>Jaghatai</li><li>and dear, sweet Fluffy</li></ul>﻿due to bounce-induced fatalities. This can't go on! I want everybody to put their heads together and figure out a way to bounce-proof what we managed to salvage after the last incident. No slacking!<br>", project_id: 2, creator_id: 2},
  {title: "Project Ploughshare: next steps", body: "<h4>or, how to feed ourselves without a fleet of supply ships</h4><div><small></small>Contrary to&nbsp;<i>popular&nbsp;</i>belief, we didn't choose this island just for its isolated location and convenient status as&nbsp;<i>terra nullius.&nbsp;</i>We've sufficient insolation here to, provided we can keep our agriculture operations under wraps, produce enough food for half again our current complement.<br><br>The floor's open to suggestions from <u>all</u> interested parties (and yes, #24, that means you) about what to grow and how. The sooner Project Ploughshare becomes operational, the sooner we can all stop eating C-Rations.<br><br></div>", project_id: 1, creator_id: 6},
  {title: "Perimeter security", body: "We can't allow nearby governments to know we're here. Not now, not before our perimeter's secure and emissions control is emplaced. It's everyone's responsibility to report perimeter breaches and vessel sightings.<br><br>Remember it. Anybody who has something to report, report it here.", project_id: 1, creator_id: 9}
])

Task.create!([
  {description: "Acquire a tunnel-boring machine", done: false, deadline: "2016-06-01", checklist_id: 1, creator_id: 6},
  {description: "Finish report on transport fleet's seaworthiness", done: false, deadline: "2015-11-15", checklist_id: 1, creator_id: 6},
  {description: "Finish construction on the docks", done: true, deadline: nil, checklist_id: 1, creator_id: 6},
  {description: "Convince U.S. Steel to lower their prices", done: false, deadline: "2015-12-31", checklist_id: 1, creator_id: 6},
  {description: "Kidnap a few geologists", done: false, deadline: nil, checklist_id: 1, creator_id: 6},
  {description: "Investigate rumors of necromancy", done: false, deadline: nil, checklist_id: 2, creator_id: 8},
  {description: "Expand recruitment efforts", done: false, deadline: "2015-10-31", checklist_id: 2, creator_id: 8},
  {description: "Pay off the courts", done: true, deadline: nil, checklist_id: 2, creator_id: 6},
  {description: "Read up on thermodynamics", done: false, deadline: nil, checklist_id: 3, creator_id: 2},
  {description: "Dinner with Johnny Snow", done: false, deadline: "2015-09-12", checklist_id: 3, creator_id: 2},
  {description: "Stockpile wonderflonium", done: true, deadline: nil, checklist_id: 3, creator_id: 2},
  {description: "Rob a cryogenics facility", done: true, deadline: nil, checklist_id: 3, creator_id: 2},
  {description: "Crack CERN's databases", done: false, deadline: "2015-10-01", checklist_id: 3, creator_id: 2}
])

TaskAssignment.create!([
  {task_id: 1, user_id: 10},
  {task_id: 1, user_id: 11},
  {task_id: 3, user_id: 8},
  {task_id: 4, user_id: 9},
  {task_id: 5, user_id: 6},
  {task_id: 5, user_id: 7},
  {task_id: 5, user_id: 8},
  {task_id: 6, user_id: 1},
  {task_id: 7, user_id: 11},
  {task_id: 9, user_id: 2},
  {task_id: 10, user_id: 3},
  {task_id: 12, user_id: 2},
  {task_id: 12, user_id: 3},
  {task_id: 13, user_id: 2}
])

Comment.create!([
  {user_id: 8, body: "Ummm....what's a keel, again?", commentable_id: 3, commentable_type: "Task"},
  {user_id: 6, body: "Mr 24, I&nbsp;<i>strongly&nbsp;</i>suggest you take up remedial naval study at your earliest convenience. Unless you're interested in finding out what a keel is firsthand, of course...", commentable_id: 3, commentable_type: "Task"},
  {user_id: 8, body: "<small>*gulp*</small>", commentable_id: 3, commentable_type: "Task"},
  {user_id: 6, body: "I want at least two dozen new candidates by this Halloween, Mr Kidd. Don't disappoint me.", commentable_id: 7, commentable_type: "Task"},
  {user_id: 10, body: "A pocket vineyard, I think. After that...<i>regrettable&nbsp;</i>incident with our stocks of Moulon-Rothschild I think we'd be well served growing our own. Especially in soil like this. Isn't that right, Mr Kidd?", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 11, body: "I agree wholeheartedly, Mr Wint.&nbsp;", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 8, body: "Oh! Can we grow Hot Pockets? I could&nbsp;<i>really&nbsp;</i>go for some Hot Pockets.", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 7, body: "Don't listen to him, boss! The last time 24 got hold of a crate of Hot Pockets we had to air out the barracks for&nbsp;<b>days.&nbsp;</b>It was horrible.&nbsp;", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 6, body: "#24, I...no, never mind. No. Just, no.", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 9, body: "I'll handle it, Boss.", commentable_id: 2, commentable_type: "Discussion"},
  {user_id: 6, body: "Don't forget, you two: Dr. Harrington's on&nbsp;<i></i>our side. I don't want to hear about any overzealousness from either of you once you stage the 'disappearance' next week. Am I clear?<i></i>", commentable_id: 5, commentable_type: "Task"},
  {user_id: 7, body: "Crystal, boss. No worries.", commentable_id: 5, commentable_type: "Task"},
  {user_id: 7, body: "Uhhhh...I dunno if this'll be useful, but Steve in Accounting found this book called \"De Vermis Mysteriis\" in his locker the other day? Something about worms, or something? He didn't sound too good. Maybe you should go check it out...", commentable_id: 6, commentable_type: "Task"}
])
