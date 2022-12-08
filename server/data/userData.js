import bcrypt from "bcryptjs"

const userData = [
    {
        username: "Von",
        name: "Von Ojastro",
        password: bcrypt.hashSync('vonCARLO2020', 10),
    }
  
]

export default userData