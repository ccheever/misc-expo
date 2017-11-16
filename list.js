import lodash from "lodash";
import projects from "./expo-projects";
import semver from "semver";

export function process(p) {
  let x = lodash.filter(p, row => {
    if (row.fullName.startsWith("@exponent_ci_bot")) {
      return false;
    }

    try {
      return semver.gte(row.sdkVersion, "17.0.0");
    } catch (e) {
      return false;
    }
  });

  let y = lodash.sortBy(x, "publishedTime");

  let seen = {};
  let pkgs = [];
  for (let i = 0; i < y.length; i++) {
    let z = y[i];
    if (!seen[z.fullName]) {
      seen[z.fullName] = true;
      z.url = "http://expo.io/" + z.fullName;
      pkgs.push(z);
    }
  }
  return pkgs;
}

if (require.main === module) {
  let results = process(projects);
  let c = results[0];
  console.log(Object.keys(c).join("\t"));

  for (let i = 0; i < results.length; i++) {
    x = results[i];
    console.log(Object.values(x).join("\t"));
  }
}
