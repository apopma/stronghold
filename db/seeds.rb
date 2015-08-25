# guest user
guest = User.create!(username: "Skeletor", password: "myaaaah", email: "strongholdguest@hmamail.com")

# sockpuppets
billy = User.create!(username: "Dr. Horrible", password: "everythingyouever", email: "drhorrible@hmamail.com")
moist = User.create!(username: "Moist", password: "moisturebuddy", email: "moisturebuddy@hmamail.com")
adrian = User.create!(username: "Ozymandias", password: "pyramid", email: "veidt@hmamail.com")
lex = User.create!(username: "Lex Luthor", password: "@34l(v 3254 &(@9Cxxq)", email: "lex_luthor_2015@hmamail.com")
blofeld = User.create!(username: "Ernst Stavro Blofeld", password: "misterbond", email: "blofeld@hmamail.com")
hench1 = User.create!(username: "#21", password: "hench21", email: "hench21@hmamail.com")
hench2 = User.create!(username: "#24", password: "hench24", email: "hench24@hmamail.com")
oddjob = User.create!(username: "Oddjob", password: "millinery", email: "shoddjob@hmamail.com")
wint = User.create!(username: "Mr. Wint", password: "diamonds", email: "mrwint@hmamail.com")
kidd = User.create!(username: "Mr. Kidd", password: "spectre", email: "mrkidd@hmamail.com")


# demo projects
lair = Project.create!(title: "Operation Mohorovicic", creator: blofeld, description: "Building a volcano lair")
wonderflonium = Project.create!(title: "Operation Persephone", creator: billy, description: "The world's biggest wonderflonium heist")

# memberships
ProjectMembership.create!(user: guest, project: lair, admin: true)
ProjectMembership.create!(user: guest, project: wonderflonium)
ProjectMembership.create!(user: moist, project: wonderflonium, admin: true)


# ------------------------------------------------------------------------------

ProjectMembership.create!([
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
  {title: "Bounce-proofing the stocks", body: "I'm sure everybody knows we've got a pretty big...bouncing...problem with our wonderflonium stockpiles. As of this week, we've lost:&nbsp;<br><ul><li>Susan</li><li>Tyler</li><li>Jaghatai</li><li>and dear, sweet Fluffy</li></ul>﻿due to bounce-induced fatalities. This can't go on! I want everybody to put their heads together and figure out a way to bounce-proof what we managed to salvage after the last incident. No slacking!<br>", project_id: 2, creator_id: 2}
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
  {user_id: 6, body: "I want at least two dozen new candidates by this Halloween, Mr Kidd. Don't disappoint me.", commentable_id: 7, commentable_type: "Task"}
])
