const axios = require("axios");
require("dotenv").config();

axios.defaults.headers.common["User-Agent"] = "CubeBeveled/server-sided";
const apiKey = process.env.MODRINTH_TOKEN

axios.get("https://api.modrinth.com/v3/project/server-sided/dependencies")
  .then(async res => {
    const response = await axios.patch(
      `https://api.modrinth.com/v3/collection/apmecjy7`,
      { new_projects: res.data.projects.map((i) => i.id) },
      {
        headers: {
          authorization: `${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data)
  })