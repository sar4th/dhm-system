import regFetch from "npm-registry-fetch";
import { getNestedKeys } from "../utils/getNestedKeys";

interface DependencyData {
  [key: string]: string;
}

interface AuditPayload {
  name: string;
  version: string;
  requires: {
    [key: string]: string;
  };
  dependencies: {
    [key: string]: {
      version: string;
      integrity?: string;
    };
  };
}

export async function getAuditData(dependencyJson: any): Promise<any> {
  try {
    const auditPayload = generateAuditData(dependencyJson);

    console.log("Audit Payload:", JSON.stringify(auditPayload, null, 2));

    const opts = {
      color: true,
      json: true,
      unicode: true,
      method: "POST",
      gzip: true,
      body: JSON.stringify(auditPayload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await regFetch("/-/npm/v1/security/audits", opts);
    const data = await response.json();

    console.log("Audit Response:", JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error("Error during npm audit fetch:", err);
    throw err;
  }
}

function generateAuditData(dependencyJson: any): AuditPayload {
  // Ensure we're working with a valid package.json object
  if (!dependencyJson || typeof dependencyJson !== "object") {
    throw new Error("Invalid dependency JSON");
  }

  const packageName = dependencyJson.name || "unknown-package";
  const packageVersion = dependencyJson.version || "0.0.0";

  // Collect all dependencies
  const allDependencies: { [key: string]: string } = {
    ...(dependencyJson.dependencies || {}),
    ...(dependencyJson.devDependencies || {}),
    ...(dependencyJson.optionalDependencies || {}),
  };

  // Generate requires object
  const requires: { [key: string]: string } = Object.entries(
    allDependencies
  ).reduce((acc, [name, version]) => {
    acc[name] = version;
    return acc;
  }, {} as { [key: string]: string });

  const dependencies = Object.entries(allDependencies).reduce(
    (acc, [name, version]) => {
      acc[name] = { version };
      return acc;
    },
    {} as AuditPayload["dependencies"]
  );

  return {
    name: packageName,
    version: packageVersion,
    requires,
    dependencies,
  };
}
