import { releases } from "./solidityReleases";
import * as semver from "semver";

export function parseSolidityVersion(fileContent: string): string | null {
  const versionMatch = fileContent.match(/pragma solidity\s+(.*?);/);

  if (versionMatch && versionMatch[1]) {
    return findBestMatch(versionMatch[1]);
  }

  return null;
}

function findBestMatch(version: string): string | null {
  const validVersions = Object.keys(releases).filter((v) =>
    semver.satisfies(v, version)
  );

  if (validVersions.length === 0) {
    return null;
  }

  const bestMatch = semver.maxSatisfying(validVersions, version);
  return releases[bestMatch as keyof typeof releases];
}
