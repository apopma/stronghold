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
